<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block mb-4">
          <span class="font-bold text-2xl">Viz<span class="text-primary">Home</span></span>
        </NuxtLink>
        <h2 class="text-2xl font-bold tracking-tight">Créer un compte</h2>
        <p class="text-muted-foreground mt-2">Inscrivez-vous pour commencer à utiliser VizHome</p>
      </div>

      <Card>
        <CardContent class="pt-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Jean" v-model="firstName" />
              </div>
              <div class="space-y-2">
                <Label for="lastName">Nom</Label>
                <Input id="lastName" placeholder="Dupont" v-model="lastName" />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="nom@exemple.fr" v-model="email" />
            </div>

            <div class="space-y-2">
              <Label for="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="••••••••" v-model="password" />
              <p class="text-xs text-muted-foreground">
                Au moins 8 caractères incluant une majuscule, un chiffre et un caractère spécial
              </p>
            </div>

            <div class="space-y-2">
              <Label for="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" v-model="confirmPassword" />
            </div>

            <div class="space-y-4">
              <div class="flex items-start space-x-2">
                <Checkbox id="terms" v-model:checked="acceptTerms" />
                <label for="terms" class="text-sm leading-tight cursor-pointer">
                  J'accepte les <NuxtLink to="/legal/terms-of-use" class="text-primary hover:underline">conditions
                    d'utilisation</NuxtLink> et la <NuxtLink to="/legal/privacy-policy"
                    class="text-primary hover:underline">politique de confidentialité</NuxtLink>
                </label>
              </div>

              <div class="flex items-start space-x-2">
                <Checkbox id="newsletter" v-model:checked="acceptNewsletter" />
                <label for="newsletter" class="text-sm leading-tight cursor-pointer">
                  Je souhaite recevoir les actualités et offres commerciales de VizHome (optionnel)
                </label>
              </div>
            </div>

            <Button type="submit" class="w-full">S'inscrire</Button>
          </form>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t"></span>
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
        <span class="text-muted-foreground">Vous avez déjà un compte?</span>
        <span class="text-muted-foreground"> | </span>
        <NuxtLink to="/auth/login" class="text-primary hover:underline">
          Se connecter
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GithubIcon } from 'lucide-vue-next'

// État du formulaire
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const acceptNewsletter = ref(false)



// Fonction de soumission du formulaire
const handleSubmit = () => {
  // Vérification de base
  if (!acceptTerms.value) {
    alert('Vous devez accepter les conditions d\'utilisation pour créer un compte')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  console.log('Registration attempt:', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    newsletter: acceptNewsletter.value
  })

  // Ici vous implémenteriez la logique d'inscription
}

definePageMeta({
  layout: 'none'
})
</script>

<style scoped></style>