import { useQuery } from '@tanstack/react-query';
import { getPropertyListingApi } from './propertyList.api';

export const usePropertyList = (userId) => {
  return useQuery({
    queryKey: ['propertyList', userId],
    queryFn: () => getPropertyListingApi(userId),
  });
};
