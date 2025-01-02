'use client';
import React, { useState } from 'react';
import style from './auth.module.css';
import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import {
  Center,
  Checkbox,
  CheckboxCard,
  Divider,
  Group,
  PinInput,
  Radio,
  Stack,
  Text,
  UnstyledButton,
  em,
} from '@mantine/core';
import { FormPhoneInput, FormRadio, FormTextInput } from '../CustomComponents/CustomInputs/CustomInput';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import { useMediaQuery } from '@mantine/hooks';
import { grey_font_color, info_blue_color, primary_color, white_color } from '@/constant/FontColotConstant';
import { joiResolver, useForm } from '@mantine/form';
import Link from 'next/link';
import Image from 'next/image';
import { google_LoginBtn } from '@/constant/ImageConstant';
import Joi from 'joi';
import { formatPhoneNumber } from '@/util/commonFunction';
import { usePostOtp, useResendPostOtp, useSignUp } from '@/state/auth/auth.hook';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const schema = Joi.object({
  UserName: Joi.string().required().label('Name').messages({
    'any.required': 'Please enter your name',
    'string.empty': 'Please enter your name',
  }),
  Email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email')
    .messages({
      'any.required': 'Please enter your email',
      'string.empty': 'Please enter your email',
      'string.email': 'Invalid email address',
    }),
  PhoneNumber: Joi.string().required().label('Name').messages({
    'any.required': 'Please enter your phone number',
    'string.empty': 'Please enter your phone number',
  }),
  UserType: Joi.string().valid('1', '2', '3').required().label('User Type').messages({
    'any.required': 'Please select a user type',
    'string.empty': 'Please select a user type',
    'any.only': 'Invalid user type selected',
  }),
  termsOfService: Joi.boolean().valid(true).required().label('Terms of Service').messages({
    'any.required': 'You must agree to the terms and conditions',
    'any.only': 'You must agree to the terms and conditions',
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

function SignUp(props) {
  let { isUserLogedIn, isLogedIn } = props;
  const isSmallScreen = useMediaQuery(`(max-width: ${em(400)})`);

  const router = useRouter();

  const [selectedUser, setSelectedUser] = useState('');

  const [verifyOtp, setVerifyOtp] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      UserName: '',
      Email: '',
      PhoneNumber: '',
      UserType: '',
      termsOfService: false,
    },

    validate: joiResolver(schema),
  });

  const formOtp = useForm({
    initialValues: {
      OTP: '',
    },

    validate: joiResolver(otpSchema),
  });

  const onSuccessAdded = (data) => {
    setSelectedUser(data);
    setVerifyOtp(true);
  };

  const { mutate: signupMutate, isPending: signupPending } = useSignUp(onSuccessAdded);

  const handleSubmit = (value) => {
    const simplePhoneNumber = formatPhoneNumber(value.PhoneNumber);

    const formData = {
      UserName: value.UserName,
      Email: value.Email,
      PhoneNumber: simplePhoneNumber,
      UserType: value.UserType,
      VerifyUser: null,
    };

    signupMutate(formData);
  };

  const onSuccessOtp = async (data) => {
    // isUserLogedIn(true);
    const response = await signIn('credentials', {
      redirect: false,
      id: selectedUser.id,
      userName: selectedUser.userName,
      phoneNumber: selectedUser.phoneNumber,
      userType: selectedUser.userType,
      email: selectedUser.email,
      profileImage: selectedUser.profileImage,
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

  const handleOtpSubmit = (value) => {
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
    resendOtpMutate(formData);
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
              <CustomePrimaryButton isLoading={otpPending} size="small" fullWidth={true} fontSize={18}>
                <RegularBigFont color={white_color}>Submit OTP</RegularBigFont>
              </CustomePrimaryButton>
            </Stack>
          </form>
        </Stack>
      ) : (
        <Stack gap={24} px={4} py={8}>
          <HeadingSix fontWeight={500}>Create your Account </HeadingSix>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={16}>
              <Group wrap={isSmallScreen ? 'wrap' : 'nowrap'} gap={10}>
                <RegularFont color={grey_font_color}>I am : </RegularFont>
                <Radio.Group
                  classNames={{
                    error: style.errorAbsolute,
                  }}
                  {...form.getInputProps('UserType')}
                >
                  <Group>
                    <FormRadio value="1" label="User"></FormRadio>
                    <FormRadio value="2" label="Agent"></FormRadio>
                    {/* <FormRadio value="3" label="Builder"></FormRadio> */}
                  </Group>
                </Radio.Group>
              </Group>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>Name</RegularFont>
                <FormTextInput
                  errorAbsolute
                  other={{ ...form.getInputProps('UserName') }}
                  placeholder="Enter your name..."
                />
              </Stack>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>Phone Number</RegularFont>
                <FormPhoneInput
                  errorAbsolute
                  onKeyDown={(e) => {
                    form.setFieldValue('PhoneNumber', e.target.value);
                  }}
                  other={{ ...form.getInputProps('PhoneNumber') }}
                  placeholder="Please enter your phone number"
                />
              </Stack>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>Email Address</RegularFont>
                <FormTextInput
                  errorAbsolute
                  other={{ ...form.getInputProps('Email') }}
                  placeholder="Enter your email id..."
                />
              </Stack>
              <Stack gap={8}>
                <Group wrap="nowrap" mt={5}>
                  <Checkbox
                    classNames={{
                      input: style.inputWrapperCheck,
                      error: style.errorCheckbox,
                    }}
                    key={form.key('termsOfService')}
                    label={
                      <SmallFont color={grey_font_color}>
                        By clicking you agree to{' '}
                        <Link href={'#'}>
                          <Text span inherit td={'underline'}>
                            Terms & Conditions
                          </Text>
                        </Link>
                      </SmallFont>
                    }
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                  />
                </Group>
                <CustomePrimaryButton isLoading={signupPending} size="small" fullWidth={true} fontSize={18}>
                  <RegularBigFont color={white_color}>Register</RegularBigFont>
                </CustomePrimaryButton>
                <Group gap={4}>
                  <SmallFont color={grey_font_color}>Already Register?</SmallFont>{' '}
                  <UnstyledButton
                    onClick={() => {
                      isUserLogedIn(true);
                    }}
                    fw={14}
                  >
                    <SmallFont color={info_blue_color}>
                      <Text span inherit td={'underline'}>
                        Login
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

export default SignUp;
