import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';
import { paramsToQueryString } from '@/util/commonFunction';

export const propertyDeatilApi = async (params) => {
  const fetchApi = createFetchApi();
  const queryString = paramsToQueryString(params);
  const resp = await fetchApi(API.PropertyDetail + queryString);
  return resp.data;
};

export const propertyNewDeatilApi = async (params) => {
  const fetchApi = createFetchApi();
  const queryString = paramsToQueryString(params);
  const resp = await fetchApi(API.PropertyNewDetails + queryString);
  return resp.data;
};

export const propertyInquiryRequest = async (payload) => {
  const response = await instance.post(API.propertyInquiry, payload);
  return response.data;
};
