// components/ui/CreateWatchlistForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { watchlistService } from '@/lib/api/watchlists';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(50, { message: "Name must be less than 50 characters." })
});

export function CreateWatchlistForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError(null);
      const watchlist = await watchlistService.create(values.name);
      
      // Redirigir a la watchlist recién creada
      router.push(`/dashboard/watchlists/${watchlist.id}`);
    } catch (error: any) {
      console.error('Error creating watchlist:', error);
      
      // Manejar errores específicos del backend
      if (error.response?.status === 409) {
        setError('A watchlist with this name already exists. Please choose a different name.');
      } else if (error.response?.status === 400) {
        setError('Invalid input. Please check your data and try again.');
      } else {
        setError('Failed to create watchlist. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Watchlist Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter watchlist name..."
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 px-4 py-2 rounded-md text-white font-medium ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Watchlist'}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}