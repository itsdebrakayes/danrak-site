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
  carouselImage: string;
  backgroundImage: string;
  excerpt: string;
  serviceDescription: string;
  events: Event[];
  category: string;
  date: string;
  // The canonical service this project represents (one of the five suite services)
  serviceId?: string;
  // Deprecated - kept for backward compatibility
  fullText?: string;
  gallery?: string[];
}
export const projects: Project[] = [
  {
    id: "corporate-communications",
    serviceId: "corporate-communications",
    title: "Corporate Communications & Public Relations",
    image: "/src/assets/corporate-comms-image.png",
    carouselImage: "/src/assets/corporate-comms-carousel.png",
    backgroundImage: "/src/assets/corporate-comms-background.png",
    excerpt: "Strategic communications, PR storytelling, and corporate events.",
    serviceDescription: "Corporate communications and PR for major launches, reputation management, and stakeholder engagement.",
    events: [
      {
        id: "access-fin-launch",
        title: "Access Financial 25th Anniversary Launch",
        image: "/src/assets/access-launch-cover.jpg",
        description: "A milestone launch for Access Financial featuring a curated guest experience and branded production.",
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
        description: "A high-profile ceremony with national leaders — careful protocol and immersive storytelling.",
        galleryImages: [
          "/src/assets/port-authority-content1.jpeg",
          "/src/assets/port-authority-content2.jpeg",
          "/src/assets/port-authority-content3.jpeg"
        ]
      }
    ],
    category: "Corporate Communications",
    date: "2024-2025",
    fullText: "Our corporate communications work includes large-scale launches, reputation campaigns and executive communications.",
    gallery: [
      "/src/assets/access-launch-content1.jpg",
      "/src/assets/access-launch-content2.jpg"
    ]
  },

  {
    id: "campaign-development",
    serviceId: "campaign-development",
    title: "Campaign Development & Execution",
    image: "/src/assets/campaign-dev-image.png",
    carouselImage: "/src/assets/campaign-dev-carousel.png",
    backgroundImage: "/src/assets/campaign-dev-background.png",
    excerpt: "End-to-end campaign strategy, creative and activation.",
    serviceDescription: "From concept to execution we design campaigns that move audiences and deliver results.",
    events: [
      {
        id: "national-honors-campaign",
        title: "National Honors Campaign",
        image: "/src/assets/honors-awards-cover.jpg",
        description: "A strategic campaign supporting an annual national honors & awards program.",
        galleryImages: [
          "/src/assets/honors-awards-content2.jpg",
          "/src/assets/honors-awards-content3.mp4"
        ]
      }
    ],
    category: "Campaigns",
    date: "2024",
    fullText: "Campaign strategy and creative execution for public-facing initiatives.",
    gallery: [
      "/src/assets/honors-awards-content2.jpg"
    ]
  },

  {
    id: "project-event-planning",
    serviceId: "project-event-planning",
    title: "Project & Event Planning",
    image: "/src/assets/project-event-mngmt-image.png",
    carouselImage: "/src/assets/project-event-mngmt-carousel.png",
    backgroundImage: "/src/assets/project-event-mngmt-background.png",
    excerpt: "Large scale event production and logistics.",
    serviceDescription: "Full-service event management from ideation to on-site production.",
    events: [
      {
        id: "major-gala-production",
        title: "Major Gala Production",
        image: "/src/assets/port-authority-cover.jpeg",
        description: "Full production and logistics for large gala and awards ceremonies.",
        galleryImages: [
          "/src/assets/port-authority-content1.jpeg",
          "/src/assets/port-authority-content2.jpeg"
        ]
      }
    ],
    category: "Event Management",
    date: "2024-2025",
    fullText: "Production, logistics and execution for large-scale events and ceremonies.",
    gallery: [
      "/src/assets/port-authority-content1.jpeg"
    ]
  },

  {
    id: "video-tv-production",
    serviceId: "video-tv-production",
    title: "Video & Television Production",
    image: "/src/assets/video-and-television-image.png",
    carouselImage: "/src/assets/video-and-television-carousel.png",
    backgroundImage: "/src/assets/video-and-television-background.png",
    excerpt: "TV shows, documentaries and branded video content.",
    serviceDescription: "Cinematic storytelling and broadcast production for TV and digital platforms.",
    events: [
      {
        id: "faith-moves-series",
        title: "Faith Moves TV Series",
        image: "/src/assets/faith-moves-cover.jpg",
        description: "A TV series highlighting business leaders and personal stories of resilience.",
        galleryImages: [
          "/src/assets/faith-moves-content1.jpg",
          "/src/assets/faith-moves-content2.jpg"
        ]
      }
    ],
    category: "Media Production",
    date: "2025",
    fullText: "Production services for television, documentary and branded video content.",
    gallery: [
      "/src/assets/faith-moves-content1.jpg"
    ]
  },

  {
    id: "on-air-talent",
    serviceId: "on-air-talent",
    title: "On-Air Talent & Event Hosting",
    image: "/src/assets/on-air-talent-event-host-image.png",
    carouselImage: "/src/assets/on-air-talent-event-host-carousel.png",
    backgroundImage: "/src/assets/on-air-talent-event-host-background.png",
    excerpt: "Professional hosts, anchors and event talent.",
    serviceDescription: "Experienced on-air talent for broadcasts, corporate events and national ceremonies.",
    events: [
      {
        id: "its-a-womans-world",
        title: "It's A Woman's World (TV)",
        image: "/src/assets/faith-moves-content1.jpg",
        description: "A long-running talk show hosted by Stacy-Ann showcasing women leaders and stories.",
        galleryImages: [
          "/src/assets/faith-moves-content1.jpg",
          "/src/assets/faith-moves-content2.jpg"
        ]
      }
    ],
    category: "Talent & Hosting",
    date: "2020-2025",
    fullText: "On-air talent and professional hosts for live and recorded broadcast events.",
    gallery: [
      "/src/assets/faith-moves-content1.jpg"
    ]
  }
];
