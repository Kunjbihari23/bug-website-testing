'use client';
import { Radio, CheckIcon, Flex, Grid, Stack, Divider, Group, Drawer, Button, UnstyledButton } from '@mantine/core';
import { HeadingSix, RegularFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import styles from '../propertyDetailsComponent/DetailsProperty.module.css';
import Image from 'next/image';
import { greenTickImg } from '@/constant/ImageConstant';
import { grey_font_color, secondary_dark } from '@/constant/FontColotConstant';
import { useState } from 'react';

const HighLightProject = ({ keyHighLight }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const radiobuttonarr = keyHighLight.split(',').map((item) => ({
    text: item.trim(),
    checked: true,
  }));

  return (
    <>
      <Stack>
        <HeadingSix fontWeight={500}>Key highlights of Project</HeadingSix>
        <Divider />
        <Flex gap="xl">
          <Grid pl={15}>
            {radiobuttonarr.slice(0, 4).map((value, index) => {
              return (
                <Grid.Col span={{ base: 12, xs: 6 }} key={`key_highlights${index}`}>
                  <Group gap={8} wrap="nowrap">
                    <Image src={greenTickImg} alt=".." width={18} height={18} />
                    <RegularFont color={grey_font_color}>{value.text}</RegularFont>
                  </Group>
                </Grid.Col>
              );
            })}
          </Grid>
        </Flex>
        {radiobuttonarr.length > 4 && (
          <UnstyledButton onClick={() => setDrawerOpen(true)} color={secondary_dark}>
            Show More
          </UnstyledButton>
        )}
      </Stack>
      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Key Highlights"
        padding="xl"
        size="md"
        position="right"
      >
        <Grid>
          {radiobuttonarr.map((value, index) => {
            return (
              <Grid.Col span={{ base: 12, xs: 12 }} key={`key_highlights${index + 4}`}>
                <Group gap={8} wrap="nowrap">
                  <Image src={greenTickImg} alt=".." width={18} height={18} />
                  <RegularFont color={grey_font_color}>{value.text}</RegularFont>
                </Group>
              </Grid.Col>
            );
          })}
        </Grid>
      </Drawer>
    </>
  );
};

export default HighLightProject;
