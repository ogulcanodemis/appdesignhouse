import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ContactInfoStep = () => {
  const { register, formState: { errors } } = useFormContext();
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('custom_package.steps.contact')}</h2>
      <p className="text-gray-600 mb-6">{t('custom_package.contact_description')}</p>

      <div className="space-y-4">
        {/* İsim */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('custom_package.form.name')} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={`w-full p-3 border-2 rounded-lg focus:ring focus:ring-primary/20 transition-all duration-200 ${
              errors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary'
            }`}
            placeholder={t('custom_package.form.name_placeholder')}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name.message as string}</p>
          )}
        </div>

        {/* E-posta */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('custom_package.form.email')} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-3 border-2 rounded-lg focus:ring focus:ring-primary/20 transition-all duration-200 ${
              errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary'
            }`}
            placeholder={t('custom_package.form.email_placeholder')}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message as string}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            {t('custom_package.form.phone')} <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full p-3 border-2 rounded-lg focus:ring focus:ring-primary/20 transition-all duration-200 ${
              errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-primary'
            }`}
            placeholder={t('custom_package.form.phone_placeholder')}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-red-500 mt-1 text-sm">{errors.phone.message as string}</p>
          )}
        </div>

        {/* KVKK Bilgilendirmesi */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {t('custom_package.privacy_notice.title')}
          </h3>
          <p className="text-xs text-gray-600">
            {t('custom_package.privacy_notice.content')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep; 