import { useMutation, useQuery } from '@tanstack/react-query';
import searchApi, { getAvailablePropList } from './search.api';

export const useSearchListApi = (params) => {
  return useQuery({
    queryKey: ['SearchApi', params],
    queryFn: () => searchApi(params),
  });
};

export const useAvailablePropList = (onSuccessAdded) => {
  return useMutation({
    mutationFn: (payload) => getAvailablePropList(payload),
    onError: (err) => {
      console.log('ERROR', err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};
