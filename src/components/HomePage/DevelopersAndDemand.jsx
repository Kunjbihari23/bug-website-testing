import React, { useState } from 'react';
import { Anchor, Button, Card, Container, Grid, Group, List, Progress, Stack, Text } from '@mantine/core';
import style from './home.module.css';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import developer1 from '../../../public/img/home/kausar-developers-img.png';
import developer2 from '../../../public/img/home/kausar-developers-img2.png';
import developerProperty1 from '../../../public/img/home/kausar-al-hamd-42-img1.png';
import {
  ExtraSmallFont,
  HeadingFive,
  HeadingFour,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import {
  grey_font_color,
  info_blue_color,
  lightgrey_font_color,
  secondary_dark,
  white_color,
} from '@/constant/FontColotConstant';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import { getCookieClient } from '@/instance/getCookiesClient';
import useCityItemStore from '@/store/useCityItemStore';

function DevelopersAndDemand() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const getCity = getCookieClient('selected_city');
  // const cityInfo = getCity ? JSON.parse(getCity) : {};

  const { city: cityInfo, change: changeCity } = useCityItemStore();

  const futureDevelopmentSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <CustomNextArrow right={'-12px'} currentSlide={currentSlide} />,
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} left={'-12px'} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var demandInCitycSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <CustomNextArrow right={'-30px'} currentSlide={currentSlide} />,
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} left={'-30px'} />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '80px',
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className={style.recent_property_container}>
      <Container size="xl">
        {/* future developer sectoion */}
        <div className={style.explr_propty_type}>
          <Stack gap={8} mb={24}>
            <HeadingFive fontWeight={600} textAlign={'start'}>
              Featured Developers in Ahemdabad
            </HeadingFive>
            <RegularBigFont color={grey_font_color}>
              Leading Developers in {cityInfo?.label ?? 'Ahmedabad'}
            </RegularBigFont>
          </Stack>
          <div className={style.slider_container}>
            <Slider {...futureDevelopmentSettings} className="custom_spacing_slider">
              {Array(4)
                .fill()
                .map((data, i) => {
                  return (
                    <div key={i}>
                      <div className={style.featured_dev_inner}>
                        <Stack gap={16}>
                          <Group gap={30} wrap="nowrap">
                            <Image src={developer1} alt="future-developer" width={105} height={83} />
                            <div className={style.featured_dev_top_inner}>
                              <Stack gap={16}>
                                <RegularFont fontWeight={500}>Kausar Developers</RegularFont>
                                <Group justify="space-between">
                                  <Stack gap={4}>
                                    <SmallFont fontWeight={500}>2009</SmallFont>
                                    <span>Year estd.</span>
                                  </Stack>
                                  <Stack gap={4}>
                                    <SmallFont fontWeight={500}>2</SmallFont>
                                    <span>Projects</span>
                                  </Stack>
                                </Group>
                              </Stack>
                            </div>
                          </Group>
                          <Stack gap={8}>
                            <SmallFont color={grey_font_color}>
                              <Text inherit span lineClamp={4}>
                                The Kausar Al Hamd 42 by Kausar Developers sounds like a promising residential project.
                                Here&apos;s a brief overview of the amenities and features it ...
                              </Text>
                            </SmallFont>
                            <Anchor
                              href="https://mantine.dev/"
                              target="_blank"
                              underline="always"
                              className={style.developer_site_link}
                            >
                              <RegularFont fontWeight={500} color={secondary_dark}>
                                Kausar Developers
                              </RegularFont>
                            </Anchor>
                            <div className={style.featured_dev_img_box}>
                              <Image
                                src={developerProperty1}
                                alt="future-developer-property"
                                width={285}
                                height={235}
                              />
                              <div className={style.featured_dev_details}>
                                <SmallFont fontWeight={500} color={white_color}>
                                  Kausar Al Hamd 42 By Kausar Develop..
                                </SmallFont>
                                <ExtraSmallFont fontWeight={300} color={white_color}>
                                  Juhapura, Ahmedabad
                                </ExtraSmallFont>
                                <RegularBigFont fontWeight={500} color={white_color}>
                                  40 L - 1.80 cr
                                </RegularBigFont>
                              </div>
                            </div>
                          </Stack>
                        </Stack>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>

        {/* demand in city section */}
        {/* <div className={style.explr_propty_type}>
          <Stack gap={8} mb={24}>
            <HeadingFive fontWeight={600} textAlign={'start'}>
              Demand in {cityInfo?.label}
            </HeadingFive>
            <RegularBigFont color={grey_font_color}>Where are buyers looking in Ahmedabad?</RegularBigFont>
          </Stack>
          <div className={style.demandInCity_container}>
            <div className={style.demand_slider}>
              <Slider {...demandInCitycSettings} className="custom_spacing_slider">
                {Array(4)
                  .fill()
                  .map((data, i) => {
                    return (
                      <div key={i}>
                        <div className={style.location_demand_card}>
                          <Stack gap={24}>
                            <div>
                              <HeadingSix fontWeight={500}>Apartments</HeadingSix>
                              <RegularFont color={grey_font_color}>
                                Top searched neighborhoods for flats/apartments.
                              </RegularFont>
                            </div>
                            <List
                              spacing={24}
                              size="sm"
                              classNames={{
                                itemLabel: style.demand_list_lable,
                                itemWrapper: style.demand_list_wrapeer,
                              }}
                            >
                              <List.Item>
                                <Stack gap={8}>
                                  <Group justify="space-between">
                                    <RegularBigFont>1. Prahalad Nagar</RegularBigFont>
                                    <SmallFont color={lightgrey_font_color}>24% Searches</SmallFont>
                                  </Group>
                                  <Progress color={info_blue_color} size="sm" value={24} animated />
                                </Stack>
                              </List.Item>
                              <List.Item>
                                <Stack gap={8}>
                                  <Group justify="space-between">
                                    <RegularBigFont>2. South Bopal</RegularBigFont>
                                    <SmallFont color={lightgrey_font_color}>30% Searches</SmallFont>
                                  </Group>
                                  <Progress color={info_blue_color} size="sm" value={30} animated />
                                </Stack>
                              </List.Item>
                              <List.Item>
                                <Stack gap={8}>
                                  <Group justify="space-between">
                                    <RegularBigFont>3. Jodhpur</RegularBigFont>
                                    <SmallFont color={lightgrey_font_color}>44% Searches</SmallFont>
                                  </Group>
                                  <Progress color={info_blue_color} size="sm" value={44} animated />
                                </Stack>
                              </List.Item>
                              <List.Item>
                                <Stack gap={8}>
                                  <Group justify="space-between">
                                    <RegularBigFont>4. Shela</RegularBigFont>
                                    <SmallFont color={lightgrey_font_color}>24% Searches</SmallFont>
                                  </Group>
                                  <Progress color={info_blue_color} size="sm" value={24} animated />
                                </Stack>
                              </List.Item>
                              <List.Item>
                                <Stack gap={8}>
                                  <Group justify="space-between">
                                    <RegularBigFont>5. Gota</RegularBigFont>
                                    <SmallFont color={lightgrey_font_color}>66% Searches</SmallFont>
                                  </Group>
                                  <Progress color={info_blue_color} size="sm" value={66} animated />
                                </Stack>
                              </List.Item>
                            </List>
                            <Anchor
                              href="https://mantine.dev/"
                              target="_blank"
                              underline="always"
                              className={style.developer_site_link}
                            >
                              <RegularBigFont fontWeight={600} color={secondary_dark} textAlign="end">
                                View All
                              </RegularBigFont>
                            </Anchor>
                          </Stack>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div> */}
      </Container>
    </div>
  );
}

export default DevelopersAndDemand;
