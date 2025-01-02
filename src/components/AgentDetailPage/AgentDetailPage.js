'use client';
import Footer from '../Footer/Footer';
import AgentInfo from './AgentInfo';

function AgentDetailPage({ agentId, searchParams }) {
  return (
    <>
      <AgentInfo agentId={agentId} searchParams={searchParams} />
      <Footer />
    </>
  );
}

export default AgentDetailPage;
