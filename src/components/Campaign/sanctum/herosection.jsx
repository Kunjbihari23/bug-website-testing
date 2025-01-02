'use client';
import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Image, Popover } from '@mantine/core';
import { IconMapPin, IconMenu2, IconCircleChevronUp } from '@tabler/icons-react';
import NextImage from 'next/image';
import MainLogoImg from '../../../../public/img/sanctum/mainLogo.png';
import { HeadingOne } from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';
function HeroSection() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollToTop(scrollTop > 600); // Show after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDownloadBrochure = () => {
    const brochurePath = '/pdf/Sanctum-Brochure.pdf';
    const link = document.createElement('a');
    link.href = brochurePath;
    link.download = 'Sanctum-Brochure.pdf';
    link.click();
  };
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div>
      <header>
        <div id="hero-section" className={style.hero_banner}>
          <Container size={'xl'}>
            <Card shadow="sm" withBorder className={style.heroCard_banner}>
              <Image component={NextImage} src={MainLogoImg} width={100} height={100} radius={'md'} alt="LogoImage" />
              <div>
                <a onClick={() => handleScrollToSection('about-section')}>About Us</a>
                <a onClick={() => handleScrollToSection('site-section')}>Site Plans</a>
                <a onClick={() => handleScrollToSection('contact-section')}>Contact us</a>
              </div>
              <div className={style.burger_icn}>
                <Popover width="target" position="bottom" withArrow shadow="md">
                  <Popover.Target>
                    <IconMenu2 stroke={2} size={20} />
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div className={style.dropdownContent}>
                      <a onClick={() => handleScrollToSection('about-section')}>About Us</a>
                      <a onClick={() => handleScrollToSection('site-section')}>Site Plans</a>
                      <a onClick={() => handleScrollToSection('contact-section')}>Contact us</a>
                    </div>
                  </Popover.Dropdown>
                </Popover>
              </div>
            </Card>
            <div>
              <div>
                <HeadingOne fontWeight={700}>SANCTUM</HeadingOne>
                <p>
                  <IconMapPin stroke={2} size={20} color={'#EAEBEB'} />
                  Ahmedabad
                </p>
              </div>
              <div className={style.herobtn_banner}>
                <Button variant="default" onClick={() => handleScrollToSection('contact-section')}>
                  Enquire now
                </Button>
                <Button variant="default" onClick={handleDownloadBrochure}>
                  Download Brochure
                </Button>
              </div>
            </div>
          </Container>

          {showScrollToTop && (
            <IconCircleChevronUp
              size={50}
              onClick={() => handleScrollToSection('hero-section')}
              color={'#005155'}
              stroke={2}
              className={`${style.scrollToTopIcon} ${showScrollToTop ? style.showIcon : ''}`}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default HeroSection;
