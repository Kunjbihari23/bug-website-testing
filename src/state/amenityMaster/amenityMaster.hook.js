import { useQuery } from '@tanstack/react-query';
import { GetAmenitiesList, GetSubCategoryAmenityList } from './amenityMaster.api';
import { useSession } from 'next-auth/react';

export const useAmenityListMaster = () => {
  return useQuery({
    queryKey: ['amenitiy-list-master'],
    queryFn: () => GetAmenitiesList(),
  });
};

export const useSubCategoryAmenityList = (Ids) => {
  return useQuery({
    queryKey: ['subCategory-amenitiy-master'],
    queryFn: () => GetSubCategoryAmenityList(Ids),
    enabled: Ids.length > 0,
  });
};
