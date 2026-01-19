<script setup lang="ts">
import {
  LucideCalculator,
  LucideScale,
  LucideUtensilsCrossed,
  LucideShieldCheck,
} from "#components";

const explanations = [
  {
    icon: "calculator",
    title: "Perhitungan Kalori",
    content:
      "Kebutuhan kalori dihitung menggunakan rumus Mifflin-St Jeor yang mempertimbangkan usia, tinggi badan, berat badan, dan tingkat aktivitas Anda. Hasil kemudian disesuaikan dengan tujuan Anda (menjaga, menurunkan, atau menaikkan berat badan).",
  },
  {
    icon: "LucideScale",
    title: "Mengapa Keseimbangan Penting?",
    content:
      "Tubuh memerlukan kombinasi karbohidrat, protein, dan lemak dalam proporsi yang seimbang. Karbohidrat memberikan energi, protein membantu membangun otot, dan lemak sehat penting untuk fungsi otak dan penyerapan vitamin.",
  },
  {
    icon: "LucideUtensilsCrossed",
    title: "Pembagian Waktu Makan",
    content:
      "Menu dibagi menjadi tiga waktu makan utama untuk menjaga kadar gula darah tetap stabil sepanjang hari. Sarapan membantu memulai metabolisme, makan siang memberikan energi untuk aktivitas, dan makan malam membantu pemulihan tubuh.",
  },
  {
    icon: "LucideShieldCheck",
    title: "Catatan Penting",
    content:
      "Informasi ini bersifat edukatif dan umum. Setiap orang memiliki kebutuhan yang berbeda. Jika Anda memiliki kondisi kesehatan tertentu, konsultasikan dengan dokter atau ahli gizi untuk rekomendasi yang lebih personal.",
  },
];

const iconComponents: Record<string, any> = {
  calculator: LucideCalculator,
  LucideCalculator: LucideCalculator,
  LucideScale: LucideScale,
  LucideUtensilsCrossed: LucideUtensilsCrossed,
  LucideShieldCheck: LucideShieldCheck,
};
</script>

<template>
  <section class="py-12 md:py-16">
    <div class="container-custom">
      <div class="text-center mb-10">
        <h2 class="section-title mb-3">Bagaimana Rekomendasi Ini Dibuat?</h2>
        <p class="section-subtitle mx-auto">
          Memahami dasar perhitungan membantu Anda membuat keputusan yang lebih
          baik untuk kesehatan.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(item, index) in explanations"
          :key="index"
          class="card-hover p-6 group"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors"
            >
              <component
                :is="iconComponents[item.icon]"
                class="w-6 h-6 text-primary-600"
              />
            </div>
            <div>
              <h3 class="font-semibold text-secondary-900 mb-2">
                {{ item.title }}
              </h3>
              <p class="text-secondary-600 text-sm leading-relaxed">
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 p-6 rounded-2xl bg-accent-50 border border-accent-200">
        <div class="flex items-start gap-4">
          <LucideInfo class="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-semibold text-secondary-800 mb-1">Disclaimer</h4>
            <p class="text-secondary-600 text-sm leading-relaxed">
              Website ini tidak memberikan diagnosis medis atau resep diet.
              Rekomendasi yang diberikan berdasarkan estimasi umum dan bersifat
              informatif. Selalu konsultasikan dengan profesional kesehatan
              untuk panduan yang lebih spesifik.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
