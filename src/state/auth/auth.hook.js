import { useMutation } from '@tanstack/react-query';
import { loginApi, postOtpApi, postResendOtpApi, signupApi } from './auth.api';
import { apiError } from '@/util/commonFunction';
import { notifications } from '@mantine/notifications';

export const useLogin = (onSuccessAdded) => {
  return useMutation({
    mutationFn: (data) => loginApi(data),
    onError: (err) => apiError(err),
    onSuccess: (data) => {
      // if (data) {
      //   notifications.show({
      //     title: 'Please enter otp',
      //   });
      //   onSuccessAdded(data);
      // }
      if (!data.error) {
        notifications.show({
          title: 'Please enter otp',
        });
        onSuccessAdded(data?.data);
      } else {
        notifications.show({
          title: data && data?.message ? data.message : 'Something went wrong. PLease try again.',
        });
      }
    },
  });
};

export const useSignUp = (onSuccessAdded) => {
  return useMutation({
    mutationFn: (data) => signupApi(data),
    onError: (err) => apiError(err),
    onSuccess: (data) => {
      // if (data) {
      //   notifications.show({
      //     title: 'Please enter otp',
      //   });
      //   onSuccessAdded(data);
      // }
      if (!data.error) {
        notifications.show({
          title: 'Please enter otp',
        });
        onSuccessAdded(data?.data);
      } else {
        notifications.show({
          title: data && data?.message ? data.message : 'Something went wrong. PLease try again.',
        });
      }
    },
  });
};

export const usePostOtp = (onSuccessOtp) => {
  return useMutation({
    mutationFn: (data) => postOtpApi(data),
    onError: (err) => {
      apiError(err);
    },

    onSuccess: (data) => {
      if (!data.error) {
        // notifications.show({
        //   title: 'Please enter otp',
        // });
        onSuccessOtp(data?.data);
      } else {
        notifications.show({
          title: data && data?.message ? data.message : 'Something went wrong. PLease try again.',
        });
      }
    },
  });
};

export const useResendPostOtp = () => {
  return useMutation({
    mutationFn: (data) => postResendOtpApi(data),
    onError: (err) => {
      apiError(err);
    },
    onSuccess: (data) => {
      if (data.error) {
        notifications.show({
          title: data && data?.message ? data.message : 'Something went wrong. PLease try again.',
        });
      }
    },
  });
};
