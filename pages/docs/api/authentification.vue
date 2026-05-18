<template>
  <div class="space-y-8 w-full">
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Authentification</h1>
      <p class="text-lg text-muted-foreground mt-2">
        JWT (access + refresh), OAuth Google &amp; GitHub, 2FA TOTP.
      </p>
    </header>

    <!-- Intro -->
    <Card>
      <CardContent class="pt-6 text-sm space-y-2">
        <p>
          L'API utilise des
          <strong>JSON Web Tokens (JWT)</strong> via
          <code class="text-xs">djangorestframework-simplejwt</code>. Deux
          tokens sont émis à la connexion :
        </p>
        <ul class="pl-4 space-y-1">
          <li>
            • <strong>access_token</strong> — valide
            <strong>15 minutes</strong>, envoyé dans chaque requête via le
            header <code class="text-xs">Authorization: Bearer …</code>
          </li>
          <li>
            • <strong>refresh_token</strong> — valide
            <strong>7 jours</strong>, sert à obtenir un nouvel access_token
            sans re-saisir le mot de passe. <strong>Rotation activée</strong>
            (un nouveau refresh est émis à chaque refresh) +
            <strong>blacklist</strong> à la déconnexion.
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Register -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Inscription</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">POST /auth/register</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Throttle : <strong>5 inscriptions / heure / IP</strong>. Crée le
            User + son <code class="text-xs">UserPreferences</code> + ses
            <code class="text-xs">UserStats</code> (quotas plan free).
          </p>
          <p class="font-semibold">Request</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
&#123;
  "email": "jean@exemple.fr",
  "first_name": "Jean",
  "last_name": "Dupont",
  "password": "SecurePass1!",
  "password_confirm": "SecurePass1!"
&#125;</pre>
          <p class="font-semibold">Response 201</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
&#123;
  "user": &#123;
    "id": 1,
    "email": "jean@exemple.fr",
    "first_name": "Jean",
    "last_name": "Dupont",
    "name": "Jean Dupont",
    "plan": "free",
    "stats": &#123; "renders_limit": 5, "storage_limit_bytes": 1073741824, ... &#125;,
    "preferences": &#123; "theme": "system", "language": "fr", ... &#125;
  &#125;,
  "access": "eyJ...",
  "refresh": "eyJ..."
&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Login -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Connexion</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">POST /auth/login</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Throttle <code class="text-xs">login</code> : 20/min/IP. Aussi
            verrouillé par <code class="text-xs">django-axes</code> après
            <strong>5 échecs</strong> sur le couple (email + IP) →
            <strong>15 min</strong> de blocage.
          </p>
          <p>
            Crée une <code class="text-xs">UserSession</code> en DB liée au
            refresh token (pour la révocation par device).
          </p>
          <p class="font-semibold">Request</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "email": "jean@exemple.fr",
  "password": "SecurePass1!"
&#125;</pre>
          <p class="font-semibold">Response 200 (sans 2FA)</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "user": &#123; ... &#125;,
  "access": "eyJ...",
  "refresh": "eyJ..."
&#125;</pre>
          <p class="font-semibold">
            Response 200 (avec 2FA actif → challenge en 2 étapes)
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "require_2fa": true,
  "challenge_token": "AbCd_xy...",
  "expires_in": 300
&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Refresh -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Refresh du token</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">POST /auth/refresh</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            À appeler quand l'access_token renvoie 401. Avec la rotation
            activée, l'ancien refresh est blacklisté et un nouveau est émis
            avec la réponse.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123; "refresh": "eyJ..." &#125;

→ 200 OK
&#123;
  "access": "eyJ...",   // nouveau
  "refresh": "eyJ..."   // nouveau aussi (rotation)
&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Logout -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Déconnexion</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">POST /auth/logout</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Blacklist le refresh token côté DB et marque la
            <code class="text-xs">UserSession</code> comme révoquée. Le
            access_token reste valide jusqu'à expiration (max 15 min).
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >Authorization: Bearer &lt;access&gt;

&#123; "refresh": "eyJ..." &#125;

→ 204 No Content</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Password reset -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Réinitialisation du mot de passe</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /auth/forgot-password
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Throttle <code class="text-xs">forgot-password</code> :
            3/heure/IP. Renvoie <strong>toujours 204</strong> même si
            l'email n'existe pas (anti-énumération).
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123; "email": "jean@exemple.fr" &#125;

→ 204 No Content</pre>
          <p>
            Si l'email existe, un mail est envoyé avec un lien vers
            <code class="text-xs">FRONTEND_URL/auth/reset-password?uid=&amp;token=</code>.
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /auth/reset-password
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Valide les uid + token via
            <code class="text-xs">PasswordResetTokenGenerator</code> (durée
            de vie ~3 jours). Révoque toutes les sessions du user après
            succès.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "uid": "MQ",
  "token": "abc-12345...",
  "password": "NewPass1!",
  "password_confirm": "NewPass1!"
&#125;

→ 204 No Content</pre>
        </CardContent>
      </Card>
    </section>

    <!-- 2FA -->
    <section>
      <h2 class="text-2xl font-bold mb-4">2FA TOTP</h2>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Vue d'ensemble</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Implémentation via <code class="text-xs">django-otp</code> +
            <code class="text-xs">qrcode</code>. Compatible avec n'importe
            quel authenticator TOTP (Google Authenticator, Authy, 1Password,
            Bitwarden…).
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /me/2fa/setup
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Crée un <code class="text-xs">TOTPDevice</code> non-confirmé et
            renvoie un QR code à scanner. Ne change PAS encore l'état du
            user.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >→ 200 OK
&#123;
  "secret": "JBSWY3DPEHPK3PXP",       // base32 pour saisie manuelle
  "qr_code": "data:image/png;base64,...",
  "otpauth_uri": "otpauth://totp/TOTP%20jean%40exemple.fr?..."
&#125;</pre>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /me/2fa/verify-setup
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Confirme le device avec un code TOTP courant et active le 2FA
            sur le compte (<code class="text-xs">preferences.two_factor_enabled = true</code>).
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123; "code": "123456" &#125;

→ 200 OK &#123; "detail": "2FA activé avec succès." &#125;</pre>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /auth/2fa/verify
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Étape 2 du login quand le compte a le 2FA actif. Échange le
            <code class="text-xs">challenge_token</code> (5 min de validité)
            + le code TOTP contre les JWT.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "challenge_token": "AbCd_xy...",
  "code": "123456"
&#125;

→ 200 OK &#123; "user": &#123;...&#125;, "access": "eyJ...", "refresh": "eyJ..." &#125;</pre>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /me/2fa/disable
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Désactive le 2FA — exige un code TOTP valide pour éviter qu'une
            session compromise désactive la sécurité.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- OAuth -->
    <section>
      <h2 class="text-2xl font-bold mb-4">OAuth (Google &amp; GitHub)</h2>

      <Card>
        <CardContent class="pt-6 text-sm space-y-3">
          <p>
            Le backend ne fait <strong>pas de redirection OAuth lui-même</strong> —
            le frontend gère les flows et envoie au backend un payload
            normalisé pour l'échange final. Deux providers supportés (les
            credentials côté backend sont dans
            <code class="text-xs">GOOGLE_OAUTH_CLIENT_ID</code> /
            <code class="text-xs">GITHUB_OAUTH_CLIENT_ID</code> /
            <code class="text-xs">GITHUB_OAUTH_CLIENT_SECRET</code>).
          </p>
          <p>
            Pour les deux providers, si l'email retourné existe déjà →
            connexion. Sinon → User créé en
            <code class="text-xs">set_unusable_password()</code> (le user
            doit passer par /auth/forgot-password pour définir un mdp).
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /auth/oauth/google/exchange
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Le frontend récupère un <code class="text-xs">id_token</code>
            (JWT signé par Google) via Google Sign-In, puis l'envoie au
            backend. Le backend le vérifie cryptographiquement (signature,
            issuer, audience, expiration) via la lib
            <code class="text-xs">google-auth</code>.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123; "id_token": "eyJhbGciOiJSUzI1NiIs..." &#125;

→ 200 OK &#123; "user": &#123;...&#125;, "created": true|false, "access", "refresh" &#125;</pre>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /auth/oauth/github/exchange
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Le frontend redirige vers GitHub avec un
            <code class="text-xs">state</code> CSRF, GitHub renvoie un
            <code class="text-xs">code</code> sur le callback frontend, qui
            le poste ici. Le backend échange le code contre un access_token
            puis fetch <code class="text-xs">/user</code> et
            <code class="text-xs">/user/emails</code>.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "code": "abc123...",
  "redirect_uri": "http://localhost:3000/auth/oauth/github/callback"
&#125;

→ 200 OK &#123; ... &#125;</pre>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'docs' })
</script>
