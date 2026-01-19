<script setup lang="ts">
export interface MenuItem {
  id: number;
  name: string;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  reason: string;
  isAlternative: boolean;
  alternativeFor: string;
}

defineProps<{
  item: MenuItem;
}>();
</script>

<template>
  <div
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
      class="flex items-start gap-2 p-3 rounded-lg bg-primary-50/50 border border-primary-100"
    >
      <LucideLightbulb class="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
      <p class="text-sm text-secondary-700 leading-relaxed">
        {{ item.reason }}
      </p>
    </div>
  </div>
</template>
