import api from './base';
import type { Event } from '@/types/api/events';

export const eventService = {
  create: async (watchlistId: string, description: string): Promise<Event> => {
    const response = await api.post('/api/events/create', {
      watchlistId,
      description,
    });
    return response.data;
  },

  getByWatchlist: async (watchlistId: string): Promise<Event[]> => {
    const response = await api.get(`/api/watchlists/${watchlistId}/events`);
    return response.data;
  },
};
