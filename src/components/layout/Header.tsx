import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store';
import { setLanguage } from '../../store/slices/uiSlice';

const Logo = ({ isMenuOpen = false }) => {
  return (
    <picture>
      <source srcSet={`/assets/images/logos/ADH_LOGO_${isMenuOpen ? 'WHITE' : 'BLACK'}.webp`} type="image/webp" />
      <source srcSet={`/assets/images/logos/ADH_LOGO_${isMenuOpen ? 'WHITE' : 'BLACK'}.svg`} type="image/svg+xml" />
      <img 
        src={`/assets/images/logos/ADH_LOGO_${isMenuOpen ? 'WHITE' : 'BLACK'}.png`}
        alt="App Design House Logo" 
        className="h-4 md:h-6 w-auto"
      />
    </picture>
  );
};

const menuItems = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/services', key: 'services' },
  { path: '/projects', key: 'projects' },
  { path: '/custom-package', key: 'custom_package' },
  { path: '/contact', key: 'contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-colors duration-300 ${isOpen ? 'bg-transparent' : 'bg-white/80 backdrop-blur-sm'}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between relative z-50">
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Logo isMenuOpen={isOpen} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-700 hover:text-primary transition-colors ${
                  item.path === '/contact' ? 'btn btn-primary text-white' : ''
                }`}
              >
                {t(`navigation.${item.key}`)}
              </Link>
            ))}
            
            {/* Desktop Language Switcher */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => changeLanguage('tr')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  i18n.language === 'tr' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  i18n.language === 'en' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 focus:outline-none group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Menu</span>
            <motion.div
              className="flex flex-col items-center justify-center w-full h-full"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.span
                className={`absolute w-6 h-0.5 transform-gpu ${isOpen ? 'bg-white' : 'bg-gray-600'}`}
                variants={{
                  closed: { rotate: 0, y: -4 },
                  open: { rotate: 45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`absolute w-6 h-0.5 transform-gpu ${isOpen ? 'bg-white' : 'bg-gray-600'}`}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`absolute w-6 h-0.5 transform-gpu ${isOpen ? 'bg-white' : 'bg-gray-600'}`}
                variants={{
                  closed: { rotate: 0, y: 4 },
                  open: { rotate: -45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
            >
              {/* Animated Gradient Backdrop */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-tertiary via-secondary to-primary"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.98,
                  backgroundPosition: ['0% 50%', '100% 50%', '200% 50%'],
                }}
                style={{
                  backgroundSize: '200% 200%',
                  backgroundImage: 'linear-gradient(-45deg, var(--color-tertiary), var(--color-secondary), var(--color-primary), var(--color-secondary), var(--color-tertiary))'
                }}
                transition={{
                  backgroundPosition: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Menu Items */}
                <motion.div
                  className="relative z-10 flex flex-col items-center space-y-4 w-full max-w-sm mx-auto px-4"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                >
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.path}
                      className="w-full"
                      variants={{
                        open: { y: 0, opacity: 1 },
                        closed: { y: 20, opacity: 0 }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Link
                        to={item.path}
                        className={`block text-center text-lg font-medium relative group ${
                          item.path === '/contact'
                            ? 'btn btn-primary text-white text-base px-6 py-3 w-full backdrop-blur-sm bg-white/10'
                            : 'text-white/90 hover:text-white transition-colors py-2'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.path !== '/contact' && (
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 transform origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        {t(`navigation.${item.key}`)}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Language Switcher */}
                  <motion.div
                    className="flex items-center space-x-4 mt-8"
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 20, opacity: 0 }
                    }}
                  >
                    <button
                      onClick={() => {
                        changeLanguage('tr');
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-colors ${
                        i18n.language === 'tr'
                          ? 'bg-white text-primary'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      TR
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage('en');
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-colors ${
                        i18n.language === 'en'
                          ? 'bg-white text-primary'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      EN
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header; 