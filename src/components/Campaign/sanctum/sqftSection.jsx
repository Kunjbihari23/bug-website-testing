'use client';
import { grey_font_color } from '@/constant/FontColotConstant';
import { Container, Grid, Image, Stack } from '@mantine/core';
import NextImage from 'next/image';
import SqftImg from '../../../../public/img/sanctum/sqftIcn.svg';
import LeftSqftImg from '../../../../public/img/sanctum/left-vector.png';
import RightSqftImg from '../../../../public/img/sanctum/right-vector.png';
import { HeadingFour, SmallFont } from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';

function SqftSection() {
  return (
    <div className={style.sqft_section}>
      <Image component={NextImage} src={LeftSqftImg} width={70} height={70} radius={'md'} alt="sqftImage" />
      <Image component={NextImage} src={RightSqftImg} width={70} height={70} radius={'md'} alt="sqftImage" />

      <Container size={'xl'}>
        <Stack p={20}>
          <Grid justify="center" align="center">
            <Grid.Col span={{ xs: 12, sm: 3 }}>
              <Image component={NextImage} src={SqftImg} width={70} height={70} radius={'md'} alt="sqftImage" />
              <p>Type - A</p>
              <HeadingFour fontWeight={800}>3585 SQ. FT.</HeadingFour>
            </Grid.Col>
            <Grid.Col span={{ xs: 0, sm: 1 }} style={{ display: 'flex', justifyContent: 'center' }}>
              <hr />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 3 }}>
              <Image component={NextImage} src={SqftImg} width={70} height={70} radius={'md'} alt="sqftImage" />
              <p>Type - B</p>
              <HeadingFour fontWeight={800}>3220 SQ. FT.</HeadingFour>
            </Grid.Col>
            <Grid.Col span={{ xs: 0, sm: 1 }} style={{ display: 'flex', justifyContent: 'center' }}>
              <hr />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 3 }}>
              <Image component={NextImage} src={SqftImg} width={70} height={70} radius={'md'} alt="sqftImage" />
              <p>Type - C</p>
              <HeadingFour fontWeight={800}>3145 SQ. FT.</HeadingFour>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default SqftSection;
