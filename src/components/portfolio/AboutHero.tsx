import { useState } from "react";
import { motion } from "framer-motion";

// Fan of photos — replicate the screenshot layout
const photos = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    rotate: -35,
    x: -420,
    y: 40,
    scale: 0.82,
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    rotate: -20,
    x: -260,
    y: 10,
    scale: 0.9,
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    rotate: -8,
    x: -110,
    y: 0,
    scale: 0.95,
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
    rotate: 4,
    x: 50,
    y: 5,
    scale: 0.95,
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=600&fit=crop",
    rotate: 16,
    x: 210,
    y: 10,
    scale: 0.9,
  },
  {
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=600&fit=crop",
    rotate: 28,
    x: 360,
    y: 30,
    scale: 0.84,
  },
  {
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=600&fit=crop",
    rotate: 40,
    x: 490,
    y: 55,
    scale: 0.78,
  },
];

export default function AboutHero() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      className="relative flex flex-col items-center pt-32 pb-0 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 mb-16 px-6"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-3">
          Hello, I'm Nishant
        </h1>
        <p className="text-base text-gray-500">
          A product designer crafting{" "}
          <span className="text-orange-500 font-medium">human-first</span>{" "}
          experiences.
        </p>
      </motion.div>

      {/* Photo Fan - Desktop */}
      <div
        className="relative w-full hidden md:flex items-end justify-center"
        style={{ height: 420, marginTop: -20 }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, rotate: photo.rotate }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotate }}
            transition={{
              duration: 0.7,
              delay: i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.06, zIndex: 20, rotate: photo.rotate * 0.5 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              width: 160,
              height: 240,
              marginLeft: photo.x - 80,
              transform: `rotate(${photo.rotate}deg) scale(${photo.scale})`,
              transformOrigin: "bottom center",
              zIndex: hovered === i ? 20 : i,
              cursor: "pointer",
            }}
            className="rounded-2xl overflow-hidden shadow-lg border-2 border-white"
          >
            <img
              src={photo.src}
              alt={`Photo ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Photo Strip - Mobile */}
      <div className="flex md:hidden gap-3 px-4 overflow-x-auto pb-4 w-full mt-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="flex-shrink-0 w-32 h-48 rounded-2xl overflow-hidden shadow-md border-2 border-white"
          >
            <img
              src={photo.src}
              alt={`Photo ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
