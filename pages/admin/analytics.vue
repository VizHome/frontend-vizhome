<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
    <!-- Header + sélecteur période -->
    <section class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <nav class="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
          <NuxtLink to="/admin" class="hover:text-foreground">Admin</NuxtLink>
          <ChevronRightIcon class="size-3" />
          <span class="text-foreground">Analytics</span>
        </nav>
        <h1 class="text-2xl font-bold">Analytics</h1>
        <p class="text-sm text-muted-foreground">
          Séries temporelles et distribution des renders.
        </p>
      </div>
      <Select v-model="period" @update:model-value="reload">
        <SelectTrigger class="h-9 w-36 text-sm rounded-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">7 derniers jours</SelectItem>
          <SelectItem value="30">30 derniers jours</SelectItem>
          <SelectItem value="90">90 derniers jours</SelectItem>
        </SelectContent>
      </Select>
    </section>

    <!-- Loading -->
    <div v-if="isLoading && !timeline" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton class="h-[280px] rounded-xl" />
      <Skeleton class="h-[280px] rounded-xl" />
      <Skeleton class="h-[280px] rounded-xl md:col-span-2" />
    </div>

    <!-- Error -->
    <Alert v-else-if="error && !timeline" variant="destructive">
      <CircleAlertIcon class="size-4" />
      <AlertTitle>Impossible de charger les analytics</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <!-- Charts -->
    <template v-else-if="timeline">
      <!-- Grille principale 2 colonnes (1 sur mobile) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Users growth -->
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Nouveaux utilisateurs</CardTitle>
            <CardDescription>
              {{ totalNewUsers }} inscription{{ totalNewUsers > 1 ? 's' : '' }} sur {{ period }} jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminUsersChart :data="timeline.users_per_day" />
          </CardContent>
        </Card>

        <!-- Renders status -->
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Renders par status</CardTitle>
            <CardDescription>Distribution globale (tous temps confondus)</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRendersByStatusChart :breakdown="timeline.renders_status_breakdown" />
          </CardContent>
        </Card>

        <!-- Forum activity full width -->
        <Card class="lg:col-span-2">
          <CardHeader>
            <CardTitle class="text-base">Activité forum</CardTitle>
            <CardDescription>
              {{ totalForumActivity.topics }} topics et {{ totalForumActivity.replies }} réponses sur {{ period }} jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminForumActivityChart :data="timeline.forum_activity_per_day" />
          </CardContent>
        </Card>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon, CircleAlertIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { useAdminTimeline } from '~/composables/useAdminTimeline'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'staff'],
  ssr: false,
})

useHead({ title: 'Analytics — Admin VizHome' })

const { timeline, isLoading, error, loadTimeline } = useAdminTimeline()

const period = ref<'7' | '30' | '90'>('30')

await loadTimeline(Number(period.value))

async function reload() {
  await loadTimeline(Number(period.value))
}

const totalNewUsers = computed(() =>
  timeline.value?.users_per_day.reduce((s, d) => s + d.count, 0) ?? 0
)

const totalForumActivity = computed(() => {
  const empty = { topics: 0, replies: 0 }
  if (!timeline.value) return empty
  return timeline.value.forum_activity_per_day.reduce(
    (acc, d) => ({
      topics: acc.topics + d.topics,
      replies: acc.replies + d.replies,
    }),
    empty,
  )
})
</script>
