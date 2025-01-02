import React, { useCallback, useEffect, useState } from 'react';
import style from './commonSlider.module.css';
import { Container, Skeleton, Stack } from '@mantine/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { defaultImg } from '@/constant/ImageConstant';
import {
  HeadingFive,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { heading_font_color, grey_font_color, lightgrey_font_color } from '@/constant/FontColotConstant';
import CustomPrevArrow from '@/components/SearchPage/CustomPrevArrow';
import CustomNextArrow from '@/components/SearchPage/CustomNextArrow';
import { useTrendingProjectHook } from '@/state/HomePageAPis/homePageApisHook';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import { getCookieClient } from '@/instance/getCookiesClient';
import useCityItemStore from '@/store/useCityItemStore';
import NodataFound from '../NodataFound/NodataFound';
import Link from 'next/link';

function TrendingProjects({ slidesToShow = 2, appCity, searchParams, inDetail = false, propertyCity = {} }) {
  const [isClient, setIsClient] = useState(false);
  const getCity = getCookieClient('selected_city');
  const cityInfo = getCity ? JSON.parse(getCity) : propertyCity;
  const { city: cityChange } = useCityItemStore();

  const { data: trendingPRojects, isLoading } = useTrendingProjectHook({ city: cityInfo?.value });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const trendingProjectSettings = {
    className: 'center',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    initialSlides: 0,
    rows: trendingPRojects && trendingPRojects.length > 4 ? 2 : 1,
    slidesPerRow: 1,
    slidesToShow: slidesToShow,
    nextArrow: trendingPRojects && trendingPRojects.length !== null ? <CustomNextArrow right={'-12px'} /> : null,
    prevArrow: trendingPRojects && trendingPRojects.length !== null ? <CustomPrevArrow left={'-12px'} /> : null,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: inDetail ? 1.5 : 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1.5,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container size={slidesToShow == 2 ? 'md' : 'xl'} p={'1rem'}>
      <div className={style.section_container}>
        <Stack gap={8} mb={24}>
          <Skeleton visible={isLoading}>
            <HeadingFive fontWeight={600} color={heading_font_color} textAlign={'start'}>
              Trending Projects In {isClient ? cityInfo?.label : appCity?.label}
            </HeadingFive>
          </Skeleton>
          <RegularBigFont color={grey_font_color}>Explore the top picks everyone&apos;s talking about.</RegularBigFont>
        </Stack>

        <div className={style.slider_container}>
          {trendingPRojects && trendingPRojects.length > 0 ? (
            <Slider {...trendingProjectSettings}>
              {isLoading
                ? Array(4)
                    .fill()
                    .map((_, i) => {
                      return (
                        <div key={i}>
                          <div className={style.trending_projct_item}>
                            <div className={style.trending_projct_img}>
                              <Skeleton width={120} height={120} />
                            </div>
                            <div className={style.trending_projct_details}>
                              <Stack gap={8}>
                                <div>
                                  <Skeleton h={20} />
                                  <Skeleton h={20} width={'70%'} mt={5} />
                                </div>
                                <div>
                                  <Skeleton h={20} />
                                  <Skeleton h={20} width={'50%'} mt={5} />
                                </div>
                              </Stack>
                            </div>
                          </div>
                        </div>
                      );
                    })
                : trendingPRojects?.map((data, i) => {
                    return (
                      <div key={i}>
                        <Link href={`/project-detail/${data.projectId}/${data?.projectSEOURL}`} target="_blank">
                          <div className={style.trending_projct_item}>
                            <div className={style.trending_projct_img}>
                              <Image
                                component={NextImage}
                                src={data?.filePath}
                                alt={data?.title}
                                width={144}
                                height={153}
                                fallbackSrc={defaultImg}
                              />
                            </div>

                            <div className={style.trending_projct_details}>
                              <Stack gap={8}>
                                <div>
                                  <RegularBigFont fontWeight={500} lineClamp={2}>
                                    {data?.title}
                                  </RegularBigFont>
                                  <SmallFont color={lightgrey_font_color} lineClamp={1}>
                                    {data?.userName}
                                  </SmallFont>
                                </div>
                                <div>
                                  <SmallFont color={grey_font_color}>{data?.noOfTower} No of tower</SmallFont>
                                  <SmallFont color={lightgrey_font_color}>
                                    {data?.landMark}, {data?.cityName}
                                  </SmallFont>
                                </div>
                                <RegularFont fontWeight={500} color={grey_font_color}>
                                  {data?.avaibilityStatus}
                                </RegularFont>
                              </Stack>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
            </Slider>
          ) : (
            <NodataFound />
          )}
        </div>
      </div>
    </Container>
  );
}

export default TrendingProjects;
