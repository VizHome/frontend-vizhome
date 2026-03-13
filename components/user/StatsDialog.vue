<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <BarChart2 class="h-5 w-5 text-primary" />
          Statistiques d'utilisation
        </DialogTitle>
        <DialogDescription>
          Aperçu de votre activité sur VizHome ce mois-ci.
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-4 py-2">
        <!-- Cartes stats -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Rendus ce mois -->
          <div class="rounded-xl border bg-muted/40 p-4 flex flex-col gap-2">
            <div class="flex items-center gap-2 text-muted-foreground">
              <Sparkles class="h-4 w-4" />
              <span class="text-xs font-medium">Rendus ce mois</span>
            </div>
            <p class="text-2xl font-bold tabular-nums">
              {{ stats.rendersThisMonth }}
              <span class="text-sm font-normal text-muted-foreground"
                >/ {{ stats.rendersLimit }}</span
              >
            </p>
            <div class="h-1.5 w-full rounded-full bg-border overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="
                  rendersPercent >= 90
                    ? 'bg-destructive'
                    : rendersPercent >= 70
                      ? 'bg-amber-500'
                      : 'bg-primary'
                "
                :style="{ width: `${rendersPercent}%` }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              {{ rendersPercent }}% utilisé
            </p>
          </div>

          <!-- Projets -->
          <div class="rounded-xl border bg-muted/40 p-4 flex flex-col gap-2">
            <div class="flex items-center gap-2 text-muted-foreground">
              <FolderOpen class="h-4 w-4" />
              <span class="text-xs font-medium">Projets totaux</span>
            </div>
            <p class="text-2xl font-bold tabular-nums">
              {{ stats.totalProjects }}
            </p>
            <p class="text-xs text-muted-foreground mt-auto">
              Tous vos projets sauvegardés
            </p>
          </div>
        </div>

        <!-- Stockage -->
        <div class="rounded-xl border bg-muted/40 p-4 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-muted-foreground">
              <HardDrive class="h-4 w-4" />
              <span class="text-xs font-medium">Stockage</span>
            </div>
            <span class="text-xs font-mono font-medium">
              {{ stats.storageUsedGb.toFixed(1) }} Go /
              {{ stats.storageLimitGb }} Go
            </span>
          </div>
          <div class="h-2 w-full rounded-full bg-border overflow-hidden">
            <div
              class="h-full rounded-full transition-all"
              :class="
                storagePercent >= 90
                  ? 'bg-destructive'
                  : storagePercent >= 70
                    ? 'bg-amber-500'
                    : 'bg-primary'
              "
              :style="{ width: `${storagePercent}%` }"
            />
          </div>
          <p class="text-xs text-muted-foreground">
            {{ storagePercent }}% utilisé &mdash;
            {{ (stats.storageLimitGb - stats.storageUsedGb).toFixed(1) }} Go
            restants
          </p>
        </div>

        <!-- Membre depuis -->
        <div
          class="rounded-xl border bg-muted/40 px-4 py-3 flex items-center gap-3"
        >
          <CalendarDays class="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p class="text-xs text-muted-foreground">Membre depuis</p>
            <p class="text-sm font-medium">{{ formattedJoinDate }}</p>
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
import { computed } from 'vue'
import {
  BarChart2,
  CalendarDays,
  FolderOpen,
  HardDrive,
  Sparkles,
} from 'lucide-vue-next'

const open = defineModel<boolean>('open', { default: false })

const { user, stats, storagePercent, rendersPercent } = useUser()

const formattedJoinDate = computed(() => {
  return new Date(user.value.joinedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>
