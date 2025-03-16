import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import FeaturedSection from '../components/sections/FeaturedSection';
import CTASection from '../components/sections/CTASection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>App Design House - Yazılım, Ajans ve Danışmanlık Hizmetleri</title>
        <meta name="description" content="Modern ve yenilikçi yazılım, ajans ve danışmanlık hizmetleriyle işinizi bir üst seviyeye taşıyoruz." />
      </Helmet>

      <div className="pt-16"> {/* Header height offset */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedSection />
        <CTASection />
      </div>
    </>
  );
};

export default Home; 