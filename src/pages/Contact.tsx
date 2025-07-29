import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BsInstagram, BsLinkedin, BsYoutube, BsEnvelope, BsPhone } from 'react-icons/bs';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(
      '.contact-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
      .fromTo(
        '.contact-form',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.contact-info',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. We'll get back to you soon."
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: BsInstagram, label: 'Instagram', href: '#', color: 'brand-crimson' },
    { icon: BsLinkedin, label: 'LinkedIn', href: '#', color: 'brand-ocean' },
    { icon: BsYoutube, label: 'YouTube', href: '#', color: 'brand-sky' }
  ];

  return (
    <section ref={sectionRef} id="contact" className="section relative overflow-hidden min-h-screen">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center,
            hsl(var(--brand-forest) / 0.1) 0%,
            hsl(var(--brand-ocean) / 0.05) 50%,
            transparent 100%)`
        }}
      />

      <div className="section-glow" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="contact-title text-5xl md:text-6xl font-black text-brand-forest mb-4">
            Get in Touch
            <span className="block text-foreground">Let's Create Together</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-forest to-brand-sage rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="glass p-8 rounded-3xl space-y-6">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass border-0 focus:ring-2 focus:ring-brand-forest transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass border-0 focus:ring-2 focus:ring-brand-forest transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl glass border-0 focus:ring-2 focus:ring-brand-forest transition-all duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full glass px-8 py-4 rounded-xl text-lg font-semibold bg-brand-forest/20 hover:bg-brand-forest/30 transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="contact-info space-y-8">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-forest/20 rounded-xl flex items-center justify-center">
                    <BsEnvelope className="w-5 h-5 text-brand-forest" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">hello@danrakproductions.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-ocean/20 rounded-xl flex items-center justify-center">
                    <BsPhone className="w-5 h-5 text-brand-ocean" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>

              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:scale-110 transition-all duration-300 group"
                    style={{ backgroundColor: `hsl(var(--${social.color}) / 0.1)` }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" style={{ color: `hsl(var(--${social.color}))` }} />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <div className="relative min-h-screen overflow-hidden">
    <ThemeToggle />
    <Header />
    <ContactSection />
    <Footer />
  </div>
);

export default Contact;
