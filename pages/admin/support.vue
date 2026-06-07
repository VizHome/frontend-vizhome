<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col gap-4">
    <section class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">
          Support
          <span class="text-sm text-muted-foreground ml-1 font-normal">({{ count }} tickets)</span>
        </h1>
        <p class="text-sm text-muted-foreground">
          Tous les tickets utilisateurs — filtres par status, priorité, catégorie.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          <SearchIcon class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            v-model="searchInput"
            type="search"
            placeholder="Rechercher sujet / email / pseudo…"
            class="pl-8 h-9 w-60 text-sm rounded-full"
            @input="onSearchDebounced"
          />
        </div>
        <Select v-model="statusFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-36 text-sm rounded-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="open">Ouvert</SelectItem>
            <SelectItem value="pending">En cours</SelectItem>
            <SelectItem value="resolved">Résolu</SelectItem>
            <SelectItem value="closed">Fermé</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="priorityFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-36 text-sm rounded-full">
            <SelectValue placeholder="Priorité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes priorités</SelectItem>
            <SelectItem value="low">Faible</SelectItem>
            <SelectItem value="medium">Moyenne</SelectItem>
            <SelectItem value="high">Haute</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>

    <div class="rounded-xl border bg-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-muted/40 border-b text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th class="px-4 py-2.5 text-left font-medium w-14">#</th>
              <th class="px-4 py-2.5 text-left font-medium">Sujet</th>
              <th class="px-4 py-2.5 text-left font-medium">User</th>
              <th class="px-4 py-2.5 text-left font-medium">Status</th>
              <th class="px-4 py-2.5 text-left font-medium">Priorité</th>
              <th class="px-4 py-2.5 text-right font-medium">Msg</th>
              <th class="px-4 py-2.5 text-left font-medium">Maj</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-if="isLoading && tickets.length === 0">
              <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                Chargement…
              </td>
            </tr>
            <tr v-else-if="tickets.length === 0">
              <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                Aucun ticket pour ces filtres.
              </td>
            </tr>
            <tr
              v-for="t in tickets"
              :key="t.id"
              class="hover:bg-muted/30 transition-colors cursor-pointer"
              @click="open(t.id)"
            >
              <td class="px-4 py-2.5 text-muted-foreground tabular-nums">#{{ t.id }}</td>
              <td class="px-4 py-2.5 max-w-[300px]">
                <span class="font-medium truncate block">{{ t.subject }}</span>
                <span class="text-xs text-muted-foreground">{{ CATEGORY_LABELS[t.category] }}</span>
              </td>
              <td class="px-4 py-2.5">
                <span class="font-medium">@{{ t.user_pseudo }}</span>
                <span class="block text-xs text-muted-foreground truncate max-w-[160px]">{{ t.user_email }}</span>
              </td>
              <td class="px-4 py-2.5">
                <Badge
                  variant="secondary"
                  :class="STATUS_BADGE_CLASS[t.status]"
                  class="h-5 border-0 px-1.5 text-[10px] font-semibold uppercase tracking-wider"
                >
                  {{ STATUS_LABELS[t.status] }}
                </Badge>
              </td>
              <td class="px-4 py-2.5">
                <Badge
                  variant="secondary"
                  :class="PRIORITY_BADGE_CLASS[t.priority]"
                  class="h-5 border-0 px-1.5 text-[10px] font-semibold uppercase tracking-wider"
                >
                  {{ PRIORITY_LABELS[t.priority] }}
                </Badge>
              </td>
              <td class="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                {{ t.messages_count }}
              </td>
              <td class="px-4 py-2.5 text-xs text-muted-foreground">
                {{ relativeTime(t.last_message_at || t.updated_at) }}
                <span
                  v-if="t.last_message_from_staff"
                  class="ml-1 text-primary"
                  title="Dernière réponse staff"
                >·</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground"
      >
        <span>Page {{ page }} sur {{ totalPages }} · {{ count }} tickets</span>
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
import { SearchIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import type {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '~/composables/useSupport'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({ title: 'Support — Admin VizHome' })

const { tickets, count, page, isLoading, loadTickets } = useAdminSupport()
const { STATUS_LABELS, PRIORITY_LABELS, CATEGORY_LABELS } = useSupport()

const PAGE_SIZE = 25
const totalPages = computed(() => Math.max(1, Math.ceil(count.value / PAGE_SIZE)))

const searchInput = ref('')
const statusFilter = ref<'all' | TicketStatus>('all')
const priorityFilter = ref<'all' | TicketPriority>('all')

await reload()

let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearchDebounced() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(reload, 400)
}

function _filterArgs() {
  return {
    search: searchInput.value.trim() || undefined,
    status: statusFilter.value,
    priority: priorityFilter.value,
  }
}

async function reload() {
  await loadTickets({ page: 1, pageSize: PAGE_SIZE, ..._filterArgs() })
}

async function goPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  await loadTickets({ page: p, pageSize: PAGE_SIZE, ..._filterArgs() })
}

function open(id: number) {
  navigateTo(`/support/${id}`)
}

const STATUS_BADGE_CLASS: Record<TicketStatus, string> = {
  open: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  resolved: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  closed: 'bg-muted text-muted-foreground',
}
const PRIORITY_BADGE_CLASS: Record<TicketPriority, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-primary/10 text-primary',
  high: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  urgent: 'bg-red-500/10 text-red-700 dark:text-red-400',
}

function relativeTime(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = Date.now() - d.getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60) return "à l'instant"
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`
  if (s < 86_400) return `il y a ${Math.floor(s / 3600)} h`
  if (s < 604_800) return `il y a ${Math.floor(s / 86_400)} j`
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}

// Helper pour les types côté template (silence eslint)
const _categories: TicketCategory[] = ['technical', 'billing', 'account', 'feature', 'other']
void _categories
</script>
