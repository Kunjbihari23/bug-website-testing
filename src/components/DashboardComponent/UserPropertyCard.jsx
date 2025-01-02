'use client';
import React from 'react';
import style from './Dashboard.module.css';
import { Grid, Stack, Group, Card, Image, em, Tooltip } from '@mantine/core';
import {
  IconBuilding,
  IconCheck,
  IconCurrencyRupee,
  IconInfoCircleFilled,
  IconMapPin,
  IconShape,
} from '@tabler/icons-react';
import {
  ExtraSmallFont,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import { grey_font_color, primary_color } from '@/constant/FontColotConstant';
import Slider from 'react-slick';
import Link from 'next/link';
import { formatCurrency } from '@/util/commonFunction';
import NextImage from 'next/image';
import noImageFound from '../../../public/img/Search/noImg.jpg';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';

function UserPropertyCard({ property, isFav = false }) {
  const truncateText = (text, wordLimit) => {
    const words = text?.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  const truncatedDescription = truncateText(property?.description, 50);

  return (
    <Stack pt={10}>
      <Card shadow="sm" radius="md" withBorder key={property.id} mb={20}>
        <Grid>
          <Grid.Col span={{ bash: 12, sm: 4, md: 4 }}>
            <div className={style.cardImgSlider}>
              <div className={style.card_image_container}>
                <Link
                  href={`/property-detail/${property?.id}/${property?.propertySEOURL}?project_property=0`}
                  target="_blank"
                >
                  <Image
                    src={property.filePath || noImageFound}
                    component={NextImage}
                    width={400}
                    height={200}
                    alt="property image"
                    className={style.card_image}
                    fallbackSrc={noImageFound}
                    radius={'sm'}
                  />
                  {property.isActive === true ? (
                    <div className={style.verified_badge} size={'sm'}>
                      <IconCheck size={12} /> Active
                    </div>
                  ) : (
                    <div className={style.not_verified_badge} size={'sm'}>
                      <IconCheck size={12} /> InActive
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8, sm: 5, md: 5 }}>
            <div className={style.cardTitle_share}>
              <div>
                <Stack p={'5px 10px'} style={{ backgroundColor: primary_color, width: 'fit-content' }}>
                  <RegularFont color="white">{property.propertySubCategoryName || 'Appartment'}</RegularFont>
                </Stack>

                <Stack pt={5}>
                  <Link
                    href={`/property-detail/${property?.id}/${property?.propertySEOURL}?project_property=0`}
                    target="_blank"
                  >
                    <RegularBigFont fontWeight={500} className={style.cardTitle}>
                      {property.title || 'No Title'}
                    </RegularBigFont>
                  </Link>
                </Stack>

                <Stack pt={5} mb={'5px'}>
                  <div className={style.div_text_center}>
                    <IconMapPin size={15} />
                    <SmallFont fontWeight={300} color={grey_font_color}>
                      {property.landMark || 'Unknown Landmark'} {property.city || 'Unknown City'}
                    </SmallFont>
                  </div>
                </Stack>

                <Group>
                  {property.bedRooms && (
                    <div className={style.div_text_center}>
                      <IconBuilding size={12} /> &nbsp;
                      <ExtraSmallFont color={grey_font_color}>{property.bedRooms || 'N/A'} BHK</ExtraSmallFont>
                    </div>
                  )}

                  <div className={style.div_text_center}>
                    <IconShape size={12} /> &nbsp;
                    <ExtraSmallFont color={grey_font_color}>{property.unitName || 'N/A'}</ExtraSmallFont>
                  </div>
                </Group>

                <Group gap={'xs'}>
                  <div className={style.propertDetail_grey}>
                    <ExtraSmallFont color="white">
                      {isFav ? property.strCarpet : property.carpet || 'N/A'}
                    </ExtraSmallFont>
                  </div>
                  <div className={style.propertDetail_grey}>
                    <ExtraSmallFont color="white">
                      {isFav ? property.strAvaibility : property.avaibility || 'N/A'}
                    </ExtraSmallFont>
                  </div>
                  <div className={style.propertDetail_grey}>
                    <ExtraSmallFont color="white">{property.floor || 'N/A'}</ExtraSmallFont>
                  </div>
                  <div className={style.propertDetail_grey}>
                    <ExtraSmallFont color="white">{property.furnished || 'N/A'}</ExtraSmallFont>
                  </div>
                </Group>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4, sm: 3, md: 3 }}>
            <Stack align="center" justify="center" gap="xs" mt={isFav && 25}>
              <Tooltip label={truncatedDescription} multiline maw={300}>
                <IconInfoCircleFilled style={{ cursor: 'pointer' }} />
              </Tooltip>

              <Group align="center" gap={'xs'}>
                <IconCurrencyRupee />
                {formatCurrency(property.rateRentValue || '0')}
              </Group>
              {!isFav && (
                <Link href={`/edit-property/${property?.id}/`}>
                  <CustomePrimaryButton size="extraSmall" btnWidth={100}>
                    <SmallFont fw={500} color="white">
                      Edit
                    </SmallFont>
                  </CustomePrimaryButton>
                </Link>
              )}

              <Stack
                p={'2px 10px'}
                mt={10}
                style={{ backgroundColor: 'orange', width: 'fit-content', borderRadius: '20px' }}
              >
                <SmallFont>Summary View: {property.viewcount || 0}</SmallFont>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
    </Stack>
  );
}

export default UserPropertyCard;
