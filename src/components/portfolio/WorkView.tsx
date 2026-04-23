import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ToolStack from "./ToolStack";
import ExperienceSection from "./ExperienceSection";
import PluginsSection from "./PluginsSection";
import SpotifyWidget from "./SpotifyWidget";
// import ProjectsSection from "./ProjectSection";

type WorkViewProps = {
  activeTab?: 'work' | 'plugins';
};

export default function WorkView({ activeTab = 'work' }: WorkViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      {activeTab === 'work' && (
        <>
          <HeroSection />
          <ToolStack />
          <ExperienceSection />
          {/* <ProjectsSection /> */}
          <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-12">
            <SpotifyWidget />
          </div>
        </>
      )}
      {activeTab === 'plugins' && (
        <PluginsSection />
      )}
    </motion.div>
  );
}
