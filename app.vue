<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>

<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

const { preferences } = useUser()

// Appliquer les préférences d'accessibilité au DOM dès le montage
onMounted(() => {
  const prefs = preferences.value
  const html = document.documentElement

  // Taille de police
  html.dataset.fontSize = prefs.fontSize

  // Réduction des animations
  if (prefs.reducedMotion) {
    html.classList.add('reduce-motion')
  }

  // Contraste élevé
  if (prefs.highContrast) {
    html.classList.add('high-contrast')
  }
})
</script>
