import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const events = await db.event.findMany({
            orderBy: [
                {
                    date: 'asc',
                },
                {
                    time: 'asc',
                },
            ],
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Error fetching events' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const event = await db.event.create({
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

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Error creating event' },
            { status: 500 }
        );
    }
}
