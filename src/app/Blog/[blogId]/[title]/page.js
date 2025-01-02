import BlogDetail from '@/components/Blog/BlogDetail';
import Footer from '@/components/Footer/Footer';
import MainHeader from '@/components/Navbar/MainHeader';
import { GetBlogDetail } from '@/state/blog/blog.api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Page({ params, searchParams }) {
  const blogId = params.blogId;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['blogDetail', blogId],
    queryFn: () => GetBlogDetail(blogId),
  });

  return (
    <>
      <MainHeader search={false} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogDetail blogId={blogId} searchParams={searchParams} />
      </HydrationBoundary>
      <Footer />
    </>
  );
}
