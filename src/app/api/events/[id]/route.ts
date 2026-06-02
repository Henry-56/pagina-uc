import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const event = await db.event.findUnique({
            where: { id },
        });

        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json(
            { error: 'Error fetching event' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await req.json();

        const event = await db.event.update({
            where: { id },
            data: {
                date: data.date || '',
                time: data.time,
                title: data.title,
                speaker: data.speaker,
                type: data.type,
                career: data.career,
                meetLink: data.meetLink || null,
            },
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json(
            { error: 'Error updating event' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await db.event.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { error: 'Error deleting event' },
            { status: 500 }
        );
    }
}
