import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', key: 'home' },
    { path: '/about', key: 'about' },
    { path: '/services', key: 'services' },
    { path: '/projects', key: 'projects' },
    { path: '/contact', key: 'contact' },
  ];

  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`relative py-2 text-sm font-medium transition-colors ${
              isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
            }`}
          >
            {t(`navigation.${item.key}`)}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="navigation-underline"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation; 