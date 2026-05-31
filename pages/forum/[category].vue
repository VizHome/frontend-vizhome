<template>
  <div class="min-h-[60vh]">
    <!-- Header avec breadcrumb -->
    <section class="border-b py-10 px-6">
      <div class="max-w-5xl mx-auto">
        <nav class="text-sm mb-4 flex items-center gap-2 text-muted-foreground">
          <NuxtLink to="/forum" class="hover:text-foreground transition-colors">
            Forum
          </NuxtLink>
          <ChevronRightIcon class="h-3.5 w-3.5" />
          <span class="text-foreground">{{ category?.name || categorySlug }}</span>
        </nav>

        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold mb-1 flex items-center gap-2">
              {{ category?.name || 'Catégorie' }}
              <span
                v-if="category?.is_admin_only"
                class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
              >
                Staff
              </span>
            </h1>
            <p v-if="category?.description" class="text-sm text-muted-foreground max-w-2xl">
              {{ category.description }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Button
              v-if="canPost"
              as-child
              class="rounded-full gap-1.5"
            >
              <NuxtLink :to="`/forum/new?category=${categorySlug}`">
                <PlusIcon class="h-4 w-4" />
                Nouveau sujet
              </NuxtLink>
            </Button>
            <Button v-else-if="!isAuthenticated" as-child variant="outline" class="rounded-full">
              <NuxtLink :to="`/auth/login?redirect=/forum/${categorySlug}`">
                Se connecter
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Toolbar : search + sort -->
    <section class="border-b px-6 py-3 bg-muted/30">
      <div class="max-w-5xl mx-auto flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <SearchIcon
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            type="search"
            placeholder="Rechercher dans cette catégorie…"
            class="pl-9 rounded-full"
            @input="onSearchDebounced"
          />
        </div>
        <Select v-model="ordering" @update:model-value="reload">
          <SelectTrigger class="w-44 rounded-full text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-last_reply_at">Activité récente</SelectItem>
            <SelectItem value="-created_at">Plus récents</SelectItem>
            <SelectItem value="-replies_count">Plus de réponses</SelectItem>
            <SelectItem value="-views_count">Plus vus</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>

    <!-- Liste topics -->
    <section class="px-6 py-8">
      <div class="max-w-5xl mx-auto">
        <div v-if="forum.isLoading.value" class="space-y-2">
          <div
            v-for="i in 6"
            :key="i"
            class="h-20 rounded-lg border bg-muted/30 animate-pulse"
          />
        </div>

        <div v-else-if="forum.topics.value.length === 0" class="rounded-lg border bg-card p-12 text-center">
          <MessageCircleIcon class="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
          <p class="text-sm font-medium mb-1">Aucun sujet</p>
          <p class="text-xs text-muted-foreground mb-4">
            {{ searchQuery ? 'Aucun résultat pour ta recherche.' : 'Cette catégorie est encore vide.' }}
          </p>
          <Button v-if="canPost" as-child class="rounded-full gap-1.5" size="sm">
            <NuxtLink :to="`/forum/new?category=${categorySlug}`">
              <PlusIcon class="h-3.5 w-3.5" />
              Créer le premier sujet
            </NuxtLink>
          </Button>
        </div>

        <div v-else class="space-y-2">
          <ForumTopicCard
            v-for="topic in forum.topics.value"
            :key="topic.id"
            :topic="topic"
            hide-category
          />
        </div>

        <!-- Pagination simple -->
        <div
          v-if="forum.topicsCount.value > pageSize"
          class="mt-6 flex items-center justify-between text-sm"
        >
          <Button
            variant="outline"
            size="sm"
            :disabled="forum.topicsPage.value <= 1"
            @click="goPage(forum.topicsPage.value - 1)"
          >
            ← Précédent
          </Button>
          <span class="text-muted-foreground">
            Page {{ forum.topicsPage.value }} sur {{ totalPages }}
          </span>
          <Button
            variant="outline"
            size="sm"
            :disabled="forum.topicsPage.value >= totalPages"
            @click="goPage(forum.topicsPage.value + 1)"
          >
            Suivant →
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRightIcon,
  MessageCircleIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'

definePageMeta({ layout: 'forum' })

const route = useRoute()
const categorySlug = computed(() => route.params.category as string)

const forum = useForum()
const auth = useAuth()
const user = useUser()

const isAuthenticated = computed(() => !!auth.tokens.value)
const isStaff = computed(() => !!user.user.value?.is_staff)
const category = computed(() => forum.getCategoryBySlug(categorySlug.value))
const canPost = computed(() => {
  if (!isAuthenticated.value) return false
  if (category.value?.is_admin_only && !isStaff.value) return false
  return true
})

const searchQuery = ref('')
const ordering = ref('-last_reply_at')
const pageSize = 20
const totalPages = computed(() =>
  Math.max(1, Math.ceil(forum.topicsCount.value / pageSize))
)

// Charge cats + topics au mount
await Promise.all([
  forum.loadCategories(),
  forum.loadTopics({
    category: categorySlug.value,
    pageSize,
    page: 1,
    ordering: ordering.value,
  }),
])

useHead(() => ({
  title: `${category.value?.name || 'Catégorie'} — Forum VizHome`,
}))

// ─── Recherche debouncée (500ms) ────────────────────────────────────────
let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearchDebounced() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(reload, 500)
}

async function reload() {
  await forum.loadTopics({
    category: categorySlug.value,
    search: searchQuery.value || undefined,
    ordering: ordering.value,
    pageSize,
    page: 1,
  })
}

async function goPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  await forum.loadTopics({
    category: categorySlug.value,
    search: searchQuery.value || undefined,
    ordering: ordering.value,
    pageSize,
    page,
  })
}
</script>
