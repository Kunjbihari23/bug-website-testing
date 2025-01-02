'use client';

import { Flex, Group, Stack, Image } from '@mantine/core';
import NextImage from 'next/image';
import { HeadingSix } from '../CustomComponents/TypographyComponent/HeadingComponents';
import styles from '../propertyDetailsComponent/DetailsProperty.module.css';
import { defaultImg } from '@/constant/ImageConstant';

const PlaceNearBy = ({ places }) => {
  const LocationCarouselArr = places;
  return (
    <div className={styles.placeDiv}>
      <Stack gap={8}>
        <Flex justify="space-between" gap={8}>
          <HeadingSix fontWeight={500}>Place nearby</HeadingSix>
        </Flex>

        <Group gap={8}>
          {LocationCarouselArr &&
            LocationCarouselArr.map((val, inx) => {
              return (
                <Flex
                  justify="center"
                  align="center"
                  px={16}
                  py={8}
                  gap={8}
                  style={{ border: '1px solid #DCDDDE', borderRadius: '4px' }}
                  key={`nearByPLace_${inx}`}
                >
                  <Image
                    src={val?.image}
                    component={NextImage}
                    width={50}
                    height={30}
                    alt="place logo"
                    fallbackSrc={defaultImg}
                  />
                  <p>{val?.place_Name}</p>
                  {/* <span>{val?.distance}</span> */}
                </Flex>
              );
            })}
        </Group>
      </Stack>
    </div>
  );
};

export default PlaceNearBy;
