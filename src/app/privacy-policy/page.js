import Footer from '@/components/Footer/Footer';
import MainHeader from '@/components/Navbar/MainHeader';
import PrivacyPolicy from '@/components/StaticPages/PrivacyPolicy';
import React from 'react';

function page() {
  return (
    <div>
      <MainHeader search={false} />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}

export default page;
