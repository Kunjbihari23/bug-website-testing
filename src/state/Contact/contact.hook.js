import { useMutation, useQuery } from '@tanstack/react-query';
import { ContactUsApi } from './contact.api';

export const useContactInquiry = (onSuccessAdded) => {
  return useMutation({
    mutationFn: (payload) => ContactUsApi(payload),
    onError: (err) => {
      console.log('ERROR', err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};
