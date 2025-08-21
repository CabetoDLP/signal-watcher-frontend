import type { Event } from '@/types/api/events';

export function SeverityBadge({ severity }: { severity: Event['aiSeverity'] }) {
  if (!severity) return null;

  const severityClasses = {
    CRITICAL: 'bg-red-100 text-red-800',
    HIGH: 'bg-orange-100 text-orange-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-green-100 text-green-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityClasses[severity]}`}>
      {severity}
    </span>
  );
}