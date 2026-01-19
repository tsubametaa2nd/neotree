<script setup lang="ts">
interface Option {
  value: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    id: string;
    label: string;
    options: Option[];
    placeholder?: string;
    helper?: string;
    error?: string;
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

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="text-primary-600">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      class="input appearance-none bg-no-repeat bg-right pr-12 cursor-pointer"
      :class="{
        'border-error text-error focus:border-error focus:ring-error/20 bg-error/5':
          error,
        'text-secondary-400': !modelValue,
      }"
      :style="{
        backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'%2316a34a\\' stroke-width=\\'2.5\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><path d=\\'m6 9 6 6 6-6\\'/></svg>')`,
        backgroundPosition: 'right 1.25rem center',
      }"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="text-secondary-800 py-2"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="helper && !error" class="input-helper">
      {{ helper }}
    </p>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <p
        v-if="error"
        class="input-helper text-error font-medium flex items-center gap-1"
      >
        <span class="block w-1 h-1 rounded-full bg-error"></span>
        {{ error }}
      </p>
    </transition>
  </div>
</template>
