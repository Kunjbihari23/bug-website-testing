'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Container, Grid, Stack, Button, TextInput, Select, em, Loader, Image } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { primary_color } from '@/constant/FontColotConstant';
import Sidemenu from './Sidemenu';
import UserPropertyCard from './UserPropertyCard';
import style from './Dashboard.module.css';
import { useLoginUserProperty } from '@/state/LoginUserData/loginUserApi.hook';
import { useCitylistApi } from '@/state/cityList/cityList.hook';
import { useMediaQuery } from '@mantine/hooks';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';

function MyProperty({ user }) {
  const isMediumScreen = useMediaQuery(`(max-width: ${em(1200)})`);
  const isTablte = useMediaQuery(`(max-width: ${em(992)})`);
  const userId = user?.id;

  const statusOptions = {
    'All Property': '',
    'Active Property': true,
    'In-Active Property': false,
  };

  const [status, setStatus] = useState('All Property');
  const [searchParams, setSearchParams] = useState({
    UserId: userId,
    status: '',
    city: '',
    Title: '',
  });

  const form = useForm({
    initialValues: {
      UserId: userId,
      city: '',
      title: '',
    },
  });

  const { data: propertyData, refetch, isLoading } = useLoginUserProperty(userId ? searchParams : null);
  const { data: cityList } = useCitylistApi();

  const citySelectData = cityList
    ? cityList.list.map((city) => ({
        value: city.cityName || '',
        label: city.cityName || 'Unknown City',
      }))
    : [];

  const handleSubmit = (values) => {
    if (!userId) return;

    const payload = {
      UserId: userId,
      status: statusOptions[status],
      city: values.city ?? '',
      Title: values.title ?? '',
    };

    setSearchParams(payload);
  };

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, searchParams, refetch]);

  useEffect(() => {
    if (userId) {
      setSearchParams({
        UserId: userId,
        status: '',
        city: '',
        Title: '',
      });
    }
  }, [userId]);

  if (!userId) {
    return <p>Please log in to view your properties.</p>;
  }

  return (
    <div>
      <Container size={'xl'}>
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={isTablte ? 12 : isMediumScreen ? 4 : 3}>
            <Sidemenu />
          </Grid.Col>
          <Grid.Col span={isTablte ? 12 : isMediumScreen ? 8 : 9}>
            <Stack pt={10}>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid>
                  <Grid.Col span={{ bash: 6, xs: 3 }} className={style.myProperty_Search_header}>
                    <Select
                      placeholder="Select Status"
                      data={Object.keys(statusOptions)}
                      value={status}
                      onChange={setStatus}
                      allowDeselect={false}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ bash: 6, xs: 3 }} className={style.myProperty_Search_header}>
                    <Select
                      placeholder="Search By City"
                      data={citySelectData}
                      searchable
                      nothingFound="No cities found"
                      {...form.getInputProps('city')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ bash: 6, xs: 3 }} className={style.myProperty_Search_header}>
                    <TextInput placeholder="Search By Title" {...form.getInputProps('title')} />
                  </Grid.Col>
                  <Grid.Col span={{ bash: 6, xs: 3 }} className={style.myProperty_Search_header}>
                    <Button
                      type="submit"
                      leftIcon={<IconSearch />}
                      style={{ backgroundColor: primary_color, width: '100%', height: '50px', marginTop: '-1px' }}
                    >
                      Search
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Stack>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Loader color={primary_color} size="xl" />
              </div>
            ) : propertyData && propertyData.data.length > 0 ? (
              propertyData.data.map((property) => {
                return <UserPropertyCard key={property.id} property={property} />;
              })
            ) : (
              <NodataFound></NodataFound>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default MyProperty;
