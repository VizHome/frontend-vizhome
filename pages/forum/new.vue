<template>
  <div class="min-h-[60vh] px-6 py-10">
    <div class="max-w-2xl mx-auto">
      <nav class="text-sm mb-6 flex items-center gap-2 text-muted-foreground">
        <NuxtLink to="/forum" class="hover:text-foreground transition-colors">
          Forum
        </NuxtLink>
        <ChevronRightIcon class="h-3.5 w-3.5" />
        <span class="text-foreground">Nouveau sujet</span>
      </nav>

      <h1 class="text-2xl font-bold mb-2">Créer un nouveau sujet</h1>
      <p class="text-sm text-muted-foreground mb-6">
        Choisis une catégorie, donne un titre clair et expose ton sujet en détail.
      </p>

      <form class="space-y-5" @submit.prevent="onSubmit">
        <!-- Catégorie -->
        <div class="space-y-2">
          <Label for="cat">Catégorie</Label>
          <Select v-model="selectedCategory">
            <SelectTrigger id="cat" class="w-full">
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="cat in writableCategories"
                :key="cat.id"
                :value="String(cat.id)"
              >
                {{ cat.name }}
              </SelectItem>
            </SelectContent>
          </Select>
          <p
            v-if="hasAdminOnlyCategories && !isStaff"
            class="text-xs text-muted-foreground"
          >
            Note : la catégorie « Annonces » est réservée au staff.
          </p>
        </div>

        <!-- Titre -->
        <div class="space-y-2">
          <Label for="title">Titre</Label>
          <Input
            id="title"
            v-model="title"
            type="text"
            placeholder="Ex: Comment importer un fichier .glb ?"
            maxlength="200"
            :class="{ 'ring-1 ring-destructive': errors.title }"
          />
          <div class="flex justify-between text-xs">
            <span class="text-destructive">{{ errors.title }}</span>
            <span class="text-muted-foreground">{{ title.length }} / 200</span>
          </div>
        </div>

        <!-- Contenu (éditeur WYSIWYG) -->
        <div class="space-y-2">
          <Label>Contenu</Label>
          <ForumEditor
            v-model="content"
            placeholder="Expose ton sujet en détail. Si c'est une question, précise ce que tu as déjà essayé."
            min-height="240px"
            :class="{ 'ring-1 ring-destructive': errors.content }"
          />
          <div class="flex items-center justify-between text-xs">
            <span class="text-destructive">{{ errors.content }}</span>
            <span class="text-muted-foreground">
              Markdown, listes, images, alignement et émojis natifs supportés.
            </span>
          </div>
        </div>

        <!-- Erreur globale -->
        <div
          v-if="submitError"
          class="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-2 text-sm text-destructive"
        >
          {{ submitError }}
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            as-child
          >
            <NuxtLink :to="defaultCategorySlug ? `/forum/${defaultCategorySlug}` : '/forum'">
              Annuler
            </NuxtLink>
          </Button>
          <Button
            type="submit"
            :disabled="!canSubmit"
            class="rounded-full gap-1.5"
          >
            <SendIcon class="h-3.5 w-3.5" />
            {{ isSubmitting ? 'Publication…' : 'Publier le sujet' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon, SendIcon } from 'lucide-vue-next'
import { computed, reactive, ref } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'forum',
  middleware: 'auth', // requiert connexion
  // ssr: false → TipTap browser-only + évite mismatches d'hydratation.
  ssr: false,
})

useHead({ title: 'Nouveau sujet — Forum VizHome' })

const route = useRoute()
const router = useRouter()

const forum = useForum()
const user = useUser()
const isStaff = computed(() => !!user.user.value?.isStaff)

// Charge cats si pas déjà en cache
if (forum.categories.value.length === 0) {
  await forum.loadCategories()
}

// Catégories où le user a le droit de poster (filtre is_admin_only si non-staff)
const writableCategories = computed(() =>
  forum.categories.value.filter(c => !c.is_admin_only || isStaff.value)
)
const hasAdminOnlyCategories = computed(() =>
  forum.categories.value.some(c => c.is_admin_only)
)

// Pré-sélection depuis ?category=<slug> (ex: clic sur "Nouveau sujet" dans une cat)
const defaultCategorySlug = computed(() => route.query.category as string | undefined)
const defaultCategory = computed(() => {
  if (!defaultCategorySlug.value) return null
  const c = writableCategories.value.find(c => c.slug === defaultCategorySlug.value)
  return c ?? null
})

const selectedCategory = ref<string>(defaultCategory.value?.id?.toString() ?? '')
const title = ref('')
const content = ref('')

const errors = reactive({ title: '', content: '' })
const submitError = ref<string | null>(null)
const isSubmitting = ref(false)

const canSubmit = computed(
  () =>
    !isSubmitting.value &&
    selectedCategory.value &&
    title.value.trim().length >= 5 &&
    plainTextLength(content.value) >= 10
)

/** Compte les caractères du contenu HTML en enlevant les tags TipTap. */
function plainTextLength(html: string): number {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
    .length
}

function validate(): boolean {
  errors.title = ''
  errors.content = ''
  if (title.value.trim().length < 5) {
    errors.title = '5 caractères minimum.'
  }
  if (plainTextLength(content.value) < 10) {
    errors.content = '10 caractères minimum (hors mise en forme).'
  }
  return !errors.title && !errors.content
}

async function onSubmit() {
  if (!validate() || isSubmitting.value) return
  submitError.value = null
  isSubmitting.value = true
  try {
    const topic = await forum.createTopic({
      category: Number(selectedCategory.value),
      title: title.value.trim(),
      content: content.value.trim(),
    })
    toast.success('Sujet créé.')
    await router.push(`/forum/topic/${topic.id}`)
  } catch (e: unknown) {
    const err = e as {
      data?: {
        detail?: string
        code?: string
        title?: string[]
        content?: string[]
      }
    }
    const data = err?.data
    if (data?.code === 'category_locked') {
      submitError.value = data.detail || 'Catégorie réservée au staff.'
    } else if (data?.title?.[0]) {
      errors.title = data.title[0]
    } else if (data?.content?.[0]) {
      errors.content = data.content[0]
    } else {
      submitError.value = data?.detail || 'Impossible de créer le sujet.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
