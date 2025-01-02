'use client';
import { grey_font_color } from '@/constant/FontColotConstant';
import { Container, Grid, Image, Stack } from '@mantine/core';
import NextImage from 'next/image';
import FeatureImg from '../../../../public/img/sanctum/features.png';
import FeatureIcn1 from '../../../../public/img/sanctum/feature1.svg';
import FeatureIcn2 from '../../../../public/img/sanctum/feature2.svg';
import FeatureIcn3 from '../../../../public/img/sanctum/feature3.svg';
import FeatureIcn4 from '../../../../public/img/sanctum/feature4.svg';

import { HeadingFour, SmallFont } from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';

function FeatureSection() {
  return (
    <div>
      <Container size={'xl'}>
        <Stack p={20} className={style.Feature_section}>
          <Grid justify="center" align="center">
            <Grid.Col span={{ xs: 12, sm: 6 }} className={style.FeatureDescription}>
              <div>
                <Image component={NextImage} src={FeatureIcn1} radius={'md'} alt="aboutImage" />
                <div>
                  <HeadingFour fontWeight={700}>Kids love to get messy? </HeadingFour>
                  <SmallFont fontWeight={400}>Give them space to learn. explore & grow!</SmallFont>
                </div>
              </div>
              <div>
                <Image component={NextImage} src={FeatureIcn2} radius={'md'} alt="aboutImage" />
                <div>
                  <HeadingFour fontWeight={700}>Enjoy hosting your guests? </HeadingFour>
                  <SmallFont fontWeight={400}>Expand living room space & keep the party going!</SmallFont>
                </div>
              </div>
              <div>
                <Image component={NextImage} src={FeatureIcn3} radius={'md'} alt="aboutImage" />
                <div>
                  <HeadingFour fontWeight={700}>fancy a long bath at the end of day? </HeadingFour>
                  <SmallFont fontWeight={400}>Extend your bathroom to accommodate a bathtub & relax!</SmallFont>
                </div>
              </div>
              <div>
                <Image component={NextImage} src={FeatureIcn4} radius={'md'} alt="aboutImage" />
                <div>
                  <HeadingFour fontWeight={700}>DON’T NEED FOUR BEDROOMS? </HeadingFour>
                  <SmallFont fontWeight={400}>Combine two & get yourself a big master room!</SmallFont>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }} className={style.FeatureusImage}>
              <Image component={NextImage} src={FeatureImg} radius={'md'} alt="aboutImage" />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default FeatureSection;
