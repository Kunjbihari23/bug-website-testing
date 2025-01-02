'use client';

import { Breadcrumbs, Group, Stack, Image, Container, Grid, Box, LoadingOverlay, em } from '@mantine/core';
import { RegularBigFont, RegularFont, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import { lightgrey_font_color, primary_color } from '@/constant/FontColotConstant';
import styles from './BlogDetail.module.css';
import NextImage from 'next/image';
import { useGetBlogDetail, useGetBlogList } from '@/state/blog/blog.hook';
import Link from 'next/link';
import { useGetSettings } from '@/state/settings/settings.hook';
import { defaultImg } from '@/constant/ImageConstant';
import moment from 'moment';
import { useEffect, useState } from 'react';
import noImageFound from '../../../public/img/Search/noImg.jpg';
import { useMediaQuery } from '@mantine/hooks';

function BlogDetail({ blogId, searchParams }) {
  const [currentBlogId, setCurrentBlogId] = useState(blogId);
  const isDesktop = useMediaQuery(`(max-width: ${em(992)})`);

  const detailParam = {
    id: currentBlogId,
  };

  const queryParams = {
    pageNumber: 1,
    PageSize: 10,
    currentPage: 1,
  };

  const { data: blogList } = useGetBlogList(queryParams);
  const { data: blogDetail, isPending: blogDetailLoader, refetch } = useGetBlogDetail(detailParam);

  const filteredBlogList = blogList?.list.filter((data) => data.blogID != currentBlogId);

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/Blog' },
    { title: blogDetail && blogDetail.blogTitle, href: '#' },
  ].map((item, index) => (
    <Link key={`breadcrumb_${index}`} href={item.href}>
      <SmallFont color={lightgrey_font_color}>{item.title}</SmallFont>
    </Link>
  ));

  useEffect(() => {
    setCurrentBlogId(blogId);
    refetch();
  }, [blogId, refetch]);

  return (
    <Container size={'xl'} pt={20} mb={20}>
      <Box pos="relative">
        <LoadingOverlay
          visible={blogDetailLoader}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 5 }}
          loaderProps={{ color: primary_color, type: 'bars' }}
        />
        <Grid>
          <Grid.Col span={isDesktop ? 12 : 7} p={isDesktop ? 10 : 0}>
            <Group justify="space-between" my={16}>
              <Breadcrumbs separator=">" separatorMargin={4} className={styles.Breadcrumb_section}>
                {items}
              </Breadcrumbs>
            </Group>
            <Stack className={styles.blogTitle}>
              <RegularBigFont fontWeight={500}>{blogDetail?.blogTitle}</RegularBigFont>
            </Stack>
            <Stack mb={20}>
              <SmallFont>Updated: {moment(blogDetail?.updatedAt).format('MMM DD, YYYY')}</SmallFont>
            </Stack>

            <Stack className={styles.image_stack}>
              <Image
                radius="md"
                component={NextImage}
                src={blogDetail?.imageList[0]?.filePath}
                width={500}
                height={500}
                fallbackSrc={noImageFound}
                alt="Blog image"
              />
            </Stack>

            <Group>
              <div
                style={{
                  marginTop: '30px',
                  lineHeight: '35px',
                }}
                dangerouslySetInnerHTML={{
                  __html: blogDetail?.blogContent ? blogDetail?.blogContent : '',
                }}
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={isDesktop ? 12 : 5}>
            <div className={styles.blogList_section}>
              <Stack p={isDesktop ? 0 : 20} pb={isDesktop ? 10 : 0} pt={10}>
                <RegularBigFont fontWeight={500}>Popular Articles</RegularBigFont>
              </Stack>

              <Group p={isDesktop ? 0 : 20}>
                {filteredBlogList && filteredBlogList.length !== 0
                  ? filteredBlogList.map((data, index) => (
                      <div key={index} style={{ width: '100%' }}>
                        <Link
                          href={`/Blog/${data?.blogID}/${data?.seoUrl}`}
                          underline="always"
                          className={styles.developer_site_link}
                        >
                          <Group gap={26} wrap="nowrap" classNames={{ root: styles.blogSection_root }}>
                            <Image
                              component={NextImage}
                              src={data?.filePath}
                              alt={data?.blogTitle}
                              width={100}
                              miw={130}
                              height={100}
                              fallbackSrc={defaultImg}
                            />
                            <Stack gap={16}>
                              <RegularBigFont>{data?.blogTitle}</RegularBigFont>

                              <RegularFont color="#1E1E82">Read More</RegularFont>
                            </Stack>
                          </Group>
                        </Link>
                      </div>
                    ))
                  : 'No popular articles found.'}
              </Group>
            </div>
          </Grid.Col>
        </Grid>
      </Box>
    </Container>
  );
}

export default BlogDetail;
