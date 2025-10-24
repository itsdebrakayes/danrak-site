import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutLeaning from '@/assets/about-leaning.png';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Temporarily disable GSAP to test scrolling
  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;

    if (content && image) {
      // Ensure content is always visible without animations
      content.style.opacity = '1';
      content.style.transform = 'translateX(0)';
      image.style.opacity = '1';
      image.style.transform = 'translateX(0)';
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative pt-16 lg:pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-crimson/3 to-brand-forest/5 z-0" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-brand-crimson mb-6 tracking-tight">
            THE STORY BEHIND
            <span className="block text-foreground mt-2">THE COMPANY</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-sky to-brand-forest rounded-full mx-auto" />
        </div>

        {/* Content Layout */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left side - Content */}
          <div ref={contentRef} className="lg:w-3/5 xl:w-2/3 space-y-12 opacity-100 relative z-10">
            <div className="glass p-8 lg:p-12 rounded-3xl transition-all duration-700">
              <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
                <p className="text-xl font-light">
                  With over two decades of experience in the creative industry, DanraK Productions
                  has been at the forefront of cinematic storytelling and visual excellence.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <p>
                    Our mission is to transform ideas into compelling visual narratives that resonate
                    with audiences and create lasting impact.
                  </p>

                  <p>
                    From concept to completion, we bring unparalleled creativity and technical
                    expertise to every project.
                  </p>
                </div>

                <p>
                  Whether it's corporate events, brand campaigns, or artistic productions,
                  we approach each project with the same dedication to craftsmanship and innovation.
                </p>
                
                <p>
                  Our team blends storytelling with technical excellence — from script development
                  and storyboarding to on-set execution and finishing. We partner with clients to
                  ensure every asset is faithful to the original creative intent and optimized for
                  its ultimate audience.
                </p>

                <p>
                  Collaboration is at the heart of our process. We work closely with creative
                  directors, producers, and brand teams to iterate quickly and deliver polished
                  content on schedule. Our flexible workflows scale from intimate shoots to large
                  multi-day productions.
                </p>

                <p>
                  Beyond production, we emphasize measurable results — tracking reach, engagement,
                  and performance to inform future creative strategy and ensure each project drives
                  real business outcomes.
                </p>
              </div>
              {/* simplified: left column contains only textual content per request */}
            </div>
          </div>

          {/* Right side - Image */}
          <div ref={imageRef} className="about-image-container lg:block hidden opacity-100">
            <img
              src={aboutLeaning}
              alt="DanraK Productions Director Leaning"
              className="about-image"
            />
          </div>
        </div>

        {/* Add some extra content to ensure scrolling works */}
        <div className="mt-32 space-y-16 text-center pb-32">
          <p className="text-muted-foreground">Scroll down to see more...</p>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-ocean">Pillars of the Business</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-crimson">Conceptualization</h4>
                <p className="text-sm text-muted-foreground">We form the creative brief and strong foundations for every project.</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-ocean">Strategy</h4>
                <p className="text-sm text-muted-foreground">Research, planning and distribution strategy that reaches your audience.</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-sky">Production</h4>
                <p className="text-sm text-muted-foreground">On-set direction, crew management and technical execution.</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-forest">Post-Production</h4>
                <p className="text-sm text-muted-foreground">Editing, color, sound design and finishing that elevate the story.</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-crimson">Delivery</h4>
                <p className="text-sm text-muted-foreground">Final delivery, formats and support to ensure successful launch.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-crimson">Why Choose DanraK?</h3>
            <div className="max-w-2xl mx-auto space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-ocean rounded-full mt-2"></div>
                <p className="text-muted-foreground">Two decades of industry expertise and innovation</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-crimson rounded-full mt-2"></div>
                <p className="text-muted-foreground">Cutting-edge technology and creative solutions</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-sky rounded-full mt-2"></div>
                <p className="text-muted-foreground">Personalized approach to every project</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-forest rounded-full mt-2"></div>
                <p className="text-muted-foreground">Award-winning team of creative professionals</p>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground">This is the end of the About section.</p>
        </div>
      </div>
      {/* Full-width CTA Banner */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-primary/5 border-t border-primary/20 mt-12">
        <div className="container mx-auto px-6 py-12">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Ready to Start Your Project?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have a vision in mind? Let's collaborate and bring your ideas to life with exceptional design and execution.
              </p>
              <a href="/contact" className="inline-block">
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium">Start Your Project</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

// FeatureCard and StatBlock removed — left column simplified per design request

const About = () => (
  <div className="relative">
    <Header />
    <AboutSection />
    <Footer />
  </div>
);

export default About;
