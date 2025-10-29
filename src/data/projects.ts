import { images } from '@/assets/images';

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
    image: images.corporateComms.image,
    carouselImage: images.corporateComms.carousel,
    backgroundImage: images.corporateComms.background,
    excerpt: "With the weight of more than 20 years of experience, we offer a full suite of corporate communications services to provide our clients with insights and support the advancement of their goals, developing and effectively deploying strategic communications and PR storytelling.",
    serviceDescription: `With the weight of more than 20 years of experience, we offer a full suite of corporate communications services to provide our clients with insights and support the advancement of their goals, developing and effectively deploying strategic communications and PR storytelling.

Our range of services includes strategy development, tailored action plans that support marketing and improve brand visibility, strategic counselling, crisis communications and the production of annual reports that meet the exacting regulatory standards of the Jamaica Stock Exchange and the Bank of Jamaica.

**Services Include:**
• Strategic Communications
• Public Relations
• Media Relations
• Internal Communications
• Crisis Communications
• Change and Comms
• Stakeholder Management
• Government Engagement
• Copy writing and editing

**Clients Served and Related Projects:**
• Access Financial Services – Full Service Communications and PR
• Port Authority of Jamaica – PAJ Media Open Day 2024
• Wisynco Group Limited – 2025 Annual Report
• Dunlop Corbin Communications – EU/Jamaica Citizen Security Plan`,
    events: [
      {
        id: "access-fin-launch",
        title: "Access Financial Services Limited",
        galleryImages: [
          ...images.corporateComms.accessLaunch,
          ...images.corporateComms.accessGallery
        ]
      },
      {
        id: "ministry-education",
        title: "Ministry of Education, Skills, Youth and Information",
        galleryImages: images.corporateComms.ministryEducation
      },
      {
        id: "port-authority-groundbreaking",
        title: "Port Authority of Jamaica",
        galleryImages: images.corporateComms.portAuthority
      }
    ],
    category: "Corporate Communications",

    newspaperClippings: images.corporateComms.breakingNews.map((img, idx) => ({
      image: img,
      url: [
        "https://jamaica-gleaner.com/article/lead-stories/20250425/living-room-start-expanding-enterprise",
        "https://www.jamaicaobserver.com/2025/05/25/nine-childrens-homes-benefit-access-financials-6-5m-social-responsibility-initiative/",
        "https://jamaica-gleaner.com/article/lifestyle/20250913/goodheart-selling-sweets-higher-purpose-and-education",
        "https://jamaica-gleaner.com/article/lead-stories/20240605/shirley-projects-us20m-yearlong-repair-timeline-ocho-rios-cruise",
        "https://jis.gov.jm/disney-treasure-makes-inaugural-call-at-falmouth-cruise-port/",
        "https://jamaica-gleaner.com/article/lead-stories/20250201/new-learning-development-policy-aimed-public-sector-transformation",
        "https://jis.gov.jm/new-policy-a-game-changer-for-public-sector-professional-development/",
        "https://jamaica-gleaner.com/article/news/20231123/working-mom-urges-parents-invest-their-childrens-education",
        "https://jamaica-gleaner.com/article/news/20240628/jbdc-and-access-financial-services-sign-mou",
        "https://www.jamaicaobserver.com/allwoman/2024/10/27/take-nothing-granted/",
        "https://jamaica-gleaner.com/article/news/20231109/students-role-education-sectors-transformation-underscored",
        "https://jamaica-gleaner.com/article/news/20231020/ministry-launch-communication-campaign-education-transformation",
        "https://jamaica-gleaner.com/article/news/20230701/mckenzie-hails-access-financials-poverty-reduction-initiative"
      ][idx],
      title: [
        "Access Financial 25th Anniversary Coverage",
        "Port Authority Groundbreaking News",
        "Goodheart Selling Sweets for a Higher Purpose",
        "Shirley Projects US$20M Yearlong Repair Timeline for Ocho Rios Cruise",
        "Disney Treasure Makes Inaugural Call at Falmouth Cruise Port",
        "New Learning & Development Policy Aimed at Public Sector Transformation",
        "New Policy a Game Changer for Public Sector Professional Development",
        "Working Mom Urges Parents to Invest in Their Children's Education",
        "JBDC and Access Financial Services Sign MOU",
        "Take Nothing for Granted",
        "Students' Role in Education Sector's Transformation Underscored",
        "Ministry Launch Communication Campaign for Education Transformation",
        "McKenzie Hails Access Financial's Poverty Reduction Initiative"
      ][idx]
    }))
  },

  {
    id: "campaign-development",
    serviceId: "campaign-development",
    title: "Campaign Development & Execution",
    image: images.campaignDev.image,
    carouselImage: images.campaignDev.carousel,
    backgroundImage: images.campaignDev.background,
    excerpt: "We plan and deliver marketing, communications and public relations campaigns that create impact. From concept development to the production of campaign assets and executing your launch event with precision, we curate campaigns that help you achieve strategic goals - on time and within budget.",
    serviceDescription: `We plan and deliver marketing, communications and public relations campaigns that create impact. From concept development to the production of campaign assets and executing your launch event with precision, we curate campaigns that help you achieve strategic goals - on time and within budget.

With a commitment to excellence and a collaborative approach, we keep our clients at the centre of the project to ensure we bring your vision to life. Our experience covers brand campaigns, marketing and public education campaigns across the public and private sectors.

**Services Include:**
• Insight-led campaign development
• Budget crafting and management
• Production of campaign assets
• Media strategy and resource allocation
• Effective comms for successful events

**Clients Served and Related Projects:**
• Ministry of Education, Skills, Youth and Information - TREND Public Education Campaign
• Dunlop Corbin Communications – EU/Jamaica Citizen Security Plan`,
    events: [
      {
        id: "trend-campaign",
        title: "Ministry of Education, Skills, Youth and Information - T.R.E.N.D Campaign",
        galleryImages: images.campaignDev.trend
      },
      {
        id: "eu-jamaica-citizen-security",
        title: "EU/Jamaica Citizen Security Plan",
        galleryImages: images.campaignDev.euJamaica
      }
    ],
    category: "Campaigns"
  },

  {
    id: "project-event-planning",
    serviceId: "project-event-planning",
    title: "Project & Event Planning",
    image: images.projectEvent.image,
    carouselImage: images.projectEvent.carousel,
    backgroundImage: images.projectEvent.background,
    excerpt: "Let's bring your idea to life! Through strategic planning, seamless execution, and creative excellence, we take your vision and create moments that inspire and occasions that leave a lasting impact. With experience managing a wide range of projects and events - from corporate functions and community initiatives to brand activations and private celebrations - we ensure every detail aligns with your goals and vision.",
    serviceDescription: `Let's bring your idea to life! Through strategic planning, seamless execution, and creative excellence, we take your vision and create moments that inspire and occasions that leave a lasting impact. With experience managing a wide range of projects and events - from corporate functions and community initiatives to brand activations and private celebrations - we ensure every detail aligns with your goals and vision.

Our approach combines precision and creativity. We handle budgeting, vendor coordination, logistics, and on-site management whether it's a one-day event or a long-term project.

**Services Include:**
• Comprehensive project and event planning
• Budget and resource management
• Vendor sourcing and coordination
• Event logistics and execution
• Stakeholder and team management
• Post-event evaluation and reporting

**Clients Served and Related Projects:**
• Access Financial Services – 25th Anniversary Celebrations
• Port Authority of Jamaica – Diplomatic Week 2025
• EU/Jamaica Citizens Security Plan - Closing Ceremony and Impact Showcase`,
    events: [
      {
        id: "afs-marcus-james-scholarship",
        title: "AFS Marcus James Scholarship for Entrepreneurship Ceremony",
        galleryImages: images.projectEvent.afsMarcus
      },
      {
        id: "afs-25th-anniversary-gala",
        title: "AFS 25th Anniversary Gala and Awards Ceremony",
        galleryImages: images.projectEvent.afs25th
      }
    ],
    category: "Event Management"
  },

  {
    id: "video-tv-production",
    serviceId: "video-tv-production",
    title: "Video & Television Production",
    image: images.videoTv.image,
    carouselImage: images.videoTv.carousel,
    backgroundImage: images.videoTv.background,
    excerpt: "For more than 20 years, we've been turning ideas into powerful visual stories. Our team of video and television production professionals has created captivating content for TV audiences across Jamaica and the Caribbean – from corporate brands to government agencies and multi-national institutions.",
    serviceDescription: `For more than 20 years, we've been turning ideas into powerful visual stories. Our team of video and television production professionals has created captivating content for TV audiences across Jamaica and the Caribbean – from corporate brands to government agencies and multi-national institutions.

We don't just produce videos we curate content that connects. Whether it's a commercial, documentary or a TV talk show, we combine creativity, strategy, and technical excellence to deliver content that informs, inspires, and engages.

With 2+ decades of hands-on experience in broadcast production, we understand what it takes to deliver professional, high-quality results so your message hits the target every time.

**Services Include:**
• Television and video production
• Creative concept development and scripting
• Studio and on-location filming
• Post-production and editing
• Corporate and promotional videos

**Clients Served and Related Projects:**
• Port Authority of Jamaica – 50th Anniversary Videos, Kingston Logistics Park, Caymanas Special Economic Zone
• Management Institute for National Development (MIND) – GOJ Learning & Development Policy Movie`,
    events: [
      {
        id: "its-a-womans-world-featured",
        title: "It's A Woman's World",
        featured: true,
        headerImage: images.videoTv.iawwCover,
        description: `**It's A Woman's World – TV Done Right!**
This syndicated TV talk show enchanted audiences across the Caribbean for two seasons. Six months after its premier in Jamaica in February 2019, the show was picked up across more than 20 Caribbean markets and 8 North American cities, including New York, Boston, Washington DC, Toronto and Vancouver. Riding that momentum, Season 2 did not disappoint in 2020, consistently securing a Top 10 ranking across all 21 Caribbean territories on the FLOW platform.

Described as fresh, first-world and fun, this Danrak exclusive television presentation generated conversation online and among TV audiences, focusing on issues that affect women and families. Co-hosts Stacy-Ann Smith, Ty Williams and Kerine Muir enchanted viewers with their natural delivery and easy conversations. Besides the content, It's A Woman's World created a reputation for set design that was simple, yet sophisticated and as aesthetically pleasing as the hosts!`,
        youtubeUrl: "A4vjboa60DA",
        galleryImages: []
      },
      {
        id: "MOEY-learning-development-policy-video",
        title: "MOEY Trend Campaign",
        galleryImages: [images.videoTv.moeyFinal]
      },
      {
        id: "stronger-together-documentary",
        title: "Stronger Together Web-Series",
        galleryImages: images.videoTv.strongerTogether
      },
    ],
    category: "Media Content Production"
  },

  {
    id: "on-air-talent",
    serviceId: "on-air-talent",
    title: "On-Air Talent & Event Hosting",
    image: images.onAirTalent.image,
    carouselImage: images.onAirTalent.carousel,
    backgroundImage: images.onAirTalent.background,
    excerpt: "Broadcaster and orator Stacy-Ann Smith has been anchoring live television events for the better part of 25 years. Building on her years on set presenting the nightly news, this media maven has been the go-to anchor for several state events including the annual Ceremony of Investiture and Presentation of National Honours and Awards for more than 12 years.",
    serviceDescription: `Broadcaster and orator Stacy-Ann Smith has been anchoring live television events for the better part of 25 years. Building on her years on set presenting the nightly news, this media maven has been the go-to anchor for several state events including the annual Ceremony of Investiture and Presentation of National Honours and Awards for more than 12 years.

This versatile communications practitioner bridges the gap between official and corporate events to bring the right energy and charm to engage and captivate your guests. More than just an MC, Stacy-Ann understands protocol and possesses the kind of flexibility to connect with audiences - be they formal or not.

**Clients Served and Related Projects:**
• Jamaica Information Service – Ceremony of Investiture and Presentation of National Honours and Awards; Ceremonial Opening of Parliament; Swearing-In Ceremony of Prime Minister Dr. Andrew Holness
• Women Centre Foundation of Jamaica Documentary
• Access Financial Services – 25th Anniversary Gala & Awards Ceremony
• BARITA Wealth – 2025 Wealth Brunch
• Child Protection & Family Services Agency – Annual Education Achievement Awards
• UNICEF Jamaica – 2024 Strategic Moment of Reflection
• Port Authority of Jamaica – Launch of Westlands Expansion Project 2025; Launch of Caymanas Special Economic Zone
• National Health Fund – 20th Anniversary Gala`,
    events: [
      {
        id: "on-air-hosting-gallery",
        title: "Event Hosting Gallery",
        galleryImages: images.onAirTalent.allGallery
      }
    ],
    category: "Talent & Hosting"
  }
];
