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
    id: "ds-tech",
    title: "DS Technologies",
    image: "/src/assets/showcase-1.jpg",
    excerpt: "Branding + App Development",
    fullText: "DS Technologies collaborated with local innovators to create a culturally resonant digital hub. The branding blends geometric precision with Caribbean color palettes, creating a unique visual identity that speaks to both technological advancement and cultural heritage.",
    gallery: [
      "/src/assets/showcase-1.jpg",
      "/src/assets/showcase-2.jpg"
    ],
    category: "Branding",
    date: "2024"
  },
  {
    id: "rendezvous-single",
    title: "Rendezvous Single",
    image: "/src/assets/showcase-2.jpg",
    excerpt: "Surreal visual identity",
    fullText: "A groundbreaking visual identity project that pushed the boundaries of surreal design. The Rendezvous Single project explored the intersection of reality and imagination, creating a visual language that challenges conventional design norms.",
    gallery: [
      "/src/assets/showcase-2.jpg",
      "/src/assets/showcase-3.jpg"
    ],
    category: "Visual Identity",
    date: "2024"
  },
  {
    id: "islandx-festival",
    title: "IslandX Festival",
    image: "/src/assets/showcase-3.jpg",
    excerpt: "Event branding & vibe",
    fullText: "IslandX Festival required a complete brand overhaul that captured the essence of Caribbean culture while appealing to a global audience. The project involved creating immersive experiences that celebrated local talent and international collaboration.",
    gallery: [
      "/src/assets/showcase-3.jpg",
      "/src/assets/showcase-4.jpg"
    ],
    category: "Event Branding",
    date: "2024"
  },
  {
    id: "jamaica-design-tour",
    title: "Jamaica Design Tour",
    image: "/src/assets/showcase-4.jpg",
    excerpt: "Cultural innovation showcase",
    fullText: "The Jamaica Design Tour project showcased the rich design heritage of Jamaica while highlighting contemporary innovations. This comprehensive branding initiative connected traditional craftsmanship with modern design thinking.",
    gallery: [
      "/src/assets/showcase-4.jpg",
      "/src/assets/showcase-1.jpg"
    ],
    category: "Cultural Design",
    date: "2024"
  },
  {
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
  }
];