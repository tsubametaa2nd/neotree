<script setup lang="ts">
const props = defineProps<{
  totalCalories: number;
  targetCalories: number;
  goal: string;
}>();

const percentage = computed(() => {
  return Math.round((props.totalCalories / props.targetCalories) * 100);
});

const goalLabel = computed(() => {
  const goals: Record<string, string> = {
    maintain: "Menjaga berat badan",
    lose: "Menurunkan berat badan",
    gain: "Menaikkan berat badan",
  };
  return goals[props.goal] || props.goal;
});

const circumference = 2 * Math.PI * 45;
const strokeDashoffset = computed(() => {
  return circumference - (percentage.value / 100) * circumference;
});
</script>

<template>
  <UiCard variant="highlight" padding="md" class="sm:!p-6 lg:!p-8">
    <div
      class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-10"
    >
      <div
        class="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0"
      >
        <svg
          class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            stroke-width="8"
            fill="none"
            class="text-primary-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            stroke-width="8"
            fill="none"
            class="text-primary-600 transition-all duration-700 ease-out"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
            stroke-linecap="round"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-xl sm:text-2xl font-bold text-primary-700"
            >{{ percentage }}%</span
          >
          <span class="text-[10px] sm:text-xs text-secondary-500"
            >tercukupi</span
          >
        </div>
      </div>

      <div class="flex-1 text-center sm:text-left">
        <h3
          class="text-base sm:text-lg font-semibold text-secondary-900 mb-1 sm:mb-2"
        >
          Kebutuhan Kalori Harian
        </h3>
        <div
          class="flex items-baseline gap-1.5 sm:gap-2 justify-center sm:justify-start mb-2 sm:mb-3"
        >
          <span
            class="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600"
          >
            {{ totalCalories.toLocaleString("id-ID") }}
          </span>
          <span class="text-secondary-500 text-sm sm:text-base"
            >/ {{ targetCalories.toLocaleString("id-ID") }} kkal</span
          >
        </div>
        <div
          class="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white shadow-sm"
        >
          <LucideTarget class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
          <span class="text-xs sm:text-sm text-secondary-700"
            >Tujuan: {{ goalLabel }}</span
          >
        </div>
      </div>
    </div>
  </UiCard>
</template>
