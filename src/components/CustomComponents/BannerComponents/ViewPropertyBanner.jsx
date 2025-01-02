import { Button, Container, Stack } from '@mantine/core';
import React, { useCallback, useMemo, useEffect, useState } from 'react';
import style from './banners.module.css';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import { HeadingFive, RegularBigFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import Link from 'next/link';
import { getCookieClient } from '@/instance/getCookiesClient';
import { parseURLParameters } from '@/components/SearchPage/SearchUrl Generate';

const ViewPropertyBanner = ({ searchParams }) => {
  const [cityInfo, setCityInfo] = useState({ value: null, label: null });

  useEffect(() => {
    const getCity = getCookieClient('selected_city');
    if (getCity) {
      setCityInfo(JSON.parse(getCity));
    }
  }, []);

  const checkUrl = useCallback(() => {
    const updatedSearchParams = {
      ...searchParams,
      city: searchParams.city ?? cityInfo.value ?? '',
      LANDMARK: searchParams.LANDMARK ?? cityInfo.label ?? '',
      local: searchParams.local ?? '',
      RENTORSELL: searchParams.RENTORSELL ?? '1',
      PropertyCategoryID: searchParams.PropertyCategoryID ?? '2',
      project_property: '0',
      verified: 1,
    };

    const baseUrl = parseURLParameters(
      '0',
      updatedSearchParams.RENTORSELL,
      updatedSearchParams.PropertyCategoryID,
      updatedSearchParams.LANDMARK,
      updatedSearchParams.local
    );

    const queryString = new URLSearchParams(updatedSearchParams).toString();

    return `${baseUrl}?${queryString}`;
  }, [searchParams, cityInfo]);

  return (
    <div className={style.section_container}>
      <Container size="xl">
        <div className={style.highlights_sec}>
          <div className={style.highlights_inner_sec}>
            <Stack gap={8} mb={24}>
              <HeadingFive fontWeight={600} textAlign="center">
                View Property verified by EasyProps
              </HeadingFive>
              <RegularBigFont textAlign="center">
                Verified on site for genuineness. Check out real photos of the property
              </RegularBigFont>
            </Stack>
            <Link href={`${checkUrl()}`}>
              <CustomePrimaryButton btnWidth={116}>View All</CustomePrimaryButton>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ViewPropertyBanner;
