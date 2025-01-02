import Dashboard from '@/components/DashboardComponent/Dashboard';
import MainHeader from '@/components/Navbar/MainHeader';
import React from 'react';
import style from '../../components/DashboardComponent/Dashboard.module.css';
import { Box } from '@mantine/core';
import { RegularBigFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { getSSRSession } from '@/lib/getSSRSession';
import Footer from '@/components/Footer/Footer';

export default async function Page() {
  const { isLoggedIn, user } = await getSSRSession();
  return (
    <div>
      <MainHeader search={false} />
      <Box mx="auto" mb={20} h={100} mt={-10}>
        <div className={style.Dashboard_banner}>
          <RegularBigFont fontWeight={600} color="white">
            DASHBOARD
          </RegularBigFont>
        </div>
      </Box>
      <Dashboard user={user} />
      <Footer />
    </div>
  );
}
