import { useQuery } from '@tanstack/react-query';
import getAgentlistApi from './trustedAgentList';

export const useAgentlistApi = () => {
  return useQuery({
    queryKey: ['agentList'],
    queryFn: () => getAgentlistApi(),
  });
};
