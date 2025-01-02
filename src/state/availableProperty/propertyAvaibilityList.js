import API from '@/instance/api';
import instance from '@/instance/instance';

export const propertyAvaibilityList = async (payload) => {
  const response = await instance.post(API.propertyAvaibilityList, payload);
  return response.data.data;
};
