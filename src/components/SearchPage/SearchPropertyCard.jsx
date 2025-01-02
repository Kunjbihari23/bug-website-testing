'use client';

import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Card,
  Divider,
  em,
  Flex,
  Grid,
  Modal,
  rem,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import style from '../SearchPage/search.module.css';
import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import Button from '../CustomComponents/CustomButtons/CustomButtons';
import {
  IconShare,
  IconHeart,
  IconPhone,
  IconMail,
  IconUser,
  IconCheck,
  IconClipboardCheck,
  IconClipboard,
} from '@tabler/icons-react';
import {
  grey_font_color,
  heading_font_color,
  light_blue,
  lightgrey_font_color,
  primary_color,
  secondary_dark,
} from '@/constant/FontColotConstant';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import noImageFound from '../../../public/img/Search/noImg.jpg';
import { formatCurrency } from '@/util/commonFunction';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import HeaderLessModal from '../CustomComponents/HeaderLessModal/HeaderLessModal';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import PropertyInquiryForm from '../CustomComponents/FormContainer/PropertyInquiryForm';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import moment from 'moment';
import {
  useAddPropertyToFavorite,
  useRemovePropertyToFavorite,
  useAddProjectToFavorite,
  useRemoveProjectToFavorite,
} from '@/state/LoginUserData/loginUserApi.hook';
import AuthModal from '../CustomComponents/AuthModal/AuthModal';

const SearchPropertyCard = ({ property, isProperty, searchParams, user }) => {
  const userId = user?.id;
  var settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(property?.favCount == 1);
  const [shareUrl, setShareUrl] = useState('');
  const [shareModalOpened, { open: openShareModal, close: closeShareModal }] = useDisclosure(false);

  const [searchUrl, setSearchUrl] = useState();
  const [opened, { open, close }] = useDisclosure(false);
  const [ownerContactOpened, { open: ownerOpened, close: ownerClosed }] = useDisclosure(false);
  const isSmallDevice = useMediaQuery(`(max-width: ${em(567)})`);
  const isTablte = useMediaQuery(`(max-width: ${em(992)})`);
  const [copied, setCopied] = useState(false);
  const [AuthOpended, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);

  const handleSuccess = (data) => {
    console.log(data && data?.message);
  };
  const handleError = (error) => {
    console.log('Something wrong for Property Liked ');
  };

  const { mutate: updateForm } = useAddPropertyToFavorite(handleSuccess, handleError);
  const { mutate: removeForm } = useRemovePropertyToFavorite(handleSuccess, handleError);

  const { mutate: updateFormProject } = useAddProjectToFavorite(handleSuccess, handleError);
  const { mutate: removeFormProject } = useRemoveProjectToFavorite(handleSuccess, handleError);

  const [isViewNumber, setIsViewNumber] = React.useState(false);

  const handleViewNumber = () => {
    setIsViewNumber(true);
    ownerOpened();
  };

  const handleContactOwner = () => {
    setIsViewNumber(false);
    ownerOpened();
  };

  const toggleHeart = () => {
    if (!userId) {
      authModalOpen();
      return;
    }
    const payload = {
      UserId: userId,
      propertyid: isProperty ? property?.id : property.projectId,
    };

    const Projectpayload = {
      UserId: userId,
      projectid: property.projectId,
    };

    const formdata = new FormData();

    formdata.append(`${isProperty ? 'Property_id' : 'Project_id'}`, payload.propertyid);
    formdata.append('user_id', payload.UserId);

    if (isHeartClicked) {
      isProperty ? removeForm(payload) : removeFormProject(Projectpayload);
    } else {
      isProperty ? updateForm(formdata) : updateFormProject(formdata);
    }

    setIsHeartClicked(!isHeartClicked);
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const description = property.description || '';
  const words = description.split(' ');
  const isTextLong = words.length > 12;
  const displayedText = isExpanded ? description : words.slice(0, 12).join(' ') + '...';

  const prefix = isProperty ? 'property' : 'project';

  const renderContactItem = (icon, label, value, isLink = false) => (
    <>
      <Grid.Col span={1}>{icon}</Grid.Col>
      <Grid.Col span={5}>
        <RegularFont fontWeight={500} color={grey_font_color}>
          {label} :
        </RegularFont>
      </Grid.Col>
      <Grid.Col span={6} className={style.email_section}>
        {isLink ? (
          <Anchor href={isLink} c={secondary_dark}>
            <RegularFont color={lightgrey_font_color}>{value}</RegularFont>
          </Anchor>
        ) : (
          <RegularFont color={lightgrey_font_color}>{value}</RegularFont>
        )}
      </Grid.Col>
    </>
  );

  const handleCopyLink = () => {
    const currentUrl = `${process.env.NEXT_PUBLIC_URL}/${isProperty ? 'property-detail' : 'project-detail'}/${isProperty ? property?.id : property.projectId}/${isProperty ? property?.propertySEOURL : property?.projectSEOURL}`;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const ShareModal = () => (
    <Modal opened={shareModalOpened} onClose={closeShareModal} title="Share this property" centered>
      <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <ActionIcon
          variant={primary_color}
          aria-label="Settings"
          onClick={handleCopyLink}
          radius="xl"
          style={{ height: '32px', width: '32px', marginBottom: '8px' }}
        >
          {copied ? (
            <IconClipboardCheck style={{ width: '80%', height: '80%' }} stroke={1.5} withArrow label="copied" />
          ) : (
            <Tooltip withArrow label="copy">
              <IconClipboard style={{ width: '80%', height: '80%' }} stroke={1.5} />
            </Tooltip>
          )}
        </ActionIcon>
      </Flex>
    </Modal>
  );

  return (
    <>
      <div className={style.card_section}>
        <Card shadow="sm" radius="md" withBorder key={property.id}>
          <Grid justify="center" align="center">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <div className={style.cardImgSlider}>
                <Slider {...settings}>
                  <div className={style.card_image_container}>
                    <Link
                      href={`/${isProperty ? 'property-detail' : 'project-detail'}/${isProperty ? property?.id : property.projectId}/${isProperty ? property?.propertySEOURL : property?.projectSEOURL}`}
                      target="_blank"
                    >
                      <Image
                        src={property.filePath}
                        component={NextImage}
                        width={400}
                        height={isSmallDevice ? 200 : 300}
                        alt={`property image-${property.id}`}
                        className={style.card_image}
                        fallbackSrc={noImageFound}
                      />
                      {property.isVerify === 1 ? (
                        <div className={style.verified_badge} size={'sm'}>
                          <IconCheck size={15} /> Verified
                        </div>
                      ) : (
                        ''
                      )}
                    </Link>
                  </div>
                </Slider>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <div className={style.cardTitle_share}>
                <div>
                  <div style={{ display: 'flex' }}>
                    <Link
                      href={`/${isProperty ? 'property-detail' : 'project-detail'}/${isProperty ? property?.id : property.projectId}/${isProperty ? property?.propertySEOURL : property?.projectSEOURL}`}
                      target="_blank"
                    >
                      <RegularBigFont fontWeight={500} className={style.cardTitle}>
                        {property.title}
                      </RegularBigFont>
                    </Link>
                  </div>
                  <RegularBigFont fontWeight={400}>
                    {isProperty
                      ? formatCurrency(property.rateRentValue)
                      : property?.priceStartingFrom == 0
                        ? ''
                        : `${formatCurrency(property?.priceStartingFrom)}`}
                  </RegularBigFont>
                  <SmallFont fontWeight={300} color={grey_font_color}>
                    {property.landMark} {property.city}
                  </SmallFont>
                </div>
                <div className={style.share_like_icons}>
                  <Tooltip label="Share" withArrow position="right">
                    <UnstyledButton onClick={openShareModal}>
                      <IconShare style={{ width: rem(22), height: rem(22), cursor: 'pointer' }} stroke={1} />
                    </UnstyledButton>
                  </Tooltip>

                  <IconHeart
                    style={{ width: rem(22), height: rem(22), cursor: 'pointer' }}
                    stroke={isHeartClicked ? 0 : 1}
                    fill={isHeartClicked ? 'red' : 'none'}
                    onClick={toggleHeart}
                  ></IconHeart>
                </div>
              </div>

              <div className={style.sq_yard_section}>
                <Grid columns={24}>
                  <Grid.Col span={{ base: isSmallDevice ? 24 : 8, md: 8 }}>
                    <div className={style.sq_yard_section1}>
                      <SmallFont fontWeight={500}>{property.unitName}</SmallFont>
                      <SmallFont fontWeight={300} color={grey_font_color}>
                        Super Built-up Area
                      </SmallFont>
                    </div>
                  </Grid.Col>
                  <Grid.Col span={{ base: isSmallDevice ? 24 : 8, md: 8 }}>
                    <div className={style.sq_yard_section1}>
                      <SmallFont fontWeight={500}>{property.facing ? `${property.facing} Facing` : ''} </SmallFont>
                      <SmallFont fontWeight={300} color={grey_font_color}>
                        Main Entrance Facing
                      </SmallFont>
                    </div>
                  </Grid.Col>
                  <Grid.Col span={{ base: isSmallDevice ? 24 : 8, md: 8 }}>
                    <div className={style.sq_yard_section3}>
                      <SmallFont fontWeight={500}>{property.furnished}</SmallFont>
                      <SmallFont fontWeight={300} color={grey_font_color}>
                        Furnishing
                      </SmallFont>
                    </div>
                  </Grid.Col>
                </Grid>
              </div>

              <Stack py={10}>
                <SmallFont color={grey_font_color} fontWeight={300}>
                  For Sale : {displayedText}
                  {isTextLong && (
                    <span
                      onClick={toggleReadMore}
                      style={{ cursor: 'pointer', color: secondary_dark, fontWeight: 500 }}
                    >
                      {isExpanded ? ' Show Less' : ' Read More'}
                    </span>
                  )}
                </SmallFont>
              </Stack>

              <div className={style.ownerDetail_section}>
                <div>
                  <RegularFont size="sm" className={style.ownerText}>
                    {property?.userTypeName} &nbsp;
                    <span style={{ color: grey_font_color, fontWeight: '300' }}>
                      {isProperty
                        ? property.createdDate
                          ? `Created: ${moment(property.createdDate).format('DD MMM YYYY')}`
                          : ''
                        : property.dateOfPossession
                          ? `Possession Date: ${moment(property.dateOfPossession).format('DD MMM YYYY')}`
                          : ''}
                    </span>
                  </RegularFont>
                  <RegularFont fontWeight={500}>
                    {isProperty ? property.propertyContactName : property.projectContactName}
                  </RegularFont>
                </div>
                <div className={style.owener_detail_btn}>
                  <Button
                    variant="outline"
                    color="blue"
                    size={isTablte ? 'extraSmall' : 'small'}
                    onClick={handleViewNumber}
                  >
                    View Number
                  </Button>
                  <Button color="blue" onClick={handleContactOwner} size={isTablte ? 'extraSmall' : 'small'}>
                    <IconPhone size={20} px={5} />
                    {`Contact ${property?.userTypeName ?? 'owner'}`}
                  </Button>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </Card>
      </div>

      <HeaderLessModal opened={opened} close={close} centered={false} size="md">
        <Stack gap={18}>
          <HeadingSix fontWeight={500}>Contact Detail</HeadingSix>
          <Divider />
          <Stack>
            <Grid>
              {property[`${prefix}ContactName`] &&
                renderContactItem(
                  <IconUser width={20} height={20} color={heading_font_color} />,
                  'Contact Name',
                  property[`${prefix}ContactName`]
                )}
              {property[`${prefix}ContactNumber`] &&
                renderContactItem(
                  <IconPhone width={20} height={20} color={heading_font_color} />,
                  'Contact Number',
                  property[`${prefix}ContactNumber`],
                  `tel:${property[`${prefix}ContactNumber`]}`
                )}
              {property[`${prefix}ContactEmail`] &&
                renderContactItem(
                  <IconMail width={20} height={20} color={heading_font_color} />,
                  'Email ID',
                  property[`${prefix}ContactEmail`],
                  `mailto:${property[`${prefix}ContactEmail`]}`
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

      <ShareModal />

      <Modal
        opened={ownerContactOpened}
        onClose={ownerClosed}
        title={`Contact to ${property?.userTypeName ?? 'owner'}`}
      >
        <Stack p={10} style={{ backgroundColor: light_blue }}>
          <PropertyInquiryForm
            propertyId={isProperty ? property.id : property?.projectId}
            propertyUser={property?.userTypeName}
            isModaleClose={ownerClosed}
            handleInquirySuccess={isViewNumber ? open : undefined}
            Property_Project={!isProperty ? 1 : 0}
          />
        </Stack>
      </Modal>

      <AuthModal opened={AuthOpended} close={authModalClose} />
    </>
  );
};

export default SearchPropertyCard;
