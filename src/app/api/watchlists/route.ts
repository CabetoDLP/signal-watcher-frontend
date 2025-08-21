import { watchlistService } from '@/lib/api/watchlists';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const watchlists = await watchlistService.getAll();
    return NextResponse.json(watchlists);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch watchlists' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const newWatchlist = await watchlistService.create(name);
    return NextResponse.json(newWatchlist, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create watchlist' },
      { status: 400 }
    );
  }
}