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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  // Events data with real images
  const events: Event[] = [
    {
      id: '1',
      title: 'Corporate Gala 2024',
      date: 'March 2024',
      description: 'A spectacular corporate event featuring cutting-edge production design and immersive lighting.',
      image: showcase1,
      category: 'Corporate'
    },
    {
      id: '2',
      title: 'Brand Launch Campaign',
      date: 'February 2024',
      description: 'Complete brand identity and campaign launch for a major tech company.',
      image: showcase2,
      category: 'Branding'
    },
    {
      id: '3',
      title: 'Music Video Production',
      date: 'January 2024',
      description: 'Cinematic music video with complex choreography and visual effects.',
      image: showcase3,
      category: 'Entertainment'
    },
    {
      id: '4',
      title: 'Fashion Week Coverage',
      date: 'December 2023',
      description: 'Complete visual coverage of Fashion Week with live streaming and post-production.',
      image: showcase4,
      category: 'Fashion'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial background to the first event
    setBackgroundImage(events[0]?.image || '');

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
    );

    // Animate each event card with stagger
    events.forEach((_, index) => {
      tl.fromTo(`.event-card-${index}`,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        index * 0.1
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setBackgroundImage(event.image);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section 
      ref={sectionRef}
      id="showcase" 
      className="section relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(20px) brightness(0.3)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      <div className="section-glow" />
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="showcase-title text-5xl md:text-6xl font-black text-brand-sky mb-4">
            Where Past Events
            <span className="block text-foreground">Come to Life</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-sky to-brand-forest rounded-full mx-auto" />
        </div>

        {/* Horizontal Scrolling Events */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`event-card-${index} flex-shrink-0 w-80 cursor-pointer`}
              style={{ scrollSnapAlign: 'center' }}
              onClick={() => handleEventClick(event)}
              onMouseEnter={() => setBackgroundImage(event.image)}
            >
              <div className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="glass px-3 py-1 text-sm font-medium rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-3">
                  <div className="text-sm text-muted-foreground">{event.date}</div>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {event.description}
                  </p>
                  
                  <button className="text-brand-sky font-semibold text-sm hover:text-brand-ocean transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {events.map((_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-brand-sky transition-colors"
            />
          ))}
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