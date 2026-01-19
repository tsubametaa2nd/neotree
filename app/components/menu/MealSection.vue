<script setup lang="ts">
import type { MenuItem } from "./MenuItem.vue";

import {
  LucideSunrise,
  LucideSun,
  LucideSunset,
  LucideUtensils,
  LucideMoon,
} from "#components";

interface MealSection {
  title: string;
  icon: string;
  time: string;
  items: MenuItem[];
  targetCalories: number;
}

const props = defineProps<{
  section: MealSection;
}>();

const totalCalories = computed(() => {
  return props.section.items.reduce(
    (sum, item) => sum + item.nutrition.calories,
    0,
  );
});

const caloriePercentage = computed(() => {
  return Math.min(
    100,
    (totalCalories.value / props.section.targetCalories) * 100,
  );
});

const iconMap: Record<string, any> = {
  sunrise: LucideSunrise,
  sun: LucideSun,
  sunset: LucideSunset,
  utensils: LucideUtensils,
  moon: LucideMoon,
  LucideUtensils: LucideUtensils,
};
</script>

<template>
  <UiCard padding="lg">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center"
        >
          <component
            :is="iconMap[section.icon]"
            class="w-6 h-6 text-primary-600"
          />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-secondary-900">
            {{ section.title }}
          </h3>
          <p class="text-sm text-secondary-500">{{ section.time }}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold text-primary-600">
          {{ Math.round(totalCalories) }}
        </p>
        <p class="text-xs text-secondary-500">
          dari {{ section.targetCalories }} kkal
        </p>
      </div>
    </div>

    <div class="mb-6">
      <div class="h-2 bg-secondary-100 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500 ease-out"
          :class="caloriePercentage > 100 ? 'bg-amber-500' : 'bg-primary-500'"
          :style="{ width: `${caloriePercentage}%` }"
        />
      </div>
    </div>

    <div class="space-y-4">
      <p
        v-if="section.items.length === 0"
        class="text-secondary-500 text-center py-4"
      >
        Tidak ada menu untuk ditampilkan
      </p>
      <div
        v-for="item in section.items"
        :key="item.id"
        class="group p-5 rounded-xl border transition-all duration-300 hover:shadow-soft"
        :class="
          item.isAlternative
            ? 'bg-amber-50 border-amber-200'
            : 'bg-white border-secondary-200 hover:border-primary-300'
        "
      >
        <div v-if="item.isAlternative" class="flex items-center gap-2 mb-3">
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium"
          >
            <LucideRefreshCw class="w-3 h-3" />
            Menu Alternatif
          </span>
          <span v-if="item.alternativeFor" class="text-xs text-amber-600">
            Pengganti: {{ item.alternativeFor }}
          </span>
        </div>

        <div class="flex items-start justify-between gap-4 mb-4">
          <h4
            class="font-semibold text-secondary-900 group-hover:text-primary-700 transition-colors"
          >
            {{ item.name }}
          </h4>
          <div
            class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium flex-shrink-0"
          >
            <LucideFlame class="w-4 h-4" />
            {{ Math.round(item.nutrition.calories) }} kkal
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="text-center p-2 rounded-lg bg-secondary-50">
            <p class="text-xs text-secondary-500 mb-0.5">Protein</p>
            <p class="font-medium text-secondary-800">
              {{ item.nutrition.protein.toFixed(1) }}g
            </p>
          </div>
          <div class="text-center p-2 rounded-lg bg-secondary-50">
            <p class="text-xs text-secondary-500 mb-0.5">Lemak</p>
            <p class="font-medium text-secondary-800">
              {{ item.nutrition.fat.toFixed(1) }}g
            </p>
          </div>
          <div class="text-center p-2 rounded-lg bg-secondary-50">
            <p class="text-xs text-secondary-500 mb-0.5">Karbohidrat</p>
            <p class="font-medium text-secondary-800">
              {{ item.nutrition.carbs.toFixed(1) }}g
            </p>
          </div>
        </div>

        <div
          v-if="item.reason"
          class="flex items-start gap-2 p-3 rounded-lg bg-primary-50 border border-primary-100"
        >
          <LucideLightbulb
            class="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5"
          />
          <p class="text-sm text-secondary-700 leading-relaxed">
            {{ item.reason }}
          </p>
        </div>
      </div>
    </div>
  </UiCard>
</template>
