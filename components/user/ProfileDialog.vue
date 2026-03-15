<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <UserIcon class="h-5 w-5 text-primary" />
          Modifier le profil
        </DialogTitle>
        <DialogDescription>
          Mettez à jour vos informations personnelles.
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-5 py-2">
        <!-- Avatar -->
        <div class="flex flex-col items-center gap-3">
          <div class="relative">
            <Avatar class="h-20 w-20">
              <AvatarImage :src="form.avatarUrl" :alt="form.name" />
              <AvatarFallback class="text-lg">{{ initials }}</AvatarFallback>
            </Avatar>
            <button
              class="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition hover:bg-primary/90"
              title="Changer l'avatar"
              @click="triggerAvatarInput"
            >
              <Camera class="h-3.5 w-3.5" />
            </button>
            <input
              ref="avatarInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleAvatarFile"
            />
          </div>
          <p class="text-xs text-muted-foreground">JPG, PNG — max 2 Mo</p>
        </div>

        <!-- Nom -->
        <div class="flex flex-col gap-1.5">
          <Label for="profile-name">Nom complet</Label>
          <Input
            id="profile-name"
            v-model="form.name"
            placeholder="Jean Dupont"
            :class="{ 'ring-1 ring-destructive': errors.name }"
          />
          <p v-if="errors.name" class="text-xs text-destructive">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1.5">
          <Label for="profile-email">Adresse email</Label>
          <Input
            id="profile-email"
            v-model="form.email"
            type="email"
            placeholder="jean@exemple.fr"
            :class="{ 'ring-1 ring-destructive': errors.email }"
          />
          <p v-if="errors.email" class="text-xs text-destructive">
            {{ errors.email }}
          </p>
        </div>

        <!-- URL avatar manuel -->
        <div class="flex flex-col gap-1.5">
          <Label for="profile-avatar-url"
            >URL de l'avatar
            <span class="text-muted-foreground">(optionnel)</span></Label
          >
          <Input
            id="profile-avatar-url"
            v-model="form.avatarUrl"
            placeholder="https://..."
          />
        </div>
      </div>

      <DialogFooter class="gap-2">
        <Transition
          enter-active-class="transition-opacity duration-200"
          leave-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <span
            v-if="saveSuccess"
            class="flex items-center gap-1.5 text-xs text-green-600 mr-auto"
          >
            <CheckCircle2 class="h-3.5 w-3.5" />
            Profil mis à jour !
          </span>
        </Transition>
        <Button
          variant="ghost"
          :disabled="isSaving || saveSuccess"
          @click="open = false"
          >Annuler</Button
        >
        <Button :disabled="isSaving || saveSuccess" @click="save">
          <CheckCircle2
            v-if="saveSuccess"
            class="h-4 w-4 mr-2 text-green-500"
          />
          <Loader2 v-else-if="isSaving" class="h-4 w-4 mr-2 animate-spin" />
          {{ saveSuccess ? 'Enregistré !' : 'Sauvegarder' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Camera, CheckCircle2, Loader2, UserIcon } from 'lucide-vue-next'

const open = defineModel<boolean>('open', { default: false })

const { user, initials, updateProfile } = useUser()

// ─── Formulaire local ────────────────────────────────────────────────────────
const form = ref({
  name: user.value.name,
  email: user.value.email,
  avatarUrl: user.value.avatarUrl,
})

const errors = ref({ name: '', email: '' })
const isSaving = ref(false)
const saveSuccess = ref(false)
const avatarInputRef = ref<HTMLInputElement>()

// Sync form quand le dialog s'ouvre
watch(open, val => {
  if (val) {
    form.value = {
      name: user.value.name,
      email: user.value.email,
      avatarUrl: user.value.avatarUrl,
    }
    errors.value = { name: '', email: '' }
    saveSuccess.value = false
  }
})

const triggerAvatarInput = () => avatarInputRef.value?.click()

const handleAvatarFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    form.value.avatarUrl = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

const validate = () => {
  errors.value = { name: '', email: '' }
  let ok = true
  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis'
    ok = false
  }
  if (!form.value.email.trim() || !/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Email invalide'
    ok = false
  }
  return ok
}

const save = async () => {
  if (!validate()) return
  isSaving.value = true
  // Simule un appel API
  await new Promise(r => setTimeout(r, 600))
  updateProfile({
    name: form.value.name,
    email: form.value.email,
    avatarUrl: form.value.avatarUrl,
  })
  isSaving.value = false
  saveSuccess.value = true
  setTimeout(() => {
    open.value = false
  }, 1200)
}
</script>
