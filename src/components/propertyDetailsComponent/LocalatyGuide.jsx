'use client';

import { Flex, Group } from '@mantine/core';
import { ExtraSmallFont, HeadingSix, RegularFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import Share from '../SVG/Share';
import LocationImageContainer from './LocationImageContainer';
import RightArrowSvg from '../SVG/RightArrowSvg';
import styles from './DetailsProperty.module.css';

const LocalatyGuide = () => {
  return (
    <>
      <Flex justify="space-between" align="center" mb="sm">
        <Flex direction="column">
          <HeadingSix fontWeight={500}>Locality Guide</HeadingSix>
          <RegularFont color="#51565A" fontWeight={400}>
            for Vastrapur, Ahmedabad
          </RegularFont>
        </Flex>

        <CustomePrimaryButton size="extraSmall" btnWidth={90} variant="outline" icon={<Share />}>
          <ExtraSmallFont fontWeight={500}>Share</ExtraSmallFont>
        </CustomePrimaryButton>
      </Flex>

      <LocationImageContainer />
      <RegularFont fontWeight={400} color="#51565A">
        Vastrapur is a fast developing area in Ahmedabad district. The Indian Institute of Management Ahmedabad is
        located in this area. This area is famous for the Vastrapur Lake where... Read More
      </RegularFont>
      <Group mt="md">
        <Flex className={styles.bgProperty} justify="center" align="center" gap="sm">
          <RegularFont>40 society</RegularFont>
          <RightArrowSvg />
        </Flex>
        <Flex className={styles.bgProperty} justify="center" align="center" gap="sm">
          <RegularFont>40 society</RegularFont>
          <RightArrowSvg />
        </Flex>
        <Flex className={styles.bgProperty} justify="center" align="center" gap="sm">
          <RegularFont>40 society</RegularFont>
          <RightArrowSvg />
        </Flex>
      </Group>
    </>
  );
};

export default LocalatyGuide;
