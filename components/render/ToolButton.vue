<template>
  <div class="relative group/tb">
    <slot />
    <div
      class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 opacity-0 group-hover/tb:opacity-100 transition-opacity duration-150 delay-500 flex flex-col items-center"
    >
      <div
        class="bg-popover border shadow-md rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 whitespace-nowrap"
      >
        <span class="text-xs font-medium text-popover-foreground">{{
          label
        }}</span>
        <kbd
          v-if="shortcut"
          class="text-[10px] font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded border leading-none"
        >
          {{ shortcut }}
        </kbd>
      </div>
      <!-- Flèche du tooltip -->
      <div class="w-2 h-2 bg-popover border-r border-b rotate-45 -mt-[5px]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  shortcut?: string
}>()
</script>
