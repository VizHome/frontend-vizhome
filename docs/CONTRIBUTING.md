# Contribuer — frontend-vizhome

Merci de contribuer ! Ce guide résume les conventions et le workflow PR.

## Workflow

1. **Fork** le repo (ou crée une branche si membre de l'org)
2. **Clone + setup** : voir [DEVELOPMENT.md](./DEVELOPMENT.md)
3. **Branche** : `feature/ma-feature`, `fix/mon-bug`, `chore/refactor`
4. **Commits atomiques** — un commit = une intention
5. **Lint + tests** : `npm run lint && npm run test`
6. **PR** vers `main` avec description claire

## Conventions de commit

[Conventional Commits](https://www.conventionalcommits.org/) :

```
feat(auth): add GitHub OAuth callback page
fix(render): handle Gemini failure gracefully
docs(api): document presigned upload flow
chore(deps): bump nuxt to 4.5
refactor(useUser): extract preference mapping
test(useAuth): add 2FA challenge tests
```

Types : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`,
`perf`, `ci`.

## Style Vue / TypeScript

- **Vue 3 Composition API** uniquement (pas d'Options API)
- **`<script setup lang="ts">`** systématique
- **Tailwind d'abord**, CSS scoped en dernier recours
- **Auto-imports Nuxt** — pas besoin d'importer `ref`, `computed`,
  `useRoute`, etc.
- **Composants UI shadcn** auto-importés depuis `components/ui/`
- **Single quotes** pour les strings
- **2 espaces** d'indentation

## Style des composables

```ts
// ✅ Bon
const data = ref<Data | null>(null)  // état partagé hoisted

export function useFeature() {
  const api = useApi()

  async function fetch() {
    data.value = await api('/...')
  }

  return { data, fetch }
}

// ❌ Mauvais
export function useFeature() {
  const data = ref<Data | null>(null)  // NON partagé entre instances !
  return { data }
}
```

Les composables doivent :
- Avoir leur état partagé hoisted au niveau du module
- Retourner uniquement ce qui est utile (pas tout l'état interne)
- Être pures de side-effects DOM (utiliser `import.meta.client` si besoin)

## Style des composants

- **Props typées** :
  ```vue
  <script setup lang="ts">
  defineProps<{
    title: string
    count?: number
  }>()
  </script>
  ```

- **Émits typés** :
  ```vue
  defineEmits<{
    'update:open': [value: boolean]
    'save': []
  }>()
  ```

- **defineModel** pour les two-way bindings :
  ```vue
  const open = defineModel<boolean>('open', { default: false })
  ```

## Tests

Pour chaque PR avec du nouveau code :

- [ ] Composable → test de la signature publique
- [ ] Component → test de rendu + interactions clés
- [ ] Page → smoke test au minimum

```ts
import { describe, it, expect, beforeEach } from 'vitest'

describe('useAuth', () => {
  it('login sets tokens', async () => {
    const auth = useAuth()
    await auth.login('test@x.fr', 'pwd')
    expect(auth.isAuthenticated.value).toBe(true)
  })
})
```

## Lint avant push

```bash
npm run lint:fix         # auto-fix
npm run test --run       # tous les tests
```

Le CI rejette les PRs avec :
- Erreurs ESLint
- Tests qui échouent
- Build qui plante

## Ouvrir une issue

Avant d'ouvrir une PR pour un changement non-trivial, **ouvrir une
issue** pour valider l'approche.

Pour les **bugs** :
- Étapes de reproduction
- Comportement attendu vs observé
- Console errors
- Navigateur + OS

Pour les **features** :
- Use case
- Mockup ou wireframe si UI
- Impact backend ? (créer une issue parallèle sur backend-vizhome)

## Composants UI — règles

- **Ne jamais éditer** les composants `components/ui/*` directement
  pour ajouter de la logique métier
- Au lieu de ça, créer un wrapper :
  ```vue
  <!-- components/MyButton.vue -->
  <template>
    <Button v-bind="$attrs" class="my-custom-class">
      <slot />
    </Button>
  </template>
  ```
- Si vraiment besoin d'éditer un composant shadcn, **commit explicite**
  expliquant pourquoi

## Sécurité

::: warning
**Ne jamais commit** :
- `.env` (uniquement `.env.example`)
- Tokens JWT, clés OAuth secrets, clés Stripe
- Données utilisateurs réelles dans les fixtures

Si tu as accidentellement push un secret : **rotate immédiatement** côté
provider + force-push pour supprimer le commit.
:::

## Aide

- 💬 GitHub Discussions
- 📧 dev@vizhome.fr
- 🐛 [GitHub Issues](https://github.com/VizHome/frontend-vizhome/issues)
