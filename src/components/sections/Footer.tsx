import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from '@/assets/DanRak Prod Logo.png';

const socials = [
  { icon: <FaInstagram />, url: 'https://instagram.com/danrakproductions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram', hoverClass: 'hover:text-brand-crimson' },
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/stacy-ann-williams-smith-039242b4/', label: 'LinkedIn', hoverClass: 'hover:text-brand-ocean' },
  { icon: <FaYoutube />, url: 'https://www.youtube.com/@danrakproductions2241', label: 'YouTube', hoverClass: 'hover:text-brand-forest' },
];

interface FooterProps {
  variant?: 'fixed' | 'static';
}

const Footer = ({ variant = 'fixed' }: FooterProps) => {
  const footerClass = variant === 'fixed' 
    ? "fixed bottom-0 left-0 right-0 z-50 flex justify-between items-end p-4 pointer-events-none"
    : "relative w-full flex justify-between items-center p-4 mt-auto bg-background/80 backdrop-blur-sm border-t border-border";

  const contentClass = variant === 'fixed' ? "pointer-events-auto" : "";

  return (
    <footer className={footerClass}>
      <div className={contentClass}>
  <img src={logo} alt="Danrak logo" loading="lazy" decoding="async" className="w-12 h-12 object-contain" />
      </div>
      <div className={`flex gap-4 ${contentClass}`}>
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`inline-flex w-10 h-10 items-center justify-center rounded-full text-2xl transition-colors duration-300 ${s.hoverClass}`}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
