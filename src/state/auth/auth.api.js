import API from '@/instance/api';
import instance from '@/instance/instance';

export const loginApi = async (body) => {
  const response = await instance.post(API.auth.login, body);
  return response.data;
};

export const signupApi = async (body) => {
  const response = await instance.post(API.auth.signup, body);
  return response.data;
};

export const postOtpApi = async (body) => {
  const response = await instance.post(API.auth.postOtp, body);
  return response.data;
};

export const postResendOtpApi = async (body) => {
  const response = await instance.post(API.auth.resendOtp, body);
  return response.data;
};
