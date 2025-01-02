import { useMutation, useQuery } from '@tanstack/react-query';
import { getCitylistApi } from './citylist.api';

export const useCitylistApi = () => {
  return useQuery({
    queryKey: ['citylist-api'],
    queryFn: () => getCitylistApi(),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};
