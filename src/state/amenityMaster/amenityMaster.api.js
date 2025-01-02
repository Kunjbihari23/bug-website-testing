import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import { paramsToQueryString } from '@/util/commonFunction';

export const GetAmenitiesList = async () => {
  const fetchApi = createFetchApi();
  const resp = await fetchApi(API.amenityMaster, 'GET', 120);
  return resp.data;
};

export const GetSubCategoryAmenityList = async (ids) => {
  let query = `?subcatid=`;
  if (Array.isArray(ids) && ids.length !== 0) {
    let idParams = ids.map((val) => val).join(',');
    query += `${idParams}`;
  }
  const fetchApi = createFetchApi();
  const resp = await fetchApi(API.subCategoryAmenityMaster + query, 'GET', 120);
  return resp.data;
};
