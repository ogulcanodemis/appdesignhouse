import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link: string;
}

interface SocialLink {
  icon: string;
  name: string;
  url: string;
}

const ContactInfoComponent = () => {
  const { t } = useTranslation();

  const contactInfo: ContactInfo[] = [
    {
      icon: '📍',
      title: t('contactPage.info.address.title'),
      content: t('contactPage.info.address.content'),
      link: 'https://goo.gl/maps/123',
    },
    {
      icon: '📞',
      title: t('contactPage.info.phone.title'),
      content: t('contactPage.info.phone.content'),
      link: 'tel:+901234567890',
    },
    {
      icon: '✉️',
      title: t('contactPage.info.email.title'),
      content: t('contactPage.info.email.content'),
      link: 'mailto:info@apphousedesign.com',
    },
  ];

  const socialLinks: SocialLink[] = [
    { icon: '𝕏', name: t('contactPage.social.twitter'), url: 'https://twitter.com' },
    { icon: '𝕃', name: t('contactPage.social.linkedin'), url: 'https://linkedin.com' },
    { icon: '𝕀', name: t('contactPage.social.instagram'), url: 'https://instagram.com' },
    { icon: '𝔾', name: t('contactPage.social.github'), url: 'https://github.com' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="prose prose-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {t('contactPage.info.title')}
        </h2>
        <p className="text-gray-600">
          {t('contactPage.info.description')}
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid gap-6">
        {contactInfo.map((info, index) => (
          <motion.a
            key={info.title}
            href={info.link}
            target={info.link.startsWith('http') ? '_blank' : undefined}
            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{info.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {info.title}
                </h3>
                <p className="text-gray-600 group-hover:text-primary transition-colors">
                  {info.content}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('contactPage.social.title')}
        </h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ContactInfoComponent); 