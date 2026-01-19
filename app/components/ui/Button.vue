<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    type: "button",
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
  },
);

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const sizeClasses = {
  sm: "text-sm py-2 px-4",
  md: "text-base py-3 px-6",
  lg: "text-lg py-4 px-8",
};
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClasses[variant], sizeClasses[size]]"
  >
    <LucideLoader2 v-if="loading" class="w-5 h-5 animate-spin" />
    <slot />
  </button>
</template>
