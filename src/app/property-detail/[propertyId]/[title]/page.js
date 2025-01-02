import PropertyDetail from '@/components/propertyDetailsComponent/propertyDetail';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { propertyDeatilApi, propertyNewDeatilApi } from '@/state/property/property.api';
import MainHeader from '@/components/Navbar/MainHeader';
import { getSSRSession } from '@/lib/getSSRSession';

export default async function Page({ params, searchParams }) {
  const propertyId = params.propertyId;
  const PropertyProject = searchParams?.project_property || 0;
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
        <PropertyDetail
          isLoggedIn={isLoggedIn}
          user={user}
          propertyId={propertyId}
          PropertyProject={PropertyProject}
          searchParams={searchParams}
        />
      </HydrationBoundary>
    </>
  );
}
