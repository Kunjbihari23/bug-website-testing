import React, { useEffect, useMemo, useState } from 'react';
import { Card, Flex, Image, Skeleton, Stack, em } from '@mantine/core';
import style from '../SearchPage/search.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  HeadingFive,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { grey_font_color } from '@/constant/FontColotConstant';
import nextImage from 'next/image';
import { useAvailablePropList } from '@/state/Search/search.hook';
import noImageFound from '../../../public/img/Search/noImg.jpg';
import { formatCurrency } from '@/util/commonFunction';
import CustomNextArrow from './CustomNextArrow';
import CustomPrevArrow from './CustomPrevArrow';
import Link from 'next/link';
import { getCookieClient } from '@/instance/getCookiesClient';
import useCityItemStore from '@/store/useCityItemStore';
import { useMediaQuery } from '@mantine/hooks';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';

function MovePropertySuggestion({ slidesToShow, header, propertyCity = {} }) {
  const getCity = getCookieClient('selected_city');
  const cityInfo = useMemo(() => {
    return getCity ? JSON.parse(getCity) : propertyCity;
  }, [getCity, propertyCity]);

  const { city: cityChange, change: changeCity } = useCityItemStore();
  const [propertyList, setPropertyList] = useState([]);
  const [searchUrl, setSearchUrl] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);

  const { mutate: fetchList, isPending: isLoading } = useAvailablePropList((data) => {
    setPropertyList(data?.list);
  });

  useEffect(() => {
    if (!selectedCity || selectedCity.value !== cityInfo.value) {
      setSelectedCity(cityInfo);
    }
  }, [cityInfo, selectedCity, cityChange]);

  useEffect(() => {
    if (selectedCity) {
      const payload = {
        Avaibility: 1,
        cityid: parseInt(selectedCity.value),
        PageNumber: 1,
        PageSize: 50,
        currentPage: 1,
      };
      fetchList(payload);
    }
  }, [selectedCity, fetchList]);

  var settings = {
    dots: false,
    slidesToShow: isLoading ? 3 : propertyList?.length > 3 ? 3 : propertyList.length,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <CustomNextArrow right={'-12px'} />,
    prevArrow: <CustomPrevArrow left={'-12px'} />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="propertyId_Recommendations" className={style.propertyId_Recommendations}>
      <Flex
        justify={isMobile ? 'start' : 'space-between'}
        align={isMobile ? 'flex-start' : 'center'}
        pb={20}
        direction={isMobile ? 'column' : 'Row'}
        gap={10}
      >
        <div>
          <HeadingFive fontWeight={500}>{header.title}</HeadingFive>
          <RegularFont color={grey_font_color}>{header.subTitle}</RegularFont>
        </div>
      </Flex>

      <div className={style.moveProperty_slider}>
        {isLoading ? (
          <Flex direction="row">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <Card key={index} shadow="sm" radius="md" padding={0} mx={8} my={2}>
                  <Stack gap={10} mb={4}>
                    <Skeleton h={200} width={300} />
                    <Skeleton h={20} w={'80%'} />
                    <Skeleton h={20} w={'80%'} />
                    <Skeleton h={20} w={'80%'} />
                  </Stack>
                </Card>
              ))}
          </Flex>
        ) : (
          <>
            {propertyList && propertyList.length !== 0 ? (
              <Slider {...settings}>
                {propertyList.map((property, index) => (
                  <div key={index} className={style.moveProperty_card}>
                    <Card>
                      <Link href={`/property-detail/${property?.id}/${property?.propertySEOURL}`} target="_blank">
                        <div>
                          <Image
                            component={nextImage}
                            src={property.filePath}
                            width={150}
                            height={150}
                            alt="property image"
                            fallbackSrc={noImageFound}
                          />
                        </div>

                        <div className={style.moveProperty_cardDetails}>
                          <RegularBigFont fontWeight={500} style={{ padding: '50px' }}>
                            {property.title}
                          </RegularBigFont>
                          <RegularBigFont fontWeight={500} style={{ padding: '50px' }}>
                            {formatCurrency(property.rateRentValue)}
                          </RegularBigFont>

                          <SmallFont fontWeight={400}>{property.title}</SmallFont>

                          <SmallFont className={style.gray_text_in_search} fontWeight={300} color={grey_font_color}>
                            {property.landMark},{property.city}
                          </SmallFont>
                        </div>
                      </Link>
                    </Card>
                  </div>
                ))}
              </Slider>
            ) : (
              <Stack align="center">
                <div style={{ maxWidth: '300px' }}>
                  <NodataFound />
                </div>
              </Stack>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MovePropertySuggestion;
