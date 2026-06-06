<template>
  <div>
    <!-- En-tête -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-3">Contactez-nous</h1>
        <p class="text-lg text-muted-foreground">
          Notre équipe d'experts est prête à répondre à toutes vos questions.
        </p>
      </div>
    </section>

    <!-- Cartes info -->
    <section class="py-10 px-6 border-b bg-muted/30">
      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="bg-background rounded-xl border shadow-sm p-6 flex flex-col items-center text-center"
        >
          <div class="bg-primary/10 p-3 rounded-full mb-3">
            <MailIcon class="h-5 w-5 text-primary" />
          </div>
          <h3 class="font-semibold mb-1">Email</h3>
          <p class="text-xs text-muted-foreground mb-2">
            Contactez-nous par email
          </p>
          <p class="text-sm font-medium">contact@vizhome.fr</p>
        </div>
        <div
          class="bg-background rounded-xl border shadow-sm p-6 flex flex-col items-center text-center"
        >
          <div class="bg-primary/10 p-3 rounded-full mb-3">
            <MessagesSquareIcon class="h-5 w-5 text-primary" />
          </div>
          <h3 class="font-semibold mb-1">Forum</h3>
          <p class="text-xs text-muted-foreground mb-2">
            Communauté entraide
          </p>
          <NuxtLink
            to="/forum"
            class="text-sm font-medium text-primary hover:underline"
          >
            Rejoindre la discussion
          </NuxtLink>
        </div>
        <div
          class="bg-background rounded-xl border shadow-sm p-6 flex flex-col items-center text-center"
        >
          <div class="bg-primary/10 p-3 rounded-full mb-3">
            <MapPinIcon class="h-5 w-5 text-primary" />
          </div>
          <h3 class="font-semibold mb-1">Adresse</h3>
          <p class="text-xs text-muted-foreground mb-2">Visitez nos bureaux</p>
          <p class="text-sm font-medium">
            349 Rue de la Cavalade<br />34530 Montpellier
          </p>
        </div>
      </div>
    </section>

    <!-- Formulaire + carte -->
    <section class="py-12 px-6">
      <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Formulaire -->
        <div class="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div class="h-1 bg-primary" />
          <div class="p-8">
            <h2 class="text-xl font-bold mb-6">Envoyez-nous un message</h2>
            <Form
              v-slot="{ errors }"
              :validation-schema="schema"
              @submit="onSubmit"
            >
              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label for="name" class="text-sm font-medium">Nom</Label>
                    <Field v-slot="{ field }" name="name">
                      <Input
                        v-bind="field"
                        id="name"
                        placeholder="Votre nom complet"
                        class="mt-1"
                      />
                    </Field>
                    <p v-if="errors.name" class="text-xs text-destructive mt-1">
                      {{ errors.name }}
                    </p>
                  </div>
                  <div>
                    <Label for="email" class="text-sm font-medium">Email</Label>
                    <Field v-slot="{ field }" name="email">
                      <Input
                        v-bind="field"
                        id="email"
                        type="email"
                        placeholder="votreemail@exemple.com"
                        class="mt-1"
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
                  <Label for="subject" class="text-sm font-medium">Sujet</Label>
                  <Field v-slot="{ field }" name="subject">
                    <Select v-bind="field">
                      <SelectTrigger class="w-full mt-1">
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
                        <SelectItem value="partnership">Partenariat</SelectItem>
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
                  <Label for="message" class="text-sm font-medium"
                    >Message</Label
                  >
                  <Field v-slot="{ field }" name="message">
                    <Textarea
                      v-bind="field"
                      id="message"
                      placeholder="Décrivez votre demande en détail..."
                      rows="4"
                      class="mt-1 resize-none"
                    />
                  </Field>
                  <p
                    v-if="errors.message"
                    class="text-xs text-destructive mt-1"
                  >
                    {{ errors.message }}
                  </p>
                </div>

                <div class="space-y-2 pt-1">
                  <div class="flex items-start gap-3">
                    <Field v-slot="{ field }" name="privacy" type="checkbox">
                      <Checkbox v-bind="field" id="privacy" />
                    </Field>
                    <label
                      for="privacy"
                      class="text-sm leading-tight cursor-pointer"
                    >
                      J'accepte la
                      <NuxtLink
                        to="/legal/privacy-policy"
                        class="text-primary hover:underline"
                        >politique de confidentialité</NuxtLink
                      >
                    </label>
                  </div>
                  <p v-if="errors.privacy" class="text-xs text-destructive">
                    {{ errors.privacy }}
                  </p>
                  <div class="flex items-start gap-3">
                    <Checkbox id="newsletter" v-model="newsletter" />
                    <label
                      for="newsletter"
                      class="text-sm leading-tight cursor-pointer"
                    >
                      Je souhaite recevoir la newsletter (optionnel)
                    </label>
                  </div>
                </div>

                <Button type="submit" class="w-full rounded-full mt-2">
                  Envoyer le message
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <!-- Carte + infos -->
        <div class="space-y-6">
          <div class="h-56 rounded-xl overflow-hidden border shadow-sm">
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

          <div class="bg-card rounded-xl border shadow-sm p-6">
            <h3 class="font-semibold mb-4">Heures d'ouverture</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between py-1.5 border-b">
                <span class="font-medium">Lundi — Vendredi</span>
                <span>9h00 – 18h00</span>
              </div>
              <div class="flex justify-between py-1.5 border-b">
                <span class="font-medium">Samedi</span>
                <span class="text-muted-foreground">Fermé</span>
              </div>
              <div class="flex justify-between py-1.5">
                <span class="font-medium">Dimanche</span>
                <span class="text-muted-foreground">Fermé</span>
              </div>
            </div>
          </div>

          <div class="bg-card rounded-xl border shadow-sm p-6">
            <h3 class="font-semibold mb-4">Questions fréquentes</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="delay" class="border-none">
                <AccordionTrigger class="py-2 text-sm"
                  >Quel est le délai de réponse ?</AccordionTrigger
                >
                <AccordionContent class="text-sm text-muted-foreground">
                  Nous répondons généralement dans les 24h ouvrées, et sous 4h
                  pour les clients Pro et Entreprise.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="demo" class="border-none">
                <AccordionTrigger class="py-2 text-sm"
                  >Comment programmer une démo ?</AccordionTrigger
                >
                <AccordionContent class="text-sm text-muted-foreground">
                  Sélectionnez "Demande commerciale" comme sujet dans le
                  formulaire pour demander une démo personnalisée.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <NuxtLink
              to="/faq"
              class="text-primary hover:underline text-sm font-medium inline-flex items-center mt-3"
            >
              Voir toutes les FAQ
              <ArrowRightIcon class="h-3.5 w-3.5 ml-1" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  MailIcon,
  MessagesSquareIcon,
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

// vee-validate type le handler comme `SubmissionHandler<GenericObject>`
// → on accepte le type large puis on narrow (cast via `unknown` requis car
// `Record<string, unknown>` et `FormValues` n'ont pas d'overlap structurel).
const onSubmit = (values: Record<string, unknown>) => {
  const v = values as unknown as FormValues
  logger.log({ ...v, newsletter: newsletter.value })
}
</script>
