import { eventService } from '@/lib/api/events';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { watchlistId, description } = await request.json();
    const newEvent = await eventService.create(watchlistId, description);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const watchlistId = searchParams.get('watchlistId');
    
    if (!watchlistId) {
      return NextResponse.json(
        { error: 'watchlistId is required' },
        { status: 400 }
      );
    }

    const events = await eventService.getByWatchlist(watchlistId);
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}