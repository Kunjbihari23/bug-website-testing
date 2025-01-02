import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';
import { paramsToQueryString } from '@/util/commonFunction';

export const getlocalitylistApi = async (params) => {
  const queryString = paramsToQueryString(params);
  const response = await instance.get(API.localityList.local + queryString);
  return response?.data?.data;
};

export const GetPopularLocalityList = async (cityId) => {
  const resp = await instance.get(API.PopularLocalitywithCity + `?cityid=${cityId}`);
  return resp.data.data;
};

export const GetNewPopularLocality = async (cityId) => {
  const fetchApi = createFetchApi();
  const resp = await fetchApi(API.localityList.popularLocalityApi + `?Cityid=${cityId}`);
  return resp.data;
};

export const getSubLocalityListApi = async (cityId) => {
  const fetchApi = createFetchApi();
  const resp = await fetchApi(API.subLocalityList + `?cityid=${cityId}`);
  return resp.data;
};
