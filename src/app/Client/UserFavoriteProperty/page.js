import MainHeader from '@/components/Navbar/MainHeader';
import React from 'react';
import style from '../../../components/DashboardComponent/Dashboard.module.css';
import { Box } from '@mantine/core';
import { RegularBigFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import UserFavProperty from '@/components/DashboardComponent/UserFavProperty';
import { getSSRSession } from '@/lib/getSSRSession';
import { redirect } from 'next/navigation';
import Footer from '@/components/Footer/Footer';

async function page() {
  const { isLoggedIn, user } = await getSSRSession();

  if (!isLoggedIn) {
    redirect('/');
  }
  return (
    <div>
      <MainHeader search={false}></MainHeader>
      <Box mx="auto" mb={20} h={100} mt={-10}>
        <div className={style.Dashboard_banner}>
          <RegularBigFont fontWeight={600} color="white">
            My Favorited Properties
          </RegularBigFont>
        </div>
      </Box>
      <UserFavProperty user={user} />
      <Footer />
    </div>
  );
}

export default page;
