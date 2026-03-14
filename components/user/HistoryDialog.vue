<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <History class="h-5 w-5 text-primary" />
          Historique des prompts
        </DialogTitle>
        <DialogDescription>
          Vos {{ promptHistory.length }} derniers rendus générés par prompt.
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-3 py-2 max-h-[60vh] overflow-y-auto pr-1">
        <!-- État vide -->
        <div
          v-if="promptHistory.length === 0"
          class="flex flex-col items-center justify-center gap-3 py-10 text-muted-foreground"
        >
          <ImageIcon class="h-10 w-10 opacity-30" />
          <p class="text-sm">Aucun prompt dans l'historique</p>
        </div>

        <!-- Liste des entrées -->
        <div
          v-for="entry in promptHistory"
          :key="entry.createdAt"
          class="group flex gap-3 rounded-xl border bg-muted/30 p-3 hover:bg-accent/50 transition-colors cursor-pointer"
          @click="handleLoad(entry)"
        >
          <!-- Miniature -->
          <div
            class="h-14 w-20 rounded-lg border bg-muted shrink-0 overflow-hidden"
          >
            <img
              v-if="entry.imageUrl"
              :src="entry.imageUrl"
              alt="Aperçu"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <ImageIcon class="h-5 w-5 text-muted-foreground/40" />
            </div>
          </div>

          <!-- Infos -->
          <div class="flex-1 min-w-0 flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-semibold rounded-full px-1.5 py-0.5 leading-none"
                :class="
                  entry.outputType === '2d'
                    ? 'bg-primary/15 text-primary'
                    : 'bg-amber-500/15 text-amber-600'
                "
              >
                {{ entry.outputType.toUpperCase() }}
              </span>
              <span class="text-[10px] text-muted-foreground ml-auto shrink-0">
                {{ formatDate(entry.createdAt) }}
              </span>
            </div>
            <p class="text-xs font-medium leading-snug line-clamp-2">
              {{ entry.prompt }}
            </p>
          </div>

          <!-- Bouton supprimer (visible au hover) -->
          <button
            class="shrink-0 h-6 w-6 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-all"
            title="Supprimer cette entrée"
            @click.stop="removeHistoryEntry(entry.createdAt)"
          >
            <Trash2 class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <DialogFooter class="flex-col sm:flex-row gap-2 sm:items-center">
        <!-- Supprimer tout avec confirmation -->
        <AlertDialog v-if="promptHistory.length > 0">
          <AlertDialogTrigger as-child>
            <button
              class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors mr-auto"
            >
              <Trash2 class="h-3.5 w-3.5" />
              Tout effacer
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Effacer tout l'historique ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action supprimera définitivement les
                {{ promptHistory.length }} entrées de l'historique. Elle est
                irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                @click="handleClearAll"
              >
                Tout effacer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="ghost" @click="open = false">Fermer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { History, ImageIcon, Trash2 } from 'lucide-vue-next'

const open = defineModel<boolean>('open', { default: false })

const { promptHistory, loadFromHistory, removeHistoryEntry, clearHistory } =
  useAiRender()

const formatDate = (ts: number) => {
  return new Date(ts).toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const handleLoad = (entry: Parameters<typeof loadFromHistory>[0]) => {
  loadFromHistory(entry)
  open.value = false
}

const handleClearAll = () => {
  clearHistory()
}
</script>
