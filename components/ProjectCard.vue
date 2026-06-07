<template>
  <Card class="overflow-hidden group">
    <div class="aspect-video relative overflow-hidden">
      <img
        :src="project.thumbnail"
        :alt="project.title"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
      >
        <div class="flex gap-2">
          <Button size="icon" variant="secondary" class="h-8 w-8 rounded-full">
            <PencilIcon class="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" class="h-8 w-8 rounded-full">
            <EyeIcon class="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" class="h-8 w-8 rounded-full">
            <Share2Icon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    <CardHeader class="p-4 pb-0">
      <div class="flex justify-between items-start">
        <CardTitle class="text-base">{{ project.title }}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="h-8 w-8">
              <MoreVerticalIcon class="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <PencilIcon class="mr-2 h-4 w-4" />
              <span>Modifier</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon class="mr-2 h-4 w-4" />
              <span>Dupliquer</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2Icon class="mr-2 h-4 w-4" />
              <span>Partager</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-destructive">
              <TrashIcon class="mr-2 h-4 w-4" />
              <span>Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardDescription class="line-clamp-1">{{
        project.description
      }}</CardDescription>
    </CardHeader>
    <CardContent class="p-4 pt-2">
      <div class="flex justify-between text-xs text-muted-foreground">
        <div class="flex items-center gap-1">
          <ImageIcon class="h-3 w-3" />
          {{ project.rendersCount }} rendus
        </div>
        <time>Modifié {{ formatDate(project.updatedAt) }}</time>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  PencilIcon,
  EyeIcon,
  Share2Icon,
  MoreVerticalIcon,
  CopyIcon,
  TrashIcon,
  ImageIcon,
} from 'lucide-vue-next'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "aujourd'hui"
  } else if (diffDays === 1) {
    return 'hier'
  } else if (diffDays < 7) {
    return `il y a ${diffDays} jours`
  } else {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }
}
</script>
