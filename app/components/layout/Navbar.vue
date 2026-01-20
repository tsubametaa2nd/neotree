<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Motion } from "motion-v";

const route = useRoute();

const navLinks = [
  { name: "Beranda", path: "/" },
  { name: "Mulai", path: "/input" },
];

const isOpen = ref(false);
const isScrolled = ref(false);

const isActiveRoute = (path: string) => {
  return route.path === path;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
    :class="[
      isScrolled
        ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
        : 'py-6 bg-transparent',
    ]"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="relative z-20 group">
          <Motion
            initial="{ opacity: 0, x: -20 }"
            animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.5, ease: 'easeOut' }"
          >
            <img
              src="/assets/nutree.svg"
              alt="Neotree Logo"
              class="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Motion>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-3">
          <NuxtLink
            to="/"
            class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border border-transparent"
            :class="
              isActiveRoute('/')
                ? 'bg-slate-100 text-slate-900 border-slate-200 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            "
          >
            Beranda
          </NuxtLink>

          <NuxtLink
            to="/input"
            class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group isolate"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transition-all duration-300 opacity-100 group-hover:opacity-90"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            ></div>

            <span class="relative z-10 text-white flex items-center gap-2">
              Mulai
              <LucideArrowRight
                class="w-4 h-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </NuxtLink>
        </div>

        <button
          @click="isOpen = !isOpen"
          class="md:hidden relative z-50 p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <div class="w-6 h-5 flex flex-col justify-between">
            <span
              class="w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left"
              :class="isOpen ? 'rotate-45 translate-x-px' : ''"
            ></span>
            <span
              class="w-full h-0.5 bg-current rounded-full transition-all duration-300"
              :class="isOpen ? 'opacity-0 scale-0' : ''"
            ></span>
            <span
              class="w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left"
              :class="isOpen ? '-rotate-45 translate-x-px' : ''"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        class="fixed inset-0 z-[60] md:hidden"
        :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'"
      >
        <div
          class="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300"
          :class="isOpen ? 'opacity-100' : 'opacity-0'"
          @click="isOpen = false"
        ></div>

        <div
          class="absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col p-6"
          :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
        >
          <div class="flex items-center justify-between mb-8">
            <img
              src="/assets/nutree.svg"
              alt="Neotree Logo"
              class="h-10 w-10 object-contain"
            />
            <button
              @click="isOpen = false"
              class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
            >
              <LucideX class="w-6 h-6" />
            </button>
          </div>

          <div class="flex flex-col gap-3 flex-1">
            <NuxtLink
              to="/"
              @click="isOpen = false"
              class="flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all"
              :class="
                isActiveRoute('/')
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              "
            >
              Beranda
            </NuxtLink>

            <NuxtLink
              to="/input"
              @click="isOpen = false"
              class="flex items-center gap-3 p-4 rounded-2xl font-semibold transition-all bg-primary-50 text-primary-700"
            >
              Mulai Sekarang
            </NuxtLink>
          </div>

          <div class="mt-auto pt-6 border-t border-slate-100 text-center">
            <p class="text-xs text-slate-400">© 2024 Neotree</p>
          </div>
        </div>
      </div>
    </Teleport>
  </nav>
</template>
