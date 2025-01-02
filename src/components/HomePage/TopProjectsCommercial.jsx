import { Card, Container, Grid, GridCol, Group, Skeleton, Stack, em, Image } from '@mantine/core';
import nextImage from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import style from './home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { commercial1, commercial2 } from '@/constant/ImageConstant';
import { grey_font_color, lightgrey_font_color, heading_dark_font } from '@/constant/FontColotConstant';
import {
  HeadingFive,
  HeadingFour,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import { useMediaQuery } from '@mantine/hooks';
import { useTopProjectHook } from '@/state/HomePageAPis/homePageApisHook';
import { getCookieClient } from '@/instance/getCookiesClient';
import useCityItemStore from '@/store/useCityItemStore';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';

function TopProjectsCommercial({ appCity, searchParams }) {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery(`(max-width: ${em(992)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const { city: cityChange, change: changeCity } = useCityItemStore();
  const getCity = getCookieClient('selected_city');
  const cityInfo = useMemo(() => {
    return getCity ? JSON.parse(getCity) : appCity;
  }, [getCity]);
  const router = useRouter();

  const [prevCity, setPrevCity] = useState(cityInfo?.value);

  const { data: topProjectData, isLoading, refetch } = useTopProjectHook({ city: cityInfo?.value });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const constructSearchParams = useCallback(
    (data) => {
      const params = new URLSearchParams(searchParams);
      params.set('city', params.get('city') || cityInfo?.value || '');
      params.set('LANDMARK', params.get('LANDMARK') || cityInfo?.label || '');
      params.set('local', params.get('local') || '');
      params.set('RENTORSELL', params.get('RENTORSELL') || '1');
      params.set('PropertyCategoryID', params.get('PropertyCategoryID') || '2');
      params.set('project_property', params.get('project_property') || '0');

      if (data === 'topProject') {
        params.set('project_property', '1');
      } else if (data === 'Buy_commercial') {
        params.set('PropertyCategoryID', '1');
      } else if (data === 'Rent_commercial') {
        params.set('RENTORSELL', '2');
        params.set('PropertyCategoryID', '1');
      }

      const bashUrl = parseURLParameters(
        '0',
        data === 'Rent_commercial' ? '2' : '1',
        '1',
        cityInfo?.label,
        params.get('local') || ''
      );

      if (data === 'topProject') {
        return params;
      } else {
        return { bashUrl, params };
      }
    },
    [searchParams, cityInfo]
  );

  var settings = {
    dots: false,
    infinite: topProjectData && topProjectData.length > 2 ? true : false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: isDesktop ? (
      <CustomNextArrow right={'-12px'} />
    ) : topProjectData && topProjectData.length > 2 ? (
      <CustomNextArrow right={'-12px'} />
    ) : (
      ''
    ),

    prevArrow: isDesktop ? (
      <CustomNextArrow right={'-12px'} />
    ) : topProjectData && topProjectData.length > 2 ? (
      <CustomNextArrow right={'-12px'} />
    ) : (
      ''
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
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
          <div className={style.project_container}>
            <Stack gap={8} mb={24}>
              <HeadingFive fontWeight={600} textAlign={'start'}>
                Top Projects In {isClient ? cityInfo?.label : appCity.label}
              </HeadingFive>
              <RegularBigFont color={grey_font_color}>
                Best developers in {isClient ? cityInfo?.label : appCity.label} to explore
              </RegularBigFont>
            </Stack>

            <div className={style.slider_container}>
              {topProjectData && topProjectData.length !== 0 ? (
                <Slider {...settings}>
                  {isLoading
                    ? Array(2)
                        .fill()
                        .map((data, index) => {
                          return (
                            <Group span={{ base: 12, sm: 6 }} key={index}>
                              <div className={style.top_project_item}>
                                <Skeleton width={630} height={300} />
                                <Skeleton h={20} mt={14} mx={10} />
                                <Skeleton h={20} mt={14} mx={10} />
                                <Skeleton h={20} my={8} width={'50%'} mx={10} />
                              </div>
                            </Group>
                          );
                        })
                    : topProjectData &&
                      topProjectData.map((data, index) => (
                        <Group key={`TopProject${index}`}>
                          <Card padding="lg" radius="md" withBorder me={isMobile ? 5 : 20} mt={10}>
                            <Link href={`/project-detail/${data.projectId}/${data?.projectSEOURL}`} target="_blank">
                              <Card.Section style={{ overflow: 'hidden' }}>
                                <Image
                                  component={nextImage}
                                  src={data.filePath}
                                  width={200}
                                  height={isMobile ? 200 : 320}
                                  alt="Norway"
                                  className={style.propertyImg_topProject}
                                />
                              </Card.Section>

                              <div className={style.top_project_details}>
                                <div className={style.top_project_left}>
                                  <Stack gap={16}>
                                    <div>
                                      <RegularBigFont fontWeight={500}>
                                        {data?.landMark} ,{data?.cityName}
                                      </RegularBigFont>
                                      <RegularFont color={lightgrey_font_color} textAlign="start">
                                        by {data?.userName}
                                      </RegularFont>
                                    </div>
                                    <div>
                                      <RegularFont lineClamp={1}>{data?.title}</RegularFont>
                                      <RegularFont color={lightgrey_font_color}>
                                        {data?.landMark} ,{data?.cityName}
                                      </RegularFont>
                                    </div>
                                  </Stack>
                                </div>
                              </div>
                            </Link>
                          </Card>
                        </Group>
                      ))}
                </Slider>
              ) : (
                <NodataFound />
              )}
            </div>
          </div>

          <div className={style.project_container}>
            <Stack gap={8} mb={24}>
              <HeadingFive fontWeight={600} textAlign={'start'}>
                Choose from a wide variety of commercial properties
              </HeadingFive>
              <RegularBigFont color={grey_font_color}>
                Leading Developers in {isClient ? cityInfo?.label : appCity.label}
              </RegularBigFont>
            </Stack>
            <div className={style.slider_container}>
              <Grid>
                <GridCol span={{ base: 12, sm: 6 }}>
                  <div className={style.commercial_propty_item}>
                    <div className={style.commercial_propty_img}>
                      <Image
                        component={nextImage}
                        src={commercial1}
                        alt="commercial-property"
                        width={630}
                        height={isMobile ? 300 : 400}
                      />
                    </div>
                    <div className={style.commercial_propty_details}>
                      <Stack
                        gap={8}
                        mb={24}
                        align={isMobile && 'center'}
                        justify={isMobile && 'center'}
                        className={style.heading_text_Wrapper}
                      >
                        <HeadingFour fontWeight={600} color={heading_dark_font}>
                          Buy a Commercial Properties
                        </HeadingFour>
                        <RegularBigFont>
                          Discover commercial properties in sought-after areas, ideal for businesses seeking high
                          visibility and foot traffic.
                        </RegularBigFont>
                      </Stack>
                      <CustomePrimaryButton
                        size={!isDesktop ?? 'large'}
                        onClick={() => {
                          const updatedParams = constructSearchParams('Buy_commercial');

                          router.push(`${updatedParams.bashUrl}?${updatedParams.params.toString()}`);
                        }}
                      >
                        Explore Buying Commercial
                      </CustomePrimaryButton>
                    </div>
                  </div>
                </GridCol>
                <GridCol span={{ base: 12, sm: 6 }}>
                  <div className={style.commercial_propty_item}>
                    <div className={style.commercial_propty_img}>
                      <Image
                        component={nextImage}
                        src={commercial2}
                        alt="commercial-property"
                        width={630}
                        height={isMobile ? 300 : 400}
                      />
                    </div>
                    <div className={style.commercial_propty_details}>
                      <Stack
                        gap={8}
                        mb={24}
                        align={isMobile && 'center'}
                        justify={isMobile && 'center'}
                        className={style.heading_text_Wrapper}
                      >
                        <HeadingFour fontWeight={600} color={heading_dark_font}>
                          Rent a Commercial Properties
                        </HeadingFour>
                        <RegularBigFont>
                          Find the perfect space that fits your business needs, whether it&apos;s an office, retail, or
                          industrial property.
                        </RegularBigFont>
                      </Stack>
                      <CustomePrimaryButton
                        size={!isDesktop ?? 'large'}
                        onClick={() => {
                          const updatedParams = constructSearchParams('Rent_commercial');
                          router.push(`${updatedParams.bashUrl}?${updatedParams.params.toString()}`);
                        }}
                      >
                        Explore Rent Commercial
                      </CustomePrimaryButton>
                    </div>
                  </div>
                </GridCol>
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default TopProjectsCommercial;
