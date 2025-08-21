import Link from 'next/link';
import type { Watchlist } from '@/types/api/watchlists';

interface WatchlistCardProps {
  watchlist: Watchlist;
}

export function WatchlistCard({ watchlist }: WatchlistCardProps) {
  return (
     <Link href={`/dashboard/watchlists/${watchlist.id}`}>
      <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">{watchlist.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Created: {new Date(watchlist.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}