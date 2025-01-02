'use client';
import { Container, Flex, Grid, Group, Skeleton, Stack, em } from '@mantine/core';
import styles from './Footer.module.css';
import Image from 'next/image';
import FbSvg from '../SVG/FbSvg';
import InstaSvg from '../SVG/InstaSvg';
import LinkedinSvg from '../SVG/LinkedinSvg';
import PintrestSvg from '../SVG/PintrestSvg';
import { RegularBigFont, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import { white_color } from '@/constant/FontColotConstant';
import Link from 'next/link';
import { playImg, appleImg } from '@/constant/ImageConstant';
import { useMediaQuery } from '@mantine/hooks';
import { useGetSettings } from '@/state/settings/settings.hook';
import { getCitylistApi } from '@/state/cityList/citylist.api';
import { useCallback, useEffect, useState } from 'react';
import { IconMailFilled, IconMapPinFilled, IconPhoneFilled } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';

const Footer = ({ formattedCities = [] }) => {
  const isDesktop = useMediaQuery(`(max-width: ${em(992)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);

  const { data, isPending } = useGetSettings();

  const getCityData = useCallback(async () => {
    let cityListResponse = await getCitylistApi();
    let cityList = cityListResponse.list.map((city) => ({
      value: `${city.cityId}`,
      label: `${city.cityName}`,
    }));

    return cityList.slice(0, 4);
  }, []);

  const [LocationCities, setLocationCities] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchCityData = async () => {
      const cities = await getCityData();
      setLocationCities(cities);
    };
    fetchCityData();
  }, [formattedCities.length]);

  const demoProps = {
    mt: 'md',
  };

  const footer = {
    contactUs: {
      number: data?.data?.mobile_number,
      addrs: data?.data?.addr,
      mail: `${data?.data?.email}`,
    },
    company: [
      { text: 'About Us', link: '/about-us' },
      { text: 'Contact Us', link: '/contact-us' },
      { text: 'Career', link: '' },
      { text: 'Privacy Policy', link: '/privacy-policy' },
      { text: 'Term & Conditions', link: '' },
      // { text: 'Report a problem', link: '' },
      // { text: 'Testimonials', link: '' },
      // { text: 'Feedbacks', link: '' },
    ],
    explore: [
      {
        text: 'Pricing',
        link: '',
      },
      {
        text: 'Blogs',
        link: '/Blog',
      },
      {
        text: 'Redevelopments Projects',
        link: '',
      },
      {
        text: 'Sitemaps',
        link: '',
      },
    ],
  };

  const checkUrl = useCallback(
    (data) => {
      const params = new URLSearchParams(searchParams);
      params.set('city', data?.value ?? '');
      params.set('LANDMARK', data?.label ?? '');
      params.set('RENTORSELL', params.get('RENTORSELL') ?? '1');
      params.set('PropertyCategoryID', params.get('PropertyCategoryID') ?? '2');
      params.set('project_property', params.get('project_property') ?? '0');

      const bashUrl = parseURLParameters(
        params.get('project_property') ?? '0',
        params.get('RENTORSELL') ?? '1',
        params.get('PropertyCategoryID') ?? '2',
        data?.label ?? ''
      );

      return `${bashUrl}?${params.toString()}`;
    },
    [searchParams]
  );

  const handleCityClick = (data) => {
    router.push(`${checkUrl(data)}`);
  };

  return (
    <div className={styles.footer_bg}>
      <Container size={'xl'} {...demoProps}>
        <Grid gutter={30}>
          <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2.5 }} order={1}>
            {isPending ? (
              <>
                <Stack gap={16}>
                  <Skeleton h={16} />
                  <Skeleton h={16} />
                  <Skeleton h={16} />
                  <Skeleton h={16} />
                </Stack>
              </>
            ) : (
              <>
                <Stack mb={30}>
                  <RegularBigFont fontWeight={500} color={white_color}>
                    Contact Us
                  </RegularBigFont>
                </Stack>

                <Grid>
                  <Grid.Col span={1}>
                    <IconMapPinFilled size={18} color={white_color} />
                  </Grid.Col>
                  <Grid.Col span={11}>
                    <div
                      style={{ color: white_color }}
                      dangerouslySetInnerHTML={{
                        __html: footer?.contactUs?.addrs,
                      }}
                    />
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={1}>
                    <IconPhoneFilled size={18} color={white_color} />
                  </Grid.Col>
                  <Grid.Col span={11} pl={10}>
                    <Link href={`tel:${footer?.contactUs?.number}`}>
                      <SmallFont color={white_color}>{footer?.contactUs?.number}</SmallFont>
                    </Link>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={1}>
                    <IconMailFilled size={18} color={white_color} />
                  </Grid.Col>
                  <Grid.Col span={11}>
                    <Link href={`mailto:enquiry@easyprops.c`}>
                      <SmallFont color={white_color}>enquiry@easyprops.c</SmallFont>
                    </Link>
                  </Grid.Col>
                </Grid>

                {/* <Stack gap={16} maw={isDesktop ? '100%' : 250}>
                  <RegularBigFont fontWeight={500} color={white_color}>
                    {footer?.contactUs?.footerHeading}
                  </RegularBigFont>
                  <Stack gap={8}>
                    <Link href={`tel:${footer?.contactUs?.number}`}>
                      <SmallFont color={white_color}>
                        <IconMapPinFilled size={18} color={white_color} />
                        {footer?.contactUs?.number}
                      </SmallFont>
                    </Link>
                    <Stack>
                      <SmallFont color={white_color}>
                        <IconPhone size={18} color={white_color} />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: footer?.contactUs?.addrs,
                          }}
                        />
                      </SmallFont>
                    </Stack>
                    <Link href={`mailto:${footer?.contactUs?.mail}`}>
                      <SmallFont color={white_color}>
                        <IconMail size={18} color={white_color} />
                        {footer?.contactUs?.mail}
                      </SmallFont>
                    </Link>
                  </Stack>
                </Stack> */}
              </>
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 12, md: 6, lg: 6.5 }} order={{ base: 3, md: 2 }}>
            <Group
              gap={isMobile ? 16 : 30}
              justify={isDesktop ? 'space-between' : 'space-around'}
              align="baseline"
              wrap={isMobile ? 'wrap' : 'nowrap'}
            >
              <Stack gap={16}>
                <>
                  <RegularBigFont fontWeight={500} color={white_color}>
                    Company
                  </RegularBigFont>
                  <Stack gap={8}>
                    {footer?.company?.map((links, index) => {
                      return (
                        <Link href={links.link} key={index}>
                          <SmallFont color={white_color}>{links?.text}</SmallFont>
                        </Link>
                      );
                    })}
                  </Stack>
                </>
              </Stack>
              <Stack gap={16}>
                <>
                  <RegularBigFont fontWeight={500} color={white_color}>
                    Explore
                  </RegularBigFont>
                  <Stack gap={8}>
                    <Link href={'/Blog'}>
                      <SmallFont color={white_color}>Blogs</SmallFont>
                    </Link>
                    <Link href={'/'}>
                      <SmallFont color={white_color}>Pricing</SmallFont>
                    </Link>
                    <Link href={'/'}>
                      <SmallFont color={white_color}>Redevelopments Projects</SmallFont>
                    </Link>
                    <Link href={'/'}>
                      <SmallFont color={white_color}>Sitemaps</SmallFont>
                    </Link>
                  </Stack>
                </>
              </Stack>
              <Stack gap={16}>
                {isPending ? (
                  <>
                    <Stack gap={16}>
                      <Skeleton h={16} />
                      <Skeleton h={16} />
                      <Skeleton h={16} />
                      <Skeleton h={16} />
                    </Stack>
                  </>
                ) : (
                  <>
                    <RegularBigFont fontWeight={500} color={white_color}>
                      Location
                    </RegularBigFont>
                    <Stack gap={8}>
                      {LocationCities &&
                        LocationCities?.map((links, index) => {
                          return (
                            <Stack onClick={() => handleCityClick(links)} style={{ cursor: 'pointer' }} key={index}>
                              <SmallFont color={white_color}>{links?.label}</SmallFont>
                            </Stack>
                          );
                        })}
                    </Stack>
                  </>
                )}
              </Stack>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3, lg: 2.5 }} order={{ base: 2, md: 3 }}>
            <Stack gap={isMobile ? 16 : 24}>
              {data?.data?.app_link_android && (
                <Stack gap={16}>
                  <RegularBigFont fontWeight={500} color={white_color}>
                    Experience Easyprops on your Mobile App
                  </RegularBigFont>
                  <Stack gap={isMobile ? 4 : 8} className={styles.footerImgs}>
                    {data && data?.data?.app_link_android && data?.app_link_android !== '' && (
                      <Link href={data?.data?.app_link_android} target="_blank">
                        <Image src={appleImg} alt="appleImg" width={167} height={53} />
                      </Link>
                    )}

                    {/* <Link href={data?.app_link_ios ? data?.app_link_ios : '#'} target="_blank">
                      <Image src={playImg} alt="playImg" width={167} height={53} />
                    </Link> */}
                  </Stack>
                </Stack>
              )}

              <Stack gap={16}>
                <RegularBigFont fontWeight={500} color={white_color}>
                  Connect With Us
                </RegularBigFont>
                <Flex gap={isMobile ? 8 : 24} className={styles.socialIcons}>
                  <Link href={data?.data?.fb ?? '#'} target="_blank" aria-label="Facebook">
                    <FbSvg />
                  </Link>
                  <Link href={data?.data?.instagram ?? '#'} target="_blank" aria-label="Instagram">
                    <InstaSvg />
                  </Link>
                  <Link href={data?.data?.linkedin ?? '#'} target="_blank" aria-label="LinkedIn">
                    <LinkedinSvg />
                  </Link>
                  <Link href={data?.data?.pinterest ?? '#'} target="_blank" aria-label="Pintrest">
                    <PintrestSvg />
                  </Link>
                </Flex>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
