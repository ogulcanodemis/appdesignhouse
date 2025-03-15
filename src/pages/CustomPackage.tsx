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
  const { t } = useTranslation();
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
        <title>{t('custom_package.page_title')} | AppHouse Design</title>
        <meta name="description" content={t('custom_package.meta_description')} />
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

            {/* Adım göstergesi */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === currentStep 
                          ? 'bg-primary text-white' 
                          : index < currentStep 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <span className="text-xs mt-1 hidden md:block">{step.title}</span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form */}
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  {steps[currentStep].component}
                </div>

                {/* Navigasyon butonları */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    disabled={currentStep === 0}
                    className={`px-6 py-2 rounded-lg ${
                      currentStep === 0 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {t('custom_package.buttons.previous')}
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                    >
                      {t('custom_package.buttons.next')}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.6 6.31c1.34 0 2.42 1.1 2.42 2.46v6.46c0 1.35-1.08 2.46-2.42 2.46H8.58c-1.34 0-2.42-1.1-2.42-2.46V8.77c0-1.35 1.08-2.46 2.42-2.46h9.02zm-9.02 1.23c-.66 0-1.21.56-1.21 1.23v6.46c0 .67.55 1.23 1.21 1.23h9.02c.66 0 1.21-.56 1.21-1.23V8.77c0-.67-.55-1.23-1.21-1.23H8.58zM19.22 5.08h-9.02c-2.01 0-3.63 1.65-3.63 3.69v6.46c0 2.04 1.62 3.69 3.63 3.69h9.02c2.01 0 3.63-1.65 3.63-3.69V8.77c0-2.04-1.62-3.69-3.63-3.69zm-4.51 9.92c-.8 0-1.45-.67-1.45-1.5s.65-1.5 1.45-1.5 1.45.67 1.45 1.5-.65 1.5-1.45 1.5z"/>
                      </svg>
                      {t('custom_package.buttons.send_whatsapp')}
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CustomPackage; 