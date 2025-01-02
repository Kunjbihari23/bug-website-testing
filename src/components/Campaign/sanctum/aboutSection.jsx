'use client';
import { grey_font_color } from '@/constant/FontColotConstant';
import { Container, Grid, Image, Stack } from '@mantine/core';
import NextImage from 'next/image';
import AboutUsImg from '../../../../public/img/sanctum/curv-img-6.webp.png';
import { HeadingFour, SmallFont } from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';

function AboutSection() {
  return (
    <div>
      <Container size={'xl'}>
        <Stack id="about-section" p={20} className={style.about_section}>
          <Grid justify="center" align="center">
            <Grid.Col span={{ xs: 12, sm: 6 }} className={style.aboutusDescription}>
              <HeadingFour fontWeight={500}>CHALLENGING THE STATUS QUO DEFYING THE NORMS </HeadingFour>
              <SmallFont fontWeight={400} color={grey_font_color}>
              In an industry often marked by conformity and standardization, Sanctum stands as a beacon of innovation, embracing the belief that every individual deserves a living space as unique as their fingerprint.
              At SANCTUM,
                <br />
                {`we don't just offer residences; we offer a canvas for self-expression, a platform for creativity, and a sanctuary where individuality thrives.`} 
              </SmallFont>
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }} className={style.aboutusImage}>
              <Image component={NextImage} src={AboutUsImg} width={250} height={250} radius={'md'} alt="aboutImage" />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default AboutSection;
