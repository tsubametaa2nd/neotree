<script setup lang="ts">
import { Motion, AnimatePresence } from "motion-v";
import {
  LucideUserRound,
  LucideMicroscope,
  LucideShieldCheck,
  LucideArrowRight,
  LucidePlayCircle,
  LucideSparkles,
  LucideCheckCircle2,
  LucideHeartPulse,
  LucideActivity,
  LucideUtensils,
  LucideStethoscope,
  LucideLeaf,
} from "#components";
import CountUp from "../components/ui/CountUp.vue";

useSeoMeta({
  title: "NutriHarian - Konsultasi Gizi & Menu Sehat Personal",
  description:
    "Platform konsultasi gizi pintar yang menyajikan rekomendasi menu sehat harian berbasis medis. Disesuaikan dengan metabolisme dan kebutuhan tubuh Anda.",
});

const features = [
  {
    icon: LucideUserRound,
    title: "Personalisasi Medis",
    description:
      "Analisis mendalam berdasarkan profil biometrik (IMT, BMR, TDEE) untuk presisi kebutuhan kalori.",
    delay: 0.1,
  },
  {
    icon: LucideMicroscope,
    title: "Basis Sains Teruji",
    description:
      "Algoritma nutrisi yang dikembangkan mengikuti standar kesehatan klinis dan jurnal gizi terpercaya.",
    delay: 0.2,
  },
  {
    icon: LucideShieldCheck,
    title: "Privasi Kesehatan",
    description:
      "Data kesehatan Anda dienkripsi dan hanya digunakan untuk keperluan kalkulasi nutrisi.",
    delay: 0.3,
  },
];

const steps = [
  {
    number: "01",
    title: "Analisis Profil",
    description:
      "Input data fisik Anda untuk kalkulasi kebutuhan energi basal & aktif.",
    icon: LucideActivity,
  },
  {
    number: "02",
    title: "Target Klinis",
    description:
      "Tentukan goal: Penurunan berat badan, maintenance, atau muscle gain.",
    icon: LucideHeartPulse,
  },
  {
    number: "03",
    title: "Resep Menu",
    description:
      "Dapatkan jadwal makan harian lengkap dengan makronutrisi seimbang.",
    icon: LucideUtensils,
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Menu Variatif" },
  { value: 100, suffix: "%", label: "Personal" },
  { value: 24, suffix: "/7", label: "Akses Layanan" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
</script>

<template>
  <div class="overflow-x-hidden font-sans text-secondary-800 bg-secondary-50">
    <section
      class="relative min-h-[92vh] flex items-center overflow-hidden bg-secondary-50"
    >
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-secondary-50 to-secondary-50"
        ></div>

        <Motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 0.5, scale: 1, x: [0, 40, 0], y: [0, 20, 0] }"
          :transition="{ duration: 12, repeat: Infinity, ease: 'easeInOut' }"
          class="absolute -top-[5%] -right-[5%] w-[700px] h-[700px] bg-primary-200/30 rounded-full blur-[100px]"
        />
        <Motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 0.4, scale: 1, x: [0, -20, 0], y: [0, -40, 0] }"
          :transition="{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }"
          class="absolute top-[30%] -left-[5%] w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[120px]"
        />
      </div>

      <div
        class="container-custom relative z-10 pt-20 flex flex-col items-center text-center"
      >
        <div class="max-w-4xl mx-auto">
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6 }"
            class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-primary-200/50 text-primary-700 text-sm font-bold mb-8 shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <div
              class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center"
            >
              <LucideStethoscope class="w-3.5 h-3.5 text-primary-600" />
            </div>
            <span class="tracking-wide text-xs font-bold uppercase"
              >Partner Sehatmu</span
            >
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.1 }"
          >
            <h1
              class="text-5xl lg:text-7xl font-extrabold text-secondary-900 leading-[1.1] tracking-tight mb-6"
            >
              Ubah Gaya Hidup <br />
              <span class="relative whitespace-nowrap text-primary-600">
                <span class="relative z-10">Bukan Sekadar Diet.</span>
                <span
                  class="absolute bottom-2 left-0 w-full h-3 bg-primary-200/50 -z-0 skew-x-12 transform origin-left scale-x-100"
                ></span>
              </span>
            </h1>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
          >
            <p
              class="text-xl text-secondary-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium text-balance"
            >
              Makan enak tetap bisa sehat. Kami bantu kamu menyusun
              <span
                class="text-secondary-900 font-semibold underline decoration-primary-300 decoration-2 underline-offset-4"
                >pola makan
              </span>
              yang menyenangkan, fleksibel dan tetap mencapai target berat
              badanmu.
            </p>
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.3 }"
            class="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <NuxtLink
              to="/input"
              class="btn-primary group h-14 px-8 text-lg rounded-2xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <span>Mulai Perubahan</span>
              <div
                class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors"
              >
                <LucideArrowRight class="w-5 h-5 text-white" />
              </div>
            </NuxtLink>

            <a
              href="#cara-kerja"
              class="btn-secondary h-14 px-8 text-lg rounded-2xl group/btn hover:bg-secondary-50 transition-all duration-300"
            >
              <LucidePlayCircle
                class="w-5 h-5 text-secondary-400 group-hover/btn:text-primary-600 transition-colors"
              />
              <span>Lihat Demo</span>
            </a>
          </Motion>

          <Motion
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.6 }"
            class="mt-14 pt-8 border-t border-secondary-200/60 flex items-center justify-center gap-12"
          >
            <div v-for="stat in stats" :key="stat.label">
              <h4
                class="text-3xl font-extrabold text-secondary-900 tracking-tight"
              >
                <CountUp
                  :to="stat.value"
                  :suffix="stat.suffix"
                  :duration="2.5"
                />
              </h4>
              <p
                class="text-sm text-secondary-500 font-semibold uppercase tracking-wider mt-1"
              >
                {{ stat.label }}
              </p>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white relative z-10">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <span
            class="text-primary-600 font-bold tracking-wider text-sm uppercase bg-primary-50 px-3 py-1 rounded-full"
            >Keunggulan Klinis</span
          >
          <h2
            class="text-3xl md:text-4xl font-bold text-secondary-900 mt-4 mb-4"
          >
            Standar Kesehatan Modern
          </h2>
          <p class="text-secondary-500 text-lg">
            Kami tidak menebak. Setiap rekomendasi dihitung berdasarkan formula
            standar medis yang diakui secara internasional.
          </p>
        </div>

        <Motion
          initial="initial"
          :whileInView="'enter'"
          :viewport="{ once: true, margin: '-100px' }"
          :variants="staggerContainer"
          class="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Motion
            v-for="(feature, index) in features"
            :key="index"
            :variants="fadeInUp"
            class="group p-8 rounded-[2rem] bg-secondary-50 border border-secondary-100 hover:bg-white hover:border-primary-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div
              class="w-14 h-14 mb-6 rounded-2xl bg-white shadow-soft flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-500 transition-all duration-300"
            >
              <component
                :is="feature.icon"
                class="w-7 h-7 text-primary-600 group-hover:text-white transition-colors"
                stroke-width="2"
              />
            </div>
            <h3 class="text-xl font-bold text-secondary-900 mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-secondary-500 leading-relaxed">
              {{ feature.description }}
            </p>
          </Motion>
        </Motion>
      </div>
    </section>

    <section id="cara-kerja" class="py-24 bg-secondary-50 overflow-hidden">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Motion
            initial="initial"
            :whileInView="'enter'"
            :viewport="{ once: true, margin: '-100px' }"
            :variants="staggerContainer"
          >
            <Motion :variants="fadeInLeft">
              <span
                class="text-primary-600 font-bold text-sm uppercase tracking-wider mb-2 block"
                >Workflow</span
              >
              <h2 class="text-4xl font-bold text-secondary-900 mb-8">
                Pola Hidup Sehat <br />Dimulai dari Data.
              </h2>
            </Motion>

            <div class="space-y-12">
              <Motion
                v-for="(step, index) in steps"
                :key="index"
                :variants="fadeInLeft"
                class="relative pl-12 group"
              >
                <div
                  v-if="index !== steps.length - 1"
                  class="absolute left-[19px] top-10 w-0.5 h-20 bg-secondary-200 group-hover:bg-primary-200 transition-colors"
                ></div>

                <div
                  class="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-secondary-200 text-secondary-400 font-bold flex items-center justify-center z-10 group-hover:border-primary-500 group-hover:text-primary-600 transition-all shadow-sm"
                >
                  <component :is="step.icon" class="w-5 h-5" stroke-width="2" />
                </div>

                <div>
                  <h3 class="text-xl font-bold text-secondary-900 mb-2">
                    {{ step.title }}
                  </h3>
                  <p class="text-secondary-600 text-lg">
                    {{ step.description }}
                  </p>
                </div>
              </Motion>
            </div>

            <Motion :variants="fadeInLeft" class="mt-12">
              <NuxtLink
                to="/input"
                class="inline-flex items-center gap-3 text-primary-700 font-bold text-lg hover:gap-4 transition-all"
              >
                Buat Rencana Saya Sekarang <LucideArrowRight class="w-5 h-5" />
              </NuxtLink>
            </Motion>
          </Motion>

          <Motion
            initial="initial"
            :whileInView="'enter'"
            :viewport="{ once: true }"
            :variants="scaleIn"
            class="relative"
          >
            <div
              class="absolute inset-0 bg-gradient-to-tr from-primary-200 to-transparent opacity-20 blur-[100px] rounded-full"
            ></div>
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
              alt="Healthy Food"
              class="relative z-10 rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 border-8 border-white w-full object-cover h-[600px]"
            />

            <Motion
              :initial="{ opacity: 0, x: -20 }"
              :whileInView="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.5, duration: 0.5 }"
              class="absolute bottom-10 -left-10 z-20 bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs border border-white/20"
            >
              <div
                class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600"
              >
                <LucideLeaf class="w-6 h-6" />
              </div>
              <div>
                <div class="font-bold text-secondary-900">100% Alami</div>
                <div class="text-sm text-secondary-500">
                  Bahan rekomendasi segar
                </div>
              </div>
            </Motion>
          </Motion>
        </div>
      </div>
    </section>

    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-secondary-900 z-0">
        <div
          class="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"
        ></div>
        <Motion
          :animate="{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }"
          :transition="{ duration: 10, repeat: Infinity, ease: 'linear' }"
          class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px]"
        />
      </div>

      <Motion
        initial="initial"
        :whileInView="'enter'"
        :viewport="{ once: true }"
        :variants="staggerContainer"
        class="container-custom relative z-10 text-center text-white"
      >
        <Motion :variants="fadeInUp">
          <h2 class="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Investasi Kesehatan <br />
            <span class="text-primary-400">Sehat Gak Harus Mahal.</span>
          </h2>
        </Motion>

        <Motion :variants="fadeInUp">
          <p class="text-xl text-secondary-300 max-w-2xl mx-auto mb-12">
            Dapatkan akses penuh ke panduan nutrisi standar medis tanpa biaya
            langganan sepeser pun. Karena kesehatan adalah investasi terbaik
            Anda.
          </p>
        </Motion>

        <Motion
          :variants="scaleIn"
          class="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <NuxtLink
            to="/input"
            class="px-10 py-5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-lg shadow-primary-900/50 transition-all hover:scale-105 flex items-center gap-3 text-lg"
          >
            Mulai Gratis Sekarang
          </NuxtLink>
        </Motion>

        <Motion
          :variants="fadeInUp"
          class="mt-8 text-sm text-secondary-500 flex items-center justify-center gap-2"
        >
          <LucideShieldCheck class="w-4 h-4" />
          Tanpa syarat tersembunyi. Akses instan.
        </Motion>
      </Motion>
    </section>
  </div>
</template>

<style scoped>
</style>
