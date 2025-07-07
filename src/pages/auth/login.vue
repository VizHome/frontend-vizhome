<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Section visuelle à gauche (visible uniquement sur desktop) -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/80 to-primary-foreground relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-10"></div>
      <div class="relative z-10 flex flex-col justify-center items-center px-12 text-white">
        <div class="max-w-md mx-auto text-center">
          <h1 class="text-4xl font-bold mb-6">Bienvenue sur VizHome</h1>
          <p class="text-xl mb-8">Transformez vos photos en 3D</p>
        </div>
      </div>
    </div>

    <!-- Formulaire de connexion à droite -->
    <div class="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-background">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block">
            <span
              class="font-bold text-3xl bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">Viz<span
                class="text-primary">Home</span></span>
          </NuxtLink>
          <h2 class="text-2xl font-bold mt-6 mb-2">Connexion</h2>
          <p class="text-muted-foreground">Accédez à votre espace personnel</p>
        </div>

        <div class="space-y-6">
          <!-- Boutons de connexion sociale -->
          <div class="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" class="gap-2 h-11">
              <span>Google</span>
            </Button>
            <Button variant="outline" type="button" class="gap-2 h-11">
              <span>GitHub</span>
            </Button>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                Ou avec votre email
              </span>
            </div>
          </div>

          <Card class="shadow-xl">
            <CardContent class="pt-6">
              <form class="space-y-5" @submit.prevent="handleSubmit">
                <div class="space-y-2">
                  <Label for="email" class="text-sm font-medium">Email</Label>
                  <div class="relative">
                    <MailIcon
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" v-model="email" type="email" placeholder="votreemail@exemple.fr" class="pl-10"
                      :class="{ 'ring-1 ring-destructive': formErrors.email }" />
                  </div>
                  <p v-if="formErrors.email" class="text-xs text-destructive mt-1">{{ formErrors.email }}</p>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <Label for="password" class="text-sm font-medium">Mot de passe</Label>
                    <Button variant="link" class="p-0 h-auto text-xs" as-child>
                      <NuxtLink :to="{ path: '/auth/forgot-password' }">
                        Mot de passe oublié?
                      </NuxtLink>
                    </Button>
                  </div>
                  <div class="relative">
                    <LockIcon
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••" class="pl-10"
                      :class="{ 'ring-1 ring-destructive': formErrors.password }" />
                    <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2"
                      @click="showPassword = !showPassword">
                      <EyeIcon v-if="!showPassword" class="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      <EyeOffIcon v-else class="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                  <p v-if="formErrors.password" class="text-xs text-destructive mt-1">{{ formErrors.password }}</p>
                </div>

                <div class="flex items-center space-x-2">
                  <Checkbox id="remember" v-model:checked="rememberMe" />
                  <label for="remember" class="text-sm font-medium leading-none cursor-pointer">
                    Se souvenir de moi
                  </label>
                </div>

                <Button type="submit" class="w-full h-11">Se connecter</Button>
              </form>
            </CardContent>
          </Card>

          <div class="text-center text-sm">
            <span class="text-muted-foreground">Vous n'avez pas de compte?</span>
            <NuxtLink to="/auth/register" class="text-primary hover:underline ml-1 font-medium">
              Créer un compte
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { GithubIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'

// État du formulaire
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// Gestion des erreurs
const formErrors = reactive({
  email: '',
  password: ''
})

// Validation
const validateForm = () => {
  let isValid = true
  formErrors.email = ''
  formErrors.password = ''

  // Validation de l'email
  if (!email.value) {
    formErrors.email = 'L\'email est requis'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    formErrors.email = 'Format d\'email invalide'
    isValid = false
  }

  // Validation du mot de passe
  if (!password.value) {
    formErrors.password = 'Le mot de passe est requis'
    isValid = false
  }

  return isValid
}

// Fonction de soumission du formulaire
const handleSubmit = () => {
  if (!validateForm()) return

  console.log('Login attempt:', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  })

  // Ici vous implémenteriez la logique d'authentification
}

definePageMeta({
  layout: 'none',
})
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>