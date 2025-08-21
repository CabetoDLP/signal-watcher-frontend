import type { Event } from './events';

export interface Watchlist {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WatchlistWithEvents extends Watchlist {
  events: Event[];
}
