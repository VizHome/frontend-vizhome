<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
    <!-- Header section -->
    <section>
      <h1 class="text-2xl font-bold mb-1">Tableau de bord</h1>
      <p class="text-sm text-muted-foreground">
        Vue d'ensemble en temps réel de l'activité VizHome.
        <span
          v-if="overview"
          class="text-xs"
        >
          · Données générées
          {{ relativeTime(overview.generated_at) }}
        </span>
      </p>
    </section>

    <!-- Loading state -->
    <div v-if="isLoading && !overview" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="i in 8"
        :key="i"
        class="h-24 rounded-xl border bg-card animate-pulse"
      />
    </div>

    <!-- Error state -->
    <div
      v-else-if="error && !overview"
      class="rounded-xl border bg-card p-8 text-center"
    >
      <CircleAlertIcon
        class="h-8 w-8 mx-auto mb-3 text-destructive"
      />
      <p class="text-sm font-medium mb-1">{{ error }}</p>
      <p class="text-xs text-muted-foreground">
        Vérifie que tu es bien connecté en tant que staff.
      </p>
    </div>

    <template v-else-if="overview">
      <!-- ─── Section : Users ──────────────────────────────────────── -->
      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Utilisateurs
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <AdminMetricCard
            label="Total"
            :value="overview.users.total"
            :icon="UsersIcon"
            tone="primary"
            :sublabel="`${overview.users.staff_count} staff · ${overview.users.two_factor_enabled} avec 2FA`"
          />
          <AdminMetricCard
            label="Aujourd'hui"
            :value="overview.users.new_today"
            :icon="UserPlusIcon"
            tone="success"
            sublabel="Nouveaux inscrits"
          />
          <AdminMetricCard
            label="7 derniers jours"
            :value="overview.users.new_this_week"
            :icon="TrendingUpIcon"
            tone="success"
          />
          <AdminMetricCard
            label="30 derniers jours"
            :value="overview.users.new_this_month"
            :icon="CalendarIcon"
            tone="success"
          />
        </div>
        <!-- Répartition par plan -->
        <div class="mt-3 grid grid-cols-3 gap-3">
          <div
            v-for="(count, plan) in overview.users.by_plan"
            :key="plan"
            class="rounded-lg border bg-card p-3"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs uppercase tracking-wider text-muted-foreground">{{ plan }}</span>
              <span class="text-lg font-semibold">{{ count }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── Section : Activité ────────────────────────────────────── -->
      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Activité
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <AdminMetricCard
            label="Sessions actives"
            :value="overview.sessions.total_active"
            :icon="ActivityIcon"
            tone="success"
            :sublabel="`${overview.sessions.unique_users_active} users uniques`"
          />
          <AdminMetricCard
            label="Renders total"
            :value="overview.renders.total"
            :icon="ImageIcon"
            :sublabel="`${overview.renders.this_month} ce mois`"
          />
          <AdminMetricCard
            label="Taux de succès"
            :value="successRateLabel"
            :icon="CheckCircle2Icon"
            :tone="overview.renders.success_rate && overview.renders.success_rate >= 0.9 ? 'success' : 'warning'"
          />
          <AdminMetricCard
            label="Projets"
            :value="overview.projects.total"
            :icon="FolderIcon"
            :sublabel="`${overview.projects.archived} archivés · ${overview.projects.avg_models_per_project} modèles/projet`"
          />
        </div>

        <!-- Renders breakdown -->
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-xl border bg-card p-4">
            <p class="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
              Renders par status
            </p>
            <div class="space-y-1.5">
              <div
                v-for="(count, status) in overview.renders.by_status"
                :key="status"
                class="flex items-center justify-between text-sm"
              >
                <span class="flex items-center gap-2">
                  <span
                    class="inline-block h-2 w-2 rounded-full"
                    :class="STATUS_COLORS[status as string] || 'bg-muted-foreground'"
                  />
                  {{ status }}
                </span>
                <span class="font-medium">{{ count }}</span>
              </div>
            </div>
          </div>
          <div class="rounded-xl border bg-card p-4">
            <p class="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
              Renders par source
            </p>
            <div class="space-y-1.5">
              <div
                v-for="(count, source) in overview.renders.by_source"
                :key="source"
                class="flex items-center justify-between text-sm"
              >
                <span>{{ source }}</span>
                <span class="font-medium">{{ count }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── Section : Revenus & Storage ───────────────────────────── -->
      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Business
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <AdminMetricCard
            label="MRR estimé"
            :value="`${overview.billing.mrr_eur} €`"
            :icon="EuroIcon"
            tone="success"
            :sublabel="`${overview.billing.paying_users} payants`"
          />
          <AdminMetricCard
            label="Storage total"
            :value="formatBytes(overview.storage.total_bytes)"
            :icon="HardDriveIcon"
            tone="primary"
          />
          <AdminMetricCard
            label="Sujets forum"
            :value="overview.forum.topics"
            :icon="MessagesSquareIcon"
            :sublabel="`${overview.forum.replies} réponses · ${overview.forum.categories} catégories`"
          />
          <AdminMetricCard
            label="Uploads orphelins"
            :value="overview.forum.uploads_orphan"
            :icon="TrashIcon"
            :tone="overview.forum.uploads_orphan > 10 ? 'warning' : 'neutral'"
            :sublabel="`${overview.forum.uploads_total} uploads au total`"
          />
        </div>
      </section>

      <!-- ─── Section : System health ───────────────────────────────── -->
      <section>
        <h2 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Intégrations
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <div
            v-for="(ok, key) in systemIntegrations"
            :key="key"
            class="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-xs"
          >
            <span
              class="h-2 w-2 shrink-0 rounded-full"
              :class="ok ? 'bg-green-500' : 'bg-muted-foreground/40'"
            />
            <span class="truncate">{{ INTEGRATION_LABELS[key] || key }}</span>
          </div>
        </div>
      </section>

      <!-- ─── Section : Recent activity tables ──────────────────────── -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Users récents -->
        <div class="rounded-xl border bg-card overflow-hidden">
          <div class="px-4 py-3 border-b bg-muted/30">
            <h3 class="text-sm font-semibold">Inscriptions récentes</h3>
          </div>
          <div class="divide-y">
            <div
              v-for="u in overview.users.recent"
              :key="u.id"
              class="px-4 py-2.5 flex items-center justify-between gap-3"
            >
              <div class="min-w-0">
                <p class="text-sm font-medium truncate">
                  {{ u.first_name || '?' }} {{ u.last_name || '' }}
                  <ShieldIcon
                    v-if="u.is_staff"
                    class="inline-block h-3 w-3 text-red-500 ml-1"
                  />
                </p>
                <p class="text-xs text-muted-foreground truncate">{{ u.email }}</p>
              </div>
              <div class="shrink-0 text-right text-xs">
                <span
                  class="rounded-full px-2 py-0.5 uppercase tracking-wider"
                  :class="
                    u.plan === 'pro'
                      ? 'bg-primary/10 text-primary'
                      : u.plan === 'enterprise'
                        ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                        : 'bg-muted text-muted-foreground'
                  "
                >
                  {{ u.plan }}
                </span>
                <p class="mt-0.5 text-muted-foreground">{{ relativeTime(u.date_joined) }}</p>
              </div>
            </div>
            <div
              v-if="overview.users.recent.length === 0"
              class="px-4 py-6 text-center text-sm text-muted-foreground"
            >
              Aucun user inscrit.
            </div>
          </div>
        </div>

        <!-- Renders récents -->
        <div class="rounded-xl border bg-card overflow-hidden">
          <div class="px-4 py-3 border-b bg-muted/30">
            <h3 class="text-sm font-semibold">Renders récents</h3>
          </div>
          <div class="divide-y">
            <div
              v-for="r in overview.renders.recent"
              :key="r.id"
              class="px-4 py-2.5 flex items-center justify-between gap-3"
            >
              <div class="min-w-0">
                <p class="text-sm font-medium flex items-center gap-2">
                  <span
                    class="h-2 w-2 shrink-0 rounded-full"
                    :class="STATUS_COLORS[r.status] || 'bg-muted-foreground'"
                  />
                  #{{ r.id }} · {{ r.source }} → {{ r.output_type }}
                </p>
                <p class="text-xs text-muted-foreground truncate">{{ r.user__email }}</p>
              </div>
              <div class="shrink-0 text-right text-xs text-muted-foreground">
                <p>{{ r.provider }}</p>
                <p>{{ relativeTime(r.created_at) }}</p>
              </div>
            </div>
            <div
              v-if="overview.renders.recent.length === 0"
              class="px-4 py-6 text-center text-sm text-muted-foreground"
            >
              Aucun render généré.
            </div>
          </div>
        </div>

        <!-- Topics forum récents (full width) -->
        <div class="lg:col-span-2 rounded-xl border bg-card overflow-hidden">
          <div class="px-4 py-3 border-b bg-muted/30 flex items-center justify-between">
            <h3 class="text-sm font-semibold">Activité forum récente</h3>
            <NuxtLink
              to="/forum"
              class="text-xs text-primary hover:underline"
            >
              Aller au forum →
            </NuxtLink>
          </div>
          <div class="divide-y">
            <div
              v-for="t in overview.forum.recent_topics"
              :key="t.id"
              class="px-4 py-2.5 flex items-center justify-between gap-3"
            >
              <div class="min-w-0">
                <p class="text-sm font-medium truncate flex items-center gap-1.5">
                  <PinIcon v-if="t.is_pinned" class="h-3 w-3 text-amber-500 shrink-0" />
                  <LockIcon v-if="t.is_locked" class="h-3 w-3 text-muted-foreground shrink-0" />
                  <NuxtLink
                    :to="`/forum/topic/${t.id}`"
                    class="hover:text-primary transition-colors"
                  >
                    {{ t.title }}
                  </NuxtLink>
                </p>
                <p class="text-xs text-muted-foreground truncate">
                  {{ t.author__email }} · {{ t.category__name }}
                </p>
              </div>
              <div class="shrink-0 text-right text-xs text-muted-foreground">
                <p>{{ t.replies_count }} ↩ · {{ t.views_count }} 👁</p>
                <p>{{ relativeTime(t.created_at) }}</p>
              </div>
            </div>
            <div
              v-if="overview.forum.recent_topics.length === 0"
              class="px-4 py-6 text-center text-sm text-muted-foreground"
            >
              Aucun sujet pour l'instant.
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ActivityIcon,
  CalendarIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  EuroIcon,
  FolderIcon,
  HardDriveIcon,
  ImageIcon,
  LockIcon,
  MessagesSquareIcon,
  PinIcon,
  ShieldIcon,
  TrashIcon,
  TrendingUpIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

import { formatBytes, relativeTime } from '~/composables/useAdminPanel'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  // SSR off : composable singleton + fetch async = mismatches d'hydratation
  ssr: false,
})

useHead({
  title: 'Admin — VizHome',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const { overview, isLoading, error, loadOverview } = useAdminPanel()

await loadOverview()

// ─── Helpers réactifs ────────────────────────────────────────────────────
const successRateLabel = computed(() => {
  const r = overview.value?.renders.success_rate
  return r === null || r === undefined ? '—' : `${Math.round(r * 100)}%`
})

const systemIntegrations = computed(() => {
  const s = overview.value?.system
  if (!s) return {} as Record<string, boolean>
  return {
    gemini_configured: s.gemini_configured,
    stripe_configured: s.stripe_configured,
    google_oauth_configured: s.google_oauth_configured,
    github_oauth_configured: s.github_oauth_configured,
    minio_configured: s.minio_configured,
    sentry_configured: s.sentry_configured,
  }
})

// ─── Constants ───────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500',
  processing: 'bg-blue-500',
  done: 'bg-green-500',
  failed: 'bg-red-500',
}

const INTEGRATION_LABELS: Record<string, string> = {
  gemini_configured: 'Gemini IA',
  stripe_configured: 'Stripe',
  google_oauth_configured: 'Google OAuth',
  github_oauth_configured: 'GitHub OAuth',
  minio_configured: 'MinIO Storage',
  sentry_configured: 'Sentry',
}
</script>
