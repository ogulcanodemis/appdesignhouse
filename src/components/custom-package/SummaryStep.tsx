import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SummaryStep = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  // Form verilerini al
  const serviceCategory = watch('serviceCategory');
  const selectedServices = watch('selectedServices') || [];
  const budget = watch('budget');
  const timeline = watch('timeline');
  const additionalInfo = watch('additionalInfo');
  const name = watch('name');
  const email = watch('email');
  const phone = watch('phone');

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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('custom_package.steps.summary')}</h2>
      <p className="text-gray-600 mb-6">{t('custom_package.summary_description')}</p>

      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 rounded-lg p-5 border border-gray-200"
        >
          <h3 className="text-lg font-medium mb-3">{t('custom_package.summary.package_details')}</h3>
          
          <div className="space-y-3">
            {/* Kategori */}
            <div className="flex">
              <span className="font-medium w-1/3">{t('custom_package.summary.category')}:</span>
              <span className="text-gray-700">{serviceCategory ? getCategoryName(serviceCategory) : '-'}</span>
            </div>
            
            {/* Seçilen Hizmetler */}
            <div className="flex">
              <span className="font-medium w-1/3">{t('custom_package.summary.services')}:</span>
              <div className="flex-1">
                {selectedServices.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {selectedServices.map((service: string) => (
                      <li key={service} className="text-gray-700">{getServiceName(service)}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
            </div>
            
            {/* Bütçe */}
            <div className="flex">
              <span className="font-medium w-1/3">{t('custom_package.summary.budget')}:</span>
              <span className="text-gray-700">{budget ? getBudgetName(budget) : '-'}</span>
            </div>
            
            {/* Zaman Çerçevesi */}
            <div className="flex">
              <span className="font-medium w-1/3">{t('custom_package.summary.timeline')}:</span>
              <span className="text-gray-700">{timeline ? getTimelineName(timeline) : '-'}</span>
            </div>
            
            {/* Ek Bilgiler */}
            {additionalInfo && (
              <div className="flex">
                <span className="font-medium w-1/3">{t('custom_package.summary.additional_info')}:</span>
                <span className="text-gray-700">{additionalInfo}</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gray-50 rounded-lg p-5 border border-gray-200"
        >
          <h3 className="text-lg font-medium mb-3">{t('custom_package.summary.contact_details')}</h3>
          
          <div className="space-y-3">
            {/* İsim */}
            <div className="flex">
              <span className="font-medium w-1/3">{t('custom_package.summary.name')}:</span>
              <span className="text-gray-700">{name || '-'}</span>
            </div>
            
            {/* E-posta */}
            <div className="flex">
              <span className="font-medium w-1/3">{t('custom_package.summary.email')}:</span>
              <span className="text-gray-700">{email || '-'}</span>
            </div>
            
            {/* Telefon */}
            <div className="flex">
              <span className="font-medium w-1/3">{t('custom_package.summary.phone')}:</span>
              <span className="text-gray-700">{phone || '-'}</span>
            </div>
          </div>
        </motion.div>

        <div className="bg-green-50 rounded-lg p-5 border border-green-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{t('custom_package.summary.next_steps_title')}</h3>
              <p className="text-sm text-green-700 mt-1">{t('custom_package.summary.next_steps_description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep; 