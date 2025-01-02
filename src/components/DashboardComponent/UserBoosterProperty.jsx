'use client';
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Table,
  TextInput,
  Pagination,
  Select,
  Flex,
  Text,
  Paper,
  em,
  Image,
  Loader,
  Center,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Sidemenu from './Sidemenu';
import style from './Dashboard.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { useUserBoosterProperty } from '@/state/LoginUserData/loginUserApi.hook';
import { formatCurrency } from '@/util/commonFunction';
import noImageFound from '../../../public/img/Search/noImg.jpg';
import NextImage from 'next/image';

function UserBoosterProperty({ user }) {
  const userId = user.id;
  const isMediumScreen = useMediaQuery(`(max-width: ${em(1200)})`);
  const isTablet = useMediaQuery(`(max-width: ${em(992)})`);
  const isMedium = useMediaQuery(`(max-width: ${em(767)})`);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data: propertyData, isLoading } = useUserBoosterProperty({ id: 2 });

  const filteredElements =
    propertyData &&
    propertyData.length !== 0 &&
    propertyData.filter(
      (element) =>
        element.title.toLowerCase().includes(search.toLowerCase()) ||
        element.furnished.toLowerCase().includes(search.toLowerCase()) ||
        element.landMark.toLowerCase().includes(search.toLowerCase())
    );

  const totalPages = filteredElements ? Math.ceil(filteredElements.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = filteredElements ? Math.min(startIndex + itemsPerPage, filteredElements.length) : 0;
  const currentElements = filteredElements ? filteredElements.slice(startIndex, endIndex) : [];

  const rows = currentElements.map((element) => (
    <Table.Tr key={element.sr}>
      <Table.Td>
        <Image
          src={element.filePath}
          component={NextImage}
          alt="register-property"
          width={70}
          height={60}
          fallbackSrc={noImageFound}
        />
      </Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{formatCurrency(element.rateRentValue ?? 0)}</Table.Td>
      <Table.Td>{element.furnished}</Table.Td>
      <Table.Td>{element.avaibility}</Table.Td>
      <Table.Td>{element.landMark}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl">
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
        <Grid.Col span={isTablet ? 12 : isMediumScreen ? 4 : 3}>
          <Sidemenu />
        </Grid.Col>
        <Grid.Col span={isTablet ? 12 : isMediumScreen ? 8 : 9}>
          <Paper shadow="xs" p="md" className={style.boosterPropertyWrapper}>
            <Flex
              justify={isMedium ? 'flex-start' : 'space-between'}
              align={isMedium ? 'flex-start' : 'flex-end'}
              mb="md"
              gap={isMedium && 20}
              direction={isMedium && 'column'}
            >
              <div className={style.showItemPerPage}>
                Show&nbsp;&nbsp;
                <Select
                  value={itemsPerPage.toString()}
                  onChange={(value) => setItemsPerPage(Number(value))}
                  data={['5', '10', '20', '50']}
                  style={{ maxWidth: '70px' }}
                />
                &nbsp; entries
              </div>
              <TextInput
                placeholder="Search..."
                leftSection={<IconSearch size={14} />}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
              />
            </Flex>

            {isLoading ? (
              <Center style={{ height: 200 }}>
                <Loader size="xl" />
              </Center>
            ) : propertyData && propertyData.length > 0 ? (
              <>
                <Table stickyHeader stickyHeaderOffset={60} className={style.boosterTable}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>FilePath</Table.Th>
                      <Table.Th>Title</Table.Th>
                      <Table.Th>Price</Table.Th>
                      <Table.Th>Furnishing Status</Table.Th>
                      <Table.Th>Avaibility</Table.Th>
                      <Table.Th>LandMark</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Flex
                  justify={isMedium ? 'flex-start' : 'space-between'}
                  align={isMedium ? 'flex-start' : 'flex-end'}
                  mt="md"
                  gap={isMedium && 20}
                  direction={isMedium && 'column'}
                >
                  <Text size="sm" c="dimmed">
                    Showing {startIndex + 1} to {endIndex} of {filteredElements.length} entries
                  </Text>
                  <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} />
                </Flex>
              </>
            ) : (
              <Text>No data available</Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default UserBoosterProperty;
