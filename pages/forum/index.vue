<template>
  <div>
    <!-- Hero compact -->
    <section class="border-b">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1
              class="text-2xl sm:text-3xl font-bold mb-1 flex items-center gap-2"
            >
              Forum
              <Badge variant="secondary" class="text-xs font-medium rounded-full">
                Communauté
              </Badge>
            </h1>
            <p class="text-sm text-muted-foreground max-w-xl">
              Échange avec la communauté VizHome : nouveautés, idées,
              support et bug reports.
            </p>
          </div>
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span class="flex items-center gap-1.5">
              <FolderIcon class="h-3.5 w-3.5" />
              {{ forum.categories.value.length }}
              {{ forum.categories.value.length > 1 ? 'catégories' : 'catégorie' }}
            </span>
            <span class="text-muted-foreground/40">·</span>
            <span class="flex items-center gap-1.5">
              <MessageSquareIcon class="h-3.5 w-3.5" />
              {{ forum.topicsCount.value }}
              {{ forum.topicsCount.value > 1 ? 'sujets' : 'sujet' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Layout 2 colonnes (1 sur mobile) -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,400px)] gap-6">
        <!-- Colonne principale : Catégories -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-semibold">Catégories</h2>
            <Button
              v-if="isAuthenticated"
              as-child
              size="sm"
              variant="outline"
              class="rounded-full gap-1.5 h-8 text-xs"
            >
              <NuxtLink to="/forum/new">
                <PlusIcon class="h-3.5 w-3.5" />
                Nouveau sujet
              </NuxtLink>
            </Button>
          </div>

          <!-- Empty state global (loading ou backend down) -->
          <div
            v-if="forum.categories.value.length === 0"
            class="rounded-lg border bg-card p-8 text-center"
          >
            <CircleAlertIcon
              class="h-8 w-8 mx-auto mb-2 text-muted-foreground/60"
            />
            <p class="text-sm font-medium">Aucune catégorie disponible</p>
            <p class="text-xs text-muted-foreground mt-1">
              Le forum n'est pas accessible pour le moment.
            </p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ForumCategoryCard
              v-for="cat in forum.categories.value"
              :key="cat.id"
              :category="cat"
            />
          </div>
        </section>

        <!-- Colonne droite : Activité récente -->
        <section>
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-semibold">Activité récente</h2>
            <span class="text-xs text-muted-foreground">
              {{ forum.topicsCount.value }}
              {{ forum.topicsCount.value > 1 ? 'sujets' : 'sujet' }}
            </span>
          </div>

          <div v-if="forum.isLoading.value" class="space-y-2">
            <div
              v-for="i in 4"
              :key="i"
              class="h-16 rounded-lg border bg-card animate-pulse"
            />
          </div>

          <div
            v-else-if="forum.topics.value.length === 0"
            class="rounded-lg border bg-card p-6 text-center"
          >
            <MessageCircleIcon
              class="h-7 w-7 mx-auto mb-2 text-muted-foreground/60"
            />
            <p class="text-sm font-medium mb-1">Aucun sujet pour l'instant</p>
            <p class="text-xs text-muted-foreground mb-3">
              Sois le premier à lancer la discussion.
            </p>
            <Button
              v-if="isAuthenticated"
              as-child
              size="sm"
              class="rounded-full gap-1.5 h-8 text-xs"
            >
              <NuxtLink to="/forum/new">
                <PlusIcon class="h-3 w-3" />
                Créer un sujet
              </NuxtLink>
            </Button>
            <Button
              v-else
              as-child
              size="sm"
              variant="outline"
              class="rounded-full h-8 text-xs"
            >
              <NuxtLink to="/auth/login?redirect=/forum">
                Se connecter
              </NuxtLink>
            </Button>
          </div>

          <div v-else class="space-y-2">
            <ForumTopicCard
              v-for="topic in forum.topics.value"
              :key="topic.id"
              :topic="topic"
              compact
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CircleAlertIcon,
  FolderIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  PlusIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

definePageMeta({ layout: 'forum' })

useHead({
  title: 'Forum — VizHome',
  meta: [
    {
      name: 'description',
      content:
        'Forum communautaire VizHome : annonces produit, idées de features, entraide et bug reports.',
    },
  ],
})

const forum = useForum()
const auth = useAuth()
const isAuthenticated = computed(() => !!auth.tokens.value)

// Charge en parallèle catégories + 10 topics les plus récents.
// Note : si une des 2 calls fail (backend down par ex.), l'autre continue
// et les empty states s'affichent — pas de page cassée.
await Promise.all([
  forum.loadCategories().catch(() => {
    /* silent : empty state visible */
  }),
  forum.loadTopics({ pageSize: 10, ordering: '-last_reply_at' }).catch(() => {
    /* silent */
  }),
])
</script>
