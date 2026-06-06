<!--
  ForumFooter — pied de page minimaliste du forum.
  Différent du AppFooter marketing : juste les essentiels (charte, liens
  utiles, retour vers le site principal).
-->
<template>
  <footer class="mt-16 border-t bg-muted/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 mb-3">
            <AppLogo />
            <span
              class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
            >
              Forum
            </span>
          </div>
          <p class="text-xs text-muted-foreground leading-relaxed">
            La communauté VizHome : entraide, idées, bug reports et annonces produit.
          </p>
        </div>

        <!-- Forum -->
        <div>
          <p class="font-semibold mb-2 text-foreground">Forum</p>
          <ClientOnly>
            <ul class="space-y-1.5 text-xs">
              <li v-for="cat in topCategories" :key="cat.slug">
                <NuxtLink
                  :to="`/forum/${cat.slug}`"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ cat.name }}
                </NuxtLink>
              </li>
            </ul>
            <template #fallback>
              <ul class="space-y-1.5 text-xs opacity-50">
                <li>Annonces</li>
                <li>Idées &amp; suggestions</li>
                <li>Support</li>
                <li>Bug reports</li>
              </ul>
            </template>
          </ClientOnly>
        </div>

        <!-- Communauté -->
        <div>
          <p class="font-semibold mb-2 text-foreground">Communauté</p>
          <ul class="space-y-1.5 text-xs">
            <li>
              <span class="text-muted-foreground">
                Charte de la communauté
                <span class="ml-1 text-[10px] uppercase opacity-60">À venir</span>
              </span>
            </li>
            <li>
              <span class="text-muted-foreground">
                Code de conduite
                <span class="ml-1 text-[10px] uppercase opacity-60">À venir</span>
              </span>
            </li>
            <li>
              <NuxtLink
                to="/faq"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ produit
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- VizHome -->
        <div>
          <p class="font-semibold mb-2 text-foreground">VizHome</p>
          <ul class="space-y-1.5 text-xs">
            <li>
              <NuxtLink
                to="/"
                class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ArrowLeftIcon class="h-3 w-3" />
                Site principal
              </NuxtLink>
            </li>
            <li>
              <a
                :href="docsUrl"
                target="_blank"
                rel="noopener"
                class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Documentation
                <ArrowUpRightIcon class="h-3 w-3" />
              </a>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/legal/terms-of-use"
                class="text-muted-foreground hover:text-foreground transition-colors"
              >
                Mentions légales
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom strip -->
      <div
        class="mt-6 pt-4 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-muted-foreground"
      >
        <p>© {{ year }} VizHome — Forum communautaire</p>
        <p class="flex items-center gap-1">
          Propulsé par
          <span class="font-medium text-foreground/80">VizHome.fr</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowUpRightIcon } from 'lucide-vue-next'
import { computed } from 'vue'

const config = useRuntimeConfig()
const docsUrl = (config.public.docsUrl as string) || 'http://localhost:3001'
const year = new Date().getFullYear()

const forum = useForum()
const topCategories = computed(() => forum.categories.value.slice(0, 4))
</script>
