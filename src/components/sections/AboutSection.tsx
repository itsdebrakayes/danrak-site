import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(content,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(image,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="section bg-gradient-to-br from-background to-brand-crimson/5"
    >
      <div className="section-glow" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-black text-brand-crimson">
                The Story Behind
                <span className="block text-foreground">the Production</span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-brand-crimson to-brand-sky rounded-full" />
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                With over two decades of experience in the creative industry, DanraK Productions 
                has been at the forefront of cinematic storytelling and visual excellence.
              </p>
              
              <p>
                Our mission is to transform ideas into compelling visual narratives that resonate 
                with audiences and create lasting impact. From concept to completion, we bring 
                unparalleled creativity and technical expertise to every project.
              </p>
              
              <p>
                Whether it's corporate events, brand campaigns, or artistic productions, 
                we approach each project with the same dedication to craftsmanship and innovation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-ocean mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-crimson mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div ref={imageRef} className="relative">
            <div className="glass p-8 rounded-3xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-4">Our Services</h3>
                
                <div className="space-y-4">
                  {[
                    { title: 'Event Production', icon: '🎬', color: 'brand-ocean' },
                    { title: 'Brand Campaigns', icon: '📱', color: 'brand-crimson' },
                    { title: 'Creative Direction', icon: '🎨', color: 'brand-sky' },
                    { title: 'Post-Production', icon: '✨', color: 'brand-forest' }
                  ].map((service, index) => (
                    <div 
                      key={service.title}
                      className="flex items-center gap-4 p-4 rounded-xl glass hover:scale-105 transition-transform duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-2xl">{service.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{service.title}</div>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `hsl(var(--${service.color}))` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;