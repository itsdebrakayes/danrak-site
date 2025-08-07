import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Showcase from './Showcase';
import Contact from './Contact';

const Index = () => {
  const swiperRef = useRef<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      
      const targetSlide = pathToSlide[location.pathname];
      if (targetSlide !== undefined && targetSlide !== swiper.activeIndex) {
        swiper.slideTo(targetSlide, 0); // Slide instantly on route change
      }
    }
  }, [location.pathname]);

  const handleSlideChange = (swiper: any) => {
    const currentSlide = swiper.activeIndex;
    const newPath = slideToPath[currentSlide];
    if (newPath && location.pathname !== newPath) {
      navigate(newPath, { replace: true });
    }
  };

  return (
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
  );
};

export default Index;
