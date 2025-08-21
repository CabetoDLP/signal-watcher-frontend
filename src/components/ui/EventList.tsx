import type { Event } from '@/types/api/events';
import { SeverityBadge } from './SeverityBadge';

export function EventList({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No events yet. Create your first event.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {event.description}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </div>
              {event.aiSeverity && <SeverityBadge severity={event.aiSeverity} />}
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              {event.aiSummary && (
                <p className="text-sm text-gray-800 mb-3">
                  {event.aiSummary}
                </p>
              )}
              {event.aiAction && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">Suggested Action:</p>
                  <p className="text-sm text-gray-600">
                    {event.aiAction}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}