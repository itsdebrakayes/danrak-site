import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import logo from '@/assets/hero-portrait.png';

const socials = [
  { icon: <FaInstagram />, url: 'https://instagram.com' },
  { icon: <FaLinkedin />, url: 'https://linkedin.com' },
  { icon: <FaYoutube />, url: 'https://youtube.com' },
];

const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-end p-4 pointer-events-none">
    <div className="pointer-events-auto">
      <img src={logo} alt="DanraK logo" className="w-12 h-12 object-contain" />
    </div>
    <div className="flex gap-4 pointer-events-auto">
      {socials.map((s, i) => (
        <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary">
          {s.icon}
        </a>
      ))}
    </div>
  </footer>
);

export default Footer;
