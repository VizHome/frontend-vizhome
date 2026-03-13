<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <HelpCircle class="h-5 w-5 text-primary" />
          Aide & Informations
        </DialogTitle>
      </DialogHeader>

      <!-- Tabs navigation -->
      <div class="flex gap-1 rounded-lg bg-muted p-1">
        <button
          v-for="tab in TABS"
          :key="tab.id"
          :class="[
            'flex-1 flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
            activeTab === tab.id
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="activeTab = tab.id"
        >
          <component :is="tab.icon" class="h-3.5 w-3.5" />
          {{ tab.label }}
        </button>
      </div>

      <!-- ── Centre d'aide ─────────────────────────────────────────────── -->
      <div v-if="activeTab === 'help'" class="flex flex-col gap-3 py-1">
        <p class="text-sm text-muted-foreground">
          Consultez notre documentation complète pour tirer le meilleur parti de
          VizHome.
        </p>
        <div class="flex flex-col gap-2">
          <a
            v-for="item in HELP_LINKS"
            :key="item.href"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3 text-sm font-medium transition-colors hover:bg-accent group"
          >
            <component
              :is="item.icon"
              class="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0"
            />
            <span class="flex-1">{{ item.label }}</span>
            <ExternalLink
              class="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground"
            />
          </a>
        </div>
      </div>

      <!-- ── Notes de version ──────────────────────────────────────────── -->
      <div
        v-else-if="activeTab === 'changelog'"
        class="flex flex-col gap-3 py-1 max-h-72 overflow-y-auto pr-1"
      >
        <div
          v-for="release in CHANGELOG"
          :key="release.version"
          class="flex flex-col gap-1.5"
        >
          <div class="flex items-center gap-2">
            <span class="text-sm font-semibold">v{{ release.version }}</span>
            <span class="text-xs text-muted-foreground">{{
              release.date
            }}</span>
            <span
              v-if="release.badge"
              class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >{{ release.badge }}</span
            >
          </div>
          <ul class="flex flex-col gap-1 pl-4">
            <li
              v-for="note in release.notes"
              :key="note"
              class="text-xs text-muted-foreground list-disc"
            >
              {{ note }}
            </li>
          </ul>
        </div>
      </div>

      <!-- ── Politique de confidentialité ─────────────────────────────── -->
      <div v-else-if="activeTab === 'legal'" class="flex flex-col gap-2 py-1">
        <p class="text-sm text-muted-foreground">
          Documents légaux relatifs à votre utilisation de VizHome.
        </p>
        <div class="flex flex-col gap-2">
          <NuxtLink
            v-for="doc in LEGAL_DOCS"
            :key="doc.to"
            :to="doc.to"
            class="flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3 text-sm font-medium transition-colors hover:bg-accent group"
            @click="open = false"
          >
            <component
              :is="doc.icon"
              class="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0"
            />
            <span class="flex-1">{{ doc.label }}</span>
            <ChevronRight
              class="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- ── Signaler un bug ───────────────────────────────────────────── -->
      <div v-else-if="activeTab === 'bug'" class="flex flex-col gap-3 py-1">
        <div
          v-if="bugSent"
          class="flex flex-col items-center gap-3 py-6 text-center"
        >
          <CheckCircle2 class="h-10 w-10 text-green-500" />
          <p class="font-medium">Rapport envoyé, merci !</p>
          <p class="text-xs text-muted-foreground">
            Notre équipe examine votre signalement.
          </p>
          <Button variant="ghost" size="sm" @click="resetBug"
            >Envoyer un autre rapport</Button
          >
        </div>
        <template v-else>
          <div class="flex flex-col gap-1.5">
            <Label for="bug-subject">Sujet</Label>
            <Input
              id="bug-subject"
              v-model="bugForm.subject"
              placeholder="Ex: Le rendu IA ne s'affiche pas"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <Label for="bug-desc">Description</Label>
            <textarea
              id="bug-desc"
              v-model="bugForm.description"
              rows="4"
              placeholder="Décrivez le problème, les étapes pour le reproduire..."
              class="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <Button
            :disabled="
              !bugForm.subject.trim() ||
              !bugForm.description.trim() ||
              isSendingBug
            "
            @click="sendBug"
          >
            <Loader2 v-if="isSendingBug" class="h-4 w-4 mr-2 animate-spin" />
            <Bug v-else class="h-4 w-4 mr-2" />
            Envoyer le rapport
          </Button>
        </template>
      </div>

      <!-- ── Raccourcis clavier ────────────────────────────────────────── -->
      <div
        v-else-if="activeTab === 'shortcuts'"
        class="py-1 max-h-72 overflow-y-auto pr-1"
      >
        <div
          v-for="section in SHORTCUTS"
          :key="section.title"
          class="mb-4 last:mb-0"
        >
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2"
          >
            {{ section.title }}
          </p>
          <div class="flex flex-col gap-1">
            <div
              v-for="shortcut in section.items"
              :key="shortcut.action"
              class="flex items-center justify-between rounded-lg px-3 py-2 text-sm even:bg-muted/30"
            >
              <span class="text-muted-foreground">{{ shortcut.action }}</span>
              <div class="flex items-center gap-1">
                <kbd
                  v-for="key in shortcut.keys"
                  :key="key"
                  class="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground"
                  >{{ key }}</kbd
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="ghost" @click="open = false">Fermer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  Bug,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  HelpCircle,
  Keyboard,
  Loader2,
  BookOpen,
  ScrollText,
  Shield,
  Tag,
} from 'lucide-vue-next'

const open = defineModel<boolean>('open', { default: false })

type TabId = 'help' | 'changelog' | 'legal' | 'bug' | 'shortcuts'

const props = defineProps<{ initialTab?: TabId }>()

const activeTab = ref<TabId>(props.initialTab ?? 'help')

// Sync l'onglet actif quand le dialog s'ouvre ou que initialTab change
watch(open, val => {
  if (val) activeTab.value = props.initialTab ?? 'help'
})

const TABS: { id: TabId; label: string; icon: unknown }[] = [
  { id: 'help', label: 'Aide', icon: HelpCircle },
  { id: 'changelog', label: 'Versions', icon: Tag },
  { id: 'legal', label: 'Légal', icon: Shield },
  { id: 'bug', label: 'Bug', icon: Bug },
  { id: 'shortcuts', label: 'Raccourcis', icon: Keyboard },
]

const HELP_LINKS = [
  { label: 'Documentation complète', href: '/docs', icon: BookOpen },
  { label: 'Tutoriels vidéo', href: '#', icon: FileText },
  { label: 'Forum communautaire', href: '#', icon: HelpCircle },
  { label: 'Contacter le support', href: '/contact', icon: ScrollText },
]

const CHANGELOG = [
  {
    version: '2.4.0',
    date: 'Mars 2026',
    badge: 'Actuelle',
    notes: [
      'Mode Croquis 2D avec export PNG et rendu IA img2img',
      'Panneau ThreeControls : éclairage, navigation, modèles, vue',
      'Sol réfléchissant PCFSoft sur la scène 3D',
    ],
  },
  {
    version: '2.3.0',
    date: 'Février 2026',
    badge: null,
    notes: [
      'Mode Prompt IA : génération 2D et 3D',
      'Import de modèles GLB / GLTF / OBJ / FBX',
      'Visite guidée automatique (tour 360°)',
    ],
  },
  {
    version: '2.2.0',
    date: 'Janvier 2026',
    badge: null,
    notes: [
      "Presets d'éclairage (Matin, Midi, Coucher, Nuit, Studio)",
      'Saisons avec ambiance colorée',
      'Navigation first-person WASD',
    ],
  },
]

const LEGAL_DOCS = [
  {
    label: 'Politique de confidentialité',
    to: '/legal/privacy-policy',
    icon: Shield,
  },
  {
    label: "Conditions d'utilisation",
    to: '/legal/terms-of-use',
    icon: ScrollText,
  },
  { label: 'Politique de cookies', to: '/legal/cookie-policy', icon: FileText },
  {
    label: "Politique d'utilisation",
    to: '/legal/responsible-use-policy',
    icon: FileText,
  },
]

const SHORTCUTS = [
  {
    title: 'Croquis 2D',
    items: [
      { action: 'Annuler', keys: ['Ctrl', 'Z'] },
      { action: 'Rétablir', keys: ['Ctrl', 'Y'] },
      { action: 'Exporter PNG', keys: ['Ctrl', 'S'] },
    ],
  },
  {
    title: 'Prompt IA',
    items: [{ action: 'Générer le rendu', keys: ['Entrée'] }],
  },
  {
    title: 'Mode 3D',
    items: [
      { action: 'Réinitialiser la caméra', keys: ['R'] },
      { action: 'Plein écran', keys: ['F'] },
      { action: 'Orbite', keys: ['1'] },
      { action: 'Marche à pied', keys: ['2'] },
      { action: 'Vue plan', keys: ['3'] },
      { action: 'Visite guidée', keys: ['4'] },
    ],
  },
  {
    title: 'Global',
    items: [{ action: 'Fermer panel / overlay', keys: ['Esc'] }],
  },
]

// ── Bug report ───────────────────────────────────────────────────────────────
const bugForm = ref({ subject: '', description: '' })
const isSendingBug = ref(false)
const bugSent = ref(false)

const sendBug = async () => {
  if (!bugForm.value.subject.trim() || !bugForm.value.description.trim()) return
  isSendingBug.value = true
  // TODO: appel API réel
  await new Promise(r => setTimeout(r, 800))
  isSendingBug.value = false
  bugSent.value = true
}

const resetBug = () => {
  bugForm.value = { subject: '', description: '' }
  bugSent.value = false
}
</script>
