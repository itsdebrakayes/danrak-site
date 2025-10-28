export interface Event {
  id: string;
  title: string;
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
  serviceId?: string;
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
    serviceDescription: `With the weight of more than 20 years of experience, we offer a full suite of corporate communications services to provide our clients with insights and support the advancement of their goals, developing and effectively deploying strategic communications and PR storytelling.

Our range of services includes strategy development, tailored action plans that support marketing and improve brand visibility, strategic counselling, crisis communications and the production of annual reports that meet the exacting regulatory standards of the Jamaica Stock Exchange and the Bank of Jamaica.

Services at a glance:
• Strategic Communications
• Public Relations
• Media Relations
• Internal Communications
• Crisis Communications
• Change and Comms
• Stakeholder Management
• Government Engagement
• Copy writing and editing

Clients Served and Related Projects:
• Access Financial Services – Full Service
• Port Authority of Jamaica – PAJ Media Open Day
• Wisynco Group Limited – 2025 Annual Report
• Dunlop Corbin Communications – EU Citizens Security Plan`,
    events: [
      {
        id: "access-fin-launch",
        title: "Access Financial 25th Anniversary Launch",
        galleryImages: [
          "/src/assets/access-launch-content1.jpg",
          "/src/assets/access-launch-content2.jpg",
          "/src/assets/access-launch-content3.jpg"
        ]
      },
      {
        id: "port-authority-groundbreaking",
        title: "Port Authority Groundbreaking Ceremony",
        galleryImages: [
          "/src/assets/port-authority-content1.jpeg",
          "/src/assets/port-authority-content2.jpeg",
          "/src/assets/port-authority-content3.jpeg"
        ]
      }
    ],
    category: "Corporate Communications",
    date: "2024-2025"
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
        galleryImages: [
          "/src/assets/honors-awards-content2.jpg",
          "/src/assets/honors-awards-content3.mp4"
        ]
      }
    ],
    category: "Campaigns",
    date: "2024"
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
        galleryImages: [
          "/src/assets/port-authority-content1.jpeg",
          "/src/assets/port-authority-content2.jpeg"
        ]
      }
    ],
    category: "Event Management",
    date: "2024-2025"
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
        galleryImages: [
          "/src/assets/faith-moves-content1.jpg",
          "/src/assets/faith-moves-content2.jpg"
        ]
      }
    ],
    category: "Media Production",
    date: "2025"
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
        galleryImages: [
          "/src/assets/faith-moves-content1.jpg",
          "/src/assets/faith-moves-content2.jpg"
        ]
      }
    ],
    category: "Talent & Hosting",
    date: "2020-2025"
  }
];
