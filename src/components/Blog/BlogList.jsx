'use client';
import { useEffect, useState } from 'react';
import { lightgrey_font_color, primary_color, secondary_dark } from '@/constant/FontColotConstant';
import { commercial1, commercial2 } from '@/constant/ImageConstant';
import { useGetBlogList } from '@/state/blog/blog.hook';
import {
  Image,
  Text,
  Box,
  Container,
  Card,
  Badge,
  Group,
  Button,
  SimpleGrid,
  Skeleton,
  Center,
  Breadcrumbs,
  Pagination,
  em,
} from '@mantine/core';
import NextImage from 'next/image';
import { RegularBigFont, RegularFont, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import Link from 'next/link';
import styles from './BlogDetail.module.css';
import noImageFound from '../../../public/img/Search/noImg.jpg';
import { useMediaQuery } from '@mantine/hooks';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';

function BlogList({ searchParams }) {
  const [paginationParams, setPaginationParams] = useState({
    PageNumber: 1,
    PageSize: 10,
    currentPage: 1,
  });
  const isDesktop = useMediaQuery(`(max-width: ${em(992)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const { data: blogList, isPending, refetch } = useGetBlogList(paginationParams);

  const handlePaginationChange = (newPage) => {
    setPaginationParams((prev) => ({
      ...prev,
      PageNumber: newPage,
      currentPage: newPage,
    }));
  };

  useEffect(() => {
    refetch();
  }, [paginationParams]);

  const items = [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/Blog' },
  ].map((item, index) => (
    <Link key={`breadcrumb_${index}`} href={item.href}>
      <SmallFont color="white">{item.title}</SmallFont>
    </Link>
  ));

  return (
    <>
      <Box mx="auto" mb={20} h={100} mt={-10}>
        <div className={styles.blog_banner}>
          <RegularBigFont fontWeight={600} color="white">
            BLOGINGS
          </RegularBigFont>
        </div>
      </Box>
      <Container size={'xl'} p={20} mt={-10}>
        {isPending ? (
          Array(2)
            .fill()
            .map((_, index) => (
              <SimpleGrid cols={isDesktop ? (isMobile ? 1 : 2) : 3} spacing="xl" key={index}>
                {Array(isDesktop ? (isMobile ? 1 : 2) : 3)
                  .fill()
                  .map((_, index) => (
                    <Card padding="lg" radius="md" withBorder key={index}>
                      <Card.Section>
                        <Skeleton height={200} width="100%" />
                      </Card.Section>

                      <Group justify="space-between" mt="md" mb="xs" mih={50}>
                        <Skeleton height={20} width="80%" />
                      </Group>

                      <Skeleton height={20} width="60%" mt={10} />
                      <Skeleton height={20} width="50%" mt={10} />

                      <Skeleton height={40} width="30%" mt={20} radius="md" />
                    </Card>
                  ))}
              </SimpleGrid>
            ))
        ) : (
          <>
            {blogList && blogList.length !== 0 ? (
              <>
                <SimpleGrid cols={isDesktop ? (isMobile ? 1 : 2) : 3} spacing="lg">
                  {blogList?.list.map((data, index) => (
                    <Card padding="lg" radius="md" withBorder key={index}>
                      <Card.Section>
                        <Image
                          component={NextImage}
                          src={data?.filePath}
                          fallbackSrc={noImageFound}
                          height={200}
                          width={200}
                          alt="Blog Image"
                        />
                      </Card.Section>

                      <Group justify="space-between" mt="md" mb="xs" mih={50}>
                        <Link href={`/Blog/${data?.blogID}/${data?.seoUrl}`} underline="always">
                          <RegularFont fontWeight={500} lineClamp={2}>
                            {data?.blogTitle}
                          </RegularFont>
                        </Link>
                      </Group>

                      <RegularFont>Posted On: {data?.insertedDate}</RegularFont>
                      {index === 3 ? (
                        <Link
                          href={`/Blog/${data?.blogID}/${data?.seoUrl}`}
                          underline="always"
                          className={styles.blogReadMoretext}
                        >
                          Read Me
                        </Link>
                      ) : (
                        <Link
                          href={`/Blog/${data?.blogID}/${data?.seoUrl}`}
                          underline="always"
                          className={styles.blogReadMoretext}
                        >
                          Read More
                        </Link>
                      )}
                    </Card>
                  ))}
                </SimpleGrid>
                <Center mt="xl">
                  <Pagination
                    m={10}
                    size="xl"
                    value={paginationParams.currentPage}
                    onChange={handlePaginationChange}
                    total={blogList?.totalPages}
                    color={secondary_dark}
                  />
                </Center>
              </>
            ) : (
              <NodataFound />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default BlogList;
