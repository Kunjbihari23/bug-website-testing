'use client';
import React from 'react';
import style from './Dashboard.module.css'; // Custom CSS
import { Container, Grid, Text, Group, rem, em, Loader } from '@mantine/core';
import Sidemenu from './Sidemenu';
import UserPropertyCard from './UserPropertyCard';
import { useMediaQuery } from '@mantine/hooks';
import { useUserFavoriteProperty } from '@/state/LoginUserData/loginUserApi.hook';
import { IconSearchOff } from '@tabler/icons-react';

function UserFavProperty({ user }) {
  const userId = user?.id;
  const isMediumScreen = useMediaQuery(`(max-width: ${em(1200)})`);
  const isTablet = useMediaQuery(`(max-width: ${em(992)})`);

  const { data: properties, isLoading } = useUserFavoriteProperty({ id: userId });

  return (
    <div>
      <Container size={'xl'}>
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={isTablet ? 12 : isMediumScreen ? 4 : 3}>
            <Sidemenu />
          </Grid.Col>
          <Grid.Col span={isTablet ? 12 : isMediumScreen ? 8 : 9}>
            {isLoading ? (
              <Group position="center" mt={30} justify="center">
                <Loader size="lg" />
              </Group>
            ) : properties && properties.length !== 0 ? (
              properties.map((property, index) => <UserPropertyCard key={index} property={property} isFav={true} />)
            ) : (
              <Group align="center" spacing="xs" style={{ flexDirection: 'column' }} mt={30}>
                <IconSearchOff size={20} color="gray" />
                <Text size="lg" c="dimmed">
                  No Favorite properties found
                </Text>
              </Group>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default UserFavProperty;
