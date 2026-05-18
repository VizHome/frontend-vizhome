<template>
  <div class="space-y-8 w-full">
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Projets &amp; Scènes</h1>
      <p class="text-lg text-muted-foreground mt-2">
        CRUD projets, persistance scène Three.js, upload modèles 3D
        presigned, annotations, share links.
      </p>
    </header>

    <!-- Modèle -->
    <Card>
      <CardHeader>
        <CardTitle>Modèle de données</CardTitle>
      </CardHeader>
      <CardContent class="text-sm space-y-3">
        <p>Un <code class="text-xs">Project</code> agrège :</p>
        <ul class="pl-4 space-y-1">
          <li>
            • Un <code class="text-xs">Scene</code> (1-to-1) — JSON state
            Three.js (caméra, lumières, météo, transforms…)
          </li>
          <li>
            • N <code class="text-xs">ImportedModel</code> — fichiers 3D
            (GLB/OBJ/FBX/STL/glTF) stockés sur MinIO
          </li>
          <li>
            • N <code class="text-xs">Annotation</code> — notes / mesures
            positionnées dans la scène
          </li>
          <li>
            • N <code class="text-xs">ShareLink</code> — URLs publiques
            read-only avec expiration
          </li>
        </ul>
        <p class="text-muted-foreground">
          Tous les sous-modèles sont supprimés en cascade quand le projet
          est supprimé (signaux Django ajustent aussi les quotas storage de
          l'utilisateur).
        </p>
      </CardContent>
    </Card>

    <!-- CRUD Projects -->
    <section>
      <h2 class="text-2xl font-bold mb-4">CRUD Projects</h2>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">GET /projects/</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Liste paginée des projets du user (20 par page).
            <code class="text-xs">ProjectListSerializer</code> renvoie une
            vue compacte (titre, description, thumbnail, modelsCount,
            dates).
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">POST /projects/</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Crée un projet + sa <code class="text-xs">Scene</code> vide
            (signal Django). Incrémente
            <code class="text-xs">UserStats.total_projects</code>.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "title": "Salon moderne",
  "description": "Test maquette"
&#125;

→ 201 Created (ProjectDetailSerializer — inclut scene + models + annotations)</pre>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            GET /projects/&#123;id&#125;
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Récupère le détail complet — utilisé par /render pour restaurer
            une scène sauvegardée.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "id": 42,
  "title": "Salon moderne",
  "thumbnail_url": null,
  "scene": &#123;
    "data": &#123;
      "camera": &#123; "position": [10,5,10], "target": [0,0,0] &#125;,
      "lighting": &#123; "preset": "sunset" &#125;,
      "weather": "clear",
      "navigation": "orbit",
      "models": [ &#123;"id": 7, "position": &#123;...&#125;, ...&#125; ]
    &#125;,
    "version": 12
  &#125;,
  "imported_models": [
    &#123;
      "id": 7,
      "name": "Cube",
      "format": "glb",
      "file_url": "http://localhost:9000/vizhome-media/...glb",
      "file_size_bytes": 1024,
      "position": &#123; "x": 0, "y": 0, "z": 0 &#125;,
      ...
    &#125;
  ],
  "annotations": [ ... ]
&#125;</pre>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /projects/&#123;id&#125;/duplicate
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Duplique projet + scène + annotations. Par défaut, ne copie
            <strong>pas</strong> les modèles 3D (fichiers lourds).
          </p>
          <p>
            Query param <code class="text-xs">?copy_assets=true</code> →
            copie aussi les modèles via
            <code class="text-xs">copy_object</code> server-side MinIO
            (rapide). Vérifie le quota storage avant. Réponse
            <code class="text-xs">400 storage_exceeded</code> si insuffisant.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Scene -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Scène (état Three.js)</h2>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            PUT /projects/&#123;id&#125;/scene
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Sauvegarde l'état Three.js complet. Le backend stocke
            <code class="text-xs">scene.data</code> en
            <code class="text-xs">JSONField</code> Postgres,
            <strong>sans validation de structure</strong> — le schéma est
            owned par le frontend via le composable
            <code class="text-xs">useSceneSerializer</code>.
          </p>
          <p>
            La version est incrémentée à chaque PUT (utile pour de la
            détection de conflits côté UI plus tard).
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "data": &#123;
    "camera": &#123; "position": [10,5,10], "target": [0,0,0] &#125;,
    "lighting": &#123; "preset": "sunset" &#125;,
    "weather": "cloudy",
    "navigation": "first_person",
    "models": [
      &#123; "id": 7, "position": &#123;...&#125;, "rotation": &#123;...&#125;, "scale": &#123;...&#125; &#125;
    ]
  &#125;
&#125;

→ 200 OK &#123; "data": &#123;...&#125;, "version": 13, "updated_at": "..." &#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Modèles 3D -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Modèles 3D</h2>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Deux méthodes d'upload</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            <strong>1. Multipart classique</strong> (petits fichiers, &lt;
            ~10 MB) — passe par Django, simple mais limité par la taille
            max d'upload de l'app.
          </p>
          <p>
            <strong>2. Presigned MinIO</strong> (recommandé, gros fichiers
            jusqu'à plusieurs GB) — Django renvoie une URL pré-signée, le
            navigateur PUT direct vers MinIO, puis confirme côté backend.
            Pas de charge sur Django pour le transfert.
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /projects/&#123;id&#125;/models  (multipart)
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >Content-Type: multipart/form-data

name: "Cube"
file: &lt;binary&gt;
mtl_file: &lt;binary&gt;   (optionnel, pour OBJ)

→ 201 Created (ImportedModelSerializer)</pre>
          <p class="text-muted-foreground">
            Formats acceptés :
            <code class="text-xs">.glb .gltf .obj .fbx .stl</code>
            (validation côté serializer). Quota storage enforced.
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /projects/&#123;id&#125;/models/upload-url  (presigned)
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "name": "BigHouse",
  "file_name": "house.glb",
  "file_size_bytes": 52428800,
  "content_type": "model/gltf-binary"
&#125;

→ 200 OK
&#123;
  "upload_url": "http://localhost:9000/vizhome-media/.../house.glb?X-Amz-...",
  "key": "projects/models/2026/05/42_xyz.glb",
  "expires_in": 3600,
  "method": "PUT",
  "headers": &#123; "Content-Type": "model/gltf-binary" &#125;
&#125;</pre>
          <p class="text-muted-foreground">
            L'URL est signée avec le host
            <strong>public</strong> (localhost:9000 en dev, cdn.vizhome.fr
            en prod) pour que la signature soit valide quand le browser
            l'utilise. Validité 1 h. Le quota storage est vérifié avant
            génération.
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            PUT &lt;upload_url&gt;  (direct vers MinIO)
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm">
          <p>
            Le frontend fait un <code class="text-xs">fetch(upload_url, &#123; method:'PUT', body: file &#125;)</code>.
            <strong>Pas d'auth Authorization Bearer</strong> — la signature
            X-Amz est dans la query string de l'URL.
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /projects/&#123;id&#125;/models/confirm
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Appelé après le PUT direct. Le backend fait un
            <code class="text-xs">HEAD object</code> sur MinIO pour vérifier
            que le fichier existe et récupérer sa taille réelle.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "name": "BigHouse",
  "key": "projects/models/2026/05/42_xyz.glb",
  "mtl_key": ""
&#125;

→ 201 Created (ImportedModelSerializer)</pre>
          <p class="text-muted-foreground">
            Si la taille réelle dépasse le quota → suppression auto du
            fichier MinIO + erreur 400
            <code class="text-xs">storage_exceeded</code>.
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            PATCH /projects/&#123;id&#125;/models/&#123;mid&#125;
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Met à jour <code class="text-xs">name</code>,
            <code class="text-xs">position</code>,
            <code class="text-xs">rotation</code>,
            <code class="text-xs">scale</code> uniquement (le fichier n'est
            pas modifiable — supprimer + uploader pour remplacer).
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            DELETE /projects/&#123;id&#125;/models/&#123;mid&#125;
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Supprime le modèle + le(s) fichier(s) sur MinIO (via signal
            <code class="text-xs">post_delete</code>) + décrémente
            <code class="text-xs">UserStats.storage_used_bytes</code>.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Annotations -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Annotations</h2>

      <Card>
        <CardContent class="pt-6 text-sm space-y-3">
          <p>
            Notes / mesures positionnées dans l'espace 3D. Types supportés :
            <code class="text-xs">note</code>,
            <code class="text-xs">measure</code>,
            <code class="text-xs">marker</code>.
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >POST /projects/&#123;id&#125;/annotations
&#123;
  "type": "note",
  "position": &#123; "x": 1.5, "y": 0.8, "z": -2.3 &#125;,
  "content": "Lampe à remplacer",
  "color": "#ef4444"
&#125;

GET    /projects/&#123;id&#125;/annotations            (liste paginée)
PATCH  /projects/&#123;id&#125;/annotations/&#123;aid&#125;       (modif content/position)
DELETE /projects/&#123;id&#125;/annotations/&#123;aid&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Share -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Partage public</h2>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            POST /projects/&#123;id&#125;/share
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Crée un token URL-safe (256 bits d'entropie via
            <code class="text-xs">secrets.token_urlsafe(32)</code>).
            Permission <code class="text-xs">view</code> uniquement (mode
            collaboratif pas implémenté).
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "permission": "view",
  "expires_at": "2026-12-31T23:59:59Z"   // optionnel
&#125;

→ 201 Created
&#123;
  "id": 5,
  "token": "Xm7-pQz...",
  "share_url": "http://localhost:3000/shared/Xm7-pQz...",
  "expires_at": "2026-12-31T...",
  "is_expired": false,
  ...
&#125;</pre>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            GET /shared/&#123;token&#125;
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            <strong>Endpoint public</strong> (pas d'auth requise). Renvoie
            le <code class="text-xs">ProjectDetailSerializer</code> du
            projet partagé. Met à jour
            <code class="text-xs">last_used_at</code> du lien.
          </p>
          <p>
            Renvoie <code class="text-xs">410 Gone</code> si le lien a
            expiré, <code class="text-xs">404</code> si le token n'existe
            pas.
          </p>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'docs' })
</script>
