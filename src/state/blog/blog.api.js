import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';
import { paramsToQueryString } from '@/util/commonFunction';

export const GetBlogList = async (params) => {
  const queryString = paramsToQueryString(params);

  const resp = await instance.get(API.blog.blogList + queryString, 'GET', 120);
  return resp.data.data;
};

export const GetBlogDetail = async (params) => {
  const fetchApi = createFetchApi();
  const queryString = paramsToQueryString(params);
  const resp = await fetchApi(API.blog.blogDetail + queryString, 'GET', 120);
  return resp.data;
};
