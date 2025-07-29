import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import AboutSection from '@/components/site/AboutSection';

const About = () => (
  <div className="relative min-h-screen overflow-hidden">
    <ThemeToggle />
    <Header />
    <AboutSection />
    <Footer />
  </div>
);

export default About;
