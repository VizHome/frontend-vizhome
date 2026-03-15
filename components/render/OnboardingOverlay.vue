<template>
  <Transition name="onboarding">
    <div
      v-if="showOnboarding"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        class="w-full max-w-xl rounded-3xl border bg-background shadow-2xl flex flex-col overflow-hidden"
      >
        <!-- Header -->
        <div class="px-8 pt-8 pb-4 text-center">
          <div
            class="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles class="h-6 w-6 text-primary" />
          </div>
          <h2 class="text-2xl font-bold">Bienvenue sur VizHome</h2>
          <p class="text-sm text-muted-foreground mt-2">
            Trois modes pour donner vie à vos projets d'architecture
          </p>
        </div>

        <!-- Cartes modes -->
        <div class="px-8 py-4 grid grid-cols-3 gap-3">
          <div
            v-for="mode in MODES"
            :key="mode.key"
            class="flex flex-col items-center gap-3 rounded-2xl border bg-muted/40 p-4 text-center"
          >
            <div
              class="h-10 w-10 rounded-xl flex items-center justify-center"
              :class="mode.iconBg"
            >
              <component
                :is="mode.icon"
                class="h-5 w-5"
                :class="mode.iconColor"
              />
            </div>
            <div>
              <p class="text-sm font-semibold">{{ mode.label }}</p>
              <p class="text-xs text-muted-foreground mt-0.5 leading-snug">
                {{ mode.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Bouton -->
        <div class="px-8 pb-8 pt-4">
          <button
            class="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg"
            @click="dismiss"
          >
            Commencer à créer
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Pencil, Sparkles, Box } from 'lucide-vue-next'

const STORAGE_KEY = 'vizhome_onboarded'

const showOnboarding = ref(false)

const MODES = [
  {
    key: 'sketch',
    label: 'Croquis 2D',
    description: 'Dessinez librement et transformez vos croquis en rendus IA',
    icon: Pencil,
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    key: 'prompt',
    label: 'Prompt IA',
    description:
      "Décrivez votre projet, l'IA génère l'image en quelques secondes",
    icon: Sparkles,
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    key: '3d',
    label: '3D Pro',
    description: 'Importez un modèle 3D et explorez-le en temps réel',
    icon: Box,
    iconBg: 'bg-sky-100 dark:bg-sky-900/40',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
]

onMounted(() => {
  if (typeof window === 'undefined') return
  if (!localStorage.getItem(STORAGE_KEY)) {
    showOnboarding.value = true
  }
})

const dismiss = () => {
  localStorage.setItem(STORAGE_KEY, '1')
  showOnboarding.value = false
}
</script>

<style scoped>
.onboarding-enter-active,
.onboarding-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.onboarding-enter-from,
.onboarding-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
