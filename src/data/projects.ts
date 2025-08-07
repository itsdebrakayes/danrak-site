export interface Project {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  fullText: string;
  gallery: string[];
  category: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: "access-fin",
    title: "Access Financial 25th Aniversary Launch",
    image: "/src/assets/access-launch-cover.jpg",
    excerpt: "Access Financial's 25th Anniversary Launch Event",
    fullText: "Accesss Financial's 25th Anniversary Launch Event was a celebration of their journey and achievements. The event featured a blend of traditional and modern design elements, reflecting the company's commitment to innovation while honoring its roots.",
    gallery: [
      "/src/assets/access-launch-content1.jpg",
      "/src/assets/access-launch-content2.jpg",
      "/src/assets/access-launch-content3.jpg"
    ],
    category: "Launch Event",
    date: "2025"
  },
  {
    id: "honors-awards",
    title: "Honors & Awards Ceremony",
    image: "/src/assets/honors-awards-cover.jpg",
    excerpt: "Honors & Awards Ceremony",
    fullText: "The National Honors and Awards Ceremony, held every year to honor the achievements of individuals and organizations, was a significant event that required a sophisticated visual identity. The design focused on elegance and prestige, using gold accents and classic typography to convey the importance of the occasion.",
    gallery: [
      "/src/assets/honors-awards-content1.jpg",
      "/src/assets/honors-awards-content2.jpg",
      "/src/assets/honors-awards-content3.jpg"
    ],
    category: "Awards Ceremony",
    date: "2024"
  },
  {
    id: "port-authority",
    title: "Port Authority Branding",
    image: "/src/assets/port-authority-cover.jpeg",
    excerpt: "Event Planning and Hosting",
    fullText: "Port Authority's groundbreaking ceremony with prestigious guests invited such as the Prime Minister of Jamaica and the Governor General, required a complete brand overhaul that captured the essence of Caribbean culture while appealing to a global audience. The project involved creating immersive experiences that celebrated local talent and international collaboration.",
    gallery: [
      "/src/assets/port-authority-content1.jpeg",
      "/src/assets/port-authority-content2.jpeg",
      "/src/assets/port-authority-content3.jpeg"
    ],
    category: "Event Planning",
    date: "2025"
  },
  {
    id: "faith-moves",
    title: "Faith Moves",
    image: "/src/assets/faith-moves-cover.jpg",
    excerpt: "Faith Movies Production",
    fullText: "Faith Movies, a new TV show sorrounded the success stories of business people across the island and their take on how faith brought them here.",
    gallery: [
      "/src/assets/faith-moves-content1.jpg",
      "/src/assets/faith-moves-content2.jpg",
      "/src/assets/faith-moves-content4.MOV",
      "/src/assets/faith-moves-content5.MOV"
    ],
    category: "TV Show Production",
    date: "2025"
  },
  /* {
    id: "tech-connect",
    title: "Tech Connect",
    image: "/src/assets/showcase-1.jpg",
    excerpt: "Youth + STEM collaboration",
    fullText: "Tech Connect bridges the gap between youth and STEM education through innovative design solutions. The project created engaging visual materials and digital experiences that make technology more accessible to young learners.",
    gallery: [
      "/src/assets/showcase-1.jpg",
      "/src/assets/showcase-2.jpg"
    ],
    category: "Education",
    date: "2024"
  },
  {
    id: "creative-summit",
    title: "Creative Summit",
    image: "/src/assets/showcase-2.jpg",
    excerpt: "Design conference branding",
    fullText: "Creative Summit brought together designers, artists, and innovators from across the Caribbean. Our comprehensive branding approach created a unified visual identity that celebrated creativity while maintaining professional appeal for industry leaders.",
    gallery: [
      "/src/assets/showcase-2.jpg",
      "/src/assets/showcase-3.jpg"
    ],
    category: "Conference",
    date: "2024"
  },
  {
    id: "urban-renewal",
    title: "Urban Renewal Project",
    image: "/src/assets/showcase-3.jpg",
    excerpt: "Community transformation",
    fullText: "The Urban Renewal Project focused on revitalizing downtown areas through strategic design interventions. This comprehensive initiative included wayfinding systems, public art installations, and community engagement platforms.",
    gallery: [
      "/src/assets/showcase-3.jpg",
      "/src/assets/showcase-4.jpg"
    ],
    category: "Urban Design",
    date: "2024"
  },
  {
    id: "digital-wellness",
    title: "Digital Wellness Initiative",
    image: "/src/assets/showcase-4.jpg",
    excerpt: "Health tech branding",
    fullText: "Digital Wellness Initiative combined healthcare expertise with cutting-edge technology to create accessible wellness solutions. The branding emphasized trust, innovation, and human-centered design principles.",
    gallery: [
      "/src/assets/showcase-4.jpg",
      "/src/assets/showcase-1.jpg"
    ],
    category: "Healthcare",
    date: "2024"
  },
  {
    id: "eco-innovation",
    title: "Eco Innovation Hub",
    image: "/src/assets/showcase-1.jpg",
    excerpt: "Sustainable design showcase",
    fullText: "Eco Innovation Hub demonstrates how sustainable practices can be integrated into modern design workflows. This project showcased environmental responsibility while maintaining high aesthetic standards and functional excellence.",
    gallery: [
      "/src/assets/showcase-1.jpg",
      "/src/assets/showcase-2.jpg"
    ],
    category: "Sustainability",
    date: "2024"
  },
  {
    id: "global-connect",
    title: "Global Connect Platform",
    image: "/src/assets/showcase-2.jpg",
    excerpt: "International collaboration",
    fullText: "Global Connect Platform facilitated international partnerships and cultural exchange through thoughtful design systems. The project emphasized accessibility, inclusivity, and cross-cultural communication in its visual approach.",
    gallery: [
      "/src/assets/showcase-2.jpg",
      "/src/assets/showcase-3.jpg"
    ],
    category: "Platform Design",
    date: "2024"
  } */
]; 