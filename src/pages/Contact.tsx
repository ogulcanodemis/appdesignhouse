import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  file?: File;
}

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link: string;
}

interface SocialLink {
  icon: string;
  name: string;
  url: string;
}

const Contact = () => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(yup.object().shape({
      name: yup.string()
        .required(t('contactPage.hero.form.name.error.required'))
        .min(2, t('contactPage.hero.form.name.error.min'))
        .max(50, t('contactPage.hero.form.name.error.max'))
        .matches(
          /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]*$/,
          t('contactPage.hero.form.name.error.invalid')
        ),
      email: yup.string()
        .required(t('contactPage.hero.form.email.error.required'))
        .email(t('contactPage.hero.form.email.error.invalid'))
        .max(100, t('contactPage.hero.form.email.error.max'))
        .matches(
          /^[^<>()[\]\\,;:\/{}|]*$/,
          t('contactPage.hero.form.email.error.invalid')
        ),
      phone: yup.string()
        .matches(/^[0-9]+$/, t('contactPage.hero.form.phone.error.invalid'))
        .min(10, t('contactPage.hero.form.phone.error.min'))
        .max(11, t('contactPage.hero.form.phone.error.max'))
        .optional(),
      subject: yup.string()
        .required(t('contactPage.hero.form.subject.error.required'))
        .min(2, t('contactPage.hero.form.subject.error.min'))
        .max(100, t('contactPage.hero.form.subject.error.max'))
        .matches(
          /^[^<>()[\]\\,;:\/{}|]*$/,
          t('contactPage.hero.form.subject.error.invalid')
        ),
      message: yup.string()
        .required(t('contactPage.hero.form.message.error.required'))
        .min(10, t('contactPage.hero.form.message.error.min'))
        .max(1000, t('contactPage.hero.form.message.error.max'))
        .matches(
          /^[^<>()[\]\\,;:\/{}|]*$/,
          t('contactPage.hero.form.message.error.invalid')
        ),
    }))
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Rate limiting check
      const now = Date.now();
      if (now - lastSubmitTime < 30000) {
        toast.error(t('contactPage.notifications.rateLimit'), {
          duration: 5000,
          style: {
            background: '#F59E0B',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '⚠️'
        });
        return;
      }

      // FormData oluştur
      const formData = new FormData();
      formData.append('name', data.name.trim());
      formData.append('email', data.email.trim().toLowerCase());
      if (data.phone) {
        formData.append('phone', data.phone.replace(/\D/g, ''));
      }
      formData.append('subject', data.subject.trim());
      formData.append('message', data.message.trim());
      
      // Dosya kontrolü ve ekleme
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        formData.append('file', fileInput.files[0]);
      }

      const API_URL = import.meta.env.MODE === 'development' 
        ? 'http://localhost:8000/handlers/contact.php'
        : '/api/handlers/contact.php';

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setLastSubmitTime(now);
        toast.success(t('contactPage.notifications.success'), {
          duration: 5000,
          style: {
            background: '#10B981',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '✅'
        });
        reset();
        setSelectedFileName('');
        // Dosya input'unu temizle
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        throw new Error(result.error || t('contactPage.notifications.error'));
      }
    } catch (error) {
      console.error('Form Error:', error);
      toast.error(t('contactPage.notifications.error'), {
        duration: 5000,
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Dosya türü kontrolü
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        toast.error(t('contactPage.hero.form.file.error.type'));
        event.target.value = '';
        setSelectedFileName('');
        return;
      }
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('contactPage.hero.form.file.error.size'));
        event.target.value = '';
        setSelectedFileName('');
        return;
      }
      setIsUploading(true);
      setSelectedFileName(file.name);
      // Simüle edilmiş yükleme gecikmesi
      setTimeout(() => {
        setIsUploading(false);
      }, 1500);
    } else {
      setSelectedFileName('');
      setIsUploading(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: '📍',
      title: t('contactPage.info.address.title'),
      content: t('contactPage.info.address.content'),
      link: 'https://goo.gl/maps/123',
    },
    {
      icon: '📞',
      title: t('contactPage.info.phone.title'),
      content: t('contactPage.info.phone.content'),
      link: 'tel:+901234567890',
    },
    {
      icon: '✉️',
      title: t('contactPage.info.email.title'),
      content: t('contactPage.info.email.content'),
      link: 'mailto:info@apphousedesign.com',
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: '𝕏', name: t('contactPage.social.twitter'), url: 'https://twitter.com' },
    { icon: '𝕃', name: t('contactPage.social.linkedin'), url: 'https://linkedin.com' },
    { icon: '𝕀', name: t('contactPage.social.instagram'), url: 'https://instagram.com' },
    { icon: '𝔾', name: t('contactPage.social.github'), url: 'https://github.com' },
  ];

  // Schema.org yapılandırılmış veri
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('contactPage.meta.title'),
    "description": t('contactPage.meta.description'),
    "url": "https://apphousedesign.com/contact",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": t('contactPage.info.phone.content'),
      "email": t('contactPage.info.email.content'),
      "areaServed": t('contactPage.info.address.content'),
      "availableLanguage": ["Turkish", "English"],
      "contactType": "customer service"
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Helmet>
        <title>{t('contactPage.meta.title')}</title>
        <meta
          name="description"
          content={t('contactPage.meta.description')}
        />
        <meta name="keywords" content="iletişim, yazılım hizmetleri, ajans hizmetleri, danışmanlık, AppHouse Design, İstanbul" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="İletişim - AppHouse Design" />
        <meta property="og:description" content="AppHouse Design ile iletişime geçin. Yazılım, ajans ve danışmanlık hizmetleri için form doldurun veya direkt bize ulaşın." />
        <meta property="og:image" content="/images/contact-og.jpg" />
        <meta property="og:url" content="https://apphousedesign.com/contact" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="İletişim - AppHouse Design" />
        <meta name="twitter:description" content="AppHouse Design ile iletişime geçin. Yazılım, ajans ve danışmanlık hizmetleri için form doldurun veya direkt bize ulaşın." />
        <meta name="twitter:image" content="/images/contact-og.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://apphousedesign.com/contact" />

        {/* Alternatif Diller */}
        <link rel="alternate" href="https://apphousedesign.com/en/contact" hrefLang="en" />
        <link rel="alternate" href="https://apphousedesign.com/contact" hrefLang="tr" />
        <link rel="alternate" href="https://apphousedesign.com/contact" hrefLang="x-default" />

        {/* Schema.org yapılandırılmış veri */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>

        {/* Ek Meta Etiketleri */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AppHouse Design" />
        <meta name="geo.region" content="TR-34" />
        <meta name="geo.placename" content="İstanbul" />
        <meta name="geo.position" content="41.0082;28.9784" />
        <meta name="ICBM" content="41.0082, 28.9784" />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center bg-gradient-primary overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Gradient Orbs */}
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={`orb-${index}`}
                className="absolute rounded-full blur-3xl"
                style={{
                  width: 300 + index * 100,
                  height: 300 + index * 100,
                  background: `radial-gradient(circle, ${
                    index === 0 ? 'rgba(247,37,133,0.2)' :
                    index === 1 ? 'rgba(67,97,238,0.2)' :
                    'rgba(76,201,240,0.2)'
                  }, transparent)`,
                  top: `${20 + index * 30}%`,
                  left: `${20 + index * 20}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 10 + index * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Animated Lines */}
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`line-${index}`}
                className="absolute h-px"
                style={{
                  width: 200 + Math.random() * 200,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>

          <motion.div 
            className="container mx-auto px-4 relative z-10 text-center"
            style={{ opacity, y }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span>{t('contactPage.hero.title.part1')}</span>{' '}
              <span className="gradient-text bg-gradient-to-r from-accent to-light">
                {t('contactPage.hero.title.part2')}
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('contactPage.hero.description')}
            </motion.p>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="prose prose-lg">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {t('contactPage.info.title')}
                  </h2>
                  <p className="text-gray-600">
                    {t('contactPage.info.description')}
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{info.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h3>
                          <p className="text-gray-600 group-hover:text-primary transition-colors">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('contactPage.social.title')}
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contactPage.hero.form.name.label')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('contactPage.hero.form.name.placeholder')}
                        {...register('name')}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-primary/50 outline-none transition-shadow`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {t(`contactPage.hero.form.name.error.${errors.name.type}`)}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contactPage.hero.form.email.label')}
                      </label>
                      <input
                        type="email"
                        placeholder={t('contactPage.hero.form.email.placeholder')}
                        {...register('email')}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-primary/50 outline-none transition-shadow`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {t(`contactPage.hero.form.email.error.${errors.email.type}`)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.hero.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      placeholder={t('contactPage.hero.form.phone.placeholder')}
                      {...register('phone')}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary/50 outline-none transition-shadow`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {t(`contactPage.hero.form.phone.error.${errors.phone.type}`)}
                      </p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.hero.form.subject.label')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('contactPage.hero.form.subject.placeholder')}
                      {...register('subject')}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary/50 outline-none transition-shadow`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        {t(`contactPage.hero.form.subject.error.${errors.subject.type}`)}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.hero.form.message.label')}
                    </label>
                    <textarea
                      placeholder={t('contactPage.hero.form.message.placeholder')}
                      {...register('message')}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary/50 outline-none transition-shadow`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {t(`contactPage.hero.form.message.error.${errors.message.type}`)}
                      </p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.hero.form.file.label')}
                    </label>
                    <div className="relative">
                      <label
                        className={`flex items-center justify-center w-full px-4 py-3 border border-gray-300 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
                          isUploading ? 'bg-primary/5 border-primary' : 'bg-gray-50 hover:bg-gray-100'
                        } group`}
                      >
                        <input
                          type="file"
                          name="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="flex items-center space-x-2 text-gray-600 group-hover:text-primary">
                          {isUploading ? (
                            <motion.div
                              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          )}
                          <span className="text-sm">
                            {isUploading ? t('contactPage.hero.form.file.uploading') : 
                             selectedFileName ? selectedFileName :
                             t('contactPage.hero.form.file.placeholder')}
                          </span>
                        </div>
                      </label>
                      {selectedFileName && !isUploading && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full"
                        >
                          {t('contactPage.hero.form.file.selected')}
                        </motion.div>
                      )}
                      {errors.file && (
                        <p className="mt-1 text-sm text-red-500">
                          {t(`contactPage.hero.form.file.error.${errors.file.type}`)}
                        </p>
                      )}
                      <motion.div 
                        className="mt-1 text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{t('contactPage.hero.form.file.allowedTypes')}</span>
                          <div className="flex items-center space-x-2">
                            {[
                              { type: 'PDF', color: 'red' },
                              { type: 'DOC', color: 'blue' },
                              { type: 'DOCX', color: 'blue' },
                              { type: 'TXT', color: 'gray' }
                            ].map((format, index) => (
                              <motion.span
                                key={format.type}
                                className={`font-medium text-${format.color}-600 bg-${format.color}-50 px-2 py-0.5 rounded-full text-xs`}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                {format.type}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⚡</span>
                        {t('contactPage.hero.form.submit.sending')}
                      </>
                    ) : (
                      t('contactPage.hero.form.submit.label')
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact; 