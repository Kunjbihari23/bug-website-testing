import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';

export const getCitylistApi = async () => {
  const resp = await instance.get(API.cityList.city);
  return resp?.data?.data;
};
