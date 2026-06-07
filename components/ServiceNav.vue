<!--
  ServiceNav — nav horizontale commune aux layouts user-space (`app`, `support`).
  Donne une vue unifiée des sections accessibles + indique celle où on est.

  Utilisé pour aider l'utilisateur à se repérer : peu importe la page, il voit
  toujours les mêmes 5 entrées et sait ce qui est cliquable.

  Le matching d'active se fait par préfixe de route (ex: /support/42 → "support").
-->
<template>
  <nav
    class="flex items-center gap-0.5 overflow-x-auto rounded-full border bg-background/90 backdrop-blur-sm p-1 shadow-sm"
    aria-label="Sections principales"
  >
    <NuxtLink
      v-for="item in sections"
      :key="item.to"
      :to="item.to"
      :class="[
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap',
        isActive(item)
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent',
      ]"
    >
      <component :is="item.icon" class="size-3.5 shrink-0" />
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import {
  CreditCardIcon,
  FolderOpenIcon,
  LayoutGridIcon,
  LifeBuoyIcon,
  MessagesSquareIcon,
} from 'lucide-vue-next'
import type { Component } from 'vue'

interface Section {
  to: string
  label: string
  icon: Component
  /** Préfixes de route qui activent cette section (en plus de `to` exact). */
  matchPrefixes?: string[]
}

const route = useRoute()

const sections: Section[] = [
  { to: '/projects', label: 'Projets', icon: FolderOpenIcon },
  { to: '/gallery', label: 'Galerie', icon: LayoutGridIcon },
  { to: '/forum', label: 'Forum', icon: MessagesSquareIcon, matchPrefixes: ['/forum'] },
  { to: '/support', label: 'Support', icon: LifeBuoyIcon, matchPrefixes: ['/support'] },
  { to: '/account/billing', label: 'Abonnement', icon: CreditCardIcon, matchPrefixes: ['/account'] },
]

function isActive(item: Section): boolean {
  if (route.path === item.to) return true
  if (item.matchPrefixes?.some(p => route.path.startsWith(p + '/'))) return true
  return false
}
</script>
