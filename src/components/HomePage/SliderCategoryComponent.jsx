import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Container, Flex, Group, Loader, Skeleton, Stack, em, Image } from '@mantine/core';
import style from './home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  HeadingFive,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { grey_font_color, heading_font_color, white_color } from '@/constant/FontColotConstant';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import { useBhkChoice, useProjectHighDemandHook } from '@/state/HomePageAPis/homePageApisHook';
import { useRecentlyPostedApi } from '@/state/recentlyPosted/recentlyPosted.hook';
import NextImage from 'next/image';
import Link from 'next/link';
import { dynamicTitleUrl, formatCurrency } from '@/util/commonFunction';
import PropertyInquiryForm from '../CustomComponents/FormContainer/PropertyInquiryForm';
import HeaderLessModal from '../CustomComponents/HeaderLessModal/HeaderLessModal';
import { getCookieClient } from '@/instance/getCookiesClient';
import { useSession } from 'next-auth/react';
import AuthModal from '../CustomComponents/AuthModal/AuthModal';
import useCityItemStore from '@/store/useCityItemStore';
import NodataFound from '@/components/CustomComponents/NodataFound/NodataFound';
import { useRouter } from 'next/navigation';
import { defaultImg } from '@/constant/ImageConstant';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';

function SliderCategoryComponent({ appCity, searchParams }) {
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { city: storeCity, change: changeCity } = useCityItemStore();
  const getCity = getCookieClient('selected_city');
  const cityInfo = getCity ? JSON.parse(getCity) : storeCity ? storeCity : appCity;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: sessionClient } = useSession();

  const recentlyPramas = useMemo(
    () => ({
      City: cityInfo?.label ?? appCity?.label,
      UserId: sessionClient?.user?.id ? sessionClient?.user?.id : 0,
    }),
    [sessionClient?.user?.id, cityInfo?.label, changeCity]
  );

  const { data: projectHighDemandData, isLoading } = useProjectHighDemandHook({
    city: cityInfo?.value ?? appCity.value,
  });

  const { data: bhkChoiceData } = useBhkChoice({
    city: cityInfo?.value ?? appCity.value,
  });
  const { data: recentlyPostedList, isPending: recentlyPostedLoading } = useRecentlyPostedApi(recentlyPramas);

  const [selectedProperty, setSelectedProperty] = useState('');
  const [isProjectOrProperty, setIsProjectOrProperty] = useState(0);
  const [AuthOpended, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);

  const handleClick = useCallback(
    (data) => {
      const newSearchParams = {
        city: cityInfo?.value || '',
        LANDMARK: cityInfo?.label || '',
        local: searchParams.local || '',
        RENTORSELL: searchParams.RENTORSELL || '1',
        PropertyCategoryID: searchParams.PropertyCategoryID || '2',
        project_property: data === 'Project' ? '1' : searchParams.project_property || '0',
        BHK: data === 'Project' ? '' : data === 0 ? '0' : data || '',
      };

      const url = parseURLParameters(
        newSearchParams.project_property,
        newSearchParams.RENTORSELL,
        newSearchParams.PropertyCategoryID,
        newSearchParams.LANDMARK,
        newSearchParams.local
      );

      const queryString = new URLSearchParams(newSearchParams).toString();
      router.push(`${url}?${queryString}`);
    },
    [cityInfo, searchParams]
  );

  var recentPropertysettings = {
    dots: false,
    infinite: recentlyPostedList && recentlyPostedList.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: false,
    arrows: recentlyPostedList && recentlyPostedList.length > 4 ? true : false,
    nextArrow: recentlyPostedList && recentlyPostedList.length > 4 ? <CustomNextArrow right={'-12px'} /> : '',
    prevArrow: recentlyPostedList && recentlyPostedList.length > 4 ? <CustomPrevArrow left={'-12px'} /> : '',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.5,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const bhksettings = {
    dots: false,
    infinite: bhkChoiceData && bhkChoiceData.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: bhkChoiceData && bhkChoiceData.length !== 0 ? <CustomNextArrow right={'-12px'} /> : null,
    prevArrow: bhkChoiceData && bhkChoiceData.length !== 0 ? <CustomPrevArrow left={'-12px'} /> : null,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      // {
      //   breakpoint: 850,
      //   settings: {
      //     slidesToShow: 2,
      //   },
      // },
      // {
      //   breakpoint: 576,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   },
      // },
    ],
  };

  const highDemandsettings = {
    centerMode: projectHighDemandData && projectHighDemandData.length > 1 ? true : false,
    centerPadding: '200px',
    slidesToShow: 1,
    swipeToSlide: true,
    infinite: projectHighDemandData && projectHighDemandData.length > 1 ? true : false,
    nextArrow:
      projectHighDemandData && projectHighDemandData.length !== 0 ? (
        <CustomNextArrow right={isMobile ? '-10px' : '-25px'} />
      ) : null,
    prevArrow:
      projectHighDemandData && projectHighDemandData.length !== 0 ? (
        <CustomPrevArrow left={isMobile ? '-10px' : '-25px'} />
      ) : null,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: projectHighDemandData && projectHighDemandData.length > 1 ? true : false,
          centerPadding: '100px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          centerMode: projectHighDemandData && projectHighDemandData.length > 1 ? true : false,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          centerMode: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={style.recent_property_container}>
        <Container size="xl">
          {/* hIGH DEMAND PROPERTIES */}
          <div className={style.explr_propty_type}>
            <Stack gap={8} mb={24}>
              <Skeleton visible={isLoading}>
                <HeadingFive fontWeight={600} textAlign={'start'}>
                  Projects In High Demand In {isClient ? cityInfo?.label : appCity.label}
                </HeadingFive>
              </Skeleton>
              <RegularBigFont color={grey_font_color}>
                Prime Location: Explore Properties in High-Demand Areas
              </RegularBigFont>
            </Stack>
            <div className={style.slider_container}>
              <Slider {...highDemandsettings}>
                {isLoading ? (
                  Array(2)
                    .fill()
                    .map((data, index) => {
                      return (
                        <div key={`High_Demand_${index}`}>
                          <Card shadow="sm" radius="md" padding={0} mx={8} my={2}>
                            <div className={style.project_high_item}>
                              <Flex align="center" justify="center" h={350}>
                                <Loader color={heading_font_color} />
                              </Flex>
                            </div>
                          </Card>
                        </div>
                      );
                    })
                ) : projectHighDemandData && projectHighDemandData.length > 0 ? (
                  projectHighDemandData?.map((values, index) => {
                    const formetedTitle = dynamicTitleUrl(values?.title);
                    return (
                      <div key={`High_Demand_${index}`}>
                        <Card shadow="sm" radius="md" padding={0} mx={8} my={2}>
                          <div className={style.project_high_item}>
                            <div className={style.project_high_details}>
                              <Link
                                href={`/project-detail/${values.projectId}/${values?.projectSEOURL}`}
                                target="_blank"
                              >
                                <div className={style.project_high_img}>
                                  <Image
                                    src={values?.filePath}
                                    alt={values?.title}
                                    width={500}
                                    height={isMobile ? 300 : 450}
                                    component={NextImage}
                                    fallbackSrc={defaultImg}
                                  />
                                </div>
                              </Link>
                              <div className={style.project_high_top}>
                                <div className={style.project_high_name}>
                                  <Skeleton visible={recentlyPostedLoading}>
                                    <HeadingFive fontWeight={600} color={white_color} lineClamp={2}>
                                      {values?.title}
                                    </HeadingFive>
                                  </Skeleton>
                                  <RegularBigFont fontWeight={500} color={white_color}>
                                    {values?.landMark}, {values?.cityName}
                                  </RegularBigFont>
                                </div>
                              </div>
                              <div className={style.project_high_bottom}>
                                <HeadingSix color={white_color} lineClamp={2}>
                                  {values?.userName}
                                </HeadingSix>
                                <Button
                                  radius="sm"
                                  size={isMobile ? 'sm' : 'md'}
                                  fw={600}
                                  className={style.white_button}
                                  onClick={() => {
                                    setSelectedProperty(values?.projectId);
                                    setIsProjectOrProperty(1);
                                    open();
                                  }}
                                >
                                  Contact
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    );
                  })
                ) : (
                  <NodataFound />
                )}
              </Slider>
            </div>
          </div>

          {/* bhk property section */}
          <div className={style.explr_propty_type}>
            <Stack gap={8} mb={24}>
              <HeadingFive fontWeight={600} textAlign={'start'}>
                BHK choice in {isClient ? cityInfo?.label : appCity.label}
              </HeadingFive>
              <RegularBigFont color={grey_font_color}>Browse by no. of bedrooms in the house</RegularBigFont>
            </Stack>
            <div className={style.slider_container}>
              {bhkChoiceData && bhkChoiceData.length > 0 ? (
                <Slider {...bhksettings}>
                  {isLoading
                    ? Array(5)
                        .fill()
                        .map((data, index) => {
                          return (
                            <div key={`BHK_${index}`}>
                              <Card shadow="sm" radius="md" padding={0} mx={8} my={2}>
                                <Skeleton h={160} />
                                <Skeleton h={20} mt={14} />
                                <Skeleton h={20} my={8} width={50} />
                              </Card>
                            </div>
                          );
                        })
                    : bhkChoiceData.slice(1)?.map((data, i) => {
                        return (
                          <div key={`BHK-property-${data.bedRooms}`}>
                            <Card
                              shadow="sm"
                              radius="md"
                              mx={8}
                              my={2}
                              onClick={() => handleClick(data?.bedRooms)}
                              style={{ cursor: 'pointer' }}
                            >
                              <Card.Section>
                                <div className={style.bhk_propty_img}>
                                  <Image
                                    // component={NextImage}
                                    src={data?.image}
                                    alt={`bhk${i}`}
                                    width={250}
                                    height={222}
                                    fallbackSrc={defaultImg.src}
                                    className={style.propertyImg_BHkImg}
                                  />
                                </div>
                              </Card.Section>
                              <Group justify="space-between" className={style.bhk_propty_item} mt={16}>
                                <HeadingSix fontWeight={500}>{data?.bedRooms} BHk</HeadingSix>

                                <RegularFont color={grey_font_color}>{data?.propertyCount}+ Properties</RegularFont>
                              </Group>
                            </Card>
                          </div>
                        );
                      })}
                </Slider>
              ) : (
                <NodataFound />
              )}
            </div>
          </div>

          <div className={style.explr_propty_type}>
            <Stack gap={8} mb={24}>
              <Skeleton visible={recentlyPostedLoading}>
                <HeadingFive fontWeight={600} textAlign={'start'}>
                  Featured Resale Properties In {isClient ? cityInfo?.label : appCity.label}
                </HeadingFive>
              </Skeleton>
              <RegularBigFont color={grey_font_color}>Act fast before these properties get snatched up</RegularBigFont>
            </Stack>

            <div className={style.slider_container}>
              {isLoading ? (
                <Flex direction="row">
                  {Array(4)
                    .fill()
                    .map((_, index) => (
                      <div key={`Recently_Posted_${index}`}>
                        <Card radius="md" p={0} mx={15} my={2}>
                          <Stack gap={16} mb={4}>
                            <Card.Section>
                              <div className={style.rectly_propty_img}>
                                <Skeleton width={300} height={222} />
                              </div>
                            </Card.Section>
                            <Stack gap={4}>
                              <Skeleton h={20} />
                              <Skeleton h={20} />
                              <Skeleton h={20} w={150} />
                            </Stack>
                            <Skeleton h={30} w={100} />
                          </Stack>
                        </Card>
                      </div>
                    ))}
                </Flex>
              ) : recentlyPostedList && recentlyPostedList.length !== 0 ? (
                <Slider {...recentPropertysettings}>
                  {recentlyPostedList.map((data, index) => {
                    const formattedTitle = dynamicTitleUrl(data?.title);
                    return (
                      <div key={`Recently_Posted_${index}`}>
                        <Card radius="md" p={0} mx={15} my={2} shadow="sm">
                          <Stack gap={16} mb={4}>
                            <Card.Section>
                              <Link href={`/property-detail/${data?.id}/${formattedTitle}`} target="_blank">
                                <div className={style.rectly_propty_img}>
                                  <Image
                                    component={NextImage}
                                    src={data?.filePath}
                                    alt={data?.title}
                                    width={300}
                                    height={222}
                                    className={style.propertyImg_recentlyPosted}
                                    fallbackSrc={defaultImg}
                                  />
                                  <div className={style.rectly_propty_label}>
                                    <RegularFont>₹ {formatCurrency(data?.rateRentValue)}</RegularFont>
                                  </div>
                                </div>
                              </Link>
                            </Card.Section>
                            <Stack gap={4} px={5} ml={10}>
                              <Link
                                href={`/property-detail/${data?.id}/${formattedTitle}?city=${cityInfo?.value}&LANDMARK=${cityInfo.label}`}
                                target="_blank"
                              >
                                <RegularBigFont lineClamp={1}>{data?.title}</RegularBigFont>
                              </Link>
                              <RegularFont color={grey_font_color} lineClamp={1}>
                                {data?.landMark}, {data?.city}
                              </RegularFont>
                              <Group justify="space-between">
                                <SmallFont color={grey_font_color}>Posted by {data?.postby}</SmallFont>
                                <SmallFont fontWeight={500} color={'#115F28'}>
                                  {data?.timeago}
                                </SmallFont>
                              </Group>
                            </Stack>
                            <Stack gap={4} px={5} mb={10} ml={10}>
                              <CustomePrimaryButton
                                btnWidth={92}
                                size="small"
                                onClick={() => {
                                  setSelectedProperty(data?.id);
                                  setIsProjectOrProperty(0);
                                  open();
                                }}
                              >
                                Contact
                              </CustomePrimaryButton>
                            </Stack>
                          </Stack>
                        </Card>
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <Stack align="center">
                  <div style={{ maxWidth: '300px' }}>
                    <NodataFound />
                  </div>
                </Stack>
              )}
            </div>
          </div>
        </Container>

        <HeaderLessModal opened={opened} close={close} size="md">
          <PropertyInquiryForm
            propertyId={selectedProperty}
            isModaleClose={close}
            Property_Project={isProjectOrProperty || 0}
          />
        </HeaderLessModal>

        <AuthModal opened={AuthOpended} close={authModalClose} />
      </div>
    </>
  );
}

export default SliderCategoryComponent;
