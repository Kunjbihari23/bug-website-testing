import {
  ErrorText,
  HeadingSix,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { ActionIcon, Box, Button, Group, Modal, rem, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';
import style from './PropertyMainSection.module.css';
import { showNotification } from '@mantine/notifications';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';

const PropertyStepFive = ({
  form,
  imagesArray,
  handleImageUpload,
  handleVideoUpload,
  coverImage,
  coverImageUrl,
  handleCoverImageEdit,
  handleCoverImageUpload,
  handleDeleteCoverImage,
  imagesUrlArray,
  videoArray,
  videoUrlArray,
  handleDeleteImage,
  handleDeleteVideo,
  isEdit,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}) => {
  const checkAndUploadCoverImage = (files) => {
    const file = files[0];
    if (file.size > 2 * 1024 * 1024) {
      showNotification({
        title: 'File size exceeded',
        message: 'Please upload a cover image under 2 MB.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
        autoClose: 4000,
      });
      return;
    }
    handleCoverImageUpload(files);
  };

  const checkAndUploadImages = (files) => {
    const oversizedFiles = files.filter((file) => file.size > 2 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      showNotification({
        title: 'File size exceeded',
        message: 'Please upload images under 2 MB each.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
        autoClose: 4000,
      });
      return;
    }
    handleImageUpload(files);
  };

  const handleReject = (files) => {
    const sizeErrors = files.filter((file) => file.errors[0]?.code === 'file-too-large');
    const typeErrors = files.filter((file) => file.errors[0]?.code === 'file-invalid-type');

    if (sizeErrors.length > 0) {
      showNotification({
        title: 'File size exceeded',
        message: 'Please upload images under 2 MB.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
        autoClose: 4000,
      });
    }

    if (typeErrors.length > 0) {
      showNotification({
        title: 'Invalid file type',
        message: 'Please upload up to 10 photos (JPEG, JPG, PNG) only.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
        autoClose: 4000,
      });
    }
  };

  const checkAndUploadVideos = (files) => {
    const oversizedFiles = files.filter((file) => file.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      showNotification({
        title: 'File size exceeded',
        message: 'Please upload videos under 50 MB each.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
        autoClose: 4000,
      });
      return;
    }
    handleVideoUpload(files);
  };

  const handleVideoReject = (files) => {
    const sizeErrors = files.filter((file) => file.errors[0]?.code === 'file-too-large');
    const typeErrors = files.filter((file) => file.errors[0]?.code === 'file-invalid-type');

    if (sizeErrors.length > 0) {
      showNotification({
        title: 'File size exceeded',
        message: 'Please upload videos under 50 MB.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
        autoClose: 4000,
      });
    }

    if (typeErrors.length > 0) {
      showNotification({
        title: 'Invalid file type',
        message: 'Please upload videos in MP4, MOV, WMV, FLV, AVI, WebM, or MKV format only.',
        color: 'red',
        icon: <IconX size="1.1rem" />,
        autoClose: 4000,
      });
    }
  };

  const handleModalSubmit = () => {
    handleSubmit(true);
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>{isEdit ? 'Edit' : 'Add'} photos/video of your Property</HeadingSix>

        <Stack gap={16}>
          {imagesUrlArray.length === 0 ? (
            <Stack gap={8}>
              <RegularFont color="#51565A" fontWeight={400}>
                Upload from your device
              </RegularFont>
              <Dropzone
                onDrop={(files) => checkAndUploadImages(files)}
                onReject={handleReject}
                maxSize={2 * 1024 ** 2}
                accept={['image/png', 'image/jpeg', 'image/jpg']}
                maxFiles={10 - imagesUrlArray.length}
              >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
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
                  <Dropzone.Idle></Dropzone.Idle>

                  <Stack justify="center" align="center">
                    <HeadingSix fontWeight={500}>+Add at least 2 photos</HeadingSix>
                    <Stack gap={0} justify="center" align="center">
                      <SmallFont color="#51565A" fontWeight={300}>
                        Select your photo here
                      </SmallFont>
                      <SmallFont color="#51565A" fontWeight={300}>
                        Up to 10 photos , Max size 10 MB , Format - png, jpg, jpeg.
                      </SmallFont>
                    </Stack>
                  </Stack>
                </Group>
              </Dropzone>
            </Stack>
          ) : (
            <></>
          )}

          <Stack gap={8}>
            {imagesUrlArray.length > 0 ? (
              <RegularFont color="#51565A" fontWeight={400}>
                Images
              </RegularFont>
            ) : (
              ''
            )}
            {form.errors.FileAttach && <ErrorText>{form.errors.FileAttach}</ErrorText>}
            <Group>
              {imagesUrlArray &&
                imagesUrlArray.map((imageItem, index) => {
                  return (
                    <Box key={index} pos={'relative'} className={style.imageWrapper}>
                      <Image
                        src={imageItem && imageItem?.filePath ? imageItem?.filePath : imageItem}
                        key={imageItem}
                        width={150}
                        height={150}
                        style={{
                          objectFit: 'contain',
                        }}
                        alt={`upload image ${index}`}
                      />
                      <ActionIcon
                        classNames={{
                          root: 'deleteImageBtn',
                        }}
                        color="yellow"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Box>
                  );
                })}

              {imagesArray.length > 0 && imagesArray.length <= 9 ? (
                <Dropzone
                  onDrop={(files) => checkAndUploadImages(files)}
                  onReject={handleReject}
                  maxSize={2 * 1024 ** 2}
                  accept={['image/png', 'image/jpeg', 'image/jpg']}
                  maxFiles={10 - imagesArray.length}
                  w={160}
                  h={160}
                  p={0}
                >
                  <Group h={120} justify="center" style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload
                        style={{ width: rem(20), height: rem(20), color: 'var(--mantine-color-blue-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        style={{ width: rem(20), height: rem(20), color: 'var(--mantine-color-red-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle></Dropzone.Idle>

                    <Stack w={'100%'} h={'100%'} justify="center" align="center">
                      <HeadingSix fontWeight={500}>+Add More</HeadingSix>
                    </Stack>
                  </Group>
                </Dropzone>
              ) : (
                ''
              )}
            </Group>
          </Stack>
        </Stack>

        <Stack gap={16}>
          <RegularFont color="#51565A" fontWeight={400}>
            Upload cover image from your device
          </RegularFont>
          {coverImageUrl === null || coverImageUrl === '' ? (
            <Dropzone
              onDrop={(files) => checkAndUploadCoverImage(files)}
              onReject={handleReject}
              maxSize={2 * 1024 ** 2}
              accept={['image/png', 'image/jpeg', 'image/jpg']}
              maxFiles={1}
              multiple={false}
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
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

                <Stack justify="center" align="center">
                  <HeadingSix fontWeight={500}>Add cover image</HeadingSix>
                  <Stack gap={0} justify="center" align="center">
                    <SmallFont color="#51565A" fontWeight={300}>
                      Select your cover image here
                    </SmallFont>
                    <SmallFont color="#51565A" fontWeight={300}>
                      Max size 2 MB, Format - png, jpg, jpeg.
                    </SmallFont>
                  </Stack>
                </Stack>
              </Group>
              {form.errors.coverImageFile && <ErrorText>{form.errors.coverImageFile}</ErrorText>}
            </Dropzone>
          ) : (
            <Box pos={'relative'} className={style.imageWrapper}>
              <Image
                src={coverImageUrl}
                width={200}
                height={200}
                style={{
                  objectFit: 'contain',
                }}
                alt="Cover image"
              />
              <ActionIcon
                classNames={{
                  root: 'deleteImageBtn',
                }}
                color="yellow"
                onClick={handleDeleteCoverImage}
              >
                <IconTrash />
              </ActionIcon>
            </Box>
          )}
        </Stack>

        <Stack gap={16}>
          {videoUrlArray.length === 0 ? (
            <Stack gap={8}>
              <Dropzone
                onDrop={(files) => checkAndUploadVideos(files)}
                onReject={handleVideoReject}
                maxSize={50 * 1024 ** 2}
                accept={['video/mp4', 'video/mov', 'video/wmv', 'video/flv', 'video/avi', 'video/webm', 'video/mkv']}
                maxFiles={5}
              >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
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
                  <Dropzone.Idle></Dropzone.Idle>

                  <Stack justify="center" align="center">
                    <HeadingSix fontWeight={500}>+Add at least 1 video</HeadingSix>
                    <Stack gap={0} justify="center" align="center">
                      <SmallFont color="#51565A" fontWeight={300}>
                        Select your video here
                      </SmallFont>
                      <SmallFont color="#51565A" fontWeight={300}>
                        Up to 5 videos, Max size 50 MB , Format - MP4, MOV, WMV, FLV, AVI, WebM, MKV.
                      </SmallFont>
                    </Stack>
                  </Stack>
                </Group>
              </Dropzone>
            </Stack>
          ) : (
            <></>
          )}

          <Stack gap={8}>
            {videoUrlArray.length > 0 ? (
              <RegularFont color="#51565A" fontWeight={400}>
                Video
              </RegularFont>
            ) : (
              ''
            )}
            <Group>
              {videoUrlArray &&
                videoUrlArray.map((videoItem, index) => {
                  return (
                    <Box key={index} pos={'relative'} className={style.imageWrapper}>
                      <video
                        src={videoItem && videoItem?.filePath ? videoItem?.filePath : videoItem}
                        key={videoItem}
                        width={300}
                        height={200}
                        style={{
                          objectFit: 'contain',
                        }}
                        controls
                        alt={`upload video ${index}`}
                      />
                      <ActionIcon
                        classNames={{
                          root: 'deleteImageBtn',
                        }}
                        color="yellow"
                        onClick={() => handleDeleteVideo(index)}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Box>
                  );
                })}
              {videoArray.length > 0 && videoArray.length <= 4 ? (
                <Dropzone
                  onDrop={(files) => checkAndUploadVideos(files)}
                  onReject={handleVideoReject}
                  maxSize={50 * 1024 ** 2}
                  accept={['video/mp4', 'video/mov', 'video/wmv', 'video/flv', 'video/avi', 'video/webm', 'video/mkv']}
                  maxFiles={5 - videoArray.length}
                  w={160}
                  h={160}
                  p={0}
                >
                  <Group h={120} justify="center" style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                      <IconUpload
                        style={{ width: rem(20), height: rem(20), color: 'var(--mantine-color-blue-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX
                        style={{ width: rem(20), height: rem(20), color: 'var(--mantine-color-red-6)' }}
                        stroke={1.5}
                      />
                    </Dropzone.Reject>
                    <Dropzone.Idle></Dropzone.Idle>

                    <Stack w={'100%'} h={'100%'} justify="center" align="center">
                      <HeadingSix fontWeight={500}>+Add More</HeadingSix>
                    </Stack>
                  </Group>
                </Dropzone>
              ) : (
                ''
              )}
            </Group>
            {form.errors.VideoAttach && <ErrorText>{form.errors.VideoAttach}</ErrorText>}
          </Stack>
        </Stack>
      </Stack>

      {isModalOpen && (
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={
            <>
              <RegularFont fontWeight={500}>Upload Photos for Better Visibility</RegularFont>
            </>
          }
          centered
        >
          <Stack align="center" justify="center" spacing={24}>
            <Text fontWeight={500} className={style.modalText}>
              Boost your property&apos;s visibility with stunning photos. Upload at least 2 photos and a cover image
              now!
            </Text>
            <Group mt={10} mb={10}>
              <CustomePrimaryButton variant="outline" onClick={() => setIsModalOpen(false)} size="small">
                OK
              </CustomePrimaryButton>
              <CustomePrimaryButton onClick={handleModalSubmit} size="small">
                Save Anyway
              </CustomePrimaryButton>
            </Group>
          </Stack>
        </Modal>
      )}
    </Box>
  );
};

export default PropertyStepFive;
