import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { trackPriceQuoteConversion } from '../common/GoogleAnalytics';

const WhatsAppContact = () => {
  const { t } = useTranslation();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  // WhatsApp numarası
  const whatsappNumber = '+905436461502';
  
  // Hazır mesaj seçenekleri
  const quickMessages = [
    { id: 'quote', text: t('contactPage.whatsapp.quickMessages.quote') },
    { id: 'info', text: t('contactPage.whatsapp.quickMessages.info') },
    { id: 'meeting', text: t('contactPage.whatsapp.quickMessages.meeting') },
    { id: 'support', text: t('contactPage.whatsapp.quickMessages.support') },
  ];

  // Seçilen mesaj veya varsayılan mesaj ile WhatsApp URL'i oluştur
  const getWhatsAppUrl = () => {
    const message = selectedMessage || t('contactPage.whatsapp.message');
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Hazır mesaj seçildiğinde çağrılacak fonksiyon
  const handleSelectMessage = (message: string) => {
    setSelectedMessage(message);
  };

  // WhatsApp butonuna tıklandığında dönüşüm izleme
  const handleWhatsAppClick = () => {
    // Fiyat teklifi mesajı seçilmişse dönüşüm olarak izle
    if (selectedMessage === t('contactPage.whatsapp.quickMessages.quote')) {
      return trackPriceQuoteConversion(getWhatsAppUrl());
    }
    // Diğer durumlarda normal olarak WhatsApp'a yönlendir
    window.open(getWhatsAppUrl(), '_blank');
    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-green-50 rounded-full mb-4">
            <svg 
              className="w-12 h-12 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm.029 18.88a7.947 7.947 0 01-3.76-.954l-4.17 1.093 1.112-4.063A7.935 7.935 0 014.03 12c0-4.365 3.552-7.918 7.918-7.918S19.866 7.635 19.866 12c0 4.365-3.552 7.918-7.918 7.918l.03-.038z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('contactPage.whatsapp.title')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('contactPage.whatsapp.description')}
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">👋</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-700 font-medium">
                  {selectedMessage || t('contactPage.whatsapp.message')}
                </p>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-right">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>

        {/* Hazır Mesaj Seçenekleri */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            {t('contactPage.whatsapp.quickMessagesTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickMessages.map((message) => (
              <motion.button
                key={message.id}
                onClick={() => handleSelectMessage(message.text)}
                className={`p-3 text-sm rounded-lg text-left transition-all ${
                  selectedMessage === message.text
                    ? 'bg-green-100 border-green-300 text-green-700 border'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {message.text}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          onClick={handleWhatsAppClick}
          className="block w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-center transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            <span>{t('contactPage.whatsapp.button')}</span>
          </div>
        </motion.button>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>{t('contactPage.whatsapp.availability')}</p>
        </div>

        <div className="border-t border-gray-100 pt-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">{t('contactPage.whatsapp.online')}</span>
            </div>
            <div className="text-sm text-gray-500">
              {t('contactPage.whatsapp.responseTime')}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(WhatsAppContact); 