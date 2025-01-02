import { useMutation, useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { agentDeatilApi, agentPropertyListApi, agentlistApi } from './Agent.api';

export const useAgentsListApi = (payload) => {
  return useQuery({
    queryKey: ['agentList', payload],
    queryFn: () => agentlistApi(payload),
  });
};

export const useAgentDetailApi = (agentId) => {
  return useQuery({
    queryKey: ['agentdetail', agentId],
    queryFn: () => agentDeatilApi(agentId),
  });
};

export const useAgentPropertyList = (params, agentId) => {
  return useQuery({
    queryKey: ['agentPropertyList', agentId],
    queryFn: () => agentPropertyListApi(params, agentId),
  });
};
