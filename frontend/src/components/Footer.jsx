import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Detect', path: '/detect' },
      { name: 'Insights', path: '/insights' },
      { name: 'Features', path: '/#features' },
    ],
    Company: [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    Resources: [
      { name: 'Documentation', path: '#' },
      { name: 'API', path: '#' },
      { name: 'Support', path: '/contact' },
    ],
  };

  return (
  <footer className="glass-nav border-t border-white/10 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-card">
                <span className="text-primary font-bold text-sm">AV</span>
              </div>
              <span className="text-xl font-bold text-gradient">AgriVision</span>
            </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
              AI-powered crop disease detection for modern agriculture.
            </p>
            <div className="flex space-x-3">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2z"/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {currentYear} AgriVision. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <Link to="/" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/" className="hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
