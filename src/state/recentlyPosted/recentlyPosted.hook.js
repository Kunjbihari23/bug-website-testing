import { useQuery } from '@tanstack/react-query';
import getRecentlyPostedApi from './recentlyPosted.api';

export const useRecentlyPostedApi = (params) => {
  return useQuery({
    queryKey: ['recentlyPostedlist', params],
    queryFn: () => getRecentlyPostedApi(params),
  });
};
