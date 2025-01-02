import { Button, Divider, Skeleton, Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { HeadingFive } from '../CustomComponents/TypographyComponent/HeadingComponents';
import CustomPrevArrow from '../SearchPage/CustomPrevArrow';
import CustomNextArrow from '../SearchPage/CustomNextArrow';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './DetailsProperty.module.css';
import { defaultImg } from '@/constant/ImageConstant';
import { IconDownload } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useDisclosure } from '@mantine/hooks';
import AuthModal from '../CustomComponents/AuthModal/AuthModal';
import { secondary_dark } from '@/constant/FontColotConstant';

function DownloadBrochure({ title = '', imgList = [], isPending = false, browchureArr = [] }) {
  const { data: sessionClient, status } = useSession();
  const [pendingBrochure, setPendingBrochure] = useState(null);
  const [AuthOpended, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);

  const propertyImgSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: imgList && imgList.length > 3 ? 3 : imgList.length,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CustomNextArrow right={'-12px'} />,
    prevArrow: <CustomPrevArrow left={'-12px'} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
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

  const handleDownloadBrochure = (item) => {
    if (status === 'authenticated') {
      downloadBrochure(item);
    } else {
      setPendingBrochure(item);
      authModalOpen();
    }
  };

  const downloadBrochure = (item) => {
    const link = document.createElement('a');
    link.href = item.filePath;
    link.download = item.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (status === 'authenticated' && pendingBrochure) {
      downloadBrochure(pendingBrochure);
      setPendingBrochure(null);
    }
  }, [status, pendingBrochure]);

  return (
    <div>
      {imgList.length !== 0 && (
        <Stack gap={8} py={20}>
          <HeadingFive fontWeight={500}>{title} - Brochure</HeadingFive>

          <Stack gap={24} mt={20}>
            <Slider {...propertyImgSettings} className={style.propertyImg_browchureCarousal}>
              {isPending
                ? Array(5)
                    .fill()
                    .map((_, i) => (
                      <div key={i}>
                        <div className={style.trending_projct_item}>
                          <Skeleton width={282} height={212} />
                        </div>
                      </div>
                    ))
                : imgList && imgList.length > 0
                  ? imgList.map((data, i) => (
                      <div key={i}>
                        <div className={style.agent_img}>
                          <Image
                            component={NextImage}
                            src={data?.filePath}
                            alt={data?.fileName ? data.fileName : `${title}-Property`}
                            width={282}
                            height={212}
                            fallbackSrc={defaultImg}
                          />
                        </div>
                      </div>
                    ))
                  : null}
            </Slider>

            <Stack gap={12}>
              {browchureArr.map((item, index) => (
                <Button
                  key={index}
                  icon={<IconDownload />}
                  w={230}
                  onClick={() => handleDownloadBrochure(item)}
                  color={secondary_dark}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  Download Brochure
                </Button>
              ))}
            </Stack>

            <Divider />
          </Stack>
        </Stack>
      )}

      <AuthModal opened={AuthOpended} close={authModalClose} />
    </div>
  );
}

export default DownloadBrochure;
