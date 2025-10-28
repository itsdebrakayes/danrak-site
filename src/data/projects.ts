export interface Event {
  id: string;
  title: string;
  galleryImages: string[];
  // Optional fields for featured events
  featured?: boolean;
  headerImage?: string;
  description?: string;
  youtubeUrl?: string;
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
  newspaperClippings?: Array<{
    image: string;
    url: string;
    title?: string;
  }>;
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
    date: "2024-2025",

    newspaperClippings: [
      {
        image: "/src/assets/breaking-news1.png",
        url: "https://jamaica-gleaner.com/article/lead-stories/20250425/living-room-start-expanding-enterprise",
        title: "Access Financial 25th Anniversary Coverage"
      },
      {
        image: "/src/assets/port-authority-content1.jpeg",
        url: "https://example.com/article2",
        title: "Port Authority Groundbreaking News"
      }
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
    serviceDescription: `We plan and deliver market, communications and public relations campaigns that create impact. From concept development to the production of campaign assets and executing your launch event with precision, we curate campaigns that help you achieve strategic goals - on time and within budget.

With a commitment to excellence and a collaborative approach, we keep our clients at the centre of the project to ensure we bring your vision to life. Our experience covers brand campaigns, marketing and public education campaigns across the public and private sectors.

Services include:
• Insight-led Campaign Development
• Budget crafting and management
• Production of Campaign Assets
• Media Strategy and Resource Allocation
• Effective Comms for Successful Events

Clients Served and Related Projects:
• Ministry of Education, Skills, Youth and Information - TREND
• Dunlop Corbin Communications – EU Citizens Security Plan`,
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
    serviceDescription: `Let's bring your idea to life! Through strategic planning, seamless execution, and creative excellence, we take your vision and create moments that inspire and occasions that leave a lasting impact. With experience managing a wide range of projects and events - from corporate functions and community initiatives to brand activations and private celebrations - we ensure every detail aligns with your goals and vision.

Our approach combines precision and creativity. We handle budgeting, vendor coordination, logistics, and on-site management whether it's a one-day event or a long-term project.

Services include:
• Comprehensive project and event planning
• Budget and resource management
• Vendor sourcing and coordination
• Event logistics and execution
• Stakeholder and team management
• Post-event evaluation and reporting

Clients Served and Related Projects:
• Access Financial Services – 25th Anniversary Celebrations
• Port Authority of Jamaica – Diplomatic Week 2025
• Dunlop Corbin Communications – Opening of St. James Child & Adolescent Wellness Centre`,
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
    serviceDescription: `For more than 20 years, we've been turning ideas into powerful visual stories. Our team of video and television production professionals has created captivating content for TV audiences across Jamaica and the Caribbean – from corporate brands to government agencies and multi-national institutions.

We don't just produce videos we curate content that connects. Whether it's a commercial, documentary or a TV talk show, we combine creativity, strategy, and technical excellence to deliver content that informs, inspires, and engages.

With 2+ decades of hands-on experience in broadcast production, we understand what it takes to deliver professional, high-quality results so your message hits the target every time.

Services include:
• Television and video production
• Creative concept development and scripting
• Studio and on-location filming
• Post-production and editing
• Corporate and promotional videos

Clients Served and Related Projects:
• Port Authority of Jamaica – 50th Anniversary Videos Series, Kingston Logistics Park, Caymanas Special Economic Zone
• Management Institute for National Development (MIND) – GOJ Learning & Development Policy Movie`,
    events: [
      {
        id: "its-a-womans-world-featured",
        title: "It's A Woman's World",
        featured: true,
        headerImage: "/src/assets/faith-moves-content1.jpg",
        description: `It's A Woman's World – TV Done Right!
This syndicated TV talk show enchanted audiences across the Caribbean for two seasons. Six months after its premier in Jamaica in February 2019, the show was picked up across more than 20 Caribbean markets and 8 North American cities, including New York, Boston, Washington DC, Toronto and Vancouver. Riding that momentum, Season 2 did not disappoint in 2020, consistently securing a Top 10 ranking across all 21 Caribbean territories on the FLOW platform.

Described as fresh, first-world and fun, this Danrak exclusive television presentation generated conversation online and among TV audiences, focusing on issues that affect women and families. Co-hosts Stacy-Ann Smith, Ty Williams and Kerine Muir enchanted viewers with their natural delivery and easy conversations. Besides the content, It's A Woman's World created a reputation for set design that was simple, yet sophisticated and as aesthetically pleasing as the hosts!`,
        youtubeUrl: "dQw4w9WgXcQ",
        galleryImages: []
      },
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
    serviceDescription: `Broadcaster and orator Stacy-Ann Smith has been anchoring live television events for the better part of 25 years. Building on her years on set presenting the nightly news, this media maven has been the go-to anchor for several state events including the annual Ceremony of Investiture and Presentation of National Honours and Awards for more than 12 years.

This versatile communications practitioner bridges the gap between official and corporate events to bring the right energy and charm to engage and captivate your guests. More than just an MC, Stacy-Ann understands protocol and possesses the kind of flexibility to connect with any audiences - be they formal or not.

Clients Served and Related Projects:
• Jamaica Information Service – Ceremony of Investiture and Presentation of National Honours and Awards; Ceremonial Opening of Parliament; Swearing-In Ceremony of Prime Minister Dr. Andrew Holness
• Women Centre Foundation of Jamaica
• Access Financial Services – 25th Anniversary Gala & Awards Ceremony
• BARITA Wealth – Wealth Brunch
• Child Protection & Family Services Agency – Annual Education Achievement Awards
• UNICEF Jamaica – 2024 Strategic Moment of Reflection
• Port Authority of Jamaica – Launch of Westlands Expansion Project 2025
• National Health Fund – 20th Anniversary Gala`,
    events: [],
    category: "Talent & Hosting",
    date: "2020-2025"
  }
];
