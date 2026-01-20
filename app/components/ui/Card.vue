<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "default" | "highlight" | "warning";
    padding?: "sm" | "md" | "lg" | "xl";
  }>(),
  {
    variant: "default",
    padding: "md",
  },
);

const variantClasses = {
  default: "bg-white border-secondary-100",
  highlight: "bg-primary-50 border-primary-200",
  warning: "bg-amber-50 border-amber-200",
};

const paddingClasses = {
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-5 sm:p-6 md:p-8",
  xl: "p-6 sm:p-8 md:p-10 lg:p-12",
};
</script>

<template>
  <div
    class="rounded-xl sm:rounded-2xl shadow-soft border transition-all duration-300"
    :class="[variantClasses[variant], paddingClasses[padding]]"
  >
    <slot />
  </div>
</template>
