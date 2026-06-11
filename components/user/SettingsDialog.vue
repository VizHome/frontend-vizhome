<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-2xl p-0 gap-0 overflow-hidden">
      <DialogHeader class="px-6 pt-6 pb-4 border-b">
        <DialogTitle>Paramètres</DialogTitle>
        <DialogDescription>
          Gérez vos préférences et la configuration de votre compte.
        </DialogDescription>
      </DialogHeader>

      <!-- Layout 2 colonnes -->
      <div class="flex min-h-[480px]">
        <!-- Sidebar nav gauche -->
        <nav class="w-44 shrink-0 border-r p-3 flex flex-col gap-0.5">
          <button
            v-for="item in navItems"
            :key="item.id"
            class="flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-sm text-left transition-colors"
            :class="
              activeSection === item.id
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            "
            @click="activeSection = item.id"
          >
            <component :is="item.icon" class="h-4 w-4 shrink-0" />
            <span>{{ item.label }}</span>
          </button>
        </nav>

        <!-- Contenu section -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- ── Compte (profil édition + email/pseudo read-only) ─── -->
          <section v-if="activeSection === 'account'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Compte</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Modifie ton nom et ton avatar. Le pseudo et l'email sont
                immuables — contacte le support si tu dois en changer.
              </p>
            </div>

            <div class="flex flex-col gap-5">
              <!-- Avatar -->
              <div class="flex flex-col items-center gap-3">
                <div class="relative">
                  <Avatar class="h-20 w-20">
                    <AvatarImage :src="accountForm.avatarUrl" :alt="accountForm.name" />
                    <AvatarFallback class="text-lg">{{ accountInitials }}</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    class="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition hover:bg-primary/90"
                    title="Changer l'avatar"
                    @click="triggerAvatarInput"
                  >
                    <Camera class="h-3.5 w-3.5" />
                  </button>
                  <input
                    ref="avatarInputRef"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleAvatarFile"
                  />
                </div>
                <p class="text-[10px] text-muted-foreground">
                  JPG, PNG — max 2 Mo
                </p>
                <p v-if="accountErrors.avatar" class="text-xs text-destructive">
                  {{ accountErrors.avatar }}
                </p>
              </div>

              <!-- Nom -->
              <div class="flex flex-col gap-1.5">
                <Label for="acct-name">Nom complet</Label>
                <Input
                  id="acct-name"
                  v-model="accountForm.name"
                  type="text"
                  placeholder="Jean Dupont"
                  :class="{ 'ring-1 ring-destructive': accountErrors.name }"
                />
                <p v-if="accountErrors.name" class="text-xs text-destructive">
                  {{ accountErrors.name }}
                </p>
              </div>

              <!-- Pseudo (read-only, immuable) -->
              <div class="flex flex-col gap-1.5">
                <Label for="acct-pseudo">Pseudo public</Label>
                <div class="relative">
                  <AtSign class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <!-- `:model-value` et non `:value` : le composant shadcn Input
                       bind en interne `:value="modelValue"`, donc un attribut
                       `value` fallthrough est écrasé et le champ reste vide. -->
                  <Input
                    id="acct-pseudo"
                    :model-value="user.pseudo"
                    readonly
                    disabled
                    class="cursor-not-allowed bg-muted/50 pl-9 font-medium"
                  />
                </div>
                <p class="text-[10px] text-muted-foreground">
                  Ton identité publique sur le forum et le support.
                </p>
              </div>

              <!-- Email (read-only) -->
              <div class="flex flex-col gap-1.5">
                <Label for="acct-email">Email</Label>
                <Input
                  id="acct-email"
                  :model-value="user.email"
                  type="email"
                  readonly
                  disabled
                  class="cursor-not-allowed bg-muted/50"
                />
              </div>

              <!-- Footer actions -->
              <div class="flex items-center justify-end gap-2">
                <span
                  v-if="accountSaveSuccess"
                  class="flex items-center gap-1.5 text-xs text-green-600 mr-auto"
                >
                  <CheckCircle2 class="h-3.5 w-3.5" />
                  Profil mis à jour
                </span>
                <Button
                  :disabled="isSavingAccount || accountSaveSuccess"
                  @click="saveAccount"
                >
                  <Loader2 v-if="isSavingAccount" class="h-4 w-4 mr-2 animate-spin" />
                  {{ isSavingAccount ? 'Sauvegarde…' : 'Sauvegarder' }}
                </Button>
              </div>
            </div>
          </section>

          <!-- ── Utilisation ──────────────────────────────────────── -->
          <section v-if="activeSection === 'usage'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Utilisation</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Ta consommation ce mois — plan actuel
                <span
                  class="ml-1 inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  :class="planBadgeClass"
                >{{ planLabel }}</span>
              </p>
            </div>

            <div class="flex flex-col gap-4">
              <!-- Renders -->
              <div class="rounded-lg border p-4">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <p class="text-sm font-medium">Renders ce mois</p>
                    <p class="text-xs text-muted-foreground">
                      Quota mensuel selon ton plan
                    </p>
                  </div>
                  <p class="text-lg font-bold tabular-nums">
                    {{ stats?.rendersThisMonth ?? 0 }}
                    <span class="text-xs font-normal text-muted-foreground">
                      / {{ stats?.rendersLimit ?? 0 }}
                    </span>
                  </p>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full transition-all"
                    :class="usageTone(rendersUsedPct)"
                    :style="{ width: `${Math.max(2, rendersUsedPct)}%` }"
                  />
                </div>
                <p class="mt-1.5 text-[10px] text-muted-foreground">
                  {{ rendersUsedPct }} % utilisé
                </p>
              </div>

              <!-- Stockage -->
              <div class="rounded-lg border p-4">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <p class="text-sm font-medium">Stockage</p>
                    <p class="text-xs text-muted-foreground">
                      Espace occupé par tes projets et modèles 3D
                    </p>
                  </div>
                  <p class="text-lg font-bold tabular-nums">
                    {{ (stats?.storageUsedGb ?? 0).toFixed(2) }} Go
                    <span class="text-xs font-normal text-muted-foreground">
                      / {{ stats?.storageLimitGb ?? 0 }} Go
                    </span>
                  </p>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full transition-all"
                    :class="usageTone(storageUsedPct)"
                    :style="{ width: `${Math.max(2, storageUsedPct)}%` }"
                  />
                </div>
                <p class="mt-1.5 text-[10px] text-muted-foreground">
                  {{ storageUsedPct }} % utilisé
                </p>
              </div>

              <!-- Projets totaux + CTA upgrade si free -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="rounded-lg border p-4">
                  <p class="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Projets sauvegardés
                  </p>
                  <p class="mt-1 text-2xl font-bold tabular-nums">
                    {{ stats?.totalProjects ?? 0 }}
                  </p>
                </div>
                <div class="rounded-lg border bg-primary/5 p-4 flex flex-col justify-between">
                  <div>
                    <p class="text-xs uppercase tracking-wider text-primary font-semibold">
                      Besoin de plus ?
                    </p>
                    <p class="mt-1 text-xs text-muted-foreground">
                      Passe sur Pro ou Enterprise pour augmenter tes quotas.
                    </p>
                  </div>
                  <Button
                    v-if="user?.plan !== 'enterprise'"
                    as-child
                    size="sm"
                    class="mt-3 w-fit rounded-full gap-1.5"
                  >
                    <NuxtLink to="/account/billing" @click="open = false">
                      <Sparkles class="h-3.5 w-3.5" />
                      Mettre à niveau
                    </NuxtLink>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <!-- ── Apparence ─────────────────────────────────────────── -->
          <section v-if="activeSection === 'appearance'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Apparence</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Choisissez le thème de l'interface.
              </p>
            </div>
            <div class="flex gap-2">
              <button
                v-for="t in themes"
                :key="t.value"
                class="flex-1 flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-sm font-medium transition-colors"
                :class="
                  prefs.theme === t.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                "
                @click="setTheme(t.value)"
              >
                <component :is="t.icon" class="h-5 w-5" />
                <span>{{ t.label }}</span>
              </button>
            </div>
          </section>

          <!-- ── Langue ────────────────────────────────────────────── -->
          <section v-if="activeSection === 'language'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Langue</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Choisissez la langue de l'interface.
              </p>
            </div>
            <div class="max-w-xs">
              <Select
                :model-value="prefs.language"
                @update:model-value="
                  updatePreferences({ language: $event as AppLanguage })
                "
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <!-- ── Notifications ─────────────────────────────────────── -->
          <section v-if="activeSection === 'notifications'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Notifications</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Contrôlez les alertes que vous recevez.
              </p>
            </div>
            <div class="space-y-4">
              <div
                v-for="notif in notifToggles"
                :key="notif.key"
                class="flex items-center justify-between"
              >
                <span class="text-sm">{{ notif.label }}</span>
                <button
                  class="relative w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs[notif.key] ? 'bg-primary' : 'bg-muted'"
                  @click="updatePreferences({ [notif.key]: !prefs[notif.key] })"
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs[notif.key] ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
            </div>
          </section>

          <!-- ── Qualité de rendu ───────────────────────────────────── -->
          <section v-if="activeSection === 'render'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Qualité de rendu</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Configurez les paramètres de rendu par défaut.
              </p>
            </div>
            <div class="space-y-5">
              <!-- Qualité -->
              <div>
                <Label class="text-sm font-medium mb-2 block">Qualité</Label>
                <Select
                  :model-value="prefs.renderQuality"
                  @update:model-value="
                    updatePreferences({
                      renderQuality: $event as RenderQuality,
                    })
                  "
                >
                  <SelectTrigger class="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rapide (Brouillon)</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="high">Haute qualité</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Format d'export -->
              <div>
                <Label class="text-sm font-medium mb-2 block"
                  >Format d'export</Label
                >
                <div class="flex gap-2">
                  <button
                    v-for="fmt in formats"
                    :key="fmt"
                    class="px-4 py-2 rounded-md border text-sm font-medium transition-colors"
                    :class="
                      prefs.renderFormat === fmt
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    "
                    @click="updatePreferences({ renderFormat: fmt })"
                  >
                    {{ fmt.toUpperCase() }}
                  </button>
                </div>
              </div>

              <!-- Résolution -->
              <div>
                <Label class="text-sm font-medium mb-2 block"
                  >Résolution maximale</Label
                >
                <div class="flex gap-2">
                  <button
                    v-for="res in resolutions"
                    :key="res.value"
                    class="px-3 py-2 rounded-md border text-sm font-medium transition-colors"
                    :class="
                      prefs.renderResolution === res.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    "
                    @click="updatePreferences({ renderResolution: res.value })"
                  >
                    {{ res.label }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- ── Confidentialité ────────────────────────────────────── -->
          <section v-if="activeSection === 'privacy'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Confidentialité</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Gérez vos données et consentements.
              </p>
            </div>
            <div class="space-y-4">
              <!-- Analytics -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Analytics anonymes</p>
                  <p class="text-xs text-muted-foreground">
                    Aide à améliorer l'application.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.analyticsEnabled ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({
                      analyticsEnabled: !prefs.analyticsEnabled,
                    })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.analyticsEnabled ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
              <!-- Marketing -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Communications marketing</p>
                  <p class="text-xs text-muted-foreground">
                    Offres et nouveautés par email.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.marketingEnabled ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({
                      marketingEnabled: !prefs.marketingEnabled,
                    })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.marketingEnabled ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>

              <div class="pt-4 border-t space-y-2">
                <Transition
                  enter-active-class="transition-all duration-200"
                  leave-active-class="transition-all duration-300"
                  enter-from-class="opacity-0 -translate-y-1"
                  leave-to-class="opacity-0 -translate-y-1"
                >
                  <div
                    v-if="exportToast"
                    class="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800 px-3 py-2 text-xs text-green-700 dark:text-green-400"
                  >
                    <CheckCircle2 class="h-3.5 w-3.5 shrink-0" />
                    Fichier JSON téléchargé avec succès.
                  </div>
                </Transition>
                <Button
                  variant="outline"
                  class="w-full text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/60"
                  @click="exportData"
                >
                  Exporter mes données (JSON)
                </Button>
                <Button
                  variant="outline"
                  class="w-full text-destructive border-destructive/30 hover:bg-destructive/5 hover:border-destructive/60"
                  @click="deleteAccountOpen = true"
                >
                  Supprimer mon compte
                </Button>
              </div>
            </div>
          </section>

          <!-- ── Sécurité ───────────────────────────────────────────── -->
          <section v-if="activeSection === 'security'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Sécurité</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Gérez votre mot de passe et vos sessions.
              </p>
            </div>
            <div class="space-y-4">
              <!-- Mot de passe -->
              <div class="space-y-3">
                <div>
                  <Label class="mb-1.5 block text-sm"
                    >Mot de passe actuel</Label
                  >
                  <div class="relative max-w-xs">
                    <Input
                      v-model="passwordForm.current"
                      :type="showPasswords.current ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pr-10"
                      :class="{
                        'ring-1 ring-destructive': passwordErrors.current,
                      }"
                    />
                    <button
                      class="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                      type="button"
                      @click="showPasswords.current = !showPasswords.current"
                    >
                      <Eye v-if="!showPasswords.current" class="h-4 w-4" />
                      <EyeOff v-else class="h-4 w-4" />
                    </button>
                  </div>
                  <p
                    v-if="passwordErrors.current"
                    class="mt-1 text-xs text-destructive"
                  >
                    {{ passwordErrors.current }}
                  </p>
                </div>
                <div>
                  <Label class="mb-1.5 block text-sm"
                    >Nouveau mot de passe</Label
                  >
                  <div class="relative max-w-xs">
                    <Input
                      v-model="passwordForm.next"
                      :type="showPasswords.next ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pr-10"
                      :class="{
                        'ring-1 ring-destructive': passwordErrors.next,
                      }"
                    />
                    <button
                      class="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                      type="button"
                      @click="showPasswords.next = !showPasswords.next"
                    >
                      <Eye v-if="!showPasswords.next" class="h-4 w-4" />
                      <EyeOff v-else class="h-4 w-4" />
                    </button>
                  </div>
                  <p
                    v-if="passwordErrors.next"
                    class="mt-1 text-xs text-destructive"
                  >
                    {{ passwordErrors.next }}
                  </p>
                </div>
                <div>
                  <Label class="mb-1.5 block text-sm"
                    >Confirmer le mot de passe</Label
                  >
                  <div class="relative max-w-xs">
                    <Input
                      v-model="passwordForm.confirm"
                      :type="showPasswords.confirm ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="pr-10"
                      :class="{
                        'ring-1 ring-destructive': passwordErrors.confirm,
                      }"
                    />
                    <button
                      class="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                      type="button"
                      @click="showPasswords.confirm = !showPasswords.confirm"
                    >
                      <Eye v-if="!showPasswords.confirm" class="h-4 w-4" />
                      <EyeOff v-else class="h-4 w-4" />
                    </button>
                  </div>
                  <p
                    v-if="passwordErrors.confirm"
                    class="mt-1 text-xs text-destructive"
                  >
                    {{ passwordErrors.confirm }}
                  </p>
                </div>
                <div class="flex items-center gap-3 pt-1">
                  <Button @click="changePassword"
                    >Changer le mot de passe</Button
                  >
                  <Transition
                    enter-active-class="transition-opacity duration-200"
                    leave-active-class="transition-opacity duration-300"
                    enter-from-class="opacity-0"
                    leave-to-class="opacity-0"
                  >
                    <span
                      v-if="passwordSuccess"
                      class="flex items-center gap-1.5 text-xs text-green-600"
                    >
                      <CheckCircle2 class="h-3.5 w-3.5" />
                      Mot de passe mis à jour
                    </span>
                  </Transition>
                </div>
              </div>

              <Separator />

              <!-- 2FA -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Authentification à deux facteurs</p>
                  <p class="text-xs text-muted-foreground">
                    <span v-if="prefs.twoFactorEnabled" class="text-green-600">
                      ✓ Activée — un code TOTP sera demandé à la connexion
                    </span>
                    <span v-else>
                      Sécurise ton compte avec un second facteur (app
                      authenticator).
                    </span>
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.twoFactorEnabled ? 'bg-primary' : 'bg-muted'"
                  :disabled="twoFactor.isSubmitting.value"
                  @click="onToggle2fa"
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.twoFactorEnabled ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>

              <Separator />

              <!-- Sessions actives -->
              <div>
                <p class="text-sm font-medium mb-3">Sessions actives</p>
                <div class="space-y-2">
                  <div
                    v-for="session in sessions"
                    :key="session.id"
                    class="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div class="flex items-center gap-3">
                      <component
                        :is="sessionIcon(session.iconType)"
                        class="h-4 w-4 text-muted-foreground shrink-0"
                      />
                      <div>
                        <p class="text-sm font-medium">
                          {{ session.name }}
                          <span
                            v-if="session.isCurrent"
                            class="ml-1.5 inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
                            >Actuelle</span
                          >
                        </p>
                        <p class="text-xs text-muted-foreground">
                          {{ session.location }} ·
                          {{ formatLastActive(session.lastActive) }}
                        </p>
                      </div>
                    </div>
                    <Button
                      v-if="!session.isCurrent"
                      variant="ghost"
                      class="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                      @click="revokeSession(session.id)"
                    >
                      Révoquer
                    </Button>
                    <span v-else class="text-xs text-muted-foreground"
                      >Session actuelle</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ── Accessibilité ──────────────────────────────────────── -->
          <section v-if="activeSection === 'accessibility'">
            <div class="mb-4">
              <p class="text-sm font-semibold">Accessibilité</p>
              <p class="text-xs text-muted-foreground mt-0.5">
                Adaptez l'interface à vos besoins.
              </p>
            </div>
            <div class="space-y-4">
              <!-- Réduire animations -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Réduire les animations</p>
                  <p class="text-xs text-muted-foreground">
                    Désactive les transitions et effets animés.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.reducedMotion ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({ reducedMotion: !prefs.reducedMotion })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.reducedMotion ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
              <!-- Contraste élevé -->
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm">Contraste élevé</p>
                  <p class="text-xs text-muted-foreground">
                    Augmente le contraste des couleurs.
                  </p>
                </div>
                <button
                  class="relative shrink-0 w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  :class="prefs.highContrast ? 'bg-primary' : 'bg-muted'"
                  @click="
                    updatePreferences({ highContrast: !prefs.highContrast })
                  "
                >
                  <span
                    class="absolute top-1 left-1 h-4 w-4 rounded-full bg-background shadow transition-transform"
                    :class="
                      prefs.highContrast ? 'translate-x-4' : 'translate-x-0'
                    "
                  />
                </button>
              </div>
              <!-- Taille de police -->
              <div>
                <Label class="text-sm font-medium mb-2 block"
                  >Taille de police</Label
                >
                <div class="flex gap-2">
                  <button
                    v-for="fs in fontSizes"
                    :key="fs.value"
                    class="px-4 py-2 rounded-md border text-sm font-medium transition-colors"
                    :class="
                      prefs.fontSize === fs.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    "
                    @click="updatePreferences({ fontSize: fs.value })"
                  >
                    {{ fs.label }}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Footer auto-save -->
      <div
        class="flex items-center justify-between gap-2 px-6 py-4 border-t bg-muted/30"
      >
        <p class="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CheckCircle2 class="h-3.5 w-3.5 text-green-500 shrink-0" />
          Modifications enregistrées automatiquement
        </p>
        <Button variant="outline" @click="open = false">Fermer</Button>
      </div>
    </DialogContent>
  </Dialog>

  <!-- AlertDialog suppression compte -->
  <AlertDialog
    :open="deleteAccountOpen"
    @update:open="deleteAccountOpen = $event"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Supprimer votre compte ?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible. Toutes vos données, projets et rendus
          seront définitivement supprimés.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="deleteAccountOpen = false"
          >Annuler</AlertDialogCancel
        >
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="deleteAccount"
        >
          Supprimer définitivement
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <!-- ── Dialog 2FA setup / disable ────────────────────────────────────────── -->
  <Dialog v-model:open="twoFactorDialogOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {{
            twoFactorMode === 'setup'
              ? "Activer l'authentification à 2 facteurs"
              : 'Désactiver le 2FA'
          }}
        </DialogTitle>
        <DialogDescription>
          {{
            twoFactorMode === 'setup'
              ? "Scanne le QR code avec Google Authenticator, Authy ou 1Password, puis saisis le code à 6 chiffres."
              : "Saisis un code TOTP courant pour confirmer la désactivation."
          }}
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-4 py-2">
        <!-- QR code (mode setup uniquement) -->
        <div
          v-if="twoFactorMode === 'setup' && twoFactor.setupData.value"
          class="flex flex-col items-center gap-3"
        >
          <img
            :src="twoFactor.setupData.value.qrCode"
            alt="QR code 2FA"
            class="w-48 h-48 bg-white p-2 rounded-lg border"
          />
          <details class="w-full">
            <summary class="text-xs text-muted-foreground cursor-pointer">
              Saisie manuelle (si le QR ne marche pas)
            </summary>
            <div class="mt-2 flex items-center gap-2">
              <code
                class="flex-1 text-xs font-mono bg-muted px-2 py-1.5 rounded border break-all"
              >
                {{ twoFactor.setupData.value.secret }}
              </code>
            </div>
          </details>
        </div>

        <!-- Erreur -->
        <div
          v-if="twoFactorError"
          class="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2 text-xs text-destructive"
        >
          {{ twoFactorError }}
        </div>

        <!-- Input code -->
        <div class="space-y-2">
          <Label for="2fa-totp-code">Code de vérification</Label>
          <Input
            id="2fa-totp-code"
            v-model="twoFactorCode"
            type="text"
            inputmode="numeric"
            pattern="[0-9]{6}"
            maxlength="6"
            placeholder="123456"
            autocomplete="one-time-code"
            class="font-mono tracking-widest text-lg text-center"
          />
        </div>
      </div>

      <DialogFooter class="flex-col sm:flex-row gap-2">
        <Button variant="ghost" @click="cancel2faDialog">Annuler</Button>
        <Button
          :disabled="twoFactor.isSubmitting.value || twoFactorCode.length !== 6"
          :class="
            twoFactorMode === 'disable'
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : ''
          "
          @click="
            twoFactorMode === 'setup' ? submit2faSetup() : submit2faDisable()
          "
        >
          {{
            twoFactor.isSubmitting.value
              ? '…'
              : twoFactorMode === 'setup'
                ? 'Activer'
                : 'Désactiver'
          }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, type Component } from 'vue'
import {
  Accessibility,
  Activity,
  AtSign,
  Bell,
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  Image,
  Loader2,
  Lock,
  Monitor,
  Moon,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  User as UserIcon,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import type {
  AppLanguage,
  RenderQuality,
  RenderFormat,
} from '~/composables/useUser'

// ─── defineModel ──────────────────────────────────────────────────────────────
const open = defineModel<boolean>('open', { default: false })

// ─── Composables ──────────────────────────────────────────────────────────────
const {
  preferences,
  updatePreferences,
  user,
  stats,
  sessions,
  fetchSessions,
  fetchMe,
  revokeSession,
  changePassword: apiChangePassword,
  planLabel,
} = useUser()

// Couleur du badge plan (cohérent avec UserNav)
const planBadgeClass = computed(() => {
  switch (user.value?.plan) {
    case 'pro':
      return 'bg-primary/10 text-primary'
    case 'enterprise':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
    default:
      return 'bg-muted text-muted-foreground'
  }
})
const twoFactor = use2fa()
const colorMode = useColorMode()

const prefs = computed(() => preferences.value)

// ─── Fetch sessions à l'ouverture du dialog ───────────────────────────────────
watch(open, async newVal => {
  if (newVal) {
    try {
      await fetchSessions()
    } catch (e) {
      logger.warn('[settings] fetch sessions failed', e)
    }
  }
})

// ─── Navigation ───────────────────────────────────────────────────────────────
type SectionId =
  | 'account'
  | 'usage'
  | 'appearance'
  | 'language'
  | 'notifications'
  | 'render'
  | 'privacy'
  | 'security'
  | 'accessibility'

const activeSection = ref<SectionId>('account')

const navItems: { id: SectionId; icon: Component; label: string }[] = [
  { id: 'account', icon: UserIcon, label: 'Compte' },
  { id: 'usage', icon: Activity, label: 'Utilisation' },
  { id: 'appearance', icon: Palette, label: 'Apparence' },
  { id: 'language', icon: Globe, label: 'Langue' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'render', icon: Image, label: 'Qualité' },
  { id: 'privacy', icon: Lock, label: 'Confidentialité' },
  { id: 'security', icon: ShieldCheck, label: 'Sécurité' },
  { id: 'accessibility', icon: Accessibility, label: 'Accessibilité' },
]

// ─── Compte : form local (name + avatar uploadable) ─────────────────────
const accountForm = reactive({
  name: '',
  avatarUrl: '',
})
const accountErrors = reactive({ name: '', avatar: '' })
const isSavingAccount = ref(false)
const accountSaveSuccess = ref(false)
const avatarInputRef = ref<HTMLInputElement>()

// Sync form depuis user à l'ouverture du dialog (et au switch section)
watch(
  [open, () => user.value.id],
  () => {
    accountForm.name = user.value.name
    accountForm.avatarUrl = user.value.avatarUrl
    accountErrors.name = ''
    accountErrors.avatar = ''
  },
  { immediate: true },
)

function triggerAvatarInput() {
  avatarInputRef.value?.click()
}

function handleAvatarFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    accountErrors.avatar = 'Fichier trop volumineux (max 2 Mo).'
    return
  }
  accountErrors.avatar = ''
  const reader = new FileReader()
  reader.onload = ev => {
    accountForm.avatarUrl = (ev.target?.result as string) || ''
  }
  reader.readAsDataURL(file)
}

async function saveAccount() {
  accountErrors.name = ''
  if (!accountForm.name.trim()) {
    accountErrors.name = 'Le nom est requis.'
    return
  }
  isSavingAccount.value = true
  try {
    const { updateProfile } = useUser()
    await updateProfile({
      name: accountForm.name.trim(),
      avatarUrl: accountForm.avatarUrl,
    })
    accountSaveSuccess.value = true
    toast.success('Profil mis à jour.')
    setTimeout(() => { accountSaveSuccess.value = false }, 2000)
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    toast.error(err.data?.detail || 'Impossible de sauvegarder le profil.')
  } finally {
    isSavingAccount.value = false
  }
}

const accountInitials = computed(() => {
  const n = accountForm.name.trim() || user.value.name
  if (!n) return '?'
  return n
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('') || '?'
})

// ─── Utilisation : helpers de jauges (renders + storage) ─────────────────
const rendersUsedPct = computed(() => {
  const s = stats.value
  if (!s || !s.rendersLimit) return 0
  return Math.min(100, Math.round((s.rendersThisMonth / s.rendersLimit) * 100))
})

const storageUsedPct = computed(() => {
  const s = stats.value
  if (!s || !s.storageLimitGb) return 0
  return Math.min(100, Math.round((s.storageUsedGb / s.storageLimitGb) * 100))
})

function usageTone(pct: number): string {
  if (pct >= 90) return 'bg-destructive'
  if (pct >= 70) return 'bg-amber-500'
  return 'bg-primary'
}

// ─── Apparence ────────────────────────────────────────────────────────────────
const themes = [
  { value: 'light', icon: Sun, label: 'Clair' },
  { value: 'dark', icon: Moon, label: 'Sombre' },
  { value: 'system', icon: Monitor, label: 'Système' },
] as const

const setTheme = (value: 'light' | 'dark' | 'system') => {
  updatePreferences({ theme: value })
  colorMode.preference = value
}

// ─── Qualité de rendu ─────────────────────────────────────────────────────────
const formats: RenderFormat[] = ['png', 'jpg', 'webp']

const resolutions = [
  { value: '1024' as const, label: '1024 px' },
  { value: '2048' as const, label: '2048 px' },
  { value: '4096' as const, label: '4096 px' },
]

const fontSizes = [
  { value: 'small' as const, label: 'A petit' },
  { value: 'medium' as const, label: 'A moyen' },
  { value: 'large' as const, label: 'A grand' },
]

// ─── Notifications (tableau pour v-for) ───────────────────────────────────────
type PrefBoolKey =
  | 'notifEmailRender'
  | 'notifEmailNewsletter'
  | 'notifPushRender'
  | 'notifPushMentions'

const notifToggles: { key: PrefBoolKey; label: string }[] = [
  { key: 'notifEmailRender', label: 'Email — Rendu terminé' },
  { key: 'notifEmailNewsletter', label: 'Email — Newsletter' },
  { key: 'notifPushRender', label: 'Push — Rendu terminé' },
  { key: 'notifPushMentions', label: 'Push — Mentions' },
]

// ─── Mot de passe ─────────────────────────────────────────────────────────────
const passwordForm = reactive({ current: '', next: '', confirm: '' })
const showPasswords = reactive({ current: false, next: false, confirm: false })
const passwordErrors = reactive({ current: '', next: '', confirm: '' })
const passwordSuccess = ref(false)

const changePassword = async () => {
  passwordErrors.current = ''
  passwordErrors.next = ''
  passwordErrors.confirm = ''
  passwordSuccess.value = false

  let hasError = false
  if (!passwordForm.current) {
    passwordErrors.current = 'Veuillez saisir votre mot de passe actuel'
    hasError = true
  }
  if (!passwordForm.next) {
    passwordErrors.next = 'Veuillez saisir un nouveau mot de passe'
    hasError = true
  } else if (passwordForm.next.length < 8) {
    passwordErrors.next = 'Le mot de passe doit contenir au moins 8 caractères'
    hasError = true
  }
  if (!passwordForm.confirm) {
    passwordErrors.confirm = 'Veuillez confirmer le nouveau mot de passe'
    hasError = true
  } else if (passwordForm.next && passwordForm.next !== passwordForm.confirm) {
    passwordErrors.confirm = 'Les mots de passe ne correspondent pas'
    hasError = true
  }
  if (hasError) return

  try {
    await apiChangePassword(passwordForm.current, passwordForm.next)
    passwordForm.current = ''
    passwordForm.next = ''
    passwordForm.confirm = ''
    passwordSuccess.value = true
    setTimeout(() => (passwordSuccess.value = false), 4000)
  } catch (e: unknown) {
    const err = e as { data?: Record<string, string[] | string> }
    const data = err?.data || {}
    if (data.current_password) {
      passwordErrors.current = Array.isArray(data.current_password)
        ? data.current_password[0] ?? ''
        : String(data.current_password)
    } else if (data.new_password) {
      passwordErrors.next = Array.isArray(data.new_password)
        ? data.new_password[0] ?? ''
        : String(data.new_password)
    } else if (data.new_password_confirm) {
      passwordErrors.confirm = Array.isArray(data.new_password_confirm)
        ? data.new_password_confirm[0] ?? ''
        : String(data.new_password_confirm)
    } else {
      toast.error('Impossible de changer le mot de passe.')
    }
  }
}

// ─── 2FA — flow setup / disable ───────────────────────────────────────────────
const twoFactorDialogOpen = ref(false)
const twoFactorMode = ref<'setup' | 'disable'>('setup')
const twoFactorCode = ref('')
const twoFactorError = ref('')

async function onToggle2fa() {
  twoFactorError.value = ''
  twoFactorCode.value = ''
  if (prefs.value.twoFactorEnabled) {
    // Désactivation → demande un code
    twoFactorMode.value = 'disable'
    twoFactorDialogOpen.value = true
  } else {
    // Activation → demande au backend de générer un QR code
    twoFactorMode.value = 'setup'
    try {
      await twoFactor.setup()
      twoFactorDialogOpen.value = true
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      toast.error(err?.data?.detail || 'Impossible de démarrer le 2FA.')
    }
  }
}

async function submit2faSetup() {
  twoFactorError.value = ''
  if (twoFactorCode.value.length !== 6) {
    twoFactorError.value = 'Le code fait 6 chiffres.'
    return
  }
  try {
    await twoFactor.verifySetup(twoFactorCode.value)
    await fetchMe()
    twoFactorDialogOpen.value = false
    twoFactorCode.value = ''
    toast.success('2FA activé.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    twoFactorError.value = err?.data?.detail || 'Code invalide.'
  }
}

async function submit2faDisable() {
  twoFactorError.value = ''
  if (twoFactorCode.value.length !== 6) {
    twoFactorError.value = 'Le code fait 6 chiffres.'
    return
  }
  try {
    await twoFactor.disable(twoFactorCode.value)
    await fetchMe()
    twoFactorDialogOpen.value = false
    twoFactorCode.value = ''
    toast.success('2FA désactivé.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    twoFactorError.value = err?.data?.detail || 'Code invalide.'
  }
}

function cancel2faDialog() {
  twoFactor.cancelSetup()
  twoFactorDialogOpen.value = false
  twoFactorCode.value = ''
  twoFactorError.value = ''
}

// ─── Formatage relatif des sessions ───────────────────────────────────────────
function formatLastActive(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = Date.now() - d.getTime()
  if (diff < 60_000) return "à l'instant"
  if (diff < 3_600_000) return `il y a ${Math.floor(diff / 60_000)} min`
  if (diff < 86_400_000) return `il y a ${Math.floor(diff / 3_600_000)} h`
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}

// ─── Sessions — icône selon type ─────────────────────────────────────────────
function sessionIcon(type: 'monitor' | 'smartphone' | 'tablet') {
  if (type === 'smartphone') return Smartphone
  if (type === 'tablet') return Tablet
  return Monitor
}

// ─── Accessibilité — effets DOM en temps réel ─────────────────────────────────
watch(
  () => prefs.value.reducedMotion,
  val => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('reduce-motion', val)
  }
)

watch(
  () => prefs.value.highContrast,
  val => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('high-contrast', val)
  }
)

watch(
  () => prefs.value.fontSize,
  val => {
    if (!import.meta.client) return
    document.documentElement.dataset.fontSize = val
  }
)

// ─── Langue — attribut lang sur <html> ────────────────────────────────────────
watch(
  () => prefs.value.language,
  val => {
    if (!import.meta.client) return
    document.documentElement.lang = val
  },
  { immediate: true }
)

// ─── Notifications push ───────────────────────────────────────────────────────
watch(
  () => prefs.value.notifPushRender,
  async val => {
    if (!val || !import.meta.client) return
    if (!('Notification' in window)) return
    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission()
      if (result !== 'granted') {
        // Revenir en arrière si refusé
        updatePreferences({ notifPushRender: false })
        toast.error('Notifications refusées par le navigateur.')
      }
    } else if (Notification.permission === 'denied') {
      updatePreferences({ notifPushRender: false })
      toast.error(
        'Notifications bloquées. Autorisez-les dans les paramètres du navigateur.'
      )
    }
  }
)

watch(
  () => prefs.value.notifPushMentions,
  async val => {
    if (!val || !import.meta.client) return
    if (!('Notification' in window)) return
    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission()
      if (result !== 'granted') {
        updatePreferences({ notifPushMentions: false })
        toast.error('Notifications refusées par le navigateur.')
      }
    } else if (Notification.permission === 'denied') {
      updatePreferences({ notifPushMentions: false })
      toast.error(
        'Notifications bloquées. Autorisez-les dans les paramètres du navigateur.'
      )
    }
  }
)

// ─── Confidentialité ──────────────────────────────────────────────────────────
const deleteAccountOpen = ref(false)
const exportToast = ref(false)

const exportData = () => {
  if (!import.meta.client) return
  const payload = {
    exportedAt: new Date().toISOString(),
    profile: user.value,
    stats: stats.value,
    preferences: preferences.value,
  }
  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vizhome-data-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  exportToast.value = true
  setTimeout(() => (exportToast.value = false), 4000)
  toast.success('Export téléchargé.')
}

const deleteAccount = () => {
  deleteAccountOpen.value = false
  if (!import.meta.client) return
  localStorage.clear()
  navigateTo('/')
}
</script>
