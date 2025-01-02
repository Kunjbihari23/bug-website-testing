'use client';

import { Divider, Flex, Skeleton, Stack, UnstyledButton, em } from '@mantine/core';
import { HeadingSix, RegularFont, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import Image from 'next/image';
import { secondary_dark } from '@/constant/FontColotConstant';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const Ameneties = ({ title, amenetiesList, isPending, PropertyDetail }) => {
  const [showMore, setShowMore] = useState(false);
  const isdesktop = useMediaQuery(`(max-width: ${em(992)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(567)})`);

  return (
    <>
      <Stack gap={24}>
        {isPending ? (
          <>
            <Skeleton h={30} w={200} />
            <Flex gap={16} wrap="wrap">
              {Array(8)
                .fill()
                .map((_, index) => {
                  return (
                    <div key={index}>
                      <Flex direction="column" justify="center" align="center" gap={4} w={120} py={8} px={4}>
                        <Skeleton h={40} w={40} />
                        <Skeleton h={14} w={100} />
                      </Flex>
                    </div>
                  );
                })}
            </Flex>
          </>
        ) : (
          <>
            <HeadingSix fontWeight={500}>{title}</HeadingSix>
            <Flex
              gap={isMobile ? 8 : 16}
              wrap="wrap"
              // justify={isMobile ? 'center' : 'flex-start'}
            >
              {
                // amenetiesList.length > 10 && !showMore
                //   ? amenetiesList?.slice(0, 10)?.map((value, index) => {
                //       return (
                //         <div key={value?.amenitiesID}>
                //           <Flex direction="column" justify="center" align="center" gap={4} w={120} py={8} px={4}>
                //             <Image src={value?.image} alt={value?.amenitiesName} width={24} height={24} />
                //             <SmallFont textAlign="center">{value?.amenitiesName}</SmallFont>
                //           </Flex>
                //         </div>
                //       );
                //     })
                //   :
                amenetiesList?.map((value, index) => {
                  return (
                    <div key={value?.amenitiesID}>
                      <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        gap={4}
                        w={isMobile ? 90 : 120}
                        py={8}
                        px={4}
                      >
                        <Image src={value?.image} alt={value?.amenitiesName} width={24} height={24} />
                        <SmallFont textAlign="center">{value?.amenitiesName}</SmallFont>
                      </Flex>
                    </div>
                  );
                })
              }
              {/* {!showMore && amenetiesList.length > 10 ? (
                <UnstyledButton onClick={() => setShowMore(true)}>
                  <RegularFont fontWeight={500} color={secondary_dark}>
                    +{amenetiesList.length - 10} more
                  </RegularFont>
                </UnstyledButton>
              ) : null} */}

              {PropertyDetail?.powerBackup ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/PowerBackup.png'}
                      alt={'Power Backup'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Power Backup</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}
              {PropertyDetail?.securityFireAlarm ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/FireSafety.png'}
                      alt={'Security/Fire Alarm'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Security/Fire Alarm</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}

              {PropertyDetail?.pujaroom ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Group-4.png'}
                      alt={'Pooja room'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Pooja room</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}

              {PropertyDetail?.studyRoom ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Group-4.png'}
                      alt={'Study Room'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Study Room</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}
              {PropertyDetail?.serventRoom ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Group-13.png'}
                      alt={'Servent Room'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Servent Room</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}
              {PropertyDetail?.storeRoom ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Group-7.png'}
                      alt={'Store Room'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Store Room</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}

              {PropertyDetail?.cabin ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Group-7.png'}
                      alt={'Cabin'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Cabin</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}

              {PropertyDetail?.propertySubCategoryName != 'Industrial Plot' &&
              PropertyDetail?.propertySubCategoryName != 'Residential Plot' &&
              PropertyDetail?.propertySubCategoryName != 'Residential' &&
              PropertyDetail?.propertySubCategoryName != 'Agricultural' &&
              PropertyDetail?.propertySubCategoryName != 'Industrial' ? (
                PropertyDetail?.furnished == 1 || PropertyDetail?.furnished == 2 || PropertyDetail?.furnished == 3 ? (
                  PropertyDetail?.furnished == 1 ? (
                    <div>
                      <Flex
                        direction="column"
                        // justify="center"
                        align="center"
                        gap={4}
                        w={isMobile ? 90 : 120}
                        py={8}
                        px={4}
                      >
                        <Image
                          src={'https://demo.easyprops.com/Content/Icons/Furnished.png'}
                          alt={'Furnished'}
                          width={24}
                          height={24}
                        />
                        <SmallFont textAlign="center">Furnished</SmallFont>
                      </Flex>
                    </div>
                  ) : PropertyDetail?.furnished == 2 ? (
                    <div>
                      <Flex
                        direction="column"
                        // justify="center"
                        align="center"
                        gap={4}
                        w={isMobile ? 90 : 120}
                        py={8}
                        px={4}
                      >
                        <Image
                          src={'https://demo.easyprops.com/Content/Icons/Semi-Furnished.png'}
                          alt={'Semi-Furnished'}
                          width={24}
                          height={24}
                        />
                        <SmallFont textAlign="center">Semi-Furnished</SmallFont>
                      </Flex>
                    </div>
                  ) : PropertyDetail?.furnished == 1 ? (
                    <div>
                      <Flex
                        direction="column"
                        // justify="center"
                        align="center"
                        gap={4}
                        w={isMobile ? 90 : 120}
                        py={8}
                        px={4}
                      >
                        <Image
                          src={'https://demo.easyprops.com/Content/Icons/Un-Furnished-01-01.png'}
                          alt={'Un - Furnished'}
                          width={24}
                          height={24}
                        />
                        <SmallFont textAlign="center">Un-Furnished</SmallFont>
                      </Flex>
                    </div>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )
              ) : (
                ''
              )}

              {PropertyDetail?.totalFloor > 0 ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Floor-01.png'}
                      alt={'Store Room'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">{PropertyDetail?.totalFloor} Floor</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}

              {PropertyDetail?.isNegotiable ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Negotiable-01.png'}
                      alt={'Negotiable'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">Negotiable</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}

              {PropertyDetail?.propertyTypeId == 3 && PropertyDetail?.sitting != null ? (
                <div>
                  <Flex
                    direction="column"
                    // justify="center"
                    align="center"
                    gap={4}
                    w={isMobile ? 90 : 120}
                    py={8}
                    px={4}
                  >
                    <Image
                      src={'https://demo.easyprops.com/Content/Icons/Seating.png'}
                      alt={'Store Room'}
                      width={24}
                      height={24}
                    />
                    <SmallFont textAlign="center">{PropertyDetail?.sitting} Seating</SmallFont>
                  </Flex>
                </div>
              ) : (
                ''
              )}

              {PropertyDetail?.allpriceIncluded == 0 || PropertyDetail?.allpriceIncluded == 1 ? (
                PropertyDetail?.allpriceIncluded == 0 ? (
                  <div>
                    <Flex
                      direction="column"
                      // justify="center"
                      align="center"
                      gap={4}
                      w={isMobile ? 90 : 120}
                      py={8}
                      px={4}
                    >
                      <Image
                        src={'https://demo.easyprops.com/Content/Icons/All_inclusive_price.png'}
                        alt={'All inclusive price'}
                        width={24}
                        height={24}
                      />
                      <SmallFont textAlign="center">All inclusive price</SmallFont>
                    </Flex>
                  </div>
                ) : PropertyDetail?.allpriceIncluded == 1 ? (
                  <div>
                    <Flex
                      direction="column"
                      // justify="center"
                      align="center"
                      gap={4}
                      w={isMobile ? 90 : 120}
                      py={8}
                      px={4}
                    >
                      <Image
                        src={'https://demo.easyprops.com/Content/Icons/Tex-01.png'}
                        alt={'Tax and Govt. charges excluded'}
                        width={24}
                        height={24}
                      />
                      <SmallFont textAlign="center"> Tax and Govt. charges excluded</SmallFont>
                    </Flex>
                  </div>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
            </Flex>
          </>
        )}
      </Stack>
      <Divider />
    </>
  );
};

export default Ameneties;
