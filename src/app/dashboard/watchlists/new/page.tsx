// app/dashboard/watchlists/new/page.tsx

import { CreateWatchlistForm } from '@/components/ui/CreateWatchlistForm';
import Link from 'next/link';

export default function NewWatchlistPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard/watchlists"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Watchlists
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900">Create New Watchlist</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create a new watchlist to organize and track your events.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <CreateWatchlistForm />
      </div>
    </div>
  );
}