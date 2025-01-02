import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
// import instance from '@/instance/instance';

const getPropetyTypelistApi = async () => {
  const fetchApi = createFetchApi();
  const resp = await fetchApi.get(API.propertyType.property);
  return resp.data || [];
};
export default getPropetyTypelistApi;
