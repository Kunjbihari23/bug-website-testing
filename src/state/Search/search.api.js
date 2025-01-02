import API from '@/instance/api';
import instance from '@/instance/instance';

const searchApi = async (payload) => {
  const response = await instance.post(API.searchList.search, payload);
  return response.data.data;
};
export default searchApi;

export const getAvailablePropList = async (payload) => {
  const response = await instance.post(API.propertyAvaibilityList, payload);
  return response.data.data;
};
