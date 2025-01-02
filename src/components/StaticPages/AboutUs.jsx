'use client';
import { Box, Container, Grid, Stack, Image } from '@mantine/core';
import React from 'react';
import {
  HeadingFive,
  HeadingFour,
  HeadingTwo,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import style from './StaticPages.module.css';
import { grey_font_color } from '@/constant/FontColotConstant';
import AboutUsImg from '../../../public/img/home/about-us-04.jpg';
import NextImage from 'next/image';

function AboutUs() {
  return (
    <div>
      <Box mx="auto" mb={20} h={100} mt={-10}>
        <div className={style.about_banner}>
          <RegularBigFont fontWeight={600} color="white">
            ABOUT US
          </RegularBigFont>
        </div>
      </Box>

      <Container size={'lg'}>
        <Stack p={20} className={style.aboutusDescription}>
          <HeadingFive fontWeight={500}>Welcome to EasyProps</HeadingFive>
          <HeadingTwo fontWeight={600}>Ahmedabad&apos;s Premier Real Estate Portal!</HeadingTwo>

          <RegularFont color={grey_font_color}>
            Welcome to EasyProps, Ahmedabad&apos;s leading real estate portal. We&apos;ve streamlined property
            transactions for seamless buying and selling experiences. Our platform, easyprops.com, offers a quick and
            efficient way to connect with a diverse audience. Advertise your property, stay informed about market
            trends, and enjoy direct connections with genuinely interested parties. With over a thousands monthly
            visitors, EasyProps is your go-to destination for hassle-free real estate transactions in Ahmedabad. Join us
            and make your property journey easy and straightforward!
          </RegularFont>
        </Stack>

        <Stack p={20} className={style.about_section}>
          <Stack pt={20}>
            <HeadingFour fontWeight={500}>EasyProps – Where Real Estate Meets Ease! </HeadingFour>
          </Stack>
          <Grid justify="center" align="center">
            <Grid.Col span={{ xs: 12, sm: 6 }} p={20}>
              <Image component={NextImage} src={AboutUsImg} width={250} height={250} radius={'md'} alt="aboutImage" />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 6 }} className={style.aboutusDescription}>
              <SmallFont fontWeight={400} color={grey_font_color}>
                Ready for a property journey without the headache? Dive into Ahmedabad&apos;s top real estate portal,
                EasyProps! We&apos;ve got the secret sauce for smooth transactions advertise, connect, and laugh off the
                hassle. With OrganicProps.com, it&apos;s like finding a home for your property while sipping chai. Join
                the fun because buying or selling your space shouldn&apos;t be rocket science. Click, Connect, and
                Chuckle Your Way to Property Bliss!
              </SmallFont>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default AboutUs;
