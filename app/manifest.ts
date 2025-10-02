import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
        return {
                name: 'Chat App',
                short_name: 'Chat App',
                description: 'A simple chat application',
                start_url: '/',
                display: 'standalone',
                display_override: ["minimal-ui"],
                background_color: '#ffffff',
                theme_color: '#fbb1b1',
                icons: [
                        {
                                src: '/icons/192.png',
                                sizes: '192x192',
                                type: 'image/png',
                        },
                        {
                                src: '/icons/512.png',
                                sizes: '512x512',
                                type: 'image/png',
                        },
                ],
        }
}