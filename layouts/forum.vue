<!--
  Layout dédié au forum communautaire.

  Diffère du layout `default` (marketing) :
  - Header propre au forum (ForumHeader) avec recherche, nav cats, user menu
  - Footer minimaliste (ForumFooter)
  - Fond légèrement teinté pour séparer visuellement du reste du site
  - Pas de NavigationMenu marketing imposant

  Utilisation : `definePageMeta({ layout: 'forum' })` dans les pages /forum/*.
-->
<template>
  <div class="min-h-screen flex flex-col bg-muted/10">
    <ForumHeader />
    <main class="flex-1">
      <slot />
    </main>
    <ForumFooter />
  </div>
</template>
