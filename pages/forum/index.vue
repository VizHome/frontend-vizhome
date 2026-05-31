<template>
  <div class="min-h-[60vh]">
    <!-- Header -->
    <section class="border-b py-12 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 class="text-3xl font-bold mb-2 flex items-center gap-3">
              <MessagesSquareIcon class="h-8 w-8 text-primary" />
              Forum
            </h1>
            <p class="text-muted-foreground">
              Échange avec la communauté VizHome : nouveautés, idées, support, bugs.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button
              v-if="isAuthenticated"
              as-child
              class="rounded-full gap-1.5"
            >
              <NuxtLink to="/forum/new">
                <PlusIcon class="h-4 w-4" />
                Nouveau sujet
              </NuxtLink>
            </Button>
            <Button v-else as-child variant="outline" class="rounded-full">
              <NuxtLink to="/auth/login?redirect=/forum">
                Se connecter pour participer
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Catégories -->
    <section class="px-6 py-10">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-lg font-semibold mb-4">Catégories</h2>

        <div v-if="forum.categories.value.length === 0" class="rounded-lg border bg-card p-8 text-center text-muted-foreground">
          <CircleAlertIcon class="h-8 w-8 mx-auto mb-3 text-muted-foreground/60" />
          <p class="text-sm">Aucune catégorie chargée.</p>
          <p class="text-xs mt-1">Lance `python manage.py seed_forum_categories` côté backend.</p>
        </div>

        <div v-else class="grid gap-3 md:grid-cols-2">
          <ForumCategoryCard
            v-for="cat in forum.categories.value"
            :key="cat.id"
            :category="cat"
          />
        </div>
      </div>
    </section>

    <!-- Topics récents -->
    <section class="px-6 pb-16">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Activité récente</h2>
          <span class="text-xs text-muted-foreground">
            {{ forum.topicsCount.value }} sujet{{ forum.topicsCount.value > 1 ? 's' : '' }} au total
          </span>
        </div>

        <div v-if="forum.isLoading.value" class="space-y-2">
          <div
            v-for="i in 4"
            :key="i"
            class="h-20 rounded-lg border bg-muted/30 animate-pulse"
          />
        </div>

        <div v-else-if="forum.topics.value.length === 0" class="rounded-lg border bg-card p-8 text-center">
          <MessageCircleIcon class="h-8 w-8 mx-auto mb-3 text-muted-foreground/60" />
          <p class="text-sm font-medium mb-1">Aucun sujet pour l'instant</p>
          <p class="text-xs text-muted-foreground">Sois le premier à lancer la discussion.</p>
        </div>

        <div v-else class="space-y-2">
          <ForumTopicCard
            v-for="topic in forum.topics.value"
            :key="topic.id"
            :topic="topic"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  CircleAlertIcon,
  MessageCircleIcon,
  MessagesSquareIcon,
  PlusIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

definePageMeta({ layout: 'forum' })

useHead({
  title: 'Forum — VizHome',
  meta: [
    { name: 'description', content: 'Forum communautaire VizHome : annonces, idées, support, bugs.' },
  ],
})

const forum = useForum()
const auth = useAuth()
const isAuthenticated = computed(() => !!auth.tokens.value)

// Charge en parallèle catégories + 10 topics les plus récents
await Promise.all([
  forum.loadCategories(),
  forum.loadTopics({ pageSize: 10, ordering: '-last_reply_at' }),
])
</script>
