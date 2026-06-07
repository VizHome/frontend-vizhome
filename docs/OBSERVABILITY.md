# Observability

Doc unifiée pour l'observabilité runtime de VizHome (backend Django).
Sert à : tracer une requête lente end-to-end, debugger un job Celery
foireux, comprendre où le temps passe sur le chemin
Django > Celery > Postgres > Redis > Gemini.

## TL;DR stack actuelle

| Brique | Outil | Statut | Activation |
|---|---|---|---|
| Backend traces distribués | OpenTelemetry (OTLP gRPC) | Configurable | `OTEL_EXPORTER_OTLP_ENDPOINT` |
| Logs | stdout Docker + `LOGGING` Django | Déjà actif | (par défaut) |
| Metrics Prometheus | (non installé) | TODO | hors scope ici |
| Frontend errors | logger console + `window.onerror` | Déjà actif | `utils/logger.ts` |

Côté frontend, pas de SDK de monitoring externe : `utils/logger.ts`
forwarde `logger.error(...)` vers `console.error` même en prod (pour que
les utilisateurs power qui ouvrent la DevTools voient quelque chose).
Tous les autres niveaux (`debug/info/log/warn`) sont no-op en prod pour
ne pas polluer.

---

## OpenTelemetry backend

### Pourquoi

Pour les **traces distribuées** multi-services : Django > Celery > Redis >
Postgres > Stripe HTTP > Gemini HTTP, le tout dans une seule timeline.
OTel est vendor-neutral : on peut switcher Tempo <=> Honeycomb <=> Jaeger
sans toucher le code applicatif.

### Setup

Module : `src/config/otel.py`. Hook : dernières lignes de
`src/config/settings/prod.py` (`from config.otel import init_otel ; init_otel()`).

Auto-instrumentations activées :

- `DjangoInstrumentor` : span par requête HTTP, middlewares, vues.
- `CeleryInstrumentor` : span par task (producer + worker), avec
  propagation du trace_id du caller HTTP.
- `PsycopgInstrumentor` : span par requête SQL.
- `RedisInstrumentor` : span par commande Redis (cache + broker + locks).
- `RequestsInstrumentor` : span par appel HTTP sortant (Stripe, Gemini,
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

(Le `docker-compose.observability.yml` n'est pas encore commit, c'est
un chantier séparé.)

### Désactivation

Si `OTEL_EXPORTER_OTLP_ENDPOINT` est absent ou vide, `init_otel()` est
un **no-op total** : pas d'import des SDKs, pas d'instrumentation, zéro
overhead. C'est la config par défaut en dev local.

### Performance

- BatchSpanProcessor : les spans sont bufferisés et envoyés par paquets
  (défaut 5s / 512 spans). Pas d'I/O synchrone sur le path request.
- En cas d'indisponibilité du collector, les spans sont droppés
  silencieusement (warning dans les logs au pire). Pas de blocage de
  l'app.

---

## Manque / chantiers ouverts

- [ ] Dashboards Grafana (latence p50/p95/p99 par endpoint, taux
  d'erreur Celery, etc.) pas encore créés.
- [ ] Loki pour les logs structurés (actuellement c'est stdout Docker).
- [ ] Métriques Prometheus (compteurs métier : renders/min,
  signups/jour, etc.).
- [ ] Alerting (Grafana Alertmanager, PagerDuty, etc.).
- [ ] Propagation `traceparent` frontend => backend pour stitcher les
  traces end-to-end (nécessite un wrapper `useApi` qui injecte le
  header).
