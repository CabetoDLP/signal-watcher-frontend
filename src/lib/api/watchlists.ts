import api from './base';
import type { Watchlist, WatchlistWithEvents } from '@/types/api/watchlists';

export const watchlistService = {
  getAll: async (): Promise<Watchlist[]> => {
    const response = await api.get('/api/watchlists');
    return response.data;
  },

  getById: async (id: string): Promise<WatchlistWithEvents> => {
    const response = await api.get(`/api/watchlists/${id}`);
    return response.data;
  },

  create: async (name: string): Promise<Watchlist> => {
    const response = await api.post('/api/watchlists', { name });
    return response.data;
  },

  update: async (id: string, name: string): Promise<Watchlist> => {
    const response = await api.put(`/api/watchlists/${id}`, { name });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/watchlists/${id}`);
  },
};
