import Link from 'next/link';
import { watchlistService } from '@/lib/api/watchlists';

export default async function Home() {
  const watchlists = await watchlistService.getAll();

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Signal Watcher</h1>
        <Link 
          href="/dashboard/watchlists/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Watchlist
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {watchlists.map((watchlist) => (
          <Link 
            key={watchlist.id} 
            href={`/dashboard/watchlists/${watchlist.id}`}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">{watchlist.name}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Created: {new Date(watchlist.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}