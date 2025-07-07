<template>
    <div class="space-y-8">
        <div>
            <h1 class="text-3xl font-bold tracking-tight">Authentification</h1>
            <p class="text-lg text-muted-foreground mt-2">
                Sécuriser l'accès à votre compte et vos projets
            </p>
        </div>

        <!-- Introduction -->
        <Card>
            <CardContent class="pt-6">
                <p>
                    La sécurité est une priorité chez VizHome. Cette page détaille les différentes méthodes
                    d'authentification disponibles,
                    la gestion des utilisateurs et des accès, ainsi que les bonnes pratiques pour sécuriser votre compte
                    et vos données.
                </p>
            </CardContent>
        </Card>

        <!-- Méthodes d'authentification -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Méthodes d'authentification</h2>
            <Card>
                <CardContent class="pt-6">
                    <p class="mb-4">
                        VizHome propose plusieurs méthodes d'authentification pour s'adapter à vos besoins et à votre
                        politique de sécurité :
                    </p>

                    <div class="space-y-6">
                        <div class="border rounded-lg p-4">
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex h-10 w-15 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <MailIcon class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-medium">Email et mot de passe</h3>
                                    <p class="text-sm text-muted-foreground mt-1">
                                        Méthode traditionnelle avec une adresse email et un mot de passe fort. Inclut
                                        une validation par email
                                        lors de la création de compte et la possibilité de réinitialiser le mot de
                                        passe.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="border rounded-lg p-4">
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex h-10 w-15 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <ShieldCheckIcon class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-medium">Authentification à deux facteurs (2FA)</h3>
                                    <p class="text-sm text-muted-foreground mt-1">
                                        Couche de sécurité supplémentaire qui demande un code temporaire généré par une
                                        application d'authentification
                                        (Google Authenticator, Microsoft Authenticator, Authy) ou envoyé par SMS.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="border rounded-lg p-4">
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex h-10 w-15 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <KeyIcon class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-medium">Single Sign-On (SSO)</h3>
                                    <p class="text-sm text-muted-foreground mt-1">
                                        Pour les comptes entreprise, intégration avec votre fournisseur d'identité
                                        existant via les protocoles
                                        SAML 2.0 ou OAuth 2.0 (Okta, Azure AD, Google Workspace, etc.).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="border rounded-lg p-4">
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex h-10 w-15 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <GlobeIcon class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-medium">Authentification sociale</h3>
                                    <p class="text-sm text-muted-foreground mt-1">
                                        Connexion rapide via Google, Apple, Microsoft ou Facebook, pour les comptes
                                        individuels ou freemium.
                                        Simplifie l'accès tout en maintenant un niveau de sécurité élevé.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="border rounded-lg p-4">
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex h-10 w-15 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <ScanFaceIcon class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-medium">Authentification biométrique</h3>
                                    <p class="text-sm text-muted-foreground mt-1">
                                        Sur les appareils compatibles, possibilité d'utiliser Touch ID, Face ID ou
                                        Windows Hello
                                        pour une connexion plus rapide et sécurisée à l'application mobile et desktop.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Configuration 2FA -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Configuration de l'authentification à deux facteurs</h2>
            <Card>
                <CardContent class="pt-6">
                    <p class="mb-4">
                        L'authentification à deux facteurs est fortement recommandée pour tous les utilisateurs. Voici
                        comment la configurer :
                    </p>

                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                1
                            </div>
                            <div class="space-y-1">
                                <h3 class="text-base font-medium">Accédez aux paramètres de sécurité</h3>
                                <p class="text-sm text-muted-foreground">
                                    Dans le menu utilisateur, sélectionnez <span
                                        class="px-2 py-1 bg-muted rounded text-xs">Profil > Sécurité > Authentification
                                        à deux facteurs</span>.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                2
                            </div>
                            <div class="space-y-1">
                                <h3 class="text-base font-medium">Choisissez une méthode 2FA</h3>
                                <p class="text-sm text-muted-foreground">
                                    Sélectionnez entre une application d'authentification (recommandé) ou SMS.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                3
                            </div>
                            <div class="space-y-1">
                                <h3 class="text-base font-medium">Configuration de l'application</h3>
                                <p class="text-sm text-muted-foreground">
                                    Scannez le code QR avec votre application d'authentification (Google Authenticator,
                                    Microsoft Authenticator, Authy)
                                    ou entrez le code manuellement.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                4
                            </div>
                            <div class="space-y-1">
                                <h3 class="text-base font-medium">Validation</h3>
                                <p class="text-sm text-muted-foreground">
                                    Entrez le code à 6 chiffres généré par l'application pour confirmer la
                                    configuration.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                5
                            </div>
                            <div class="space-y-1">
                                <h3 class="text-base font-medium">Codes de secours</h3>
                                <p class="text-sm text-muted-foreground">
                                    Téléchargez et conservez en lieu sûr les codes de secours qui vous permettront de
                                    vous connecter
                                    si vous perdez accès à votre appareil.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <div class="border rounded-lg overflow-hidden">
                            <img src="/images/generate/image_generate.png" alt="Configuration 2FA" class="w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Historique de connexion -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Historique de connexion et appareils actifs</h2>
            <Card>
                <CardContent class="pt-6">
                    <p class="mb-4">
                        VizHome garde une trace de toutes vos connexions et vous permet de gérer les sessions actives
                        pour une sécurité optimale.
                    </p>

                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-medium mb-2">Historique des connexions</h3>
                            <p class="text-sm text-muted-foreground mb-3">
                                Consultez l'historique complet de vos connexions avec des informations détaillées :
                            </p>
                            <div class="border rounded-lg overflow-x-auto">
                                <table class="w-full text-sm">
                                    <thead>
                                        <tr class="bg-muted border-b">
                                            <th class="px-4 py-2 text-left font-medium">Date et heure</th>
                                            <th class="px-4 py-2 text-left font-medium">Appareil</th>
                                            <th class="px-4 py-2 text-left font-medium">Localisation</th>
                                            <th class="px-4 py-2 text-left font-medium">Adresse IP</th>
                                            <th class="px-4 py-2 text-left font-medium">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b">
                                            <td class="px-4 py-2">15/06/2023 14:32</td>
                                            <td class="px-4 py-2">Chrome 114 - Windows 11</td>
                                            <td class="px-4 py-2">Paris, France</td>
                                            <td class="px-4 py-2">198.51.100.42</td>
                                            <td class="px-4 py-2"><span class="text-green-600 flex items-center gap-1">
                                                    <CheckCircleIcon class="h-3 w-3" /> Réussie
                                                </span></td>
                                        </tr>
                                        <tr class="border-b">
                                            <td class="px-4 py-2">14/06/2023 09:15</td>
                                            <td class="px-4 py-2">Safari - iPhone 14</td>
                                            <td class="px-4 py-2">Paris, France</td>
                                            <td class="px-4 py-2">198.51.100.17</td>
                                            <td class="px-4 py-2"><span class="text-green-600 flex items-center gap-1">
                                                    <CheckCircleIcon class="h-3 w-3" /> Réussie
                                                </span></td>
                                        </tr>
                                        <tr>
                                            <td class="px-4 py-2">12/06/2023 21:47</td>
                                            <td class="px-4 py-2">Chrome 114 - Windows 11</td>
                                            <td class="px-4 py-2">Lyon, France</td>
                                            <td class="px-4 py-2">198.51.100.89</td>
                                            <td class="px-4 py-2"><span class="text-red-600 flex items-center gap-1">
                                                    <XCircleIcon class="h-3 w-3" /> Échouée
                                                </span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium mb-2">Appareils connectés</h3>
                            <p class="text-sm text-muted-foreground mb-3">
                                Gérez les sessions actives sur tous vos appareils :
                            </p>
                            <div class="space-y-3">
                                <div class="border rounded-lg p-4">
                                    <div class="flex items-start gap-3">
                                        <div
                                            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <LaptopIcon class="h-5 w-5" />
                                        </div>
                                        <div class="grow">
                                            <div class="flex justify-between items-start">
                                                <div>
                                                    <h4 class="font-medium">Windows PC - Chrome</h4>
                                                    <p class="text-xs text-muted-foreground">Paris, France -
                                                        198.51.100.42</p>
                                                    <p class="text-xs text-muted-foreground mt-1">Dernière activité : Il
                                                        y a 10 minutes</p>
                                                </div>
                                                <div class="flex gap-2">
                                                    <Button variant="outline" size="sm" class="text-xs">Cet
                                                        appareil</Button>
                                                    <Button variant="destructive" size="sm"
                                                        class="text-xs">Déconnecter</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border rounded-lg p-4">
                                    <div class="flex items-start gap-3">
                                        <div
                                            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <SmartphoneIcon class="h-5 w-5" />
                                        </div>
                                        <div class="grow">
                                            <div class="flex justify-between items-start">
                                                <div>
                                                    <h4 class="font-medium">iPhone 14 - Safari</h4>
                                                    <p class="text-xs text-muted-foreground">Paris, France -
                                                        198.51.100.17</p>
                                                    <p class="text-xs text-muted-foreground mt-1">Dernière activité : Il
                                                        y a 1 jour</p>
                                                </div>
                                                <Button variant="destructive" size="sm"
                                                    class="text-xs">Déconnecter</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 bg-primary/5 p-4 rounded-lg">
                        <div class="flex items-start gap-3">
                            <AlertCircleIcon class="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <p class="text-sm font-medium">Activité suspecte ?</p>
                                <p class="text-sm text-muted-foreground mt-1">
                                    Si vous remarquez des connexions que vous ne reconnaissez pas, déconnectez
                                    immédiatement l'appareil,
                                    changez votre mot de passe et contactez notre support.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Gestion des utilisateurs et des accès -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Gestion des utilisateurs et des accès</h2>
            <Card>
                <CardContent class="pt-6">
                    <p class="mb-4">
                        Les comptes d'entreprise peuvent gérer finement les utilisateurs et leurs droits d'accès à la
                        plateforme VizHome :
                    </p>

                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-medium mb-2">Rôles et permissions</h3>
                            <p class="text-sm text-muted-foreground mb-3">
                                VizHome propose différents niveaux d'accès pour répondre à vos besoins organisationnels
                                :
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="border rounded-lg p-4">
                                    <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                                        <UserCogIcon class="h-4 w-4 text-primary" />
                                        Administrateur
                                    </h4>
                                    <ul class="text-xs text-muted-foreground space-y-1 mt-2">
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Accès complet à tous les projets</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Gestion des utilisateurs et des rôles</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Gestion de la facturation</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Configuration de l'authentification</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="border rounded-lg p-4">
                                    <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                                        <UserPlusIcon class="h-4 w-4 text-primary" />
                                        Chef de projet
                                    </h4>
                                    <ul class="text-xs text-muted-foreground space-y-1 mt-2">
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Création et modification de projets</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Gestion des collaborateurs sur leurs projets</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Accès aux rapports et statistiques</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <XIcon class="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                            <span>Pas d'accès à la facturation</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="border rounded-lg p-4">
                                    <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                                        <UserIcon class="h-4 w-4 text-primary" />
                                        Collaborateur
                                    </h4>
                                    <ul class="text-xs text-muted-foreground space-y-1 mt-2">
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Accès aux projets partagés uniquement</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <CheckIcon class="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                            <span>Édition selon les permissions accordées</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <XIcon class="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                            <span>Pas de création de nouveaux projets</span>
                                        </li>
                                        <li class="flex items-start gap-1">
                                            <XIcon class="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                            <span>Pas d'accès aux paramètres du compte</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium mb-2">Gestion de l'équipe</h3>
                            <p class="text-sm text-muted-foreground mb-3">
                                L'interface de gestion d'équipe permet aux administrateurs de :
                            </p>
                            <div class="border rounded-lg overflow-hidden">
                                <img src="/images/generate/image_generate.png" alt="Gestion des utilisateurs"
                                    class="w-full" />
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div class="border rounded-lg p-3">
                                    <h4 class="text-sm font-medium mb-1">Inviter des utilisateurs</h4>
                                    <p class="text-xs text-muted-foreground">
                                        Envoyez des invitations par email avec un rôle prédéfini et un message
                                        personnalisé.
                                    </p>
                                </div>
                                <div class="border rounded-lg p-3">
                                    <h4 class="text-sm font-medium mb-1">Modifier les rôles</h4>
                                    <p class="text-xs text-muted-foreground">
                                        Ajustez les permissions des utilisateurs selon l'évolution de leurs
                                        responsabilités.
                                    </p>
                                </div>
                                <div class="border rounded-lg p-3">
                                    <h4 class="text-sm font-medium mb-1">Suspendre l'accès</h4>
                                    <p class="text-xs text-muted-foreground">
                                        Désactivez temporairement un compte sans perdre les données associées.
                                    </p>
                                </div>
                                <div class="border rounded-lg p-3">
                                    <h4 class="text-sm font-medium mb-1">Révoquer l'accès</h4>
                                    <p class="text-xs text-muted-foreground">
                                        Supprimez définitivement un utilisateur de votre organisation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Bonnes pratiques de sécurité -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Bonnes pratiques de sécurité</h2>
            <Card>
                <CardContent class="pt-6">
                    <p class="mb-4">
                        Pour garantir la sécurité de votre compte et de vos données, nous recommandons les bonnes
                        pratiques suivantes :
                    </p>

                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                                <RectangleEllipsis  class="h-5 w-5" />
                            </div>
                            <div>
                                <h3 class="font-medium">Mots de passe forts</h3>
                                <p class="text-sm text-muted-foreground mt-1">
                                    Utilisez des mots de passe uniques d'au moins 12 caractères, incluant des lettres
                                    majuscules et minuscules, des chiffres et des symboles.
                                    Considérez l'utilisation d'un gestionnaire de mots de passe comme 1Password,
                                    LastPass ou Bitwarden.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                                <ShieldIcon class="h-5 w-5" />
                            </div>
                            <div>
                                <h3 class="font-medium">Activation de la 2FA</h3>
                                <p class="text-sm text-muted-foreground mt-1">
                                    Activez l'authentification à deux facteurs pour tous les utilisateurs, en
                                    particulier pour les comptes
                                    administrateurs. Préférez les applications d'authentification aux SMS pour une
                                    meilleure sécurité.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                                <UsersIcon class="h-5 w-5" />
                            </div>
                            <div>
                                <h3 class="font-medium">Principe du moindre privilège</h3>
                                <p class="text-sm text-muted-foreground mt-1">
                                    Attribuez à chaque utilisateur uniquement les droits d'accès nécessaires à ses
                                    fonctions. Limitez le nombre
                                    d'administrateurs et révisez régulièrement les permissions.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                                <ClockIcon class="h-5 w-5" />
                            </div>
                            <div>
                                <h3 class="font-medium">Surveillance régulière</h3>
                                <p class="text-sm text-muted-foreground mt-1">
                                    Consultez régulièrement l'historique des connexions et les appareils actifs pour
                                    détecter toute activité
                                    suspecte. Configurez des alertes en cas de connexion depuis un nouvel appareil ou
                                    une nouvelle localisation.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                                <LogOutIcon class="h-5 w-5" />
                            </div>
                            <div>
                                <h3 class="font-medium">Déconnexion des sessions inactives</h3>
                                <p class="text-sm text-muted-foreground mt-1">
                                    Configurez la déconnexion automatique après une période d'inactivité et
                                    déconnectez-vous manuellement
                                    des appareils partagés ou publics. Nous recommandons un délai d'inactivité de 15 à
                                    30 minutes maximum.
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                                <RefreshCwIcon class="h-5 w-5" />
                            </div>
                            <div>
                                <h3 class="font-medium">Rotation régulière des mots de passe et des clés API</h3>
                                <p class="text-sm text-muted-foreground mt-1">
                                    Changez vos mots de passe tous les 3 à 6 mois et renouvelez vos clés API
                                    régulièrement,
                                    surtout après le départ d'un membre de l'équipe ayant eu accès à ces informations.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                        <div class="flex items-start gap-3">
                            <LightbulbIcon class="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                                <p class="text-sm font-medium text-yellow-800">Conseil de sécurité</p>
                                <p class="text-sm text-yellow-700 mt-1">
                                    VizHome ne vous demandera jamais votre mot de passe ou vos codes 2FA par email ou
                                    téléphone.
                                    Méfiez-vous des tentatives de phishing et signalez-les immédiatement à notre équipe
                                    de sécurité.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Pages associées -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Pages associées</h2>
            <div class="grid gap-4 md:grid-cols-3">
                <NuxtLink to="/docs/api">
                    <Card class="h-full transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle class="text-base">API</CardTitle>
                            <CardDescription>Documentation de l'API RESTful</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground">
                                Apprenez à sécuriser vos intégrations API avec des tokens d'authentification.
                            </p>
                        </CardContent>
                    </Card>
                </NuxtLink>
                <NuxtLink to="/docs/api/projets">
                    <Card class="h-full transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle class="text-base">Projets</CardTitle>
                            <CardDescription>Gestion de vos projets</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground">
                                Découvrez comment gérer les collaborateurs et les permissions au niveau des projets.
                            </p>
                        </CardContent>
                    </Card>
                </NuxtLink>
                <NuxtLink to="/docs/api/webhooks">
                    <Card class="h-full transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle class="text-base">Webhooks</CardTitle>
                            <CardDescription>Intégration et automatisation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p class="text-sm text-muted-foreground">
                                Configurez des webhooks sécurisés pour une intégration transparente avec vos systèmes.
                            </p>
                        </CardContent>
                    </Card>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
  MailIcon,
  ShieldCheckIcon,
  KeyIcon,
  GlobeIcon,
  ScanFaceIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  LaptopIcon,
  SmartphoneIcon,
  UserCogIcon,
  UserPlusIcon,
    UserIcon,
    CheckIcon,
    XIcon,
    RectangleEllipsis ,
    ShieldIcon,
    UsersIcon,
    ClockIcon,
    LogOutIcon,
    RefreshCwIcon,
    LightbulbIcon
} from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})
</script>