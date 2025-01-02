'use client';
import { Box, Container, Grid, Stack, Image, Loader } from '@mantine/core';
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
import { useGetSettings } from '@/state/settings/settings.hook';

function PrivacyPolicy() {
  const { data, isPending } = useGetSettings();

  return (
    <div>
      <Box mb={20} h={100} mt={-10}>
        <div className={style.about_banner}>
          <RegularBigFont fontWeight={600} color="white">
            PRIVACY POLICY
          </RegularBigFont>
        </div>
      </Box>

      <Container size={'lg'}>
        {isPending ? (
          <Stack align="center" m={30}>
            <Loader />
          </Stack>
        ) : (
          <Stack p={20} className={style.aboutusDescription}>
            <div dangerouslySetInnerHTML={{ __html: data.privacy_policy && data.privacy_policy }} />
          </Stack>
        )}
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
