'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Badge, Button, Card, Container, em, Group, Skeleton, Stack, Text } from '@mantine/core';
import style from './home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { featured1, featured3, featured2, defaultImg } from '@/constant/ImageConstant';
import {
  HeadingFive,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { heading_font_color, grey_font_color, white_color, info_blue_color } from '@/constant/FontColotConstant';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import { useFeatureCollectionHook } from '@/state/HomePageAPis/homePageApisHook';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import { getCookieClient } from '@/instance/getCookiesClient';
import useCityItemStore from '@/store/useCityItemStore';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';

function FeatureAndTrendingProjects({ appCity, searchParams }) {
  const [isClient, setIsClient] = useState(false);
  const isExtraSmall = useMediaQuery(`(max-width: ${em(576)})`);
  const getCity = getCookieClient('selected_city');
  const { city: cityChange } = useCityItemStore();

  const cityInfo = useMemo(() => {
    return getCity ? JSON.parse(getCity) : {};
  }, [getCity]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentCity = useMemo(() => {
    return cityInfo?.value ?? appCity?.value ?? cityChange?.value;
  }, [cityInfo, appCity, cityChange]);

  const { data: featureDataCollections, isLoading } = useFeatureCollectionHook({
    city: currentCity,
  });

  const featuredCollecSettings = useMemo(
    () => ({
      dots: false,
      infinite: featureDataCollections && featureDataCollections.length > 3,
      speed: 500,
      centerMode: featureDataCollections && featureDataCollections.length > 3,
      centerPadding: '70px',
      slidesToShow: 3,
      nextArrow:
        featureDataCollections && featureDataCollections.length ? (
          <CustomNextArrow right={isExtraSmall ? '-10px' : '-25px'} />
        ) : null,
      prevArrow:
        featureDataCollections && featureDataCollections.length ? (
          <CustomPrevArrow left={isExtraSmall ? '-10px' : '-25px'} />
        ) : null,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            centerPadding: '30px',
          },
        },
        {
          breakpoint: 650,
          settings: {
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [featureDataCollections]
  );

  return (
    <div className={style.recent_property_container}>
      <Container size="xl">
        <div className={style.explr_propty_type}>
          <Stack gap={8} mb={24}>
            <Skeleton visible={isLoading}>
              <HeadingFive fontWeight={600} color={heading_font_color} textAlign={'start'}>
                Featured Collections In {isClient ? cityInfo?.label || cityChange?.label : appCity.label}
              </HeadingFive>
              <RegularBigFont color={grey_font_color}>Handpick projects for you</RegularBigFont>
            </Skeleton>
          </Stack>

          <Slider {...featuredCollecSettings}>
            {isLoading ? (
              Array(3)
                .fill()
                .map((_, index) => (
                  <div key={`Featured_Collections_${index}`}>
                    <Card shadow="sm" radius="md" padding={0} mx={8} my={2}>
                      <Stack gap={10} mb={4}>
                        <Skeleton h={200} />
                        <Skeleton h={20} w={'100%'} />
                        <Skeleton h={20} w={'100%'} />
                      </Stack>
                    </Card>
                  </div>
                ))
            ) : featureDataCollections && featureDataCollections.length !== 0 ? (
              featureDataCollections.map((data, index) => (
                <div key={index}>
                  <div className={style.featured_collec_item}>
                    <Link href={`/project-detail/${data.projectId}/${data?.projectSEOURL}`} target="_blank">
                      <div className={style.featured_collec_img}>
                        <Image
                          src={data?.filePath}
                          alt={data?.title}
                          width={333}
                          height={310}
                          component={NextImage}
                          fallbackSrc={defaultImg}
                        />
                      </div>
                      <div className={style.featured_collec_details}>
                        <HeadingSix fontWeight={700} color={white_color} textAlign="center" lineClamp={2}>
                          {data?.title}
                        </HeadingSix>
                        <RegularFont fontWeight={500} color={white_color} textAlign="center" lineClamp={1}>
                          {data?.description}
                        </RegularFont>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className={style.no_data_container}>
                <NodataFound />
              </div>
            )}
          </Slider>
        </div>
      </Container>
    </div>
  );
}

export default FeatureAndTrendingProjects;
