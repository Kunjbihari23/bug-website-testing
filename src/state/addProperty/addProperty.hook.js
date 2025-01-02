import { apiError } from '@/util/commonFunction';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getFacingData,
  getMultipleSubCategoryListApi,
  getPlaceNearBy,
  getSubCategoryListApi,
  getUnableDisable,
  getUnableDisableAmenties,
  postAddPropertyApi,
  propertyCategoryListApi,
} from './addProperty.api';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next-nprogress-bar';
import useAddPropertyStore from '@/store/useAddPropertyStore';

export const usePropertyCategoryList = () => {
  return useQuery({
    queryKey: ['propertyCategoryList'],
    queryFn: () => propertyCategoryListApi(),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useSubPropertyCategoryList = (id) => {
  return useQuery({
    queryKey: ['subPropertyCategoryList', id],
    queryFn: () => getSubCategoryListApi(id),
    enabled: id !== '',
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useAddProperty = (isEdit = false) => {
  const router = useRouter();
  const { resetStep } = useAddPropertyStore();
  return useMutation({
    mutationFn: (data) => postAddPropertyApi(data),
    onError: (err) => apiError(err),
    onSuccess: (data) => {
      notifications.show({
        title: isEdit ? 'Property Edited' : 'Property Added',
        message: isEdit ? 'Property Edited Successfully' : 'Property Added Successfully',
      });
      router.push('/Client/UserProperty');
      resetStep();
    },
  });
};

export const useGetUnableDisable = (id, subId) => {
  return useQuery({
    queryKey: ['getUnableDisable', id, subId],
    queryFn: () => getUnableDisable(id, subId),
    enabled: id !== '' && subId !== '',
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useMultipleSubCategoryList = (ids = []) => {
  return useQuery({
    queryKey: ['subPropertyCategoryList', ids],
    queryFn: () => getMultipleSubCategoryListApi(ids),
    enabled: ids.length > 0,
  });
};

export const usePlaceNearBy = (id) => {
  return useQuery({
    queryKey: ['getPlaceNearBy', id],
    queryFn: () => getPlaceNearBy(id),
    enabled: id !== '',
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useGetUnableDisableAmenities = (id) => {
  return useQuery({
    queryKey: ['getUnableDisableAmenties', id],
    queryFn: () => getUnableDisableAmenties(id),
    enabled: id !== '',
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

// export const useGetFacingData = () => {
//   return useQuery({
//     queryKey: ['getFacingDetails'],
//     queryFn: () => getFacingData(),
//   });
// };

export const useGetFacingData = () => {
  return useQuery({
    queryKey: ['getFacingDetails'],
    queryFn: () => getFacingData(),
  });
};
