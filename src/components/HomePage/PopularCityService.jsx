import { Container, Grid, Group, Skeleton, Stack } from '@mantine/core';
import React, { useCallback } from 'react';
import style from './home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  discoverCity1,
  discoverCity2,
  defaultImg,
  registerProperty,
  buyPlotsOrLand,
  pgAndColiving,
} from '@/constant/ImageConstant';
import { grey_font_color } from '@/constant/FontColotConstant';
import {
  HeadingFive,
  HeadingSix,
  RegularBigFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import { usePopularCitiesProperty } from '@/state/HomePageAPis/homePageApisHook';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';
import { useRouter } from 'next/navigation';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';

function PopularCityService({ searchParams }) {
  const { data: popularPropertyList, isPending: popularListPending } = usePopularCitiesProperty();
  const router = useRouter();

  const checkUrl = useCallback(
    (data) => {
      const updatedSearchParams = {
        ...searchParams,
        city: data?.cityId ?? '',
        LANDMARK: data?.cityName ?? '',
        RENTORSELL: searchParams.RENTORSELL ?? '1',
        PropertyCategoryID: searchParams.PropertyCategoryID ?? '2',
        project_property: searchParams.project_property ?? '0',
      };

      return new URLSearchParams(updatedSearchParams).toString();
    },
    [searchParams]
  );

  const handleCityClick = (data) => {
    const bashUrl = parseURLParameters(
      searchParams.project_property ?? '0',
      searchParams.RENTORSELL ?? '1',
      searchParams.PropertyCategoryID ?? '2',
      data?.cityName ?? ''
    );

    router.push(`${bashUrl}?${checkUrl(data)}`);
  };

  var popularCity_PropertySettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    rows: popularPropertyList && popularPropertyList.length > 6 ? 2 : 1,
    slidesPerRow: 1,
    nextArrow: popularPropertyList && popularPropertyList.length > 4 && <CustomNextArrow right={'-12px'} />,
    prevArrow: popularPropertyList && popularPropertyList.length > 4 && <CustomPrevArrow left={'-12px'} />,
    responsive: [
      {
        breakpoint: 1252,
        settings: {
          slidesToShow: 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1.5,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={style.recent_property_container}>
        <Container size="xl">
          {/* Popular Cities properties */}
          <div className={style.project_container}>
            <Stack gap={8} mb={24}>
              <HeadingFive fontWeight={600} textAlign={'start'}>
                Explore Real Estate in Popular Cities
              </HeadingFive>
              <RegularBigFont color={grey_font_color}>
                Vibrant Urban Living: Discover Real Estate Opportunities in Major Cities
              </RegularBigFont>
            </Stack>

            <div className={style.slider_container}>
              <Slider {...popularCity_PropertySettings}>
                {popularListPending ? (
                  Array(6)
                    .fill()
                    .map((data, i) => {
                      return (
                        <div key={i}>
                          <div className={style.popular_city_propty_item}>
                            <Group gap={14} wrap="nowrap">
                              <div className={style.popular_city_propty_img}>
                                <Skeleton width={127} height={105} />
                              </div>
                              <Stack gap={4}>
                                <Skeleton height={16} width={130} radius="xl" />
                                <Skeleton height={16} width={110} radius="xl" />
                              </Stack>
                            </Group>
                          </div>
                        </div>
                      );
                    })
                ) : popularPropertyList && popularPropertyList.length !== 0 ? (
                  popularPropertyList.map((data, i) => {
                    return (
                      <div key={data?.cityId}>
                        <div className={style.popular_city_propty_item}>
                          <Group
                            gap={14}
                            wrap="nowrap"
                            onClick={() => handleCityClick(data)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className={style.popular_city_propty_img}>
                              <Image
                                component={NextImage}
                                src={data?.images}
                                alt={data?.cityName}
                                width={127}
                                height={105}
                                fallbackSrc={defaultImg}
                              />
                            </div>
                            <div className={style.popular_city_propty_details}>
                              <Stack gap={4}>
                                <RegularBigFont fontWeight={500}>{data?.cityName}</RegularBigFont>
                                <SmallFont color={grey_font_color}>{data?.propertycount} Properties</SmallFont>
                              </Stack>
                            </div>
                          </Group>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <NodataFound discription="Currently No Agent Data Available" />
                )}
              </Slider>
            </div>
          </div>

          {/* our services section */}
          <div className={style.project_container}>
            <div className={style.our_services_img}></div>
            <div className={style.our_services_inner}>
              <Stack gap={16} maw={525}>
                <HeadingFive fontWeight={600} textAlign={'start'}>
                  Discover our services.
                </HeadingFive>
                <RegularBigFont color={grey_font_color}>
                  Connect with Easyprops for premium agents and verified listings, finding your ideal property fast.
                </RegularBigFont>
              </Stack>

              <Grid mt={60}>
                <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
                  <div className={style.ourService_item}>
                    <Group wrap="nowrap" h={'100%'}>
                      <div className={style.ourService_card_img}>
                        <Image
                          component={NextImage}
                          src={registerProperty}
                          alt="Buying a home"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className={style.popular_city_propty_details}>
                        <Stack gap={8}>
                          <HeadingSix fontWeight={500}>Buying a home</HeadingSix>
                          <SmallFont color={grey_font_color}>
                            Apartment, lands, builder floors. villas and more
                          </SmallFont>
                        </Stack>
                      </div>
                    </Group>
                  </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
                  <div className={style.ourService_item}>
                    <Group wrap="nowrap">
                      <div className={style.ourService_card_img}>
                        <Image
                          component={NextImage}
                          src={discoverCity2}
                          alt="Lease a commercial property"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className={style.popular_city_propty_details}>
                        <Stack gap={8}>
                          <HeadingSix fontWeight={500}>Lease a commercial property</HeadingSix>
                          <SmallFont color={grey_font_color}>
                            Residential Plots, Agricultural Farm lands, Inst. Lands and more
                          </SmallFont>
                        </Stack>
                      </div>
                    </Group>
                  </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
                  <div className={style.ourService_item}>
                    <Group wrap="nowrap">
                      <div className={style.ourService_card_img}>
                        <Image
                          component={NextImage}
                          src={discoverCity1}
                          alt="Buying a commercial property"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className={style.popular_city_propty_details}>
                        <Stack gap={8}>
                          <HeadingSix fontWeight={500}>Buying a commercial property</HeadingSix>
                          <SmallFont color={grey_font_color}>
                            Residential Plots, Agricultural Farm lands, Inst. Lands and more
                          </SmallFont>
                        </Stack>
                      </div>
                    </Group>
                  </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
                  <div className={style.ourService_item}>
                    <Group wrap="nowrap">
                      <div className={style.ourService_card_img}>
                        <Image
                          component={NextImage}
                          src={buyPlotsOrLand}
                          alt="buy-plots-or-land"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className={style.popular_city_propty_details}>
                        <Stack gap={8}>
                          <HeadingSix fontWeight={500}>Buy Plots/Land</HeadingSix>
                          <SmallFont color={grey_font_color}>
                            Residential Plots, Agricultural Farm lands, Inst. Lands and more
                          </SmallFont>
                        </Stack>
                      </div>
                    </Group>
                  </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
                  <div className={style.ourService_item}>
                    <Group wrap="nowrap">
                      <div className={style.ourService_card_img}>
                        <Image
                          component={NextImage}
                          src={pgAndColiving}
                          alt="pg-and-co-living-img"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className={style.popular_city_propty_details}>
                        <Stack gap={8}>
                          <HeadingSix fontWeight={500}>Pg and Co-living</HeadingSix>
                          <SmallFont color={grey_font_color}>
                            Apartment, lands, builder floors. villas and more
                          </SmallFont>
                        </Stack>
                      </div>
                    </Group>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default PopularCityService;
