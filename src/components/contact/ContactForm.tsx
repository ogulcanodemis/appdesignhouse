import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { FieldErrors, UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  file?: File;
}

interface ContactFormProps {
  isSubmitting: boolean;
  isUploading: boolean;
  selectedFileName: string;
  handleSubmit: UseFormHandleSubmit<FormData>;
  handleFormSubmit: (data: FormData) => Promise<void>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const ContactForm = ({
  isSubmitting,
  isUploading,
  selectedFileName,
  handleSubmit,
  handleFormSubmit,
  handleFileChange,
  register,
  errors
}: ContactFormProps) => {
  const { t } = useTranslation();

  return (
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
                {errors.name.message}
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
                {errors.email.message}
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
              {errors.phone.message}
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
              {errors.subject.message}
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
              {errors.message.message}
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
  );
};

export default memo(ContactForm); 