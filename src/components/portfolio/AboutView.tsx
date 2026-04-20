
import { motion } from 'framer-motion';
import AboutHero from './AboutHero';
// import PostsSection from './PostsSection';
import { TextReveal } from '../ui/text-reveal';
import { personal } from '../../constants/personal';

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
      <TextReveal className="mb-16 md:mb-24">{personal.aboutBio}</TextReveal>
      {/* <PostsSection /> */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Life & Adventure</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Moments beyond the screen.</p>
        <div className="flex flex-col gap-4">
          {['REPLACE_VIDEO_ID_1', 'REPLACE_VIDEO_ID_2', 'REPLACE_VIDEO_ID_3'].map((id, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-video bg-gray-100 dark:bg-white/5">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={`Adventure video ${i + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}