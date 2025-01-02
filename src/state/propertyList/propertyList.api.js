import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';

export const getPropertyListingApi = async (userID) => {
  const fetchApi = createFetchApi();
  const reponse = await fetchApi(API.propertyList.getList + `?UserId=${userID}`);
  return reponse.data;
};
