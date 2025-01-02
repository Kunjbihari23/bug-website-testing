'use client';
import { grey_font_color } from '@/constant/FontColotConstant';
import { Container, Grid, Image, Stack } from '@mantine/core';
import NextImage from 'next/image';
import GalleryImg1 from '../../../../public/img/sanctum/gallery1.png';
import GalleryImg2 from '../../../../public/img/sanctum/gallery2.png';
import GalleryImg3 from '../../../../public/img/sanctum/gallery3.png';
import GalleryImg4 from '../../../../public/img/sanctum/gallery4.png';
import GalleryImg5 from '../../../../public/img/sanctum/gallery5.png';

import { HeadingFour, SmallFont } from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';

function GallerySection() {
  return (
    <div className={style.gallery_section}>
      <Container size={'xl'}>
        <HeadingFour fontWeight={700}>Photo Gallery</HeadingFour>
      </Container>

      <Stack p={20}>
        <Grid justify="center" align="center">
          <Grid.Col span={{ xs: 12, sm: 6 }}>
            <Image component={NextImage} src={GalleryImg1} width={100} height={100} radius={'md'} alt="GalleryImg" />
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6 }}>
            <Stack>
              <Grid justify="center" align="center">
                <Grid.Col span={{ xs: 6, sm: 6 }}>
                  <Image
                    component={NextImage}
                    src={GalleryImg2}
                    width={100}
                    height={100}
                    radius={'md'}
                    alt="GalleryImg"
                  />
                </Grid.Col>
                <Grid.Col span={{ xs: 6, sm: 6 }}>
                  <Image
                    component={NextImage}
                    src={GalleryImg3}
                    width={100}
                    height={100}
                    radius={'md'}
                    alt="GalleryImg"
                  />
                </Grid.Col>
                <Grid.Col span={{ xs: 6, sm: 6 }}>
                  <Image
                    component={NextImage}
                    src={GalleryImg4}
                    width={100}
                    height={100}
                    radius={'md'}
                    alt="GalleryImg"
                  />
                </Grid.Col>
                <Grid.Col span={{ xs: 6, sm: 6 }}>
                  <Image
                    component={NextImage}
                    src={GalleryImg5}
                    width={100}
                    height={100}
                    radius={'md'}
                    alt="GalleryImg"
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </div>
  );
}

export default GallerySection;
