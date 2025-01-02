import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';

export const postAddProjectApi = async (body) => {
  const response = await instance.post(API.addProject, body, {
    headers: {
      'Content-Type': false,
    },
  });
  return response.data;
};
