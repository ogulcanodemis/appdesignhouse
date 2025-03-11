import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const communicationIcons = [
  "📱", "💬", "📧", "🤝", "📞", "🌐", "💡", "🚀"
];

const CTASection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.6, 0.8], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0.6, 0.8], [100, 0]);
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-accent relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Communication Icons Flow */}
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={`icon-${index}`}
            className="absolute text-2xl opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(index) * 50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          >
            {communicationIcons[index % communicationIcons.length]}
          </motion.div>
        ))}

        {/* Interactive Connection Lines */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`connection-${index}`}
            className="absolute h-px"
            style={{
              width: 100 + Math.random() * 200,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `linear-gradient(90deg, 
                transparent,
                rgba(255,255,255,${0.1 + Math.random() * 0.2}),
                transparent
              )`,
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.3,
            }}
          />
        ))}

        {/* Pulsing Circles */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`pulse-${index}`}
            className="absolute rounded-full"
            style={{
              width: 100 + index * 50,
              height: 100 + index * 50,
              border: '1px solid rgba(255,255,255,0.1)',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Dynamic Grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 95%, rgba(255,255,255,0.05) 95%),
              linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.05) 95%)
            `,
            backgroundSize: '30px 30px',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(index) * 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.1,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, scale, y }}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white">{t('cta.title.part1')} </span>
            <span className="gradient-text bg-gradient-to-r from-primary to-secondary">
              {t('cta.title.part2')}
            </span>{' '}
            <span className="text-white">{t('cta.title.part3')}</span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-white/90 mb-8 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('cta.description')}
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="relative group overflow-hidden rounded-xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="btn bg-white text-accent hover:text-white relative z-10 group-hover:bg-transparent transition-colors duration-300 text-lg px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('cta.buttons.contact')}
              </motion.div>
            </Link>

            <motion.a
              href="tel:+901234567890"
              className="btn bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-4 relative overflow-hidden group rounded-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="relative z-10 flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">{t('cta.buttons.phone.icon')}</span>
                <span>{t('cta.buttons.phone.text')}</span>
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleX: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </section>
  );
};

export default CTASection; 