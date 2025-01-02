import React, { useEffect, useState } from 'react';
import style from './agentDetail.module.css';
import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Pill,
  Skeleton,
  Stack,
  Tabs,
  UnstyledButton,
} from '@mantine/core';
import { grey_font_color, info_blue_color, primary_color, secondary_dark } from '@/constant/FontColotConstant';
import { defaultImg } from '@/constant/ImageConstant';
// import Image from 'next/image';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import { dynamicTitleUrl, formatCurrency } from '@/util/commonFunction';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';

function ActiveProperty({ agentDetail, isPending = false, searchParams }) {
  const [activeTab, setActiveTab] = useState('buy');
  const router = useRouter();
  const totalProperty = agentDetail && agentDetail?.propertylistbuy.length + agentDetail?.propertylistRent.length;
  const [searchUrl, setSearchUrl] = useState();
  const [showAll, setShowAll] = useState(false);
  const [propertyData, setpropertyData] = useState([]);
  // const searchParams = useSearchParams();

  useEffect(() => {
    const current = new URLSearchParams(searchParams);
    current.set('project_property', '0');
    const search = current.toString();

    setSearchUrl(search);
  }, [searchUrl]);

  useEffect(() => {
    const data = showAll ? agentDetail?.propertylistbuy : agentDetail?.propertylistbuy.slice(0, 8);
    setpropertyData(data);
  }, [showAll, agentDetail]);

  const handleViewAll = () => {
    setShowAll(true);
  };

  return (
    <>
      <Container size="xl">
        <div className={style.agent_detail_sections}>
          <Stack gap={8}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <HeadingSix fontWeight={500}>
                ACTIVE PROPERTIES {totalProperty > 0 ? `(${totalProperty})` : ''}
              </HeadingSix>
              <UnstyledButton onClick={handleViewAll}>
                <HeadingSix fontWeight={500} style={{ cursor: 'pointer' }}>
                  View All {agentDetail?.totalPropertyCount > 0 ? `(${agentDetail?.totalPropertyCount})` : ''}
                </HeadingSix>
              </UnstyledButton>
            </div>

            <Tabs
              value={activeTab}
              color={primary_color}
              onChange={setActiveTab}
              classNames={{ tab: style.agentInfo_tabButton, list: style.agentInfo_tabList }}
            >
              <Tabs.List>
                <Tabs.Tab value="buy">Buy</Tabs.Tab>
                <Tabs.Tab value="rent">Rent</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="buy">
                <Grid mt={30} gutter={24}>
                  {isPending ? (
                    Array(8)
                      .fill()
                      .map((data, index) => (
                        <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={index}>
                          <Card radius="md" withBorder shadow="sm">
                            <Stack gap={16} mb={4}>
                              <Card.Section>
                                <div className={style.property_cardImag}>
                                  <Skeleton w={'100%'} height={222} />
                                </div>
                              </Card.Section>
                              <Stack gap={4}>
                                <Skeleton w={'100%'} height={25} />
                                <Skeleton w={'100%'} height={25} />
                                <Skeleton w={'70%'} height={25} />
                                <Skeleton w={'40%'} height={20} />
                              </Stack>
                            </Stack>
                          </Card>
                        </Grid.Col>
                      ))
                  ) : agentDetail && agentDetail && agentDetail?.propertylistbuy.length !== 0 ? (
                    propertyData &&
                    propertyData.map((data, index) => {
                      const urlTitle = dynamicTitleUrl(data?.title);
                      return (
                        <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={index}>
                          <Card
                            radius="md"
                            withBorder
                            shadow="sm"
                            h={'100%'}
                            onClick={() =>
                              window.open(`/property-detail/${data?.id}/${urlTitle}?${searchUrl}`, '_blank')
                            }
                          >
                            <Stack gap={16} mb={4}>
                              <Card.Section>
                                <div className={style.property_cardImag}>
                                  <Image
                                    component={NextImage}
                                    src={data?.filePath}
                                    alt={data?.title}
                                    width={303}
                                    height={222}
                                    fallbackSrc={defaultImg}
                                  />
                                  {data?.rentOrSell == 1 && (
                                    <Badge
                                      color={secondary_dark}
                                      size={35}
                                      className={style.sale_label}
                                      classNames={{ root: style.forSaleBadge_Root }}
                                    >
                                      For Sale
                                    </Badge>
                                  )}
                                </div>
                              </Card.Section>
                              <Stack gap={4}>
                                <Link href={`/property-detail/${data?.id}/${urlTitle}?${searchUrl}`}>
                                  <RegularFont lineClamp={2}>{data?.title}</RegularFont>
                                </Link>
                                <RegularFont color={grey_font_color}>
                                  {data?.landMark}, {data?.city}
                                </RegularFont>
                                <RegularBigFont fontWeight={500} color={secondary_dark}>
                                  {formatCurrency(data?.rateRentValue)}
                                </RegularBigFont>
                                <SmallFont color={grey_font_color}>{data?.avaibility}</SmallFont>
                              </Stack>
                            </Stack>
                          </Card>
                        </Grid.Col>
                      );
                    })
                  ) : (
                    <NodataFound />
                  )}
                </Grid>
              </Tabs.Panel>
              <Tabs.Panel value="rent">
                <Grid mt={30} gutter={24}>
                  {isPending ? (
                    Array(8)
                      .fill()
                      .map((data, index) => (
                        <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={index}>
                          <Card radius="md" withBorder shadow="sm">
                            <Stack gap={16} mb={4}>
                              <Card.Section>
                                <div className={style.property_cardImag}>
                                  <Skeleton w={'100%'} height={222} />
                                </div>
                              </Card.Section>
                              <Stack gap={4}>
                                <Skeleton w={'100%'} height={25} />
                                <Skeleton w={'100%'} height={25} />
                                <Skeleton w={'70%'} height={25} />
                                <Skeleton w={'40%'} height={20} />
                              </Stack>
                            </Stack>
                          </Card>
                        </Grid.Col>
                      ))
                  ) : agentDetail && agentDetail?.propertylistRent.length !== 0 ? (
                    agentDetail?.propertylistRent.map((data, index) => {
                      const urlTitle = dynamicTitleUrl(data?.title);
                      return (
                        <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={index}>
                          <Card
                            radius="md"
                            withBorder
                            shadow="sm"
                            h={'100%'}
                            onClick={() => router.push(`/property-detail/${data?.id}/${urlTitle}?${searchUrl}`)}
                          >
                            <Stack gap={16} mb={4}>
                              <Card.Section>
                                <div className={style.property_cardImag}>
                                  <Image
                                    component={NextImage}
                                    src={data?.filePath}
                                    alt={data?.title}
                                    width={303}
                                    height={222}
                                    fallbackSrc={defaultImg}
                                  />
                                  {data?.rentOrSell == 1 && (
                                    <Badge
                                      color={secondary_dark}
                                      size={35}
                                      className={style.sale_label}
                                      classNames={{ root: style.forSaleBadge_Root }}
                                    >
                                      For Sale
                                    </Badge>
                                  )}
                                </div>
                              </Card.Section>
                              <Stack gap={4}>
                                <Link href={`/property-detail/${data?.id}/${urlTitle}?${searchUrl}`}>
                                  <RegularFont lineClamp={2}>{data?.title}</RegularFont>
                                </Link>
                                <RegularFont color={grey_font_color}>
                                  {data?.landMark}, {data?.city}
                                </RegularFont>
                                <RegularBigFont fontWeight={500} color={secondary_dark}>
                                  {formatCurrency(data?.rateRentValue)}
                                </RegularBigFont>
                                <SmallFont color={grey_font_color}>{data?.avaibility}</SmallFont>
                              </Stack>
                            </Stack>
                          </Card>
                        </Grid.Col>
                      );
                    })
                  ) : (
                    <NodataFound />
                  )}
                </Grid>
              </Tabs.Panel>
            </Tabs>
          </Stack>
        </div>
      </Container>{' '}
    </>
  );
}

export default ActiveProperty;
