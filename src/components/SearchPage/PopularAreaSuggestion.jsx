import React, { useMemo } from 'react';
import style from '../SearchPage/search.module.css';
import {
  HeadingFive,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { Card, Skeleton, Image } from '@mantine/core';
import Slider from 'react-slick';
import CustomNextArrow from './CustomNextArrow';
import CustomPrevArrow from './CustomPrevArrow';
import { grey_font_color, lightgrey_font_color } from '@/constant/FontColotConstant';
import NextImage from 'next/image';
import { populerCity1 } from '@/constant/ImageConstant';
import { useLocalitylistApi, UsePopularLocalityList } from '@/state/localityList/localityList.hook';
import useCityItemStore from '@/store/useCityItemStore';
import { useRouter } from 'next/navigation';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';
import { parseURLParameters } from './SearchUrl Generate';
import { getCookieClient } from '@/instance/getCookiesClient';

function PopularAreaSuggestion({ slidesToShow, searchParams, newSearchParams, propertyCity = {} }) {
  const getCity = getCookieClient('selected_city');

  const cityData = getCity ? JSON.parse(getCity) : propertyCity;
  const { city: cityInfo } = useCityItemStore();
  const router = useRouter();
  const { data: popularLoalitList, isPending } = UsePopularLocalityList(
    cityData?.value ? cityData?.value : newSearchParams?.city ? newSearchParams?.city : ''
  );

  const query = useMemo(
    () => ({
      Cityid: searchParams?.city ?? cityData?.value,
      SearchString: '',
    }),
    [searchParams]
  );

  const { data: localityList } = useLocalitylistApi(query);

  const handleLocalityClick = (name) => {
    const matchedLocality = localityList?.find((item) => item.localityName === name);
    if (matchedLocality) {
      const newSearchParams = {
        city: searchParams?.city || cityInfo?.value || '',
        LANDMARK: searchParams?.LANDMARK || cityInfo?.label || '',
        local: matchedLocality?.id || '',
        RENTORSELL: searchParams.RENTORSELL || '1',
        PropertyCategoryID: searchParams.PropertyCategoryID || '2',
        project_property: searchParams.project_property || '0',
      };

      const bashUrl = parseURLParameters(
        searchParams.project_property ?? '0',
        searchParams.RENTORSELL ?? '1',
        searchParams.PropertyCategoryID ?? '2',
        searchParams?.LANDMARK ?? cityData?.label,
        name
      );

      const queryString = new URLSearchParams(newSearchParams).toString();
      router.push(`${bashUrl}?${queryString}`);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
    swipeToSlide: true,
    nextArrow:
      popularLoalitList && popularLoalitList.length !== 0 ? (
        <CustomNextArrow right={'-16px'} slideCount={popularLoalitList && popularLoalitList.length} slidesToShow={3} />
      ) : null,
    prevArrow: popularLoalitList && popularLoalitList.length !== 0 ? <CustomPrevArrow left={'-16px'} /> : null,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
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
    <div className={style.popular_area_section}>
      <div className={style.move_property_header}>
        <div>
          <HeadingFive fontWeight={500}>
            Popular Residential Areas in {cityInfo ? cityInfo.label : cityData.label}
          </HeadingFive>
          <RegularFont color={lightgrey_font_color}>
            Discover the trending neighborhoods in {cityInfo ? cityInfo.label : cityData.label}.
          </RegularFont>
        </div>
      </div>

      <div className={style.popularCities_}>
        <Slider {...settings}>
          {isPending ? (
            Array(6)
              .fill()
              .map((_, i) => {
                return (
                  <div key={i}>
                    <div className={style.popularCities_card}>
                      <Card p={12}>
                        <div className={style.popularCities_card_item}>
                          <Skeleton width={110} height={80} mr={10} />
                          <div className={style.popularCities_des}>
                            <Skeleton width={'100%'} height={20} mb={5} />
                            <Skeleton width={100} height={16} />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })
          ) : popularLoalitList && popularLoalitList.length !== 0 ? (
            popularLoalitList.map((item, index) => (
              <div key={`popularLoalit_${index}`}>
                <div className={style.popularCities_card} onClick={() => handleLocalityClick(item.name)}>
                  <Card p={12}>
                    <div className={style.popularCities_card_item}>
                      <Image
                        component={NextImage}
                        src={item.image}
                        fallbackSrc={populerCity1}
                        width={110}
                        height={80}
                        alt="property image"
                      />
                      <div className={style.popularCities_des}>
                        <RegularBigFont fontWeight={500} lineClamp={2}>
                          {item?.name}
                        </RegularBigFont>
                        <SmallFont color={grey_font_color}>{item.count} Properties</SmallFont>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))
          ) : (
            <NodataFound />
          )}
        </Slider>
      </div>
    </div>
  );
}

export default PopularAreaSuggestion;
