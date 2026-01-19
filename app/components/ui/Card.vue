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
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10 md:p-12",
};
</script>

<template>
  <div
    class="rounded-2xl shadow-soft border transition-all duration-300"
    :class="[variantClasses[variant], paddingClasses[padding]]"
  >
    <slot />
  </div>
</template>
