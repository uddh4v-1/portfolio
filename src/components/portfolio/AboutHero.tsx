import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personal } from "../../constants/personal";
import { aboutPhotos } from "../../constants/carousel";
import { CAROUSEL_AUTO_SCROLL_SPEED } from "../../constants/animations";

const CAROUSEL_GAP = 2;

const CARD_WIDTHS = { sm: 130, md: 180, lg: 300 } as const;
const CARD_HEIGHTS = { sm: 195, md: 270, lg: 450 } as const;
const CARD_BREAKPOINTS = { sm: 480, md: 768 } as const;

const CARD_PERSPECTIVE = 900;
const CARD_MAX_CLAMP = 1.5;
const CARD_SCALE_BASE = 1.05;
const CARD_SCALE_FACTOR = 0.3;
const CARD_ROTATE_FACTOR = 42;
const CARD_EAGER_LOAD_COUNT = 4;

const repeated = [...aboutPhotos, ...aboutPhotos, ...aboutPhotos];

function getCardW() {
  const w = window.innerWidth;
  if (w < CARD_BREAKPOINTS.sm) return CARD_WIDTHS.sm;
  if (w < CARD_BREAKPOINTS.md) return CARD_WIDTHS.md;
  return CARD_WIDTHS.lg;
}

function getCardH() {
  const w = window.innerWidth;
  if (w < CARD_BREAKPOINTS.sm) return CARD_HEIGHTS.sm;
  if (w < CARD_BREAKPOINTS.md) return CARD_HEIGHTS.md;
  return CARD_HEIGHTS.lg;
}

export default function AboutHero() {
  const stripRef  = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<(HTMLDivElement | null)[]>([]);
  const tx        = useRef(0);
  const dragging  = useRef(false);
  const lastX     = useRef(0);
  const rafRef    = useRef<number | undefined>(undefined);
  const cardWRef  = useRef(200);
  const cardHRef  = useRef(300);

  useEffect(() => {
    const updateSize = () => {
      const cw = getCardW();
      const ch = getCardH();
      cardWRef.current = cw;
      cardHRef.current = ch;
      cardsRef.current.forEach(c => {
        if (!c) return;
        c.style.width  = `${cw}px`;
        c.style.height = `${ch}px`;
      });
      tx.current = -(aboutPhotos.length * (cw + CAROUSEL_GAP));
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const loop = () => {
      const stride = cardWRef.current + CAROUSEL_GAP;
      const loopW  = aboutPhotos.length * stride;

      if (!dragging.current) tx.current -= CAROUSEL_AUTO_SCROLL_SPEED;
      if (tx.current <= -loopW * 2) tx.current += loopW;
      if (tx.current >= 0)          tx.current -= loopW;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${tx.current}px)`;
      }

      const midX = window.innerWidth / 2;
      const cw   = cardWRef.current;
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardMid  = tx.current + i * stride + cw / 2;
        const t        = (cardMid - midX) / midX;
        const clampedT = Math.max(-CARD_MAX_CLAMP, Math.min(CARD_MAX_CLAMP, t));
        const absT     = Math.abs(clampedT);
        const scale    = CARD_SCALE_BASE - absT * CARD_SCALE_FACTOR;
        const rotateY  = -clampedT * CARD_ROTATE_FACTOR;
        card.style.transform = `perspective(${CARD_PERSPECTIVE}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('resize', updateSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => { dragging.current = true; lastX.current = e.clientX; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    tx.current += e.clientX - lastX.current;
    lastX.current = e.clientX;
  };
  const onMouseUp = () => { dragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => { dragging.current = true; lastX.current = e.touches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    tx.current += e.touches[0].clientX - lastX.current;
    lastX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => { dragging.current = false; };

  return (
    <section className="relative flex flex-col items-center pt-16 md:pt-28 pb-8 md:pb-16 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 mb-6 md:mb-14 px-6"
      >
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight mb-3">
          Hello, I'm {personal.firstName}
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          {personal.aboutTagline.split('makes things work').map((part, i) =>
            i === 0
              ? <span key={i}>{part}<span style={{ color: 'var(--brand)' }}>makes things work</span></span>
              : <span key={i}>{part}</span>
          )}
        </p>
      </motion.div>

      <div
        className="w-full cursor-grab active:cursor-grabbing select-none py-4 md:py-16 overflow-hidden"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div ref={stripRef} className="flex" style={{ willChange: 'transform' }}>
          {repeated.map((src, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-white/10"
              style={{
                width:       CARD_WIDTHS.sm,
                height:      CARD_HEIGHTS.sm,
                marginLeft:  CAROUSEL_GAP / 2,
                marginRight: CAROUSEL_GAP / 2,
                willChange:  'transform',
              }}
            >
              <img
                src={src}
                alt={`Photo ${(i % aboutPhotos.length) + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                loading={i < CARD_EAGER_LOAD_COUNT ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
