import { useQuery } from '@tanstack/react-query';
import subPropertyTypeList, { subPropTypeFilter } from './subPropertyType.api';

export const useSubPropertyType = () => {
  return useQuery({
    queryKey: ['subPropertyType'],
    queryFn: () => subPropertyTypeList(),
  });
};

export const useSubPropertyTypeFilter = (params) => {
  return useQuery({
    queryKey: ['subPropertyTypeFilter'],
    queryFn: () => subPropTypeFilter(params),
    enabled: !!params.CatID,
  });
};
