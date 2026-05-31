<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
    <!-- Header + filtres -->
    <section class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <nav class="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
          <NuxtLink to="/admin" class="hover:text-foreground">Admin</NuxtLink>
          <ChevronRightIcon class="h-3 w-3" />
          <span class="text-foreground">Utilisateurs</span>
        </nav>
        <h1 class="text-2xl font-bold">
          Utilisateurs <span class="text-sm text-muted-foreground ml-1">({{ count }})</span>
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
        <div class="relative">
          <SearchIcon
            class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
          />
          <Input
            v-model="searchInput"
            type="search"
            placeholder="Rechercher email / nom…"
            class="pl-8 h-9 w-60 text-sm rounded-full"
            @input="onSearchDebounced"
          />
        </div>
        <Select v-model="planFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-32 text-sm rounded-full">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous plans</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="staffFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-32 text-sm rounded-full">
            <SelectValue placeholder="Rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="true">Staff</SelectItem>
            <SelectItem value="false">Users</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="activeFilter" @update:model-value="reload">
          <SelectTrigger class="h-9 w-32 text-sm rounded-full">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="true">Actifs</SelectItem>
            <SelectItem value="false">Bannis</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>

    <!-- Tableau -->
    <div class="rounded-xl border bg-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-muted/40 border-b text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th class="px-4 py-2.5 text-left font-medium">Email</th>
              <th class="px-4 py-2.5 text-left font-medium">Nom</th>
              <th class="px-4 py-2.5 text-left font-medium">Plan</th>
              <th class="px-4 py-2.5 text-right font-medium">Renders</th>
              <th class="px-4 py-2.5 text-right font-medium">Storage</th>
              <th class="px-4 py-2.5 text-left font-medium">Inscrit</th>
              <th class="px-4 py-2.5 text-center font-medium">Statut</th>
              <th class="px-4 py-2.5 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-if="isLoading && users.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                Chargement…
              </td>
            </tr>
            <tr v-else-if="users.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                Aucun utilisateur ne correspond aux filtres.
              </td>
            </tr>
            <tr
              v-for="u in users"
              :key="u.id"
              class="hover:bg-muted/30 transition-colors"
              :class="{ 'opacity-50': !u.is_active }"
            >
              <td class="px-4 py-2.5">
                <div class="flex items-center gap-2">
                  <span class="truncate max-w-[260px]">{{ u.email }}</span>
                  <Shield v-if="u.is_staff" class="h-3.5 w-3.5 text-red-500 shrink-0" />
                </div>
              </td>
              <td class="px-4 py-2.5 text-muted-foreground">
                {{ u.first_name }} {{ u.last_name }}
              </td>
              <td class="px-4 py-2.5">
                <span
                  class="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider"
                  :class="planPillClass(u.plan)"
                >
                  {{ u.plan }}
                </span>
              </td>
              <td class="px-4 py-2.5 text-right text-muted-foreground tabular-nums">
                {{ u.renders_this_month }}
              </td>
              <td class="px-4 py-2.5 text-right text-muted-foreground tabular-nums">
                {{ formatBytes(u.storage_used_bytes) }}
              </td>
              <td class="px-4 py-2.5 text-xs text-muted-foreground">
                {{ relativeTime(u.date_joined) }}
              </td>
              <td class="px-4 py-2.5 text-center">
                <span
                  class="inline-flex h-2 w-2 rounded-full"
                  :class="u.is_active ? 'bg-green-500' : 'bg-red-500'"
                  :title="u.is_active ? 'Actif' : 'Banni'"
                />
              </td>
              <td class="px-4 py-2.5 text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <button
                      type="button"
                      class="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                      aria-label="Actions"
                    >
                      <MoreHorizontal class="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-44">
                    <DropdownMenuItem
                      class="cursor-pointer"
                      :class="!u.is_active && 'text-green-600 dark:text-green-400'"
                      @click="toggleActive(u)"
                    >
                      <UserCheck v-if="!u.is_active" class="h-4 w-4 mr-2" />
                      <UserX v-else class="h-4 w-4 mr-2" />
                      {{ u.is_active ? 'Bannir' : 'Réactiver' }}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="cursor-pointer"
                      @click="toggleStaff(u)"
                    >
                      <Shield class="h-4 w-4 mr-2" />
                      {{ u.is_staff ? 'Retirer staff' : 'Promouvoir staff' }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground"
      >
        <span>Page {{ page }} sur {{ totalPages }} · {{ count }} users</span>
        <div class="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            :disabled="page <= 1"
            @click="goPage(page - 1)"
          >
            ← Préc
          </Button>
          <Button
            variant="outline"
            size="sm"
            :disabled="page >= totalPages"
            @click="goPage(page + 1)"
          >
            Suiv →
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRightIcon,
  DownloadIcon,
  Loader2Icon,
  MoreHorizontal,
  SearchIcon,
  Shield,
  UserCheck,
  UserX,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

import {
  type AdminUser,
  useAdminUsers,
} from '~/composables/useAdminUsers'
import { useAdminCsvExport } from '~/composables/useAdminCsvExport'
import { formatBytes, relativeTime } from '~/composables/useAdminPanel'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({ title: 'Utilisateurs — Admin VizHome' })

const { users, count, page, isLoading, loadUsers, updateUser } = useAdminUsers()

const PAGE_SIZE = 25
const totalPages = computed(() => Math.max(1, Math.ceil(count.value / PAGE_SIZE)))

const searchInput = ref('')
// "all" = pas de filtre (reka-ui n'accepte pas value="" sur un SelectItem)
const planFilter = ref('all')
const staffFilter = ref('all')
const activeFilter = ref('all')

await reload()

// ─── Filtres + pagination ────────────────────────────────────────────────
let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearchDebounced() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(reload, 400)
}

function _filterArgs() {
  return {
    search: searchInput.value.trim() || undefined,
    plan: planFilter.value === 'all' ? undefined : planFilter.value,
    is_staff:
      staffFilter.value === 'all' ? undefined : staffFilter.value === 'true',
    is_active:
      activeFilter.value === 'all' ? undefined : activeFilter.value === 'true',
  }
}

async function reload() {
  await loadUsers({ page: 1, pageSize: PAGE_SIZE, ..._filterArgs() })
}

async function goPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  await loadUsers({ page: p, pageSize: PAGE_SIZE, ..._filterArgs() })
}

// ─── Export CSV (avec les filtres en cours) ──────────────────────────────
const { isExporting, exportCsv } = useAdminCsvExport()

async function onExportCsv() {
  try {
    const f = _filterArgs()
    await exportCsv('/admin/users', 'admin-users', {
      search: f.search,
      plan: f.plan,
      is_staff: typeof f.is_staff === 'boolean' ? String(f.is_staff) : undefined,
      is_active: typeof f.is_active === 'boolean' ? String(f.is_active) : undefined,
    })
    toast.success('Export téléchargé.')
  } catch {
    toast.error('Export CSV échoué.')
  }
}

// ─── Actions modération ──────────────────────────────────────────────────
async function toggleActive(u: AdminUser) {
  const verb = u.is_active ? 'bannir' : 'réactiver'
  if (!confirm(`Vraiment ${verb} ${u.email} ?`)) return
  try {
    await updateUser(u.id, { is_active: !u.is_active })
    toast.success(u.is_active ? `${u.email} a été banni.` : `${u.email} réactivé.`)
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string } }
    toast.error(err.data?.detail || `Impossible de ${verb}.`)
  }
}

async function toggleStaff(u: AdminUser) {
  const verb = u.is_staff ? 'retirer le rôle staff de' : 'promouvoir staff'
  if (!confirm(`Vraiment ${verb} ${u.email} ?`)) return
  try {
    await updateUser(u.id, { is_staff: !u.is_staff })
    toast.success('Rôle mis à jour.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string } }
    toast.error(err.data?.detail || 'Impossible de modifier le rôle.')
  }
}

// ─── Styles helpers ──────────────────────────────────────────────────────
function planPillClass(plan: string): string {
  switch (plan) {
    case 'pro':
      return 'bg-primary/10 text-primary'
    case 'enterprise':
      return 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
    default:
      return 'bg-muted text-muted-foreground'
  }
}
</script>
