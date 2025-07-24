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
      className="section relative overflow-hidden"
    >
      {/* Scenic Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-crimson/3 to-brand-forest/5" />
      
      <div className="section-glow" />
      
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-brand-crimson mb-6 tracking-tight">
            THE STORY BEHIND
            <span className="block text-foreground mt-2">THE PRODUCTION</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-sky to-brand-forest rounded-full mx-auto" />
        </div>

        {/* Card-based Layout Inspired by Pinterest Reference */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* Large Story Card (Left) */}
          <div ref={contentRef} className="lg:col-span-7">
            <div className="glass p-8 lg:p-12 rounded-3xl h-full hover:scale-[1.02] transition-all duration-700">
              <div className="space-y-8">
                {/* Story Content */}
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p className="text-xl font-light">
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

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-muted-foreground/10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-ocean mb-1">20+</div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-crimson mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-forest mb-1">50+</div>
                    <div className="text-sm text-muted-foreground">Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards Grid (Right) - Pinterest Card Style */}
          <div ref={imageRef} className="lg:col-span-5 space-y-4">
            
            {/* Service Card 1 */}
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-ocean to-brand-sky rounded-2xl flex items-center justify-center text-2xl">
                  🎬
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-brand-ocean transition-colors">Event Production</h3>
                  <p className="text-sm text-muted-foreground">Complete event management and production</p>
                </div>
                <div className="w-3 h-3 bg-brand-ocean rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-crimson to-brand-sky rounded-2xl flex items-center justify-center text-2xl">
                  📱
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-brand-crimson transition-colors">Brand Campaigns</h3>
                  <p className="text-sm text-muted-foreground">Strategic brand storytelling and campaigns</p>
                </div>
                <div className="w-3 h-3 bg-brand-crimson rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-sky to-brand-sage rounded-2xl flex items-center justify-center text-2xl">
                  🎨
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-brand-sky transition-colors">Creative Direction</h3>
                  <p className="text-sm text-muted-foreground">Artistic vision and creative leadership</p>
                </div>
                <div className="w-3 h-3 bg-brand-sky rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-all duration-500 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-forest to-brand-sage rounded-2xl flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-brand-forest transition-colors">Post-Production</h3>
                  <p className="text-sm text-muted-foreground">Professional editing and finishing</p>
                </div>
                <div className="w-3 h-3 bg-brand-forest rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="glass p-6 rounded-2xl bg-gradient-to-br from-brand-ocean/5 to-brand-sky/5 mt-6">
              <div className="text-center space-y-3">
                <div className="text-sm font-semibold text-brand-ocean tracking-wider">OUR PHILOSOPHY</div>
                <p className="text-sm text-muted-foreground italic">
                  "Every frame tells a story, every story deserves perfection."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;