// src/types/api/events.ts
export interface Event {
  id: string;
  description: string;
  aiSummary?: string;
  aiSeverity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  aiAction?: string;
  createdAt: string; // Prisma devuelve ISO string en JSON
  watchlistId?: string; // opcional si tu backend lo incluye
}
