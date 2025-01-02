'use client';
import { grey_font_color } from '@/constant/FontColotConstant';
import { Container, Grid, Image, Stack } from '@mantine/core';
import NextImage from 'next/image';
import SiteImg1 from '../../../../public/img/sanctum/site-Img1.jpg';
import SiteImg2 from '../../../../public/img/sanctum/site-Img2.jpg';
import SiteImg3 from '../../../../public/img/sanctum/site-Img3.jpg';
import SiteImg4 from '../../../../public/img/sanctum/site-Img4.jpg';
import LeftImg from '../../../../public/img/sanctum/left-plan.png';
import RightImg from '../../../../public/img/sanctum/right-plan.png';
import mainImg from '../../../../public/img/sanctum/main-plan-img.png';

import {
  HeadingFive,
  HeadingFour,
  HeadingOne,
  HeadingSix,
  HeadingTwo,
  SmallFont,
} from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';

function PlanSection() {
  return (
    <div id="site-section" className={style.plan_section}>
      <Image component={NextImage} src={LeftImg} radius={'md'} alt="sqftImage" />
      <Image component={NextImage} src={RightImg} radius={'md'} alt="sqftImage" />

      <Container size={'xl'}>
        <HeadingOne fontWeight={700}>SITE PLANS</HeadingOne>
       
        <Image component={NextImage} src={mainImg} radius={'md'} alt="sqftImage" />
        <HeadingTwo>4BHK TYPE-A</HeadingTwo>
        <HeadingFive>Typical Unit Plan</HeadingFive>
        
        <Stack>
          <Grid justify="center" align="center">
            <Grid.Col span={{ xs: 6, sm: 3 }} className={style.planDescription}>
              <Image component={NextImage} src={SiteImg1} width={250} height={250} radius={'md'} alt="aboutImage" />
              <HeadingFour fontWeight={700}>Ground </HeadingFour>
              <HeadingSix fontWeight={400}>Floor Plan </HeadingSix>
            </Grid.Col>
            <Grid.Col span={{ xs: 6, sm: 3 }} className={style.planDescription}>
              <Image component={NextImage} src={SiteImg2} width={250} height={250} radius={'md'} alt="aboutImage" />
              <HeadingFour fontWeight={700}>Typical </HeadingFour>
              <HeadingSix fontWeight={400}>Floor Plan </HeadingSix>
            </Grid.Col>
            <Grid.Col span={{ xs: 6, sm: 3 }} className={style.planDescription}>
              <Image component={NextImage} src={SiteImg3} width={250} height={250} radius={'md'} alt="aboutImage" />
              <HeadingFour fontWeight={700}>4BHK TYPE-B </HeadingFour>
              <HeadingSix fontWeight={400}>Typical Unit Plan</HeadingSix>
            </Grid.Col>
            <Grid.Col span={{ xs: 6, sm: 3 }} className={style.planDescription}>
              <Image component={NextImage} src={SiteImg4} width={250} height={250} radius={'md'} alt="aboutImage" />
              <HeadingFour fontWeight={700}>4BHK TYPE-c </HeadingFour>
              <HeadingSix fontWeight={400}>Typical Unit Plan </HeadingSix>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default PlanSection;
