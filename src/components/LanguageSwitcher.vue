<template>
    <div>
        <!-- Version desktop -->
        <div class="hidden md:block">
            <DropdownMenu>
                <DropdownMenuTrigger
                    class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <GlobeIcon class="h-4 w-4" />
                    <span>{{ displayLanguage }}</span>
                    <ChevronDownIcon class="h-3 w-3 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="changeLanguage('fr')" class="flex items-center gap-2 cursor-pointer">
                        <span class="h-4 w-4 text-sm flex items-center justify-center">🇫🇷</span>
                        <span>Français</span>
                        <CheckIcon v-if="currentLanguage === 'fr'" class="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="changeLanguage('en')" class="flex items-center gap-2 cursor-pointer">
                        <span class="h-4 w-4 text-sm flex items-center justify-center">🇬🇧</span>
                        <span>English</span>
                        <CheckIcon v-if="currentLanguage === 'en'" class="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="changeLanguage('es')" class="flex items-center gap-2 cursor-pointer">
                        <span class="h-4 w-4 text-sm flex items-center justify-center">🇪🇸</span>
                        <span>Español</span>
                        <CheckIcon v-if="currentLanguage === 'es'" class="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="changeLanguage('de')" class="flex items-center gap-2 cursor-pointer">
                        <span class="h-4 w-4 text-sm flex items-center justify-center">🇩🇪</span>
                        <span>Deutsch</span>
                        <CheckIcon v-if="currentLanguage === 'de'" class="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="changeLanguage('it')" class="flex items-center gap-2 cursor-pointer">
                        <span class="h-4 w-4 text-sm flex items-center justify-center">🇮🇹</span>
                        <span>Italiano</span>
                        <CheckIcon v-if="currentLanguage === 'it'" class="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="changeLanguage('pt')" class="flex items-center gap-2 cursor-pointer">
                        <span class="h-4 w-4 text-sm flex items-center justify-center">🇵🇹</span>
                        <span>Português</span>
                        <CheckIcon v-if="currentLanguage === 'pt'" class="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <!-- Version mobile -->
        <div class="md:hidden">
            <button @click="toggleMobileMenu"
                class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <GlobeIcon class="h-4 w-4" />
                <span>{{ displayLanguage }}</span>
                <ChevronDownIcon class="h-3 w-3 opacity-70" />
            </button>

            <Dialog v-model:open="isMobileMenuOpen">
                <DialogContent class="max-w-xs mx-auto">
                    <DialogHeader>
                        <DialogTitle>Choisir une langue</DialogTitle>
                        <DialogDescription>Sélectionnez la langue de l'interface</DialogDescription>
                    </DialogHeader>

                    <div class="flex flex-col gap-2 py-2">
                        <Button @click="changeLanguage('fr')" variant="ghost" class="justify-start gap-2"
                            :class="{ 'bg-accent': currentLanguage === 'fr' }">
                            <span class="h-5 w-5 flex items-center justify-center">🇫🇷</span>
                            <span>Français</span>
                            <CheckIcon v-if="currentLanguage === 'fr'" class="h-4 w-4 ml-auto" />
                        </Button>

                        <Button @click="changeLanguage('en')" variant="ghost" class="justify-start gap-2"
                            :class="{ 'bg-accent': currentLanguage === 'en' }">
                            <span class="h-5 w-5 flex items-center justify-center">🇬🇧</span>
                            <span>English</span>
                            <CheckIcon v-if="currentLanguage === 'en'" class="h-4 w-4 ml-auto" />
                        </Button>

                        <Button @click="changeLanguage('es')" variant="ghost" class="justify-start gap-2"
                            :class="{ 'bg-accent': currentLanguage === 'es' }">
                            <span class="h-5 w-5 flex items-center justify-center">🇪🇸</span>
                            <span>Español</span>
                            <CheckIcon v-if="currentLanguage === 'es'" class="h-4 w-4 ml-auto" />
                        </Button>

                        <Button @click="changeLanguage('de')" variant="ghost" class="justify-start gap-2"
                            :class="{ 'bg-accent': currentLanguage === 'de' }">
                            <span class="h-5 w-5 flex items-center justify-center">🇩🇪</span>
                            <span>Deutsch</span>
                            <CheckIcon v-if="currentLanguage === 'de'" class="h-4 w-4 ml-auto" />
                        </Button>

                        <Button @click="changeLanguage('it')" variant="ghost" class="justify-start gap-2"
                            :class="{ 'bg-accent': currentLanguage === 'it' }">
                            <span class="h-5 w-5 flex items-center justify-center">🇮🇹</span>
                            <span>Italiano</span>
                            <CheckIcon v-if="currentLanguage === 'it'" class="h-4 w-4 ml-auto" />
                        </Button>

                        <Button @click="changeLanguage('pt')" variant="ghost" class="justify-start gap-2"
                            :class="{ 'bg-accent': currentLanguage === 'pt' }">
                            <span class="h-5 w-5 flex items-center justify-center">🇵🇹</span>
                            <span>Português</span>
                            <CheckIcon v-if="currentLanguage === 'pt'" class="h-4 w-4 ml-auto" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import {
    GlobeIcon,
    ChevronDownIcon,
    CheckIcon
} from 'lucide-vue-next'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const languages = {
    fr: { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
    en: { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
    es: { code: 'es', label: 'ES', name: 'Español', flag: '🇪🇸' },
    de: { code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    it: { code: 'it', label: 'IT', name: 'Italiano', flag: '🇮🇹' },
    pt: { code: 'pt', label: 'PT', name: 'Português', flag: '🇵🇹' },
}

const currentLanguage = useLocalStorage('language', 'fr')
const isMobileMenuOpen = ref(false)

const displayLanguage = computed(() => {
    return languages[currentLanguage.value as keyof typeof languages]?.label || 'FR'
})

function changeLanguage(lang: string) {
    currentLanguage.value = lang
    isMobileMenuOpen.value = false
    // Ici vous pourriez implémenter la logique pour changer la langue de l'application
    // Par exemple: i18n.locale = lang
}

function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>