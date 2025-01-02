'use client';
import React, { useState } from 'react';
import style from './auth.module.css';
import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import { Center, Divider, Group, PinInput, Stack, Text, UnstyledButton, em } from '@mantine/core';
import { FormPhoneInput, FormTextInput } from '../CustomComponents/CustomInputs/CustomInput';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import { grey_font_color, info_blue_color, secondary_dark, white_color } from '@/constant/FontColotConstant';
import { joiResolver, useForm } from '@mantine/form';
import Link from 'next/link';
import Image from 'next/image';
import { google_LoginBtn } from '@/constant/ImageConstant';
import Joi from 'joi';
import { formatPhoneNumber } from '@/util/commonFunction';
import { useLogin, usePostOtp, useResendPostOtp } from '@/state/auth/auth.hook';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

const schema = Joi.object({
  PhoneNumber: Joi.string().required().label('Name').messages({
    'any.required': 'Please enter your phone number',
    'string.empty': 'Please enter your phone number',
  }),
});

const otpSchema = Joi.object({
  OTP: Joi.string()
    .required()
    .pattern(/^\d{5}$/)
    .label('OTP')
    .messages({
      'any.required': 'Please enter OTP',
      'string.empty': 'Please enter OTP',
      'string.pattern.base': 'OTP must be exactly 4 digits',
    }),
});

function LoginForm(props) {
  let { isUserLogedIn, isLogedIn } = props;

  const router = useRouter();

  const [verifyOtp, setVerifyOtp] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      PhoneNumber: '',
    },

    // validate: joiResolver(schema),
  });

  const formOtp = useForm({
    initialValues: {
      OTP: '',
    },

    // validate: joiResolver(otpSchema),
  });

  const onSuccessAdded = (data) => {
    setSelectedUser(data);
    setVerifyOtp(true);
  };

  const { mutate: loginMutate, isPending: loginPending } = useLogin(onSuccessAdded);

  const handleSubmit = (value) => {
    const simplePhoneNumber = formatPhoneNumber(value.PhoneNumber);

    let formData = new FormData();
    formData.append('Email', '');
    formData.append('PhoneNumber', simplePhoneNumber);
    loginMutate(formData);
  };

  const onSuccessOtp = async (data) => {
    // isUserLogedIn(true);
    const response = await signIn('credentials', {
      redirect: false,
      id: selectedUser.userId,
      userName: selectedUser.userName,
      phoneNumber: selectedUser.phoneNumber,
      userType: selectedUser.userType,
      email: selectedUser.email,
      profileImage: selectedUser.profileImage,
      token: selectedUser.token,
    });
    if (response.ok) {
      window.location.reload();
    } else {
      notifications.show({
        title: 'Login Error',
        message: 'Something went wrong please try again',
      });
    }
  };

  const { mutate: otpMutate, isPending: otpPending } = usePostOtp(onSuccessOtp);
  const { mutate: resendOtpMutate, isPending: resendOtpPending } = useResendPostOtp();

  const handleOtpSubmit = async (value) => {
    const formData = {
      UserId: selectedUser?.id,
      OTP: value.OTP,
      verifyWithNumber: selectedUser?.phoneNumber,
    };

    otpMutate(formData);
  };

  const handleChangeOtp = (value) => {
    formOtp.setValues({
      OTP: value,
    });
  };

  const handleResendOtp = async () => {
    const formData = {
      VerifyUser: selectedUser?.phoneNumber,
    };
    resendOtpMutate(formData, {
      onSuccess: () => {
        notifications.show({
          title: 'Success',
          message: 'Resend OTP successfully sent',
          color: 'green',
        });
      },
      onError: (error) => {
        notifications.show({
          title: 'Error',
          message: 'Failed to send OTP. Please try again later',
          color: 'red',
        });
      },
    });
  };

  return (
    <div className={style.signUpForm_container}>
      {verifyOtp ? (
        <Stack gap={24} px={4} py={8}>
          <HeadingSix fontWeight={500}>Verify OTP </HeadingSix>
          <form onSubmit={formOtp.onSubmit(handleOtpSubmit)}>
            <Stack gap={16}>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>OTP</RegularFont>
                <PinInput length={5} onChange={handleChangeOtp} placeholder="0" type="number" oneTimeCode />
                {formOtp.errors.OTP && (
                  <Text c="red" mt={5}>
                    {formOtp.errors.OTP}
                  </Text>
                )}
              </Stack>
              <UnstyledButton onClick={handleResendOtp} fw={14} disabled={resendOtpPending}>
                <SmallFont color={info_blue_color}>
                  <Text span inherit td={'underline'}>
                    Resend OTP
                  </Text>
                </SmallFont>
              </UnstyledButton>

              <CustomePrimaryButton
                isLoading={otpPending}
                size="small"
                fullWidth={true}
                fontSize={18}
                disabled={resendOtpPending}
              >
                <RegularBigFont color={white_color}>Submit OTP</RegularBigFont>
              </CustomePrimaryButton>
            </Stack>
          </form>
        </Stack>
      ) : (
        <Stack gap={24} px={4} py={8}>
          <HeadingSix fontWeight={500}>Welcome Back</HeadingSix>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={16}>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>Phone Number</RegularFont>
                <FormPhoneInput
                  errorAbsolute
                  other={{ ...form.getInputProps('PhoneNumber') }}
                  placeholder="Enter your mobile number"
                  onKeyDown={(e) => {
                    form.setFieldValue('PhoneNumber', e.target.value);
                  }}
                />
              </Stack>
              <Stack gap={8}>
                <CustomePrimaryButton isLoading={loginPending} size="small" fullWidth={true} fontSize={18}>
                  <RegularBigFont color={white_color}>Login</RegularBigFont>
                </CustomePrimaryButton>
                <Group gap={4} wrap="nowrap">
                  <SmallFont color={grey_font_color}>Don’t have an account?</SmallFont>
                  <UnstyledButton onClick={() => isUserLogedIn(false)} fw={14}>
                    <SmallFont color={info_blue_color}>
                      <Text span inherit td={'underline'}>
                        Create an account
                      </Text>
                    </SmallFont>
                  </UnstyledButton>
                </Group>
              </Stack>
              {/* <Divider
                size="sm"
                label={
                  <RegularFont color={grey_font_color} fontWeight={500}>
                    OR
                  </RegularFont>
                }
                labelPosition="center"
              />
              <Center>
                <Link href={'#'}>
                  <Image src={google_LoginBtn} alt="google-login" width={300} height={40} />
                </Link>
              </Center> */}
            </Stack>
          </form>
        </Stack>
      )}
    </div>
  );
}

export default LoginForm;
