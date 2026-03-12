<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-2xl p-0 gap-0 overflow-hidden">
      <DialogHeader class="px-6 pt-6 pb-4 border-b">
        <DialogTitle>Paramètres</DialogTitle>
        <DialogDescription>
          Gérez vos préférences et la configuration de votre compte.
        </DialogDescription>
      </DialogHeader>

      <!-- Layout 2 colonnes -->
      <div class="flex min-h-[480px]">
        <!-- Sidebar nav gauche -->
        <nav class="w-44 shrink-0 border-r p-3 flex flex-col gap-0.5">
          <button
            v-for="item in navItems"
            :key="item.id"
            class="flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-sm text-left transition-colors"
            :class="
              activeSection === item.id
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            "
            @click="activeSection = item.id"
          >
            <component :is="item.icon" class="h-4 w-4 shrink-0" />
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <!-- Contenu section -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- ── Apparence ─────────────────────────────────────────── -->
          <section v-if="activeSection === 'appearance'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Apparence</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Choisissez le thème de l'interface.
              </p>
            </div>
            <div class="flex gap-2">
              <button
                v-for="t in themes"
                :key="t.value"
                class="flex-1 flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-sm font-medium transition-colors"
                :class="
                  prefs.theme === t.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                "
                @click="setTheme(t.value)"
              >
                <component :is="t.icon" class="h-5 w-5" />
                <span>{{ t.label }}</span>
              </button>
            </div>
          </section>

          <!-- ── Langue ────────────────────────────────────────────── -->
          <section v-if="activeSection === 'language'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Langue</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Choisissez la langue de l'interface.
              </p>
            </div>
            <div class="max-w-xs">
              <Select
                :model-value="prefs.language"
                @update:model-value="
                  updatePreferences({ language: $event as AppLanguage })
                "
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <!-- ── Notifications ─────────────────────────────────────── -->
          <section v-if="activeSection === 'notifications'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Notifications</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Contrôlez les alertes que vous recevez.
              </p>
            </div>
            <div class="space-y-4">
              <div
                v-for="notif in notifToggles"
                :key="notif.key"
                class="flex items-center justify-between"
              >
                <span class="text-sm">{{ notif.label }}</span>
                <button
                  class="relative w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs[notif.key] ? 'bg-primary' : 'bg-muted'"
                  @click="notif.toggle()"
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs[notif.key] ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
            </div>
          </section>

          <!-- ── Qualité de rendu ───────────────────────────────────── -->
          <section v-if="activeSection === 'render'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Qualité de rendu</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Configurez les paramètres de rendu par défaut.
              </p>
            </div>
            <div class="space-y-5">
              <!-- Qualité -->
              <div>
                <Label class="text-sm font-medium mb-2 block">Qualité</Label>
                <Select
                  :model-value="prefs.renderQuality"
                  @update:model-value="
                    updatePreferences({
                      renderQuality: $event as RenderQuality,
                    })
                  "
                >
                  <SelectTrigger class="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rapide (Brouillon)</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high">Haute qualité</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Format d'export -->
              <div>
                <Label class="text-sm font-medium mb-2 block"
                  >Format d'export</Label
                >
                <div class="flex gap-2">
                  <button
                    v-for="fmt in formats"
                    :key="fmt"
                    class="px-4 py-2 rounded-md border text-sm font-medium transition-colors"
                    :class="
                      prefs.renderFormat === fmt
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    "
                    @click="updatePreferences({ renderFormat: fmt })"
                  >
                    {{ fmt.toUpperCase() }}
                  </button>
                </div>
              </div>

              <!-- Résolution -->
              <div>
                <Label class="text-sm font-medium mb-2 block"
                  >Résolution maximale</Label
                >
                <div class="flex gap-2">
                  <button
                    v-for="res in resolutions"
                    :key="res.value"
                    class="px-3 py-2 rounded-md border text-sm font-medium transition-colors"
                    :class="
                      prefs.renderResolution === res.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    "
                    @click="updatePreferences({ renderResolution: res.value })"
                  >
                    {{ res.label }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- ── Confidentialité ────────────────────────────────────── -->
          <section v-if="activeSection === 'privacy'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Confidentialité</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Gérez vos données et consentements.
              </p>
            </div>
            <div class="space-y-4">
              <!-- Analytics -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Analytics anonymes</p>
                  <p class="text-xs text-muted-foreground">
                    Aide à améliorer l'application.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.analyticsEnabled ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({
                      analyticsEnabled: !prefs.analyticsEnabled,
                    })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.analyticsEnabled ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
              <!-- Marketing -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Communications marketing</p>
                  <p class="text-xs text-muted-foreground">
                    Offres et nouveautés par email.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.marketingEnabled ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({
                      marketingEnabled: !prefs.marketingEnabled,
                    })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.marketingEnabled ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>

              <div class="pt-4 border-t space-y-2">
                <Button
                  variant="outline"
                  class="w-full text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/60"
                  @click="exportData"
                >
                  Exporter mes données
                </Button>
                <Button
                  variant="outline"
                  class="w-full text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/60"
                  @click="deleteAccountOpen = true"
                >
                  Supprimer mon compte
                </Button>
              </div>
            </div>
          </section>

          <!-- ── Sécurité ───────────────────────────────────────────── -->
          <section v-if="activeSection === 'security'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Sécurité</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Gérez votre mot de passe et vos sessions.
              </p>
            </div>
            <div class="space-y-4">
              <!-- Mot de passe -->
              <div class="space-y-3">
                <div>
                  <Label class="mb-1.5 block text-sm"
                    >Mot de passe actuel</Label
                  >
                  <div class="relative max-w-xs">
                    <Input
                      v-model="passwordForm.current"
                      :type="showPasswords.current ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pr-10"
                    />
                    <button
                      class="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                      type="button"
                      @click="showPasswords.current = !showPasswords.current"
                    >
                      <Eye v-if="!showPasswords.current" class="h-4 w-4" />
                      <EyeOff v-else class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <Label class="mb-1.5 block text-sm"
                    >Nouveau mot de passe</Label
                  >
                  <div class="relative max-w-xs">
                    <Input
                      v-model="passwordForm.next"
                      :type="showPasswords.next ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pr-10"
                    />
                    <button
                      class="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                      type="button"
                      @click="showPasswords.next = !showPasswords.next"
                    >
                      <Eye v-if="!showPasswords.next" class="h-4 w-4" />
                      <EyeOff v-else class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <Label class="mb-1.5 block text-sm"
                    >Confirmer le mot de passe</Label
                  >
                  <div class="relative max-w-xs">
                    <Input
                      v-model="passwordForm.confirm"
                      :type="showPasswords.confirm ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pr-10"
                    />
                    <button
                      class="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                      type="button"
                      @click="showPasswords.confirm = !showPasswords.confirm"
                    >
                      <Eye v-if="!showPasswords.confirm" class="h-4 w-4" />
                      <EyeOff v-else class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <Button class="mt-1" @click="changePassword"
                  >Changer le mot de passe</Button
                >
              </div>

              <Separator />

              <!-- 2FA -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Authentification à deux facteurs</p>
                  <p class="text-xs text-muted-foreground">
                    Sécurisez votre compte avec un second facteur.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.twoFactorEnabled ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({
                      twoFactorEnabled: !prefs.twoFactorEnabled,
                    })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.twoFactorEnabled ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>

              <Separator />

              <!-- Sessions actives -->
              <div>
                <p class="text-sm font-medium mb-3">Sessions actives</p>
                <div class="space-y-2">
                  <div
                    v-for="session in mockSessions"
                    :key="session.id"
                    class="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div class="flex items-center gap-3">
                      <component
                        :is="session.icon"
                        class="h-4 w-4 text-muted-foreground shrink-0"
                      />
                      <div>
                        <p class="text-sm font-medium">{{ session.name }}</p>
                        <p class="text-xs text-muted-foreground">
                          {{ session.location }} · {{ session.lastActive }}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      class="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Révoquer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ── Accessibilité ──────────────────────────────────────── -->
          <section v-if="activeSection === 'accessibility'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Accessibilité</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Adaptez l'interface à vos besoins.
              </p>
            </div>
            <div class="space-y-4">
              <!-- Réduire animations -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Réduire les animations</p>
                  <p class="text-xs text-muted-foreground">
                    Désactive les transitions et effets animés.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.reducedMotion ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({ reducedMotion: !prefs.reducedMotion })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.reducedMotion ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
              <!-- Contraste élevé -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Contraste élevé</p>
                  <p class="text-xs text-muted-foreground">
                    Augmente le contraste des couleurs.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.highContrast ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({ highContrast: !prefs.highContrast })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.highContrast ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
              <!-- Taille de police -->
              <div>
                <Label class="text-sm font-medium mb-2 block"
                  >Taille de police</Label
                >
                <div class="flex gap-2">
                  <button
                    v-for="fs in fontSizes"
                    :key="fs.value"
                    class="px-4 py-2 rounded-md border text-sm font-medium transition-colors"
                    :class="
                      prefs.fontSize === fs.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    "
                    @click="updatePreferences({ fontSize: fs.value })"
                  >
                    {{ fs.label }}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-2 px-6 py-4 border-t bg-muted/30">
        <Button variant="outline" @click="$emit('update:open', false)"
          >Annuler</Button
        >
        <Button @click="save">Sauvegarder les paramètres</Button>
      </div>
    </DialogContent>
  </Dialog>

  <!-- AlertDialog suppression compte -->
  <AlertDialog
    :open="deleteAccountOpen"
    @update:open="deleteAccountOpen = $event"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Supprimer votre compte ?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible. Toutes vos données, projets et rendus
          seront définitivement supprimés.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="deleteAccountOpen = false"
          >Annuler</AlertDialogCancel
        >
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteAccount"
        >
          Supprimer définitivement
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, type Component } from 'vue'
import {
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
  Sun,
  Moon,
  Palette,
  Globe,
  Bell,
  Image,
  Lock,
  ShieldCheck,
  Accessibility,
} from 'lucide-vue-next'
import type {
  AppLanguage,
  RenderQuality,
  RenderFormat,
} from '~/composables/useUser'

// ─── Props / emits ────────────────────────────────────────────────────────────
defineProps<{ open: boolean }>()
defineEmits<{ 'update:open': [value: boolean] }>()

// ─── Composable ───────────────────────────────────────────────────────────────
const { preferences, updatePreferences } = useUser()
const colorMode = useColorMode()

const prefs = computed(() => preferences.value)

// ─── Navigation ───────────────────────────────────────────────────────────────
type SectionId =
  | 'appearance'
  | 'language'
  | 'notifications'
  | 'render'
  | 'privacy'
  | 'security'
  | 'accessibility'

const activeSection = ref<SectionId>('appearance')

const navItems: { id: SectionId; icon: Component; label: string }[] = [
  { id: 'appearance', icon: Palette, label: 'Apparence' },
  { id: 'language', icon: Globe, label: 'Langue' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'render', icon: Image, label: 'Qualité' },
  { id: 'privacy', icon: Lock, label: 'Confidentialité' },
  { id: 'security', icon: ShieldCheck, label: 'Sécurité' },
  { id: 'accessibility', icon: Accessibility, label: 'Accessibilité' },
]

// ─── Apparence ────────────────────────────────────────────────────────────────
const themes = [
  { value: 'light', icon: Sun, label: 'Clair' },
  { value: 'dark', icon: Moon, label: 'Sombre' },
  { value: 'system', icon: Monitor, label: 'Système' },
] as const

const setTheme = (value: 'light' | 'dark' | 'system') => {
  updatePreferences({ theme: value })
  colorMode.preference = value
}

// ─── Qualité de rendu ─────────────────────────────────────────────────────────
const formats: RenderFormat[] = ['png', 'jpg', 'webp']

const resolutions = [
  { value: '1024' as const, label: '1024 px' },
  { value: '2048' as const, label: '2048 px' },
  { value: '4096' as const, label: '4096 px' },
]

const fontSizes = [
  { value: 'small' as const, label: 'A petit' },
  { value: 'medium' as const, label: 'A moyen' },
  { value: 'large' as const, label: 'A grand' },
]

// ─── Notifications (tableau pour v-for) ───────────────────────────────────────
type PrefBoolKey =
  | 'notifEmailRender'
  | 'notifEmailNewsletter'
  | 'notifPushRender'
  | 'notifPushMentions'

const notifToggles: { key: PrefBoolKey; label: string }[] = [
  { key: 'notifEmailRender', label: 'Email — Rendu terminé' },
  { key: 'notifEmailNewsletter', label: 'Email — Newsletter' },
  { key: 'notifPushRender', label: 'Push — Rendu terminé' },
  { key: 'notifPushMentions', label: 'Push — Mentions' },
]

// ─── Mot de passe ─────────────────────────────────────────────────────────────
const passwordForm = reactive({ current: '', next: '', confirm: '' })
const showPasswords = reactive({ current: false, next: false, confirm: false })

const changePassword = () => {
  if (!passwordForm.current || !passwordForm.next) return
  if (passwordForm.next !== passwordForm.confirm) return
  // TODO: appel API
  passwordForm.current = ''
  passwordForm.next = ''
  passwordForm.confirm = ''
}

// ─── Sessions mockées ─────────────────────────────────────────────────────────
const mockSessions = [
  {
    id: 1,
    name: 'Chrome — Windows',
    location: 'Paris, France',
    lastActive: 'Il y a 2 minutes (session actuelle)',
    icon: Monitor,
  },
  {
    id: 2,
    name: 'Safari — iPhone',
    location: 'Paris, France',
    lastActive: 'Il y a 3 jours',
    icon: Smartphone,
  },
]

// ─── Confidentialité ──────────────────────────────────────────────────────────
const deleteAccountOpen = ref(false)

const exportData = () => {
  // TODO: appel API export
}

const deleteAccount = () => {
  deleteAccountOpen.value = false
  // TODO: appel API suppression
}

// ─── Sauvegarde ───────────────────────────────────────────────────────────────
const save = () => {
  // Préférences déjà réactives — mise à jour en temps réel.
  // TODO: persister en base ou localStorage
}
</script>
