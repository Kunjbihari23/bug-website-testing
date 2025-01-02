'use client';
import { Box, Card, Flex, Grid, Group, Stack, em } from '@mantine/core';
import styles from './DetailsProperty.module.css';
import {
  HeadingFive,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import Button from '../CustomComponents/CustomButtons/CustomButtons';
import { IconStar, IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import Image from 'next/image';
import shield from '../../../public/img/icon/lockSheild.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { grey_font_color, orange_color, secondary_dark } from '@/constant/FontColotConstant';
import { agent2 } from '@/constant/ImageConstant';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const LocalatyReview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMediaQuery(`(max-width: ${em(452)})`);

  const rating = [
    {
      title: 'connecting',
      rate: '4.5/5',
    },
    {
      title: 'Safety',
      rate: '5/5',
    },
    {
      title: 'Neighborhood',
      rate: '4/5',
    },
    {
      title: 'Livability',
      rate: '3.5/5',
    },
    {
      title: 'Neighborhood',
      rate: '4/5',
    },
    {
      title: 'Neighborhood',
      rate: '4/5',
    },
  ];
  const feedback = [
    {
      name: 'Ravi kumar',
      date: 'Tenant | 2 months ago',
      like: 'I like this place so much because transportation facilities are available very easily at any time. There is no any type of water logging in monsoon... read more',
      dislike:
        'Highly recommended from my suggestion I like this place so much because all facilities are available I need in th...read more',
      rate: '4.5',
    },
    {
      name: 'Ravi kumar',
      date: 'Tenant | 2 months ago',
      like: 'I like this place so much because transportation facilities are available very easily at any time. There is no any type of water logging in monsoon... read more',
      dislike:
        'Highly recommended from my suggestion I like this place so much because all facilities are available I need in th...read more',
      rate: '4.5',
    },
  ];
  const likeReview = [
    'Low pollution',
    'Adequate water',
    'Wide and spacious roads',
    'Safe for children',
    'Accessible local markets',
    'Public transport accessible',
  ];
  const dislikeReview = ['Unhygienic', 'No Parks/Parks not maintained'];

  var settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          centerMode: true,
          centerPadding: '30px',
          slidesToShow: 1,
        },
      },
    ],
  };

  const feedback_settings = {
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={feedback.length} slidesToShow={2} />,
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.localityReview} id="propertyId_Review">
      <div className={styles.localityReview_header}>
        <HeadingFive fontWeight={500}>Locality Reviews for Vastrapur</HeadingFive>
        <Button size="small">
          <IconStar size={15} /> 4.5/5
        </Button>
      </div>

      <div className={styles.localityReview_rating}>
        <RegularBigFont fontWeight={500}>Rating based on features</RegularBigFont>
        <Slider {...settings}>
          {rating.map((item, index) => (
            <div className={styles.localityReview_rate} key={index}>
              <Image src={shield} alt="Rating"></Image>
              <div>
                <SmallFont fontWeight={500}> {item.title}</SmallFont>
                <SmallFont> {item.rate}</SmallFont>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.localityReview_mention}>
        <Stack gap={24}>
          <RegularBigFont fontWeight={500}>Popular Mentions</RegularBigFont>
          <Grid gutter={16}>
            <Grid.Col span={{ base: 12, sm: 2 }}>
              <Group gap={4}>
                <IconThumbUp color={orange_color} width={20} height={20}></IconThumbUp>
                <SmallFont fontWeight={500}>Likes</SmallFont>{' '}
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 10 }}>
              <div className={styles.likeContainer}>
                {likeReview.map((item, index) => (
                  <div key={index} className={styles.localityReview_mention_like}>
                    {item}
                  </div>
                ))}
                <div className={styles.localityReview_mention_more}>+14 more</div>
              </div>
            </Grid.Col>
          </Grid>
          <Grid gutter={16}>
            <Grid.Col span={{ base: 12, sm: 2 }}>
              <Group gap={4}>
                <IconThumbDown color={orange_color} width={20} height={20}></IconThumbDown>
                <SmallFont fontWeight={500}>Dislikes</SmallFont>{' '}
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 10 }}>
              <div className={styles.likeContainer}>
                {dislikeReview.map((item, index) => (
                  <div key={index} className={styles.localityReview_mention_like}>
                    {item}
                  </div>
                ))}
              </div>
            </Grid.Col>
          </Grid>{' '}
        </Stack>
      </div>

      <div className={styles.localityReview_feedback}>
        <RegularBigFont fontWeight={500}>Review based on features</RegularBigFont>

        <Slider {...feedback_settings}>
          {feedback.map((item, index) => (
            <div className={styles.localityReview_feedback_container} key={index}>
              <Card>
                <div className={styles.localityReview_card_header}>
                  <Flex direction={isMobile ? 'column' : 'row'} align={isMobile ? 'flex-start' : 'center'} gap={10}>
                    <Image src={agent2} width={50} alt="localityReview_card_header" />
                    <Box ml={3}>
                      <SmallFont fontWeight={500}>{item.name}</SmallFont>
                      <SmallFont color={grey_font_color}>{item.date}</SmallFont>
                    </Box>
                  </Flex>
                  <div className={styles.star_rate}>
                    <IconStar style={{ color: secondary_dark, marginRight: '5px' }} />
                    <RegularFont color={secondary_dark} fontWeight={500}>
                      {item.rate}
                    </RegularFont>
                  </div>
                </div>

                <div className={styles.localityReview_content}>
                  <div className={styles.localityReview_likes}>
                    <RegularFont fontWeight={500}>
                      <IconThumbUp style={{ color: orange_color, marginRight: '5px' }} />
                      Likes
                    </RegularFont>
                    <SmallFont color={grey_font_color}>{item.like}</SmallFont>
                  </div>
                  <div className={styles.localityReview_dislikes}>
                    <RegularFont fontWeight={500}>
                      <IconThumbDown style={{ color: orange_color, marginRight: '5px' }} />
                      Dislikes
                    </RegularFont>
                    <SmallFont color={grey_font_color}>{item.like}</SmallFont>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LocalatyReview;
