import { useMutation, useQuery } from '@tanstack/react-query';
import { propertyAvaibilityList } from './propertyAvaibilityList';

export const useAvailableListApi = (onSuccessAdded) => {
  return useMutation({
    mutationFn: (payload) => propertyAvaibilityList(payload),
    onError: (err) => {
      console.log('ERORR', err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};
