import API from '@/instance/api';
import instance from '@/instance/instance';

export const ContactUsCampaignApi = async (payload) => {
  const response = await instance.post(API.contactSanctum.inquiry, payload);
  return response.data;
};
