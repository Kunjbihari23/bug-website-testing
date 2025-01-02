import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';

export const propertyCategoryListApi = async () => {
  const fetchApi = createFetchApi();
  const response = await fetchApi(API.addProperty.propertyCategoryList);
  return response.data;
};

export const getSubCategoryListApi = async (id) => {
  const fetchApi = createFetchApi();
  const response = await fetchApi(API.addProperty.subCategoryList + id);
  return response.data;
};

export const postAddPropertyApi = async (payload) => {
  const response = await instance.post(API.addProperty.addProperty, payload, {
    headers: {
      'Content-Type': false,
    },
  });
  return response.data;
};

export const getUnableDisable = async (id, subId) => {
  const fetchApi = createFetchApi();
  const response = await fetchApi(API.addProperty.unenableDisable + `?catid=${id}&subcat=${subId}`);
  return response.data;
};

export const getMultipleSubCategoryListApi = async (ids) => {
  let query = `?CatID=`;
  if (Array.isArray(ids) && ids.length !== 0) {
    let idParams = ids.map((val) => val).join(',');
    query += `${idParams}`;
  }

  const fetchApi = createFetchApi();
  const response = await fetchApi(API.addProperty.multipleSubCategoryList + query);
  return response.data;
};

export const getPlaceNearBy = async (id) => {
  const fetchApi = createFetchApi();
  const response = await fetchApi(API.addProperty.placeNearBy + `?placeid=${id}`);
  return response.data;
};

export const getUnableDisableAmenties = async (id) => {
  const fetchApi = createFetchApi();
  const response = await fetchApi(API.addProperty.Amenities + `?subcatid=${id}`);
  return response.data;
};

export const getFacingData = async () => {
  const fetchApi = createFetchApi();
  const response = await fetchApi(API.addProperty.FacingDirection);
  return response.data;
};
