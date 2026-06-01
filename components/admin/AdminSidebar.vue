<!--
  AdminSidebar — sidebar verticale du panel admin (shadcn-vue Sidebar).

  Trois groupes : Pilotage / Modération / Système. Footer = retour app + user.
  Compatible collapse en mode icône (`collapsible="icon"`).
-->
<template>
  <Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
      <NuxtLink
        to="/admin"
        class="flex items-center gap-2 px-2 py-1.5"
        aria-label="Tableau de bord admin"
      >
        <span
          class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500"
        >
          <ShieldIcon class="size-4" />
        </span>
        <div class="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
          <span class="text-sm font-semibold">VizHome</span>
          <span class="text-[10px] uppercase tracking-wider text-muted-foreground">
            Admin Panel
          </span>
        </div>
      </NuxtLink>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup
        v-for="group in navGroups"
        :key="group.label"
      >
        <SidebarGroupLabel>{{ group.label }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in group.items"
              :key="item.to"
            >
              <SidebarMenuButton
                as-child
                :is-active="route.path === item.to"
                :tooltip="item.label"
              >
                <NuxtLink :to="item.to">
                  <component :is="item.icon" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </SidebarMenuButton>
              <SidebarMenuBadge v-if="item.badge">
                {{ item.badge }}
              </SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child tooltip="Retour à l'application">
            <NuxtLink to="/render">
              <ArrowLeftIcon />
              <span>Retour app</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem v-if="userValue">
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent"
            :tooltip="userValue.email"
          >
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium"
            >
              {{ initials(userValue.name) }}
            </div>
            <div class="flex flex-col leading-tight overflow-hidden">
              <span class="truncate text-sm font-medium">
                {{ userValue.name || userValue.email }}
              </span>
              <span class="truncate text-[10px] text-muted-foreground">
                {{ userValue.email }}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import {
  ActivityIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  GaugeIcon,
  ImageIcon,
  LifeBuoyIcon,
  LineChartIcon,
  MessagesSquareIcon,
  ScrollTextIcon,
  ShieldIcon,
  UsersIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

const route = useRoute()
const user = useUser()
const adminPanel = useAdminPanel()

const userValue = computed(() => user.user.value)

// Badges dynamiques (uploads orphelins sur la nav forum quand >10)
const orphanCount = computed(
  () => adminPanel.overview.value?.forum.uploads_orphan ?? 0,
)

const navGroups = computed(() => [
  {
    label: 'Pilotage',
    items: [
      { to: '/admin', label: 'Dashboard', icon: GaugeIcon },
      { to: '/admin/analytics', label: 'Analytics', icon: LineChartIcon },
    ],
  },
  {
    label: 'Modération',
    items: [
      { to: '/admin/users', label: 'Utilisateurs', icon: UsersIcon },
      { to: '/admin/renders', label: 'Renders', icon: ImageIcon },
      {
        to: '/admin/forum',
        label: 'Forum',
        icon: MessagesSquareIcon,
        badge: orphanCount.value > 10 ? String(orphanCount.value) : undefined,
      },
      { to: '/admin/support', label: 'Support', icon: LifeBuoyIcon },
    ],
  },
  {
    label: 'Système',
    items: [
      { to: '/admin/billing', label: 'Billing', icon: CreditCardIcon },
      { to: '/admin/audit-log', label: 'Journal d\'audit', icon: ScrollTextIcon },
    ],
  },
] as const)

function initials(name: string | undefined): string {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('') || '?'
}

// Pas utilisé directement mais imported pour potentielle future activité
const _ = ActivityIcon
</script>
