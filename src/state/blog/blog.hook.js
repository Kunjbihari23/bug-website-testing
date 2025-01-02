import { useQuery } from '@tanstack/react-query';
import { GetBlogDetail, GetBlogList } from './blog.api';
import { useSession } from 'next-auth/react';

export const useGetBlogList = (params) => {
  return useQuery({
    queryKey: ['blogList'],
    queryFn: () => GetBlogList(params),
  });
};

export const useGetBlogDetail = (params) => {
  return useQuery({
    queryKey: ['blogDetail'],
    queryFn: () => GetBlogDetail(params),
  });
};
