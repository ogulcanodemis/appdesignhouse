import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const services = [
  {
    id: 'software',
    icon: '💻',
    color: 'primary',
    gradient: 'from-primary/20 to-accent/20',
  },
  {
    id: 'agency',
    icon: '🎨',
    color: 'secondary',
    gradient: 'from-secondary/20 to-tertiary/20',
  },
  {
    id: 'consulting',
    icon: '📊',
    color: 'tertiary',
    gradient: 'from-tertiary/20 to-accent/20',
  },
];

const ServicesSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.4], [0.8, 0.8, 1]);
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-20 bg-gradient-secondary relative overflow-hidden" id="services">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 50,
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">{t('services.title.part1')}</span>{' '}
            <span className="gradient-text bg-gradient-to-r from-accent to-light">{t('services.title.part2')}</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <motion.div
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/10 hover:border-white/20 transition-colors"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                     style={{
                       backgroundImage: `linear-gradient(45deg, var(--color-${service.color}), var(--color-accent))`
                     }} 
                />
                <motion.div 
                  className={`text-4xl mb-4 transition-transform duration-300`}
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 relative">
                  {t(`services.categories.${service.id}.title`)}
                </h3>
                <p className="text-white/80 mb-6 relative">
                  {t(`services.categories.${service.id}.description`)}
                </p>
                <Link
                  to={`/services#${service.id}`}
                  className="inline-flex items-center text-white hover:text-accent transition-colors relative group"
                >
                  <span className="relative">
                    {t('services.cta')}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection; 