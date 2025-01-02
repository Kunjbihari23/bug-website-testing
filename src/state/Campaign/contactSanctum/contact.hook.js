import { useMutation, useQuery } from '@tanstack/react-query';
import { ContactUsCampaignApi } from './contact.api';

export const useContactInquiry = (onSuccessAdded) => {
  return useMutation({
    mutationFn: (payload) => ContactUsCampaignApi(payload),
    onError: (err) => {
      console.log('ERROR', err);
    },
    onSuccess: (data) => {
      onSuccessAdded(data);
    },
  });
};
