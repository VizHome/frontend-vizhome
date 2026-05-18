<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Section visuelle à gauche (visible uniquement sur desktop) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="relative grid w-full place-content-center overflow-hidden">
        <p
          class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
        >
          Réinitialisez votre mot de passe
        </p>
        <InteractiveGridPattern
          class="[mask-image:radial-gradient(550px_circle_at_center,white,transparent)] inset-0 h-[300%] skew-y-12"
        />
      </div>
    </div>

    <!-- Formulaire à droite -->
    <div
      class="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-background"
    >
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block">
            <AppLogo />
          </NuxtLink>
          <h2 class="text-2xl font-bold mt-6 mb-2">Mot de passe oublié</h2>
          <p class="text-muted-foreground">
            Saisissez votre adresse e-mail pour recevoir un lien de
            réinitialisation.
          </p>
        </div>

        <div v-if="!submitted" class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Adresse e-mail</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="vous@exemple.fr"
              :class="{ 'ring-1 ring-destructive': emailError }"
              @blur="validateEmail"
            />
            <p v-if="emailError" class="text-xs text-destructive mt-1">
              {{ emailError }}
            </p>
          </div>

          <Button class="w-full" :disabled="loading" @click="handleSubmit">
            <span v-if="loading">Envoi en cours…</span>
            <span v-else>Envoyer le lien</span>
          </Button>
        </div>

        <div v-else class="text-center space-y-4">
          <p class="text-sm text-muted-foreground">
            Si un compte est associé à <strong>{{ email }}</strong
            >, vous recevrez un e-mail avec les instructions de
            réinitialisation.
          </p>
          <Button variant="outline" class="w-full" @click="reset">
            Réessayer avec une autre adresse
          </Button>
        </div>

        <p class="text-center text-sm text-muted-foreground mt-6">
          <NuxtLink
            to="/auth/login"
            class="font-medium underline underline-offset-4 hover:text-primary"
          >
            Retour à la connexion
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'none', middleware: 'guest' })

const auth = useAuth()

const email = ref('')
const emailError = ref('')
const loading = ref(false)
const submitted = ref(false)

function validateEmail() {
  if (!email.value) {
    emailError.value = "L'adresse e-mail est requise."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = "L'adresse e-mail n'est pas valide."
  } else {
    emailError.value = ''
  }
}

async function handleSubmit() {
  validateEmail()
  if (emailError.value) return

  loading.value = true
  try {
    await auth.forgotPassword(email.value.trim().toLowerCase())
    submitted.value = true
  } catch (e: unknown) {
    // Le backend renvoie 204 même si l'email n'existe pas (anti-énumération).
    // Une erreur ici signifie probablement un throttle (429) ou un souci réseau.
    const err = e as { statusCode?: number; data?: { detail?: string } }
    if (err?.statusCode === 429) {
      emailError.value = err.data?.detail || 'Trop de demandes. Réessayez plus tard.'
    } else {
      emailError.value = "Erreur réseau, réessayez."
    }
  } finally {
    loading.value = false
  }
}

function reset() {
  email.value = ''
  emailError.value = ''
  submitted.value = false
}
</script>
