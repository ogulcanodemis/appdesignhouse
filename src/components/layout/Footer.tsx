import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logo = () => {
  return (
    <picture>
      <source srcSet="/assets/images/logos/ADH_LOGO_WHITE.webp" type="image/webp" />
      <source srcSet="/assets/images/logos/ADH_LOGO_WHITE.svg" type="image/svg+xml" />
      <img 
        src="/assets/images/logos/ADH_LOGO_WHITE.png" 
        alt="AppHouse Design Logo" 
        className="h-4 md:h-6 w-auto"
      />
    </picture>
  );
};

const Footer = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const serviceLinks = [
    { to: '/services#software', key: 'software' },
    { to: '/services#agency', key: 'agency' },
    { to: '/services#consulting', key: 'consulting' }
  ];

  const contactInfo = [
    { href: 'tel:+901234567890', key: 'phone' },
    { href: 'mailto:info@apphousedesign.com', key: 'email' },
    { key: 'address' }
  ];

  return (
    <footer className="bg-gradient-dark text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-tertiary via-secondary to-primary opacity-80"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />

        {/* Interactive Grid Pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Dynamic Light Effects */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            y: ['-50%', '-45%', '-50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            y: ['50%', '45%', '50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo ve Açıklama */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            variants={itemVariants}
          >
            <Link 
              to="/" 
              className="inline-block relative group"
            >
              <motion.div 
                className="relative z-10 backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10 transition-all duration-300 group-hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Logo />
                {/* Logo Light Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl"
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                />
              </motion.div>
            </Link>
            <motion.p 
              className="mt-4 text-gray-300 backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/5"
              variants={itemVariants}
            >
              {t('footer.description')}
            </motion.p>
          </motion.div>

          {/* Hizmetler */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 gradient-text bg-gradient-to-r from-accent to-light inline-block">
              {t('footer.sections.services.title')}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors relative group"
                  >
                    <span className="relative">
                      {t(`footer.sections.services.links.${link.key}`)}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* İletişim */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 gradient-text bg-gradient-to-r from-accent to-light inline-block">
              {t('footer.sections.contact.title')}
            </h3>
            <ul className="space-y-2">
              {contactInfo.map((contact, index) => (
                <motion.li
                  key={index}
                  className="text-gray-300"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {contact.href ? (
                    <a 
                      href={contact.href} 
                      className="hover:text-white transition-colors relative group inline-block"
                    >
                      <span className="relative">
                        {t(`footer.sections.contact.${contact.key}`)}
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                        />
                      </span>
                    </a>
                  ) : (
                    <span>{t(`footer.sections.contact.${contact.key}`)}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Alt Bilgi */}
        <motion.div
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 relative"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          {t('footer.copyright').replace('{year}', '2025')}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;