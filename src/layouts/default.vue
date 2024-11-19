<template>
  <div>
    <nav class="py-2 px-3 flex justify-between items-center">
      <div class="flex justify-center items-center">
        <NuxtLink to="/">
          <strong class="text-3xl">Viz.</strong>
        </NuxtLink>
      </div>
      <div class="flex justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Produit</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul>
                  <NavigationMenuLink as-child>
                    <a href="">
                      Fonctionnalités
                    </a>
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button>
          Contact
        </Button>
      </div>
      <div class="flex justify-center items-center">
        <NuxtLink to="/render">
          <Button>
            Créer un rendu 3D
          </Button>    
        </NuxtLink>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>