'use client';

import { Divider, Flex, em } from '@mantine/core';
import { HeadingFive, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import styles from './DetailsProperty.module.css';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { getCookieClient } from '@/instance/getCookiesClient';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';
const ViewProperty = ({ searchParams }) => {
  const isTablte = useMediaQuery(`(max-width: ${em(767)})`);

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
    <>
      <Flex
        gap={{ base: 24, sm: 50 }}
        direction={isTablte ? 'column' : 'row'}
        justify={isTablte ? 'center' : 'flex-start'}
        align={'center'}
        className={styles.ViewPropertyDiv}
      >
        <Flex direction="column">
          <HeadingFive textAlign={isTablte ? 'center' : 'start'} fontWeight={600} color="#091E42">
            View Property verified by EasyProps
          </HeadingFive>

          <SmallFont textAlign={isTablte ? 'center' : 'start'} fontWeight={400} color="#091E42">
            Verified on site for genuineness. Check out real photos of the property
          </SmallFont>
        </Flex>

        <Link href={`${checkUrl()}`}>
          <CustomePrimaryButton btnWidth={116}>View All</CustomePrimaryButton>
        </Link>
      </Flex>
      <Divider />
    </>
  );
};

export default ViewProperty;
