import { useQuery } from '@tanstack/react-query';
import { propertyTypeList } from './propertyType.api';

export const usePropertyType = () => {
  return useQuery({
    queryKey: ['propertyType'],
    queryFn: () => propertyTypeList(),
  });
};
