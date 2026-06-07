# Observability

Doc unifiée pour l'observabilité runtime de VizHome (frontend + backend).
Sert à : retrouver une erreur user en prod, tracer une requête lente
end-to-end, debugger un job Celery foireux.

## TL;DR - stack actuelle

| Brique | Outil | Statut | Activation |
|---|---|---|---|
| Frontend errors + replay | Sentry browser (`@sentry/browser`) | Configurable | `NUXT_PUBLIC_SENTRY_DSN` |
| Backend errors + perf | Sentry Python (`sentry-sdk[django]`) | Déjà actif | `SENTRY_DSN` (env prod) |
| Backend traces distribués | OpenTelemetry (OTLP gRPC) | Configurable | `OTEL_EXPORTER_OTLP_ENDPOINT` |
| Logs | stdout Docker + `LOGGING` Django | Déjà actif | (par défaut) |
| Metrics Prometheus | (non installé) | TODO | hors scope ici |

---

## Sentry frontend

### Comment ça marche

Plugin Nuxt `plugins/sentry.client.ts` (client-only, donc pas exécuté
en SSR). Il initialise `@sentry/browser` si `NUXT_PUBLIC_SENTRY_DSN`
est défini, sinon il est totalement no-op.

Intégrations actives :

- `browserTracingIntegration` - traces de page navigation / fetch
  (sample rate 10 %).
- `replayIntegration` - session replays uniquement sur erreur
  (`replaysOnErrorSampleRate = 0.1`). Les replays "background" sont
  désactivés pour économiser quota Sentry.

Hooks Nuxt câblés :

- `vue:error` - capte les erreurs de render Vue.
- `app:error` - capte les erreurs de Nuxt (App.vue, page errors).

### Filtres `beforeSend`

Le plugin drop les erreurs cosmétiques connues pour éviter de polluer
Sentry :

- `ResizeObserver loop` (faux positif des navigateurs Chromium).
- `Non-Error promise rejection captured` (rejections sans Error
  réel, généralement du code tiers mal écrit).

Pour ajouter un filtre, éditer `plugins/sentry.client.ts` => `beforeSend`.

### Intégration au logger

`utils/logger.ts` route automatiquement `logger.error(...)` vers Sentry
quand le SDK est chargé. Une API explicite est aussi exposée :

```ts
import { captureException } from '~/utils/logger'

try {
  await doRisky()
} catch (e) {
  captureException(e, { feature: 'render', projectId })
}
```

L'import de `@sentry/browser` est dynamique => pas de coût bundle
si Sentry n'est pas init.

### Debugging local

1. Mettre `NUXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...` dans `.env`
   (DSN d'un projet de test, jamais le projet de prod).
2. Mettre `NUXT_PUBLIC_SENTRY_ENVIRONMENT=development` pour filtrer
   tes erreurs dans Sentry UI.
3. `npm run dev`.
4. Déclencher une erreur (ex : `throw new Error('test')` dans une page).
5. Vérifier qu'elle remonte dans Sentry > Issues.

### Configuration prod recommandée

- `NUXT_PUBLIC_SENTRY_DSN` => DSN du projet Sentry "vizhome-frontend".
- `NUXT_PUBLIC_SENTRY_ENVIRONMENT=production`.
- `tracesSampleRate` est à `0.1` (10 %) en dur dans le plugin - ajuster
  selon le quota.

---

## Sentry backend

Déjà actif via `src/config/settings/prod.py`. Variables :

- `SENTRY_DSN` => DSN du projet Sentry "vizhome-backend".
- `SENTRY_ENVIRONMENT` (défaut `production`).
- `SENTRY_TRACES_SAMPLE_RATE` (défaut `0.1`).
- `SENTRY_PROFILES_SAMPLE_RATE` (défaut `0.0`).

Intégrations : Django, Celery, Redis. `send_default_pii=False`
(conformité RGPD).

Rien à changer ici : seul le DSN diffère par environnement.

---

## OpenTelemetry backend

### Pourquoi en plus de Sentry

Sentry est excellent pour les **erreurs** et les transactions courtes
(une requête HTTP). OTel est meilleur pour les **traces distribuées**
multi-services : Django > Celery > Redis > Postgres > Stripe HTTP > Gemini
HTTP, le tout dans une seule timeline. Et OTel est vendor-neutral,
on peut switcher Tempo <=> Honeycomb <=> Jaeger sans toucher le code.

### Setup

Module : `src/config/otel.py`. Hook : dernières lignes de
`src/config/settings/prod.py` (`from config.otel import init_otel ; init_otel()`).

Auto-instrumentations activées :

- `DjangoInstrumentor` - span par requête HTTP, middlewares, vues.
- `CeleryInstrumentor` - span par task (producer + worker), avec
  propagation du trace_id du caller HTTP.
- `PsycopgInstrumentor` - span par requête SQL.
- `RedisInstrumentor` - span par commande Redis (cache + broker + locks).
- `RequestsInstrumentor` - span par appel HTTP sortant (Stripe, Gemini,
  GitHub OAuth, etc.).

### Variables d'environnement

| Var | Défaut | Description |
|---|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | (vide) | Endpoint OTLP gRPC. **Si vide, OTel est désactivé.** |
| `OTEL_SERVICE_NAME` | `vizhome-backend` | Nom du service dans les traces |
| `OTEL_ENVIRONMENT` | `production` | `deployment.environment` resource attribute |
| `OTEL_EXPORTER_OTLP_HEADERS` | (vide) | Headers OTLP (ex Honeycomb : `x-honeycomb-team=YOUR_KEY`) |

Détection HTTP/HTTPS : si l'endpoint commence par `http://`, le SDK
passe en mode `insecure` (pas de TLS). HTTPS sinon.

### Endpoints OTLP compatibles

| Backend | Endpoint | Headers requis |
|---|---|---|
| Tempo local (Docker) | `http://tempo:4317` | aucun |
| Jaeger local | `http://jaeger:4317` | aucun |
| Honeycomb | `https://api.honeycomb.io:443` | `x-honeycomb-team=<API_KEY>` |
| Grafana Cloud Tempo | `https://tempo-prod-XX.grafana.net:443` | `Authorization=Basic <token>` |
| Datadog | `https://trace.agent.datadoghq.com:443` | `dd-api-key=<KEY>` |

### Run un Tempo local en dev

Ajouter à un `docker-compose.observability.yml` séparé :

```yaml
services:
  tempo:
    image: grafana/tempo:latest
    command: ['-config.file=/etc/tempo.yaml']
    volumes:
      - ./observability/tempo.yaml:/etc/tempo.yaml
    ports:
      - '4317:4317'  # OTLP gRPC
      - '3200:3200'  # Tempo HTTP API

  grafana:
    image: grafana/grafana:latest
    ports:
      - '3001:3000'
    volumes:
      - ./observability/grafana-datasources.yaml:/etc/grafana/provisioning/datasources/ds.yaml
```

Puis dans le `.env` backend :

```
OTEL_EXPORTER_OTLP_ENDPOINT=http://tempo:4317
OTEL_ENVIRONMENT=development
```

Restart le backend, taper quelques requêtes, ouvrir Grafana
=> Explore => datasource Tempo => trace.

(Le `docker-compose.observability.yml` n'est pas encore commit - c'est
un chantier séparé.)

### Désactivation

Si `OTEL_EXPORTER_OTLP_ENDPOINT` est absent ou vide, `init_otel()` est
un **no-op total** : pas d'import des SDKs, pas d'instrumentation, zéro
overhead. C'est la config par défaut en dev local.

### Performance

- BatchSpanProcessor => les spans sont bufferisés et envoyés par
  paquets (défaut 5s / 512 spans). Pas d'I/O synchrone sur le path
  request.
- En cas d'indisponibilité du collector, les spans sont droppés
  silencieusement (warning dans les logs au pire). Pas de blocage de
  l'app.

---

## Corrélation Sentry <=> OTel

**État actuel : pas de corrélation automatique.**

Il existe `sentry-sdk` qui peut consommer le contexte OTel
(`SentrySpanProcessor`, `SentryPropagator`), permettant que :

- Un `trace_id` OTel apparaisse en tag sur une issue Sentry.
- Un lien direct mène d'une erreur Sentry à la trace Tempo associée.

Ce wiring n'est pas fait ici (chantier séparé). Voir la doc Sentry :
<https://docs.sentry.io/platforms/python/integrations/opentelemetry/>.

Pour l'activer côté backend, il faudra :

1. Ajouter `sentry-sdk[opentelemetry]` au requirements.
2. Importer `SentrySpanProcessor` et `SentryPropagator` dans `otel.py`.
3. Re-init `sentry_sdk` avec `instrumenter=SENTRY_INSTRUMENTER_OTEL`.

---

## Manque / chantiers ouverts

- [ ] Dashboards Grafana (latence p50/p95/p99 par endpoint, taux
  d'erreur Celery, etc.) - pas encore créés.
- [ ] Loki pour les logs structurés (actuellement c'est stdout Docker).
- [ ] Métriques Prometheus (compteurs métier : renders/min,
  signups/jour, etc.).
- [ ] Corrélation Sentry <=> OTel trace_id (voir section ci-dessus).
- [ ] Alerting (Grafana Alertmanager, PagerDuty, etc.).
- [ ] Sentry frontend : activer `tracePropagationTargets` pour propager
  `traceparent` au backend (pour stitching frontend <=> backend traces).
