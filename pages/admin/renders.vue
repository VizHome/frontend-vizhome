<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
    <section class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <nav class="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
          <NuxtLink to="/admin" class="hover:text-foreground">Admin</NuxtLink>
          <ChevronRightIcon class="h-3 w-3" />
          <span class="text-foreground">Renders</span>
        </nav>
        <h1 class="text-2xl font-bold">
          Renders <span class="text-sm text-muted-foreground ml-1">({{ count }})</span>
        </h1>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          class="h-9 rounded-full gap-1.5 text-xs"
          :disabled="isExporting"
          @click="onExportCsv"
        >
          <Loader2Icon v-if="isExporting" class="size-3.5 animate-spin" />
          <DownloadIcon v-else class="size-3.5" />
          Export CSV
        </Button>
        <Select v-model="statusFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-36 text-sm rounded-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="sourceFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-36 text-sm rounded-full">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes sources</SelectItem>
            <SelectItem value="prompt">Prompt</SelectItem>
            <SelectItem value="sketch">Sketch</SelectItem>
            <SelectItem value="screenshot">Screenshot</SelectItem>
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
              <th class="px-4 py-2.5 text-left font-medium">User</th>
              <th class="px-4 py-2.5 text-left font-medium">Source → Out</th>
              <th class="px-4 py-2.5 text-left font-medium">Status</th>
              <th class="px-4 py-2.5 text-left font-medium">Prompt / Title</th>
              <th class="px-4 py-2.5 text-left font-medium">Provider</th>
              <th class="px-4 py-2.5 text-left font-medium">Créé</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-if="isLoading && renders.length === 0">
              <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                Chargement…
              </td>
            </tr>
            <tr v-else-if="renders.length === 0">
              <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                Aucun render pour ces filtres.
              </td>
            </tr>
            <tr
              v-for="r in renders"
              :key="r.id"
              class="hover:bg-muted/30 transition-colors"
            >
              <td class="px-4 py-2.5 text-muted-foreground tabular-nums">#{{ r.id }}</td>
              <td class="px-4 py-2.5 truncate max-w-[200px]">{{ r.user_email }}</td>
              <td class="px-4 py-2.5 text-muted-foreground">
                <span class="rounded bg-muted px-1.5 py-0.5 text-[10px]">{{ r.source }}</span>
                <span class="mx-1">→</span>
                <span class="rounded bg-muted px-1.5 py-0.5 text-[10px]">{{ r.output_type }}</span>
              </td>
              <td class="px-4 py-2.5">
                <span class="inline-flex items-center gap-1.5">
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="STATUS_COLORS[r.status]"
                  />
                  <span :class="STATUS_TEXT[r.status]">{{ r.status }}</span>
                </span>
              </td>
              <td class="px-4 py-2.5 max-w-[280px] truncate text-muted-foreground" :title="r.prompt">
                {{ r.title || r.prompt || '—' }}
                <span v-if="r.error_message" class="block text-[10px] text-destructive truncate">
                  ⚠ {{ r.error_message }}
                </span>
              </td>
              <td class="px-4 py-2.5 text-xs text-muted-foreground">{{ r.provider }}</td>
              <td class="px-4 py-2.5 text-xs text-muted-foreground">
                {{ relativeTime(r.created_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground"
      >
        <span>Page {{ page }} sur {{ totalPages }} · {{ count }} renders</span>
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
import { ChevronRightIcon, DownloadIcon, Loader2Icon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

import { useAdminRenders } from '~/composables/useAdminRenders'
import { useAdminCsvExport } from '~/composables/useAdminCsvExport'
import { relativeTime } from '~/composables/useAdminPanel'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({ title: 'Renders — Admin VizHome' })

const { renders, count, page, isLoading, loadRenders } = useAdminRenders()

const PAGE_SIZE = 25
const totalPages = computed(() => Math.max(1, Math.ceil(count.value / PAGE_SIZE)))

// "all" = pas de filtre (reka-ui n'accepte pas value="" sur SelectItem)
const statusFilter = ref('all')
const sourceFilter = ref('all')

await reload()

function _filterArgs() {
  return {
    status: statusFilter.value === 'all' ? undefined : statusFilter.value,
    source: sourceFilter.value === 'all' ? undefined : sourceFilter.value,
  }
}

async function reload() {
  await loadRenders({ page: 1, pageSize: PAGE_SIZE, ..._filterArgs() })
}

async function goPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  await loadRenders({ page: p, pageSize: PAGE_SIZE, ..._filterArgs() })
}

const { isExporting, exportCsv } = useAdminCsvExport()

async function onExportCsv() {
  try {
    await exportCsv('/admin/renders', 'admin-renders', _filterArgs())
    toast.success('Export téléchargé.')
  } catch {
    toast.error('Export CSV échoué.')
  }
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500',
  processing: 'bg-blue-500',
  done: 'bg-green-500',
  failed: 'bg-red-500',
}
const STATUS_TEXT: Record<string, string> = {
  pending: 'text-amber-600 dark:text-amber-400',
  processing: 'text-blue-600 dark:text-blue-400',
  done: 'text-green-600 dark:text-green-400',
  failed: 'text-destructive',
}
</script>
