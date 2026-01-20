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
  title: "Neotree - Konsultasi Gizi & Menu Sehat Personal",
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
      class="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-secondary-50 py-16 sm:py-0"
    >
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-secondary-50 to-secondary-50"
        ></div>

        <Motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 0.5, scale: 1, x: [0, 40, 0], y: [0, 20, 0] }"
          :transition="{ duration: 12, repeat: Infinity, ease: 'easeInOut' }"
          class="absolute -top-[5%] -right-[5%] w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-primary-200/30 rounded-full blur-[80px] sm:blur-[100px]"
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
          class="absolute top-[30%] -left-[5%] w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-primary-100/40 rounded-full blur-[100px] sm:blur-[120px]"
        />
      </div>

      <div
        class="container-custom relative z-10 pt-24 sm:pt-20 flex flex-col items-center text-center"
      >
        <div class="max-w-4xl mx-auto px-2 sm:px-0">
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6 }"
            class="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-primary-200/50 text-primary-700 text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <div
              class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 flex items-center justify-center"
            >
              <LucideStethoscope
                class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-600"
              />
            </div>
            <span
              class="tracking-wide text-[10px] sm:text-xs font-bold uppercase"
              >Partner Sehatmu</span
            >
          </Motion>

          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.1 }"
          >
            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-secondary-900 leading-[1.15] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6"
            >
              Ubah Gaya Hidup <br class="hidden sm:block" />
              <span class="sm:hidden"> </span>
              <span class="relative whitespace-nowrap text-primary-600">
                <span class="relative z-10">Bukan Sekadar Diet.</span>
                <span
                  class="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-primary-200/50 -z-0 skew-x-12 transform origin-left scale-x-100"
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
              class="text-base sm:text-lg md:text-xl text-secondary-600 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto font-medium text-balance px-2 sm:px-0"
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
            class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full px-4 sm:px-0"
          >
            <NuxtLink
              to="/input"
              class="btn-primary group h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span>Mulai Perubahan</span>
              <div
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors"
              >
                <LucideArrowRight class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </NuxtLink>

            <a
              href="#cara-kerja"
              class="btn-secondary h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-xl sm:rounded-2xl group/btn hover:bg-secondary-50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <LucidePlayCircle
                class="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 group-hover/btn:text-primary-600 transition-colors"
              />
              <span>Lihat Demo</span>
            </a>
          </Motion>

          <Motion
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 0.6 }"
            class="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-secondary-200/60 flex items-center justify-center gap-6 sm:gap-12 w-full"
          >
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <h4
                class="text-2xl sm:text-3xl font-extrabold text-secondary-900 tracking-tight"
              >
                <CountUp
                  :to="stat.value"
                  :suffix="stat.suffix"
                  :duration="2.5"
                />
              </h4>
              <p
                class="text-xs sm:text-sm text-secondary-500 font-semibold uppercase tracking-wider mt-1"
              >
                {{ stat.label }}
              </p>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 bg-white relative z-10">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-20 px-2 sm:px-0">
          <span
            class="text-primary-600 font-bold tracking-wider text-xs sm:text-sm uppercase bg-primary-50 px-3 py-1 rounded-full"
            >Keunggulan Klinis</span
          >
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mt-4 mb-3 sm:mb-4"
          >
            Standar Kesehatan Modern
          </h2>
          <p class="text-secondary-500 text-base sm:text-lg">
            Kami tidak menebak. Setiap rekomendasi dihitung berdasarkan formula
            standar medis yang diakui secara internasional.
          </p>
        </div>

        <Motion
          initial="initial"
          :whileInView="'enter'"
          :viewport="{ once: true, margin: '-100px' }"
          :variants="staggerContainer"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <Motion
            v-for="(feature, index) in features"
            :key="index"
            :variants="fadeInUp"
            class="group p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-secondary-50 border border-secondary-100 hover:bg-white hover:border-primary-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-white shadow-soft flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-500 transition-all duration-300"
            >
              <component
                :is="feature.icon"
                class="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 group-hover:text-white transition-colors"
                stroke-width="2"
              />
            </div>
            <h3
              class="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3"
            >
              {{ feature.title }}
            </h3>
            <p class="text-secondary-500 leading-relaxed text-sm sm:text-base">
              {{ feature.description }}
            </p>
          </Motion>
        </Motion>
      </div>
    </section>

    <section
      id="cara-kerja"
      class="py-16 sm:py-24 bg-secondary-50 overflow-hidden"
    >
      <div class="container-custom">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
        >
          <Motion
            initial="initial"
            :whileInView="'enter'"
            :viewport="{ once: true, margin: '-100px' }"
            :variants="staggerContainer"
          >
            <Motion :variants="fadeInLeft">
              <span
                class="text-primary-600 font-bold text-xs sm:text-sm uppercase tracking-wider mb-2 block"
                >Workflow</span
              >
              <h2
                class="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-900 mb-6 sm:mb-8"
              >
                Pola Hidup Sehat <br class="hidden sm:block" />Dimulai dari
                Data.
              </h2>
            </Motion>

            <div class="space-y-8 sm:space-y-12">
              <Motion
                v-for="(step, index) in steps"
                :key="index"
                :variants="fadeInLeft"
                class="relative pl-10 sm:pl-12 group"
              >
                <div
                  v-if="index !== steps.length - 1"
                  class="absolute left-[15px] sm:left-[19px] top-10 w-0.5 h-16 sm:h-20 bg-secondary-200 group-hover:bg-primary-200 transition-colors"
                ></div>

                <div
                  class="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-secondary-200 text-secondary-400 font-bold flex items-center justify-center z-10 group-hover:border-primary-500 group-hover:text-primary-600 transition-all shadow-sm"
                >
                  <component
                    :is="step.icon"
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    stroke-width="2"
                  />
                </div>

                <div>
                  <h3
                    class="text-lg sm:text-xl font-bold text-secondary-900 mb-1 sm:mb-2"
                  >
                    {{ step.title }}
                  </h3>
                  <p class="text-secondary-600 text-base sm:text-lg">
                    {{ step.description }}
                  </p>
                </div>
              </Motion>
            </div>

            <Motion :variants="fadeInLeft" class="mt-8 sm:mt-12">
              <NuxtLink
                to="/input"
                class="inline-flex items-center gap-2 sm:gap-3 text-primary-700 font-bold text-base sm:text-lg hover:gap-3 sm:hover:gap-4 transition-all"
              >
                Buat Rencana Saya Sekarang
                <LucideArrowRight class="w-4 h-4 sm:w-5 sm:h-5" />
              </NuxtLink>
            </Motion>
          </Motion>

          <Motion
            initial="initial"
            :whileInView="'enter'"
            :viewport="{ once: true }"
            :variants="scaleIn"
            class="relative mt-8 lg:mt-0"
          >
            <div
              class="absolute inset-0 bg-gradient-to-tr from-primary-200 to-transparent opacity-20 blur-[80px] sm:blur-[100px] rounded-full"
            ></div>
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
              alt="Healthy Food"
              class="relative z-10 rounded-2xl sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-700 border-4 sm:border-8 border-white w-full object-cover h-[300px] sm:h-[450px] lg:h-[600px]"
            />

            <Motion
              :initial="{ opacity: 0, x: -20 }"
              :whileInView="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.5, duration: 0.5 }"
              class="absolute bottom-4 sm:bottom-10 left-2 sm:-left-10 z-20 bg-white/90 backdrop-blur-sm p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl flex items-center gap-3 sm:gap-4 max-w-[200px] sm:max-w-xs border border-white/20"
            >
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0"
              >
                <LucideLeaf class="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div class="font-bold text-secondary-900 text-sm sm:text-base">
                  100% Alami
                </div>
                <div class="text-xs sm:text-sm text-secondary-500">
                  Bahan rekomendasi segar
                </div>
              </div>
            </Motion>
          </Motion>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 relative overflow-hidden">
      <div class="absolute inset-0 bg-secondary-900 z-0">
        <div
          class="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"
        ></div>
        <Motion
          :animate="{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }"
          :transition="{ duration: 10, repeat: Infinity, ease: 'linear' }"
          class="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-primary-600/20 rounded-full blur-[80px] sm:blur-[100px]"
        />
      </div>

      <Motion
        initial="initial"
        :whileInView="'enter'"
        :viewport="{ once: true }"
        :variants="staggerContainer"
        class="container-custom relative z-10 text-center text-white px-4 sm:px-0"
      >
        <Motion :variants="fadeInUp">
          <h2
            class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight"
          >
            Investasi Kesehatan <br />
            <span class="text-primary-400">Sehat Gak Harus Mahal.</span>
          </h2>
        </Motion>

        <Motion :variants="fadeInUp">
          <p
            class="text-base sm:text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            Dapatkan akses penuh ke panduan nutrisi standar medis tanpa biaya
            langganan sepeser pun. Karena kesehatan adalah investasi terbaik
            Anda.
          </p>
        </Motion>

        <Motion
          :variants="scaleIn"
          class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <NuxtLink
            to="/input"
            class="px-6 sm:px-10 py-4 sm:py-5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-primary-900/50 transition-all hover:scale-105 flex items-center gap-3 text-base sm:text-lg w-full sm:w-auto justify-center"
          >
            Mulai Gratis Sekarang
          </NuxtLink>
        </Motion>

        <Motion
          :variants="fadeInUp"
          class="mt-6 sm:mt-8 text-xs sm:text-sm text-secondary-500 flex items-center justify-center gap-2"
        >
          <LucideShieldCheck class="w-3 h-3 sm:w-4 sm:h-4" />
          Tanpa syarat tersembunyi. Akses instan.
        </Motion>
      </Motion>
    </section>
  </div>
</template>

<style scoped></style>
