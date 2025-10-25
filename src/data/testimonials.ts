export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle?: string;
  content: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  date: string;
  projectId?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "John Smith",
    clientTitle: "CEO, Access Financial",
    content: "DanRak Productions delivered an exceptional event that exceeded all our expectations. Their attention to detail and creative vision brought our 25th anniversary celebration to life.",
    date: "2025",
    projectId: "access-fin"
  },
  {
    id: "testimonial-2",
    clientName: "Maria Johnson",
    clientTitle: "Event Coordinator",
    content: "Working with DanRak was a seamless experience. They handled everything from planning to execution with professionalism and creativity.",
    date: "2024",
  },
  {
    id: "testimonial-3",
    clientName: "David Williams",
    clientTitle: "Marketing Director, Port Authority",
    content: "The groundbreaking ceremony was a huge success thanks to DanRak Productions. They created an atmosphere that honored our heritage while celebrating our future.",
    date: "2025",
    projectId: "port-authority"
  },
  {
    id: "testimonial-4",
    clientName: "Sarah Chen",
    clientTitle: "Producer, Faith Moves",
    content: "DanRak's production expertise transformed our vision into reality. The quality and storytelling were exceptional.",
    date: "2025",
    projectId: "faith-moves"
  },
];
