import { useMutation, useQuery } from '@tanstack/react-query';
import { postAddProjectApi } from './addProject.api';
import { apiError } from '@/util/commonFunction';

export const usePostAddProject = (handelSuccessProject) => {
  return useMutation({
    mutationFn: (data) => postAddProjectApi(data),
    onError: (err) => apiError(err),
    onSuccess: (data) => {
      handelSuccessProject();
      notifications.show({
        title: 'Project Added',
        message: 'Project Added Successfully. Our Team will verify your project details and contact you.',
      });
    },
  });
};
