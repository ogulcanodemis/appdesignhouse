import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Adım bileşenleri
import ServiceCategoryStep from '../components/custom-package/ServiceCategoryStep';
import ServiceSelectionStep from '../components/custom-package/ServiceSelectionStep';
import DetailsStep from '../components/custom-package/DetailsStep';
import ContactInfoStep from '../components/custom-package/ContactInfoStep';
import SummaryStep from '../components/custom-package/SummaryStep';

// Form tipi
type PackageFormData = {
  serviceCategory: string;
  selectedServices: string[];
  budget: string;
  timeline: string;
  additionalInfo: string;
  name: string;
  email: string;
  phone: string;
};

const CustomPackage = () => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Validasyon şeması
  const schema = yup.object({
    serviceCategory: yup.string().required(t('custom_package.select_service_category')),
    selectedServices: yup.array().min(1, t('custom_package.select_at_least_one_service')),
    budget: yup.string().required(t('custom_package.select_budget')),
    timeline: yup.string().required(t('custom_package.select_timeline')),
    additionalInfo: yup.string(),
    name: yup.string().required(t('custom_package.name_required')),
    email: yup.string().email(t('custom_package.valid_email')).required(t('custom_package.email_required')),
    phone: yup.string().required(t('custom_package.phone_required')),
  });

  // Adım bazlı validasyon şemaları
  const stepSchemas = [
    // Adım 1: Kategori seçimi
    {
      fields: ['serviceCategory']
    },
    // Adım 2: Hizmet seçimi
    {
      fields: ['selectedServices']
    },
    // Adım 3: Detaylar
    {
      fields: ['budget', 'timeline', 'additionalInfo']
    },
    // Adım 4: İletişim bilgileri
    {
      fields: ['name', 'email', 'phone']
    },
    // Adım 5: Özet (validasyon yok)
    {
      fields: []
    },
  ];
  
  const methods = useForm<PackageFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      serviceCategory: '',
      selectedServices: [],
      budget: '',
      timeline: '',
      additionalInfo: '',
      name: '',
      email: '',
      phone: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch, trigger, formState: { errors } } = methods;
  
  // Seçilen kategori
  const serviceCategory = watch('serviceCategory');
  const selectedServices = watch('selectedServices');

  // Adımlar
  const steps = [
    { title: t('custom_package.steps.category'), component: <ServiceCategoryStep /> },
    { title: t('custom_package.steps.services'), component: <ServiceSelectionStep category={serviceCategory} /> },
    { title: t('custom_package.steps.details'), component: <DetailsStep /> },
    { title: t('custom_package.steps.contact'), component: <ContactInfoStep /> },
    { title: t('custom_package.steps.summary'), component: <SummaryStep /> },
  ];

  // İleri gitme fonksiyonu - adım validasyonu ile
  const goToNextStep = async () => {
    // Mevcut adımın validasyonunu yap
    const isValid = await trigger(stepSchemas[currentStep].fields as any);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  // Geri gitme fonksiyonu
  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Kategori ve hizmet isimlerini çevir
  const getCategoryName = (categoryId: string) => {
    return t(`custom_package.categories.${categoryId}.title`);
  };

  const getServiceName = (serviceId: string) => {
    const category = serviceCategory;
    return t(`custom_package.services.${category}.${serviceId.replace(/-/g, '_')}.title`);
  };

  const getBudgetName = (budgetId: string) => {
    return t(`custom_package.budget_ranges.${budgetId.replace(/-/g, '_')}`);
  };

  const getTimelineName = (timelineId: string) => {
    return t(`custom_package.timeline_options.${timelineId.replace(/-/g, '_')}`);
  };

  // Form gönderme
  const onSubmit = (data: PackageFormData) => {
    // Çevirileri kullanarak daha okunabilir mesaj oluştur
    const message = "*Yeni Özel Paket Talebi*\n" +
      "*Kategori:* " + getCategoryName(data.serviceCategory) + "\n" +
      "*Seçilen Hizmetler:* " + data.selectedServices.map(service => getServiceName(service)).join(', ') + "\n" +
      "*Bütçe:* " + getBudgetName(data.budget) + "\n" +
      "*Zaman Çerçevesi:* " + getTimelineName(data.timeline) + "\n" +
      (data.additionalInfo ? "*Ek Bilgiler:* " + data.additionalInfo + "\n" : "") +
      "\n*İletişim Bilgileri:*\n" +
      "*İsim:* " + data.name + "\n" +
      "*E-posta:* " + data.email + "\n" +
      "*Telefon:* " + data.phone;

    // WhatsApp URL'i oluştur - gerçek telefon numaranızı buraya ekleyin
    const whatsappNumber = "905436461502"; // Gerçek numaranızla değiştirin (Başında + olmadan, boşluk olmadan)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // WhatsApp'ı aç
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>{t('custom_package.page_title')} | App Design House</title>
        <meta name="description" content={t('custom_package.meta_description')} />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://appdesignhouse.com/custom-package" />
        
        {/* Hreflang Etiketleri */}
        <link rel="alternate" hrefLang="tr" href="https://appdesignhouse.com/custom-package?lang=tr" />
        <link rel="alternate" hrefLang="en" href="https://appdesignhouse.com/custom-package?lang=en" />
        
        {/* Open Graph Meta Etiketleri */}
        <meta property="og:title" content={`${t('custom_package.page_title')} | App Design House`} />
        <meta property="og:description" content={t('custom_package.meta_description')} />
        <meta property="og:url" content="https://appdesignhouse.com/custom-package" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://appdesignhouse.com/assets/images/og-custom-package.jpg" />
        <meta property="og:locale" content={i18n.language === 'tr' ? 'tr_TR' : 'en_US'} />
        <meta property="og:site_name" content="App Design House" />
        
        {/* Twitter Card Meta Etiketleri */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('custom_package.page_title')} | App Design House`} />
        <meta name="twitter:description" content={t('custom_package.meta_description')} />
        <meta name="twitter:image" content="https://appdesignhouse.com/assets/images/og-custom-package.jpg" />
        
        {/* Ek Meta Etiketleri */}
        <meta name="keywords" content="özel paket, yazılım hizmetleri, ajans hizmetleri, danışmanlık, web geliştirme, mobil uygulama, dijital pazarlama" />
        <meta name="author" content="App Design House" />
        
        {/* Yapısal Veri (Schema.org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": t('custom_package.page_title'),
            "description": t('custom_package.meta_description'),
            "provider": {
              "@type": "Organization",
              "name": "App Design House",
              "url": "https://appdesignhouse.com",
              "logo": "https://appdesignhouse.com/assets/images/logos/ADH_LOGO_BLACK.png"
            },
            "serviceType": ["Yazılım Hizmetleri", "Ajans Hizmetleri", "Danışmanlık Hizmetleri"],
            "offers": {
              "@type": "Offer",
              "priceCurrency": "TRY",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>

      <div className="mt-16 pt-16 min-h-screen bg-gradient-to-br from-tertiary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 gradient-text bg-gradient-primary">
              {t('custom_package.title')}
            </h1>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('custom_package.subtitle')}
            </p>

            {/* Adım göstergesi - Geliştirilmiş Versiyon */}
            <div className="mb-8">
              <div className="flex justify-between items-center relative">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col items-center relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === currentStep 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20' 
                          : index < currentStep 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => index < currentStep && setCurrentStep(index)}
                      style={{ cursor: index < currentStep ? 'pointer' : 'default' }}
                    >
                      {index < currentStep ? (
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: [0, 10, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      ) : (
                        index + 1
                      )}
                    </motion.div>
                    <span className="text-xs mt-2 hidden md:block font-medium">{step.title}</span>
                    
                    {/* Mobil görünümde adım ismi (sadece aktif adım için) */}
                    {index === currentStep && (
                      <motion.span 
                        className="absolute -bottom-6 text-xs font-medium text-primary md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {step.title}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
                
                {/* Bağlantı çizgisi */}
                <div className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-10"></div>
                <motion.div 
                  className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary -z-10"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>

            {/* Form */}
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div 
                  className="bg-white rounded-lg shadow-xl p-6 mb-6 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Dekoratif arka plan elementleri */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-bl-full -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-tertiary/5 to-accent/5 rounded-tr-full -z-10"></div>
                  
                  {/* Adım içeriği */}
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {steps[currentStep].component}
                  </motion.div>
                </motion.div>

                {/* Navigasyon butonları */}
                <div className="flex justify-between mt-6">
                  <motion.button
                    type="button"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 0}
                    className={`px-6 py-3 rounded-lg flex items-center ${
                      currentStep === 0 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    }`}
                    whileHover={currentStep !== 0 ? { scale: 1.03 } : {}}
                    whileTap={currentStep !== 0 ? { scale: 0.97 } : {}}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {t('custom_package.buttons.previous')}
                  </motion.button>

                  {currentStep < steps.length - 1 ? (
                    <motion.button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 flex items-center"
                      whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(247, 37, 133, 0.3)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {t('custom_package.buttons.next')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20 flex items-center"
                      whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.3)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.6 6.31c1.34 0 2.42 1.1 2.42 2.46v6.46c0 1.35-1.08 2.46-2.42 2.46H8.58c-1.34 0-2.42-1.1-2.42-2.46V8.77c0-1.35 1.08-2.46 2.42-2.46h9.02zm-9.02 1.23c-.66 0-1.21.56-1.21 1.23v6.46c0 .67.55 1.23 1.21 1.23h9.02c.66 0 1.21-.56 1.21-1.23V8.77c0-.67-.55-1.23-1.21-1.23H8.58zM19.22 5.08h-9.02c-2.01 0-3.63 1.65-3.63 3.69v6.46c0 2.04 1.62 3.69 3.63 3.69h9.02c2.01 0 3.63-1.65 3.63-3.69V8.77c0-2.04-1.62-3.69-3.63-3.69zm-4.51 9.92c-.8 0-1.45-.67-1.45-1.5s.65-1.5 1.45-1.5 1.45.67 1.45 1.5-.65 1.5-1.45 1.5z"/>
                      </svg>
                      {t('custom_package.buttons.send_whatsapp')}
                    </motion.button>
                  )}
                </div>
              </form>
            </FormProvider>
            
            {/* SEO için ek içerik bölümü */}
            <motion.div
              className="mt-16 bg-white rounded-lg shadow-lg p-6 text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {t('custom_package.seo_section.title')}
              </h2>
              <div className="space-y-4">
                <p>
                  {t('custom_package.seo_section.paragraph1')}
                </p>
                <p>
                  {t('custom_package.seo_section.paragraph2')}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      {t('custom_package.categories.software.title')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('custom_package.categories.software.description')}
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      {t('custom_package.categories.agency.title')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('custom_package.categories.agency.description')}
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium mb-2 text-primary">
                      {t('custom_package.categories.consulting.title')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t('custom_package.categories.consulting.description')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CustomPackage; 