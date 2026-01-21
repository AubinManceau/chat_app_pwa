# 🔔 Service Workers & Notifications

Le système de notification repose sur un **Service Worker (`sw.js`)** situé à la racine du dossier `public`. C'est le cœur de la fonctionnalité PWA.

## Cycle de Vie du Service Worker

1.  **Registration :** Le composant `ServiceWorkerRegistration.tsx` enregistre `sw.js` au chargement de l'application.
2.  **Install & Activate :** Le SW s'installe et prend le contrôle immédiat (`clients.claim()`) pour gérer les clients sans rechargement.

## Gestion des Notifications Push

Les notifications ne sont pas déclenchées par le code React principal (qui est inactif en arrière-plan), mais par le Service Worker qui écoute les événements système.

### Le Listener `push`

```javascript
// public/sw.js
self.addEventListener('push', (event) => {
    const data = event.data.json();
    
    // Construction de l'option de notification
    const options = {
        body: data.body,
        icon: '/icons/192.png',
        tag: 'chat-notification', // Permet de grouper/remplacer les notifs
        data: { url: '/chat' } // Données pour le clic
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
```

### Interaction (`notificationclick`)

Lorsque l'utilisateur clique sur la notification :
1.  L'événement `notificationclick` est capturé.
2.  Le SW cherche une fenêtre (client) déjà ouverte sur `/chat`.
    *   Si trouvée : Il lui donne le focus (`client.focus()`).
    *   Sinon : Il ouvre une nouvelle fenêtre (`clients.openWindow('/chat')`).

## Permissions

La demande de permission est gérée dans le `NotificationContext`.
*   État `default` : On demande la permission.
*   État `granted` : On peut envoyer des notifications.
*   État `denied` : L'utilisateur a bloqué les notifications.
