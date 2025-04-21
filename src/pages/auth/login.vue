<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block mb-4">
          <span class="font-bold text-2xl">Viz<span class="text-primary">Home</span></span>
        </NuxtLink>
        <h2 class="text-2xl font-bold tracking-tight">Bienvenue</h2>
        <p class="text-muted-foreground mt-2">Connectez-vous à votre compte</p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model="email" type="email" placeholder="nom@exemple.fr" />
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label for="password">Mot de passe</Label>
                <NuxtLink to="/auth/forgot-password" class="text-sm text-primary hover:underline">
                  Mot de passe oublié?
                </NuxtLink>
              </div>
              <Input id="password" v-model="password" type="password" placeholder="••••••••" />
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="remember" v-model:checked="rememberMe" />
              <label for="remember" class="text-sm font-medium leading-none cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            <Button type="submit" class="w-full">Se connecter</Button>
          </form>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"/>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" class="gap-2">
              <Icon name="devicon:google" class="h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" type="button" class="gap-2">
              <GithubIcon class="h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>

      <div class="text-center text-sm">
        <span class="text-muted-foreground">Vous n'avez pas de compte?</span>
        <span class="text-muted-foreground"> | </span>
        <NuxtLink to="/auth/register" class="text-primary hover:underline">
          Créer un compte
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { GithubIcon } from 'lucide-vue-next'

// État du formulaire
const email = ref('')
const password = ref('')
const rememberMe = ref(false)



// Fonction de soumission du formulaire
const handleSubmit = () => {
  console.log('Login attempt:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
  // Ici vous implémenteriez la logique d'authentification
}
definePageMeta({
  layout: 'none',
})

</script>

<style scoped></style>