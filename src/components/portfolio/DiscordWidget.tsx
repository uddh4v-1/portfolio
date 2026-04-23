import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Replace with your numeric Discord User ID
// To get it: Discord → Settings → Advanced → Developer Mode on → tap your profile → Copy ID
const DISCORD_USER_ID = '467296565305016320';

type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  discriminator: string;
};

type Activity = {
  name: string;
  details?: string;
  state?: string;
  type: number;
};

type LanyardData = {
  discord_user: DiscordUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Activity[];
  active_on_mobile: boolean;
};

const statusConfig = {
  online: { color: '#23a55a', label: 'Online' },
  idle:   { color: '#f0b232', label: 'Idle' },
  dnd:    { color: '#f23f43', label: 'Do not disturb' },
  offline:{ color: '#80848e', label: 'Offline' },
};

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.128 18.114a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function DiscordWidget() {
  const [data, setData] = useState<LanyardData | null | 'loading'>('loading');
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (DISCORD_USER_ID === 'YOUR_DISCORD_USER_ID') { setData(null); return; }

    const fetchStatus = () => {
      fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
        .then(r => r.json())
        .then(res => {
          if (res.success) setData(res.data as LanyardData);
          else setData(null);
        })
        .catch(() => setData(null));
    };

    fetchStatus();
    const id = setInterval(fetchStatus, 30_000);
    return () => clearInterval(id);
  }, []);

  const isLoading = data === 'loading';
  const hasData = data !== null && data !== 'loading';
  const d = hasData ? (data as LanyardData) : null;
  const status = d ? statusConfig[d.discord_status] : null;
  const avatarUrl = d?.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png?size=64`
    : null;
  const displayName = d?.discord_user.global_name ?? d?.discord_user.username ?? '';
  const currentActivity = d?.activities.find(a => a.type === 0);

  return (
    <motion.div
      drag={isMobile ? false : true}
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={{ top: -400, left: -600, right: 600, bottom: 600 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{ scale: 1.04, zIndex: 50 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      style={{
        cursor: isMobile ? 'default' : isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 40,
        maxWidth: 'min(320px, calc(100vw - 3rem))',
      }}
      className="inline-flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg"
    >
      {/* Avatar with status dot */}
      <div className="relative shrink-0">
        {isLoading ? (
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
        ) : avatarUrl ? (
          <img src={avatarUrl} alt={displayName} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
            <DiscordIcon />
          </div>
        )}
        {/* Status dot */}
        {status && (
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-50 dark:border-gray-900"
            style={{ background: status.color }}
          />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        {isLoading ? (
          <>
            <div className="h-2 w-16 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-1.5" />
            <div className="h-2 w-24 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-1" />
          </>
        ) : d ? (
          <>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-mono" style={{ color: status?.color }}>
                ● {status?.label}
              </span>
              {d.active_on_mobile && (
                <span className="text-[9px] text-gray-400 dark:text-gray-600">· mobile</span>
              )}
            </div>
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{displayName}</p>
            {currentActivity && (
              <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                {currentActivity.name}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 mb-0.5 text-[#5865F2]">
              <DiscordIcon />
              <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">Discord</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">Not connected</p>
            <p className="text-[10px] text-gray-300 dark:text-gray-700">Add user ID to activate</p>
          </>
        )}
      </div>
    </motion.div>
  );
}
