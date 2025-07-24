import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutLeaning from '@/assets/about-leaning.jpg';
import { removeBackground, loadImageFromSrc } from '@/utils/backgroundRemoval';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [transparentImageUrl, setTransparentImageUrl] = useState<string>('');

  useEffect(() => {
    // Remove background from the leaning image
    const processImage = async () => {
      try {
        const img = await loadImageFromSrc(aboutLeaning);
        const blob = await removeBackground(img);
        const url = URL.createObjectURL(blob);
        setTransparentImageUrl(url);
      } catch (error) {
        console.error('Failed to remove background:', error);
        // Fallback to original image
        setTransparentImageUrl(aboutLeaning);
      }
    };

    processImage();
  }, []);

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
      {/* Background */}
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

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto relative">
          
          {/* Text Content Area */}
          <div ref={contentRef} className="lg:col-span-8 relative">
            <div className="glass p-8 lg:p-12 rounded-3xl hover:scale-[1.02] transition-all duration-700">
              <div className="space-y-8">
                {/* Story Content */}
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
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
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-muted-foreground/10">
                  
                  {/* Service Card 1 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl glass hover:scale-105 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-ocean to-brand-sky rounded-xl flex items-center justify-center text-lg">
                      🎬
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-brand-ocean transition-colors">Event Production</h3>
                    </div>
                    <div className="w-2 h-2 bg-brand-ocean rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Service Card 2 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl glass hover:scale-105 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-crimson to-brand-sky rounded-xl flex items-center justify-center text-lg">
                      📱
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-brand-crimson transition-colors">Brand Campaigns</h3>
                    </div>
                    <div className="w-2 h-2 bg-brand-crimson rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Service Card 3 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl glass hover:scale-105 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-sky to-brand-sage rounded-xl flex items-center justify-center text-lg">
                      🎨
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-brand-sky transition-colors">Creative Direction</h3>
                    </div>
                    <div className="w-2 h-2 bg-brand-sky rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Service Card 4 */}
                  <div className="flex items-center gap-4 p-4 rounded-xl glass hover:scale-105 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-forest to-brand-sage rounded-xl flex items-center justify-center text-lg">
                      ✨
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-brand-forest transition-colors">Post-Production</h3>
                    </div>
                    <div className="w-2 h-2 bg-brand-forest rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
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

          {/* Leaning Portrait - Positioned to look like she's leaning on the content */}
          {transparentImageUrl && (
            <div 
              ref={imageRef}
              className="lg:col-span-4 relative flex items-end justify-start"
            >
              <div className="relative -ml-8 lg:-ml-16">
                <img 
                  src={transparentImageUrl}
                  alt="DanraK Productions Director Leaning"
                  className="h-96 lg:h-[500px] w-auto object-contain opacity-95"
                  style={{
                    filter: 'drop-shadow(0 0 30px hsl(var(--brand-crimson) / 0.2))'
                  }}
                />
              </div>
            </div>
          )}

          {/* Philosophy Card - Positioned near the leaning image */}
          <div className="lg:col-span-12 mt-8">
            <div className="glass p-6 rounded-2xl bg-gradient-to-br from-brand-ocean/5 to-brand-sky/5 max-w-md mx-auto lg:mx-0 lg:ml-auto">
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