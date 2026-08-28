import { CloudOff } from 'lucide-react';

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex items-center gap-3 rounded-card border border-signal-progress/30 bg-signal-progress/5 px-5 py-4 text-sm text-ink-100">
      <CloudOff size={18} className="shrink-0 text-signal-progress" />
      <p>{message}</p>
    </div>
  );
}
