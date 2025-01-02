import React from 'react';
import { Card, Flex, Skeleton, Stack, em, Image } from '@mantine/core';
import style from '../SearchPage/search.module.css';
import Slider from 'react-slick';
import {
  HeadingFive,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import CustomNextArrow from './CustomNextArrow';
import CustomPrevArrow from './CustomPrevArrow';
import { grey_font_color, heading_font_color, info_blue_color, secondary_dark } from '@/constant/FontColotConstant';
import { defaultImg } from '@/constant/ImageConstant';
import { useGetBlogList } from '@/state/blog/blog.hook';
import moment from 'moment';
import NextImage from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';

function Interesting_Reads({ bgColor, slidesToShow, searchParams, newSearchParams }) {
  const queryParams = {
    pageNumber: 1,
    PageSize: 10,
    currentPage: 1,
  };

  const { data: blogList, isPending } = useGetBlogList(queryParams);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);

  var settings = {
    dots: false,
    infinite: true, //blogList && blogList.length > slidesToShow ? true : false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,

    nextArrow: (
      <CustomNextArrow right={isMobile ? '-15px' : '-45px'} slideCount={blogList?.length} slidesToShow={slidesToShow} />
    ),
    prevArrow: <CustomPrevArrow left={isMobile ? '-19px' : '-25px'} />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={style.Intearesting_reads_section} style={{ backgroundColor: bgColor }}>
      <Flex
        justify={isMobile ? 'start' : 'space-between'}
        align={isMobile ? 'flex-start' : 'center'}
        pb={20}
        direction={isMobile ? 'column' : 'Row'}
        gap={10}
      >
        <div>
          <HeadingFive fontWeight={500}>Interesting Reads</HeadingFive>
          <RegularFont fontWeight={400} color={grey_font_color}>
            Read realty news, guides & articles
          </RegularFont>
        </div>
        <Link className={style.viewAll_text_move_property} href="/Blog">
          <RegularFont color={secondary_dark}>View All</RegularFont>
        </Link>
      </Flex>

      <div>
        <Slider {...settings}>
          {isPending ? (
            Array(3)
              .fill()
              .map((_, i) => {
                return (
                  <div key={`read_blog${i}`} className={style.Intearesting_reads_card}>
                    <Card p={15} me={isMobile ? 10 : 40}>
                      <Skeleton width={'100%'} height={140} />
                      <Skeleton height={20} w={100} radius="xl" />
                      <Stack gap={6}>
                        <Skeleton height={16} radius="xl" />
                        <Skeleton height={16} width="70%" radius="xl" />
                      </Stack>
                    </Card>
                  </div>
                );
              })
          ) : blogList && blogList.length !== 0 ? (
            blogList?.list?.map((data, i) => {
              return (
                <div key={`read_blog${i}`} className={style.Intearesting_reads_card}>
                  <Card p={15} me={isMobile ? 10 : 40} mih={isMobile ? 250 : 360}>
                    <Image
                      src={data?.filePath}
                      width={370}
                      height={isMobile ? 150 : 187}
                      alt={data?.blogTitle}
                      component={NextImage}
                      fallbackSrc={defaultImg}
                    />
                    <div className={style.Intearesting_reads_cardDetails}>
                      <Link href={`/Blog/${data?.blogID}/${data?.seoUrl}`} underline="hover" c={heading_font_color}>
                        <RegularFont fontWeight={500} style={{ lineHeight: '25.6px' }} lineClamp={2}>
                          {data?.blogTitle}
                        </RegularFont>
                      </Link>
                      <SmallFont fontWeight={300} color={grey_font_color}>
                        {moment(blogList?.list[0]?.insertedDate).format('D MMMM, YYYY')}
                      </SmallFont>
                    </div>
                  </Card>
                </div>
              );
            })
          ) : (
            <RegularBigFont fontWeight={500} color={info_blue_color}>
              No Blogs Available
            </RegularBigFont>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default Interesting_Reads;
