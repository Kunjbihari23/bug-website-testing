import API from '@/instance/api';
import instance from '@/instance/instance';

export const ContactUsApi = async (payload) => {
  const response = await instance.post(API.contact.inquiry, payload, {
    headers: {
      'Content-Type': false,
    },
  });
  return response.data;
};
