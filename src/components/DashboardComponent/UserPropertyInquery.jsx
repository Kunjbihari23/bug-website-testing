'use client';
import React, { useState } from 'react';
import { Container, Grid, Table, TextInput, Pagination, Select, Flex, Text, Paper, em, Loader } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Sidemenu from './Sidemenu';
import style from './Dashboard.module.css';
import { useUserInquiryPropety } from '@/state/LoginUserData/loginUserApi.hook';
import { useMediaQuery } from '@mantine/hooks';

function UserPropertyInquiry({ user }) {
  const isMediumScreen = useMediaQuery(`(max-width: ${em(1200)})`);
  const isTablet = useMediaQuery(`(max-width: ${em(992)})`);
  const userId = user?.id;
  const { data: InquiryPropertyData, isLoading } = useUserInquiryPropety({ id: userId });
  const isMedium = useMediaQuery(`(max-width: ${em(767)})`);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredElements = InquiryPropertyData
    ? InquiryPropertyData.filter(
        (element) =>
          element.name.toLowerCase().includes(search.toLowerCase()) ||
          element.mobile.toLowerCase().includes(search.toLowerCase()) ||
          element.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredElements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredElements.length);
  const currentElements = filteredElements.slice(startIndex, endIndex);

  const rows = currentElements.map((element) => (
    <Table.Tr key={element.sr}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.mobile}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl">
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
        <Grid.Col span={isTablet ? 12 : isMediumScreen ? 4 : 3}>
          <Sidemenu />
        </Grid.Col>
        <Grid.Col span={isTablet ? 12 : isMediumScreen ? 8 : 9}>
          <Paper shadow="xs" p="md" className={style.PropertyInquiryWrapper}>
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
              <Flex justify="center" align="center" style={{ height: '200px' }}>
                <Loader size="lg" />
              </Flex>
            ) : InquiryPropertyData && InquiryPropertyData.length === 0 ? (
              <Text align="center" py="xl">
                No data found
              </Text>
            ) : (
              <>
                <Table stickyHeader stickyHeaderOffset={60} className={style.inquiryTable}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Mobile</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Description</Table.Th>
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
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default UserPropertyInquiry;
