'use client';
import React, { useEffect, useState } from 'react';
import style from './Dashboard.module.css';
import {
  Container,
  Box,
  Grid,
  Stack,
  Paper,
  TextInput,
  Button,
  Title,
  Group,
  rem,
  Image,
  Select,
  em,
  Loader,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Sidemenu from './Sidemenu';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { RegularFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import { useGetUserProfileData, useUpdateUserProfileData } from '@/state/LoginUserData/loginUserApi.hook';
import { showNotification } from '@mantine/notifications';
import { useCitylistApi } from '@/state/cityList/cityList.hook';
import { useMediaQuery } from '@mantine/hooks';

function UserProfile({ user }) {
  const isMediumScreen = useMediaQuery(`(max-width: ${em(1200)})`);
  const isTablte = useMediaQuery(`(max-width: ${em(992)})`);

  const userId = user?.id;
  const { data: profileData, isLoading: isProfileLoading, refetch } = useGetUserProfileData({ id: userId });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { data: cityList, isLoading: isCityListLoading } = useCitylistApi();

  const cityOptions = cityList?.list
    ? cityList.list.map((city) => ({
        value: city.cityId.toString(),
        label: city.cityName,
      }))
    : [];

  const handleSuccess = (data) => {
    showNotification({
      title: 'Profile Updated',
      message: data?.message,
      color: 'green',
    });
    refetch();
  };

  const handleError = (error) => {
    showNotification({
      title: 'Update Failed',
      message: 'An error occurred while updating the profile',
      color: 'red',
    });
  };

  const { mutate: updateForm, isPending: isUpdateLoading } = useUpdateUserProfileData(handleSuccess, handleError);

  const form = useForm({
    initialValues: {
      firstName: '',
      email: '',
      phoneNumber: '',
      city: '',
      area: '',
      profileImage: null,
      experience: '',
    },
  });

  useEffect(() => {
    if (profileData) {
      const cityOption = cityOptions.find((city) => city.label == profileData.city);

      form.setValues({
        firstName: profileData.userName || '',
        email: profileData.email || '',
        phoneNumber: profileData.phoneNumber || '',
        city: cityOption ? cityOption.value : '',
        area: profileData.locality || '',
        profileImage: profileData.profileImage || null,
        experience: profileData.experience || '',
      });
      setPreviewUrl(profileData.profileImage);
      setSelectedImage(profileData.profileImage);
    }
  }, [profileData]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('UserId', userId);
    formData.append('UserName', values.firstName);
    formData.append('PhoneNumber', values.phoneNumber);
    formData.append('CityID', values.city);
    formData.append('Locality', values.area);
    formData.append('Description', 'test');
    formData.append('Profileimg', selectedImage);
    formData.append('Experience', values.experience);
    updateForm(formData);
  };

  const handleImageDrop = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
      form.setFieldValue('profileImage', file);

      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <Container size={'xl'}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
        <Grid.Col span={isTablte ? 12 : isMediumScreen ? 4 : 3}>
          <Sidemenu />
        </Grid.Col>
        <Grid.Col span={isTablte ? 12 : isMediumScreen ? 8 : 9}>
          {isProfileLoading || isCityListLoading ? (
            <Container
              size="xl"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
            >
              <Loader size="xl" />
            </Container>
          ) : (
            <Paper shadow="xs" p="md">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Title order={4} mb="md" className={style.title}>
                  {profileData?.userType === 2 ? 'Agent' : 'User'} Profile
                </Title>
                <Stack spacing="md">
                  <Box className={style.flexRow}>
                    <TextInput
                      label="First name"
                      placeholder="Enter Name.."
                      className={style.inputBox}
                      {...form.getInputProps('firstName')}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Enter Email.."
                      className={style.inputBox}
                      {...form.getInputProps('email')}
                    />
                  </Box>
                  <Box className={style.flexRow}>
                    <TextInput
                      label="Phone Number"
                      placeholder="Enter Phone Number.."
                      className={style.inputBox}
                      {...form.getInputProps('phoneNumber')}
                    />
                    <Select
                      label="City"
                      placeholder="Select City"
                      data={cityOptions}
                      className={style.inputBox}
                      {...form.getInputProps('city')}
                    />
                  </Box>
                  <Box className={style.flexRow}>
                    <TextInput
                      label="Area"
                      placeholder="Enter Locality.."
                      className={style.inputBox}
                      {...form.getInputProps('area')}
                    />
                    {profileData?.userType === 2 && (
                      <NumberInput
                        label="Experience"
                        placeholder="Enter Experience (in years)"
                        className={style.inputBox}
                        allowNegative={false}
                        rightSection={' '}
                        {...form.getInputProps('experience')}
                      />
                    )}
                  </Box>

                  <label className={style.imageUpload_title} style={{ marginBottom: '0px' }}>
                    Profile Image
                  </label>
                  <Dropzone
                    onDrop={handleImageDrop}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                  >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                      {previewUrl ? (
                        <Image src={previewUrl} alt="Profile preview" width={200} height={200} fit="contain" />
                      ) : (
                        <>
                          <Dropzone.Accept>
                            <IconUpload
                              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                              stroke={1.5}
                            />
                          </Dropzone.Accept>
                          <Dropzone.Reject>
                            <IconX
                              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                              stroke={1.5}
                            />
                          </Dropzone.Reject>
                          <Dropzone.Idle>
                            <IconPhoto
                              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                              stroke={1.5}
                            />
                          </Dropzone.Idle>
                          <div>
                            <RegularFont size="xl" inline>
                              Drag images here or click to select files
                            </RegularFont>
                          </div>
                        </>
                      )}
                    </Group>
                  </Dropzone>

                  <Stack align="flex-end">
                    <Button type="submit" mt="md" className={style.updateButton} loading={isUpdateLoading}>
                      {isUpdateLoading ? 'Updating...' : 'Update'}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Paper>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default UserProfile;
