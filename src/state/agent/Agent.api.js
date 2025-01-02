import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';
import { paramsToQueryString } from '@/util/commonFunction';

export const getAgentlistApi = async (
  payload = {
    UserId: 0,
    city: 'ahmedabad',
  }
) => {
  const response = await instance.post(API.agents.agentsList, payload);
  return response.data.data;
};

export const agentlistApi = async (body) => {
  const response = await instance.post(API.agents.agentsList, body);
  return response.data.data;
};

export const agentDeatilApi = async (agentId) => {
  const fetchApi = createFetchApi();
  const resp = await fetchApi(API.agents.agentDetail + `?agentid=${agentId}`, 'GET', 120);
  return resp.data;
};

export const agentPropertyListApi = async (params) => {
  const fetchApi = createFetchApi();
  const queryString = paramsToQueryString(params);
  const resp = await fetchApi(API.agents.agentPropertyList + queryString, 'GET', 120);
  return resp.data;
};
