import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WhatsAppContact from '../components/contact/WhatsAppContact';
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
  const [lastSubmitTime] = useState<number>(0);
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

      console.log('Form verileri:', data);
      
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
        ? 'http://localhost:8000/api/test-form'
        : '/api/test-form';

      console.log('Sending form to:', API_URL);
      
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: formData
        });

        console.log('Response status:', response.status);
        
        // Yanıt kontrolü
        if (!response.ok) {
          toast.error('Sunucu yanıtı alınamadı');
          setIsSubmitting(false);
          return;
        }

        const result = await response.json();
        console.log('Form submission result:', result);
        
        toast.success('Form başarıyla gönderildi (Test)');
        reset(); // Formu sıfırla
        
        // Dosya input'unu temizle
        if (fileInput) {
          fileInput.value = '';
        }
      } catch (error) {
        console.error('Form submission exception:', error);
        toast.error('Form gönderilirken bir hata oluştu');
      } finally {
        setIsSubmitting(false);
      }
      
      /* Gerçek form gönderimi şimdilik devre dışı
      // ... existing code ...
      */
    } catch (error) {
      console.error('Form Error:', error);
      toast.error(error instanceof Error ? error.message : t('contactPage.notifications.error'), {
        duration: 5000,
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌'
      });
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
      link: 'tel:+905436461502',
    },
    {
      icon: '✉️',
      title: t('contactPage.info.email.title'),
      content: t('contactPage.info.email.content'),
      link: 'mailto:info@appdesignhouse.com',
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: '𝕀', name: t('contactPage.social.instagram'), url: 'https://www.instagram.com/appdesignhouse/?igsh=OGZpNHAzNTM2Y3Jm&utm_source=qr' },
  ];

  // Schema.org yapılandırılmış veri
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('contactPage.meta.title'),
    "description": t('contactPage.meta.description'),
    "url": "https://appdesignhouse.com/contact",
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
        <meta name="keywords" content="iletişim, yazılım hizmetleri, ajans hizmetleri, danışmanlık, App Design House, İstanbul" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="İletişim - App Design House" />
        <meta property="og:description" content="App Design House ile iletişime geçin. Yazılım, ajans ve danışmanlık hizmetleri için form doldurun veya direkt bize ulaşın." />
        <meta property="og:image" content="/images/contact-og.jpg" />
        <meta property="og:url" content="https://appdesignhouse.com/contact" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="İletişim - App Design House" />
        <meta name="twitter:description" content="App Design House ile iletişime geçin. Yazılım, ajans ve danışmanlık hizmetleri için form doldurun veya direkt bize ulaşın." />
        <meta name="twitter:image" content="/images/contact-og.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://appdesignhouse.com/contact" />

        {/* Alternatif Diller */}
        <link rel="alternate" href="https://appdesignhouse.com/en/contact" hrefLang="en" />
        <link rel="alternate" href="https://appdesignhouse.com/contact" hrefLang="tr" />
        <link rel="alternate" href="https://appdesignhouse.com/contact" hrefLang="x-default" />

        {/* Schema.org yapılandırılmış veri */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>

        {/* Ek Meta Etiketleri */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="App Design House" />
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
              {/* WhatsApp Contact */}
              <WhatsAppContact />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact; 