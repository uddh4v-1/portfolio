
import { lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import WorkView from './components/portfolio/WorkView';
import WIPBanner from './components/portfolio/WIPBanner';
import { Toaster } from './components/ui/sonner';
import { queryClientInstance } from './lib/query-client';

const AboutView = lazy(() => import('./components/portfolio/AboutView'));

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<WorkView activeTab="work" />} />
        <Route path="about" element={<Suspense fallback={null}><AboutView /></Suspense>} />
        {/* <Route path="plugins" element={<WorkView activeTab="plugins" />} /> */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
  
      <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AppContent />
          </Router>
          <Toaster />
          <WIPBanner />
      </QueryClientProvider>
  
  )
}

export default App