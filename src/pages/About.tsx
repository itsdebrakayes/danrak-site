import Footer from '@/components/sections/Footer';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutLeaning from '@/assets/about-leaning.png';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Animate content and image to "rise up" using GSAP + ScrollTrigger
  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;

    const triggers: gsap.core.Tween[] = [];

    if (content) {
      triggers.push(
        gsap.fromTo(
          content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 85%',
              toggleActions: 'play none none reset',
            },
          }
        )
      );
    }

    if (image) {
      triggers.push(
        gsap.fromTo(
          image,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 85%',
              toggleActions: 'play none none reset',
            },
          }
        )
      );
    }

    return () => {
      // cleanup animations and scroll triggers
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
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
                <p className="text-xl font-bold text-foreground">
                  Danrak Productions is a Jamaican communications and media production business, built on the power of great storytelling and the fervent belief that everyone has a story worth telling.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <p>
                    Established in 2015 by Founder and CEO Stacy-Ann Smith, the company offers a suite of services that ranges from television production and scriptwriting to public relations and crisis communications. The company operates on the values of integrity, industry and respect for people, no matter their status. 
                  </p>

                  <p>
                    Armed with almost 25 years’ experience in media and communications, Stacy-Ann created DANRAK in response to the growing demand for powerful and imaginative storytellers who think big and have the work ethic to deliver at the highest standards. 
                  </p>
                </div>
              </div>
              {/* simplified: left column contains only textual content per request */}
            </div>
          </div>

          {/* Right side - Image */}
          <div ref={imageRef} className="about-image-container lg:block hidden opacity-100">
            <img
              src={aboutLeaning}
              alt="Danrak Productions Director Leaning"
              className="about-image"
            />
          </div>
        </div>

        {/* More About the Mastermind section: add below the existing text area */}
        <div className="mt-8">
          <div className="glass p-6 rounded-2xl lg:w-[75%] lg:mr-8 w-full">
            <h3 className="text-2xl font-semibold mb-4 text-brand-crimson">Our Chief Strategist</h3>
            <p className="mb-4 text-foreground">An award-winning entrepreneur and communications specialist, Stacy-Ann is the Chief Strategist and CEO at <b>Danrak Productions</b>, a Jamaican media production and communications consulting business. An accomplished storyteller and award-winning writer, Stacy-Ann has built a professional career as a public relations and corporate communications specialist, writer and producer of television content.</p>

            {/* Grid of items — adjusted to 3 columns on large screens so items are wider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-3">
                <p className="text-sm">With senior management experience and a track record of leading successful brand campaigns for major Jamaican companies like <b>Red Stripe</b>, <b>Heineken</b>, and <b>Access Financial Services</b>, Stacy-Ann brings deep expertise in strategic communications — helping organizations shape narratives, strengthen brands, and drive business results.</p>
              </div>
              <div className="p-3">
                <p className="text-sm">As a seasoned PR practitioner, Stacy-Ann has played a leading role in conceptualizing and executing national public education campaigns for the Government of Jamaica, including the Ministry of Education & Youth. Beyond her corporate work, she has championed initiatives spotlighting issues affecting women and girls — earning recognition and the <b>2022 Partnership Impact Award from the U.S. Embassy in Kingston.</b> </p>
              </div>
              <div className="p-3">
                <p className="text-sm">Stacy-Ann is the author of <b>Time Does Not Heal</b> and the creator and host of the acclaimed TV talk show <b>It’s A Woman’s World</b>. Recognized as one of Jamaica’s most talented broadcasters and voice artists, she is a dynamic public speaker and event host. Her accomplishments include leading and presenting several nationally televised events — notably providing live colour commentary for the annual Ceremony of Investiture and Presentation of National Honours and Awards for over 12 years.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add some extra content to ensure scrolling works */}
        <div className="mt-32 space-y-16 text-center pb-32">
          <p className="text-muted-foreground">Scroll down to see more...</p>
          
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground">Our Suite of Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full mt-6">
              <div 
                className="glass p-6 rounded-xl service-box-crimson cursor-pointer"
                onClick={() => navigate('/project/corporate-communications')}
              >
                <h4 className="font-semibold mb-2 text-brand-crimson">Corporate Communications & Public Relations</h4>
                <p className="text-sm text-muted-foreground">We deliver strategic communications, PR storytelling, and tailored solutions — from marketing and brand visibility to crisis management and regulatory reporting for JSE and BOJ standards, helping brands communicate with purpose and impact.</p>
              </div>
              <div 
                className="glass p-6 rounded-xl service-box-ocean cursor-pointer"
                onClick={() => navigate('/project/campaign-development')}
              >
                <h4 className="font-semibold mb-2 text-brand-ocean">Campaign Development & Execution</h4>
                <p className="text-sm text-muted-foreground">From concept to launch, we craft and execute impactful marketing, communications, and PR campaigns, delivering results on time and within budget while keeping clients at the heart of every project to ensure meaningful, measurable outcomes.</p>
              </div>
              <div 
                className="glass p-6 rounded-xl service-box-forest cursor-pointer"
                onClick={() => navigate('/project/project-event-planning')}
              >
                <h4 className="font-semibold mb-2 text-brand-forest">Project & Event Planning</h4>
                <p className="text-sm text-muted-foreground">We bring your ideas to life through strategic planning, creative execution, and flawless management — delivering events and projects that inspire, engage, and leave a lasting impact, while ensuring every detail aligns seamlessly with your goals and vision.</p>
              </div>
              <div 
                className="glass p-6 rounded-xl service-box-sky cursor-pointer"
                onClick={() => navigate('/project/video-tv-production')}
              >
                <h4 className="font-semibold mb-2 text-brand-sky">Video & Television Production</h4>
                <p className="text-sm text-muted-foreground">With almost 25 years of experience, we craft powerful visual stories that connect. From commercials and documentaries to TV shows, our team blends creativity, strategy, and technical excellence to deliver captivating, high-quality content across Jamaica and the Caribbean.</p>
              </div>
              <div 
                className="glass p-6 rounded-xl service-box-crimson cursor-pointer"
                onClick={() => navigate('/project/on-air-talent')}
              >
                <h4 className="font-semibold mb-2 text-brand-crimson">On-Air Talent & Event Hosting</h4>
                <p className="text-sm text-muted-foreground">A seasoned media professional and sought-after event anchor, Stacy-Ann Smith has two decades of broadcast experience. Known for her poise and versatility, she brings the perfect balance of charm, professionalism, and protocol to every event — from national ceremonies to corporate functions.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-crimson">Why Choose Danrak?</h3>
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
    </section>
  );
};

// FeatureCard and StatBlock removed — left column simplified per design request

const About = () => (
  <div className="relative">
    <AboutSection />
    <Footer />
  </div>
);

export default About;
