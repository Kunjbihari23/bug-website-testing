import Footer from '@/components/Footer/Footer';
import MainHeader from '@/components/Navbar/MainHeader';
import AboutUs from '@/components/StaticPages/AboutUs';
import React from 'react';

function page() {
  return (
    <div>
      <MainHeader search={false} />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default page;
