<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
    <section class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">
          Journal d'audit
          <span class="text-sm text-muted-foreground ml-1 font-normal">({{ count }})</span>
        </h1>
        <p class="text-sm text-muted-foreground">
          Toutes les actions staff (modération, ban/unban, pin/lock, etc.)
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Select v-model="actionFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-48 text-sm rounded-full">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes actions</SelectItem>
            <SelectItem
              v-for="action in ACTION_OPTIONS"
              :key="action.value"
              :value="action.value"
            >
              {{ action.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          v-model="actorFilter"
          type="search"
          placeholder="Email acteur…"
          class="h-9 w-48 text-sm rounded-full"
          @input="onSearchDebounced"
        />
      </div>
    </section>

    <div class="rounded-xl border bg-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-muted/40 border-b text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th class="px-4 py-2.5 text-left font-medium">Quand</th>
              <th class="px-4 py-2.5 text-left font-medium">Qui</th>
              <th class="px-4 py-2.5 text-left font-medium">Action</th>
              <th class="px-4 py-2.5 text-left font-medium">Cible</th>
              <th class="px-4 py-2.5 text-left font-medium">Détails</th>
              <th class="px-4 py-2.5 text-left font-medium">IP</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-if="isLoading && entries.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-muted-foreground">
                Chargement…
              </td>
            </tr>
            <tr v-else-if="entries.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-muted-foreground">
                Aucune action enregistrée.
              </td>
            </tr>
            <tr
              v-for="e in entries"
              :key="e.id"
              class="hover:bg-muted/30 transition-colors"
            >
              <td class="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                {{ formatDate(e.created_at) }}
              </td>
              <td class="px-4 py-2.5 truncate max-w-[200px]">
                <span class="flex items-center gap-1.5">
                  <Shield class="size-3 text-red-500 shrink-0" />
                  {{ e.actor_email || '(supprimé)' }}
                </span>
              </td>
              <td class="px-4 py-2.5">
                <Badge
                  variant="secondary"
                  :class="actionBadgeClass(e.action)"
                  class="text-xs"
                >
                  {{ e.action_label }}
                </Badge>
              </td>
              <td class="px-4 py-2.5 max-w-[220px] truncate text-muted-foreground" :title="e.target_repr">
                <span v-if="e.target_type" class="font-mono text-xs">
                  {{ e.target_type }}#{{ e.target_id }}
                </span>
                <span v-if="e.target_repr" class="ml-1 text-xs">
                  {{ e.target_repr }}
                </span>
              </td>
              <td class="px-4 py-2.5 max-w-[280px] text-xs">
                <code
                  v-if="Object.keys(e.payload || {}).length > 0"
                  class="bg-muted px-1 py-0.5 rounded font-mono text-[10px]"
                >
                  {{ formatPayload(e.payload) }}
                </code>
                <span v-else class="text-muted-foreground">—</span>
              </td>
              <td class="px-4 py-2.5 text-xs text-muted-foreground font-mono">
                {{ e.ip_address || '—' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground"
      >
        <span>Page {{ page }} sur {{ totalPages }} · {{ count }} entrées</span>
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
import { Shield } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { useAdminAuditLog } from '~/composables/useAdminAuditLog'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({ title: 'Audit log — Admin VizHome' })

const { entries, count, page, isLoading, loadEntries } = useAdminAuditLog()

const PAGE_SIZE = 30
const totalPages = computed(() => Math.max(1, Math.ceil(count.value / PAGE_SIZE)))

const ACTION_OPTIONS = [
  { value: 'user.ban', label: 'Bannir user' },
  { value: 'user.unban', label: 'Réactiver user' },
  { value: 'user.promote_staff', label: 'Promouvoir staff' },
  { value: 'user.demote_staff', label: 'Retirer staff' },
  { value: 'topic.pin', label: 'Épingler topic' },
  { value: 'topic.unpin', label: 'Désépingler topic' },
  { value: 'topic.lock', label: 'Verrouiller topic' },
  { value: 'topic.unlock', label: 'Déverrouiller topic' },
  { value: 'topic.delete', label: 'Supprimer topic' },
  { value: 'reply.delete', label: 'Supprimer reply' },
  { value: 'reply.mark_solution', label: 'Marquer solution' },
]

const actionFilter = ref('all')
const actorFilter = ref('')

await reload()

let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearchDebounced() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(reload, 400)
}

function _filters() {
  return {
    action: actionFilter.value === 'all' ? undefined : actionFilter.value,
    actor: actorFilter.value.trim() || undefined,
  }
}

async function reload() {
  await loadEntries({ page: 1, pageSize: PAGE_SIZE, ..._filters() })
}

async function goPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  await loadEntries({ page: p, pageSize: PAGE_SIZE, ..._filters() })
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatPayload(payload: Record<string, unknown>): string {
  const str = JSON.stringify(payload)
  return str.length > 60 ? str.slice(0, 60) + '…' : str
}

function actionBadgeClass(action: string): string {
  if (action.includes('ban') || action.includes('delete')) {
    return 'bg-red-500/10 text-red-700 dark:text-red-400'
  }
  if (action.includes('unban') || action.includes('mark_solution')) {
    return 'bg-green-500/10 text-green-700 dark:text-green-400'
  }
  if (action.includes('promote_staff')) {
    return 'bg-primary/10 text-primary'
  }
  return ''
}
</script>
