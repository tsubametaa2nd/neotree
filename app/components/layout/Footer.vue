<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-secondary-50 border-t border-secondary-200 mt-auto py-8">
    <div class="container-custom flex items-center justify-center">
      <p class="text-secondary-500 text-sm font-medium tracking-wide">
        &copy; {{ currentYear }} Neotree. All rights reserved.
      </p>
    </div>
  </footer>
</template>
