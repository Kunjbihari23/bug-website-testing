'use client';
import {
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
  Alert,
  Paper,
  Card,
  Image,
} from '@mantine/core';
import styles from '../propertyDetailsComponent/DetailsProperty.module.css';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import PhoneSvg from '../SVG/PhoneSvg';
import NextImage from 'next/image';
import {
  ExtraSmallFont,
  HeadingFive,
  HeadingFour,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import {
  grey_font_color,
  info_blue_color,
  lightgrey_font_color,
  light_bg_yellow,
  white_color,
  heading_font_color,
  secondary_dark,
} from '@/constant/FontColotConstant';
import TrustedAgents from '../CustomComponents/CommonSlider/TrustedAgents';
import TrendingProjects from '../CustomComponents/CommonSlider/TrendingProjects';
import Faq from '../FAQ/Faq';
import Interesting_Reads from '../SearchPage/Interesting_Reads';
import PopularAreaSuggestion from '../SearchPage/PopularAreaSuggestion';
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
  IconPhotoSensor3,
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
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import PropertyInquiryForm from '../CustomComponents/FormContainer/PropertyInquiryForm';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import moment from 'moment';
import HighLightProject from './HighLightProject';
import PlaceNearBy from '../propertyDetailsComponent/PlaceNearBy';
import AboutProject from './AboutProject';
import Ameneties from '../propertyDetailsComponent/Ameneties';
import DownloadBrochure from '../propertyDetailsComponent/DownloadBrochure';
import ViewProperty from '../propertyDetailsComponent/ViewProperty';
import ExploreNeighbourhood from '../propertyDetailsComponent/ExploreNeighbourhood';
import LocalatyReview from '../propertyDetailsComponent/LocalatyReview';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import {
  defaultImg,
  locationPng,
  cakePng,
  calendarPng,
  towerPng,
  totalUnitPng,
  gpsPng,
  layerPng,
} from '@/constant/ImageConstant';
import { useAddProjectToFavorite, useRemoveProjectToFavorite } from '@/state/LoginUserData/loginUserApi.hook';
import PlaceNearByProject from './PlaceNearByProject';
import AuthModal from '../CustomComponents/AuthModal/AuthModal';
import PreviewModal from '../CustomComponents/PreviewModal/PreviewModal';

const conversionRates = {
  'sq.ft': 1,
  'sq.yards': 0.1111,
  'sq.m': 0.0929,
};

const DetailsProject = ({ projectDetail, isPending, propertyId, PropertyProject, searchParams, user }) => {
  const userId = user?.id;
  const [opened, { open, close }] = useDisclosure(false);
  const [showResult, setShowResult] = useState(false);
  const [emiLoading, setEmiLoading] = useState(false);
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const pathname = usePathname();
  const isDesktop = useMediaQuery(`(max-width: ${em(1300)})`);
  const isbiggerTablte = useMediaQuery(`(max-width: ${em(992)})`);
  const isTablte = useMediaQuery(`(max-width: ${em(767)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [AuthOpended, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [ownerContactOpened, { open: ownerOpened, close: ownerClosed }] = useDisclosure(false);
  const router = useRouter();
  const [previewOpened, { open: previewOpen, close: previewclose }] = useDisclosure(false);
  const [selectedMediaArr, setSelectedMediaArr] = useState([]);

  const propertyCity = {
    value: projectDetail?.cityID || '',
    label: projectDetail?.city || '',
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const openMap = (lat, long) => {
    if (lat && long) {
      const mapUrl = `https://www.google.com/maps?q=${lat},${long}`;
      window.open(mapUrl, '_blank');
    } else {
      alert('Location not available..');
    }
  };

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
    projectDetail &&
    projectDetail?.imageList &&
    projectDetail?.imageList.filter((file) => file?.videoImage === 1 || file?.videoImage === 2);

  const imagesArr =
    projectDetail && projectDetail?.imageList && projectDetail?.imageList?.filter((file) => file?.videoImage === 1);

  const browchureArr = projectDetail && projectDetail?.imageList?.filter((file) => file?.videoImage === 3);

  const getPriceRange = (unitDetails) => {
    if (!Array.isArray(unitDetails) || unitDetails.length === 0) {
      return '0';
    }
    const isPriceOnRequest = unitDetails.some((unit) => unit.priceOnRequest === true);
    if (isPriceOnRequest) {
      return 'Price on Request';
    }

    const prices = unitDetails
      .map((unit) => unit.price)
      .filter((price) => price != null && price !== '' && price !== 0);

    if (prices.length === 0) return '0';

    if (prices.length === 1) return formatCurrency(prices[0]);

    const minPrice = Math.min(...prices);
    // const maxPrice = Math.max(...prices);

    return `${formatCurrency(minPrice)}`;
  };

  const header = {
    title: 'Similar Properties',
    subTitle: 'Where you can start living',
  };

  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    if (projectDetail?._unitDetails?.length > 0) {
      setActivePlan(projectDetail._unitDetails[0]);
    }
  }, [projectDetail]);

  const handlePlanClick = (unitName) => {
    if (!projectDetail?._unitDetails) return;

    const selectedPlan = projectDetail._unitDetails.find((unit) => unit.unitName === unitName);
    setActivePlan(selectedPlan);
  };

  const isImage = (file) => {
    return file?.match(/\.(jpeg|jpg|gif|png)$/i);
  };

  var settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    // nextArrow: <CustomNextArrow right={'20px'} height={'30px'} width={'30px'} />,
    prevArrow: <CustomPrevArrow left={'20px'} height={'30px'} width={'30px'} />,
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

  const { mutate: updateFormProject } = useAddProjectToFavorite(handleSuccess, handleError);
  const { mutate: removeFormProject } = useRemoveProjectToFavorite(handleSuccess, handleError);

  const toggleHeart = () => {
    if (!userId) {
      authModalOpen();
      return;
    }

    const payload = {
      UserId: userId,
      projectid: projectDetail?.projectId,
    };

    const formdata = new FormData();

    formdata.append(`Project_id`, payload.projectid);
    formdata.append('user_id', payload.UserId);

    if (isHeartClicked) {
      removeFormProject(payload);
    } else {
      updateFormProject(formdata);
    }

    setIsHeartClicked(!isHeartClicked);
  };

  const toTitleCase = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const squareFeetToSquareMeters = (sqft) => (sqft * conversionRates['sq.m']).toFixed(2);

  const initialUnitArea =
    (projectDetail && projectDetail?._unitDetails && projectDetail?._unitDetails[0]?.unitArea) || 0;
  const initialUnitType =
    projectDetail && projectDetail?._unitDetails && projectDetail?._unitDetails[0]?.unitAreaTypestr;

  const [selectedUnitType, setSelectedUnitType] = useState(initialUnitType);
  const [unitArea, setUnitArea] = useState(initialUnitArea);

  useEffect(() => {
    if (typeof initialUnitArea === 'number') {
      const conversionRate = conversionRates[selectedUnitType] || conversionRates['sq.ft'];
      const newUnitArea = initialUnitArea * conversionRate;
      setUnitArea(isNaN(newUnitArea) ? 0 : newUnitArea);
    } else {
      setUnitArea(0);
    }
  }, [initialUnitArea, selectedUnitType]);

  const handleImageClick = (mediaArr) => {
    setSelectedMediaArr(mediaArr);
    previewOpen();
  };

  const PropertyCard = ({ title, size, unitString, price_sqft, price, unitArea }) => (
    <Paper p={5} withBorder style={{ width: '100%' }} className={styles.ProjectBox}>
      <Grid align="center" m={10} justify="center">
        <Grid.Col span={{ bash: 12, xs: 4 }} className={styles.AboutProjectInfo_gridCol}>
          <div className={styles.details_infoSection}>
            <Text className={styles.unitDetail_title}>{title}</Text>
          </div>
        </Grid.Col>

        <Grid.Col span={{ bash: 12, xs: 4 }} className={styles.AboutProjectInfo_gridCol}>
          <div className={styles.details_infoSection}>
            <Text className={styles.details_infoSection_header}>{unitArea}</Text>
            <Text className={styles.details_infoSection_below}>{unitString}</Text>
          </div>
        </Grid.Col>
        <Grid.Col span={{ bash: 12, xs: 4 }}>
          <div className={styles.details_infoSection}>
            <Text className={styles.details_infoSection_header}>
              {price ? `₹${formatCurrency(price)}` : 'Cost Unknown'}
            </Text>
            <Text className={styles.details_infoSection_below}>(₹{price_sqft})</Text>
          </div>
        </Grid.Col>
      </Grid>
    </Paper>
  );

  return (
    <>
      <Container size={isDesktop ? 'responsive' : 'xl'}>
        <Grid align="flex-start" mt={20} mb={30} id="propertyId_Overview">
          <Grid.Col span={{ bash: 12, sm: 7 }}>
            <Stack w={isbiggerTablte && '100%'}>
              {isPending ? (
                <Skeleton h={25} w={300} />
              ) : (
                <HeadingFour fontWeight={600}>{projectDetail?.title}</HeadingFour>
              )}
              <Group align="flex-end">
                {isPending ? (
                  <Skeleton h={90} w={120} />
                ) : (
                  projectDetail?.developerDetail?.profileImage && (
                    <div className={styles.outerImageUserlogo}>
                      <Image
                        src={projectDetail?.developerDetail?.profileImage}
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
                      <Link href={'#'} style={{ textDecoration: 'underline' }}>
                        <RegularBigFont color="#000000" fontWeight={400}>
                          {/* By&nbsp; */}
                          {projectDetail &&
                            projectDetail?.projectUserName &&
                            toTitleCase(projectDetail?.projectUserName)}
                        </RegularBigFont>
                      </Link>
                      <div>
                        <Stack>
                          <RegularBigFont color={grey_font_color}>
                            {projectDetail?.landMark}, {projectDetail?.city}
                          </RegularBigFont>
                        </Stack>
                        <SmallFont color={lightgrey_font_color}>
                          {projectDetail?.developerDetail?.full_adress}
                        </SmallFont>
                      </div>
                    </>
                  )}
                </Stack>

                <Stack align="flex-start" justify="flex-end" ml={20} className={styles.location_icon_section}>
                  <div
                    className={styles.location_icon}
                    onClick={() => openMap(projectDetail.latitude, projectDetail.longitude)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image src={locationPng} width={25} height={25} alt="location" component={NextImage} />
                  </div>
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
                  <Group>
                    <Skeleton h={40} w={150} />
                    <Skeleton h={40} w={150} />
                  </Group>
                </>
              ) : (
                <>
                  <Group justify="flex-end" gap={'0'}>
                    {getPriceRange(projectDetail?._unitDetails) == 'Price on Request' ? (
                      <HeadingFive fontWeight={600} textAlign="right">
                        {getPriceRange(projectDetail?._unitDetails)}
                      </HeadingFive>
                    ) : (
                      <>
                        <HeadingFive fontWeight={600} textAlign="right">
                          ₹{getPriceRange(projectDetail?._unitDetails)}&nbsp;
                        </HeadingFive>
                        <RegularFont fontWeight={600} textAlign="right" color={'rgb(9, 30, 66)'}>
                          {getPriceRange(projectDetail?._unitDetails) != 0 && 'Onwards'}
                        </RegularFont>
                      </>
                    )}
                    {/* <HeadingFive fontWeight={600} textAlign="right">
                      {getPriceRange(projectDetail?._unitDetails)}
                    </HeadingFive> */}
                  </Group>
                  <Flex gap="sm" justify={isTablte ? 'flex-start' : 'flex-end'} w={'100%'}>
                    <CustomePrimaryButton
                      size="extraSmall"
                      btnWidth={142}
                      variant="outline"
                      onClick={() => {
                        ownerOpened();
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
            <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
              <div className={styles.cardImgSlider}>
                <Slider {...settings} className={styles.propertyDetail_carousal}>
                  {isPending ? (
                    <Skeleton height="450" width="100%" />
                  ) : mediaArr && mediaArr.length !== 0 ? (
                    mediaArr.map((val, index) => {
                      const fileExtension = FileExtension(val?.filePath);
                      const isVideo = val?.videoImage === 2;

                      return (
                        <div key={index} className={styles.carousal_slide_container}>
                          {isVideo ? (
                            <video controls muted className={styles.video_container}>
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
                        objectFit="cover"
                        component={NextImage}
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
            <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
              <Flex justify={'space-between'}>
                {isPending ? (
                  <>
                    <Skeleton h={25} w={200} />
                  </>
                ) : (
                  <>
                    {projectDetail?.avaibilityStatus && (
                      <>
                        <RegularBigFont color={heading_font_color} fontWeight={500}>
                          Project Type
                        </RegularBigFont>
                        <div className={styles.polyDesign}>
                          <ExtraSmallFont color={white_color} fontWeight={500}>
                            {projectDetail?.avaibilityStatus}
                          </ExtraSmallFont>
                        </div>
                      </>
                    )}
                  </>
                )}
              </Flex>
              {projectDetail?.avaibilityStatus && <Divider my="md" />}

              <Stack spacing="md" className={styles.projectOverview_section}>
                {isPending ? (
                  <>
                    <Skeleton h={100} w={'100%'} />
                    <Skeleton h={100} w={'100%'} />
                  </>
                ) : (
                  projectDetail &&
                  projectDetail?._unitDetails &&
                  projectDetail?._unitDetails.map((UnitItem, index) => (
                    <>
                      <PropertyCard
                        key={index}
                        title={UnitItem?.unitName}
                        size={UnitItem?.unitAreastr ? UnitItem?.unitAreastr : 0}
                        unitString={UnitItem?.unitAreaTypestr}
                        // min_price={`₹${UnitItem?.unit_minpriceRange ? formatCurrency(UnitItem?.unit_minpriceRange) : '0'}`}
                        // max_price={`₹${UnitItem?.unit_maxpriceRange ? formatCurrency(UnitItem?.unit_maxpriceRange) : '0'}`}
                        price={UnitItem?.price}
                        unitArea={UnitItem?.unitArea}
                        price_sqft={UnitItem?.price_sqft}
                      />
                    </>
                  ))
                )}
              </Stack>
              {projectDetail?.keyhighlights && (
                <Stack pt={30} id="propertyId_Highlights">
                  <HighLightProject keyHighLight={projectDetail?.keyhighlights} />
                </Stack>
              )}
            </Grid.Col>
          </Grid>

          <Grid id="Project_Overview_section">
            <Grid.Col span={{ base: 12, md: 8 }} style={{ padding: '0px' }}>
              <Stack gap={24}>
                <Card radius="md">
                  <Stack pb={20}>
                    <HeadingSix fontWeight={500}>Project Overview</HeadingSix>
                  </Stack>

                  <Divider mt={10} mb={20} />
                  <Grid gutter="xl">
                    <Grid.Col span={isTablte ? 12 : 4} className={styles.grid_property_over}>
                      <Group justify="center" pl={10} mb={isTablte && 20}>
                        <IconPhotoSensor3 size={25} />
                        <Stack justify="center" gap="xs">
                          {projectDetail &&
                            projectDetail?._unitDetails &&
                            projectDetail?._unitDetails.slice(0, 1).map((UnitItem, index) => (
                              <div key={index}>
                                <RegularFont size="md" fontWeight={500}>
                                  Flat area
                                </RegularFont>
                                <Text size="md" color="#51565A">
                                  {UnitItem.unitArea.toFixed(2)} {UnitItem?.unitAreaTypestr}
                                </Text>
                                {/* <Stack>
                                  <SmallFont color={grey_font_color} fontWeight={300}>
                                    Build Up area: {projectDetail?.buildUparea}
                                  </SmallFont>
                                </Stack> */}
                              </div>
                            ))}
                        </Stack>
                      </Group>
                    </Grid.Col>
                    <Divider orientation="vertical" size="xs" />
                    <Grid.Col span={isTablte ? 3 : 2} className={styles.grid_property_over}>
                      <Group justify="center">
                        <Image src={layerPng} height={25} width={25} alt="layer" component={NextImage}></Image>
                        <Stack justify="center" gap="xs" ml={2}>
                          <div>
                            <RegularFont color={heading_font_color} size="md" fontWeight={500}>
                              Floors
                            </RegularFont>
                            <Text size="md" color="#51565A">
                              {projectDetail?.floor ?? '-'}
                            </Text>
                          </div>
                        </Stack>
                      </Group>
                    </Grid.Col>
                    <Divider orientation="vertical" size="xs" />
                    <Grid.Col span={isTablte ? 3 : 2} className={styles.grid_property_over}>
                      <Group justify="center">
                        <Image src={towerPng} height={25} width={25} alt="tower" component={NextImage}></Image>
                        <Stack justify="center" gap="xs">
                          <div>
                            <RegularFont color={heading_font_color} size="md" fontWeight={500}>
                              Tower
                            </RegularFont>
                            <Text size="md" color="#51565A">
                              {projectDetail?.noOfTower ?? '-'}
                            </Text>
                          </div>
                        </Stack>
                      </Group>
                    </Grid.Col>
                    <Divider orientation="vertical" size="xs" />
                    <Grid.Col span={isTablte ? 4 : 3} className={styles.grid_property_over}>
                      <Group justify="center">
                        <Image src={totalUnitPng} height={25} width={25} alt="tower" component={NextImage}></Image>
                        <Stack justify="center" gap="xs">
                          <div>
                            <RegularFont color={heading_font_color} size="md" fontWeight={500}>
                              Total Units
                            </RegularFont>
                            <Text size="md" color="#51565A">
                              {projectDetail?.totalUnits ?? '-'}
                            </Text>
                          </div>
                        </Stack>
                      </Group>
                    </Grid.Col>
                  </Grid>

                  <Divider mt={'20px'} />

                  <Group
                    mt={30}
                    style={{
                      width: projectDetail?.avaibilityStatus === 'Under construction' ? '100%' : 'calc(80% - 40px)',
                    }}
                    justify="space-between"
                  >
                    <Group>
                      <Image src={calendarPng} height={25} width={25} alt="launch" component={NextImage}></Image>
                      <Stack justify="center" gap="xs">
                        <div>
                          <RegularFont size="md" fontWeight={'500'} color={heading_font_color}>
                            Launch Date
                          </RegularFont>
                          <SmallFont size="md" color="#51565A" fontWeight={300}>
                            {projectDetail?.launch_Date
                              ? moment(projectDetail?.launch_Date).format('D MMMM, YYYY')
                              : 'Not available'}
                          </SmallFont>
                        </div>
                      </Stack>
                    </Group>

                    {projectDetail?.avaibilityStatus == 'Under construction' && (
                      <Group justify="center">
                        <Image src={calendarPng} height={25} width={25} alt="launch" component={NextImage}></Image>
                        <Stack justify="center" gap="xs">
                          <div>
                            <RegularFont size="md" fontWeight={'500'} color={heading_font_color}>
                              Possession Date
                            </RegularFont>
                            <SmallFont size="md" color="#51565A" fontWeight={300}>
                              {projectDetail?.dateOfPossession
                                ? moment(projectDetail?.dateOfPossession).format('D MMMM, YYYY')
                                : 'Not available'}
                            </SmallFont>
                          </div>
                        </Stack>
                      </Group>
                    )}

                    <Group>
                      <Image src={cakePng} height={25} width={25} alt="cake" component={NextImage}></Image>
                      <Stack justify="center" gap="xs">
                        <div>
                          <RegularFont size="md" fontWeight={'500'} color={heading_font_color}>
                            Property Age
                          </RegularFont>
                          <SmallFont size="md" color="#51565A" fontWeight={300}>
                            {projectDetail?.avaibilityStatus == 'Under construction'
                              ? 'Under construction'
                              : projectDetail?.ageOfProject
                                ? `${projectDetail.ageOfProject} year${projectDetail.ageOfProject > 1 ? 's' : ''} old`
                                : 'Not available'}
                          </SmallFont>
                        </div>
                      </Stack>
                    </Group>

                    {/* <Group justify="center">
                      <Image src={gpsPng} height={25} width={25} alt="facing" component={NextImage}></Image>
                      <Stack justify="center" gap="xs">
                        <div>
                          <RegularFont size="md" fontWeight={'500'} color={heading_font_color}>
                            Facing
                          </RegularFont>
                          <SmallFont size="md" color="#51565A" fontWeight={300}>
                            {projectDetail?.facing ? toTitleCase(projectDetail.facing) : 'Not specified'}{' '}
                          </SmallFont>
                        </div>
                      </Stack>
                    </Group> */}
                  </Group>
                  <Divider mt={'30px'} />
                </Card>

                <div>
                  <Stack pb={20}>
                    <HeadingSix fontWeight={500}>Floor Plan & Pricing</HeadingSix>
                  </Stack>

                  <Group mb="md">
                    {projectDetail &&
                      projectDetail?._unitDetails &&
                      projectDetail?._unitDetails.map((UnitItem, index) => (
                        <CustomePrimaryButton
                          key={index}
                          size="small"
                          variant={activePlan?.unitName === UnitItem?.unitName ? 'light' : 'outline'}
                          onClick={() => handlePlanClick(UnitItem.unitName)}
                        >
                          {UnitItem?.unitName}
                        </CustomePrimaryButton>
                      ))}
                  </Group>

                  {activePlan ? (
                    <Card mt="md" shadow="sm" padding="lg" radius="md" withBorder>
                      <Stack>
                        <Text weight={700} size="lg">
                          {activePlan.unitAreastr}
                          <Text size="sm" component="span" c="#51565A">
                            ({squareFeetToSquareMeters(activePlan.unitArea)} sq.m)
                          </Text>
                        </Text>
                        <div style={{ display: 'flex', gap: '5px', color: '#51565A', fontWeight: '400' }}>
                          <span> Super built-up Area </span>
                          <Divider orientation="vertical" size="xs" color="#DCDDDE" ml={10} mr={10} />
                          <span>{activePlan?.unitName}</span>
                        </div>

                        {activePlan?.notes && (
                          <Stack>
                            <span style={{ color: '#51565A', fontWeight: '400' }}>Notes : {activePlan?.notes}</span>
                          </Stack>
                        )}
                        {activePlan.layout && isImage(activePlan.layout) ? (
                          <Image
                            src={activePlan.layout}
                            alt={`${activePlan.unitName} layout`}
                            width={210}
                            height={200}
                            component={NextImage}
                            className={styles.floor_plan_img}
                            onClick={() => handleImageClick(activePlan.layout)}
                          />
                        ) : activePlan.layout && activePlan.layout.endsWith('.pdf') ? (
                          <a href={activePlan.layout} target="_blank" rel="noopener noreferrer" download>
                            <CustomePrimaryButton mt="md" variant="outline" size="md">
                              Download PDF
                            </CustomePrimaryButton>
                          </a>
                        ) : (
                          <SmallFont color={grey_font_color}>Layout not available</SmallFont>
                        )}
                      </Stack>
                    </Card>
                  ) : (
                    <Text>Select a plan to view details</Text>
                  )}
                </div>

                <div id="propertyId_Amenities">
                  <Ameneties
                    title={'Amenities'}
                    amenetiesList={projectDetail?.amenitiesList}
                    PropertyDetail={projectDetail}
                    isPending={isPending}
                  />
                </div>

                <AboutProject description={projectDetail?.description} isPending={isPending} />

                {projectDetail?.placesNearByModelList && projectDetail?.placesNearByModelList.length !== 0 && (
                  <>
                    <Stack pt={30}>
                      <PlaceNearByProject places={projectDetail?.placesNearByModelList} />
                    </Stack>
                    <Divider />
                  </>
                )}

                {/* <div className={styles.agentComponent} id="propertyId_Featured_Dealers">
                  <TrustedAgents slidesToShow={2} smallSize={true} />
                </div> */}
                <DownloadBrochure
                  title={projectDetail?.title}
                  imgList={imagesArr}
                  browchureArr={browchureArr}
                  isPending={isPending}
                />
                <ViewProperty searchParams={searchParams} />
              </Stack>
              <PopularAreaSuggestion slidesToShow={3} searchParams={searchParams} propertyCity={propertyCity} />
              <ExploreNeighbourhood projectDetail={projectDetail} />

              <div id="propertyId_Recommendations">
                <MovePropertySuggestion
                  slidesToShow={4}
                  header={header}
                  searchParams={searchParams}
                  propertyCity={propertyCity}
                ></MovePropertySuggestion>
              </div>

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
                    propertyId={projectDetail?.projectId}
                    propertyUser={projectDetail?.propertyContactName}
                    Property_Project={1}
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
                            <RegularFont fontWeight={500}>Loan Amount </RegularFont>
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

      <HeaderLessModal opened={opened} close={close} centered={false}>
        <Stack gap={18}>
          <HeadingSix fontWeight={500}>Contact Detail </HeadingSix>
          <Divider />

          <Stack gap={8}>
            <Grid>
              {(projectDetail?.propertyContactName ?? projectDetail?.projectUserName) && (
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
                    <RegularFont color={lightgrey_font_color}>
                      {projectDetail?.propertyContactName ?? projectDetail?.projectUserName}
                    </RegularFont>
                  </Grid.Col>
                </>
              )}

              {(projectDetail?.propertyContactNumber ?? projectDetail?.developerPhoneNumber) && (
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
                    <Anchor href={`tel:${projectDetail?.propertyContactNumber ?? projectDetail?.developerPhoneNumber}`}>
                      <RegularFont color={lightgrey_font_color}>
                        {projectDetail?.propertyContactNumber ?? projectDetail?.developerPhoneNumber}
                      </RegularFont>
                    </Anchor>
                  </Grid.Col>
                </>
              )}

              {(projectDetail?.propertyContactEmail ?? projectDetail?.projectUserEmail) && (
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
                    <Anchor
                      href={`mailto:${projectDetail?.propertyContactEmail ?? projectDetail?.projectUserEmail ?? ''}`}
                      c={lightgrey_font_color}
                    >
                      {projectDetail?.propertyContactEmail ?? projectDetail?.projectUserEmail ?? ''}
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

      {projectDetail?.projectId && (
        <Modal
          opened={ownerContactOpened}
          onClose={ownerClosed}
          title={`Contact to ${projectDetail?.userTypeName ?? 'owner'}`}
        >
          <Stack p={10}>
            <PropertyInquiryForm
              propertyId={projectDetail?.projectId}
              propertyUser={projectDetail?.userTypeName}
              isModaleClose={ownerClosed}
              handleInquirySuccess={() => {
                open();
              }}
              Property_Project={1}
            ></PropertyInquiryForm>
          </Stack>
        </Modal>
      )}
      <PreviewModal opened={previewOpened} close={previewclose} mediaArr={selectedMediaArr} />
    </>
  );
};

export default DetailsProject;
