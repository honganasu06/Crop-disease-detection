import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Moon, Sun, Menu, X, Sprout } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode for neon theme
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Force dark mode on init for the neon theme
    document.documentElement.classList.add('dark');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Upload', path: '/upload' },
    { name: 'Weather', path: '/weather' },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${isScrolled
        ? 'glass-crystalline rounded-2xl py-3 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10'
        : 'bg-transparent py-6 px-4'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 flex items-center justify-center bg-primary/10 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300 border border-primary/20">
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:opacity-100 transition-opacity opacity-0"></div>
            <Sprout className="w-6 h-6 text-primary relative z-10" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Agri<span className="text-primary">Vision</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md rounded-xl p-1 border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-lg transition-all duration-300 font-medium relative overflow-hidden group ${location.pathname === link.path
                  ? 'text-primary-foreground shadow-[0_0_15px_rgba(74,222,128,0.4)]'
                  : 'text-muted-foreground hover:text-primary'
                  }`}
              >
                {location.pathname === link.path && (
                  <div className="absolute inset-0 bg-primary rounded-lg -z-10 animate-fade-in"></div>
                )}
                <span className="relative z-10">{link.name}</span>
                {location.pathname !== link.path && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10"></div>
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleDarkMode}
            className="ml-4 w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300 icon-bounce bg-black/20 backdrop-blur-md"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors bg-black/20 rounded-lg backdrop-blur-md border border-white/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>


      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
        <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-primary/20 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl transition-all ${location.pathname === link.path
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-primary hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </nav>
  );
}
