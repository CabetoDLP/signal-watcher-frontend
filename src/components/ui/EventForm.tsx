'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/base';

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function EventForm({ watchlistId }: { watchlistId: string }) {
  const router = useRouter();
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
      await api.post('/api/events/create', {
        watchlistId,
        description: values.description,
      });

      reset();
      router.refresh();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Event Description
        </label>
        <textarea
          id="description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {isSubmitting ? 'Processing...' : 'Submit Event'}
      </button>
    </form>
  );
}
