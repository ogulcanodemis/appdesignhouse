import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Gizlilik politikası içeriğini proje ID'sine ve dile göre getiren fonksiyon
const getPrivacyPolicyContent = (projectId: string | undefined, language: string) => {
  // Airy projesi için gizlilik politikası içeriği
  if (projectId === 'airy') {
    // Türkçe içerik
    if (language === 'tr') {
      return {
        sections: [
          {
            title: "Giriş",
            content: `
              <p>Bu gizlilik politikası, Airy uygulamasını kullanırken toplanan, işlenen ve saklanan kişisel verilerinizle ilgili bilgileri içerir. Uygulamayı kullanarak, bu politikada belirtilen uygulamaları kabul etmiş olursunuz.</p>
            `
          },
          {
            title: "Topladığımız Veriler",
            content: `
              <p>Uygulamamız aşağıdaki verileri toplar ve işler:</p>
              <ol>
                <li><strong>Konum Bilgileri:</strong> Bulunduğunuz yerdeki hava kalitesi verilerini sağlamak için coğrafi konum bilgilerinizi kullanırız.</li>
                <li><strong>Kullanıcı Hesap Bilgileri:</strong> E-posta adresiniz ve kullanıcı adınız gibi hesap oluşturma ve oturum açma için gerekli bilgiler.</li>
                <li><strong>Uygulama Kullanım Verileri:</strong> Uygulama içindeki etkileşimleriniz ve tercihleriniz.</li>
                <li><strong>Cihaz Bilgileri:</strong> İşletim sistemi, cihaz modeli ve uygulama versiyonu gibi teknik bilgiler.</li>
              </ol>
            `
          },
          {
            title: "Verilerin Kullanımı",
            content: `
              <p>Topladığımız verileri aşağıdaki amaçlar için kullanırız:</p>
              <ol>
                <li>Hava kalitesi bilgilerini sağlamak ve kişiselleştirilmiş uyarılar göndermek.</li>
                <li>Uygulamanın işlevselliğini ve performansını iyileştirmek.</li>
                <li>Kullanıcı hesaplarını yönetmek ve güvenliği sağlamak.</li>
                <li>Yasal yükümlülüklere uymak.</li>
              </ol>
            `
          },
          {
            title: "Veri Paylaşımı",
            content: `
              <p>Verilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:</p>
              <ol>
                <li>Hava kalitesi verilerini sağlayan API servisleri (WAQI API).</li>
                <li>Bulut depolama ve analitik hizmetleri sağlayan iş ortaklarımız.</li>
                <li>Yasal zorunluluk durumunda yetkili kurumlar.</li>
              </ol>
              <p>Verilerinizi pazarlama amaçlı olarak üçüncü taraflarla paylaşmıyoruz.</p>
            `
          },
          {
            title: "Veri Güvenliği",
            content: `
              <p>Verilerinizi korumak için endüstri standardı güvenlik önlemleri uyguluyoruz. Bununla birlikte, internet üzerinden hiçbir veri iletiminin veya elektronik depolamanın %100 güvenli olmadığını unutmayın.</p>
            `
          },
          {
            title: "Çocukların Gizliliği",
            content: `
              <p>Uygulamamız 13 yaşın altındaki çocuklardan bilerek veri toplamaz. Eğer 13 yaşın altındaki bir çocuğun kişisel verilerini topladığımızı fark ederseniz, lütfen bizimle iletişime geçin.</p>
            `
          },
          {
            title: "Politika Değişiklikleri",
            content: `
              <p>Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler yapıldığında, uygulama içinde bildirim yayınlayacağız ve politikanın güncellenmiş versiyonunu burada yayınlayacağız.</p>
            `
          },
          {
            title: "İletişim",
            content: `
              <p>Bu gizlilik politikası hakkında sorularınız veya endişeleriniz varsa, lütfen info@appdesignhouse.com adresinden bizimle iletişime geçin.</p>
            `
          }
        ],
        lastUpdated: "15 Mart 2024"
      };
    } 
    // İngilizce içerik
    else {
      return {
        sections: [
          {
            title: "Introduction",
            content: `
              <p>This privacy policy contains information about your personal data collected, processed, and stored when using the Airy application. By using the application, you accept the practices described in this policy.</p>
            `
          },
          {
            title: "Data We Collect",
            content: `
              <p>Our application collects and processes the following data:</p>
              <ol>
                <li><strong>Location Information:</strong> We use your geographic location information to provide air quality data for your location.</li>
                <li><strong>User Account Information:</strong> Information required for account creation and login, such as your email address and username.</li>
                <li><strong>Application Usage Data:</strong> Your interactions and preferences within the application.</li>
                <li><strong>Device Information:</strong> Technical information such as operating system, device model, and application version.</li>
              </ol>
            `
          },
          {
            title: "Use of Data",
            content: `
              <p>We use the data we collect for the following purposes:</p>
              <ol>
                <li>Providing air quality information and sending personalized alerts.</li>
                <li>Improving the functionality and performance of the application.</li>
                <li>Managing user accounts and ensuring security.</li>
                <li>Complying with legal obligations.</li>
              </ol>
            `
          },
          {
            title: "Data Sharing",
            content: `
              <p>We may share your data with third parties in the following cases:</p>
              <ol>
                <li>API services that provide air quality data (WAQI API).</li>
                <li>Our business partners providing cloud storage and analytics services.</li>
                <li>Authorized institutions in case of legal obligation.</li>
              </ol>
              <p>We do not share your data with third parties for marketing purposes.</p>
            `
          },
          {
            title: "Data Security",
            content: `
              <p>We implement industry-standard security measures to protect your data. However, please note that no data transmission over the internet or electronic storage is 100% secure.</p>
            `
          },
          {
            title: "Children's Privacy",
            content: `
              <p>Our application does not knowingly collect data from children under the age of 13. If you notice that we have collected personal data from a child under 13, please contact us.</p>
            `
          },
          {
            title: "Policy Changes",
            content: `
              <p>We may update this privacy policy from time to time. When changes are made, we will post a notification in the application and publish the updated version of the policy here.</p>
            `
          },
          {
            title: "Contact",
            content: `
              <p>If you have any questions or concerns about this privacy policy, please contact us at info@appdesignhouse.com.</p>
            `
          }
        ],
        lastUpdated: "March 15, 2024"
      };
    }
  }
  
  // Genel gizlilik politikası içeriği (diğer projeler veya genel sayfa için)
  if (language === 'tr') {
    return {
      sections: [
        {
          title: "Genel Gizlilik Politikası",
          content: `
            <p>Bu, App Design House'un genel gizlilik politikasıdır. Belirli bir uygulama veya hizmet için gizlilik politikası görüntülemek istiyorsanız, lütfen ilgili projenin sayfasını ziyaret edin.</p>
            <p>App Design House olarak, kullanıcılarımızın gizliliğine saygı duyuyor ve kişisel verilerinizin korunmasını önemsiyoruz.</p>
          `
        }
      ],
      lastUpdated: new Date().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  } else {
    return {
      sections: [
        {
          title: "General Privacy Policy",
          content: `
            <p>This is the general privacy policy of App Design House. If you want to view the privacy policy for a specific application or service, please visit the relevant project page.</p>
            <p>At App Design House, we respect our users' privacy and value the protection of your personal data.</p>
          `
        }
      ],
      lastUpdated: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  }
};

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();
  const [policyContent, setPolicyContent] = useState<{ 
    sections: { title: string; content: string }[]; 
    lastUpdated?: string;
  }>({ 
    sections: [] 
  });
  
  // Sayfa başlığı ve açıklaması için proje adını kullan
  const projectName = projectId ? t(`projectsPage.projects.${projectId}.title`) : 'App Design House';
  const pageTitle = projectId 
    ? `${projectName} ${t('privacyPolicy.title')}` 
    : t('privacyPolicy.title');
  
  useEffect(() => {
    // Sayfa yüklendiğinde ilgili gizlilik politikası içeriğini yükle
    setPolicyContent(getPrivacyPolicyContent(projectId, i18n.language));
  }, [projectId, i18n.language]);

  return (
    <>
      <Helmet>
        <title>{pageTitle} - App Design House</title>
        <meta
          name="description"
          content={t('privacyPolicy.meta.description')}
        />
        <link rel="canonical" href={`https://appdesignhouse.com/privacy-policy/${projectId || ''}`} />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-accent overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Grid Pattern */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Floating Elements */}
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`float-${index}`}
                className="absolute bg-white/5 backdrop-blur-sm rounded-full"
                style={{
                  width: 100 + Math.random() * 200,
                  height: 100 + Math.random() * 200,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 20, 0],
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {projectId && (
                  <span className="text-white">{projectName} </span>
                )}
                <span className="gradient-text bg-gradient-to-r from-white to-white/80">
                  {t('privacyPolicy.title')}
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-white/90 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('privacyPolicy.subtitle')}
              </motion.p>
              
              {projectId && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Link 
                    to="/projects" 
                    className="text-white hover:text-white/80 transition-colors inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('privacyPolicy.backToProjects')}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="prose prose-lg max-w-none">
                {/* Gizlilik Politikası içeriği */}
                <div id="privacy-policy-content">
                  {policyContent.sections.length > 0 ? (
                    policyContent.sections.map((section, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="mb-8"
                      >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">{section.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-center">
                      {t('privacyPolicy.contentPlaceholder')}
                    </p>
                  )}
                </div>
                
                {/* Son Güncelleme Tarihi */}
                <div className="mt-12 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {t('privacyPolicy.lastUpdated')}: <span className="font-medium">
                      {policyContent.lastUpdated}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy; 