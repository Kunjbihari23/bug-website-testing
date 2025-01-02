import { Badge, Container, Divider, Group, Skeleton, Stack, em } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import style from './commonSlider.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { verifyIcon, defaultImg } from '@/constant/ImageConstant';
import { grey_font_color, lightgrey_font_color } from '@/constant/FontColotConstant';
import {
  HeadingFive,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { useMediaQuery } from '@mantine/hooks';
import CustomPrevArrow from '@/components/SearchPage/CustomPrevArrow';
import CustomNextArrow from '@/components/SearchPage/CustomNextArrow';
import { useAgentsListApi } from '@/state/agent/Agent.hook';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import cx from 'clsx';
import { useRouter } from 'next/navigation';
import { getCookieClient } from '@/instance/getCookiesClient';
import { useSession } from 'next-auth/react';
import useCityItemStore from '@/store/useCityItemStore';
import NodataFound from '../NodataFound/NodataFound';

function TrustedAgents({ slidesToShow = 2, smallSize = false, searchParams, propertyCity = {} }) {
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const router = useRouter();
  const [searchUrl, setSearchUrl] = useState();
  const { data: sessionClient } = useSession();

  const getCity = getCookieClient('selected_city');
  const cityInfo = useMemo(() => {
    return getCity ? JSON.parse(getCity) : propertyCity;
  }, [getCity, propertyCity]);

  const { city: cityChange } = useCityItemStore();

  const agentListBody = useMemo(
    () => ({
      UserId: sessionClient && sessionClient?.user?.id ? sessionClient.user.id : 0,
      city: cityInfo?.label ?? propertyCity?.label,
    }),
    [sessionClient?.user?.id, cityInfo?.label]
  );
  const { data: agentListData = [], isLoading: agentLoading } = useAgentsListApi(agentListBody);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('city')) {
      params.set('city', cityInfo.value);
    }
    if (!params.has('LANDMARK')) {
      params.set('LANDMARK', cityInfo.label);
    }
    setSearchUrl(params.toString());
  }, [searchParams, cityInfo]);

  const agentListSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    initialSlides: 0,
    rows: 2,
    slidesPerRow: 1,
    slidesToShow: slidesToShow,
    nextArrow: agentListData && <CustomNextArrow right={'-12px'} />,
    prevArrow: agentListData && agentListData.length > 4 && <CustomPrevArrow left={'-25px'} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`${style.section_container} ${style.trusted_section_container}`}>
      <Container size={isMobile ? 'xs' : 'xl'}>
        {/* top agents */}
        <div className={style.explr_propty_type}>
          <Stack gap={8} mb={24} maw={524}>
            <HeadingFive fontWeight={600} textAlign={'start'}>
              Our Trusted Agents
            </HeadingFive>
            <RegularBigFont color={grey_font_color}>
              Connect with Easyprops for premium agents and verified listings, finding your ideal property fast.
            </RegularBigFont>
          </Stack>

          <div className={style.slider_container}>
            <Slider {...agentListSettings}>
              {agentLoading ? (
                Array(8)
                  .fill()
                  .map((_, i) => {
                    return (
                      <div key={i}>
                        <div className={style.trustedAgent_item}>
                          <div className={style.agent_img}>
                            <Skeleton width={90} height={100} />
                          </div>
                          <div className={style.trending_projct_details}>
                            <Stack gap={4}>
                              <Skeleton height={16} radius="xl" />
                              <Skeleton height={16} radius="xl" />
                              <Skeleton height={16} width={'60%'} radius="xl" />
                            </Stack>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : agentListData && agentListData.length !== 0 ? (
                agentListData.map((data, i) => {
                  return (
                    <div key={`agent_${data?.userId}`}>
                      <div
                        className={style.trustedAgent_item}
                        onClick={() => router.push(`/agent-detail/${data?.userId}?${searchUrl}`)}
                      >
                        <div
                          className={cx(style.agent_img, {
                            [style.small_agent_img]: smallSize,
                          })}
                        >
                          <Image
                            component={NextImage}
                            src={data?.profileImage}
                            alt={data?.userName}
                            width={90}
                            height={smallSize ? 80 : 100}
                            fallbackSrc={defaultImg}
                          />
                        </div>
                        <div className={style.trending_projct_details}>
                          <Stack gap={8}>
                            <Group gap={6}>
                              {smallSize ? (
                                <RegularFont fontWeight={500} lineClamp={1} style={{ whiteSpace: 'nowrap' }}>
                                  {data?.userName?.length > 15 ? `${data?.userName.slice(0, 15)}...` : data?.userName}
                                </RegularFont>
                              ) : (
                                <HeadingSix fontWeight={500} lineClamp={1} style={{ whiteSpace: 'nowrap' }}>
                                  {data?.userName?.length > 15 ? `${data?.userName.slice(0, 15)}...` : data?.userName}
                                </HeadingSix>
                              )}
                              <Image
                                component={NextImage}
                                src={verifyIcon}
                                alt="verify-agent"
                                width={22}
                                height={22}
                                className={style.verifyIconAgent}
                              />
                            </Group>

                            <Group gap={6}>
                              {SmallFont ? (
                                <>
                                  {/* <Group gap={5}>
                                    <SmallFont fontWeight={500}>{data?.experience} years</SmallFont>
                                    <SmallFont color={lightgrey_font_color}>Experience</SmallFont>
                                  </Group>
                                  <Divider orientation="vertical" /> */}
                                  <Group gap={5}>
                                    <SmallFont fontWeight={500}>{data?.totalPropertyCount}</SmallFont>
                                    <SmallFont color={lightgrey_font_color}>Properties</SmallFont>
                                  </Group>
                                </>
                              ) : (
                                <>
                                  {/* <Group gap={5}>
                                    <RegularFont fontWeight={500}>{data?.experience} years</RegularFont>
                                    <RegularFont color={lightgrey_font_color}>Experience</RegularFont>
                                  </Group>
                                  <Divider orientation="vertical" /> */}
                                  <Group gap={5}>
                                    <RegularFont fontWeight={500}>{data?.totalPropertyCount}</RegularFont>
                                    <RegularFont color={lightgrey_font_color}>Properties</RegularFont>
                                  </Group>
                                </>
                              )}
                            </Group>
                            {/* <Badge color="#EBF8F1" size="lg" classNames={{ label: style.agent_BadgeLabel }}>
                              Real Estate Agent
                            </Badge> */}
                          </Stack>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <NodataFound discription="Currently No Agent Data Available" />
              )}
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TrustedAgents;
