<script setup lang="ts">
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    id: string;
    label: string;
    options: RadioOption[];
    helper?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  {
    required: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const selectOption = (value: string) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <fieldset class="space-y-2 sm:space-y-3">
    <legend class="input-label">
      {{ label }}
      <span v-if="required" class="text-primary-600">*</span>
    </legend>
    <div class="grid grid-cols-1 gap-2 sm:gap-3">
      <label
        v-for="option in options"
        :key="option.value"
        :for="`${id}-${option.value}`"
        class="group flex items-start gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden"
        :class="[
          modelValue === option.value
            ? 'border-primary-500 bg-primary-50/80 shadow-md ring-1 ring-primary-500/20'
            : 'border-secondary-200 hover:border-primary-300 hover:bg-primary-50/30 hover:shadow-sm',
          { 'opacity-50 cursor-not-allowed': disabled },
        ]"
      >
        <div
          class="relative flex items-center justify-center mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full border transition-all duration-300 shrink-0"
          :class="[
            modelValue === option.value
              ? 'border-primary-600 bg-primary-600'
              : 'border-secondary-300 group-hover:border-primary-400 bg-white',
          ]"
        >
          <div
            class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white transition-transform duration-300 scale-0"
            :class="{ 'scale-100': modelValue === option.value }"
          ></div>
          <input
            :id="`${id}-${option.value}`"
            type="radio"
            :name="id"
            :checked="modelValue === option.value"
            :disabled="disabled"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            @change="selectOption(option.value)"
          />
        </div>

        <div class="flex-1 z-10 min-w-0">
          <span
            class="block font-semibold text-sm sm:text-base transition-colors duration-200"
            :class="
              modelValue === option.value
                ? 'text-primary-900'
                : 'text-secondary-800'
            "
          >
            {{ option.label }}
          </span>
          <span
            v-if="option.description"
            class="block mt-0.5 sm:mt-1 text-xs sm:text-sm leading-relaxed transition-colors duration-200"
            :class="
              modelValue === option.value
                ? 'text-primary-700/80'
                : 'text-secondary-500'
            "
          >
            {{ option.description }}
          </span>
        </div>

        <LucideCheck
          v-if="modelValue === option.value"
          class="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 flex-shrink-0 animate-scale-in opacity-0"
          style="animation-fill-mode: forwards"
        />
      </label>
    </div>
    <p v-if="helper" class="input-helper">
      {{ helper }}
    </p>
  </fieldset>
</template>
