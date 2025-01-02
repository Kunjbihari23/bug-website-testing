import { useQuery } from '@tanstack/react-query';
import { GetFaqMasterList } from './faqMaster.api';
import { useSession } from 'next-auth/react';

export const useGetFaqMasterList = (params) => {
  return useQuery({
    queryKey: ['faq-master-list'],
    queryFn: () => GetFaqMasterList(params),
  });
};
