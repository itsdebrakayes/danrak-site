import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import Home from './Home';
import About from './About';
import Showcase from './Showcase';
import Contact from './Contact';

const Index = () => (
  <Swiper
    direction="horizontal"
    slidesPerView={1}
    spaceBetween={0}
    mousewheel
    keyboard
    pagination={{ clickable: true }}
    navigation
    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
    className="h-screen w-screen"
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

export default Index;
