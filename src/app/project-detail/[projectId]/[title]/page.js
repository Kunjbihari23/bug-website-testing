import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { propertyDeatilApi, propertyNewDeatilApi } from '@/state/property/property.api';
import MainHeader from '@/components/Navbar/MainHeader';
import ProjectDetail from '@/components/projectDetailsComponents/ProjectDetail';
import { getSSRSession } from '@/lib/getSSRSession';

export default async function Page({ params, searchParams }) {
  const propertyId = params.projectId;
  const PropertyProject = params && params.hasOwnProperty('projectId') ? 1 : 0;
  const { isLoggedIn, user } = await getSSRSession();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['propertyDetail', propertyId, PropertyProject],
    queryFn: () =>
      isLoggedIn ? propertyDeatilApi(propertyId, PropertyProject) : propertyNewDeatilApi(propertyId, PropertyProject),
  });

  return (
    <>
      <MainHeader search={true} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectDetail
          user={user}
          isLoggedIn={isLoggedIn}
          propertyId={propertyId}
          PropertyProject={PropertyProject}
          searchParams={searchParams}
        />
      </HydrationBoundary>
    </>
  );
}
