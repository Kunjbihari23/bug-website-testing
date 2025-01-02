import React, { useState } from 'react';
import { Card, List, Container } from '@mantine/core';
import {
  HeadingFive,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import style from '../SearchPage/search.module.css';
import { grey_font_color } from '../../constant/FontColotConstant';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomNextArrow from './CustomNextArrow';
import CustomPrevArrow from './CustomPrevArrow';

function SaleProperty({ margin = '0px', right = '0px', left = '0px' }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const properties = [
    {
      title: 'Recently Launched Property in Ahmedabad',
      items: [
        '5 BHK Bungalow',
        '600 SQ Yrd Residential Plot For Bunglow On Sell',
        'Pramukh Trinity 3BHK Flat',
        'Shanti Villa',
      ],
    },
    {
      title: 'Recently Launched Property in Ahmedabad',
      items: [
        '5 BHK Bungalow',
        '600 SQ Yrd Residential Plot For Bunglow On Sell',
        'Pramukh Trinity 3BHK Flat',
        'Shanti Villa',
      ],
    },
    {
      title: 'Recently Launched Property in Ahmedabad',
      items: [
        '5 BHK Bungalow',
        '600 SQ Yrd Residential Plot For Bunglow On Sell',
        'Pramukh Trinity 3BHK Flat',
        'Shanti Villa',
      ],
    },
    {
      title: 'Recently Launched Property in Ahmedabad',
      items: [
        '5 BHK Bungalow',
        '600 SQ Yrd Residential Plot For Bunglow On Sell',
        'Pramukh Trinity 3BHK Flat',
        'Shanti Villa',
      ],
    },
  ];

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: (
      <CustomNextArrow right={right} currentSlide={currentSlide} slideCount={properties.length} slidesToShow={3} />
    ),
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} left={left} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <div className={style.SaleProperty_} style={{ margin }}>
      <Container fluid p={30}>
        <div>
          <HeadingFive fontWeight={500}>Property in Ahmedabad for Sale</HeadingFive>
          <RegularFont color={grey_font_color}>Where you can start living</RegularFont>
        </div>

        <div className={style.SaleProperty_slider_container}>
          <Slider {...settings}>
            {properties.map((property, index) => (
              <div
                key={index}
                className={index === 0 ? style.saleProperty_detail_firstItem : style.saleProperty_detail_otherItem}
              >
                <RegularBigFont>{property.title}</RegularBigFont>
                <div className={style.saleProperty_list}>
                  <List withPadding spacing="xs" size="sm">
                    {property.items.map((item, idx) => (
                      <List.Item key={idx} className={idx === 0 ? style.firstItem : style.otherItem}>
                        <SmallFont>{item}</SmallFont>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
}

export default SaleProperty;
