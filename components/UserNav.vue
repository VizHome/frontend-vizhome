<template>
  <!--
    Bouton avatar — deux modes :
    - mode `floating` (défaut) : pour /render (pas de navbar) → flotte en haut à droite
    - mode `inline` : pour layouts avec navbar (account/support/admin) → s'aligne
      dans le flex parent, avatar plus compact (h-9 w-9)
  -->
  <div :class="floating ? 'absolute top-4 right-4 z-30' : 'inline-flex'">
    <DropdownMenu v-model:open="dropdownOpen">
      <DropdownMenuTrigger as-child>
        <button
          class="relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          :title="user.name"
        >
          <Avatar
            :class="floating
              ? 'h-12 w-12 border-2 border-background shadow-md ring-2 ring-border transition hover:ring-primary/50'
              : 'h-9 w-9 ring-2 ring-border transition hover:ring-primary/50'"
          >
            <AvatarImage :src="user.avatarUrl" :alt="user.name" />
            <AvatarFallback :class="floating ? 'text-sm font-semibold' : 'text-xs font-semibold'">
              {{ initials }}
            </AvatarFallback>
          </Avatar>
          <!-- Badge plan -->
          <span
            :class="floating
              ? 'absolute -bottom-1 -right-1 flex items-center justify-center rounded-full px-1.5 py-px text-[10px] font-bold leading-none bg-background border border-border shadow-sm text-foreground'
              : 'absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full px-1 py-px text-[9px] font-bold leading-none bg-background border border-border shadow-sm text-foreground'"
          >
            {{ planLabel }}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-64" align="end" :side-offset="8">
        <!-- En-tête utilisateur -->
        <DropdownMenuLabel class="font-normal">
          <div class="flex items-center gap-3 py-1">
            <Avatar class="h-10 w-10 shrink-0">
              <AvatarImage :src="user.avatarUrl" :alt="user.name" />
              <AvatarFallback class="text-sm font-semibold">{{
                initials
              }}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col min-w-0">
              <p class="text-sm font-semibold leading-none truncate">
                {{ user.name }}
              </p>
              <p
                class="text-xs leading-none text-muted-foreground mt-1 truncate"
              >
                {{ user.email }}
              </p>
              <span
                class="mt-1.5 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none"
                :class="planBadgeClass"
                >{{ planLabel }}</span
              >
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <!-- Compte (Paramètres = tout-en-un : compte + utilisation + appearance + sécurité…) -->
        <DropdownMenuGroup>
          <DropdownMenuItem
            class="gap-2.5 cursor-pointer"
            @click="openDialog('settings')"
          >
            <Settings class="h-4 w-4 text-muted-foreground" />
            <span>Paramètres</span>
          </DropdownMenuItem>
          <!-- Lien admin visible uniquement si l'user est staff -->
          <DropdownMenuItem
            v-if="user?.isStaff"
            class="gap-2.5 cursor-pointer"
            @click="goTo('/admin')"
          >
            <Shield class="h-4 w-4 text-red-500" />
            <span class="text-foreground">Admin</span>
            <span
              class="ml-auto rounded-full bg-red-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-red-500"
            >
              Staff
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <!-- Navigation principale -->
        <DropdownMenuGroup>
          <DropdownMenuItem
            class="gap-2.5 cursor-pointer"
            @click="goTo('/gallery')"
          >
            <LayoutGrid class="h-4 w-4 text-muted-foreground" />
            <span>Galerie de rendus</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            class="gap-2.5 cursor-pointer"
            @click="goTo('/support')"
          >
            <LifeBuoy class="h-4 w-4 text-muted-foreground" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <!-- CTA "Mettre à niveau l'abonnement" — visible si pas enterprise.
             Style Claude : ligne dédiée, icône Sparkles, redirige vers la
             vraie page billing (où live plans + factures + cancel). -->
        <template v-if="user?.plan !== 'enterprise'">
          <DropdownMenuSeparator />
          <DropdownMenuItem
            class="gap-2.5 cursor-pointer"
            @click="goTo('/account/billing')"
          >
            <Sparkles class="h-4 w-4 text-primary" />
            <span class="text-foreground font-medium">
              Mettre à niveau l'abonnement
            </span>
          </DropdownMenuItem>
        </template>

        <DropdownMenuSeparator />

        <!-- Groupe aide -->
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger class="gap-2.5 cursor-pointer">
              <HelpCircle class="h-4 w-4 text-muted-foreground" />
              <span>Aide</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent class="w-52">
              <DropdownMenuItem
                class="gap-2.5 cursor-pointer"
                @click="openHelpTab('help')"
              >
                <BookOpen class="h-4 w-4 text-muted-foreground" />
                <span>Centre d'aide</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="gap-2.5 cursor-pointer"
                @click="openHelpTab('changelog')"
              >
                <Tag class="h-4 w-4 text-muted-foreground" />
                <span>Notes de version</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                class="gap-2.5 cursor-pointer"
                @click="openHelpTab('legal')"
              >
                <Shield class="h-4 w-4 text-muted-foreground" />
                <span>Politique de confidentialité</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="gap-2.5 cursor-pointer"
                @click="openHelpTab('bug')"
              >
                <Bug class="h-4 w-4 text-muted-foreground" />
                <span>Signaler un bug</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                class="gap-2.5 cursor-pointer"
                @click="openHelpTab('shortcuts')"
              >
                <Keyboard class="h-4 w-4 text-muted-foreground" />
                <span>Raccourcis clavier</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <!-- Déconnexion -->
        <DropdownMenuItem
          class="gap-2.5 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          @click="handleLogout"
        >
          <LogOut class="h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Dialogs (UserNav simplifié : profil/stats/subscription/billing intégrés dans Settings) -->
    <HelpDialog v-model:open="dialogs.help" :initial-tab="helpInitialTab" />
    <SettingsDialog v-model:open="dialogs.settings" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import {
  BookOpen,
  Bug,
  HelpCircle,
  Keyboard,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Settings,
  Shield,
  Sparkles,
  Tag,
} from 'lucide-vue-next'
import type { UserPlan } from '~/composables/useUser'

withDefaults(
  defineProps<{
    /** `false` ⇒ rendu inline (dans une navbar). `true` ⇒ flotte en absolute top/right (pour /render). */
    floating?: boolean
  }>(),
  { floating: true },
)

const { user, initials, planLabel, logout } = useUser()

const dropdownOpen = ref(false)

// ─── Dialogs ─────────────────────────────────────────────────────────────────
const dialogs = reactive({
  help: false,
  settings: false,
})

type DialogId = keyof typeof dialogs
type HelpTab = 'help' | 'changelog' | 'legal' | 'bug' | 'shortcuts'

const helpInitialTab = ref<HelpTab>('help')

const openDialog = (id: DialogId) => {
  dropdownOpen.value = false
  dialogs[id] = true
}

const openHelpTab = (tab: HelpTab) => {
  helpInitialTab.value = tab
  openDialog('help')
}

// ─── Plan badge ──────────────────────────────────────────────────────────────
const planBadgeClass = computed(() => {
  const classes: Record<UserPlan, string> = {
    free: 'bg-muted text-muted-foreground',
    pro: 'bg-primary/15 text-primary',
    enterprise: 'bg-amber-500/15 text-amber-600',
  }
  return classes[user.value.plan]
})

// ─── Navigation ──────────────────────────────────────────────────────────────
const goTo = async (path: string) => {
  dropdownOpen.value = false
  await navigateTo(path)
}

// ─── Logout ──────────────────────────────────────────────────────────────────
const handleLogout = async () => {
  dropdownOpen.value = false
  await logout()
}
</script>
