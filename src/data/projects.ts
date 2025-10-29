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
• Dunlop Corbin Communications – EU/Jamaica Citizen Security Plan`,
    events: [
      {
        id: "access-fin-launch",
        title: "Access Financial Services Limited",
        galleryImages: [
          "/src/assets/access-launch-content1.jpg",
          "/src/assets/access-launch-content2.jpg",
          "/src/assets/access-launch-content3.jpg",
          "/src/assets/access-gallery-1.jpg",
          "/src/assets/access-gallery-2.jpg",
          "/src/assets/access-gallery-3.jpg",
          "/src/assets/access-gallery-4.jpg",
          "/src/assets/access-gallery-5.jpg"
        ]
      },
      {
        id: "ministry-education",
        title: "Ministry of Education, Skills, Youth and Information",
        galleryImages: [
          "/src/assets/ministry-education-gallery-1.jpg",
          "/src/assets/ministry-education-gallery-2.jpg",
          "/src/assets/ministry-education-gallery-3.jpg",
          "/src/assets/ministry-education-gallery-4.jpg",
          "/src/assets/ministry-education-gallery-5.jpg"
        ]
      },
      {
        id: "port-authority-groundbreaking",
        title: "Port Authority of Jamaica",
        galleryImages: [
          "/src/assets/port-authority-content1.jpeg",
          "/src/assets/port-authority-content2.jpeg",
          "/src/assets/port-authority-content3.jpeg",
          "/src/assets/port-authority-gallery-1.jpg",
          "/src/assets/port-authority-gallery-2.jpg"
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
        image: "/src/assets/breaking-news2.png",
        url: "https://www.jamaicaobserver.com/2025/05/25/nine-childrens-homes-benefit-access-financials-6-5m-social-responsibility-initiative/",
        title: "Port Authority Groundbreaking News"
      },
      {
        image: "/src/assets/breaking-news3.png",
        url: "https://jamaica-gleaner.com/article/lifestyle/20250913/goodheart-selling-sweets-higher-purpose-and-education",
        title: "Goodheart Selling Sweets for a Higher Purpose"
      },
      {
        image: "/src/assets/breaking-news4.png",
        url: "https://jamaica-gleaner.com/article/lead-stories/20240605/shirley-projects-us20m-yearlong-repair-timeline-ocho-rios-cruise",
        title: "Shirley Projects US$20M Yearlong Repair Timeline for Ocho Rios Cruise"
      },
      {
        image: "/src/assets/breaking-news5.png",
        url: "https://jis.gov.jm/disney-treasure-makes-inaugural-call-at-falmouth-cruise-port/",
        title: "Disney Treasure Makes Inaugural Call at Falmouth Cruise Port"
      },
      {
        image: "/src/assets/breaking-news6.png",
        url: "https://jamaica-gleaner.com/article/lead-stories/20250201/new-learning-development-policy-aimed-public-sector-transformation",
        title: "New Learning & Development Policy Aimed at Public Sector Transformation"
      },
      {
        image: "/src/assets/breaking-news7.png",
        url: "https://jis.gov.jm/new-policy-a-game-changer-for-public-sector-professional-development/",
        title: "New Policy a Game Changer for Public Sector Professional Development"
      },
      {
        image: "/src/assets/breaking-news8.png",
        url: "https://jamaica-gleaner.com/article/news/20231123/working-mom-urges-parents-invest-their-childrens-education",
        title: "Working Mom Urges Parents to Invest in Their Children's Education"
      },
      {
        image: "/src/assets/breaking-news9.png",
        url: "https://jamaica-gleaner.com/article/news/20240628/jbdc-and-access-financial-services-sign-mou",
        title: "JBDC and Access Financial Services Sign MOU"
      },
      {
        image: "/src/assets/breaking-news10.png",
        url: "https://www.jamaicaobserver.com/allwoman/2024/10/27/take-nothing-granted/",
        title: "Take Nothing for Granted"
      },
      {
        image: "/src/assets/breaking-news11.png",
        url: "https://jamaica-gleaner.com/article/news/20231109/students-role-education-sectors-transformation-underscored",
        title: "Students' Role in Education Sector's Transformation Underscored"
      },
      {
        image: "/src/assets/breaking-news12.png",
        url: "https://jamaica-gleaner.com/article/news/20231020/ministry-launch-communication-campaign-education-transformation",
        title: "Ministry Launch Communication Campaign for Education Transformation"
      },
      {
        image: "/src/assets/breaking-news13.png",
        url: "https://jamaica-gleaner.com/article/news/20230701/mckenzie-hails-access-financials-poverty-reduction-initiative",
        title: "McKenzie Hails Access Financial's Poverty Reduction Initiative"
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
• EU/Jamaica Citizen Security Plan`,
    events: [
      {
        id: "trend-campaign",
        title: "Ministry of Education, Skills, Youth and Information - T.R.E.N.D Campaign",
        galleryImages: [
          "/src/assets/trend-gallery-10.png",
          "/src/assets/MOEY-Trend-Content.mp4",
          "/src/assets/trend-gallery-1.jpg",
          "/src/assets/trend-gallery-2.jpg",
          "/src/assets/trend-gallery-3.jpg",
          "/src/assets/trend-gallery-4.jpg",
          "/src/assets/trend-gallery-5.jpg",
          "/src/assets/trend-gallery-6.jpg",
          "/src/assets/trend-gallery-7.jpg",
          "/src/assets/trend-gallery-8.jpg",
          "/src/assets/trend-gallery-9.jpg"
        ]
      },
      {
        id: "eu-jamaica-citizen-security",
        title: "EU/Jamaica Citizen Security Plan",
        galleryImages: [
          "/src/assets/eu-jamaica-gallery-1.jpg",
          "/src/assets/eu-jamaica-gallery-2.jpg",
          "/src/assets/eu-jamaica-gallery-3.jpg",
          "/src/assets/eu-jamaica-gallery-4.jpg",
          "/src/assets/eu-jamaica-gallery-5.jpg",
          "/src/assets/eu-jamaica-gallery-6.jpg"
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
• EU/Jamaica Citizens Security Plan - Closing Ceremony and Impact Showcase`,
    events: [
      {
        id: "afs-marcus-james-scholarship",
        title: "AFS Marcus James Scholarship for Entrepreneurship Ceremony",
        galleryImages: [
          "/src/assets/afs-marcus-2.jpg",
          "/src/assets/afs-marcus-1.jpg",
          "/src/assets/afs-marcus-3.jpg",
          "/src/assets/afs-marcus-4.jpg",
          "/src/assets/afs-marcus-6.jpg",
          "/src/assets/afs-marcus-7.jpg",
          "/src/assets/afs-marcus-8.jpg",
          "/src/assets/afs-marcus-9.jpg",
          "/src/assets/afs-marcus-10.jpg",
          "/src/assets/afs-marcus-11.jpg"
        ]
      },
      {
        id: "afs-25th-anniversary-gala",
        title: "AFS 25th Anniversary Gala and Awards Ceremony",
        galleryImages: [
          "/src/assets/afs-25th-1.jpg",
          "/src/assets/afs-25th-2.jpg",
          "/src/assets/afs-25th-3.jpg",
          "/src/assets/afs-25th-4.jpg",
          "/src/assets/afs-25th-5.jpg",
          "/src/assets/afs-25th-6.jpg",
          "/src/assets/afs-25th-7.jpg",
          "/src/assets/afs-25th-8.jpg",
          "/src/assets/afs-25th-9.jpg",
          "/src/assets/afs-25th-10.jpg",
          "/src/assets/afs-25th-11.jpg",
          "/src/assets/afs-25th-12.jpg"
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
        headerImage: "/src/assets/IAWW-cover.jpg",
        description: `**It's A Woman's World – TV Done Right!**
This syndicated TV talk show enchanted audiences across the Caribbean for two seasons. Six months after its premier in Jamaica in February 2019, the show was picked up across more than 20 Caribbean markets and 8 North American cities, including New York, Boston, Washington DC, Toronto and Vancouver. Riding that momentum, Season 2 did not disappoint in 2020, consistently securing a Top 10 ranking across all 21 Caribbean territories on the FLOW platform.

Described as fresh, first-world and fun, this Danrak exclusive television presentation generated conversation online and among TV audiences, focusing on issues that affect women and families. Co-hosts Stacy-Ann Smith, Ty Williams and Kerine Muir enchanted viewers with their natural delivery and easy conversations. Besides the content, It's A Woman's World created a reputation for set design that was simple, yet sophisticated and as aesthetically pleasing as the hosts!`,
        youtubeUrl: "A4vjboa60DA",
        galleryImages: []
      },
      {
        id: "MOEY-learning-development-policy-video",
        title: "MOEY Trend Campaign",
        galleryImages: [
          "/src/assets/MOEY_FINAL.mp4"
        ]
      },
      {
        id: "stronger-together-documentary",
        title: "Stronger Together Documentary",
        galleryImages: [
          "/src/assets/stronger-together-content1.mp4",
          "/src/assets/stronger-together-content2.mp4",
          "/src/assets/stronger-together-content3.mp4"
        ]
      },
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
    events: [
      {
        id: "on-air-hosting-gallery",
        title: "Event Hosting Gallery",
        galleryImages: [
          "/src/assets/on-air-hosting-1.jpg",
          "/src/assets/on-air-hosting-2.jpg",
          "/src/assets/on-air-hosting-3.jpg",
          "/src/assets/on-air-hosting-4.jpg",
          "/src/assets/on-air-hosting-5.jpg",
          "/src/assets/on-air-hosting-6.jpg",
          "/src/assets/on-air-hosting-7.jpg",
          "/src/assets/on-air-hosting-8.jpg",
          "/src/assets/on-air-hosting-9.jpg",
          "/src/assets/on-air-hosting-10.jpg",
          "/src/assets/on-air-hosting-11.jpg"
        ]
      }
    ],
    category: "Talent & Hosting",
    date: "2020-2025"
  }
];
