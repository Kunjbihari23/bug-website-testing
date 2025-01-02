import Footer from '@/components/Footer/Footer';
import MainHeader from '@/components/Navbar/MainHeader';
import ContactUs from '@/components/StaticPages/ContactUs';
import React from 'react';

function page() {
  return (
    <div>
      <MainHeader search={false} />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default page;
