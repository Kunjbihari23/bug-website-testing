'use client';
import { Radio, CheckIcon, Flex, Grid, Stack, Divider, Group } from '@mantine/core';
import { HeadingSix, RegularFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import styles from './DetailsProperty.module.css';
import Image from 'next/image';
import { greenTickImg } from '@/constant/ImageConstant';
import { grey_font_color } from '@/constant/FontColotConstant';

const HighLightProperty = ({ keyHighLight = null }) => {
  const radiobuttonarr = keyHighLight.split(',').map((item) => ({
    text: item.trim(),
    checked: true,
  }));
  return (
    <>
      <Stack>
        <HeadingSix fontWeight={500}>Key highlights of Property</HeadingSix>
        <Divider />
        <Flex gap="xl">
          <Grid ml={15}>
            {radiobuttonarr &&
              radiobuttonarr?.map((value, index) => {
                return (
                  <Grid.Col span={{ base: 12, xs: 6 }} key={`key_highlights${index}`}>
                    <Group gap={8} wrap="nowrap">
                      <Image src={greenTickImg} alt=".." width={18} height={18} />
                      <RegularFont color={grey_font_color}>{value?.text}</RegularFont>
                    </Group>
                  </Grid.Col>
                );
              })}
          </Grid>
        </Flex>
      </Stack>
    </>
  );
};

export default HighLightProperty;
