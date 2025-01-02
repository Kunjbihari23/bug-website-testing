import { Container, Grid, Group, Stack } from '@mantine/core';
import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';
import style from './banners.module.css';
import { arrowIcon, advertiserImg } from '@/constant/ImageConstant';
import { grey_font_color } from '@/constant/FontColotConstant';
import {
  HeadingFour,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import Link from 'next/link';
import { getCookieClient } from '@/instance/getCookiesClient';
import { postedBy } from '@/components/SearchPage/StaticFilterArray';
import useCityItemStore from '@/store/useCityItemStore';
import { parseURLParameters } from '@/components/SearchPage/SearchUrl Generate';

function SelectAdvertisementType({ searchParams }) {
  const getCity = getCookieClient('selected_city');
  const cityInfo = useMemo(() => {
    return getCity ? JSON.parse(getCity) : {};
  }, [getCity]);
  const { city: storeCity } = useCityItemStore();

  const checkUrl = useCallback(
    (data) => {
      const postedByItem = postedBy.find((item) => item.label === data);

      const newSearchParams = {
        city: cityInfo?.value || searchParams.city || '',
        LANDMARK: cityInfo?.label || searchParams.LANDMARK || '',
        local: searchParams.local || '',
        RENTORSELL: searchParams.RENTORSELL || '1',
        PropertyCategoryID: searchParams.PropertyCategoryID || '2',
        project_property: searchParams.project_property || '0',
        PostedBy: postedByItem?.value || null,
      };

      const baseUrl = parseURLParameters(
        searchParams.project_property ?? '0',
        searchParams.RENTORSELL ?? '1',
        searchParams.PropertyCategoryID ?? '2',
        cityInfo?.label ?? searchParams.LANDMARK ?? '',
        searchParams.local ?? ''
      );

      const queryString = new URLSearchParams(newSearchParams).toString();

      return `${baseUrl}?${queryString}`;
    },
    [searchParams, cityInfo]
  );

  return (
    <div className={style.section_container}>
      <Container size="xl" px={0}>
        <div className={style.advertiser_type_sec}>
          <div className={style.advertiser_type_inner}>
            <Grid gutter={0}>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <div className={style.advertiser_type_img}>
                  <Image src={advertiserImg} alt="Advertiser type img" height={300} width={560} />
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack gap={24} className={style.advertiser_type_content} justify="center">
                  <Stack gap={8}>
                    <HeadingFour fontWeight={600}>Select advertiser type.</HeadingFour>
                    <RegularBigFont>Explore listings of your choice.</RegularBigFont>
                  </Stack>
                  <div className={style.advertiser_type_box}>
                    <Group gap={24}>
                      <Link href={`${checkUrl('Owner')}`}>
                        <Stack gap={8}>
                          <RegularBigFont fontWeight={500}>Owner</RegularBigFont>
                          <RegularFont color={grey_font_color}>1,900+ Properties</RegularFont>
                        </Stack>
                        <span>
                          <Image src={arrowIcon} alt="arrow-link" height={24} width={24} />
                        </span>
                      </Link>
                      <Link href={`${checkUrl('Agent')}`}>
                        <Stack gap={8}>
                          <RegularBigFont fontWeight={500}>Dealer</RegularBigFont>
                          <RegularFont color={grey_font_color}>1,900+ Properties</RegularFont>
                        </Stack>
                        <span>
                          <Image src={arrowIcon} alt="arrow-link" height={24} width={24} />
                        </span>
                      </Link>
                    </Group>
                  </div>
                </Stack>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SelectAdvertisementType;
