<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
    <section class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">
          Modération forum
          <span class="text-sm text-muted-foreground ml-1 font-normal">({{ count }} topics)</span>
        </h1>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          <SearchIcon
            class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
          />
          <Input
            v-model="searchInput"
            type="search"
            placeholder="Rechercher dans les titres…"
            class="pl-8 h-9 w-60 text-sm rounded-full"
            @input="onSearchDebounced"
          />
        </div>
      </div>
    </section>

    <div class="rounded-xl border bg-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-muted/40 border-b text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th class="px-4 py-2.5 text-left font-medium">Titre</th>
              <th class="px-4 py-2.5 text-left font-medium">Auteur</th>
              <th class="px-4 py-2.5 text-left font-medium">Catégorie</th>
              <th class="px-4 py-2.5 text-right font-medium">Vues</th>
              <th class="px-4 py-2.5 text-right font-medium">Réponses</th>
              <th class="px-4 py-2.5 text-left font-medium">Créé</th>
              <th class="px-4 py-2.5 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-if="isLoading && topics.length === 0">
              <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                Chargement…
              </td>
            </tr>
            <tr v-else-if="topics.length === 0">
              <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                Aucun topic.
              </td>
            </tr>
            <tr
              v-for="t in topics"
              :key="t.id"
              class="hover:bg-muted/30 transition-colors"
            >
              <td class="px-4 py-2.5 max-w-[300px]">
                <div class="flex items-center gap-1.5">
                  <PinIcon v-if="t.is_pinned" class="size-3 text-amber-500 shrink-0" />
                  <LockIcon v-if="t.is_locked" class="size-3 text-muted-foreground shrink-0" />
                  <NuxtLink
                    :to="`/forum/topic/${t.id}`"
                    target="_blank"
                    class="truncate hover:text-primary"
                  >
                    {{ t.title }}
                  </NuxtLink>
                </div>
              </td>
              <td class="px-4 py-2.5 truncate max-w-[160px]">
                <span class="flex items-center gap-1">
                  <span class="truncate">{{ t.author.name }}</span>
                  <Shield v-if="t.author.is_staff" class="size-3 text-red-500 shrink-0" />
                </span>
              </td>
              <td class="px-4 py-2.5 text-xs text-muted-foreground">{{ t.category_name }}</td>
              <td class="px-4 py-2.5 text-right tabular-nums text-muted-foreground">{{ t.views_count }}</td>
              <td class="px-4 py-2.5 text-right tabular-nums text-muted-foreground">{{ t.replies_count }}</td>
              <td class="px-4 py-2.5 text-xs text-muted-foreground">
                {{ relativeTime(t.created_at) }}
              </td>
              <td class="px-4 py-2.5 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <button
                      type="button"
                      class="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                      aria-label="Actions modération"
                    >
                      <MoreHorizontal class="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-44">
                    <DropdownMenuItem class="cursor-pointer" @click="onTogglePin(t)">
                      <PinIcon class="size-4 mr-2" />
                      {{ t.is_pinned ? 'Désépingler' : 'Épingler' }}
                    </DropdownMenuItem>
                    <DropdownMenuItem class="cursor-pointer" @click="onToggleLock(t)">
                      <LockIcon class="size-4 mr-2" />
                      {{ t.is_locked ? 'Déverrouiller' : 'Verrouiller' }}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      class="cursor-pointer text-destructive"
                      @click="onDelete(t)"
                    >
                      <Trash2Icon class="size-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground"
      >
        <span>Page {{ page }} sur {{ totalPages }} · {{ count }} topics</span>
        <div class="flex gap-1">
          <Button variant="outline" size="sm" :disabled="page <= 1" @click="goPage(page - 1)">
            ← Préc
          </Button>
          <Button variant="outline" size="sm" :disabled="page >= totalPages" @click="goPage(page + 1)">
            Suiv →
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LockIcon,
  MoreHorizontal,
  PinIcon,
  SearchIcon,
  Shield,
  Trash2Icon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

import type { ForumTopicListItem } from '~/composables/useForum'
import { useAdminForumMod } from '~/composables/useAdminForumMod'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({ title: 'Modération forum — Admin VizHome' })

const { topics, count, page, isLoading, loadTopics, togglePin, toggleLock, deleteTopic } =
  useAdminForumMod()

const PAGE_SIZE = 25
const totalPages = computed(() => Math.max(1, Math.ceil(count.value / PAGE_SIZE)))

const searchInput = ref('')

await reload()

let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearchDebounced() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(reload, 400)
}

async function reload() {
  await loadTopics({
    page: 1,
    pageSize: PAGE_SIZE,
    search: searchInput.value.trim() || undefined,
  })
}

async function goPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  await loadTopics({
    page: p,
    pageSize: PAGE_SIZE,
    search: searchInput.value.trim() || undefined,
  })
}

async function onTogglePin(t: ForumTopicListItem) {
  try {
    const isPinned = await togglePin(t.id)
    toast.success(isPinned ? 'Sujet épinglé.' : 'Sujet désépinglé.')
  } catch {
    toast.error('Impossible de modifier l\'épinglage.')
  }
}

async function onToggleLock(t: ForumTopicListItem) {
  try {
    const isLocked = await toggleLock(t.id)
    toast.success(isLocked ? 'Sujet verrouillé.' : 'Sujet déverrouillé.')
  } catch {
    toast.error('Impossible de modifier le verrou.')
  }
}

async function onDelete(t: ForumTopicListItem) {
  if (!confirm(`Vraiment supprimer "${t.title}" et toutes ses réponses ?`)) return
  try {
    await deleteTopic(t.id)
    toast.success('Sujet supprimé.')
  } catch {
    toast.error('Impossible de supprimer le sujet.')
  }
}

function relativeTime(iso: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60) return "à l'instant"
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`
  if (s < 86_400) return `il y a ${Math.floor(s / 3600)} h`
  if (s < 604_800) return `il y a ${Math.floor(s / 86_400)} j`
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}
</script>
