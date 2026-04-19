import { Outlet } from 'react-router';
import NavToggle from '../components/portfolio/NavToggle';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavToggle />
      <div className="max-w-5xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
