import { useQuery } from '@tanstack/react-query';
import { GetSettings } from './settings.api';
import { useSession } from 'next-auth/react';

export const useGetSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => GetSettings(),
  });
};
