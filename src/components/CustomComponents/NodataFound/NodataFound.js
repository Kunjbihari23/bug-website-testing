import React from 'react';
import style from './NodataFound.module.css';
import Image from 'next/image';
import nodataImg from '../../../../public/img/empty-data-not-found-illustration.jpg';
import { Card, Stack } from '@mantine/core';
import { RegularBigFont } from '../TypographyComponent/HeadingComponents';

function NodataFound({ discription = '' }) {
  return (
    <Card w={'100%'} m={5}>
      <Stack gap={10} align="center">
        <Image src={nodataImg} alt="empty-data" width={150} height={150} />
        <Stack>
          <RegularBigFont fontWeight={500} color={'#091E42'}>
            {discription !== '' ? discription : 'Currently No Data Available'}
          </RegularBigFont>
        </Stack>
      </Stack>
    </Card>
  );
}

export default NodataFound;
