'use client';
import { grey_font_color } from '@/constant/FontColotConstant';
import { Container, Grid, Image, Stack } from '@mantine/core';
import NextImage from 'next/image';
import SqftImg1 from '../../../../public/img/sanctum/amenities1.svg';
import SqftImg2 from '../../../../public/img/sanctum/amenities2.svg';
import SqftImg3 from '../../../../public/img/sanctum/amenities3.svg';
import SqftImg4 from '../../../../public/img/sanctum/amenities4.svg';
import SqftImg5 from '../../../../public/img/sanctum/amenities5.svg';
import SqftImg6 from '../../../../public/img/sanctum/amenities6.svg';
import SqftImg7 from '../../../../public/img/sanctum/amenities7.svg';
import SqftImg8 from '../../../../public/img/sanctum/amenities8.svg';

import LeftImg from '../../../../public/img/sanctum/left-amenities.png';
import RightImg from '../../../../public/img/sanctum/right-amenities.png';
import {
  HeadingFour,
  HeadingOne,
  HeadingTwo,
  SmallFont,
} from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';

function AmenitieSection() {
  return (
    <div className={style.amenities_section}>
      <Image component={NextImage} src={LeftImg} radius={'md'} alt="sqftImage" />
      <Image component={NextImage} src={RightImg} radius={'md'} alt="sqftImage" />

      <Container size={'xl'}>
        <HeadingOne fontWeight={700}>RECREATIONAL HUB</HeadingOne>
        <HeadingTwo fontWeight={700}>AMENITIES WHICH EXCEED EXPECTATIONS</HeadingTwo>
        <p>
        Our meticulously crafted amenities bring a shift to your mundane routine, helping you step out of your comfort zone to enhance both your physical and mental health.

        </p>
        <Stack p={20}>
          <Grid justify="center" align="center">
            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg1} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>VISITOR’S WAITING LOUNGE</HeadingFour>
            </Grid.Col>

            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg2} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>WELL LANDSCAPED GARDEN</HeadingFour>
            </Grid.Col>

            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg3} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>MULTIPURPOSE HOME THEATRE</HeadingFour>
            </Grid.Col>
            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg4} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>KIDS PLAY AREA</HeadingFour>
            </Grid.Col>
            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg5} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>SWIMMING POOL</HeadingFour>
            </Grid.Col>

            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg6} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>SMART SECURITY SYSTEM</HeadingFour>
            </Grid.Col>

            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg7} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>INDOOR GAMES</HeadingFour>
            </Grid.Col>
            <Grid.Col span={{ base: 6, xs: 4, sm: 3 }}>
              <Image component={NextImage} src={SqftImg8} width={70} height={70} radius={'md'} alt="sqftImage" />
              <HeadingFour fontWeight={400}>GYMNASIUM</HeadingFour>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default AmenitieSection;
