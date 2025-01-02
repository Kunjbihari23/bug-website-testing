import React from 'react';
import MainHeaderClient from './MainHeaderClient';
import { getSSRSession } from '@/lib/getSSRSession';

const MainHeader = async ({ search, onFilter = {}, isBlue = false }) => {
  const { isLoggedIn, user } = await getSSRSession();

  return (
    <MainHeaderClient
      search={search}
      isBlue={isBlue}
      isUserLoggedIn={isLoggedIn}
      userDetails={user}
      onFilter={onFilter}
    />
  );
};

export default MainHeader;
