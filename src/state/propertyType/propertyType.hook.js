import { useQuery } from '@tanstack/react-query';
import getPropetyTypelistApi from './propertyType.api';

export const usePropetyTypelist = () => {
  return useQuery({
    queryKey: ['propertyTypeList'],
    queryFn: () => getPropetyTypelistApi(),
  });
};
