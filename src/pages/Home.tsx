import { Outlet } from 'react-router';
import NavToggle from '../components/portfolio/NavToggle';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavToggle />
      <Outlet />
      <Footer />
    </div>
  );
}
