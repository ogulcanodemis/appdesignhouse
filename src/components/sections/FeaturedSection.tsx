import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const features = [
  {
    id: 'web',
    icon: '🌐',
    gradient: 'from-primary to-secondary',
  },
  {
    id: 'mobile',
    icon: '📱',
    gradient: 'from-secondary to-tertiary',
  },
  {
    id: 'uiux',
    icon: '🎨',
    gradient: 'from-tertiary to-accent',
  },
  {
    id: 'digital',
    icon: '📈',
    gradient: 'from-accent to-light',
  },
  {
    id: 'ecommerce',
    icon: '🛍️',
    gradient: 'from-primary to-accent',
  },
  {
    id: 'consulting',
    icon: '💼',
    gradient: 'from-secondary to-light',
  },
];

const FeaturedSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0.8, 0.9, 1]);
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span>{t('featured.title.part1')} </span>
            <span className="gradient-text bg-gradient-to-r from-primary to-accent">{t('featured.title.part2')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('featured.description')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Card Background with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-lg"
                style={{
                  backgroundImage: `linear-gradient(45deg, var(--color-${feature.gradient}))`
                }}
              />
              
              {/* Card Content */}
              <div className="relative bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 group-hover:border-gray-200 transition-all duration-300 backdrop-blur-sm">
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {t(`featured.services.${feature.id}.title`)}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  {t(`featured.services.${feature.id}.description`)}
                </p>

                {/* Hover Line Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--color-${feature.gradient}))`
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedSection; 