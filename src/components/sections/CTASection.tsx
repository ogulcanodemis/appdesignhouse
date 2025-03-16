import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPriceQuoteConversion } from '../common/GoogleAnalytics';

const communicationIcons = [
  "📱", "💬", "📧", "🤝", "📞", "🌐", "💡", "🚀"
];

const CTASection = () => {
  const { t } = useTranslation();

  // Danışmanlık butonuna tıklandığında dönüşüm izleme
  const handleConsultationClick = () => {
    return trackPriceQuoteConversion('/contact');
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-accent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`circle-${index}`}
            className="absolute rounded-full bg-white/10"
            style={{
              width: 20 + Math.random() * 60,
              height: 20 + Math.random() * 60,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(index) * 50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          />
        ))}
        
        {/* Light Beams */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`beam-${index}`}
            className="absolute bg-white/5 blur-3xl"
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              top: `${30 + index * 20}%`,
              left: `${20 + index * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: index * 2,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span>{t('cta.title.part1')}</span>{' '}
            <span className="text-white">{t('cta.title.part2')}</span>{' '}
            <span>{t('cta.title.part3')}</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/90 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('cta.description')}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={handleConsultationClick}
              className="px-8 py-4 bg-white text-accent font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('cta.buttons.contact')}
            </motion.button>
            
            <motion.a
              href={`tel:${t('cta.buttons.phone.text').replace(/\s+/g, '')}`}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{t('cta.buttons.phone.icon')}</span>
              {t('cta.buttons.phone.text')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 