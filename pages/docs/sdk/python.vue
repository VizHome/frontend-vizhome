<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">SDK Python</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Automatisez vos workflows de visualisation 3D avec notre SDK Python
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          Le SDK Python VizHome vous permet d'intégrer nos services de
          visualisation 3D dans vos applications Python, scripts
          d'automatisation et workflows de traitement. Idéal pour les
          intégrations serveur, l'analyse batch et les pipelines CI/CD.
        </p>
      </CardContent>
    </Card>

    <!-- Installation -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Installation</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">Installez le SDK via pip :</p>

          <div class="relative mb-6">
            <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
              <code>pip install vizhome-sdk</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              class="absolute top-3 right-3 h-6 w-6 p-0"
            >
              <ClipboardIcon class="h-3 w-3" />
              <span class="sr-only">Copier</span>
            </Button>
          </div>

          <p class="mb-2">Compatibilité Python :</p>
          <ul class="list-disc pl-6 mb-4 space-y-1">
            <li>Python 3.8+</li>
            <li>Supporte Windows, macOS et Linux</li>
            <li>Dépendances gérées automatiquement via pip</li>
          </ul>

          <Alert>
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Environnements virtuels</AlertTitle>
            <AlertDescription>
              Nous recommandons d'utiliser un environnement virtuel pour isoler
              les dépendances de votre projet.
              <div class="mt-2">
                <code class="text-xs px-1 py-0.5 rounded bg-muted"
                  >python -m venv venv && source venv/bin/activate</code
                >
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Utilisation basique -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Utilisation basique</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Initialisation</h3>
            <div class="relative">
              <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                <code>
from vizhome import VizHome

# Initialiser le client avec votre clé API
vizhome = VizHome(
    api_key="votre_cle_api",
    region="eu-west-1"  # Optionnel, par défaut 'eu-west-1'
)
                </code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                class="absolute top-3 right-3 h-6 w-6 p-0"
              >
                <ClipboardIcon class="h-3 w-3" />
                <span class="sr-only">Copier</span>
              </Button>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Récupérer un projet</h3>
            <div class="relative">
              <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                <code>
# Récupérer un projet par son ID
project_id = "1234567890abcdef"
project = vizhome.projects.get(project_id)

print(project.name)
print(project.created_at)
print(project.thumbnail_url)
                </code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                class="absolute top-3 right-3 h-6 w-6 p-0"
              >
                <ClipboardIcon class="h-3 w-3" />
                <span class="sr-only">Copier</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">Lister les projets</h3>
            <div class="relative">
              <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                <code>
# Récupérer la liste des projets (paginée)
projects_response = vizhome.projects.list(
    limit=10,
    offset=0,
    sort_by="created_at",
    sort_order="desc"
)

# Accéder aux projets
for project in projects_response.projects:
    print(f"{project.id}: {project.name}")

# Accéder aux infos de pagination
pagination = projects_response.pagination
print(f"Total: {pagination.total}")
print(f"Pages: {pagination.total_pages}")
                </code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                class="absolute top-3 right-3 h-6 w-6 p-0"
              >
                <ClipboardIcon class="h-3 w-3" />
                <span class="sr-only">Copier</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Traitement des images -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Traitement des images</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Le SDK Python est particulièrement adapté pour automatiser l'upload
            et le traitement d'images :
          </p>

          <div class="relative mb-6">
            <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
              <code>
import os
from vizhome import VizHome

# Initialiser le client
vizhome = VizHome(api_key="votre_cle_api")

# Créer un nouveau projet
project = vizhome.projects.create(
    name="Projet Maison",
    description="Reconstruction 3D automatisée"
)

# Chemin des images
images_dir = "/chemin/vers/images/"
image_files = [os.path.join(images_dir, f) for f in os.listdir(images_dir)
               if f.lower().endswith(('.png', '.jpg', '.jpeg'))]

# Créer une session d'upload
upload_session = vizhome.uploads.create_session(
    project_id=project.id,
    file_count=len(image_files)
)

# Uploader les images
for i, image_file in enumerate(image_files):
    with open(image_file, 'rb') as f:
        vizhome.uploads.upload_file(
            session_id=upload_session.id,
            file=f,
            filename=os.path.basename(image_file),
            index=i,
        )
    print(f"Uploaded {i+1}/{len(image_files)}: {os.path.basename(image_file)}")

# Démarrer le traitement
processing_job = vizhome.processing.start(
    project_id=project.id,
    upload_session_id=upload_session.id,
    settings={
        "quality": "high",
        "texture_resolution": 2048
    }
)

# Suivre la progression de manière synchrone
finished = False
while not finished:
    job_status = vizhome.processing.get_status(processing_job.id)
    print(f"Étape: {job_status.stage}, Progression: {job_status.percentage}%")

    if job_status.stage == "completed":
        print("Modèle 3D prêt !")
        finished = True

    if job_status.stage == "failed":
        print(f"Échec du traitement: {job_status.error}")
        finished = True

    # Attendre avant la prochaine vérification
    import time
    time.sleep(5)

# Récupérer l'URL du modèle 3D
project = vizhome.projects.get(project.id)
print(f"URL du modèle: {project.viewer_url}")
              </code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              class="absolute top-3 right-3 h-6 w-6 p-0"
            >
              <ClipboardIcon class="h-3 w-3" />
              <span class="sr-only">Copier</span>
            </Button>
          </div>

          <Alert variant="info">
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Traitement asynchrone</AlertTitle>
            <AlertDescription>
              Pour les workflows d'intégration continue, vous pouvez également
              utiliser les webhooks pour recevoir des notifications lorsque le
              traitement est terminé. Voir la section "Webhooks" pour plus
              d'informations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Utilisation avancée -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Utilisation avancée</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Exportation de modèles</h3>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
# Exporter un modèle 3D dans différents formats
export_job = vizhome.models.export(
    project_id=project.id,
    format="glb",  # Formats supportés: 'glb', 'obj', 'fbx', 'usdz'
    quality="high"
)

# Attendre que l'export soit terminé
while True:
    status = vizhome.models.get_export_status(export_job.id)
    if status.stage == "completed":
        # Télécharger le fichier exporté
        with open("model.glb", "wb") as f:
            vizhome.models.download_export(export_job.id, f)
        print("Téléchargement terminé!")
        break

    if status.stage == "failed":
        print(f"Échec de l'export: {status.error}")
        break

    time.sleep(2)
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  class="absolute top-3 right-3 h-6 w-6 p-0"
                >
                  <ClipboardIcon class="h-3 w-3" />
                  <span class="sr-only">Copier</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Webhooks</h3>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
# Créer un webhook pour recevoir des notifications
webhook = vizhome.webhooks.create(
    url="https://votre-serveur.com/webhook-endpoint",
    events=["project.created", "processing.completed", "processing.failed"],
    secret="votre_secret"  # Utilisé pour vérifier la signature des requêtes
)

print(f"Webhook créé avec ID: {webhook.id}")

# Lister les webhooks existants
webhooks = vizhome.webhooks.list()
for hook in webhooks:
    print(f"{hook.id}: {hook.url} (événements: {', '.join(hook.events)})")

# Supprimer un webhook
vizhome.webhooks.delete(webhook.id)
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  class="absolute top-3 right-3 h-6 w-6 p-0"
                >
                  <ClipboardIcon class="h-3 w-3" />
                  <span class="sr-only">Copier</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Utilisation avec asyncio</h3>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
import asyncio
from vizhome.async_client import AsyncVizHome

async def main():
    # Initialiser le client asynchrone
    async_vizhome = AsyncVizHome(api_key="votre_cle_api")

    # Créer plusieurs projets en parallèle
    project_names = ["Maison 1", "Maison 2", "Maison 3"]

    async def create_project(name):
        project = await async_vizhome.projects.create(
            name=name,
            description=f"Projet {name}"
        )
        print(f"Projet créé: {project.id}")
        return project

    # Exécuter les créations en parallèle
    projects = await asyncio.gather(
        *[create_project(name) for name in project_names]
    )

    # Récupérer les détails de chaque projet
    for project in projects:
        details = await async_vizhome.projects.get(project.id)
        print(f"{details.name}: {details.created_at}")

    # Fermer la session
    await async_vizhome.close()

# Exécuter la fonction async principale
asyncio.run(main())
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  class="absolute top-3 right-3 h-6 w-6 p-0"
                >
                  <ClipboardIcon class="h-3 w-3" />
                  <span class="sr-only">Copier</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Intégration avec d'autres bibliothèques -->
    <div>
      <h2 class="text-2xl font-bold mb-4">
        Intégration avec d'autres bibliothèques
      </h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Pandas</h3>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
import pandas as pd
from vizhome import VizHome

vizhome = VizHome(api_key="votre_cle_api")

# Récupérer les projets et convertir en DataFrame
projects_response = vizhome.projects.list(limit=100)
projects_data = [{
    "id": p.id,
    "name": p.name,
    "created_at": p.created_at,
    "status": p.status,
    "size_mb": p.size_mb if hasattr(p, "size_mb") else None
} for p in projects_response.projects]

df = pd.DataFrame(projects_data)

# Analyse des projets
print(f"Nombre total de projets: {len(df)}")
print("\nDistribution par statut:")
print(df["status"].value_counts())

print("\nProjets les plus récents:")
print(df.sort_values("created_at", ascending=False).head(5)[["name", "created_at"]])

# Taille moyenne des projets (si disponible)
if "size_mb" in df.columns:
    print(f"\nTaille moyenne des projets: {df['size_mb'].mean():.2f} MB")
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  class="absolute top-3 right-3 h-6 w-6 p-0"
                >
                  <ClipboardIcon class="h-3 w-3" />
                  <span class="sr-only">Copier</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                TQDM (barre de progression)
              </h3>
              <div class="relative">
                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
import os
from tqdm import tqdm
from vizhome import VizHome

vizhome = VizHome(api_key="votre_cle_api")

# Créer un nouveau projet
project = vizhome.projects.create(name="Projet avec barre de progression")

# Préparer l'upload
images_dir = "/chemin/vers/images/"
image_files = [os.path.join(images_dir, f) for f in os.listdir(images_dir)
               if f.lower().endswith(('.png', '.jpg', '.jpeg'))]

# Créer une session d'upload
upload_session = vizhome.uploads.create_session(
    project_id=project.id,
    file_count=len(image_files)
)

# Uploader avec barre de progression
for i, image_file in enumerate(tqdm(image_files, desc="Upload des images")):
    with open(image_file, 'rb') as f:
        vizhome.uploads.upload_file(
            session_id=upload_session.id,
            file=f,
            filename=os.path.basename(image_file),
            index=i
        )

print("Démarrage du traitement...")

# Démarrer le traitement
processing_job = vizhome.processing.start(
    project_id=project.id,
    upload_session_id=upload_session.id
)

# Suivre la progression
from time import sleep
with tqdm(total=100, desc="Traitement") as pbar:
    last_percentage = 0
    while True:
        status = vizhome.processing.get_status(processing_job.id)

        # Mettre à jour la barre de progression
        delta = status.percentage - last_percentage
        if delta > 0:
            pbar.update(delta)
            last_percentage = status.percentage

        if status.stage == "completed":
            pbar.update(100 - last_percentage)  # Compléter à 100%
            print("\nTraitement terminé!")
            break

        if status.stage == "failed":
            print(f"\nÉchec du traitement: {status.error}")
            break

        sleep(2)
                  </code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  class="absolute top-3 right-3 h-6 w-6 p-0"
                >
                  <ClipboardIcon class="h-3 w-3" />
                  <span class="sr-only">Copier</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Exemple complet -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Exemple complet</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Scénario: Automatisation de la création de modèles 3D pour un
            catalogue d'immobilier
          </p>

          <div class="relative mb-4">
            <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
              <code>
import os
import csv
import logging
from datetime import datetime
from vizhome import VizHome

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f"vizhome_import_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("vizhome_automation")

# Initialiser le client
vizhome = VizHome(api_key="votre_cle_api")

# Charger les données des propriétés depuis un CSV
properties = []
with open('properties.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        properties.append(row)

logger.info(f"Chargement de {len(properties)} propriétés terminé")

# Traiter chaque propriété
for prop in properties:
    try:
        prop_id = prop['id']
        prop_name = prop['name']
        images_dir = os.path.join('photos', prop_id)

        if not os.path.exists(images_dir):
            logger.warning(f"Dossier d'images non trouvé pour {prop_id}, passage au suivant")
            continue

        # Récupérer les images
        image_files = [
            os.path.join(images_dir, f) for f in os.listdir(images_dir)
            if f.lower().endswith(('.png', '.jpg', '.jpeg'))
        ]

        if len(image_files) < 20:
            logger.warning(f"Pas assez d'images pour {prop_id} ({len(image_files)}), minimum 20 requis")
            continue

        logger.info(f"Traitement de '{prop_name}' avec {len(image_files)} images")

        # Créer un nouveau projet
        project = vizhome.projects.create(
            name=prop_name,
            description=f"Propriété ID: {prop_id}",
            metadata={
                "property_id": prop_id,
                "address": prop.get('address', ''),
                "type": prop.get('type', ''),
                "price": prop.get('price', ''),
                "source": "batch_import"
            }
        )

        logger.info(f"Projet créé avec ID: {project.id}")

        # Créer une session d'upload
        upload_session = vizhome.uploads.create_session(
            project_id=project.id,
            file_count=len(image_files)
        )

        # Uploader les images
        for i, image_file in enumerate(image_files):
            with open(image_file, 'rb') as f:
                vizhome.uploads.upload_file(
                    session_id=upload_session.id,
                    file=f,
                    filename=os.path.basename(image_file),
                    index=i
                )
            if (i + 1) % 10 == 0:
                logger.info(f"  {i+1}/{len(image_files)} images uploadées")

        logger.info(f"Upload terminé, démarrage du traitement")

        # Démarrer le traitement
        processing_job = vizhome.processing.start(
            project_id=project.id,
            upload_session_id=upload_session.id,
            settings={
                "quality": "high",
                "texture_resolution": 2048,
                "optimize_for_web": True
            }
        )

        # Enregistrer l'ID du job pour suivi ultérieur
        with open('processing_jobs.csv', 'a') as f:
            f.write(f"{datetime.now().isoformat()},{prop_id},{project.id},{processing_job.id}\n")

        logger.info(f"Traitement lancé avec job ID: {processing_job.id}")

    except Exception as e:
        logger.error(f"Erreur lors du traitement de {prop.get('id')}: {str(e)}")

logger.info("Script terminé")
              </code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              class="absolute top-3 right-3 h-6 w-6 p-0"
            >
              <ClipboardIcon class="h-3 w-3" />
              <span class="sr-only">Copier</span>
            </Button>
          </div>

          <Alert variant="info">
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Script de vérification</AlertTitle>
            <AlertDescription>
              Vous pouvez également créer un script séparé qui vérifie
              périodiquement le statut des jobs de traitement en utilisant les
              IDs enregistrés dans processing_jobs.csv et qui notifie lorsque
              les modèles sont prêts.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/sdk/javascript">
          <ArrowLeftIcon class="h-4 w-4" />
          SDK JavaScript
        </NuxtLink>
      </Button>
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/sdk/unity">
          SDK Unity
          <ArrowRightIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  InfoIcon,
  ClipboardIcon,
} from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>
