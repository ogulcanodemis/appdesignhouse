import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics için tip tanımlamaları
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    gtag_report_conversion: (url?: string) => boolean;
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();

  // Sayfa değişikliklerini izle
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'AW-16931922637', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  // Dönüşüm izleme fonksiyonunu global olarak tanımla
  useEffect(() => {
    window.gtag_report_conversion = (url?: string) => {
      const callback = function () {
        if (typeof(url) != 'undefined') {
          window.location = url as Location | (string & Location);
        }
      };
      
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16931922637/H5b5CKGOlqsaEM3F4ok_',
          'value': 1.0,
          'currency': 'TRY',
          'event_callback': callback
        });
      }
      
      return false;
    };
  }, []);

  return null; // Bu bileşen herhangi bir UI render etmez
};

// Olay izleme için yardımcı fonksiyonlar
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

// Form gönderimlerini izleme
export const trackFormSubmission = (formName: string, formData: Record<string, any> = {}) => {
  trackEvent('form_submission', {
    form_name: formName,
    ...formData
  });
};

// Özel paket oluşturma adımlarını izleme
export const trackCustomPackageStep = (stepNumber: number, stepName: string) => {
  trackEvent('custom_package_step', {
    step_number: stepNumber,
    step_name: stepName
  });
};

// WhatsApp ile gönderimi izleme
export const trackWhatsAppSend = (packageDetails: Record<string, any>) => {
  trackEvent('whatsapp_send', {
    package_category: packageDetails.serviceCategory,
    services_count: packageDetails.selectedServices?.length || 0,
    budget: packageDetails.budget,
    timeline: packageDetails.timeline
  });
  
  // Ayrıca dönüşüm olarak da izle
  if (typeof window.gtag_report_conversion === 'function') {
    window.gtag_report_conversion();
  }
};

// Fiyat teklifi dönüşümünü izleme
export const trackPriceQuoteConversion = (url?: string) => {
  if (typeof window.gtag_report_conversion === 'function') {
    return window.gtag_report_conversion(url);
  }
  return false;
};

export default GoogleAnalytics; 