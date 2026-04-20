import { useState } from 'react';
import { X } from 'lucide-react';

export default function WIPBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-yellow-400/40 bg-yellow-950/80 px-5 py-3 text-sm text-yellow-200 shadow-lg backdrop-blur-md">
      <span className="text-yellow-400">🚧</span>
      <span>This website is a work in progress — some sections may be incomplete.</span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-1 rounded-full p-0.5 text-yellow-400 hover:bg-yellow-400/20 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
