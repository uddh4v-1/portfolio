import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personal } from "../../constants/personal";

const photos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=600&fit=crop",
];

const repeated = [...photos, ...photos, ...photos];
const GAP = 2;

function getCardW() {
  const w = window.innerWidth;
  if (w < 480) return 180;
  if (w < 768) return 220;
  return 300;
}

function getCardH() {
  const w = window.innerWidth;
  if (w < 480) return 270;
  if (w < 768) return 330;
  return 450;
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
      // update each card's inline size
      cardsRef.current.forEach(c => {
        if (!c) return;
        c.style.width  = `${cw}px`;
        c.style.height = `${ch}px`;
      });
      // reset loop position
      tx.current = -(photos.length * (cw + GAP));
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const loop = () => {
      const stride = cardWRef.current + GAP;
      const loopW  = photos.length * stride;

      if (!dragging.current) tx.current -= 0.6;
      if (tx.current <= -loopW * 2) tx.current += loopW;
      if (tx.current >= 0)          tx.current -= loopW;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${tx.current}px)`;
      }

      const midX  = window.innerWidth / 2;
      const rects = cardsRef.current.map(c => c?.getBoundingClientRect() ?? null);
      rects.forEach((rect, i) => {
        const card = cardsRef.current[i];
        if (!card || !rect) return;
        const cardMid = rect.left + rect.width / 2;
        const t       = (cardMid - midX) / midX;
        const clampedT = Math.max(-1.5, Math.min(1.5, t));
        const absT    = Math.abs(clampedT);
        const scale   = 1.05 - absT * 0.3;
        const rotateY = -clampedT * 42;
        card.style.transform = `perspective(900px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
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
    <section className="relative flex flex-col items-center pt-16 md:pt-28 pb-8 md:pb-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 mb-10 md:mb-14 px-6"
      >
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight mb-3">
          Hello, I'm {personal.firstName}
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          {personal.aboutTagline.split('makes things work').map((part, i) =>
            i === 0
              ? <span key={i}>{part}<span style={{ color: '#f97316' }}>makes things work</span></span>
              : <span key={i}>{part}</span>
          )}
        </p>
      </motion.div>

      <div
        className="w-full cursor-grab active:cursor-grabbing select-none py-8 md:py-16 overflow-hidden"
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
                width:       300,
                height:      450,
                marginLeft:  GAP / 2,
                marginRight: GAP / 2,
                willChange:  'transform',
              }}
            >
              <img
                src={src}
                alt={`Photo ${(i % photos.length) + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
