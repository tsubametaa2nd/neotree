<script setup lang="ts">
interface CheckboxOption {
  value: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string[];
    id: string;
    label: string;
    options: CheckboxOption[];
    helper?: string;
    columns?: 1 | 2 | 3;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    columns: 2,
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const toggleOption = (value: string) => {
  if (props.disabled) return;
  const newValue = props.modelValue.includes(value)
    ? props.modelValue.filter((v) => v !== value)
    : [...props.modelValue, value];
  emit("update:modelValue", newValue);
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};
</script>

<template>
  <fieldset class="space-y-2 sm:space-y-3">
    <legend class="input-label">
      {{ label }}
      <span v-if="required" class="text-primary-600">*</span>
    </legend>
    <div :class="['grid gap-2 sm:gap-4', columnClasses[columns]]">
      <label
        v-for="option in options"
        :key="option.value"
        :for="`${id}-${option.value}`"
        class="group flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden"
        :class="[
          modelValue.includes(option.value)
            ? 'border-primary-500 bg-primary-50/80 shadow-sm ring-1 ring-primary-500/20'
            : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50/30 hover:shadow-sm',
          { 'opacity-60 cursor-not-allowed': disabled },
        ]"
      >
        <div
          class="relative flex items-center justify-center mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border transition-all duration-200 shrink-0"
          :class="[
            modelValue.includes(option.value)
              ? 'border-primary-600 bg-primary-600'
              : 'border-secondary-300 group-hover:border-primary-400 bg-white shadow-sm',
          ]"
        >
          <LucideCheck
            class="w-3 h-3 sm:w-4 sm:h-4 text-white transition-all duration-200 transform"
            :class="
              modelValue.includes(option.value)
                ? 'scale-100 opacity-100'
                : 'scale-0 opacity-0'
            "
          />
          <input
            :id="`${id}-${option.value}`"
            type="checkbox"
            :checked="modelValue.includes(option.value)"
            :disabled="disabled"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            @change="toggleOption(option.value)"
          />
        </div>
        <span
          class="text-sm sm:text-base font-medium transition-colors duration-200 pt-0.5"
          :class="
            modelValue.includes(option.value)
              ? 'text-primary-900'
              : 'text-secondary-700'
          "
        >
          {{ option.label }}
        </span>
      </label>
    </div>
    <p v-if="helper" class="input-helper text-xs sm:text-sm">
      {{ helper }}
    </p>
  </fieldset>
</template>
