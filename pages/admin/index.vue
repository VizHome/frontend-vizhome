<template>
  <div class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p class="text-sm text-muted-foreground">
          Vue d'ensemble en temps réel de l'activité VizHome.
        </p>
      </div>
      <div v-if="overview" class="flex flex-wrap items-center gap-2">
        <Button as-child variant="outline" size="sm" class="h-8 gap-1.5 rounded-full text-xs">
          <NuxtLink to="/admin/analytics">
            <LineChartIcon class="size-3.5" />
            Voir les analytics
          </NuxtLink>
        </Button>
      </div>
    </section>

    <!-- Loading state -->
    <div v-if="isLoading && !overview" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Skeleton v-for="i in 4" :key="i" class="h-28 rounded-xl" />
    </div>

    <!-- Error state -->
    <Alert v-else-if="error && !overview" variant="destructive">
      <CircleAlertIcon class="size-4" />
      <AlertTitle>Impossible de charger le dashboard</AlertTitle>
      <AlertDescription>
        {{ error }} — Vérifie que tu es bien connecté en tant que staff.
      </AlertDescription>
    </Alert>

    <template v-else-if="overview">
      <!-- ─── Alertes ──────────────────────────────────────────────────── -->
      <Alert v-if="alerts.length > 0" variant="default" class="border-amber-200 dark:border-amber-900/50">
        <AlertTriangleIcon class="size-4 text-amber-500" />
        <AlertTitle>{{ alerts.length }} {{ alerts.length > 1 ? 'alertes' : 'alerte' }}</AlertTitle>
        <AlertDescription>
          <ul class="mt-1.5 flex flex-col gap-1 text-sm">
            <li
              v-for="a in alerts"
              :key="a.label"
              class="flex items-center gap-2"
            >
              <span class="text-muted-foreground">·</span>
              <span>{{ a.label }}</span>
              <NuxtLink
                v-if="a.to"
                :to="a.to"
                class="text-primary hover:underline"
              >
                {{ a.action }}
              </NuxtLink>
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      <!-- ─── KPI principaux ─────────────────────────────────────────── -->
      <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard
          label="Utilisateurs"
          :value="overview.users.total"
          :icon="UsersIcon"
          tone="primary"
          :sublabel="`+${overview.users.new_this_week} cette semaine`"
        />
        <AdminMetricCard
          label="Renders générés"
          :value="overview.renders.total"
          :icon="ImageIcon"
          tone="primary"
          :sublabel="`${overview.renders.this_month} ce mois`"
        />
        <AdminMetricCard
          label="MRR estimé"
          :value="`${overview.billing.mrr_eur} €`"
          :icon="EuroIcon"
          tone="success"
          :sublabel="`${overview.billing.paying_users} clients payants`"
        />
        <AdminMetricCard
          label="Taux de succès"
          :value="successRateLabel"
          :icon="CheckCircle2Icon"
          :tone="successTone"
          :sublabel="successSublabel"
        />
      </section>

      <!-- ─── Distribution & santé système ───────────────────────────── -->
      <section class="grid gap-3 lg:grid-cols-3">
        <!-- Plans -->
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-semibold">Plans</CardTitle>
            <CardDescription class="text-xs">
              Répartition des utilisateurs par offre
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-2">
            <div
              v-for="(count, plan) in overview.users.by_plan"
              :key="plan"
              class="flex flex-col gap-1"
            >
              <div class="flex items-center justify-between text-xs">
                <span class="flex items-center gap-1.5 font-medium uppercase tracking-wider text-muted-foreground">
                  <span
                    class="inline-block size-2 rounded-full"
                    :class="PLAN_COLORS[plan as string] || 'bg-muted-foreground'"
                  />
                  {{ plan }}
                </span>
                <span class="tabular-nums font-semibold">{{ count }}</span>
              </div>
              <div class="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  class="h-full rounded-full transition-all"
                  :class="PLAN_COLORS[plan as string] || 'bg-muted-foreground'"
                  :style="{ width: planWidth(count) }"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Renders status -->
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-semibold">Renders par status</CardTitle>
            <CardDescription class="text-xs">
              État actuel du pipeline de génération
            </CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-2">
            <div
              v-for="(count, status) in overview.renders.by_status"
              :key="status"
              class="flex items-center justify-between text-sm"
            >
              <span class="flex items-center gap-2">
                <span
                  class="inline-block size-2 rounded-full"
                  :class="STATUS_COLORS[status as string] || 'bg-muted-foreground'"
                />
                <span class="capitalize">{{ status }}</span>
              </span>
              <span class="font-medium tabular-nums">{{ count }}</span>
            </div>
          </CardContent>
        </Card>

        <!-- Système -->
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-sm font-semibold">Intégrations</CardTitle>
            <CardDescription class="text-xs">
              Services externes configurés
            </CardDescription>
          </CardHeader>
          <CardContent class="grid grid-cols-2 gap-2">
            <div
              v-for="(ok, key) in systemIntegrations"
              :key="key"
              class="flex items-center gap-2 rounded-md border bg-muted/30 px-2 py-1.5 text-xs"
            >
              <span
                class="size-1.5 shrink-0 rounded-full"
                :class="ok ? 'bg-green-500' : 'bg-muted-foreground/40'"
              />
              <span class="truncate">{{ INTEGRATION_LABELS[key] || key }}</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <!-- ─── Sessions + Storage + Forum (KPI secondaires) ────────────── -->
      <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard
          label="Sessions actives"
          :value="overview.sessions.total_active"
          :icon="ActivityIcon"
          tone="success"
          :sublabel="`${overview.sessions.unique_users_active} users uniques`"
        />
        <AdminMetricCard
          label="Storage"
          :value="formatBytes(overview.storage.total_bytes)"
          :icon="HardDriveIcon"
          tone="primary"
        />
        <AdminMetricCard
          label="Sujets forum"
          :value="overview.forum.topics"
          :icon="MessagesSquareIcon"
          :sublabel="`${overview.forum.replies} réponses`"
        />
        <AdminMetricCard
          label="Uploads orphelins"
          :value="overview.forum.uploads_orphan"
          :icon="TrashIcon"
          :tone="overview.forum.uploads_orphan > 10 ? 'warning' : 'neutral'"
          :sublabel="`${overview.forum.uploads_total} uploads total`"
        />
      </section>

      <!-- ─── Activité récente (2 col + 1 full width) ─────────────────── -->
      <section class="grid gap-4 lg:grid-cols-2">
        <!-- Users récents -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle class="text-sm font-semibold">Inscriptions récentes</CardTitle>
              <CardDescription class="text-xs">
                {{ overview.users.recent.length }} derniers utilisateurs
              </CardDescription>
            </div>
            <Button as-child variant="ghost" size="sm" class="h-7 gap-1 text-xs">
              <NuxtLink to="/admin/users">
                Voir tout
                <ChevronRightIcon class="size-3" />
              </NuxtLink>
            </Button>
          </CardHeader>
          <CardContent class="p-0">
            <ul class="divide-y">
              <li
                v-for="u in overview.users.recent"
                :key="u.id"
                class="flex items-center gap-3 px-4 py-2.5"
              >
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                  :class="u.is_staff ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'"
                >
                  {{ initials(`${u.first_name || ''} ${u.last_name || ''}`) }}
                </span>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">
                    {{ u.first_name || u.email.split('@')[0] }}
                    <span v-if="u.last_name" class="font-normal text-muted-foreground">
                      {{ u.last_name }}
                    </span>
                  </p>
                  <p class="truncate text-xs text-muted-foreground">{{ u.email }}</p>
                </div>
                <div class="shrink-0 text-right">
                  <Badge :class="planBadgeClass(u.plan)" variant="secondary">
                    {{ u.plan }}
                  </Badge>
                  <p class="mt-0.5 text-[10px] text-muted-foreground">
                    {{ relativeTime(u.date_joined) }}
                  </p>
                </div>
              </li>
              <li
                v-if="overview.users.recent.length === 0"
                class="px-4 py-6 text-center text-sm text-muted-foreground"
              >
                Aucun utilisateur inscrit.
              </li>
            </ul>
          </CardContent>
        </Card>

        <!-- Renders récents -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle class="text-sm font-semibold">Renders récents</CardTitle>
              <CardDescription class="text-xs">
                {{ overview.renders.recent.length }} derniers jobs
              </CardDescription>
            </div>
            <Button as-child variant="ghost" size="sm" class="h-7 gap-1 text-xs">
              <NuxtLink to="/admin/renders">
                Voir tout
                <ChevronRightIcon class="size-3" />
              </NuxtLink>
            </Button>
          </CardHeader>
          <CardContent class="p-0">
            <ul class="divide-y">
              <li
                v-for="r in overview.renders.recent"
                :key="r.id"
                class="flex items-center gap-3 px-4 py-2.5"
              >
                <span
                  class="size-2 shrink-0 rounded-full"
                  :class="STATUS_COLORS[r.status] || 'bg-muted-foreground'"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">
                    #{{ r.id }} <span class="text-muted-foreground">·</span> {{ r.source }} → {{ r.output_type }}
                  </p>
                  <p class="truncate text-xs text-muted-foreground">{{ r.user__email }}</p>
                </div>
                <div class="shrink-0 text-right text-xs text-muted-foreground">
                  <p class="capitalize">{{ r.provider }}</p>
                  <p class="text-[10px]">{{ relativeTime(r.created_at) }}</p>
                </div>
              </li>
              <li
                v-if="overview.renders.recent.length === 0"
                class="px-4 py-6 text-center text-sm text-muted-foreground"
              >
                Aucun render généré.
              </li>
            </ul>
          </CardContent>
        </Card>

        <!-- Forum activité (full-width) -->
        <Card class="lg:col-span-2">
          <CardHeader class="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle class="text-sm font-semibold">Activité forum</CardTitle>
              <CardDescription class="text-xs">
                Sujets les plus récents
              </CardDescription>
            </div>
            <Button as-child variant="ghost" size="sm" class="h-7 gap-1 text-xs">
              <NuxtLink to="/admin/forum">
                Modérer
                <ChevronRightIcon class="size-3" />
              </NuxtLink>
            </Button>
          </CardHeader>
          <CardContent class="p-0">
            <ul class="divide-y">
              <li
                v-for="t in overview.forum.recent_topics"
                :key="t.id"
                class="flex items-center gap-3 px-4 py-2.5"
              >
                <PinIcon v-if="t.is_pinned" class="size-3.5 shrink-0 text-amber-500" />
                <LockIcon v-else-if="t.is_locked" class="size-3.5 shrink-0 text-muted-foreground" />
                <MessageSquareIcon v-else class="size-3.5 shrink-0 text-muted-foreground" />
                <div class="min-w-0 flex-1">
                  <NuxtLink
                    :to="`/forum/topic/${t.id}`"
                    target="_blank"
                    class="block truncate text-sm font-medium hover:text-primary"
                  >
                    {{ t.title }}
                  </NuxtLink>
                  <p class="truncate text-xs text-muted-foreground">
                    {{ t.author__email }}
                    <span class="text-muted-foreground/60">·</span>
                    {{ t.category__name }}
                  </p>
                </div>
                <div class="shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                  <p>{{ t.replies_count }} ↩ · {{ t.views_count }} 👁</p>
                  <p class="text-[10px]">{{ relativeTime(t.created_at) }}</p>
                </div>
              </li>
              <li
                v-if="overview.forum.recent_topics.length === 0"
                class="px-4 py-6 text-center text-sm text-muted-foreground"
              >
                Aucun sujet.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  CircleAlertIcon,
  EuroIcon,
  HardDriveIcon,
  ImageIcon,
  LineChartIcon,
  LockIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  PinIcon,
  TrashIcon,
  UsersIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

import { formatBytes, relativeTime } from '~/composables/useAdminPanel'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({
  title: 'Admin — VizHome',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const { overview, isLoading, error, loadOverview } = useAdminPanel()

await loadOverview()

// ─── Computed ────────────────────────────────────────────────────────────
const successRateLabel = computed(() => {
  const r = overview.value?.renders.success_rate
  return r === null || r === undefined ? '—' : `${Math.round(r * 100)}%`
})

const successTone = computed<'success' | 'warning' | 'danger' | 'neutral'>(() => {
  const r = overview.value?.renders.success_rate
  if (r === null || r === undefined) return 'neutral'
  if (r >= 0.95) return 'success'
  if (r >= 0.8) return 'warning'
  return 'danger'
})

const successSublabel = computed(() => {
  const failed = overview.value?.renders.by_status?.failed ?? 0
  return failed > 0 ? `${failed} échec(s)` : 'aucun échec'
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

const alerts = computed(() => {
  const a: { label: string; to?: string; action?: string }[] = []
  if (!overview.value) return a
  const o = overview.value
  if (o.forum.uploads_orphan > 10) {
    a.push({
      label: `${o.forum.uploads_orphan} uploads forum orphelins en attente de cleanup`,
      to: '/admin/forum',
      action: 'Modérer',
    })
  }
  const r = o.renders.success_rate
  if (r !== null && r !== undefined && r < 0.8) {
    a.push({
      label: `Taux de succès renders bas (${Math.round(r * 100)}%)`,
      to: '/admin/renders',
      action: 'Voir',
    })
  }
  if (!o.system.stripe_configured) {
    a.push({
      label: 'Stripe non configuré — pas de subscriptions actives',
      to: '/admin/billing',
      action: 'Détails',
    })
  }
  return a
})

const maxPlanCount = computed(() => {
  if (!overview.value) return 1
  return Math.max(1, ...Object.values(overview.value.users.by_plan))
})

function planWidth(count: number): string {
  return `${Math.max(4, Math.round((count / maxPlanCount.value) * 100))}%`
}

// ─── Helpers ─────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500',
  processing: 'bg-blue-500',
  done: 'bg-green-500',
  failed: 'bg-red-500',
}

const PLAN_COLORS: Record<string, string> = {
  free: 'bg-muted-foreground',
  pro: 'bg-primary',
  enterprise: 'bg-amber-500',
}

const INTEGRATION_LABELS: Record<string, string> = {
  gemini_configured: 'Gemini IA',
  stripe_configured: 'Stripe',
  google_oauth_configured: 'Google OAuth',
  github_oauth_configured: 'GitHub OAuth',
  minio_configured: 'MinIO',
  sentry_configured: 'Sentry',
}

function planBadgeClass(plan: string): string {
  switch (plan) {
    case 'pro':
      return 'bg-primary/10 text-primary border-0'
    case 'enterprise':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-0'
    default:
      return 'bg-muted text-muted-foreground border-0'
  }
}

function initials(name: string): string {
  const t = name.trim()
  if (!t) return '?'
  return t
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('') || '?'
}
</script>
