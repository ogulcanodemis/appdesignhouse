import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0.95, 0.97, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [50, 25, 0]);
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-secondary text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: ['-50%', '-45%', '-50%'],
            y: ['-50%', '-45%', '-50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: ['50%', '45%', '50%'],
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

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ scale }}
          >
            <span className="text-white">{t('about.title.part1')}</span>{' '}
            <span className="gradient-text bg-gradient-to-r from-accent to-light">{t('about.title.part2')}</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto relative"
          style={{ opacity, y }}
        >
          {/* Left Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-colors border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg leading-relaxed">
                {t('about.manifesto.part1')}
              </p>
            </motion.div>
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-colors border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg leading-relaxed">
                {t('about.manifesto.part2')}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-colors border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg leading-relaxed">
                {t('about.manifesto.part3')}
              </p>
            </motion.div>
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-colors border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg leading-relaxed">
                {t('about.manifesto.part4')}
              </p>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 