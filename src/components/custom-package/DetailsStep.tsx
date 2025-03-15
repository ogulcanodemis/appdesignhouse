import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const DetailsStep = () => {
  const { register, formState: { errors } } = useFormContext();
  const { t } = useTranslation();

  const budgetRanges = [
    { id: 'under-5k', label: t('custom_package.budget_ranges.under_5k') },
    { id: '5k-10k', label: t('custom_package.budget_ranges.5k_10k') },
    { id: '10k-25k', label: t('custom_package.budget_ranges.10k_25k') },
    { id: '25k-50k', label: t('custom_package.budget_ranges.25k_50k') },
    { id: 'over-50k', label: t('custom_package.budget_ranges.over_50k') },
    { id: 'not-sure', label: t('custom_package.budget_ranges.not_sure') },
  ];

  const timelineOptions = [
    { id: 'asap', label: t('custom_package.timeline_options.asap') },
    { id: 'within-1-month', label: t('custom_package.timeline_options.within_1_month') },
    { id: '1-3-months', label: t('custom_package.timeline_options.1_3_months') },
    { id: '3-6-months', label: t('custom_package.timeline_options.3_6_months') },
    { id: 'flexible', label: t('custom_package.timeline_options.flexible') },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('custom_package.steps.details')}</h2>
      <p className="text-gray-600 mb-6">{t('custom_package.details_description')}</p>

      <div className="space-y-6">
        {/* Bütçe Aralığı */}
        <div>
          <label className="block text-lg font-medium mb-3">
            {t('custom_package.budget_label')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {budgetRanges.map((range) => (
              <label key={range.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer sr-only"
                  value={range.id}
                  {...register('budget')}
                />
                <div className="p-3 rounded-lg border-2 border-gray-200 text-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-gray-300">
                  {range.label}
                </div>
              </label>
            ))}
          </div>
          {errors.budget && (
            <p className="text-red-500 mt-2 text-sm">{errors.budget.message as string}</p>
          )}
        </div>

        {/* Zaman Çerçevesi */}
        <div>
          <label className="block text-lg font-medium mb-3">
            {t('custom_package.timeline_label')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timelineOptions.map((option) => (
              <label key={option.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer sr-only"
                  value={option.id}
                  {...register('timeline')}
                />
                <div className="p-3 rounded-lg border-2 border-gray-200 text-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-gray-300">
                  {option.label}
                </div>
              </label>
            ))}
          </div>
          {errors.timeline && (
            <p className="text-red-500 mt-2 text-sm">{errors.timeline.message as string}</p>
          )}
        </div>

        {/* Ek Bilgiler */}
        <div>
          <label className="block text-lg font-medium mb-3">
            {t('custom_package.additional_info_label')}
          </label>
          <textarea
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring focus:ring-primary/20 transition-all duration-200"
            rows={4}
            placeholder={t('custom_package.additional_info_placeholder')}
            {...register('additionalInfo')}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default DetailsStep; 