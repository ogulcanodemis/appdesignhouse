import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const codeSnippets = [
  "<div className='app'>",
  "function App() {",
  "const data = analyze();",
  "return <Component />;",
  "npm install deps",
  "git commit -m 'feat:'",
  "docker-compose up",
  "const api = axios.create();",
];

const HeroSection = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.8]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-primary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Code Rain Effect */}
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={`code-${index}`}
            className="absolute text-white/10 font-mono text-sm whitespace-nowrap"
            style={{
              top: `-${Math.random() * 100}%`,
              left: `${(index / 15) * 100}%`,
              textShadow: '0 0 10px rgba(255,255,255,0.3)',
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
            {codeSnippets[index % codeSnippets.length]}
          </motion.div>
        ))}

        {/* Analysis Grid */}
        <div className="absolute inset-0" style={{ perspective: '1000px' }}>
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 5, 0],
              rotateY: [-5, 5, -5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Floating UI Elements */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`ui-${index}`}
            className="absolute bg-white/5 backdrop-blur-lg rounded-lg border border-white/10"
            style={{
              width: 100 + Math.random() * 100,
              height: 60 + Math.random() * 40,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex: Math.floor(Math.random() * 3),
            }}
            animate={{
              y: [20, -20, 20],
              x: [-10, 10, -10],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          >
            <div className="h-2 w-1/2 bg-white/20 rounded-full m-2" />
            <div className="h-2 w-3/4 bg-white/10 rounded-full m-2" />
          </motion.div>
        ))}

        {/* Depth Layers */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={`layer-${index}`}
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at ${50 + Math.random() * 20}% ${50 + Math.random() * 20}%, 
                  rgba(${index === 0 ? '247,37,133' : index === 1 ? '67,11,173' : '67,97,238'}, 0.15) 0%,
                  transparent 50%)`,
                transform: `translateZ(${index * 10}px)`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "linear",
                delay: index * 2,
              }}
            />
          ))}
        </div>

        {/* Connection Lines */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`line-${index}`}
            className="absolute h-px w-32 bg-gradient-to-r from-primary/20 via-accent/20 to-transparent"
            style={{
              top: `${20 + (index * 15)}%`,
              left: `${Math.random() * 100}%`,
              rotate: `${-30 + Math.random() * 60}deg`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
              x: [-100, 100],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 1,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 py-20 lg:py-32 relative z-10"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ scale }}
            >
              <span className="text-white">{t('hero.title.part1')}</span><br />
              <span className="gradient-text bg-gradient-to-r from-accent to-light">{t('hero.title.part2')}</span>
            </motion.h1>
            <p className="text-lg text-white/90 mb-8 max-w-lg backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="btn gradient-border bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-4 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{t('hero.buttons.start')}</span>
              </Link>
              <Link
                to="/services"
                className="btn bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-4 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-accent to-light opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{t('hero.buttons.services')}</span>
              </Link>
            </div>
          </motion.div>

          {/* Animated Tech Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ scale }}
          >
            <div className="aspect-square relative">
              {/* Tech Stack Rings */}
              {Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={`ring-${index}`}
                  className={`absolute inset-${index * 8} rounded-full border-2 border-white/10 backdrop-blur-lg`}
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

              {/* Central Tech Hub */}
              <motion.div
                className="absolute inset-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-white/20"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <motion.div
                  className="absolute inset-4 rounded-full bg-gradient-to-tr from-secondary/30 to-light/30 border border-white/10"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 