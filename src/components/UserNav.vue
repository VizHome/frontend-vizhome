<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                <Avatar class="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=23" alt="@jeandupont" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end" force-mount>
            <DropdownMenuLabel class="font-normal">
                <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">Jean Dupont</p>
                    <p class="text-xs leading-none text-muted-foreground">
                        jean@exemple.fr
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <UserIcon class="mr-2 h-4 w-4" />
                    <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCardIcon class="mr-2 h-4 w-4" />
                    <span>Facturation</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SettingsIcon class="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOutIcon class="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import { UserIcon, CreditCardIcon, SettingsIcon, LogOutIcon } from 'lucide-vue-next'
</script>