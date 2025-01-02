import BlogList from '@/components/Blog/BlogList';
import Footer from '@/components/Footer/Footer';
import MainHeader from '@/components/Navbar/MainHeader';

export default async function Page({ searchParams }) {
  return (
    <>
      <MainHeader search={false} />
      <BlogList searchParams={searchParams} />
      <Footer />
    </>
  );
}
