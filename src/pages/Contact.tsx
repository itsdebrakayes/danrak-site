import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ContactSection from '@/components/site/ContactSection';

const Contact = () => (
  <div className="relative min-h-screen overflow-hidden">
    <ThemeToggle />
    <Header />
    <ContactSection />
    <Footer />
  </div>
);

export default Contact;
