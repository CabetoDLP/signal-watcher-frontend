import { EventForm } from '@/components/ui/EventForm';
import { EventList } from '@/components/ui/EventList';
import Link from 'next/link';
import { watchlistService } from '@/lib/api/watchlists';

async function getWatchlist(id: string) {
  return await watchlistService.getById(id);
}

export default async function WatchlistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params; // 👈 ahora sí esperamos params
  const watchlist = await getWatchlist(id);

  return (
    <div className="space-y-8">
      <Link
        href="/dashboard/watchlists"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        ← Back to Watchlists
      </Link>

      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{watchlist.name}</h2>
        <p className="text-sm text-gray-500">
          Creado el {new Date(watchlist.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Event</h3>
          <EventForm watchlistId={watchlist.id} />
        </div>
        <div>
          <EventList events={watchlist.events} />
        </div>
      </div>
    </div>
  );
}
