export const ROLE_CYCLE_INTERVAL = 1800;
export const PHOTO_CYCLE_INTERVAL = 2500;
export const SPOTIFY_REFRESH_INTERVAL = 30_000;
export const DISCORD_REFRESH_INTERVAL = 30_000;
export const CLOCK_UPDATE_INTERVAL = 30_000;
export const EMAIL_COPY_RESET_MS = 2000;
export const STATS_COUNT_DURATION = 1000;
export const STATS_STAGGER_DELAY = 0.08;
export const CAROUSEL_AUTO_SCROLL_SPEED = 0.6;

export const WAVE_ROTATE_KEYFRAMES: number[] = [0, 14, -8, 14, -4, 10, 0];

export const WIP_SPRING_TRANSITION = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 28,
  delay: 0.6,
};

export const DRAG_HINT_DURATION_MS = 3000;
export const WIDGET_FLOAT_AMPLITUDE = -10;
export const WIDGET_FLOAT_DURATION = 3;

export const WIP_PAINT_CAN_TRANSITION = {
  duration: 2.8,
  repeat: Infinity,
  repeatDelay: 0.6,
  ease: 'easeInOut' as const,
};
