import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceCategoryStep = () => {
  const { register, formState: { errors }, watch } = useFormContext();
  const { t } = useTranslation();
  
  // Seçilen kategoriyi izle
  const selectedCategory = watch('serviceCategory');

  const categories = [
    {
      id: 'software',
      title: t('custom_package.categories.software.title'),
      description: t('custom_package.categories.software.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      ),
    },
    {
      id: 'agency',
      title: t('custom_package.categories.agency.title'),
      description: t('custom_package.categories.agency.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
    },
    {
      id: 'consulting',
      title: t('custom_package.categories.consulting.title'),
      description: t('custom_package.categories.consulting.description'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('custom_package.steps.category')}</h2>
      <p className="text-gray-600 mb-6">{t('custom_package.category_description')}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <label
            key={category.id}
            className="relative cursor-pointer"
          >
            <input
              type="radio"
              className="peer sr-only"
              value={category.id}
              checked={selectedCategory === category.id}
              {...register('serviceCategory')}
            />
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-lg border-2 h-full transition-all duration-200 hover:shadow-md ${
                selectedCategory === category.id 
                  ? 'border-primary bg-primary/5 shadow-lg' 
                  : 'border-gray-200'
              }`}
            >
              <div className={`mb-4 ${selectedCategory === category.id ? 'text-primary' : 'text-gray-500'}`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </motion.div>
            <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedCategory === category.id 
                ? 'border-primary bg-primary text-white' 
                : 'border-gray-300 bg-white'
            }`}>
              {selectedCategory === category.id && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </label>
        ))}
      </div>

      {errors.serviceCategory && (
        <p className="text-red-500 mt-2 text-sm">{t('custom_package.select_service_category')}</p>
      )}
    </div>
  );
};

export default ServiceCategoryStep; 