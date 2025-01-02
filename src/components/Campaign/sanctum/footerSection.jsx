'use client';
import { grey_font_color } from '@/constant/FontColotConstant';
import { Container, Grid, Image, Stack, Button } from '@mantine/core';
import NextImage from 'next/image';
import MainImg from '../../../../public/img/sanctum/footer-mainLogo.png';
import LeftImg from '../../../../public/img/sanctum/left-footer.png';
import RightImg from '../../../../public/img/sanctum/right-footer.png';
import {
  HeadingFour,
  HeadingOne,
  HeadingTwo,
  SmallFont,
} from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';
import { IconPhone, IconMapPin } from '@tabler/icons-react';

function FooterSection() {
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
    <div className={style.footer_section}>
      <Image component={NextImage} src={LeftImg} radius={'md'} alt="footerImg" />
      <Image component={NextImage} src={RightImg} radius={'md'} alt="footerImg" />

      <Container size={'xl'}>
        <Image component={NextImage} src={MainImg} radius={'md'} alt="footerImg" />
        <div>
          <IconPhone size={20} color={'#005155'} />
          <a href="tel:+917878619191">+91 78786 19191</a>
        </div>
        <div>
          <IconMapPin size={20} color={'#005155'} />
          <a
             href="https://www.google.com/maps/search/?api=1&query=Opp+Dev+Kutir+2+Bungalows,+Behind+Swati+Senor,+Ambali+Gujarat+380058"
             target="_blank">
            Opp Dev Kutir 2 Bungalows, Behind Swati Senor, Ambali Gujarat 380058.
          </a>
        </div>
      </Container>
      <Container size={'xl'} className={style.footerbtn_section}>
        <div>
          <Button variant="default" onClick={() => handleScrollToSection('contact-section')}>
            Enquire now
          </Button>
          <Button variant="default" onClick={handleDownloadBrochure}>
            Download Brochure
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default FooterSection;
