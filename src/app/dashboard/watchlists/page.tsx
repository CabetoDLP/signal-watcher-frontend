import { WatchlistCard } from '@/components/ui/WatchListCard';
import Link from 'next/link';
import { watchlistService } from '@/lib/api/watchlists';

async function getWatchlists() {
  return await watchlistService.getAll(); // 👈 Axios en vez de fetch
}

export default async function WatchlistsPage() {
  const watchlists = await getWatchlists();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Your Watchlists</h2>
        <Link
          href="/dashboard/watchlists/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          New Watchlist
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {watchlists.map((watchlist) => (
          <WatchlistCard key={watchlist.id} watchlist={watchlist} />
        ))}
      </div>
    </div>
  );
}
