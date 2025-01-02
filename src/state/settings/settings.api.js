import API from '@/instance/api';
import instance from '@/instance/instance';
import { paramsToQueryString } from '@/util/commonFunction';

export const GetSettings = async (params) => {
  const queryString = paramsToQueryString(params);
  const resp = await instance.get(API.setting + queryString, 'GET', 120);
  return resp.data;
};
