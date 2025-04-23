<template>
  <div>
    <!-- En-tête -->
    <section class="pt-16 pb-12 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p class="text-lg text-muted-foreground mb-6">
              Notre équipe est à votre disposition pour répondre à toutes vos questions. Nous vous répondrons dans les
              meilleurs délais.
            </p>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <MailIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium">Email</h3>
                  <p class="text-muted-foreground">contact@vizhome.fr</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <PhoneIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium">Téléphone</h3>
                  <p class="text-muted-foreground">+33 (0)1 23 45 67 89</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <MapPinIcon class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 class="font-medium">Adresse</h3>
                  <p class="text-muted-foreground">
                    35 Avenue des Champs-Élysées<br>
                    75008 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-8 shadow-primary/10 shadow-lg">
            <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit">
              <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label for="name" class="font-medium mb-2">Nom</Label>
                    <Field v-slot="{ field }" name="name">
                      <Input v-bind="field" id="name" placeholder="Votre nom complet"
                        class="mt-1 w-full focus:border-primary/70" />
                    </Field>
                    <p v-if="errors.name" class="text-sm text-destructive mt-1">{{ errors.name }}</p>
                  </div>

                  <div>
                    <Label for="email" class="font-medium mb-2">Email</Label>
                    <Field v-slot="{ field }" name="email">
                      <Input v-bind="field" id="email" type="email" placeholder="votreemail@exemple.com"
                        class="mt-1 w-full focus:border-primary/70" />
                    </Field>
                    <p v-if="errors.email" class="text-sm text-destructive mt-1">{{ errors.email }}</p>
                  </div>
                </div>

                <div>
                  <Label for="subject" class="font-medium mb-2">Sujet</Label>
                  <Field v-slot="{ field }" name="subject">
                    <Select v-bind="field" class="w-full">
                      <SelectTrigger >
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Question générale</SelectItem>
                        <SelectItem value="sales">Demande commerciale</SelectItem>
                        <SelectItem value="support">Support technique</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="feedback">Retour d'expérience</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>                  
                  <p v-if="errors.subject" class="text-sm text-destructive mt-1">{{ errors.subject }}</p>
                </div>

                <div>
                  <Label for="message" class="font-medium mb-2">Message</Label>
                  <Field v-slot="{ field }" name="message">
                    <Textarea v-bind="field" id="message" placeholder="Décrivez votre demande en détail..." rows="6"
                      class="mt-1 w-full resize-none border-primary/70" />
                  </Field>
                  <p v-if="errors.message" class="text-sm text-destructive mt-1">{{ errors.message }}</p>
                </div>

                <div class="space-y-3">
                  <div class="flex items-start space-x-3">
                    <Field v-slot="{ field }" name="privacy" type="checkbox">
                      <Checkbox v-bind="field" id="privacy" />
                    </Field>
                    <label for="privacy" class="text-sm font-medium leading-tight cursor-pointer">
                      J'accepte la <NuxtLink to="/legal/privacy" class="text-primary hover:underline">politique de
                        confidentialité</NuxtLink>
                    </label>
                  </div>
                  <p v-if="errors.privacy" class="text-sm text-destructive mt-1">{{ errors.privacy }}</p>

                  <div class="flex items-start space-x-3">
                    <Checkbox id="newsletter" />
                    <label for="newsletter" class="text-sm font-medium leading-tight cursor-pointer">
                      Je souhaite recevoir la newsletter et les actualités de VizHome (optionnel)
                    </label>
                  </div>
                </div>

                <Button type="submit" class="w-full bg-primary font-medium py-2.5">
                  Envoyer le message
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-12 bg-muted/10">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl font-bold mb-8 text-center">Questions fréquentes</h2>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Quel est le délai de réponse ?</AccordionTrigger>
            <AccordionContent>
              Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures ouvrées. Pour les clients
              des forfaits Pro et Entreprise, le délai de réponse est généralement inférieur à 4 heures.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Comment programmer une démo ?</AccordionTrigger>
            <AccordionContent>
              Vous pouvez demander une démo personnalisée en remplissant le formulaire de contact en sélectionnant
              "Demande commerciale" comme sujet. Notre équipe commerciale vous contactera pour organiser une session
              adaptée à vos besoins.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Comment obtenir un devis personnalisé ?</AccordionTrigger>
            <AccordionContent>
              Pour les besoins spécifiques ou les grandes organisations, nous proposons des solutions sur mesure.
              Contactez-nous en précisant vos besoins et nous vous établirons un devis personnalisé.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Puis-je demander une fonctionnalité spécifique ?</AccordionTrigger>
            <AccordionContent>
              Absolument ! Nous accueillons favorablement les suggestions de nos utilisateurs. Décrivez la
              fonctionnalité souhaitée dans votre message et notre équipe produit l'évaluera.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- Carte -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="h-80 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2168256667746!2d2.3002121157204583!3d48.86967030774854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc5c0dca437%3A0x45ef4324eb62f5b6!2s35%20Av.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1656408642252!5m2!1sfr!2sfr"
            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-vue-next'
import * as yup from 'yup'
import { Form, Field } from 'vee-validate'

const schema = yup.object({
  name: yup.string().required('Le nom est requis').min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: yup.string().required('L\'email est requis').email('Format d\'email invalide'),
  subject: yup.string().required('Veuillez sélectionner un sujet'),
  message: yup.string()
    .required('Le message est requis')
    .min(20, 'Le message doit contenir au moins 20 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
  privacy: yup.boolean()
    .required('Vous devez accepter la politique de confidentialité')
    .oneOf([true], 'Vous devez accepter la politique de confidentialité'),
})

const newsletter = ref(false)

const onSubmit = (values) => {
  console.log({ ...values, newsletter: newsletter.value })
  // Ici vous implémenteriez la logique d'envoi du formulaire
  // Par exemple avec une requête API
}
</script>