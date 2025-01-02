'use client';
import React from 'react';
import { lightgrey_font_color } from '@/constant/FontColotConstant';
import { usePropertyDeatilApi, usePropertyNewDeatilApi } from '@/state/property/property.hook';
import { Breadcrumbs, Container, Group, Text } from '@mantine/core';
import { CarouselMantine } from '../CustomComponents/carousel/CarouselMantine';
import { ExtraSmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import Footer from '../Footer/Footer';
import DetailsProject from './DetailsProject';
import style from '../propertyDetailsComponent/DetailsProperty.module.css';
import NotFound from '@/app/not-found';

const ProjectDetail = ({ propertyId, PropertyProject, searchParams, user, isLoggedIn }) => {
  const detailParam = {
    PropertyId: propertyId,
    Property_Project: PropertyProject,
  };

  const usePropertyDetail = (params, isLoggedIn) => {
    const loggedInResponse = usePropertyDeatilApi(params, isLoggedIn);
    const nonLoggedInResponse = usePropertyNewDeatilApi(params, isLoggedIn);

    return isLoggedIn ? loggedInResponse : nonLoggedInResponse;
  };

  const { data: projectDetail, isPending, error } = usePropertyDetail(detailParam, isLoggedIn);

  const isPropertyDetailEmpty = projectDetail && Object.keys(projectDetail).length === 0;

  if (!isPending && isPropertyDetailEmpty) {
    return <NotFound />;
  }

  if (error) {
    return <NotFound />;
  }

  const items = [
    { title: 'Home', href: '/' },
    { title: projectDetail?.city, href: '#' },
    {
      title: `Properties for Sell in ${projectDetail?.landMark}, ${projectDetail?.city}`,
      href: '#',
    },
    { title: projectDetail?.title, href: '#' },
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
      <DetailsProject
        user={user}
        projectDetail={projectDetail}
        propertyId={propertyId}
        PropertyProject={PropertyProject}
        isPending={isPending}
        searchParams={searchParams}
      />
      <Footer />
    </>
  );
};

export default ProjectDetail;
