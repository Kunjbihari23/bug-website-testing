import React, { useState } from 'react';
import style from './banners.module.css';
import { List, Container, Stack, Grid } from '@mantine/core';
import {
  HeadingFive,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { grey_font_color, primary_green, white_color } from '@/constant/FontColotConstant';
import CustomNextArrow from '@/components/SearchPage/CustomNextArrow';
import CustomPrevArrow from '@/components/SearchPage/CustomPrevArrow';

function TopLinksToSearch({ title = '', subTitle = '' }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  var topLinksSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <CustomNextArrow right={'-48px'} currentSlide={currentSlide} />,
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} left={'-48px'} />,
    responsive: [
      {
        breakpoint: 1200,
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
        },
      },
    ],
  };

  return (
    <div className={`${style.section_container} ${style.listing_section_container}`}>
      <Container size="xl">
        <div className={style.top_links_container}>
          <Stack gap={24}>
            <Stack gap={8}>
              <HeadingFive fontWeight={600} textAlign={'start'}>
                {title}
              </HeadingFive>
              <RegularBigFont color={grey_font_color}>{subTitle}</RegularBigFont>
            </Stack>

            <div className={style.top_links_slider}>
              <Slider {...topLinksSettings} className="custom_spacing_slider">
                {Array(4)
                  .fill()
                  .map((data, i) => {
                    return (
                      <div key={i}>
                        <Stack gap={8} mb={14}>
                          <HeadingSix fontWeight={500}>
                            {i == 0
                              ? 'People Also Search For'
                              : i == 1
                                ? 'Filter Your Search'
                                : 'Luxuries Properties in this area'}
                          </HeadingSix>
                          <List classNames={{ item: style.topLinks_listItem }} ml={24}>
                            <List.Item>
                              <Link href={'#'}>
                                <SmallFont color={grey_font_color}>Studio Apartments in Ahmedabad</SmallFont>
                              </Link>
                            </List.Item>
                            <List.Item>
                              <Link href={'#'}>
                                <SmallFont color={grey_font_color}>Resale Flats in Ahmedabad</SmallFont>
                              </Link>
                            </List.Item>
                            <List.Item>
                              <Link href={'#'}>
                                <SmallFont color={grey_font_color}>Ready to Move Flats in Ahmedabad</SmallFont>
                              </Link>
                            </List.Item>
                            <List.Item>
                              <Link href={'#'}>
                                <SmallFont color={grey_font_color}>
                                  Flats for Sale in Ahmedabad Without Brokerage Ahmedabad
                                </SmallFont>
                              </Link>
                            </List.Item>
                            <List.Item>
                              <Link href={'#'}>
                                <SmallFont color={grey_font_color}>Duplex in Ahmedabad</SmallFont>
                              </Link>
                            </List.Item>
                            <List.Item>
                              <Link href={'#'}>
                                <SmallFont color={grey_font_color}>Resale House in Ahmedabad</SmallFont>
                              </Link>
                            </List.Item>
                          </List>
                        </Stack>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </Stack>
        </div>
      </Container>
    </div>
  );
}

export default TopLinksToSearch;
