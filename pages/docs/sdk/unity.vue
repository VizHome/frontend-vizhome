<template>
    <div class="space-y-8">
        <div>
            <h1 class="text-3xl font-bold tracking-tight">SDK Unity</h1>
            <p class="text-lg text-muted-foreground mt-2">
                Intégrez des visualisations 3D immersives dans vos applications Unity
            </p>
        </div>

        <!-- Introduction -->
        <Card>
            <CardContent class="pt-6">
                <p>
                    Le SDK Unity VizHome vous permet d'intégrer facilement notre plateforme de visualisation 3D dans vos
                    applications, jeux et expériences créés avec Unity. Parfait pour les applications immobilières,
                    les expériences VR/AR et la visualisation architecturale.
                </p>
            </CardContent>
        </Card>

        <!-- Installation -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Installation</h2>
            <Card>
                <CardContent class="pt-6">
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-medium mb-2">Via Unity Package Manager</h3>
                            <p class="mb-2">
                                Ajoutez le package en utilisant le Package Manager d'Unity avec notre URL Git :
                            </p>
                            <div class="relative mb-6">
                                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>https://github.com/vizhome/unity-sdk.git</code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                                    <ClipboardIcon class="h-3 w-3" />
                                    <span class="sr-only">Copier</span>
                                </Button>
                            </div>

                            <ol class="list-decimal pl-6 mb-4 space-y-2">
                                <li>Ouvrez Unity et accédez à <strong>Window > Package Manager</strong></li>
                                <li>Cliquez sur le bouton <strong>+</strong> et sélectionnez <strong>Add package from
                                        git URL</strong></li>
                                <li>Collez l'URL ci-dessus et cliquez sur <strong>Add</strong></li>
                            </ol>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium mb-2">Installation manuelle</h3>
                            <p class="mb-2">
                                Alternativement, vous pouvez télécharger le package depuis notre portail développeur :
                            </p>
                            <ol class="list-decimal pl-6 mb-4 space-y-2">
                                <li>Téléchargez le package <a href="#"
                                        class="text-primary hover:underline">VizHome-Unity-SDK.unitypackage</a></li>
                                <li>Dans votre projet Unity, accédez à <strong>Assets > Import Package > Custom
                                        Package</strong></li>
                                <li>Sélectionnez le fichier téléchargé et cliquez sur <strong>Open</strong></li>
                                <li>Assurez-vous que tous les éléments sont sélectionnés et cliquez sur
                                    <strong>Import</strong>
                                </li>
                            </ol>
                        </div>

                        <Alert>
                            <InfoIcon class="h-4 w-4" />
                            <AlertTitle>Compatibilité</AlertTitle>
                            <AlertDescription>
                                <ul class="list-disc pl-4 mb-0 mt-1">
                                    <li>Versions Unity supportées : 2020.3 LTS et supérieures</li>
                                    <li>Plateformes : Windows, macOS, iOS, Android, WebGL</li>
                                </ul>
                            </AlertDescription>
                        </Alert>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Utilisation basique -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Utilisation basique</h2>
            <Card>
                <CardContent class="pt-6">
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-medium mb-2">Initialisation</h3>
                            <div class="relative">
                                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
using VizHome;
using UnityEngine;

public class VizHomeManager : MonoBehaviour
{
    [SerializeField] private string apiKey;
    [SerializeField] private string region = "eu-west-1";

    private VizHomeClient client;

    void Start()
    {
        // Initialiser le client VizHome
        client = new VizHomeClient(apiKey, region);
        
        Debug.Log("VizHome SDK initialisé avec succès");
    }
}
                  </code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                                    <ClipboardIcon class="h-3 w-3" />
                                    <span class="sr-only">Copier</span>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium mb-2">Charger un modèle 3D</h3>
                            <div class="relative">
                                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
using VizHome;
using UnityEngine;
using System.Threading.Tasks;

public class ModelLoader : MonoBehaviour
{
    [SerializeField] private string projectId;
    [SerializeField] private Transform modelParent;
    
    private VizHomeClient client;
    
    void Start()
    {
        client = FindObjectOfType< VizHomeManager >().GetClient();
        LoadModelAsync();
    }
    
    private async Task LoadModelAsync()
    {
        try
        {
            // Afficher un indicateur de chargement
            Debug.Log("Chargement du modèle...");
            
            // Charger le modèle
            GameObject model = await client.LoadModelAsync(projectId);
            
            // Placer le modèle dans la scène
            model.transform.SetParent(modelParent, false);
            
            Debug.Log("Modèle chargé avec succès");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Erreur lors du chargement du modèle: {e.Message}");
        }
    }
}
                  </code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
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
using VizHome;
using UnityEngine;
using System.Threading.Tasks;
using System.Collections.Generic;

public class ProjectBrowser : MonoBehaviour
{
    [SerializeField] private ProjectItemUI projectItemPrefab;
    [SerializeField] private Transform projectsContainer;
    
    private VizHomeClient client;
    
    void Start()
    {
        client = FindObjectOfType< VizHomeManager >().GetClient();
        LoadProjectsAsync();
    }
    
    private async Task LoadProjectsAsync()
    {
        try
        {
            // Récupérer la liste des projets
            ProjectsResponse response = await client.Projects.ListAsync(
                limit: 20,
                offset: 0,
                sortBy: "created_at",
                sortOrder: "desc"
            );
            
            // Effacer les projets existants dans l'UI
            foreach (Transform child in projectsContainer)
            {
                Destroy(child.gameObject);
            }
            
            // Afficher les projets
            foreach (var project in response.Projects)
            {
                ProjectItemUI item = Instantiate(projectItemPrefab, projectsContainer);
                item.Initialize(project);
                item.OnProjectSelected += HandleProjectSelected;
            }
            
            Debug.Log($"Chargé {response.Projects.Count} projets");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Erreur lors du chargement des projets: {e.Message}");
        }
    }
    
    private void HandleProjectSelected(Project project)
    {
        Debug.Log($"Projet sélectionné: {project.Name} ({project.Id})");
        // Charger le modèle sélectionné, naviguer vers un autre écran, etc.
    }
}
                  </code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                                    <ClipboardIcon class="h-3 w-3" />
                                    <span class="sr-only">Copier</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Intégration VR/AR -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Intégration VR/AR</h2>
            <Card>
                <CardContent class="pt-6">
                    <div class="space-y-6">
                        <p>
                            Notre SDK Unity est optimisé pour les expériences VR et AR, permettant une visualisation
                            immersive
                            des modèles 3D dans les applications XR.
                        </p>

                        <div>
                            <h3 class="text-lg font-medium mb-2">Configuration VR avec Unity XR Interaction Toolkit</h3>
                            <div class="relative">
                                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
using VizHome;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;

public class VRModelViewer : MonoBehaviour
{
    [SerializeField] private string projectId;
    [SerializeField] private Transform modelAnchor;
    [SerializeField] private XRGrabInteractable grabInteractablePrefab;
    
    private VizHomeClient client;
    private GameObject currentModel;
    
    void Start()
    {
        client = FindObjectOfType< VizHomeManager >().GetClient();
        LoadModelForVR();
    }
    
    private async void LoadModelForVR()
    {
        try
        {
            // Charger le modèle
            currentModel = await client.LoadModelAsync(
                projectId, 
                new ModelLoadOptions 
                { 
                    OptimizeForVR = true,
                    MaxTextureSize = 2048
                }
            );
            
            // Placer le modèle dans l'espace VR
            currentModel.transform.SetParent(modelAnchor, false);
            
            // Configurer les interactions VR
            SetupVRInteractions(currentModel);
            
            Debug.Log("Modèle VR chargé et configuré");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Erreur lors du chargement du modèle VR: {e.Message}");
        }
    }
    
    private void SetupVRInteractions(GameObject model)
    {
        // Ajouter un collider pour les interactions
        BoxCollider collider = model.AddComponent< BoxCollider >();
        collider.isTrigger = false;
        
        // Calculer les bounds pour englober tout le modèle
        Renderer[] renderers = model.GetComponentsInChildren< Renderer >();
        if (renderers.Length > 0)
        {
            Bounds bounds = renderers[0].bounds;
            foreach (Renderer renderer in renderers)
            {
                bounds.Encapsulate(renderer.bounds);
            }
            collider.center = bounds.center - model.transform.position;
            collider.size = bounds.size;
        }
        
        // Ajouter l'interactable pour permettre de saisir et manipuler le modèle
        XRGrabInteractable grabInteractable = model.AddComponent< XRGrabInteractable >();
        grabInteractable.movementType = XRBaseInteractable.MovementType.VelocityTracking;
        grabInteractable.throwOnDetach = true;
        
        // Ajouter un rigidbody pour la physique
        Rigidbody rb = model.AddComponent< Rigidbody >();
        rb.useGravity = false;
        rb.isKinematic = true;
        
        // Configurer le grabInteractable pour activer/désactiver le rigidbody
        grabInteractable.selectEntered.AddListener((args) => {
            rb.isKinematic = false;
        });
        
        grabInteractable.selectExited.AddListener((args) => {
            rb.isKinematic = true;
        });
    }
}
                  </code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                                    <ClipboardIcon class="h-3 w-3" />
                                    <span class="sr-only">Copier</span>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium mb-2">Intégration AR avec AR Foundation</h3>
                            <div class="relative">
                                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
using VizHome;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class ARModelPlacer : MonoBehaviour
{
    [SerializeField] private ARRaycastManager raycastManager;
    [SerializeField] private string projectId;
    
    private VizHomeClient client;
    private GameObject arModel;
    private bool isModelLoaded = false;
    private bool isPlacingModel = false;
    
    void Start()
    {
        client = FindObjectOfType< VizHomeManager >().GetClient();
    }
    
    public async void LoadModelForAR()
    {
        if (isModelLoaded) return;
        
        try
        {
            // Charger le modèle avec des options optimisées pour AR
            arModel = await client.LoadModelAsync(
                projectId, 
                new ModelLoadOptions 
                { 
                    OptimizeForMobile = true,
                    MaxTextureSize = 1024,
                    SimplifyMesh = true
                }
            );
            
            // Désactiver initialement et préparer pour le placement
            arModel.SetActive(false);
            isModelLoaded = true;
            isPlacingModel = true;
            
            Debug.Log("Modèle AR chargé, prêt à placer");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Erreur lors du chargement du modèle AR: {e.Message}");
        }
    }
    
    void Update()
    {
        if (!isModelLoaded || !isPlacingModel) return;
        
        // Détecter les touches sur l'écran
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            
            if (touch.phase == TouchPhase.Began)
            {
                // Raycast pour trouver une surface où placer le modèle
                List< ARRaycastHit > hits = new List< ARRaycastHit >();
                if (raycastManager.Raycast(touch.position, hits, TrackableType.PlaneWithinPolygon))
                {
                    // Placer le modèle sur la surface détectée
                    Pose hitPose = hits[0].pose;
                    PlaceModel(hitPose);
                }
            }
        }
    }
    
    private void PlaceModel(Pose pose)
    {
        // Positionner et orienter le modèle
        arModel.transform.position = pose.position;
        arModel.transform.rotation = pose.rotation;
        
        // Ajuster l'échelle si nécessaire
        float scale = 0.1f; // Ajuster selon la taille du modèle
        arModel.transform.localScale = new Vector3(scale, scale, scale);
        
        // Activer le modèle
        arModel.SetActive(true);
        isPlacingModel = false;
        
        // Ajouter des interactions tactiles si nécessaires
        // ...
        
        Debug.Log("Modèle placé en AR");
    }
    
    public void ResetPlacement()
    {
        if (arModel != null)
        {
            arModel.SetActive(false);
            isPlacingModel = true;
        }
    }
}
                  </code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                                    <ClipboardIcon class="h-3 w-3" />
                                    <span class="sr-only">Copier</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Fonctionnalités avancées -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Fonctionnalités avancées</h2>
            <Card>
                <CardContent class="pt-6">
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-lg font-medium mb-2">Annotations et points d'intérêt</h3>
                            <div class="relative">
                                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
using VizHome;
using UnityEngine;
using System.Collections.Generic;

public class ModelAnnotations : MonoBehaviour
{
    [SerializeField] private GameObject annotationPrefab;
    [SerializeField] private Camera mainCamera;
    
    private VizHomeClient client;
    private string currentProjectId;
    private List< GameObject > annotationObjects = new List< GameObject >();
    
    public void Initialize(VizHomeClient client, string projectId)
    {
        this.client = client;
        this.currentProjectId = projectId;
        LoadAnnotations();
    }
    
    private async void LoadAnnotations()
    {
        try
        {
            // Récupérer les annotations du projet
            List< Annotation > annotations = await client.Annotations.GetForProjectAsync(currentProjectId);
            
            // Effacer les annotations existantes
            ClearAnnotations();
            
            // Créer un objet d'annotation pour chaque annotation
            foreach (var annotation in annotations)
            {
                CreateAnnotationObject(annotation);
            }
            
            Debug.Log($"Chargé {annotations.Count} annotations");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Erreur lors du chargement des annotations: {e.Message}");
        }
    }
    
    private void CreateAnnotationObject(Annotation annotation)
    {
        // Créer l'objet d'annotation à la position spécifiée
        Vector3 position = new Vector3(
            annotation.Position.X,
            annotation.Position.Y,
            annotation.Position.Z
        );
        
        GameObject annotObj = Instantiate(annotationPrefab, position, Quaternion.identity);
        annotObj.transform.SetParent(transform, true);
        
        // Configurer le composant d'annotation
        AnnotationView view = annotObj.GetComponent< AnnotationView >();
        if (view != null)
        {
            view.SetData(annotation);
            view.SetMainCamera(mainCamera);
        }
        
        annotationObjects.Add(annotObj);
    }
    
    public async void CreateNewAnnotation(Vector3 position, string title, string description)
    {
        try
        {
            // Créer une nouvelle annotation
            Annotation newAnnotation = await client.Annotations.CreateAsync(
                new AnnotationCreateRequest
                {
                    ProjectId = currentProjectId,
                    Title = title,
                    Description = description,
                    Position = new Position3D
                    {
                        X = position.x,
                        Y = position.y,
                        Z = position.z
                    }
                }
            );
            
            // Ajouter l'annotation à la scène
            CreateAnnotationObject(newAnnotation);
            
            Debug.Log($"Nouvelle annotation créée: {newAnnotation.Id}");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"Erreur lors de la création d'annotation: {e.Message}");
        }
    }
    
    private void ClearAnnotations()
    {
        foreach (var obj in annotationObjects)
        {
            Destroy(obj);
        }
        annotationObjects.Clear();
    }
}
                  </code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
                                    <ClipboardIcon class="h-3 w-3" />
                                    <span class="sr-only">Copier</span>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium mb-2">Personnalisation des matériaux</h3>
                            <div class="relative">
                                <pre class="bg-muted text-sm rounded-md p-4 overflow-x-auto">
                  <code>
using VizHome;
using UnityEngine;
using System.Collections.Generic;

public class MaterialCustomizer : MonoBehaviour
{
    [SerializeField] private Material[] replacementMaterials;
    [SerializeField] private Texture2D[] textureOptions;
    
    private GameObject currentModel;
    private Dictionary< string, Material > originalMaterials = new Dictionary< string, Material >();
    
    public void Initialize(GameObject model)
    {
        currentModel = model;
        StoreOriginalMaterials();
    }
    
    private void StoreOriginalMaterials()
    {
        // Stocker les matériaux originaux pour pouvoir les restaurer
        originalMaterials.Clear();
        
        Renderer[] renderers = currentModel.GetComponentsInChildren< Renderer >();
        foreach (Renderer renderer in renderers)
        {
            foreach (Material mat in renderer.materials)
            {
                if (!originalMaterials.ContainsKey(mat.name))
                {
                    originalMaterials.Add(mat.name, new Material(mat));
                }
            }
        }
        
        Debug.Log($"Stocké {originalMaterials.Count} matériaux originaux");
    }
    
    public void ChangeMaterial(string objectName, int materialIndex)
    {
        if (materialIndex < 0 || materialIndex >= replacementMaterials.Length)
        {
            Debug.LogError("Index de matériau invalide");
            return;
        }
        
        // Trouver l'objet par son nom
        Transform targetObj = currentModel.transform.Find(objectName);
        if (targetObj == null)
        {
            Debug.LogError($"Objet '{objectName}' non trouvé");
            return;
        }
        
        // Appliquer le nouveau matériau
        Renderer renderer = targetObj.GetComponent< Renderer >();
        if (renderer != null)
        {
            Material[] materials = renderer.materials;
            materials[0] = replacementMaterials[materialIndex];
            renderer.materials = materials;
            
            Debug.Log($"Matériau appliqué: {replacementMaterials[materialIndex].name}");
        }
    }
    
    public void ChangeTexture(string objectName, int textureIndex)
    {
        if (textureIndex < 0 || textureIndex >= textureOptions.Length)
        {
            Debug.LogError("Index de texture invalide");
            return;
        }
        
        // Trouver l'objet par son nom
        Transform targetObj = currentModel.transform.Find(objectName);
        if (targetObj == null)
        {
            Debug.LogError($"Objet '{objectName}' non trouvé");
            return;
        }
        
        // Appliquer la nouvelle texture
        Renderer renderer = targetObj.GetComponent< Renderer >();
        if (renderer != null)
        {
            // Modifier la texture du premier matériau
            Material mat = renderer.material;
            mat.mainTexture = textureOptions[textureIndex];
            
            Debug.Log($"Texture appliquée: {textureOptions[textureIndex].name}");
        }
    }
    
    public void ResetMaterials()
    {
        // Restaurer tous les matériaux originaux
        Renderer[] renderers = currentModel.GetComponentsInChildren< Renderer >();
        foreach (Renderer renderer in renderers)
        {
            Material[] materials = renderer.materials;
            
            for (int i = 0; i < materials.Length; i++)
            {
                string matName = materials[i].name;
                if (originalMaterials.ContainsKey(matName))
                {
                    materials[i] = new Material(originalMaterials[matName]);
                }
            }
            
            renderer.materials = materials;
        }
        
        Debug.Log("Matériaux réinitialisés");
    }
}
                  </code>
                </pre>
                                <Button size="sm" variant="ghost" class="absolute top-3 right-3 h-6 w-6 p-0">
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
            <h2 class="text-2xl font-bold mb-4">Exemple complet d'une application immobilière</h2>
            <Card>
                <CardContent class="pt-6">
                    <p class="mb-4">
                        L'exemple suivant montre comment créer une application immobilière complète avec navigation
                        entre les propriétés,
                        visualisation en VR et fonctions de personnalisation.
                    </p>

                    <div class="flex flex-col lg:flex-row gap-4 mb-6">
                        <div class="lg:w-1/2">
                            <img src="/images/generate/image_generate.png" alt="Exemple d'application Unity"
                                class="rounded-md border w-full h-auto">
                        </div>
                        <div class="lg:w-1/2">
                            <img src="/images/generate/image_generate.png" alt="Exemple d'application Unity en VR"
                                class="rounded-md border w-full h-auto">
                        </div>
                    </div>

                    <Alert variant="info">
                        <InfoIcon class="h-4 w-4" />
                        <AlertTitle>Projet d'exemple complet</AlertTitle>
                        <AlertDescription>
                            <p class="mb-2">
                                Nous proposons un projet Unity complet démontrant l'intégration du SDK VizHome :
                            </p>
                            <div class="flex gap-4 mt-2">
                                <Button as-child>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Télécharger le projet d'exemple
                                    </a>
                                </Button>
                                <Button variant="outline" as-child>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Voir sur GitHub
                                    </a>
                                </Button>
                            </div>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between">
            <Button variant="outline" class="gap-1" as-child>
                <NuxtLink to="/docs/sdk/python">
                    <ArrowLeftIcon class="h-4 w-4" />
                    SDK Python
                </NuxtLink>
            </Button>
            <Button variant="outline" class="gap-1" as-child>
                <NuxtLink to="/docs/sdk/api">
                    Référence API
                    <ArrowRightIcon class="h-4 w-4" />
                </NuxtLink>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ArrowRightIcon, ArrowLeftIcon,
    InfoIcon, ClipboardIcon,
} from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
    layout: 'docs',
})
</script>