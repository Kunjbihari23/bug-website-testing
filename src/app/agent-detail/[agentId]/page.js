import AgentDetailPage from '@/components/AgentDetailPage/AgentDetailPage';
import MainHeader from '@/components/Navbar/MainHeader';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { agentDeatilApi } from '@/state/agent/Agent.api';

export default async function Page({ params, searchParams }) {
  const agentId = params.agentId;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['agentdetail', agentId],
    queryFn: () => agentDeatilApi(agentId),
  });

  return (
    <>
      <MainHeader search={true} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AgentDetailPage agentId={agentId} searchParams={searchParams} />
      </HydrationBoundary>
    </>
  );
}
