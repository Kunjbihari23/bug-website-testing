'use client';
import React from 'react';
import style from './Dashboard.module.css';
import { Container, Box, Grid, Stack, Table, em, Button, Loader } from '@mantine/core';
import { RegularBigFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import SideMenu from './Sidemenu';
import { primary_color, secondary_dark, white_color } from '@/constant/FontColotConstant';
import { useMediaQuery } from '@mantine/hooks';
import { useDashBoardCount, useTopVisitProperty } from '@/state/LoginUserData/loginUserApi.hook';
import { formatCurrency } from '@/util/commonFunction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Dashboard({ user }) {
  const router = useRouter();
  const UserId = user?.id;

  const { data: CountData, isLoading: isCountLoading } = useDashBoardCount({ id: UserId });
  const { data: propertyData, isLoading: isPropertyLoading } = useTopVisitProperty({ id: 0 });

  const isMediumScreen = useMediaQuery(`(max-width: ${em(1200)})`);
  const isTablte = useMediaQuery(`(max-width: ${em(992)})`);

  const rows = isPropertyLoading ? (
    <Table.Tr>
      <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
        <Loader size="sm" />
      </Table.Td>
    </Table.Tr>
  ) : propertyData && propertyData.length > 0 ? (
    propertyData.map((element) => (
      <Table.Tr key={element.name}>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>{element.propertyCode}</Table.Td>
        <Table.Td>{element.createdDate_string}</Table.Td>
        <Table.Td>{formatCurrency(element.rateRentValue)}</Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Tr>
      <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
        No data found
      </Table.Td>
    </Table.Tr>
  );
  const handleViewAllClick = () => {
    router.push('/Client/UserProperty');
  };

  return (
    <>
      <div>
        <Container size={'xl'}>
          <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
            <Grid.Col span={isTablte ? 12 : isMediumScreen ? 4 : 3}>
              <SideMenu />
            </Grid.Col>
            <Grid.Col span={isTablte ? 12 : isMediumScreen ? 8 : 9}>
              <>
                <div className={style.manageDashboard_section}>
                  <RegularBigFont fontWeight={600} color={secondary_dark}>
                    Manage Dashboard
                  </RegularBigFont>

                  <Stack pt={20}>
                    <Grid>
                      {isCountLoading ? (
                        <Grid.Col span={12} style={{ textAlign: 'center' }}>
                          <Loader size="lg" />
                        </Grid.Col>
                      ) : (
                        <>
                          <Grid.Col span={{ bash: 12, xs: 6 }}>
                            <Link href={'/Client/UserProperty'}>
                              <Box className={style.box_section1}>
                                <RegularBigFont color={white_color} fontWeight={500}>
                                  {CountData?.Publishproperty ?? 0}
                                </RegularBigFont>
                                <RegularBigFont color={white_color} fontWeight={500}>
                                  Published Property
                                </RegularBigFont>
                              </Box>
                            </Link>
                          </Grid.Col>
                          <Grid.Col span={{ bash: 12, xs: 6 }}>
                            <Link href={'/Client/UserFavoriteProperty'}>
                              <Box className={style.box_section2}>
                                <RegularBigFont color={white_color} fontWeight={500}>
                                  {CountData?.Favorites ?? 0}
                                </RegularBigFont>
                                <RegularBigFont color={white_color} fontWeight={500}>
                                  Total Favorite
                                </RegularBigFont>
                              </Box>
                            </Link>
                          </Grid.Col>
                          <Grid.Col span={{ bash: 12, xs: 6 }}>
                            <Box className={style.box_section3}>
                              <RegularBigFont color={white_color} fontWeight={500}>
                                {CountData?.Message_inquery ?? 0}
                              </RegularBigFont>
                              <RegularBigFont color={white_color} fontWeight={500}>
                                Messages
                              </RegularBigFont>
                            </Box>
                          </Grid.Col>
                        </>
                      )}
                    </Grid>
                  </Stack>
                </div>

                <div className={style.mostVisitProp_section}>
                  <RegularBigFont fontWeight={600} color={secondary_dark}>
                    Most Visit Property
                  </RegularBigFont>

                  <Stack pt={20} className={style.mostVisitPropertyTable}>
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Title</Table.Th>
                          <Table.Th>Property Code</Table.Th>
                          <Table.Th>Date Added</Table.Th>
                          <Table.Th>Price</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows}</Table.Tbody>

                      {propertyData && propertyData.length > 0 && (
                        <Button mt="md" onClick={handleViewAllClick} size="md" color={primary_color}>
                          View All Property
                        </Button>
                      )}
                    </Table>
                  </Stack>
                </div>
              </>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
