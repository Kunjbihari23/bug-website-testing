import {
  HeadingSix,
  RegularFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { ActionIcon, Box, Button, Group, rem, Stack, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import React, { useState } from 'react';
import style from './ProjectMainSection.module.css';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import { useDisclosure } from '@mantine/hooks';
import HeaderLessModal from '@/components/CustomComponents/HeaderLessModal/HeaderLessModal';

const ProjectStepFive = ({
  imagesArray,
  handleImageUpload,
  handleVideoUpload,
  imagesUrlArray,
  videoArray,
  videoUrlArray,
  handleDeleteImage,
  handleDeleteVideo,
  browchureArray,
  browchureUrlArray,
  handleBrochureUpload,
  handleDeleteBrowchuer,
}) => {
  function displayPDF(blobUrl) {
    const iframe = document.createElement('iframe');
    iframe.src = blobUrl;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';

    const newWindow = window.open('', '_blank');
    newWindow.document.body.appendChild(iframe);
    newWindow.document.title = `Project_browchure_${blobUrl}`;
  }

  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>Add photos/video of your Project</HeadingSix>
        <Stack gap={16}>
          {imagesUrlArray.length === 0 ? (
            <Stack gap={8}>
              <RegularFont color="#51565A" fontWeight={400}>
                Upload from your device
              </RegularFont>
              <Dropzone
                onDrop={(files) => handleImageUpload(files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={2 * 1024 * 1024}
                accept={IMAGE_MIME_TYPE}
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
                    {/* <IconPhoto
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5}
                    /> */}
                  </Dropzone.Idle>

                  <Stack justify="center" align="center">
                    <HeadingSix fontWeight={500}>+Add at least 5 photos</HeadingSix>
                    <Stack gap={0} justify="center" align="center">
                      <SmallFont color="#51565A" fontWeight={300}>
                        Drag and drop your photo here
                      </SmallFont>
                      <SmallFont color="#51565A" fontWeight={300}>
                        Up to 50 photos , Max size 10 MB , Format - png, jpg, jpeg, gif, webp.
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
            <Group>
              {imagesUrlArray &&
                imagesUrlArray.map((imageItem, index) => {
                  return (
                    <Box key={index} pos={'relative'} className={style.imageWrapper}>
                      <Image
                        src={imageItem}
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
              {imagesArray.length > 0 ? (
                <Dropzone
                  onDrop={(files) => handleImageUpload(files)}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={2 * 1024 * 1024}
                  accept={IMAGE_MIME_TYPE}
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
                    <Dropzone.Idle>
                      {/* <IconPhoto
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5}
                    /> */}
                    </Dropzone.Idle>

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
          {videoUrlArray.length === 0 ? (
            <Stack gap={8}>
              <Dropzone
                onDrop={(files) => handleVideoUpload(files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={50 * 1024 * 1024}
                accept={[MIME_TYPES.mp4]}
                maxFiles={1}
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
                    {/* <IconPhoto
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5}
                    /> */}
                  </Dropzone.Idle>

                  <Stack justify="center" align="center">
                    <HeadingSix fontWeight={500}>+Add at least 1 video</HeadingSix>
                    <Stack gap={0} justify="center" align="center">
                      <SmallFont color="#51565A" fontWeight={300}>
                        Drag and drop your video here
                      </SmallFont>
                      <SmallFont color="#51565A" fontWeight={300}>
                        Max size 50 MB , Format - mp4.
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
                        src={videoItem}
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
            </Group>
          </Stack>
        </Stack>

        <HeadingSix fontWeight={500}>Add browchure of your Project</HeadingSix>
        <Stack gap={16}>
          {browchureUrlArray.length === 0 ? (
            <Stack gap={8}>
              <Dropzone
                onDrop={(files) => handleBrochureUpload(files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={25 * 1024 * 1024}
                accept={[MIME_TYPES.pdf]}
                maxFiles={1}
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
                    {/* <IconPhoto
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5}
                    /> */}
                  </Dropzone.Idle>

                  <Stack justify="center" align="center">
                    <HeadingSix fontWeight={500}>+Add at least 1 browchure</HeadingSix>
                    <Stack gap={0} justify="center" align="center">
                      <SmallFont color="#51565A" fontWeight={300}>
                        Drag and drop your browchure here
                      </SmallFont>
                      <SmallFont color="#51565A" fontWeight={300}>
                        Max size 50 MB , Format - pdf.
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
            {browchureUrlArray.length > 0 ? (
              <RegularFont color="#51565A" fontWeight={400}>
                Browchure
              </RegularFont>
            ) : (
              ''
            )}
            <Group>
              {browchureUrlArray &&
                browchureUrlArray.map((Item, index) => {
                  return (
                    <Group p={20} key={`browchure_${index}`}>
                      <CustomePrimaryButton
                        onClick={() => {
                          displayPDF(Item);
                        }}
                      >
                        View Browchure
                      </CustomePrimaryButton>

                      <ActionIcon color="yellow" onClick={() => handleDeleteBrowchuer(index)}>
                        <IconTrash />
                      </ActionIcon>
                    </Group>
                  );
                })}
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectStepFive;
