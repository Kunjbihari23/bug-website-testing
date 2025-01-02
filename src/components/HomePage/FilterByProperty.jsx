import { Card, Container, Image, Skeleton, Stack } from '@mantine/core';
import React, { useCallback, useMemo } from 'react';
import style from './home.module.css';
import NextImage from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { villa } from '@/constant/ImageConstant';
import { HeadingFive, RegularBigFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { grey_font_color } from '@/constant/FontColotConstant';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';
import { getCookieClient } from '@/instance/getCookiesClient';
import useCityItemStore from '@/store/useCityItemStore';
import { useSubPropertyType } from '@/state/SubCategorySearch/subPropertyType.hook';
import { useRouter } from 'next/navigation';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';

function FilterByProperty({ appCity, searchParams }) {
  const btnVarientType = ['lightBlue', 'lightGreen', 'lightOrange'];
  const router = useRouter();
  const getCity = getCookieClient('selected_city');

  const cityInfo = useMemo(() => {
    return getCity ? JSON.parse(getCity) : appCity;
  }, [getCity, appCity]);

  const { data: listSubPropType, isLoading } = useSubPropertyType([]);

  const getButtonColor = useCallback((index) => {
    const getArrColor = getIconBgClass(btnVarientType[index % btnVarientType.length]);
    return getArrColor;
  }, []);

  const updateQueryParams = useCallback(
    (data) => {
      const updatedSearchParams = {
        ...searchParams,
        city: searchParams.city ?? cityInfo?.value ?? '',
        LANDMARK: searchParams.LANDMARK ?? cityInfo?.label ?? '',
        local: searchParams.local ?? '',
        RENTORSELL: searchParams.RENTORSELL ?? '1',
        PropertyCategoryID: data?.propertyCategoryID ?? searchParams.PropertyCategoryID ?? '2',
        project_property: searchParams.project_property ?? '0',
      };
      if (data?.propertySubCategoryID) {
        updatedSearchParams.ProSubCatIds = data.propertySubCategoryID;
      }

      return new URLSearchParams(updatedSearchParams).toString();
    },
    [searchParams, cityInfo]
  );

  const handlePropertyClick = useCallback(
    (subCategoryId) => {
      const queryString = updateQueryParams(subCategoryId);
      const url = parseURLParameters(
        searchParams.project_property ?? '0',
        searchParams.RENTORSELL ?? '1',
        subCategoryId.propertyCategoryID,
        searchParams.LANDMARK ?? cityInfo?.label ?? ''
      );
      router.push(`${url}?${queryString}`);
    },
    [updateQueryParams, router]
  );

  var sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CustomNextArrow right={'-12px'} />,
    prevArrow: <CustomPrevArrow left={'-12px'} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: false,
        },
      },
    ],
  };

  const getIconBgClass = useCallback((val) => {
    switch (val) {
      case 'lightGreen':
        return style.lightGreenBg;
      case 'lightOrange':
        return style.lightOrangeBg;
      default:
        return style.lightBlueBg;
    }
  }, []);

  return (
    <div className={style.filterBy_property_container}>
      <Container size="xl">
        <div className={style.explr_propty_type}>
          <Stack gap={8} mb={24}>
            <HeadingFive fontWeight={600} textAlign={'start'}>
              Explore by Properties Type
            </HeadingFive>
            <RegularBigFont color={grey_font_color}>
              Discover your dream home with Easypropis, tailored to your needs.
            </RegularBigFont>
          </Stack>
          <div className={style.slider_container}>
            <Slider {...sliderSettings}>
              {isLoading ? (
                Array(8)
                  .fill()
                  .map((_, i) => (
                    <div key={i}>
                      <Card mx={10} p={5}>
                        <Skeleton h={130} />
                      </Card>
                    </div>
                  ))
              ) : listSubPropType && listSubPropType.data.length !== 0 ? (
                listSubPropType.data.map((data, i) => {
                  const index = i % btnVarientType.length;

                  return (
                    <div key={`listSubPropType${data.id}`}>
                      <div className={style.explr_propty_item}>
                        <div onClick={() => handlePropertyClick(data)} style={{ cursor: 'pointer' }}>
                          <div className={`${style.explr_propty_icon} ${getButtonColor(index)}`}>
                            <Image
                              component={NextImage}
                              src={data.image}
                              alt={data.propType ?? 'sub category image'}
                              width={33}
                              height={32}
                              fallbackSrc={villa}
                            />
                          </div>
                          <span>{data.propertySubCategoryName}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <NodataFound />
              )}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FilterByProperty;
