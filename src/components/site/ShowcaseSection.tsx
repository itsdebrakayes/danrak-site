import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import showcase1 from '@/assets/showcase-1.jpg';
import showcase2 from '@/assets/showcase-2.jpg';
import showcase3 from '@/assets/showcase-3.jpg';
import showcase4 from '@/assets/showcase-4.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Events data with real images
  const events: Event[] = [
    {
      id: '1',
      title: 'Corporate Gala 2024',
      date: 'March 2024',
      description: 'A spectacular corporate event featuring cutting-edge production design and immersive lighting that transformed the venue into a cinematic experience.',
      image: showcase1,
      category: 'Corporate'
    },
    {
      id: '2',
      title: 'Brand Launch Campaign',
      date: 'February 2024',
      description: 'Complete brand identity and campaign launch for a major tech company with innovative visual storytelling.',
      image: showcase2,
      category: 'Branding'
    },
    {
      id: '3',
      title: 'Music Video Production',
      date: 'January 2024',
      description: 'Cinematic music video with complex choreography and visual effects that pushed creative boundaries.',
      image: showcase3,
      category: 'Entertainment'
    },
    {
      id: '4',
      title: 'Fashion Week Coverage',
      date: 'December 2023',
      description: 'Complete visual coverage of Fashion Week with live streaming and post-production excellence.',
      image: showcase4,
      category: 'Fashion'
    }
  ];

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % events.length);
  };

  const currentEvent = events[activeIndex];
  const upcomingEvents = [
    ...events.slice(activeIndex + 1),
    ...events.slice(0, activeIndex)
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate the title
    tl.fromTo(".showcase-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(".featured-story",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".story-carousel",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Auto-advance stories every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextStory, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleCarouselClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section 
      ref={sectionRef}
      id="showcase" 
      className="section relative overflow-hidden min-h-screen"
    >
      {/* Dynamic Background - Current Featured Story */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentEvent.image})`,
          filter: 'blur(15px) brightness(0.4)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70" />
      
      <div className="section-glow" />
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="showcase-title text-5xl md:text-6xl font-black text-brand-sky mb-4">
            Where Past Events
            <span className="block text-foreground">Come to Life</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-sky to-brand-forest rounded-full mx-auto" />
        </div>

        {/* Main Layout: Featured Story + Carousel */}
        <div className="grid lg:grid-cols-5 gap-8 items-center min-h-[60vh]">
          
          {/* Left Side: Featured Story Excerpt */}
          <div className="lg:col-span-2 featured-story">
            <div className="glass p-8 rounded-3xl space-y-6">
              <div className="text-sm text-brand-sky font-medium">{currentEvent.category}</div>
              <h3 className="text-4xl md:text-5xl font-black leading-tight">{currentEvent.title}</h3>
              <div className="text-muted-foreground text-lg">{currentEvent.date}</div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {currentEvent.description}
              </p>
              <button 
                onClick={() => handleEventClick(currentEvent)}
                className="glass px-8 py-4 rounded-xl font-semibold bg-brand-sky/20 hover:bg-brand-sky/30 transition-all duration-300 hover:scale-105"
              >
                Read More →
              </button>
            </div>
          </div>

          {/* Right Side: Upcoming Stories Carousel */}
          <div className="lg:col-span-3 story-carousel">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-center text-muted-foreground">Coming Up Next</h4>
              
              <div 
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              >
                {upcomingEvents.map((event, index) => (
                  <div
                    key={`${event.id}-${index}`}
                    className="flex-shrink-0 w-64 cursor-pointer group"
                    onClick={() => handleCarouselClick((activeIndex + index + 1) % events.length)}
                  >
                    <div className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img 
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="glass px-2 py-1 text-xs font-medium rounded-full">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-2">
                        <div className="text-xs text-muted-foreground">{event.date}</div>
                        <h4 className="text-sm font-bold line-clamp-1">{event.title}</h4>
                        <p className="text-muted-foreground text-xs line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-brand-sky scale-125' 
                        : 'bg-muted-foreground/30 hover:bg-brand-sky/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
          <div className="glass max-w-2xl w-full rounded-3xl overflow-hidden animate-scale-in">
            <div className="aspect-video bg-muted relative">
              <img 
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8 space-y-4">
              <div className="text-sm text-muted-foreground">{selectedEvent.date}</div>
              <h3 className="text-3xl font-bold">{selectedEvent.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {selectedEvent.description}
              </p>
              
              <button className="glass px-6 py-3 rounded-xl font-semibold bg-brand-sky/20 hover:bg-brand-sky/30 transition-colors">
                Read Full Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowcaseSection;