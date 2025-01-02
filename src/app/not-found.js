'use client';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import { HeadingSix, HeadingTwo } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { lightgrey_font_color } from '@/constant/FontColotConstant';
import { Card, Center, Flex, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import errorImg from '../../public/img/404-error.png';
import Link from 'next/link';

function NotFound() {
  return (
    <>
      <Card w={'100%'} h={'100vh'} withBorder radius={'md'} p={30}>
        <Flex gap={14} direction="column" h={'100%'} align={'center'} justify={'center'}>
          <Image src={errorImg} alt="404-page-not-found" width={300} height={300} />
          <Stack gap={16}>
            <HeadingTwo textAlign="center" fontWeight={500}>
              Oops Page Not Found!!
            </HeadingTwo>
            <HeadingSix color={lightgrey_font_color} textAlign="center">
              The Page You Are Trying to Open Does Not Exist!
            </HeadingSix>
            <Center>
              <Link href="/">
                <CustomePrimaryButton btnWidth={200} icon={<IconArrowLeft />}>
                  Return To Home
                </CustomePrimaryButton>
              </Link>
            </Center>
          </Stack>
        </Flex>
      </Card>
    </>
  );
}

export default NotFound;
