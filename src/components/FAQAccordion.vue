<template>
  <Accordion type="single" collapsible class="w-full">
    <AccordionItem 
      v-for="(item, index) in items" 
      :key="index" 
      :value="`item-${index}`"
    >
      <AccordionTrigger>{{ item.question }}</AccordionTrigger>
      <AccordionContent>
        {{ item.answer }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array as () => Array<{ question: string, answer: string }>,
    required: true,
  },
})
</script>