import API from '@/instance/api';
import instance from '@/instance/instance';

const getAgentlistApi = async () => {
  const response = await instance.post(API.agentList, payload);
  return response.data.data;
};
export default getAgentlistApi;
