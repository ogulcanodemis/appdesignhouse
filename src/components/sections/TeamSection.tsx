import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

// Ekip üyeleri veri yapısı
interface TeamMember {
  role: string;
  specialization: string;
  icon: string;
  gradient: string;
  isFounder: boolean;
}

const TeamSection = () => {
  const { t } = useTranslation();

  // Ekip üyeleri verisi
  const teamMembers: TeamMember[] = [
    // Kurucular
    {
      role: 'developer',
      specialization: 'frontend',
      icon: '💻',
      gradient: 'from-primary to-secondary',
      isFounder: true
    },
    {
      role: 'developer',
      specialization: 'backend',
      icon: '⚙️',
      gradient: 'from-secondary to-tertiary',
      isFounder: true
    },
    {
      role: 'designer',
      specialization: 'ux/ui',
      icon: '🎨',
      gradient: 'from-tertiary to-accent',
      isFounder: true
    },
    {
      role: 'devops',
      specialization: 'infrastructure',
      icon: '🚀',
      gradient: 'from-accent to-light',
      isFounder: true
    },
    // Diğer Ekip Üyeleri
    {
      role: 'developer',
      specialization: 'mobile-ios',
      icon: '📱',
      gradient: 'from-primary to-accent',
      isFounder: false
    },
    {
      role: 'developer',
      specialization: 'mobile-android',
      icon: '📱',
      gradient: 'from-secondary to-light',
      isFounder: false
    },
    {
      role: 'developer',
      specialization: 'frontend',
      icon: '💻',
      gradient: 'from-tertiary to-primary',
      isFounder: false
    },
    {
      role: 'developer',
      specialization: 'backend',
      icon: '⚙️',
      gradient: 'from-accent to-secondary',
      isFounder: false
    },
    {
      role: 'designer',
      specialization: 'ui',
      icon: '🎨',
      gradient: 'from-primary to-tertiary',
      isFounder: false
    },
    {
      role: 'designer',
      specialization: 'ux',
      icon: '🧠',
      gradient: 'from-secondary to-accent',
      isFounder: false
    }
  ];

  // Kurucular ve diğer ekip üyelerini ayırma
  const founders = teamMembers.filter(member => member.isFounder);
  const otherMembers = teamMembers.filter(member => !member.isFounder);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Animasyonlu Arka Plan */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`orb-${index}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: 300 + index * 100,
              height: 300 + index * 100,
              background: `radial-gradient(circle, ${
                index === 0 ? 'rgba(247,37,133,0.05)' :
                index === 1 ? 'rgba(67,97,238,0.05)' :
                'rgba(76,201,240,0.05)'
              }, transparent)`,
              top: `${20 + index * 30}%`,
              left: `${20 + index * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15 + index * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating Icons */}
        {['💻', '🎨', '📱', '⚙️', '🚀', '🧠'].map((icon, index) => (
          <motion.div
            key={`icon-${index}`}
            className="absolute text-2xl opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(index) * 20, 0],
              rotate: [0, 360],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          >
            {icon}
          </motion.div>
        ))}

        {/* Connection Lines */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`line-${index}`}
            className="absolute h-px"
            style={{
              width: 100 + Math.random() * 200,
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text bg-gradient-to-r from-primary to-accent">
              {t('aboutPage.team.title')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('aboutPage.team.description')}
          </p>
        </motion.div>

        {/* Kurucular Bölümü */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-center mb-8 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('aboutPage.team.founders')}
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {founders.map((member, index) => (
              <TeamMemberCard 
                key={`founder-${index}`} 
                member={member} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* Diğer Ekip Üyeleri Bölümü */}
        <div>
          <motion.h3
            className="text-2xl font-bold text-center mb-8 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('aboutPage.team.members')}
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherMembers.map((member, index) => (
              <TeamMemberCard 
                key={`member-${index}`} 
                member={member} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Ekip Üyesi Kartı Bileşeni
interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard = ({ member, index }: TeamMemberCardProps) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-lg`} />
      <div className="relative bg-white rounded-2xl p-8 h-full border border-gray-100 group-hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md">
        <motion.div 
          className="text-4xl mb-4"
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.2 }}
        >
          {member.icon}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {t(`aboutPage.team.roles.${member.role}`)}
        </h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
          {t(`aboutPage.team.specializations.${member.specialization}`)}
        </p>
        
        {member.isFounder && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {t('aboutPage.team.founderBadge')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(TeamSection); 