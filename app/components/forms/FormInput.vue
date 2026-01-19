<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    type?: "text" | "number" | "email" | "tel";
    id: string;
    label: string;
    placeholder?: string;
    helper?: string;
    error?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
  }>(),
  {
    type: "text",
    required: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = props.type === "number" ? Number(target.value) : target.value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="text-primary-600">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      class="input"
      :class="{
        'border-error text-error focus:border-error focus:ring-error/20 bg-error/5 placeholder:text-error/50':
          error,
      }"
      @input="handleInput"
    />
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
