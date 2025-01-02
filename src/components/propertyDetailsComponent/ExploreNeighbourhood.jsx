'use client';

import { Flex, em } from '@mantine/core';
import { HeadingFive, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import styles from './DetailsProperty.module.css';
import EmblaCarouselEasy from '../CustomComponents/EmblaCarousel/EmblaCarousel';
import MapView from '../SVG/MapView';
import LocalatyGuide from './LocalatyGuide';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { securityIcon } from '@/constant/ImageConstant';

const ExploreNeighbourhood = ({ projectDetail, propertyDetail }) => {
  const isMobile = useMediaQuery(`(max-width: ${em(567)})`);
  const OPTIONS = {};
  const slideArr = [
    {
      svg: <MapView />,
      text: 'Healthca..',
    },
    {
      svg: <MapView />,
      text: 'Healthca..',
    },
    {
      svg: <MapView />,
      text: 'Healthca..',
    },
    {
      svg: <MapView />,
      text: 'Healthca..',
    },
    {
      svg: <MapView />,
      text: 'Healthca..',
    },
    {
      svg: <MapView />,
      text: 'Healthca..',
    },
  ];

  return (
    <>
      <Flex direction="column" justify="center" mb="xl">
        <HeadingFive fontWeight={500} color="#091E42">
          Explore Neighborhood - Map View
        </HeadingFive>

        <SmallFont fontWeight={400} color="#091E42">
          Discover the trending neighborhoods in Vastrapur, Ahmedabad
        </SmallFont>
      </Flex>

      {projectDetail?.latitude && projectDetail?.longitude && (
        <iframe
          src={`https://maps.google.com/maps?q=${projectDetail.latitude},${projectDetail.longitude}&z=15&output=embed`}
          width="100%"
          height="270"
          frameBorder="0"
          style={{ border: 0, marginTop: '10px', marginBottom: '10px' }}
          allowFullScreen
        ></iframe>
      )}

      {propertyDetail?.latitude && propertyDetail?.longitude && (
        <iframe
          src={`https://maps.google.com/maps?q=${propertyDetail.latitude},${propertyDetail.longitude}&z=15&output=embed`}
          width="100%"
          height="270"
          frameBorder="0"
          style={{ border: 0, marginTop: '10px', marginBottom: '10px' }}
          allowFullScreen
        ></iframe>
      )}

      {/* <EmblaCarouselEasy options={OPTIONS} showNextPReButtions={false} showDots={false}>
        {slideArr?.map((value, index) => {
          return (
            <div className={styles.embla__ExploreNeighbour_slide} key={index}>
              <Flex direction="column" gap="sm" key={index} justify="center" align="center" w="120px" mt={10}>
                <Flex w={62} h={62} justify={'center'} align="center" className={styles.securityIconCircle}>
                  <Image src={securityIcon} alt="securityIcon" width={24} height={24} />
                </Flex>

                <SmallFont fontWeight={400}>{value?.text}</SmallFont>
              </Flex>
            </div>
          );
        })}
      </EmblaCarouselEasy> */}
      <hr style={{ margin: '20px 0' }} />
    </>
  );
};

export default ExploreNeighbourhood;
