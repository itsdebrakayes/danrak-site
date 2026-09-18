import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHeaderVisibility } from '@/hooks/use-header-visibility';
import { useIsMobile } from '@/hooks/use-mobile';

import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import BookPromo from '@/components/sections/BookPromo';
import MobileIndex from './mobile/MobileIndex';
import Home from './Home';
import About from './About';
import Showcase from './Showcase';
import Contact from './Contact';

/** Path → section id, so /about deep-links scroll correctly on mobile. */
const pathToSection: Record<string, string> = {
  '/': 'm-home',
  '/home': 'm-home',
  '/about': 'm-about',
  '/showcase': 'm-services',
  '/contact': 'm-contact',
};

const Index = () => {
  const swiperRef = useRef<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Monitor header visibility
  useHeaderVisibility();

  // Map paths to slide indices and vice versa
  const pathToSlide: { [key: string]: number } = {
    '/': 0,
    '/home': 0,
    '/about': 1,
    '/showcase': 2,
    '/contact': 3,
  };

  const slideToPath: { [key: number]: string } = {
    0: '/home',
    1: '/about',
    2: '/showcase',
    3: '/contact',
  };

  useEffect(() => {
    if (isMobile) return;
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;

      const targetSlide = pathToSlide[location.pathname];
      if (targetSlide !== undefined && targetSlide !== swiper.activeIndex) {
        swiper.slideTo(targetSlide, 0); // Slide instantly on route change
      }
    }
  }, [location.pathname, isMobile]);

  // On mobile, translate the route into a scroll position instead of a slide.
  useEffect(() => {
    if (!isMobile) return;
    const id = pathToSection[location.pathname];
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname, isMobile]);

  const handleSlideChange = (swiper: any) => {
    const currentSlide = swiper.activeIndex;
    const newPath = slideToPath[currentSlide];
    if (newPath && location.pathname !== newPath) {
      navigate(newPath);
    }
  };

  // Phones get a purpose-built vertical layout. The Swiper deck and all four
  // desktop page components are never mounted, so none of their viewport-unit
  // sizing or GSAP timelines run on mobile at all.
  if (isMobile) {
    return (
      <>
        <MobileIndex />
        <BookPromo />
      </>
    );
  }

  return (
    <>
      <Header />
      <Swiper
        ref={swiperRef}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="h-screen w-screen"
        allowTouchMove={true}
        simulateTouch={true}
        touchStartPreventDefault={false}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <Home />
        </SwiperSlide>
        <SwiperSlide>
          <About />
        </SwiperSlide>
        <SwiperSlide>
          <Showcase />
        </SwiperSlide>
        <SwiperSlide>
          <Contact />
        </SwiperSlide>
      </Swiper>
      {/* Rendered outside <Swiper> on purpose: Swiper transforms its wrapper,
          and a transformed ancestor becomes the containing block for
          position:fixed children — which is why the footer used to drift into
          the middle of the screen on the taller About slide. */}
      <Footer />
      <BookPromo />
    </>
  );
};

export default Index;
