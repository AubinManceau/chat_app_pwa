# � Media Handling Architecture

La gestion des médias (photos) combine l'API native du navigateur (`MediaDevices`) et l'envoi de données binaires via Socket.io/API.

## Capture d'image (`CameraView.tsx`)

Nous utilisons l'API `navigator.mediaDevices.getUserMedia` pour accéder au flux vidéo.

```typescript
// Initialisation du flux
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
videoRef.current.srcObject = stream;
```

### Processus de Capture
1.  **Flux Vidéo :** Affiché dans un élément `<video>` avec `autoplay`.
2.  **Capture :** Au clic, l'image courante de la vidéo est dessinée sur un `<canvas>` invisible (`message.canvas.getContext('2d').drawImage()`).
3.  **Conversion :** Le canvas est converti en chaîne Base64 via `toDataURL("image/jpeg", 0.7)`. La compression JPEG (0.7) est appliquée pour réduire la taille du payload.

## Persistence Locale

Les photos prises sont temporairement stockées dans le `localStorage` du navigateur sous la clé `photos`. Cela permet de créer une galerie persistante côté client sans charger le serveur.

> **Note technique :** Le stockage en `localStorage` est limité (généralement 5-10MB). Cette solution est adaptée pour un cache temporaire mais devrait être remplacée par `IndexedDB` pour un stockage plus robuste à long terme.

## Envoi des images

L'envoi se fait de deux manières pour assurer la fiabilité et la performance :

1.  **Upload API (POST `/api/images`) :** 
    *   L'image (Base64) est envoyée à un endpoint API dédié.
    *   Cela permet de stocker l'image sur le serveur (ou un stockage cloud comme S3) et de récupérer une URL.
    
2.  **Socket Fallback / Prévisualisation :** 
    *   Pour une diffusion immédiate, l'image peut aussi être envoyée via le socket (`socket.sendImageMessage`).
    *   **Attention :** Envoyer de gros blobs Base64 via WebSocket peut bloquer la connexion. Il est recommandé de privilégier l'envoi d'URL après upload API réussi.
