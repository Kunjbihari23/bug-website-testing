import API from '@/instance/api';
import instance from '@/instance/instance';
import { paramsToQueryString } from '@/util/commonFunction';

export const GetFaqMasterList = async (params) => {
  const queryString = paramsToQueryString(params);
  const resp = await instance.get(API.faq + queryString, 'GET', 120);
  return resp.data.data;
};
