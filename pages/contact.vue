<template>
  <div class="min-h-screen bg-background">
    <!-- En-tête avec effet de gradient -->
    <section class="relative py-10">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary/5 to-background"
        />
        <div
          class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"
        />
      </div>

      <div class="container relative mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h1 class="text-5xl font-bold mb-6">Contactez-nous</h1>
          <p class="text-xl text-muted-foreground">
            Notre équipe d'experts est prête à répondre à toutes vos questions
            et à vous aider à réaliser vos projets.
          </p>
        </div>

        <!-- Cartes d'information -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          <div
            class="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <MailIcon class="h-7 w-7 text-primary" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Email</h3>
            <p class="text-muted-foreground mb-4">Contactez-nous par email</p>
            <p class="font-medium">contact@vizhome.fr</p>
          </div>

          <div
            class="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <PhoneIcon class="h-7 w-7 text-primary" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Téléphone</h3>
            <p class="text-muted-foreground mb-4">
              Appelez-nous du lundi au vendredi
            </p>
            <p class="font-medium">+33 (0)1 23 45 67 89</p>
          </div>

          <div
            class="bg-card border rounded-xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <MapPinIcon class="h-7 w-7 text-primary" />
            </div>
            <h3 class="font-semibold text-lg mb-2">Adresse</h3>
            <p class="text-muted-foreground mb-4">Visitez nos bureaux</p>
            <p class="font-medium">
              349 Rue de la Cavalade<br />34530 Montpellier, France
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulaire et Carte -->
    <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Formulaire -->
          <div class="bg-card border rounded-xl shadow-sm overflow-hidden">
            <div
              class="p-2 bg-gradient-to-r from-primary to-primary-foreground"
            />
            <div class="p-8">
              <h2 class="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

              <Form
                v-slot="{ errors }"
                :validation-schema="schema"
                @submit="onSubmit"
              >
                <div class="space-y-5">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label for="name" class="text-sm font-medium mb-2"
                        >Nom</Label
                      >
                      <Field v-slot="{ field }" name="name">
                        <Input
                          v-bind="field"
                          id="name"
                          placeholder="Votre nom complet"
                          class="mt-1 w-full"
                        />
                      </Field>
                      <p
                        v-if="errors.name"
                        class="text-xs text-destructive mt-1"
                      >
                        {{ errors.name }}
                      </p>
                    </div>

                    <div>
                      <Label for="email" class="text-sm font-medium mb-2"
                        >Email</Label
                      >
                      <Field v-slot="{ field }" name="email">
                        <Input
                          v-bind="field"
                          id="email"
                          type="email"
                          placeholder="votreemail@exemple.com"
                          class="mt-1 w-full"
                        />
                      </Field>
                      <p
                        v-if="errors.email"
                        class="text-xs text-destructive mt-1"
                      >
                        {{ errors.email }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label for="subject" class="text-sm font-medium mb-2"
                      >Sujet</Label
                    >
                    <Field v-slot="{ field }" name="subject">
                      <Select v-bind="field">
                        <SelectTrigger class="w-full">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general"
                            >Question générale</SelectItem
                          >
                          <SelectItem value="sales"
                            >Demande commerciale</SelectItem
                          >
                          <SelectItem value="support"
                            >Support technique</SelectItem
                          >
                          <SelectItem value="partnership"
                            >Partenariat</SelectItem
                          >
                          <SelectItem value="feedback"
                            >Retour d'expérience</SelectItem
                          >
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <p
                      v-if="errors.subject"
                      class="text-xs text-destructive mt-1"
                    >
                      {{ errors.subject }}
                    </p>
                  </div>

                  <div>
                    <Label for="message" class="text-sm font-medium mb-2"
                      >Message</Label
                    >
                    <Field v-slot="{ field }" name="message">
                      <Textarea
                        v-bind="field"
                        id="message"
                        placeholder="Décrivez votre demande en détail..."
                        rows="5"
                        class="mt-1 w-full resize-none"
                      />
                    </Field>
                    <p
                      v-if="errors.message"
                      class="text-xs text-destructive mt-1"
                    >
                      {{ errors.message }}
                    </p>
                  </div>

                  <div class="space-y-3 pt-2">
                    <div class="flex items-start space-x-3">
                      <Field v-slot="{ field }" name="privacy" type="checkbox">
                        <Checkbox v-bind="field" id="privacy" />
                      </Field>
                      <label
                        for="privacy"
                        class="text-sm leading-tight cursor-pointer"
                      >
                        J'accepte la
                        <NuxtLink
                          to="/legal/terms-of-use"
                          class="text-primary hover:underline"
                          >politique de confidentialité</NuxtLink
                        >
                      </label>
                    </div>
                    <p
                      v-if="errors.privacy"
                      class="text-xs text-destructive mt-1"
                    >
                      {{ errors.privacy }}
                    </p>

                    <div class="flex items-start space-x-3">
                      <Checkbox id="newsletter" v-model="newsletter" />
                      <label
                        for="newsletter"
                        class="text-sm leading-tight cursor-pointer"
                      >
                        Je souhaite recevoir la newsletter et les actualités de
                        VizHome (optionnel)
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    class="w-full bg-primary font-medium py-2.5 mt-2"
                  >
                    Envoyer le message
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          <!-- Carte et Infos -->
          <div class="space-y-8">
            <div class="h-[280px] rounded-xl overflow-hidden shadow-sm border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021.5091640535491!2d3.911577682454062!3d43.60103976512807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6a57b6f8cb8a9%3A0x42f0e76b9c549d63!2s349%20Rue%20de%20la%20Cavalade%2C%2034965%20Montpellier!5e0!3m2!1sfr!2sfr!4v1745708921696!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>

            <div class="bg-card border rounded-xl p-6 shadow-sm">
              <h3 class="text-xl font-bold mb-4">Heures d'ouverture</h3>
              <div class="space-y-3">
                <div class="flex justify-between py-2 border-b border-border">
                  <span class="font-medium">Lundi - Vendredi</span>
                  <span>9h00 - 18h00</span>
                </div>
                <div class="flex justify-between py-2 border-b border-border">
                  <span class="font-medium">Samedi</span>
                  <span>Fermé</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="font-medium">Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>

            <!-- FAQ Rapide -->
            <div class="bg-card border rounded-xl p-6 shadow-sm">
              <h3 class="text-xl font-bold mb-4">Questions fréquentes</h3>
              <div class="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1" class="border-none">
                    <AccordionTrigger class="py-2 text-base"
                      >Quel est le délai de réponse ?</AccordionTrigger
                    >
                    <AccordionContent class="text-sm text-muted-foreground">
                      Nous répondons généralement dans les 24h ouvrées, et sous
                      4h pour les clients Pro et Entreprise.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" class="border-none">
                    <AccordionTrigger class="py-2 text-base"
                      >Comment programmer une démo ?</AccordionTrigger
                    >
                    <AccordionContent class="text-sm text-muted-foreground">
                      Sélectionnez "Demande commerciale" comme sujet dans le
                      formulaire pour demander une démo personnalisée.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div class="pt-2">
                  <NuxtLink
                    to="/faq"
                    class="text-primary hover:underline text-sm font-medium inline-flex items-center"
                  >
                    Voir toutes les questions fréquentes
                    <ArrowRightIcon class="h-4 w-4 ml-1" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from 'lucide-vue-next'
import { Form, Field } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
  privacy: boolean
}

const schema = yup.object({
  name: yup
    .string()
    .required('Le nom est requis')
    .min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: yup
    .string()
    .required("L'email est requis")
    .email("Format d'email invalide"),
  subject: yup.string().required('Veuillez sélectionner un sujet'),
  message: yup
    .string()
    .required('Le message est requis')
    .min(20, 'Le message doit contenir au moins 20 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
  privacy: yup
    .boolean()
    .required('Vous devez accepter la politique de confidentialité')
    .oneOf([true], 'Vous devez accepter la politique de confidentialité'),
})

const newsletter = ref(false)

const onSubmit = (values: FormValues) => {
  console.log({ ...values, newsletter: newsletter.value })
  // Ici vous implémenteriez la logique d'envoi du formulaire
  // Par exemple avec une requête API
}
</script>
