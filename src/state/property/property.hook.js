import { useMutation, useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { propertyDeatilApi, propertyInquiryRequest, propertyNewDeatilApi } from './property.api';

export const usePropertyDeatilApi = (params, isLoggedIn) => {
  // 0 for property , 1 project
  return useQuery({
    queryKey: ['propertyDetail', params],
    queryFn: () => propertyDeatilApi(params),
    enabled: isLoggedIn,
  });
};

export const usePropertyNewDeatilApi = (params, isLoggedIn) => {
  return useQuery({
    queryKey: ['propertyNewDetail', params],
    queryFn: () => propertyNewDeatilApi(params),
    enabled: !isLoggedIn,
  });
};

export const usePropertyInquiryApi = (inquiryApiResp) => {
  return useMutation({
    mutationFn: (data) => propertyInquiryRequest(data),
    onError: (err) => {
      notifications.show({
        title: 'Somthing Went wrong',
        message: err?.response?.data?.title,
      });
      return false;
    },
    onSuccess: (data) => {
      notifications.show({
        title: data?.message,
      });
      inquiryApiResp();
      return true;
    },
  });
};
