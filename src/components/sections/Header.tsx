import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Showcase', path: '/showcase' },
  { label: 'Contact', path: '/contact' },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
      <nav className="glass rounded-full px-6 py-2 flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
              location.pathname === item.path
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
