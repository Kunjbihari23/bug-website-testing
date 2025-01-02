'use client';
import {
  Center,
  Container,
  Flex,
  Grid,
  Text,
  NumberInput,
  Stack,
  Group,
  Divider,
  Skeleton,
  Anchor,
  NumberFormatter,
  Tooltip,
  UnstyledButton,
  CopyButton,
  em,
  Modal,
} from '@mantine/core';
import styles from './DetailsProperty.module.css';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import PhoneSvg from '../SVG/PhoneSvg';
import Image from 'next/image';
import {
  ExtraSmallFont,
  HeadingFive,
  HeadingFour,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import PlotSvg from '../SVG/PlotSvg';
import RupeeSvg from '../SVG/RupeeSvg';
import FloorSvg from '../SVG/FloorSvg';
import CalendorSvg from '../SVG/CalendorSvg';
import OverLookingSvg from '../SVG/OverLookingSvg';
import ConfigurationSvg from '../SVG/ConfigurationSvg';
import CakeSvg from '../SVG/CakeSvg';
import PointingSvg from '../SVG/PointingSvg';
import HighLightProperty from './HighLightProperty';
import PlaceNearBy from './PlaceNearBy';
import AboutProperty from './AboutProperty';
import Ameneties from './Ameneties';
import ViewProperty from './ViewProperty';
import ExploreNeighbourhood from './ExploreNeighbourhood';
import {
  grey_font_color,
  info_blue_color,
  lightgrey_font_color,
  light_bg_yellow,
  white_color,
  heading_font_color,
} from '@/constant/FontColotConstant';
import TrustedAgents from '../CustomComponents/CommonSlider/TrustedAgents';
import LocalatyReview from './LocalatyReview';
import TrendingProjects from '../CustomComponents/CommonSlider/TrendingProjects';
import Faq from '../FAQ/Faq';
import Interesting_Reads from '../SearchPage/Interesting_Reads';
import PopularAreaSuggestion from '../SearchPage/PopularAreaSuggestion';
import SaleProperty from '../SearchPage/SaleProperty';
import MovePropertySuggestion from '../SearchPage/MovePropertySuggestion';
import {
  IconCalculator,
  IconCheck,
  IconDots,
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
  IconMail,
  IconPercentage,
  IconPhone,
  IconRefresh,
  IconShare,
  IconUser,
} from '@tabler/icons-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FileExtension, formatCurrency, renderFileType } from '@/util/commonFunction';
import HeaderLessModal from '../CustomComponents/HeaderLessModal/HeaderLessModal';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import TopLinksToSearch from '../CustomComponents/BannerComponents/TopLinksToSearch';
import DownloadBrochure from './DownloadBrochure';
import PropertyInquiryForm from '../CustomComponents/FormContainer/PropertyInquiryForm';
import { usePathname } from 'next/navigation';
import { defaultImg, locationPng } from '@/constant/ImageConstant';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import { useAddPropertyToFavorite, useRemovePropertyToFavorite } from '@/state/LoginUserData/loginUserApi.hook';
import LocalatyGuide from './LocalatyGuide';
import moment from 'moment';
import NextImage from 'next/image';
import Link from 'next/link';
import AuthModal from '../CustomComponents/AuthModal/AuthModal';
import PreviewModal from '../CustomComponents/PreviewModal/PreviewModal';

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const conversionRates = {
  'sq.ft': 1,
  'sq.yards': 0.1111,
  'sq.m': 0.0929,
};

const DetailsProperty = ({ propertyDetail, isPending, searchParams, user }) => {
  const userId = user?.id;
  const [opened, { open, close }] = useDisclosure(false);

  const propertyCity = {
    value: propertyDetail?.cityID ?? '',
    label: propertyDetail?.city ?? '',
  };

  const [showResult, setShowResult] = useState(false);
  const [emiLoading, setEmiLoading] = useState(false);
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const pathname = usePathname();
  const isTablte = useMediaQuery(`(max-width: ${em(767)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [openedLogin, { open: loginOpen, close: loginClose }] = useDisclosure(false);
  const isbiggerTablte = useMediaQuery(`(max-width: ${em(992)})`);
  const [AuthOpended, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);
  const [ownerContactOpened, { open: ownerOpened, close: ownerClosed }] = useDisclosure(false);
  const [selectedMediaArr, setSelectedMediaArr] = useState();
  const [previewOpened, { open: previewOpen, close: previewclose }] = useDisclosure(false);

  const emiForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      loanAmount: null,
      interestRate: null,
      yearsToRepay: null,
    },
    validate: {
      loanAmount: (value) => (value == null ? 'Amount is Required!' : null),
      interestRate: (value) => (value == null ? 'Interest is Required!' : null),
      yearsToRepay: (value) => (value == null ? 'Years is required!' : null),
    },
  });

  const mediaArr =
    propertyDetail &&
    propertyDetail?.imgLst &&
    propertyDetail?.imgLst.filter((file) => file?.videoImage === 1 || file?.videoImage === 2);

  const imagesArr =
    propertyDetail && propertyDetail?.imgLst && propertyDetail?.imgLst?.filter((file) => file?.videoImage === 1);

  const browchureArr = propertyDetail && propertyDetail?.imgLst?.filter((file) => file?.videoImage === 3);

  const propertyOverviewArr = [
    {
      svg: <PlotSvg />,
      title: `Plot area`,
      description: propertyDetail?.ba_PlotArea
        ? `Build Up area: ${propertyDetail?.ba_PlotArea} ${propertyDetail?.unitName ? propertyDetail?.unitName : ''}`
        : 'Plot area not available',
    },

    {
      svg: <RupeeSvg />,
      title: 'Price',
      description:
        propertyDetail && propertyDetail?.rateRentValue ? `₹ ${formatCurrency(propertyDetail?.rateRentValue)}` : '-',
    },
    {
      svg: <FloorSvg />,
      title: 'Floors',
      description:
        propertyDetail?.propertySubCategoryName === 'Bungalow'
          ? 'Ground Floor'
          : propertyDetail?.floor
            ? `${propertyDetail.floor} Floor`
            : 'Not specified',
    },
    {
      svg: <CalendorSvg />,
      title: propertyDetail?.avaibilityStatus != 'Ready to Move' ? 'Possession Date' : 'Launch Date',
      description:
        propertyDetail?.avaibilityStatus != 'Ready to Move'
          ? propertyDetail?.possession_Date
            ? `${moment(propertyDetail.possession_Date).format('D MMMM, YYYY')}`
            : 'Not specified'
          : propertyDetail?.launch_Date
            ? `${moment(propertyDetail.launch_Date).format('D MMMM, YYYY')}`
            : 'Not specified',
    },

    {
      svg: <OverLookingSvg />,
      title: 'Availability',
      description: `
        ${propertyDetail?.avaibilityStatus ? propertyDetail?.avaibilityStatus : 'Not specified'}
      `
        .trim()
        .replace(/^,|,$/g, ''),
    },

    {
      svg: <ConfigurationSvg />,
      title: 'Configuration',
      description: (() => {
        const details = `
          ${propertyDetail?.bedRooms ? `${propertyDetail.bedRooms} Bedrooms` : ''}
          ${propertyDetail?.washrooms ? `, ${propertyDetail.washrooms} Bathrooms` : ''}
          ${propertyDetail?.kitchen ? `, ${propertyDetail.kitchen} Kitchen` : ''}
          ${propertyDetail?.balcony ? `, ${propertyDetail.balcony} Balcony` : ''}
          ${propertyDetail?.hall ? `, ${propertyDetail.hall} Hall` : ''}
          ${propertyDetail?.pujaroom ? ', with Pooja Room' : ''}
          ${propertyDetail?.swimmingPool ? `, Overlooking: Pool` : ''}
          ${propertyDetail?.park ? ', Park/Garden' : ''}
          ${propertyDetail?.clubHouse ? ', Club' : ''}
        `
          .trim()
          .replace(/^,|,$/g, '');

        return details ? details : 'Not specified';
      })(),
    },

    {
      svg: <CakeSvg />,
      title: 'Property age',
      description: propertyDetail?.ageofProperty
        ? `${propertyDetail.ageofProperty} year${propertyDetail.ageofProperty > 1 ? 's' : ''} old`
        : '-',
    },

    {
      svg: <PointingSvg />,
      title: 'Facing',
      description: propertyDetail?.facing ? toTitleCase(propertyDetail.facing) : 'Not specified',
    },
  ];

  const header = {
    title: 'Similar Properties',
    subTitle: 'Where you can start living',
  };

  var imageSettings = {
    dots: mediaArr && mediaArr.length > 1 ? true : false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    nextArrow: mediaArr && mediaArr.length > 1 ? <CustomNextArrow right={'20px'} height={'30px'} width={'30px'} /> : '',
    prevArrow: mediaArr && mediaArr.length > 1 ? <CustomPrevArrow left={'20px'} height={'30px'} width={'30px'} /> : '',
  };

  const calculateEmi = (val) => {
    setEmiLoading(true);
    const P = parseFloat(val?.loanAmount);
    const r = parseFloat(val?.interestRate) / 12 / 100;
    const n = parseInt(val?.yearsToRepay) * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setEmi(emi.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setShowResult(true);
    setTimeout(() => {
      setEmiLoading(false);
    }, 1000);
  };

  const scrollToTargetAdjusted = () => {
    var element = document.getElementById('property-inquiry-form');
    var headerOffset = 250;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const handleSuccess = (data) => {
    console.log(data && data?.message);
  };
  const handleError = (error) => {
    console.log('Something wrong for Property Liked ');
  };

  const { mutate: updateForm, isLoading: isUpdateLoading } = useAddPropertyToFavorite(handleSuccess, handleError);
  const { mutate: removeForm } = useRemovePropertyToFavorite(handleSuccess, handleError);

  const toggleHeart = () => {
    if (!userId) {
      authModalOpen();
      return;
    }

    const payload = {
      UserId: userId,
      propertyid: propertyDetail?.id,
    };
    const formdata = new FormData();

    formdata.append(`Property_id`, payload.propertyid);
    formdata.append('user_id', payload.UserId);

    if (isHeartClicked) {
      removeForm(payload);
    } else {
      updateForm(formdata);
    }

    setIsHeartClicked(!isHeartClicked);
  };
  const handleImageClick = (mediaArr) => {
    setSelectedMediaArr(mediaArr);
    previewOpen();
  };

  return (
    <>
      <Container size="xl">
        <Grid align="flex-start" mt={20} mb={30} id="propertyId_Overview">
          <Grid.Col span={{ bash: 12, sm: 7 }}>
            <Stack w={isbiggerTablte && '100%'}>
              {isPending ? (
                <Skeleton h={25} w={300} />
              ) : (
                <HeadingFour fontWeight={600}>{propertyDetail?.title}</HeadingFour>
              )}
              <Group align="flex-start">
                {isPending ? (
                  <Skeleton h={90} w={120} />
                ) : (
                  propertyDetail?.developerDetail?.profileImage && (
                    <div className={styles.outerImageUserlogo}>
                      <Image
                        src={propertyDetail?.developerDetail?.profileImage}
                        height={isMobile ? 150 : 90}
                        width={150}
                        miw={150}
                        alt="logo"
                        radius={'md'}
                        component={NextImage}
                        fallbackSrc={defaultImg}
                      />
                    </div>
                  )
                )}

                <Stack gap={'xs'} w={isMobile && '100%'} align={'flex-start'} pl={15}>
                  {isPending ? (
                    <>
                      <Skeleton h={36} w={200} />
                      <Skeleton h={20} w={200} />
                      <Skeleton h={20} w={150} />
                    </>
                  ) : (
                    <>
                      {propertyDetail && propertyDetail?.propertyUserName && (
                        <Link href={'#'} style={{ textDecoration: 'underline' }}>
                          <RegularBigFont color="black" fontWeight={400}>
                            {/* By&nbsp; */}
                            {toTitleCase(propertyDetail?.propertyUserName)}
                          </RegularBigFont>
                        </Link>
                      )}

                      <div>
                        <Stack>
                          <RegularBigFont color={grey_font_color}>
                            {propertyDetail?.landMark}, {propertyDetail?.city}
                          </RegularBigFont>
                        </Stack>
                        <SmallFont color={lightgrey_font_color}>{propertyDetail?.fullAddress}</SmallFont>
                      </div>
                    </>
                  )}
                </Stack>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ bash: 12, sm: 5 }}>
            <Stack w={isbiggerTablte && '100%'} gap={'10'} align={isTablte ? 'flex-start' : 'flex-end'}>
              {isPending ? (
                <>
                  <Skeleton h={36} w={200} />
                  <Skeleton h={20} w={200} />
                  <Skeleton h={20} w={150} />
                </>
              ) : (
                <>
                  <HeadingFive fontWeight={600} textAlign="end">
                    ₹ {formatCurrency(propertyDetail?.rateRentValue) ?? 0}
                  </HeadingFive>
                  {/* <RegularFont color={info_blue_color} textAlign="end">
                    EMI start at ₹ 00 k
                  </RegularFont> */}
                  <Flex gap="sm" justify={isTablte ? 'flex-start' : 'flex-end'} w={'100%'}>
                    <CustomePrimaryButton
                      size="extraSmall"
                      btnWidth={142}
                      variant="outline"
                      onClick={() => {
                        ownerOpened();
                        // open();
                      }}
                    >
                      View Number
                    </CustomePrimaryButton>

                    <CustomePrimaryButton
                      size="extraSmall"
                      btnWidth={142}
                      icon={<PhoneSvg />}
                      onClick={() => scrollToTargetAdjusted()}
                      // onClick={() => ownerOpened()}
                    >
                      Contact Owner
                    </CustomePrimaryButton>
                  </Flex>
                </>
              )}
            </Stack>
          </Grid.Col>
        </Grid>

        <Stack gap={30}>
          <Grid gutter={{ base: 5, md: 10, lg: 30 }}>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <div className={styles.cardImgSlider}>
                <Slider {...imageSettings} className={styles.propertyDetail_carousal}>
                  {isPending ? (
                    <Skeleton height="500" width="100%" />
                  ) : mediaArr && mediaArr.length !== 0 ? (
                    mediaArr.map((val, index) => {
                      const fileExtension = FileExtension(val?.filePath);
                      const isVideo = val?.videoImage === 2;

                      return (
                        <div key={index} className={styles.carousal_slide_container}>
                          {isVideo ? (
                            <video controls muted style={{ width: '100%', maxHeight: '450px' }}>
                              <source src={val?.filePath} type={`video/${fileExtension}`} />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <>
                              <Image
                                src={val?.filePath ?? defaultImg}
                                alt={val?.fileName ?? 'image-placeholder'}
                                className={styles.background_blur}
                                layout="fill"
                                objectFit="contain"
                                component={NextImage}
                                onClick={() => handleImageClick(mediaArr)}
                              />
                              <Image
                                src={val?.filePath ?? defaultImg}
                                alt={val?.fileName ?? 'image-placeholder'}
                                className={styles.property_CarouselImg}
                                layout="fill"
                                objectFit="cover"
                                component={NextImage}
                                onClick={() => handleImageClick(mediaArr)}
                              />
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.carousal_slide_container}>
                      <Image
                        src={defaultImg}
                        alt={'image-placeholder'}
                        className={styles.property_CarouselImgNoImage}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )}
                </Slider>
                <div className={styles.carousalAction_container}>
                  <Group justify="flex-end">
                    {/* <Group gap={4} className={styles.actionIcon_darkBtn_}>
                      <IconStar width={16} height={16} color={white_color} />
                      <ExtraSmallFont color={white_color} fontWeight={500}>
                        4.5
                      </ExtraSmallFont>
                    </Group> */}
                    <Group>
                      {' '}
                      <CopyButton value={`${process.env.NEXT_PUBLIC_URL}${pathname}`} timeout={600}>
                        {({ copied, copy }) => (
                          <Group
                            gap={4}
                            className={copied ? styles.actionIcon_darkBtn : styles.actionIconBtn}
                            onClick={copy}
                          >
                            <ExtraSmallFont color={copied ? white_color : heading_font_color} fontWeight={500}>
                              {copied ? 'Copied' : 'Share'}
                            </ExtraSmallFont>{' '}
                            {copied ? (
                              <IconCheck width={16} height={16} color={white_color} />
                            ) : (
                              <IconShare width={16} height={16} color={heading_font_color} />
                            )}
                          </Group>
                        )}
                      </CopyButton>
                      <Group gap={4} className={styles.actionIconBtn} onClick={() => toggleHeart()}>
                        <ExtraSmallFont color={heading_font_color} fontWeight={500}>
                          Like
                        </ExtraSmallFont>{' '}
                        {isHeartClicked ? (
                          <IconHeartFilled width={16} height={16} color={'red'} />
                        ) : (
                          <IconHeart width={16} height={16} color={heading_font_color} />
                        )}
                      </Group>
                    </Group>
                  </Group>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 7, md: 12 }}>
                  <Stack gap={0}>
                    <Stack gap={20}>
                      <HeadingSix fontWeight={500}>Property Overview</HeadingSix>
                      <Divider></Divider>
                    </Stack>
                    <Grid gutter={40} classNames={{ inner: styles.overView_GridInner }}>
                      {propertyOverviewArr?.map((value, index) => {
                        return (
                          <Grid.Col
                            span={{ base: 12, xs: 6 }}
                            key={index}
                            py={18}
                            px={5}
                            className={styles.divofoverview}
                          >
                            <Flex gap="sm" justify="flex-start" align="center" direction="row">
                              {value?.svg}
                              <Flex
                                gap={5}
                                direction={isMobile ? 'row' : 'column'}
                                justify={isMobile ? 'space-between' : 'flex-start'}
                                w={'calc(100% - 30px)'}
                              >
                                <SmallFont textAlign="start" color={grey_font_color} fontWeight={400}>
                                  {value?.title}
                                </SmallFont>
                                {isPending ? (
                                  <Skeleton width={'100%'} h={20}></Skeleton>
                                ) : (
                                  <Text
                                    color={'#091E42'}
                                    fontWeight={600}
                                    textAlign={Center}
                                    style={{ fontSize: '14px', fontWeight: '500' }}
                                  >
                                    {value?.description}
                                  </Text>
                                )}
                              </Flex>
                            </Flex>
                          </Grid.Col>
                        );
                      })}
                    </Grid>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap={24}>
                {propertyDetail?.keyhighlights && (
                  <div id="propertyId_Highlights">
                    <HighLightProperty keyHighLight={propertyDetail?.keyhighlights} />
                  </div>
                )}

                {propertyDetail &&
                  propertyDetail.placesNearByModelList &&
                  propertyDetail?.placesNearByModelList.length !== 0 && (
                    <Stack pt={30}>
                      <PlaceNearBy places={propertyDetail?.placesNearByModelList} />
                    </Stack>
                  )}

                <AboutProperty description={propertyDetail?.description} isPending={isPending} />
                <div id="propertyId_Amenities">
                  <Ameneties
                    title={'Amenities'}
                    amenetiesList={propertyDetail?.amenitiesList}
                    PropertyDetail={propertyDetail}
                    isPending={isPending}
                  />
                </div>

                <div className={styles.agentComponent} id="propertyId_Featured_Dealers">
                  <TrustedAgents slidesToShow={2} smallSize={true} propertyCity={propertyCity} />
                </div>
                <Divider />

                {browchureArr && browchureArr.length !== 0 && (
                  <DownloadBrochure
                    title={propertyDetail?.title}
                    imgList={imagesArr}
                    browchureArr={browchureArr}
                    isPending={isPending}
                  />
                )}

                <ViewProperty searchParams={searchParams} />
              </Stack>
              <div id="propertyId_Popular_Area">
                <PopularAreaSuggestion slidesToShow={3} searchParams={searchParams} propertyCity={propertyCity} />
              </div>
              {/* <Flex className={styles.ExploreNeighbourhood} direction="column" id="propertyId_Explore_Locality">
                {propertyDetail?.latitude &&
                  propertyDetail?.longitude &&
                  propertyDetail.latitude != 0 &&
                  propertyDetail.longitude !== 0 && <ExploreNeighbourhood propertyDetail={propertyDetail} />}

                <LocalatyGuide />
              </Flex> */}
              <MovePropertySuggestion
                slidesToShow={4}
                header={header}
                searchParams={searchParams}
                propertyCity={propertyCity}
              ></MovePropertySuggestion>

              {/* <LocalatyReview></LocalatyReview> */}
              <div id="propertyId_Similar_projects">
                <TrendingProjects inDetail={true} propertyCity={propertyCity} />
              </div>
              <Faq withQuestion={'true'}></Faq>
              <div id="propertyId_News_Articles">
                <Interesting_Reads bgColor={light_bg_yellow} slidesToShow={2}></Interesting_Reads>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <div className={styles.stickySection}>
                <div className={styles.send_enquiry_section}>
                  <PropertyInquiryForm
                    propertyId={propertyDetail?.id}
                    propertyUser={propertyDetail?.userTypeName}
                    Property_Project={0}
                  />
                </div>
                <div className={styles.emi_calculator}>
                  <Stack gap={30}>
                    <form onSubmit={emiForm.onSubmit(calculateEmi)}>
                      <Stack gap={24}>
                        <Group justify="space-between">
                          <HeadingSix fontWeight={500}>EMI Calculator</HeadingSix>
                          {!emiLoading && showResult && (
                            <Tooltip withArrow label="Reset Calculator" position="top-end">
                              <UnstyledButton
                                onClick={() => {
                                  setEmiLoading(true);
                                  setTimeout(() => {
                                    emiForm.reset();
                                    setEmi(null);
                                    setTotalPayment(null);
                                    setTotalInterest(null);
                                    setShowResult(false);
                                    setEmiLoading(false);
                                  }, 1000);
                                }}
                              >
                                <IconRefresh />
                              </UnstyledButton>
                            </Tooltip>
                          )}
                        </Group>
                        <Stack gap={16}>
                          <Stack gap={4}>
                            <RegularFont fontWeight={500}>Loan Amount</RegularFont>
                            <NumberInput
                              size="lg"
                              placeholder="Loan Amount"
                              hideControls
                              leftSection={'₹'}
                              clampBehavior="strict"
                              min={0.01}
                              key={emiForm.key('loanAmount')}
                              {...emiForm.getInputProps('loanAmount')}
                            />
                          </Stack>
                          <Stack gap={4}>
                            <RegularFont fontWeight={500}>Interest Rate</RegularFont>
                            <NumberInput
                              size="lg"
                              placeholder="Interest"
                              hideControls
                              clampBehavior="strict"
                              min={0}
                              max={100}
                              leftSection={<IconPercentage size={16} />}
                              key={emiForm.key('interestRate')}
                              {...emiForm.getInputProps('interestRate')}
                            />
                          </Stack>
                          <Stack gap={4}>
                            <RegularFont fontWeight={500}>Years to Repay</RegularFont>
                            <NumberInput
                              size="lg"
                              placeholder="Years to repay"
                              hideControls
                              clampBehavior="strict"
                              min={0}
                              max={100}
                              key={emiForm.key('yearsToRepay')}
                              {...emiForm.getInputProps('yearsToRepay')}
                            />
                          </Stack>
                          <CustomePrimaryButton
                            icon={!emiLoading && <IconCalculator />}
                            fullWidth={'true'}
                            onClick={emiForm.onSubmit}
                          >
                            {emiLoading ? <IconDots /> : 'Calculate'}
                          </CustomePrimaryButton>
                        </Stack>
                      </Stack>
                    </form>

                    {!emiLoading && showResult && (
                      <Stack gap={24}>
                        <HeadingSix fontWeight={500}>Result</HeadingSix>
                        <Stack gap={8}>
                          <Flex gap="sm" justify="flex-start" align="center" direction="row">
                            <RegularFont fontWeight={500} color={grey_font_color}>
                              Monthly Payment :
                            </RegularFont>
                            <NumberFormatter prefix="₹ " thousandSeparator value={emi} />
                          </Flex>
                          <Flex gap="sm" justify="flex-start" align="center" direction="row">
                            <RegularFont fontWeight={500} color={grey_font_color}>
                              Total Payment :
                            </RegularFont>
                            <NumberFormatter prefix="₹ " thousandSeparator value={totalPayment} />
                          </Flex>
                          <Flex gap="sm" justify="flex-start" align="center" direction="row">
                            <RegularFont fontWeight={500} color={grey_font_color}>
                              Total Interest :
                            </RegularFont>
                            <NumberFormatter prefix="₹ " thousandSeparator value={totalInterest} />
                          </Flex>
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </Stack>
        {/* <div className={styles.linkContainer}>
          <TopLinksToSearch title={'Related to your search'} subTitle={'Navigate Top Listings with Ease'} />
        </div> */}
      </Container>

      <HeaderLessModal opened={opened} close={close} centered={false} size="md">
        <Stack gap={18}>
          <HeadingSix fontWeight={500}>Contact Detail</HeadingSix>
          <Divider />
          <Stack gap={8}>
            <Grid>
              {propertyDetail?.propertyContactName && (
                <>
                  <Grid.Col span={1} justify={'center'}>
                    <IconUser width={20} height={20} color={heading_font_color} />
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <RegularFont fontWeight={500} color={grey_font_color}>
                      Contact Name :
                    </RegularFont>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <RegularFont color={lightgrey_font_color}>{propertyDetail?.propertyContactName}</RegularFont>
                  </Grid.Col>
                </>
              )}

              {propertyDetail?.propertyContactNumber && (
                <>
                  <Grid.Col span={1}>
                    <IconPhone width={20} height={20} color={heading_font_color} />
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <RegularFont fontWeight={500} color={grey_font_color}>
                      Contact Number :
                    </RegularFont>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Anchor href={`tel:${propertyDetail?.propertyContactNumber}`}>
                      <RegularFont color={lightgrey_font_color}>{propertyDetail?.propertyContactNumber}</RegularFont>
                    </Anchor>
                  </Grid.Col>
                </>
              )}

              {propertyDetail?.propertyContactEmail && (
                <>
                  <Grid.Col span={1}>
                    <IconMail width={20} height={20} color={heading_font_color} />
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <RegularFont fontWeight={500} color={grey_font_color}>
                      Email ID :
                    </RegularFont>
                  </Grid.Col>
                  <Grid.Col span={6} className={styles.email_section}>
                    <Anchor href={`mailto:${propertyDetail?.propertyContactEmail}`} c={lightgrey_font_color}>
                      {propertyDetail?.propertyContactEmail}
                    </Anchor>
                  </Grid.Col>
                </>
              )}
            </Grid>
          </Stack>

          <Flex justify="flex-end">
            <CustomePrimaryButton size="extraSmall" btnWidth={100} onClick={close}>
              <Text fw={500}>Close</Text>
            </CustomePrimaryButton>
          </Flex>
        </Stack>
      </HeaderLessModal>

      <AuthModal opened={AuthOpended} close={authModalClose} />

      {propertyDetail?.id && (
        <Modal
          opened={ownerContactOpened}
          onClose={ownerClosed}
          title={`Contact to ${propertyDetail?.userTypeName ?? 'owner'}`}
        >
          <Stack p={10}>
            <PropertyInquiryForm
              propertyId={propertyDetail?.id}
              propertyUser={propertyDetail?.userTypeName}
              isModaleClose={ownerClosed}
              handleInquirySuccess={() => {
                open();
              }}
              Property_Project={0}
            ></PropertyInquiryForm>
          </Stack>
        </Modal>
      )}

      <PreviewModal opened={previewOpened} close={previewclose} mediaArr={selectedMediaArr} />
    </>
  );
};

export default DetailsProperty;
