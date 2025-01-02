'use client';

import { lightgrey_font_color } from '@/constant/FontColotConstant';
import { usePropertyDeatilApi, usePropertyNewDeatilApi } from '@/state/property/property.hook';
import { Breadcrumbs, Container, Group } from '@mantine/core';
import { CarouselMantine } from '../CustomComponents/carousel/CarouselMantine';
import { ExtraSmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import Footer from '../Footer/Footer';
import DetailsProperty from './DetailsProperty';
import style from './DetailsProperty.module.css';
import NotFound from '@/app/not-found';

const usePropertyDetail = (params, isLoggedIn) => {
  const loggedInResponse = usePropertyDeatilApi(params, isLoggedIn);
  const nonLoggedInResponse = usePropertyNewDeatilApi(params, isLoggedIn);

  return isLoggedIn ? loggedInResponse : nonLoggedInResponse;
};

const PropertyDetail = ({ propertyId, PropertyProject, searchParams, user, isLoggedIn }) => {
  const detailParam = {
    PropertyId: propertyId,
    Property_Project: PropertyProject,
  };

  const { data: propertyDetail, isPending } = usePropertyDetail(detailParam, isLoggedIn);

  const isPropertyDetailEmpty = propertyDetail && Object.keys(propertyDetail).length === 0;

  if (!isPending && isPropertyDetailEmpty) {
    return <NotFound />;
  }

  const items = [
    { title: 'Home', href: '/' },
    { title: propertyDetail?.city, href: '#' },
    {
      title: `Properties for Sell in ${propertyDetail?.landMark ?? ''}, ${propertyDetail?.city ?? ''}`,
      href: '#',
    },
    { title: propertyDetail?.title, href: '#' },
  ].map((item, index) => (
    <div key={`breadcrumb_${index}`}>
      <ExtraSmallFont color={lightgrey_font_color}>{item.title}</ExtraSmallFont>
    </div>
  ));

  return (
    <>
      <Container size="xl">
        <Group justify="space-between" my={16}>
          <Breadcrumbs separator=">" separatorMargin={4} classNames={{ root: style.breadcrumbs_rootClass }}>
            {items}
          </Breadcrumbs>
        </Group>
      </Container>
      <CarouselMantine />
      <DetailsProperty
        user={user}
        propertyDetail={propertyDetail}
        propertyId={propertyId}
        PropertyProject={PropertyProject}
        isPending={isPending}
        searchParams={searchParams}
      />
      <Footer />
    </>
  );
};

export default PropertyDetail;
