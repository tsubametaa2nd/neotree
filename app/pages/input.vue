<script setup lang="ts">
import { Motion } from "motion-v";
useSeoMeta({
  title: "Mulai Rekomendasi - Neotreetion",
  description:
    "Masukkan data diri Anda untuk mendapatkan rekomendasi menu sehat harian yang dipersonalisasi.",
});

const router = useRouter();

// Form state
const formData = reactive({
  umur: "" as string | number,
  tinggiBadan: "" as string | number,
  beratBadan: "" as string | number,
  tujuan: "",
  alergi: [] as string[],
});

const goalOptions = [
  {
    value: "maintain",
    label: "Menjaga Berat Badan",
    description: "Untuk Anda yang ingin mempertahankan berat badan saat ini.",
  },
  {
    value: "lose",
    label: "Menurunkan Berat Badan",
    description:
      "Untuk Anda yang ingin mengurangi berat badan secara bertahap.",
  },
  {
    value: "gain",
    label: "Menaikkan Berat Badan",
    description: "Untuk Anda yang ingin meningkatkan berat badan dengan sehat.",
  },
];

const allergyOptions = [
  { value: "susu", label: "Susu & Produk Susu" },
  { value: "telur", label: "Telur" },
  { value: "kacang", label: "Kacang-kacangan" },
  { value: "seafood", label: "Seafood / Makanan Laut" },
  { value: "gluten", label: "Gluten (Gandum, dll)" },
  { value: "kedelai", label: "Kedelai" },
];

const errors = reactive({
  umur: "",
  tinggiBadan: "",
  beratBadan: "",
  tujuan: "",
});

const isSubmitting = ref(false);

const validateForm = (): boolean => {
  let isValid = true;

  errors.umur = "";
  errors.tinggiBadan = "";
  errors.beratBadan = "";
  errors.tujuan = "";

  if (
    !formData.umur ||
    Number(formData.umur) < 10 ||
    Number(formData.umur) > 100
  ) {
    errors.umur = "Masukkan umur yang valid (10-100 tahun)";
    isValid = false;
  }

  if (
    !formData.tinggiBadan ||
    Number(formData.tinggiBadan) < 100 ||
    Number(formData.tinggiBadan) > 250
  ) {
    errors.tinggiBadan = "Masukkan tinggi badan yang valid (100-250 cm)";
    isValid = false;
  }

  if (
    !formData.beratBadan ||
    Number(formData.beratBadan) < 30 ||
    Number(formData.beratBadan) > 300
  ) {
    errors.beratBadan = "Masukkan berat badan yang valid (30-300 kg)";
    isValid = false;
  }

  if (!formData.tujuan) {
    errors.tujuan = "Pilih tujuan kesehatan Anda";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  const userData = {
    umur: Number(formData.umur),
    tinggiBadan: Number(formData.tinggiBadan),
    beratBadan: Number(formData.beratBadan),
    tujuan: formData.tujuan,
    alergi: formData.alergi,
  };

  sessionStorage.setItem("neotreetion-user-data", JSON.stringify(userData));

  await router.push("/rekomendasi");
};

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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};
</script>

<template>
  <div class="py-8 sm:py-12 md:py-16">
    <div class="container-custom px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <Motion
          initial="initial"
          animate="enter"
          :variants="staggerContainer"
          class="mb-6 sm:mb-10"
        >
          <div class="text-center">
            <Motion :variants="fadeInUp">
              <h1
                class="text-2xl sm:text-3xl md:text-5xl font-bold text-secondary-900 mb-3 sm:mb-4"
              >
                Mari Mulai
              </h1>
            </Motion>
            <Motion :variants="fadeInUp">
              <p
                class="text-secondary-600 max-w-2xl mx-auto text-base sm:text-lg px-2"
              >
                Jawab beberapa pertanyaan singkat untuk mendapatkan rekomendasi
                menu yang sesuai dengan kebutuhan dan preferensi Anda.
              </p>
            </Motion>
          </div>
        </Motion>
      </div>

      <UiCard padding="lg" class="w-full relative overflow-hidden">
        <Motion
          initial="initial"
          animate="enter"
          :variants="staggerContainer"
          class="relative z-10"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6 sm:space-y-10">
            <Motion
              :variants="fadeInUp"
              class="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-primary-50 border border-primary-100"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm flex-shrink-0"
                >
                  <LucideInfo class="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm sm:text-base text-secondary-700 leading-relaxed"
                  >
                    <strong
                      class="text-secondary-900 block mb-1 text-base sm:text-lg"
                      >Mengapa data ini diperlukan?</strong
                    >
                    Informasi ini digunakan untuk menghitung estimasi kebutuhan
                    kalori harian Anda secara akurat menggunakan rumus
                    Mifflin-St Jeor. Data diproses lokal di perangkat Anda.
                  </p>
                </div>
              </div>
            </Motion>

            <Motion
              :variants="staggerContainer"
              class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
            >
              <Motion :variants="fadeInUp" class="space-y-4 sm:space-y-6">
                <h2
                  class="text-lg sm:text-xl font-bold text-secondary-900 flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-secondary-100"
                >
                  <div
                    class="p-1.5 sm:p-2 bg-primary-100 rounded-lg text-primary-600"
                  >
                    <LucideUser class="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  Informasi Dasar
                </h2>

                <div class="grid grid-cols-1 gap-4 sm:gap-6">
                  <FormsFormInput
                    id="umur"
                    v-model="formData.umur"
                    type="number"
                    label="Umur"
                    placeholder="Contoh: 25"
                    :min="10"
                    :max="100"
                    required
                    :error="errors.umur"
                    helper="Usia dalam tahun"
                  />

                  <div class="grid grid-cols-2 gap-3 sm:gap-4">
                    <FormsFormInput
                      id="tinggiBadan"
                      v-model="formData.tinggiBadan"
                      type="number"
                      label="Tinggi Badan"
                      placeholder="170"
                      :min="100"
                      :max="250"
                      required
                      :error="errors.tinggiBadan"
                      helper="cm"
                    />

                    <FormsFormInput
                      id="beratBadan"
                      v-model="formData.beratBadan"
                      type="number"
                      label="Berat Badan"
                      placeholder="65"
                      :min="30"
                      :max="300"
                      required
                      :error="errors.beratBadan"
                      helper="kg"
                    />
                  </div>
                </div>
              </Motion>

              <Motion :variants="fadeInUp" class="space-y-6 sm:space-y-8">
                <div class="space-y-3 sm:space-y-4">
                  <h2
                    class="text-lg sm:text-xl font-bold text-secondary-900 flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-secondary-100"
                  >
                    <div
                      class="p-1.5 sm:p-2 bg-primary-100 rounded-lg text-primary-600"
                    >
                      <LucideTarget class="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    Tujuan Kesehatan
                  </h2>

                  <FormsFormRadioGroup
                    id="tujuan"
                    v-model="formData.tujuan"
                    label=""
                    :options="goalOptions"
                    required
                  />
                  <p
                    v-if="errors.tujuan"
                    class="text-sm text-error mt-1 flex items-center gap-1"
                  >
                    <LucideAlertCircle class="w-4 h-4" />
                    {{ errors.tujuan }}
                  </p>
                </div>

                <div class="space-y-3 sm:space-y-4">
                  <h2
                    class="text-lg sm:text-xl font-bold text-secondary-900 flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-secondary-100"
                  >
                    <div
                      class="p-1.5 sm:p-2 bg-primary-100 rounded-lg text-primary-600"
                    >
                      <LucideAlertCircle class="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    Alergi Makanan (Opsional)
                  </h2>

                  <FormsFormCheckboxGroup
                    id="alergi"
                    v-model="formData.alergi"
                    label=""
                    :options="allergyOptions"
                    :columns="2"
                    helper="Pilih bahan makanan yang ingin Anda hindari."
                  />
                </div>
              </Motion>
            </Motion>

            <Motion
              :variants="fadeInUp"
              class="pt-6 sm:pt-8 border-t border-secondary-100 flex justify-center sm:justify-end"
            >
              <UiButton
                type="submit"
                variant="primary"
                size="lg"
                :loading="isSubmitting"
                class="w-full sm:w-auto sm:min-w-[200px] text-base sm:text-lg py-3.5 sm:py-4"
              >
                Dapatkan Rekomendasi
              </UiButton>
            </Motion>
          </form>
        </Motion>
      </UiCard>
    </div>
  </div>
</template>
