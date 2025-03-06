import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const location = useLocation();
  const { t } = useTranslation();
  // Scroll progress'e bağlı opacity ve y transform'u kaldırıyoruz
  // const { scrollYProgress } = useScroll();
  // const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  // const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const serviceCategories = [
    {
      id: 'software',
      title: t('servicesPage.categories.software.title'),
      description: t('servicesPage.categories.software.description'),
      icon: '💻',
      gradient: 'from-primary to-accent',
      longDescription: t('servicesPage.categories.software.longDescription'),
      services: [
        {
          title: t('servicesPage.categories.software.services.web.title'),
          description: t('servicesPage.categories.software.services.web.description'),
          icon: '💻',
          features: [
            t('servicesPage.categories.software.services.web.features.spa'),
            t('servicesPage.categories.software.services.web.features.responsive'),
            t('servicesPage.categories.software.services.web.features.seo'),
            t('servicesPage.categories.software.services.web.features.performance')
          ],
          techStack: ['React', 'Vue.js', 'Angular', 'Node.js', 'TypeScript']
        },
        {
          title: t('servicesPage.categories.software.services.mobile.title'),
          description: t('servicesPage.categories.software.services.mobile.description'),
          icon: '📱',
          features: [
            t('servicesPage.categories.software.services.mobile.features.platforms'),
            t('servicesPage.categories.software.services.mobile.features.performance'),
            t('servicesPage.categories.software.services.mobile.features.offline'),
            t('servicesPage.categories.software.services.mobile.features.push')
          ],
          techStack: ['React Native', 'Flutter', 'Firebase', 'REST API']
        },
        {
          title: t('servicesPage.categories.software.services.ecommerce.title'),
          description: t('servicesPage.categories.software.services.ecommerce.description'),
          icon: '🛍️',
          features: [
            t('servicesPage.categories.software.services.ecommerce.features.payment'),
            t('servicesPage.categories.software.services.ecommerce.features.inventory'),
            t('servicesPage.categories.software.services.ecommerce.features.analytics'),
            t('servicesPage.categories.software.services.ecommerce.features.seo')
          ],
          techStack: ['WooCommerce', 'Shopify', 'Next.js', 'PostgreSQL']
        },
        {
          title: t('servicesPage.categories.software.services.api.title'),
          description: t('servicesPage.categories.software.services.api.description'),
          icon: '🔌',
          features: [
            t('servicesPage.categories.software.services.api.features.microservices'),
            t('servicesPage.categories.software.services.api.features.gateway'),
            t('servicesPage.categories.software.services.api.features.cache'),
            t('servicesPage.categories.software.services.api.features.docs')
          ],
          techStack: ['Node.js', 'GraphQL', 'MongoDB', 'Redis']
        },
      ],
    },
    {
      id: 'agency',
      title: t('servicesPage.categories.agency.title'),
      description: t('servicesPage.categories.agency.description'),
      icon: '🎨',
      gradient: 'from-secondary to-tertiary',
      longDescription: t('servicesPage.categories.agency.longDescription'),
      services: [
        {
          title: t('servicesPage.categories.agency.services.uiux.title'),
          description: t('servicesPage.categories.agency.services.uiux.description'),
          icon: '🎨',
          features: [
            t('servicesPage.categories.agency.services.uiux.features.wireframe'),
            t('servicesPage.categories.agency.services.uiux.features.prototype'),
            t('servicesPage.categories.agency.services.uiux.features.testing'),
            t('servicesPage.categories.agency.services.uiux.features.design')
          ],
          techStack: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
        },
        {
          title: t('servicesPage.categories.agency.services.digital.title'),
          description: t('servicesPage.categories.agency.services.digital.description'),
          icon: '📈',
          features: [
            t('servicesPage.categories.agency.services.digital.features.seo'),
            t('servicesPage.categories.agency.services.digital.features.social'),
            t('servicesPage.categories.agency.services.digital.features.content'),
            t('servicesPage.categories.agency.services.digital.features.analytics')
          ],
          techStack: ['Google Ads', 'Facebook Ads', 'SEMrush', 'Google Analytics']
        },
        {
          title: t('servicesPage.categories.agency.services.content.title'),
          description: t('servicesPage.categories.agency.services.content.description'),
          icon: '✍️',
          features: [
            t('servicesPage.categories.agency.services.content.features.blog'),
            t('servicesPage.categories.agency.services.content.features.social'),
            t('servicesPage.categories.agency.services.content.features.newsletter'),
            t('servicesPage.categories.agency.services.content.features.seo')
          ],
          techStack: ['WordPress', 'Mailchimp', 'Canva', 'Grammarly']
        },
        {
          title: t('servicesPage.categories.agency.services.brand.title'),
          description: t('servicesPage.categories.agency.services.brand.description'),
          icon: '🎯',
          features: [
            t('servicesPage.categories.agency.services.brand.features.logo'),
            t('servicesPage.categories.agency.services.brand.features.style'),
            t('servicesPage.categories.agency.services.brand.features.voice'),
            t('servicesPage.categories.agency.services.brand.features.identity')
          ],
          techStack: ['Adobe CC', 'Illustrator', 'Photoshop', 'InDesign']
        },
      ],
    },
    {
      id: 'consulting',
      title: t('servicesPage.categories.consulting.title'),
      description: t('servicesPage.categories.consulting.description'),
      icon: '📊',
      gradient: 'from-accent to-light',
      longDescription: t('servicesPage.categories.consulting.longDescription'),
      services: [
        {
          title: t('servicesPage.categories.consulting.services.digital.title'),
          description: t('servicesPage.categories.consulting.services.digital.description'),
          icon: '🔄',
          features: [
            t('servicesPage.categories.consulting.services.digital.features.analysis'),
            t('servicesPage.categories.consulting.services.digital.features.tech'),
            t('servicesPage.categories.consulting.services.digital.features.change'),
            t('servicesPage.categories.consulting.services.digital.features.kpi')
          ],
          techStack: ['TOGAF', 'ITIL', 'Six Sigma', 'Lean']
        },
        {
          title: t('servicesPage.categories.consulting.services.strategy.title'),
          description: t('servicesPage.categories.consulting.services.strategy.description'),
          icon: '📊',
          features: [
            t('servicesPage.categories.consulting.services.strategy.features.market'),
            t('servicesPage.categories.consulting.services.strategy.features.growth'),
            t('servicesPage.categories.consulting.services.strategy.features.competition'),
            t('servicesPage.categories.consulting.services.strategy.features.risk')
          ],
          techStack: ['SWOT', 'PESTLE', "Porter's Five Forces", 'BCG Matrix']
        },
        {
          title: t('servicesPage.categories.consulting.services.project.title'),
          description: t('servicesPage.categories.consulting.services.project.description'),
          icon: '📋',
          features: [
            t('servicesPage.categories.consulting.services.project.features.agile'),
            t('servicesPage.categories.consulting.services.project.features.risk'),
            t('servicesPage.categories.consulting.services.project.features.sprint'),
            t('servicesPage.categories.consulting.services.project.features.quality')
          ],
          techStack: ['Jira', 'Confluence', 'Trello', 'MS Project']
        },
        {
          title: t('servicesPage.categories.consulting.services.tech.title'),
          description: t('servicesPage.categories.consulting.services.tech.description'),
          icon: '💡',
          features: [
            t('servicesPage.categories.consulting.services.tech.features.stack'),
            t('servicesPage.categories.consulting.services.tech.features.security'),
            t('servicesPage.categories.consulting.services.tech.features.architecture'),
            t('servicesPage.categories.consulting.services.tech.features.scalability')
          ],
          techStack: ['AWS', 'Azure', 'Docker', 'Kubernetes']
        },
      ],
    },
  ];

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{t('servicesPage.meta.title')}</title>
        <meta
          name="description"
          content={t('servicesPage.meta.description')}
        />
        <style>
          {`
            .service-title {
              font-family: 'Sora', sans-serif;
              font-weight: 600;
            }
            .service-description {
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-weight: 400;
            }
          `}
        </style>
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center py-20 bg-gradient-primary overflow-hidden">
          <div className="absolute inset-0">
            {/* Geometric Shapes */}
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`shape-${index}`}
                className="absolute"
                style={{
                  width: 100 + index * 50,
                  height: 100 + index * 50,
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: index === 0 ? '20%' : index === 1 ? '30%' : '40%',
                  top: `${20 + index * 30}%`,
                  left: `${20 + index * 20}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20 + index * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}

            {/* Gradient Orbs */}
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`orb-${index}`}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 200 + index * 50,
                  height: 200 + index * 50,
                  background: `radial-gradient(circle, ${
                    index === 0 ? 'rgba(247,37,133,0.2)' :
                    index === 1 ? 'rgba(67,97,238,0.2)' :
                    index === 2 ? 'rgba(76,201,240,0.2)' :
                    'rgba(86,11,173,0.2)'
                  }, transparent)`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 30, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 8 + index * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Animated Lines */}
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={`line-${index}`}
                className="absolute h-px"
                style={{
                  width: 100 + Math.random() * 200,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.2,
                }}
              />
            ))}

            {/* Sparkling Dots */}
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={`sparkle-${index}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.1,
                }}
              />
            ))}

            {/* Existing Background Pattern */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 service-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white">{t('servicesPage.hero.title.part1')}</span>{' '}
                <span className="gradient-text bg-gradient-to-r from-accent to-light">
                  {t('servicesPage.hero.title.part2')}
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-white/90 service-description backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('servicesPage.hero.description')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services Categories */}
        {serviceCategories.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className={`py-20 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            } relative overflow-hidden`}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-${category.gradient.split('-')[1]}) 1px, transparent 1px)`,
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

            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-4xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl mb-4 inline-block">{category.icon}</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 service-title">
                  <span className={`gradient-text bg-gradient-to-r ${category.gradient}`}>
                    {category.title}
                  </span>
                </h2>
                <p className="text-xl text-gray-600 service-description mb-8">
                  {category.description}
                </p>
                <p className="text-gray-500 service-description backdrop-blur-sm bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                  {category.longDescription}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={service.title}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                  >
                    {/* Animated Gradient Border */}
                    <motion.div
                      className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-75 group-hover:opacity-100 blur-[2px] transition-opacity"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: '200% 200%',
                      }}
                    />
                    
                    <div className="relative bg-white rounded-2xl p-8 h-full">
                      <motion.div 
                        className="text-4xl mb-4"
                        whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center space-x-2 text-sm text-gray-600"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent"
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-600 border border-gray-100"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: techIndex * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Services; 