<template>
  <Accordion type="single" collapsible class="w-full">
    <AccordionItem
      v-for="(item, index) in items"
      :key="index"
      :value="`item-${index}`"
    >
      <AccordionTrigger class="text-left">{{ item.question }}</AccordionTrigger>
      <AccordionContent>
        <div class="whitespace-pre-line leading-relaxed text-foreground/90">
          {{ item.answer }}
        </div>
        <CodeBlock
          v-if="item.code"
          :code="item.code.code"
          :language="item.code.language"
          :filename="item.code.filename"
        />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
export interface FAQItem {
  question: string
  answer: string
  /**
   * Bloc de code optionnel affiché sous la réponse (utile pour les questions
   * techniques : exemples API, snippets curl/JS/Python).
   */
  code?: {
    language: string
    filename?: string
    code: string
  }
}

defineProps<{
  items: FAQItem[]
}>()
</script>
