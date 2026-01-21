self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('/chat') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/chat');
            }
        })
    );
});

self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'New message received',
            icon: '/icons/192.png',
            badge: '/icons/192.png',
            tag: data.tag || 'chat-notification',
            requireInteraction: false,
            data: data.data || {}
        };

        event.waitUntil(
            self.registration.showNotification(data.title || 'Chat App', options)
        );
    }
});
