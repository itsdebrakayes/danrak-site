import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Showcase', path: '/showcase' },
  { label: 'Contact', path: '/contact' },
];

interface HeaderProps {
  variant?: 'glass' | 'solid';
}

const Header = ({ variant = 'glass' }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navStyles = variant === 'glass' 
    ? "bg-white/10 dark:bg-black/10 backdrop-blur-lg shadow-xl px-8 py-3 rounded-full flex gap-4 text-sm font-semibold text-foreground dark:text-white transition-all"
    : "bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex gap-2 shadow-2xl";

  const linkStyles = (isActive: boolean) => {
    if (variant === 'glass') {
      return `text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-white/20 backdrop-blur-sm shadow-md border border-white/30' 
          : 'hover:bg-white/20 hover:border-2 hover:border-white/60 hover:shadow-lg'
      }`;
    } else {
      return `text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-white text-black font-semibold shadow-lg'
          : 'text-white hover:bg-white/20 hover:text-white'
      }`;
    }
  };

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className={navStyles}>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={linkStyles(location.pathname === item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
