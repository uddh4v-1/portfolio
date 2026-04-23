import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personal } from "../../constants/personal";
import { aboutPhotos } from "../../constants/carousel";

const repeated = [...aboutPhotos, ...aboutPhotos, ...aboutPhotos];
const GAP = 2;

function getCardW() {
  const w = window.innerWidth;
  if (w < 480) return 130;
  if (w < 768) return 180;
  return 300;
}

function getCardH() {
  const w = window.innerWidth;
  if (w < 480) return 195;
  if (w < 768) return 270;
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
      tx.current = -(aboutPhotos.length * (cw + GAP));
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const loop = () => {
      const stride = cardWRef.current + GAP;
      const loopW  = aboutPhotos.length * stride;

      if (!dragging.current) tx.current -= 0.6;
      if (tx.current <= -loopW * 2) tx.current += loopW;
      if (tx.current >= 0)          tx.current -= loopW;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${tx.current}px)`;
      }

      const midX  = window.innerWidth / 2;
      const cw    = cardWRef.current;
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardMid = tx.current + i * stride + cw / 2;
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
                width:       130,
                height:      195,
                marginLeft:  GAP / 2,
                marginRight: GAP / 2,
                willChange:  'transform',
              }}
            >
              <img
                src={src}
                alt={`Photo ${(i % aboutPhotos.length) + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
