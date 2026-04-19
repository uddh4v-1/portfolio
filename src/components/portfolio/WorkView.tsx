import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ToolStack from "./ToolStack";

import PluginsSection from "./PluginsSection";
import ProjectsSection from "./ProjectSection";

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
          <ProjectsSection />
        </>
      )}
      {activeTab === 'plugins' && (
        <PluginsSection />
      )}
    </motion.div>
  );
}
