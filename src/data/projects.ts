export interface Event {
  id: string;
  title: string;
  image: string;
  description: string;
  galleryImages: string[];
}

export interface Project {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  serviceDescription: string;
  events: Event[];
  category: string;
  date: string;
  // Deprecated - kept for backward compatibility
  fullText?: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: "project-event-mgmt",
    title: "Project and Event Management",
    image: "/src/assets/access-launch-cover.jpg",
    excerpt: "Comprehensive event planning and execution",
    serviceDescription: "Our Project and Event Management services encompass full-scale planning, coordination, and execution of corporate events, product launches, and milestone celebrations. From intimate gatherings to large-scale productions, we bring creative vision and meticulous attention to detail to every project.",
    events: [
      {
        id: "access-fin-launch",
        title: "Access Financial 25th Anniversary Launch",
        image: "/src/assets/access-launch-cover.jpg",
        description: "Access Financial's 25th Anniversary Launch Event was a celebration of their journey and achievements. The event featured a blend of traditional and modern design elements, reflecting the company's commitment to innovation while honoring its roots. Our team coordinated every aspect, from venue design to guest experience, creating an unforgettable evening that honored 25 years of financial excellence.",
        galleryImages: [
          "/src/assets/access-launch-content1.jpg",
          "/src/assets/access-launch-content2.jpg",
          "/src/assets/access-launch-content3.jpg"
        ]
      },
      {
        id: "port-authority-groundbreaking",
        title: "Port Authority Groundbreaking Ceremony",
        image: "/src/assets/port-authority-cover.jpeg",
        description: "Port Authority's groundbreaking ceremony with prestigious guests including the Prime Minister of Jamaica and the Governor General required a complete brand overhaul that captured the essence of Caribbean culture while appealing to a global audience. The project involved creating immersive experiences that celebrated local talent and international collaboration, with careful attention to protocol and cultural sensitivity.",
        galleryImages: [
          "/src/assets/port-authority-content1.jpeg",
          "/src/assets/port-authority-content2.jpeg",
          "/src/assets/port-authority-content3.jpeg"
        ]
      }
    ],
    category: "Event Management",
    date: "2024-2025",
    // Backward compatibility
    fullText: "Our Project and Event Management services encompass full-scale planning, coordination, and execution of corporate events, product launches, and milestone celebrations.",
    gallery: [
      "/src/assets/access-launch-content1.jpg",
      "/src/assets/access-launch-content2.jpg",
      "/src/assets/port-authority-content1.jpeg"
    ]
  },
  {
    id: "honors-awards",
    title: "Awards and Ceremonies",
    image: "/src/assets/honors-awards-cover.jpg",
    excerpt: "Elegant award ceremonies and galas",
    serviceDescription: "We specialize in creating prestigious award ceremonies and formal celebrations that honor achievement and excellence. Our ceremonies blend elegance with meaning, using sophisticated visual design, lighting, and production values to create memorable moments of recognition.",
    events: [
      {
        id: "national-honors-awards",
        title: "National Honors & Awards Ceremony",
        image: "/src/assets/honors-awards-cover.jpg",
        description: "The National Honors and Awards Ceremony, held annually to honor the achievements of individuals and organizations, was a significant event that required a sophisticated visual identity. The design focused on elegance and prestige, using gold accents and classic typography to convey the importance of the occasion. We orchestrated every detail from stage design to award presentation flow.",
        galleryImages: [
          "/src/assets/honors-awards-content2.jpg",
          "/src/assets/honors-awards-content3.mp4"
        ]
      }
    ],
    category: "Awards Ceremony",
    date: "2024",
    fullText: "The National Honors and Awards Ceremony, held every year to honor the achievements of individuals and organizations.",
    gallery: [
      "/src/assets/honors-awards-content2.jpg",
      "/src/assets/honors-awards-content3.mp4"
    ]
  },
  {
    id: "faith-moves",
    title: "Media Production",
    image: "/src/assets/faith-moves-cover.jpg",
    excerpt: "TV shows and media content production",
    serviceDescription: "Our Media Production services bring stories to life through compelling visual narratives. From concept development to post-production, we handle every aspect of creating professional TV shows, documentaries, and digital content that resonates with audiences.",
    events: [
      {
        id: "faith-moves-series",
        title: "Faith Moves TV Series",
        image: "/src/assets/faith-moves-cover.jpg",
        description: "Faith Moves, a groundbreaking TV show that showcases the success stories of business people across the island and their journey of faith. Each episode features in-depth interviews, cinematic storytelling, and inspiring narratives that connect with viewers on a personal level. Our production team captured authentic moments and crafted compelling visual stories.",
        galleryImages: [
          "/src/assets/faith-moves-content1.jpg",
          "/src/assets/faith-moves-content2.jpg",
          "/src/assets/faith-moves-content4.MOV",
          "/src/assets/faith-moves-content5.MOV"
        ]
      }
    ],
    category: "TV Show Production",
    date: "2025",
    fullText: "Faith Movies, a new TV show surrounded the success stories of business people across the island and their take on how faith brought them here.",
    gallery: [
      "/src/assets/faith-moves-content1.jpg",
      "/src/assets/faith-moves-content2.jpg",
      "/src/assets/faith-moves-content4.MOV"
    ]
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