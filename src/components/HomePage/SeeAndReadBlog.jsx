import React, { useEffect, useMemo, useState } from 'react';
import style from './home.module.css';
import { Container, em, Grid, Group, Skeleton, Stack } from '@mantine/core';
import {
  HeadingFive,
  HeadingSix,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { profileLight_Icon, calendar_Icon, defaultImg } from '@/constant/ImageConstant';
import { grey_font_color } from '@/constant/FontColotConstant';
import { useGetBlogList } from '@/state/blog/blog.hook';
import moment from 'moment';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';

function SeeAndReadBlog({ searchParams }) {
  const [searchUrl, setSearchUrl] = useState();
  const isTablte = useMediaQuery(`(max-width: ${em(992)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);

  const queryParams = useMemo(() => ({
    pageNumber: 1,
    PageSize: 10,
    currentPage: 1,
  }));

  const { data: blogList, isPending } = useGetBlogList(queryParams);

  useEffect(() => {
    const current = new URLSearchParams(searchParams);
    const search = decodeURIComponent(current.toString());
    setSearchUrl(search);
  }, [searchParams]);

  return (
    <div>
      <div className={style.recent_property_container}>
        <Container size="xl">
          <div className={style.explr_propty_type}>
            <Stack gap={8} mb={24}>
              <HeadingFive fontWeight={600} color={'#091E42'} textAlign={'start'}>
                See Our Latest News and Read Blogs
              </HeadingFive>
              <RegularBigFont color={grey_font_color}>What&apos;s New: Check Out Our Latest Updates</RegularBigFont>
            </Stack>
            <Grid gutter={30}>
              {blogList && blogList.length !== 0 ? (
                <>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <div className={style.blogLeft_Card}>
                      <Stack gap={isTablte ? 15 : 24}>
                        <Skeleton visible={isPending}>
                          <Image
                            component={NextImage}
                            src={blogList && blogList?.list[0]?.filePath}
                            alt={blogList && blogList?.list[0] && blogList?.list[0].filePath}
                            width={548}
                            mih={isMobile && '200px'}
                            height={isMobile ? 150 : 342}
                            className={style.homeBlogThumbnail}
                            fallbackSrc={defaultImg}
                          />
                        </Skeleton>
                        <Group gap={16}>
                          {isPending ? (
                            <>
                              <Group gap={4}>
                                <Skeleton height={20} w={100} radius="xl" />
                              </Group>
                              <Group gap={4}>
                                <Skeleton height={20} w={100} radius="xl" />
                              </Group>
                            </>
                          ) : (
                            <>
                              <Group gap={4}>
                                <Image
                                  component={NextImage}
                                  src={profileLight_Icon}
                                  alt={blogList?.list[0]?.postedType}
                                  width={18}
                                  height={18}
                                />
                                <RegularFont color={grey_font_color}>{blogList?.list[0]?.postedType}</RegularFont>{' '}
                              </Group>
                              <Group gap={4}>
                                <Image
                                  component={NextImage}
                                  src={calendar_Icon}
                                  alt="calendar"
                                  width={18}
                                  height={18}
                                />
                                <RegularFont color={grey_font_color}>
                                  {moment(blogList?.list[0]?.insertedDate).format('D MMMM, YYYY')}
                                </RegularFont>{' '}
                              </Group>
                            </>
                          )}
                        </Group>
                        <Skeleton visible={isPending} h={50} radius="xl">
                          <Link href={`/Blog/${blogList?.list[0]?.blogID}/${blogList?.list[0]?.seoUrl}?${searchUrl}`}>
                            <HeadingSix fontWeight={500} lineClamp={2}>
                              {blogList?.list[0]?.blogTitle}
                            </HeadingSix>
                          </Link>
                        </Skeleton>
                        {isPending && (
                          <Skeleton visible={isPending} width={'70%'} h={16} mt={-18} radius="xl"></Skeleton>
                        )}
                        <Skeleton visible={isPending} height={25} width={100} radius={4}>
                          <Link
                            href={`/Blog/${blogList?.list[0]?.blogID}/${blogList?.list[0]?.seoUrl}?${searchUrl}`}
                            underline="always"
                            className={style.developer_site_link}
                            style={{ marginTop: '10px' }}
                          >
                            Read More
                          </Link>
                        </Skeleton>
                      </Stack>
                    </div>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap={24}>
                      {isPending
                        ? Array(3)
                            .fill()
                            .map((data, i) => {
                              return (
                                <div className={style.blogRight_Card} key={i}>
                                  <Group gap={26} wrap="nowrap" classNames={{ root: style.blogSection_root }}>
                                    <Skeleton width={204} height={140} />
                                    <Stack gap={16}>
                                      <Group gap={16}>
                                        <Group gap={4}>
                                          <Skeleton height={20} w={100} radius="xl" />
                                        </Group>
                                        <Group gap={4}>
                                          <Skeleton height={20} w={100} radius="xl" />
                                        </Group>
                                      </Group>
                                      <Stack gap={6}>
                                        <Skeleton height={16} radius="xl" />
                                        <Skeleton height={16} width="70%" radius="xl" />
                                      </Stack>
                                      <Skeleton height={25} width={100} radius={4} />
                                    </Stack>
                                  </Group>
                                </div>
                              );
                            })
                        : blogList?.list?.slice(1, 4).map((data, i) => {
                            return (
                              <div className={style.blogRight_Card} key={`BlogId${(data.blogID, i)}`}>
                                <Group
                                  gap={isMobile ? 15 : 26}
                                  wrap="nowrap"
                                  classNames={{ root: style.blogSection_root }}
                                >
                                  <Image
                                    component={NextImage}
                                    src={data?.filePath}
                                    alt={data?.blogTitle}
                                    width={204}
                                    height={140}
                                    mih={isMobile && '200px'}
                                    miw={isMobile ? '100%' : 150}
                                    fallbackSrc={defaultImg}
                                  />
                                  <Stack gap={16}>
                                    <Group gap={16}>
                                      <Group gap={4}>
                                        <Image
                                          component={NextImage}
                                          src={profileLight_Icon}
                                          alt={data?.postedType}
                                          width={18}
                                          height={18}
                                        />
                                        <RegularFont color={grey_font_color}>{data?.postedType}</RegularFont>
                                      </Group>
                                      <Group gap={4}>
                                        <Image
                                          component={NextImage}
                                          src={calendar_Icon}
                                          alt="calendar"
                                          width={18}
                                          height={18}
                                        />
                                        <RegularFont color={grey_font_color}>
                                          {moment(data?.insertedDate).format('D MMMM, YYYY')}
                                        </RegularFont>{' '}
                                      </Group>
                                    </Group>
                                    <HeadingSix lineClamp={2} fontWeight={500}>
                                      {data?.blogTitle}
                                    </HeadingSix>
                                    <Link
                                      href={`/Blog/${data?.blogID}/${data?.seoUrl}?${searchUrl}`}
                                      underline="always"
                                      className={style.developer_site_link}
                                    >
                                      Read More
                                    </Link>
                                  </Stack>
                                </Group>
                              </div>
                            );
                          })}
                    </Stack>
                  </Grid.Col>
                </>
              ) : (
                <NodataFound discription="Currently No Blog Data Available" />
              )}
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default SeeAndReadBlog;
