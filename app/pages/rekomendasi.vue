<script setup lang="ts">
import { Motion, AnimatePresence } from "motion-v";
useSeoMeta({
  title: "Rekomendasi Menu Anda - NutriHarian",
  description:
    "Lihat rekomendasi menu sehat harian yang dipersonalisasi berdasarkan kebutuhan kalori Anda.",
});

const router = useRouter();

// Food item interface matching foods.json structure
interface FoodItem {
  id: number;
  name: string;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

// Menu item with additional display properties
interface MenuItem extends FoodItem {
  reason: string;
  isAlternative: boolean;
  alternativeFor: string;
}

// User data from session storage
interface UserData {
  umur: number;
  tinggiBadan: number;
  beratBadan: number;
  tujuan: string;
  alergi: string[];
}

const userData = ref<UserData | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Recommendation data
interface RecommendationData {
  targetCalories: number;
  meals: {
    breakfast: MenuItem[];
    lunch: MenuItem[];
    dinner: MenuItem[];
  };
}

const recommendation = ref<RecommendationData | null>(null);

// Calculate calorie needs based on user data
const calculateCalories = (data: UserData): number => {
  // Using Mifflin-St Jeor Equation (assuming sedentary activity for simplicity)
  // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(years) + 5 (for men, we assume average)
  const bmr = 10 * data.beratBadan + 6.25 * data.tinggiBadan - 5 * data.umur;

  // Activity factor (assuming sedentary)
  let tdee = bmr * 1.4;

  // Adjust based on goal
  if (data.tujuan === "lose") {
    tdee = tdee * 0.85; // 15% deficit
  } else if (data.tujuan === "gain") {
    tdee = tdee * 1.15; // 15% surplus
  }

  return Math.round(tdee);
};

// Generate explanation for why a food is recommended
const generateReason = (_item: FoodItem, mealType: string): string => {
  const defaultReasons: string[] = [
    `Menyediakan energi berkelanjutan untuk aktivitas harian.`,
    `Kombinasi protein dan karbohidrat yang seimbang untuk tubuh.`,
    `Nutrisi yang cukup untuk menjaga produktivitas.`,
  ];

  const reasons: { [key: string]: string[] } = {
    breakfast: [
      `Memberikan energi awal yang cukup untuk memulai aktivitas hari ini.`,
      `Kandungan karbohidratnya membantu menstabilkan gula darah di pagi hari.`,
      `Nutrisi seimbang untuk mendukung konsentrasi dan fokus sepanjang pagi.`,
    ],
    lunch: [
      `Menyediakan energi berkelanjutan untuk aktivitas siang hari.`,
      `Kombinasi protein dan karbohidrat membantu menghindari rasa mengantuk setelah makan.`,
      `Nutrisi yang cukup untuk menjaga produktivitas hingga sore.`,
    ],
    dinner: [
      `Porsi yang tepat untuk makan malam tanpa membebani pencernaan.`,
      `Mendukung pemulihan tubuh selama tidur dengan nutrisi yang seimbang.`,
      `Kandungan yang tidak terlalu berat untuk dikonsumsi di malam hari.`,
    ],
  };

  const mealReasons: string[] = reasons[mealType] ?? defaultReasons;
  const randomIndex = Math.floor(Math.random() * mealReasons.length);
  const selectedReason = mealReasons[randomIndex];
  if (selectedReason !== undefined) {
    return selectedReason;
  }
  return defaultReasons[0] as string;
};

// Check if a food contains allergen
const containsAllergen = (
  foodName: string,
  allergies: string[],
): string | null => {
  const allergenMap: Record<string, string[]> = {
    susu: ["susu", "keju", "mentega", "yogurt", "cream", "krim", "butter"],
    telur: ["telur", "orak", "dadar", "ceplok"],
    kacang: ["kacang", "almond", "mete", "pistasi"],
    seafood: [
      "ikan",
      "udang",
      "cumi",
      "kerang",
      "kepiting",
      "lobster",
      "tiram",
      "salmon",
      "tuna",
      "bandeng",
      "lele",
      "gurame",
      "nila",
      "mas",
      "mujair",
    ],
    gluten: ["roti", "mie", "pasta", "gandum", "wheat", "biskuit", "kue"],
    kedelai: ["tahu", "tempe", "kedelai", "soya", "tofu"],
  };

  const lowerName = foodName.toLowerCase();

  for (const allergy of allergies) {
    const keywords = allergenMap[allergy] || [];
    for (const keyword of keywords) {
      if (lowerName.includes(keyword)) {
        return allergy;
      }
    }
  }

  return null;
};

// Fetch and process recommendations
const fetchRecommendations = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // Get user data from session storage
    const storedData = sessionStorage.getItem("nutriharian-user-data");
    if (!storedData) {
      router.push("/input");
      return;
    }

    userData.value = JSON.parse(storedData);
    const targetCalories = calculateCalories(userData.value!);

    // Fetch from API
    const response = await $fetch<FoodItem[]>("/api/recommend", {
      query: {
        calories: targetCalories,
      },
    });

    if (!response || response.length === 0) {
      throw new Error("Tidak ada data menu yang tersedia");
    }

    // Distribute calories: 30% breakfast, 40% lunch, 30% dinner
    const breakfastCal = targetCalories * 0.3;
    const lunchCal = targetCalories * 0.4;
    const dinnerCal = targetCalories * 0.3;

    // Helper to select foods for a meal
    const selectFoodsForMeal = (
      targetCal: number,
      mealType: string,
      usedIds: Set<number>,
    ): MenuItem[] => {
      const selected: MenuItem[] = [];
      let currentCal = 0;
      const allergies = userData.value?.alergi || [];

      // Shuffle foods
      const shuffled = [...response].sort(() => Math.random() - 0.5);

      for (const food of shuffled) {
        if (usedIds.has(food.id)) continue;
        if (currentCal >= targetCal * 0.9) break;

        const allergen = containsAllergen(food.name, allergies);

        if (allergen) {
          // Find alternative
          const alternative = shuffled.find(
            (alt) =>
              !usedIds.has(alt.id) &&
              !selected.some((s) => s.id === alt.id) &&
              !containsAllergen(alt.name, allergies) &&
              Math.abs(alt.nutrition.calories - food.nutrition.calories) < 100,
          );

          if (alternative) {
            usedIds.add(alternative.id);
            const menuItem: MenuItem = {
              id: alternative.id,
              name: alternative.name,
              nutrition: alternative.nutrition,
              reason: `Dipilih sebagai pengganti karena Anda menghindari ${allergen}. ${generateReason(alternative, mealType)}`,
              isAlternative: true,
              alternativeFor: food.name,
            };
            selected.push(menuItem);
            currentCal += alternative.nutrition.calories;
          }
        } else {
          usedIds.add(food.id);
          const menuItem: MenuItem = {
            id: food.id,
            name: food.name,
            nutrition: food.nutrition,
            reason: generateReason(food, mealType),
            isAlternative: false,
            alternativeFor: "",
          };
          selected.push(menuItem);
          currentCal += food.nutrition.calories;

          // Limit items per meal
          if (selected.length >= 3) break;
        }
      }

      return selected;
    };

    const usedIds = new Set<number>();

    recommendation.value = {
      targetCalories,
      meals: {
        breakfast: selectFoodsForMeal(breakfastCal, "breakfast", usedIds),
        lunch: selectFoodsForMeal(lunchCal, "lunch", usedIds),
        dinner: selectFoodsForMeal(dinnerCal, "dinner", usedIds),
      },
    };
  } catch (err: unknown) {
    console.error("Error fetching recommendations:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan saat memuat rekomendasi";
    error.value = errorMessage;
  } finally {
    isLoading.value = false;
  }
};

// Calculate total calories
const totalCalories = computed(() => {
  if (!recommendation.value) return 0;
  const { breakfast, lunch, dinner } = recommendation.value.meals;
  const allItems = [...breakfast, ...lunch, ...dinner];
  return Math.round(
    allItems.reduce((sum, item) => sum + item.nutrition.calories, 0),
  );
});

// Meal sections for display
const mealSections = computed(() => {
  if (!recommendation.value) return [];

  const targetCal = recommendation.value.targetCalories;

  return [
    {
      title: "Menu Pagi",
      icon: "utensils",
      time: "06:00 - 09:00",
      items: recommendation.value.meals.breakfast,
      targetCalories: Math.round(targetCal * 0.3),
    },
    {
      title: "Menu Siang",
      icon: "utensils",
      time: "12:00 - 14:00",
      items: recommendation.value.meals.lunch,
      targetCalories: Math.round(targetCal * 0.4),
    },
    {
      title: "Menu Malam",
      icon: "utensils",
      time: "18:00 - 20:00",
      items: recommendation.value.meals.dinner,
      targetCalories: Math.round(targetCal * 0.3),
    },
  ];
});

const refreshRecommendation = async () => {
  await fetchRecommendations();
};

onMounted(() => {
  fetchRecommendations();
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const listVariant = {
  initial: { opacity: 0, x: -20 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
</script>

<template>
  <div class="py-12 md:py-16">
    <div class="container-custom">
      <Motion initial="initial" animate="enter" :variants="staggerContainer">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <Motion :variants="fadeInUp">
            <NuxtLink
              to="/input"
              class="inline-flex items-center gap-2 text-sm text-secondary-500 hover:text-primary-600 mb-2 transition-colors"
            >
              <LucideArrowLeft class="w-4 h-4" />
              Ubah Data
            </NuxtLink>
            <h1 class="text-3xl md:text-4xl font-bold text-secondary-900">
              Rekomendasi Menu Anda
            </h1>
          </Motion>
          <Motion :variants="fadeInUp">
            <UiButton
              variant="secondary"
              @click="refreshRecommendation"
              :disabled="isLoading"
            >
              <LucideRefreshCw
                class="w-4 h-4"
                :class="{ 'animate-spin': isLoading }"
              />
              Coba Menu Lain
            </UiButton>
          </Motion>
        </div>
      </Motion>

      <AnimatePresence mode="wait">
        <Motion
          v-if="isLoading"
          key="loading"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          class="flex flex-col items-center justify-center py-20"
        >
          <LucideLoader2 class="w-12 h-12 text-primary-600 animate-spin mb-4" />
          <p class="text-secondary-600 text-lg">
            Menyiapkan rekomendasi untuk Anda...
          </p>
        </Motion>

        <Motion
          v-else-if="error"
          key="error"
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          class="max-w-xl mx-auto"
        >
          <UiCard variant="warning" padding="lg">
            <div class="text-center">
              <LucideAlertTriangle
                class="w-12 h-12 text-amber-600 mx-auto mb-4"
              />
              <h3 class="text-lg font-semibold text-secondary-900 mb-2">
                Oops! Terjadi Kesalahan
              </h3>
              <p class="text-secondary-600 mb-6">{{ error }}</p>
              <div
                class="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <UiButton variant="primary" @click="fetchRecommendations">
                  <LucideRefreshCw class="w-4 h-4" />
                  Coba Lagi
                </UiButton>
                <NuxtLink to="/input" class="btn-secondary">
                  <LucideEdit class="w-4 h-4" />
                  Ubah Data
                </NuxtLink>
              </div>
            </div>
          </UiCard>
        </Motion>

        <Motion
          v-else-if="recommendation"
          key="content"
          initial="initial"
          animate="enter"
          :variants="staggerContainer"
          class="space-y-8"
        >
          <Motion :variants="fadeInUp">
            <MenuCalorieSummary
              :total-calories="totalCalories"
              :target-calories="recommendation.targetCalories"
              :goal="userData?.tujuan || 'maintain'"
            />
          </Motion>

          <div
            v-if="userData?.alergi && userData.alergi.length > 0"
            class="p-4 rounded-xl bg-amber-50 border border-amber-200"
          >
            <div class="flex items-start gap-3">
              <LucideAlertCircle
                class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
              />
              <div>
                <p class="text-sm font-medium text-amber-800 mb-1">
                  Alergi yang Dihindari
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="allergy in userData.alergi"
                    :key="allergy"
                    class="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium capitalize"
                  >
                    {{ allergy }}
                  </span>
                </div>
                <p class="text-xs text-amber-600 mt-2">
                  Menu yang mengandung bahan ini sudah diganti dengan alternatif
                  yang aman.
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <Motion
              v-for="(section, index) in mealSections"
              :key="index"
              :variants="listVariant"
              :custom="index"
            >
              <MenuMealSection :section="section" />
            </Motion>
          </div>

          <Motion
            :variants="fadeInUp"
            class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <UiButton
              variant="primary"
              size="lg"
              @click="refreshRecommendation"
            >
              <LucideRefreshCw class="w-5 h-5" />
              Dapatkan Menu Berbeda
            </UiButton>
            <NuxtLink to="/input" class="btn-secondary py-3 px-6">
              <LucideEdit class="w-5 h-5" />
              Ubah Data Diri
            </NuxtLink>
          </Motion>

          <Motion :variants="fadeInUp">
            <MenuExplanationSection />
          </Motion>
        </Motion>
      </AnimatePresence>
    </div>
  </div>
</template>
