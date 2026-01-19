<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    to: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    startDelay?: number;
  }>(),
  {
    duration: 2,
    suffix: "",
    prefix: "",
    startDelay: 0,
  },
);

const current = ref(0);
const elementRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let animationFrameId: number | null = null;
let hasAnimated = false;

const animate = () => {
  if (hasAnimated) return;
  hasAnimated = true;

  setTimeout(() => {
    const startTime = performance.now();
    const startValue = 0;
    const endValue = props.to;
    const durationMs = props.duration * 1000;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      current.value = Math.floor(startValue + (endValue - startValue) * ease);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        current.value = endValue; // Ensure exact final value
      }
    };

    animationFrameId = requestAnimationFrame(step);
  }, props.startDelay * 1000);
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
          observer?.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );

  if (elementRef.value) {
    observer.observe(elementRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
</script>

<template>
  <span ref="elementRef" class="tabular-nums">
    {{ prefix }}{{ current }}{{ suffix }}
  </span>
</template>
