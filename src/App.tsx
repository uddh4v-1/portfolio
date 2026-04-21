
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import WorkView from './components/portfolio/WorkView';
import WIPBanner from './components/portfolio/WIPBanner';
import { Toaster } from './components/ui/sonner';

const AboutView  = lazy(() => import('./components/portfolio/AboutView'));
const ResumeView = lazy(() => import('./components/portfolio/ResumeView'));

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<WorkView activeTab="work" />} />
        <Route path="about"  element={<Suspense fallback={null}><AboutView /></Suspense>} />
        <Route path="resume" element={<Suspense fallback={null}><ResumeView /></Suspense>} />
        {/* <Route path="plugins" element={<WorkView activeTab="plugins" />} /> */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster />
      <WIPBanner />
    </Router>
  );
}

export default App
