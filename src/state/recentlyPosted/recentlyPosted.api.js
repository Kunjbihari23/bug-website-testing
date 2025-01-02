import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';
import { paramsToQueryString } from '@/util/commonFunction';

const getRecentlyPostedApi = async (params) => {
  const fetchApi = createFetchApi();
  const queryString = paramsToQueryString(params);
  const resp = await fetchApi(API.recentlyPostedProperty.postedProperty + queryString, 'GET', 120);
  return resp.data;
};
export default getRecentlyPostedApi;
