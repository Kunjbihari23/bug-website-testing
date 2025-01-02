import Footer from '@/components/Footer/Footer';
import MainHeader from '@/components/Navbar/MainHeader';
import AboutSection from '@/components/Campaign/sanctum/aboutSection';
import AmenitieSection from '@/components/Campaign/sanctum/amenitieSection';
import ContactSection from '@/components/Campaign/sanctum/contactSection';
import FeatureSection from '@/components/Campaign/sanctum/featuresSection';
import FooterSection from '@/components/Campaign/sanctum/footerSection';
import GallerySection from '@/components/Campaign/sanctum/gallerySection';
import HeroSection from '@/components/Campaign/sanctum/herosection';
import PlanSection from '@/components/Campaign/sanctum/planSection';
import SqftSection from '@/components/Campaign/sanctum/sqftSection';
import React from 'react';

function page() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SqftSection />
      <GallerySection />
      <FeatureSection />
      <AmenitieSection />
      <PlanSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default page;
