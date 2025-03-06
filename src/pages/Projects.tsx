import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const projects = [
  {
    id: 'petSocial',
    gradient: 'from-primary to-accent',
    image: '/images/projects/pet-social.jpg',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AI/ML'],
    startDate: '2024-01',
    category: 'mobile',
    screenshots: [
      {
        thumbnail: 'https://placehold.co/600x400/F72585/FFFFFF/webp?text=Pet+Social+Feed',
        fullsize: 'https://placehold.co/1200x800/F72585/FFFFFF/webp?text=Pet+Social+Feed',
        key: 'feed'
      },
      {
        thumbnail: 'https://placehold.co/600x400/560BAD/FFFFFF/webp?text=Pet+Profile',
        fullsize: 'https://placehold.co/1200x800/560BAD/FFFFFF/webp?text=Pet+Profile',
        key: 'profile'
      },
      {
        thumbnail: 'https://placehold.co/600x400/4361EE/FFFFFF/webp?text=Pet+Market',
        fullsize: 'https://placehold.co/1200x800/4361EE/FFFFFF/webp?text=Pet+Market',
        key: 'market'
      }
    ],
    features: ['socialNetwork', 'marketplace', 'vetTracking', 'aiMatching']
  },
  {
    id: 'optiFusion',
    gradient: 'from-secondary to-tertiary',
    image: '/images/projects/optifusion.jpg',
    technologies: ['React', 'Python', 'TensorFlow', 'AWS'],
    startDate: '2023-09',
    category: 'web',
    screenshots: [
      {
        thumbnail: 'https://placehold.co/600x400/3A0CA3/FFFFFF/webp?text=Analytics+Dashboard',
        fullsize: 'https://placehold.co/1200x800/3A0CA3/FFFFFF/webp?text=Analytics+Dashboard',
        key: 'dashboard'
      },
      {
        thumbnail: 'https://placehold.co/600x400/4CC9F0/FFFFFF/webp?text=Campaign+Manager',
        fullsize: 'https://placehold.co/1200x800/4CC9F0/FFFFFF/webp?text=Campaign+Manager',
        key: 'campaign'
      },
      {
        thumbnail: 'https://placehold.co/600x400/F72585/FFFFFF/webp?text=Reports',
        fullsize: 'https://placehold.co/1200x800/F72585/FFFFFF/webp?text=Reports',
        key: 'reports'
      }
    ],
    features: ['adIntegration', 'crmIntegration', 'aiOptimization', 'analytics']
  },
  {
    id: 'penGuard',
    gradient: 'from-tertiary to-light',
    image: '/images/projects/penguard.jpg',
    technologies: ['Java', 'Spring Boot', 'Spring Cloud', 'PostgreSQL', 'Docker', 'Kafka'],
    startDate: '2024-02',
    category: 'web',
    screenshots: [
      {
        thumbnail: 'https://placehold.co/600x400/3A0CA3/FFFFFF/webp?text=Security+Dashboard',
        fullsize: 'https://placehold.co/1200x800/3A0CA3/FFFFFF/webp?text=Security+Dashboard',
        key: 'dashboard'
      },
      {
        thumbnail: 'https://placehold.co/600x400/4361EE/FFFFFF/webp?text=Scan+Results',
        fullsize: 'https://placehold.co/1200x800/4361EE/FFFFFF/webp?text=Scan+Results',
        key: 'scanResults'
      },
      {
        thumbnail: 'https://placehold.co/600x400/4CC9F0/FFFFFF/webp?text=Metrics',
        fullsize: 'https://placehold.co/1200x800/4CC9F0/FFFFFF/webp?text=Metrics',
        key: 'metrics'
      }
    ],
    features: ['securityScans', 'detailedReporting', 'microservices', 'monitoring']
  }
];

const Projects = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<{
    projectId: string;
    index: number;
  } | null>(null);

  const handleScreenshotClick = (projectId: string, index: number) => {
    setSelectedImage({ projectId, index });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Schema.org yapılandırılmış veri
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projects.map((project, index) => ({
      "@type": "SoftwareApplication",
      "position": index + 1,
      "name": t(`projectsPage.projects.${project.id}.title`),
      "description": t(`projectsPage.projects.${project.id}.longDescription`),
      "applicationCategory": t(`projectsPage.projects.${project.id}.category`),
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "availability": t(`projectsPage.projects.${project.id}.status`) === 'Aktif' ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
      },
      "datePublished": project.startDate,
      "technology": project.technologies
    }))
  };

  return (
    <>
      <Helmet>
        <title>{t('projectsPage.meta.title')}</title>
        <meta
          name="description"
          content={t('projectsPage.meta.description')}
        />
        <meta name="keywords" content="yazılım projeleri, mobil uygulama, web uygulaması, yapay zeka, dijital pazarlama, pet social, optifusion" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Yenilikçi Yazılım Projeleri | AppHouse Design" />
        <meta property="og:description" content="Modern teknolojilerle geliştirilen yenilikçi yazılım projeleri. Mobil uygulamalar, web platformları ve yapay zeka çözümleri." />
        <meta property="og:image" content="/images/projects-og.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yenilikçi Yazılım Projeleri | AppHouse Design" />
        <meta name="twitter:description" content="Modern teknolojilerle geliştirilen yenilikçi yazılım projeleri. Mobil uygulamalar, web platformları ve yapay zeka çözümleri." />
        <meta name="twitter:image" content="/images/projects-og.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://apphousedesign.com/projects" />

        {/* Schema.org yapılandırılmış veri */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center py-20 bg-gradient-primary overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Project Icons Flow */}
            {['💻', '📱', '🎨', '🔒', '📊', '🛠️', '🚀', '⚡'].map((icon, index) => (
              <motion.div
                key={`icon-${index}`}
                className="absolute text-4xl opacity-10"
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
                {icon}
              </motion.div>
            ))}

            {/* Code Snippets */}
            {[
              '<App />', 
              'function Project()', 
              'npm install', 
              'git commit',
              'docker build',
              'const api = new API()',
              'interface Props {',
              'export default'
            ].map((code, index) => (
              <motion.div
                key={`code-${index}`}
                className="absolute text-white/5 font-mono text-sm whitespace-nowrap"
                style={{
                  top: `-${Math.random() * 100}%`,
                  left: `${(index / 8) * 100}%`,
                }}
                animate={{
                  y: ['0%', '200%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              >
                {code}
              </motion.div>
            ))}

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

            {/* Project Cards Flow */}
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`card-${index}`}
                className="absolute bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                style={{
                  width: 120 + Math.random() * 60,
                  height: 80 + Math.random() * 40,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [20, -20],
                  x: [-10, 10],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              >
                <div className="h-2 w-1/2 bg-white/20 rounded-full m-2" />
                <div className="h-2 w-3/4 bg-white/10 rounded-full m-2" />
              </motion.div>
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
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white">{t('projectsPage.hero.title.part1')}</span>{' '}
                <span className="gradient-text bg-gradient-to-r from-accent to-light">
                  {t('projectsPage.hero.title.part2')}
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-white/90 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('projectsPage.hero.description')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 bg-white" role="main" aria-label="Proje Listesi">
          <div className="container mx-auto px-4">
            <div className="space-y-32">
              {projects.map((project, projectIndex) => (
                <motion.article
                  key={project.id}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: projectIndex * 0.2 }}
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                >
                  <meta itemProp="name" content={t(`projectsPage.projects.${project.id}.title`)} />
                  <meta itemProp="description" content={t(`projectsPage.projects.${project.id}.description`)} />
                  <meta itemProp="applicationCategory" content={t(`projectsPage.projects.${project.id}.category`)} />
                  <meta itemProp="operatingSystem" content="All" />
                  
                  {/* Project Background */}
                  <div className="absolute inset-0 bg-gradient-to-r opacity-5 rounded-3xl blur-3xl"
                    style={{
                      backgroundImage: `linear-gradient(45deg, var(--color-${project.gradient}))`
                    }}
                  />

                  <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* Project Info */}
                      <div>
                        <motion.div
                          className="mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className={`gradient-text bg-gradient-to-r ${project.gradient}`} itemProp="name">
                              {t(`projectsPage.projects.${project.id}.title`)}
                            </span>
                          </h2>
                          <h3 className="text-xl text-gray-700 mb-4">
                            {t(`projectsPage.projects.${project.id}.subtitle`)}
                          </h3>
                          <p className="text-gray-600" itemProp="description">
                            {t(`projectsPage.projects.${project.id}.description`)}
                          </p>
                          
                          {/* Teknolojiler */}
                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                                itemProp="technology"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>

                        {/* Project Status */}
                        <motion.div
                          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary mb-8"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                          <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                            <meta itemProp="availability" content={t(`projectsPage.projects.${project.id}.status`) === 'Aktif' ? "https://schema.org/InStock" : "https://schema.org/PreOrder"} />
                            {t(`projectsPage.projects.${project.id}.status`)}
                          </span>
                        </motion.div>

                        {/* Ekran Görüntüleri */}
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          <h4 className="text-lg font-semibold gradient-text bg-gradient-to-r from-primary to-accent">
                            {t('projectsPage.common.screenshotsTitle')}
                          </h4>
                          
                          <div className="grid grid-cols-3 gap-3">
                            {project.screenshots?.map((screenshot, index) => (
                              <motion.div
                                key={index}
                                className="relative group cursor-pointer overflow-hidden rounded-lg"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleScreenshotClick(project.id, index)}
                              >
                                {/* Görsel */}
                                <img
                                  src={screenshot.thumbnail}
                                  alt={`${t(`projectsPage.projects.${project.id}.title`)} ${t(`projectsPage.projects.${project.id}.screenshots.${screenshot.key}`)}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                  loading="lazy"
                                />
                                
                                {/* Hover Overlay */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2"
                                >
                                  <p className="text-white text-xs font-medium">
                                    {t(`projectsPage.projects.${project.id}.screenshots.${screenshot.key}`)}
                                  </p>
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Project Features */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        {project.features.map((featureKey, index) => (
                          <motion.div
                            key={index}
                            className="relative group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
                              style={{
                                backgroundImage: `linear-gradient(45deg, var(--color-${project.gradient}))`
                              }}
                            />
                            <motion.div
                              className="relative bg-gray-50 rounded-xl p-6 border border-gray-100 group-hover:border-gray-200 transition-all duration-300"
                              whileHover={{ y: -5 }}
                            >
                              <motion.div 
                                className="text-3xl mb-4"
                                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.3 }}
                                aria-hidden="true"
                              >
                                {t(`projectsPage.projects.${project.id}.features.${featureKey}.icon`)}
                              </motion.div>
                              <h4 className="text-lg font-semibold mb-2">
                                {t(`projectsPage.projects.${project.id}.features.${featureKey}.title`)}
                              </h4>
                              <p className="text-gray-600">
                                {t(`projectsPage.projects.${project.id}.features.${featureKey}.description`)}
                              </p>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
                onClick={handleCloseModal}
              >
                <span className="sr-only">Kapat</span>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <img
                src={projects.find(p => p.id === selectedImage.projectId)?.screenshots[selectedImage.index].fullsize}
                alt={`${t(`projectsPage.projects.${selectedImage.projectId}.title`)} ${t(`projectsPage.projects.${selectedImage.projectId}.screenshots.${projects.find(p => p.id === selectedImage.projectId)?.screenshots[selectedImage.index].key}`)}`}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects; 