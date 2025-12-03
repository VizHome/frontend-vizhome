<template>
  <div class="container mx-auto py-8 px-4">
    <Card class="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Test API U-Net Transform</CardTitle>
        <CardDescription>
          Envoyez une image pour la transformer avec le modèle U-Net
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6">
        <div class="space-y-4">
          <Label for="image-upload">Sélectionner une image</Label>
          <div class="flex gap-4">
            <Input id="image-upload" type="file" accept="image/*" @change="handleFileSelect" ref="fileInput"
              class="flex-1" />
            <Button @click="sendImage" :disabled="!selectedFile || loading">
              <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
              {{ loading ? 'Envoi en cours...' : 'Transformer' }}
            </Button>
          </div>
        </div>

        <Alert v-if="error" variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{{ error }}</AlertDescription>
        </Alert>

        <div v-if="selectedFile" class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold mb-3">Image originale :</h3>
            <div class="border rounded-lg overflow-hidden">
              <img :src="previewUrl" alt="Preview" class="w-full h-auto" />
            </div>
          </div>

          <Separator v-if="result" />

          <div v-if="result">
            <h3 class="text-lg font-semibold mb-3">Résultat de la transformation :</h3>
            <div class="border rounded-lg overflow-hidden">
              <img :src="result" alt="Result" class="w-full h-auto" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Loader2, AlertCircle } from 'lucide-vue-next'

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string>('')
const result = ref<string>('')
const error = ref<string>('')
const loading = ref<boolean>(false)
const fileInput = ref<HTMLInputElement>()
const previousResultUrl = ref<string | null>(null)

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    error.value = ''
    result.value = ''
  }
}

const sendImage = async () => {
  if (!selectedFile.value) return

  loading.value = true
  error.value = ''
  result.value = ''

  try {
    const formData = new FormData()
    formData.append('image', selectedFile.value)

    const response = await fetch('http://127.0.0.1:8000/api/unet-transform/', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      try {
        const err = await response.json()
        throw new Error(err.detail || err.error || `Erreur HTTP ${response.status}`)
      } catch {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
    }

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('image')) {
      const blob = await response.blob()
      if (previousResultUrl.value) {
        URL.revokeObjectURL(previousResultUrl.value)
      }
      previousResultUrl.value = URL.createObjectURL(blob)
      result.value = previousResultUrl.value
    } else {
      const text = await response.text()
      throw new Error(`Réponse inattendue: ${text}`)
    }

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
    console.error(err)
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'none',
})
</script>

