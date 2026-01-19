import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, image_data } = body;

        console.log('📤 Envoi image - ID:', id, 'Taille data:', image_data?.length || 0);

        const response = await fetch('https://api.tools.gavago.fr/socketio/api/images/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, image_data })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erreur API externe:', response.status, errorText);
            return NextResponse.json(
                { error: `API error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('✅ Image envoyée avec succès');
        return NextResponse.json(data);
    } catch (error) {
        console.error('❌ Erreur dans POST /api/images:', error);
        return NextResponse.json(
            { error: 'Failed to upload image', details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Missing image ID' },
                { status: 400 }
            );
        }

        console.log('📥 Récupération image - ID:', id);

        const response = await fetch(`https://api.tools.gavago.fr/socketio/api/images/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erreur API externe:', response.status, errorText);
            return NextResponse.json(
                { error: `API error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('✅ Image récupérée avec succès');
        return NextResponse.json(data);
    } catch (error) {
        console.error('❌ Erreur dans GET /api/images:', error);
        return NextResponse.json(
            { error: 'Failed to fetch image', details: (error as Error).message },
            { status: 500 }
        );
    }
}
