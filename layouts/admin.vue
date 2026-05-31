<!--
  Layout admin interne (staff-only).
  Distinct du forum / marketing par sa palette + le badge ADMIN.
-->
<template>
  <div class="min-h-screen flex flex-col bg-muted/20">
    <AdminHeader :refreshing="refreshing" @refresh="onRefresh" />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const refreshing = ref(false)
const adminPanel = useAdminPanel()

async function onRefresh() {
  refreshing.value = true
  try {
    await adminPanel.loadOverview()
  } finally {
    refreshing.value = false
  }
}
</script>
