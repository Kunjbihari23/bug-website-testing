import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';

export const getUserProfileDetail = async (id) => {
  const response = await instance.get(API.userData.getUserDetail + `?userId=${id}`);
  return response.data.data;
};

export const updateLoginUser = async (payload) => {
  const response = await instance.post(API.userData.updateUserDetail, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const userProperty = async (payload) => {
  const { UserId, status, city, title } = payload;
  const response = await instance.get(
    API.userData.userProperty + `?UserId=${UserId}&status=${status}&city=${city ?? ''}&Title=${title ?? ''}`
  );
  return response.data;
};

export const getUserInquiryProperty = async (id) => {
  const response = await instance.get(API.userData.userPropertyInquiry + `?UserId=${id}`);
  return response.data.data;
};

export const getDashboardCount = async (id) => {
  const response = await instance.get(API.userData.DashboardCount + `?UserId=${id}`);
  return response.data.data;
};

export const UserTopVisitProperty = async (id) => {
  const response = await instance.get(API.userData.TopvisitProperty + `?UserId=${id}`);
  return response.data.data;
};

export const UserFavoriteProperty = async (id) => {
  const response = await instance.get(API.userData.FavoriteProperty + `?userid=${id}`);
  return response.data.data;
};

export const UserBoosterProperty = async (id) => {
  const response = await instance.get(API.userData.BoosterProperty + `?userid=${id}`);
  return response.data.data;
};

export const AddPropertyToFavorite = async (payload) => {
  // const { UserId, propertyId } = payload;
  const response = await instance.post(API.userData.favoriteProperty, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const AddProjectToFavorite = async (payload) => {
  // const { UserId, propertyId } = payload;
  const response = await instance.post(API.userData.favoriteProject, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const RemovePropertyToFavorite = async (payload) => {
  const { UserId, propertyid } = payload;
  const response = await instance.get(
    API.userData.deleteFavouriteProperty + `?userid=${UserId}&propertyid=${propertyid}`
  );

  return response.data;
};
export const RemoveProjectToFavorite = async (payload) => {
  const { UserId, projectid } = payload;

  const response = await instance.get(API.userData.deleteFavouriteProject + `?userid=${UserId}&projectid=${projectid}`);

  return response.data;
};
