import API from '@/instance/api';
import instance from '@/instance/instance';

export const propertyTypeList = async () => {
  const resp = await instance.get(API.searchList.propertyTypeList);
  return resp.data;
};
