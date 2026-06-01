<!--
  Layout admin staff-only — sidebar verticale (shadcn-vue Sidebar) + inset.
  Topbar minimal : trigger sidebar + breadcrumb dynamique + actions refresh/theme.
-->
<template>
  <SidebarProvider>
    <AdminSidebar />

    <SidebarInset>
      <header
        class="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mx-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <NuxtLink to="/admin">Admin</NuxtLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <template v-if="currentLabel">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{{ currentLabel }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>

        <div class="ml-auto flex items-center gap-2">
          <span
            v-if="lastUpdatedLabel"
            class="hidden text-xs text-muted-foreground sm:inline"
          >
            Maj {{ lastUpdatedLabel }}
          </span>
          <Button
            variant="ghost"
            size="sm"
            class="h-8 gap-1.5 rounded-full text-xs"
            :disabled="refreshing"
            @click="onRefresh"
          >
            <RefreshCwIcon
              class="size-3.5"
              :class="{ 'animate-spin': refreshing }"
            />
            <span class="hidden sm:inline">
              {{ refreshing ? 'Actualisation…' : 'Actualiser' }}
            </span>
          </Button>
          <ModeToggle />
        </div>
      </header>

      <main class="flex-1 bg-muted/20">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { RefreshCwIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const route = useRoute()
const adminPanel = useAdminPanel()
const refreshing = ref(false)

const ROUTE_LABELS: Record<string, string> = {
  '/admin': '',
  '/admin/analytics': 'Analytics',
  '/admin/users': 'Utilisateurs',
  '/admin/renders': 'Renders',
  '/admin/billing': 'Billing',
  '/admin/forum': 'Modération forum',
  '/admin/support': 'Support',
  '/admin/audit-log': 'Journal d\'audit',
}

const currentLabel = computed(() => ROUTE_LABELS[route.path] ?? '')

const lastUpdatedLabel = computed(() => {
  const iso = adminPanel.overview.value?.generated_at
  if (!iso) return null
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60_000)
  if (min < 1) return "à l'instant"
  if (min < 60) return `il y a ${min} min`
  return `il y a ${Math.floor(min / 60)} h`
})

async function onRefresh() {
  refreshing.value = true
  try {
    await adminPanel.loadOverview()
  } finally {
    refreshing.value = false
  }
}
</script>
