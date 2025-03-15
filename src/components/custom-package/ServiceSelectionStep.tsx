import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type ServiceSelectionStepProps = {
  category: string;
};

const ServiceSelectionStep = ({ category }: ServiceSelectionStepProps) => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const { t } = useTranslation();
  const selectedServices = watch('selectedServices') || [];

  // Kategori bazlı hizmetler
  const servicesByCategory = {
    software: [
      {
        id: 'web-development',
        title: t('custom_package.services.software.web_development.title'),
        description: t('custom_package.services.software.web_development.description'),
      },
      {
        id: 'mobile-app',
        title: t('custom_package.services.software.mobile_app.title'),
        description: t('custom_package.services.software.mobile_app.description'),
      },
      {
        id: 'e-commerce',
        title: t('custom_package.services.software.e_commerce.title'),
        description: t('custom_package.services.software.e_commerce.description'),
      },
      {
        id: 'custom-software',
        title: t('custom_package.services.software.custom_software.title'),
        description: t('custom_package.services.software.custom_software.description'),
      },
      {
        id: 'cms',
        title: t('custom_package.services.software.cms.title'),
        description: t('custom_package.services.software.cms.description'),
      },
      {
        id: 'api-integration',
        title: t('custom_package.services.software.api_integration.title'),
        description: t('custom_package.services.software.api_integration.description'),
      },
    ],
    agency: [
      {
        id: 'branding',
        title: t('custom_package.services.agency.branding.title'),
        description: t('custom_package.services.agency.branding.description'),
      },
      {
        id: 'ui-ux',
        title: t('custom_package.services.agency.ui_ux.title'),
        description: t('custom_package.services.agency.ui_ux.description'),
      },
      {
        id: 'digital-marketing',
        title: t('custom_package.services.agency.digital_marketing.title'),
        description: t('custom_package.services.agency.digital_marketing.description'),
      },
      {
        id: 'content-creation',
        title: t('custom_package.services.agency.content_creation.title'),
        description: t('custom_package.services.agency.content_creation.description'),
      },
    ],
    consulting: [
      {
        id: 'business-strategy',
        title: t('custom_package.services.consulting.business_strategy.title'),
        description: t('custom_package.services.consulting.business_strategy.description'),
      },
      {
        id: 'tech-consulting',
        title: t('custom_package.services.consulting.tech_consulting.title'),
        description: t('custom_package.services.consulting.tech_consulting.description'),
      },
      {
        id: 'digital-transformation',
        title: t('custom_package.services.consulting.digital_transformation.title'),
        description: t('custom_package.services.consulting.digital_transformation.description'),
      },
      {
        id: 'product-management',
        title: t('custom_package.services.consulting.product_management.title'),
        description: t('custom_package.services.consulting.product_management.description'),
      },
      {
        id: 'market-research',
        title: t('custom_package.services.consulting.market_research.title'),
        description: t('custom_package.services.consulting.market_research.description'),
      },
    ],
  };

  // Seçilen kategoriye göre hizmetleri al
  const services = category ? servicesByCategory[category as keyof typeof servicesByCategory] || [] : [];

  // Hizmet seçme/kaldırma işlevi
  const toggleService = (serviceId: string) => {
    const isSelected = selectedServices.includes(serviceId);
    let newSelectedServices;
    
    if (isSelected) {
      newSelectedServices = selectedServices.filter((id: string) => id !== serviceId);
    } else {
      newSelectedServices = [...selectedServices, serviceId];
    }
    
    setValue('selectedServices', newSelectedServices, { shouldValidate: true });
  };

  if (!category) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('custom_package.no_category_selected')}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('custom_package.steps.services')}</h2>
      <p className="text-gray-600 mb-6">{t('custom_package.services_description')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedServices.includes(service.id)
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <div className="flex items-start">
              <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mt-1 ${
                selectedServices.includes(service.id)
                  ? 'bg-primary border-primary'
                  : 'border-gray-300'
              }`}>
                {selectedServices.includes(service.id) && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">{service.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gizli input - form validasyonu için */}
      <input
        type="hidden"
        {...register('selectedServices')}
      />

      {errors.selectedServices && (
        <p className="text-red-500 mt-4 text-sm">{errors.selectedServices.message as string}</p>
      )}
    </div>
  );
};

export default ServiceSelectionStep; 