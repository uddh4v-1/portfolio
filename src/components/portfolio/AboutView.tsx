
import { motion } from 'framer-motion';
import AboutHero from './AboutHero';
import ExperienceSection from './ExperienceSection';
import PostsSection from './PostsSection';

export default function AboutView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="pt-14"
    >
      <AboutHero />
      <ExperienceSection />
      <PostsSection />
    </motion.div>
  );
}