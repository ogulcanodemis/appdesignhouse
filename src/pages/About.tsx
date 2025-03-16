import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TeamSection from '../components/sections/TeamSection';

const values = [
  {
    id: 'innovation',
    icon: '💡',
    gradient: 'from-primary to-secondary',
  },
  {
    id: 'quality',
    icon: '⭐',
    gradient: 'from-secondary to-tertiary',
  },
  {
    id: 'collaboration',
    icon: '🤝',
    gradient: 'from-tertiary to-accent',
  },
  {
    id: 'sustainability',
    icon: '🌱',
    gradient: 'from-accent to-light',
  },
];

const About = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const { t } = useTranslation();

  const stats = [
    { number: t('stats.items.experience.number'), label: t('stats.items.experience.label') },
    { number: t('stats.items.projects.number'), label: t('stats.items.projects.label') },
    { number: t('stats.items.clients.number'), label: t('stats.items.clients.label') },
    { number: t('stats.items.support.number'), label: t('stats.items.support.label') },
  ];

  return (
    <>
      <Helmet>
        <title>Hakkımızda - App Design House</title>
        <meta
          name="description"
          content={t('aboutPage.hero.description')}
        />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center py-20 bg-gradient-primary overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Tech Stack Rings */}
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`ring-${index}`}
                className={`absolute rounded-full border-2 border-white/10`}
                style={{
                  width: 300 + index * 150,
                  height: 300 + index * 150,
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 20 + index * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 2,
                }}
              >
                <div className={`absolute w-4 h-4 bg-${index === 0 ? 'primary' : index === 1 ? 'accent' : 'light'}/50 rounded-full -top-2 -right-2 blur-sm`} />
              </motion.div>
            ))}

            {/* Floating Circles */}
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`circle-${index}`}
                className={`absolute rounded-full bg-gradient-to-br ${index === 0 ? 'from-primary/20' : index === 1 ? 'from-secondary/20' : 'from-accent/20'} to-transparent blur-3xl`}
                style={{
                  width: 300 + index * 100,
                  height: 300 + index * 100,
                  top: `${20 + index * 30}%`,
                  left: `${10 + index * 40}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10 + index * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 2,
                }}
              />
            ))}

            {/* Tech Icons Flow */}
            {['⚛️', '🔷', '🎨', '📱', '💻', '🚀'].map((icon, index) => (
              <motion.div
                key={`tech-${index}`}
                className="absolute text-2xl opacity-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.sin(index) * 50, 0],
                  rotate: [0, 360],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              >
                {icon}
              </motion.div>
            ))}

            {/* Code Rain Effect */}
            {Array.from({ length: 10 }).map((_, index) => (
              <motion.div
                key={`code-${index}`}
                className="absolute text-white/5 font-mono text-sm whitespace-nowrap"
                style={{
                  top: `-${Math.random() * 100}%`,
                  left: `${(index / 10) * 100}%`,
                }}
                animate={{
                  y: ['0%', '200%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              >
                {'{code}'}
              </motion.div>
            ))}

            {/* Connection Lines */}
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={`line-${index}`}
                className="absolute h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                style={{
                  width: 100 + Math.random() * 200,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.3,
                }}
              />
            ))}

            {/* Grid Pattern */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
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

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              style={{ opacity, scale, y }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white">{t('aboutPage.hero.title.part1')} </span>
                <span className="gradient-text bg-gradient-to-r from-accent to-light">
                  {t('aboutPage.hero.title.part2')}
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-white/90 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('aboutPage.hero.description')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Floating Shapes */}
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`shape-${index}`}
              className="absolute"
              style={{
                width: 60 + index * 20,
                height: 60 + index * 20,
                border: '2px solid rgba(247, 37, 133, 0.1)',
                borderRadius: index % 2 === 0 ? '30%' : '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 15 + index * 2,
                repeat: Infinity,
                ease: "linear",
                delay: index * 1,
              }}
            />
          ))}

          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                <span className="gradient-text bg-gradient-to-r from-primary to-accent">
                  {t('aboutPage.manifesto.title')}
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {(t('aboutPage.manifesto.items', { returnObjects: true }) as string[]).map((text: string, index: number) => (
                  <motion.div
                    key={index}
                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-lg text-gray-700">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-secondary relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Floating Numbers */}
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={`number-${index}`}
                className="absolute text-white/10 text-4xl font-bold"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [20, -20],
                  x: [-10, 10],
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              >
                {Math.floor(Math.random() * 100)}
              </motion.div>
            ))}

            {/* Connection Lines */}
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`line-${index}`}
                className="absolute h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                style={{
                  width: 100 + Math.random() * 200,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.3,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + index * 0.1
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-lg text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Icons */}
            {['💡', '⭐', '🤝', '🌱'].map((icon, index) => (
              <motion.div
                key={`icon-${index}`}
                className="absolute text-4xl opacity-10"
                style={{
                  top: `${20 + index * 20}%`,
                  left: `${20 + index * 20}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 30, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10 + index * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 1,
                }}
              >
                {icon}
              </motion.div>
            ))}

            {/* Gradient Orbs */}
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`orb-${index}`}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 200,
                  height: 200,
                  background: `linear-gradient(45deg, var(--color-${index === 0 ? 'primary' : index === 1 ? 'secondary' : index === 2 ? 'tertiary' : 'accent'}/10), transparent)`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8 + index * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 1,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="gradient-text bg-gradient-to-r from-primary to-accent">
                {t('aboutPage.values.title')}
              </span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <motion.div
                  key={value.id}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-lg"
                    style={{
                      backgroundImage: `linear-gradient(45deg, var(--color-${value.gradient}))`
                    }}
                  />
                  <div className="relative bg-white rounded-2xl p-8 h-full border border-gray-100 group-hover:border-gray-200 transition-all duration-300 backdrop-blur-sm">
                    <motion.div 
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.2 }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {t(`aboutPage.values.items.${value.id}.title`)}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {t(`aboutPage.values.items.${value.id}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ekibimiz Bölümü - Yeni TeamSection bileşeni */}
        <TeamSection />
      </div>
    </>
  );
};

export default About; 