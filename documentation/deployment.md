# 🚀 Deployment Architecture

Le déploiement de l'application peut se faire via un hébergement Node.js standard ou via Docker.

## Build Process (Next.js)

L'application utilise le compilateur de Next.js.

```bash
# Transpilation du TypeScript et bundling
npm run build
```

Cela génère le dossier `.next` qui contient :
*   Le code serveur optimisé via Turbopack/Webpack.
*   Les assets statiques.
*   Le `manifest.json` et les Service Workers pour la PWA.

## Docker Deployment

Pour un déploiement conteneurisé, nous utilisons un **Dockerfile** multi-stage (exemple basé sur l'image officielle Next.js).

### Structure du Dockerfile (Recommandée)

1.  **Deps Stage :** Installation des dépendances (`npm ci`).
2.  **Builder Stage :** Construction de l'application (`npm run build`).
3.  **Runner Stage :** Image de production légère (Alpine Linux).
    *   Copie uniquement du dossier `.next/standalone` (Output Tracing).
    *   Copie de `public/` et `.next/static`.

### Commandes

```bash
# Build de l'image
docker build -t chat-app-pwa .

# Run du conteneur (Map port 3000)
docker run -p 3000:3000 -e PORT=3000 chat-app-pwa
```

## Variables d'Environnement

L'application nécessite certaines variables pour fonctionner correctement en production (fichier `.env.local` ou variables système) :

*   `NEXT_PUBLIC_SOCKET_URL` : URL du serveur Socket.io (si séparé).
*   `NEXT_PUBLIC_API_URL` : URL de l'API backend.
