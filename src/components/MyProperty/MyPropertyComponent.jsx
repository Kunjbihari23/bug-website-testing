'use client';

import { usePropertyList } from '@/state/propertyList/propertyList.hook';
import {
  CaptionFont,
  ExtraSmallFont,
  HeadingFour,
  HeadingSix,
  HeadingThree,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import { ActionIcon, Card, Center, Grid, Group, NumberFormatter, Spoiler, Stack } from '@mantine/core';
import Image from 'next/image';
import { IconMoodSad, IconPencil, IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import style from './MyPropertyComponent.module.css';
import { numberToWords } from '@/util/commonFunction';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';

const MyPropertyComponent = ({ user }) => {
  const { data: listingData, isLoading: listingLoading } = usePropertyList(user.id);

  if (listingLoading) {
    return <HeadingSix>...Loading</HeadingSix>;
  }

  if (listingData && listingData.length === 0) {
    return (
      <Center p={50}>
        <Stack align="center" justify="center">
          <IconMoodSad size={50} />
          <HeadingThree>No Property Found</HeadingThree>
          <CustomePrimaryButton component={Link} href="/add-property">
            <IconPlus /> Add Property
          </CustomePrimaryButton>
        </Stack>
      </Center>
    );
  }

  return (
    <>
      <Grid mt={20}>
        {listingData &&
          listingData.map((item, index) => (
            <Grid.Col key={index} span={{ md: 4, sm: 12 }}>
              <Card shadow="sm" padding={0} radius={10} w={'100%'}>
                <Group gap={5} w={'100%'} justify="space-between" align="center">
                  <Image
                    src={item?.filePath}
                    alt={item?.title}
                    height={200}
                    width={200}
                    quality={100}
                    className={style.propertyImage}
                  />
                  <Group p={10} w={'100%'} justify="space-between" align="center">
                    <Stack gap={5} w={'100%'}>
                      <Stack gap={0}>
                        <Group justify="space-between">
                          <Stack gap={0}>
                            <HeadingSix>
                              <NumberFormatter
                                prefix="₹"
                                value={item.rateRentValue}
                                thousandSeparator
                                thousandsGroupStyle="lakh"
                              />
                            </HeadingSix>
                            <ExtraSmallFont>{`(${numberToWords(Number(item.rateRentValue))})`}</ExtraSmallFont>
                          </Stack>
                          <ActionIcon component={Link} href={`/edit-property/${item.id}`}>
                            <IconPencil size={24} />
                          </ActionIcon>
                        </Group>
                      </Stack>

                      <HeadingSix>{item?.title}</HeadingSix>
                      <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                        <RegularFont>{item?.description}</RegularFont>
                      </Spoiler>
                    </Stack>
                  </Group>
                </Group>
              </Card>
            </Grid.Col>
          ))}
      </Grid>
    </>
  );
};

export default MyPropertyComponent;
