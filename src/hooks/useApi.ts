import { useState, useCallback } from 'react';
import { watchlistService } from '@/lib/api/watchlists';
import { eventService } from '@/lib/api/events';
import type { Event } from '@/types/api/events';
import type { Watchlist } from '@/types/api/watchlists';

type ApiState<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

export function useWatchlists() {
  const [state, setState] = useState<ApiState<Watchlist[]>>({
    loading: false,
    error: null,
    data: null,
  });

  const getWatchlists = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await watchlistService.getAll();
      setState({ data, loading: false, error: null });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      setState(prev => ({ ...prev, error, loading: false }));
      throw err;
    }
  }, []);

  return {
    watchlists: state.data,
    loading: state.loading,
    error: state.error,
    getWatchlists,
  };
}

export function useEvents() {
  const [state, setState] = useState<ApiState<Event[]>>({
    loading: false,
    error: null,
    data: null,
  });

  const getEventsByWatchlist = useCallback(async (watchlistId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await eventService.getByWatchlist(watchlistId);
      setState({ data, loading: false, error: null });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      setState(prev => ({ ...prev, error, loading: false }));
      throw err;
    }
  }, []);

  const createEvent = useCallback(async (watchlistId: string, description: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await eventService.create(watchlistId, description);
      setState(prev => ({
        ...prev,
        data: prev.data ? [...prev.data, data] : [data],
        loading: false,
        error: null
      }));
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error occurred';
      setState(prev => ({ ...prev, error, loading: false }));
      throw err;
    }
  }, []);

  return {
    events: state.data,
    loading: state.loading,
    error: state.error,
    getEventsByWatchlist,
    createEvent,
  };
}