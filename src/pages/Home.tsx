import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import HeroSection from '@/components/site/HeroSection';

const Home = () => (
  <div className="relative min-h-screen overflow-hidden">
    <ThemeToggle />
    <Header />
    <HeroSection />
    <Footer />
  </div>
);

export default Home;
