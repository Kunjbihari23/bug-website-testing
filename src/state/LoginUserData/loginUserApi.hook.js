import { useMutation, useQuery } from '@tanstack/react-query';
import {
  AddProjectToFavorite,
  AddPropertyToFavorite,
  getDashboardCount,
  getUserInquiryProperty,
  getUserProfileDetail,
  RemoveProjectToFavorite,
  RemovePropertyToFavorite,
  updateLoginUser,
  UserBoosterProperty,
  UserFavoriteProperty,
  userProperty,
  UserPropertyInquiry,
  UserTopVisitProperty,
} from './loginUserApi.api';
import { showNotification } from '@mantine/notifications';

export const useGetUserProfileData = ({ id }) => {
  return useQuery({
    queryKey: ['getUserProfileDetail', id],
    queryFn: () => getUserProfileDetail(id),
  });
};

export const useUpdateUserProfileData = (onSuccessAdded) => {
  return useMutation({
    mutationFn: (formData) => updateLoginUser(formData),
    onError: (err) => {
      showNotification({
        title: 'Update Failed',
        message: 'An error occurred while updating the profile',
        color: 'red',
      });
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};

export const useLoginUserProperty = (data) => {
  return useQuery({
    queryKey: ['userProperty'],
    queryFn: () => userProperty(data),
  });
};

export const useUserInquiryPropety = ({ id }) => {
  return useQuery({
    queryKey: ['getUserInquiryProperty'],
    queryFn: () => getUserInquiryProperty(id),
  });
};

export const useDashBoardCount = ({ id }) => {
  return useQuery({
    queryKey: ['getDashboardCount'],
    queryFn: () => getDashboardCount(id),
  });
};

export const useTopVisitProperty = ({ id }) => {
  return useQuery({
    queryKey: ['UserTopVisitProperty'],
    queryFn: () => UserTopVisitProperty(id),
  });
};

export const useUserFavoriteProperty = ({ id }) => {
  return useQuery({
    queryKey: ['UserFavoriteProperty'],
    queryFn: () => UserFavoriteProperty(id),
  });
};

export const useUserBoosterProperty = ({ id }) => {
  return useQuery({
    queryKey: ['UserBoosterProperty'],
    queryFn: () => UserBoosterProperty(id),
  });
};

// export const useAddPropertyToFavorite = (data) => {
//   return useQuery({
//     queryKey: ['AddPropertyToFavorite'],
//     queryFn: () => AddPropertyToFavorite(data),
//   });
// };

export const useAddPropertyToFavorite = (onSuccessAdded, onErrorCallback) => {
  return useMutation({
    mutationFn: (payload) => AddPropertyToFavorite(payload),
    onError: (err) => {
      onErrorCallback(err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};

export const useRemovePropertyToFavorite = (onSuccessAdded, onErrorCallback) => {
  return useMutation({
    mutationFn: (payload) => RemovePropertyToFavorite(payload),
    onError: (err) => {
      onErrorCallback(err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};
export const useAddProjectToFavorite = (onSuccessAdded, onErrorCallback) => {
  return useMutation({
    mutationFn: (payload) => AddProjectToFavorite(payload),
    onError: (err) => {
      onErrorCallback(err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};

export const useRemoveProjectToFavorite = (onSuccessAdded, onErrorCallback) => {
  return useMutation({
    mutationFn: (payload) => RemoveProjectToFavorite(payload),
    onError: (err) => {
      onErrorCallback(err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};
