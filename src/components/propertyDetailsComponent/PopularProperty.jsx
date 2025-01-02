'use client';

import Image from 'next/image';
import EmblaCarouselEasy from '../CustomComponents/EmblaCarousel/EmblaCarousel';
import Ahmedabad from '../../../public/img/Ahmedabad.png';
import { Flex } from '@mantine/core';
import { HeadingFive, RegularBigFont, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import styles from './DetailsProperty.module.css';
import { UsePopularLocalityList } from '@/state/localityList/localityList.hook';
import Cookies from 'js-cookie';
import { getCookieClient } from '@/instance/getCookiesClient';

const PopularProperty = () => {
  const cityName = 'Ahmedabad';
  const cityId = '153';
  const getCity = getCookieClient('selected_city');
  const cityInfo = getCity ? JSON.parse(getCity) : {};
  const { data: popularLoalitList } = UsePopularLocalityList(cityInfo?.value);
  const slideArr = [
    {
      img: Ahmedabad,
      title: 'Ahmedabad',
      desc: 'wekbeirgbuer',
    },
    {
      img: Ahmedabad,
      title: 'Ahmedabad',
      desc: 'wekbeirgbuer',
    },
    {
      img: Ahmedabad,
      title: 'Ahmedabad',
      desc: 'wekbeirgbuer',
    },
    {
      img: Ahmedabad,
      title: 'Ahmedabad',
      desc: 'wekbeirgbuer',
    },
    {
      img: Ahmedabad,
      title: 'Ahmedabad',
      desc: 'wekbeirgbuer',
    },
  ];

  const OPTIONS = {};
  return (
    <>
      <Flex gap="16px" direction="column" className={styles.popularProperty}>
        <Flex direction="column" justify="center">
          <HeadingFive fontWeight={500} color="#091E42">
            Popular Residential Areas in Vastrapur, Ahmedabad
          </HeadingFive>

          <SmallFont fontWeight={400} color="#091E42">
            Discover the trending neighborhoods in {cityInfo?.label}.
          </SmallFont>
        </Flex>

        <EmblaCarouselEasy slides={slideArr} options={OPTIONS} showNextPReButtions={false} showDots={false}>
          {slideArr?.map((val, index) => (
            <div className={styles.embla__Popular_slide} key={index}>
              {/* <div className="embla__slide__number">{index + 1}</div> */}
              <Flex className={styles.placeDescDiv}>
                <Image src={val?.img} alt="..." />
                <Flex direction="column" gap="sm" py="sm" px="md">
                  <RegularBigFont fontWeight={500}>{val?.title}</RegularBigFont>
                  <SmallFont color="#51565A" fontWeight={400}>
                    {val?.desc}
                  </SmallFont>
                </Flex>
              </Flex>
            </div>
          ))}
        </EmblaCarouselEasy>
      </Flex>
    </>
  );
};

export default PopularProperty;
