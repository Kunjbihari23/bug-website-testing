import { useQuery } from '@tanstack/react-query';
import {
  getlocalitylistApi,
  GetNewPopularLocality,
  GetPopularLocalityList,
  getSubLocalityListApi,
} from './localityList.api';

export const useLocalitylistApi = (selectedCity) => {
  return useQuery({
    queryKey: ['localitylist', selectedCity],
    queryFn: () => getlocalitylistApi(selectedCity),
  });
};

export const UsePopularLocalityList = (cityId) => {
  return useQuery({
    queryKey: ['popularlocalitylist', cityId],
    queryFn: () => GetPopularLocalityList(cityId),
    enabled: cityId !== null && cityId !== '' && cityId !== undefined,
    onError: (error) => {
      console.error('Error fetching popular locality list:', error);
    },
  });
};
export const useSubLocalityList = (cityId) => {
  return useQuery({
    queryKey: ['sublocalitylist', cityId],
    queryFn: () => getSubLocalityListApi(cityId),
    enabled: cityId !== null && cityId !== '' && cityId !== undefined,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useGetNewPopularLocality = (cityId) => {
  return useQuery({
    queryKey: ['GetNewPopularLocality', cityId],
    queryFn: () => GetNewPopularLocality(cityId),
  });
};
