import React, { useEffect, useState } from 'react';
import style from './forms.module.css';
import { Badge, Card, Container, Divider, Group, NumberInput, Stack, em } from '@mantine/core';
import { HeadingSix, RegularFont, SmallFont } from '../TypographyComponent/HeadingComponents';
import { black_color, grey_font_color, lightgrey_font_color } from '@/constant/FontColotConstant';
import { agentImg, defaultImg, defaultUserImg, verifyIcon } from '@/constant/ImageConstant';
import { FormPhoneInput, FormTextInput } from '../CustomInputs/CustomInput';
import { Form, joiResolver, useForm } from '@mantine/form';
import CustomePrimaryButton from '../CustomButtons/CustomButtons';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import { usePropertyInquiryApi } from '@/state/property/property.hook';
import { useSession } from 'next-auth/react';
import AuthModal from '../AuthModal/AuthModal';
import Joi from 'joi';
import { formatPhoneNumber } from '@/util/commonFunction';

const schema = Joi.object({
  name: Joi.string().required().label('name').messages({
    'any.required': 'Please enter your name',
    'string.empty': 'Name is required',
  }),
  mobile: Joi.string().required().label('mobile').messages({
    'any.required': 'Please enter your phone number',
    'string.empty': 'Please enter your phone number',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('email')
    .messages({
      'any.required': 'Please enter your email',
      'string.empty': 'Please enter your email',
      'string.email': 'Invalid email address',
    }),
});

function ContactAgentForm({ agentDetail, isPending }) {
  const isTablte = useMediaQuery(`(max-width: ${em(767)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [opened, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false); // Track submission attempt

  const { data: sessionClient } = useSession();

  useEffect(() => {
    if (sessionClient) {
      form.setValues({
        email: sessionClient?.user?.email ? sessionClient?.user?.email : '',
        name: sessionClient?.user?.userName ? sessionClient?.user?.userName : '',
        mobile: sessionClient?.user?.phoneNumber ? sessionClient?.user?.phoneNumber : '',
      });
    }
  }, [sessionClient]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: sessionClient?.user?.email ? sessionClient?.user?.email : '',
      name: sessionClient?.user?.userName ? sessionClient?.user?.userName : '',
      mobile: sessionClient?.user?.phoneNumber ? sessionClient?.user?.phoneNumber : '',
    },
    validate: joiResolver(schema),
  });

  const inquiryApiResp = () => {
    form.reset();
  };

  const {
    mutate: mutatePropertyInquiry,
    isPending: isPendingInquiery,
    error: errorInquiery,
  } = usePropertyInquiryApi(inquiryApiResp);

  const handleSubmitInquiry = (val) => {
    setAttemptedSubmit(true);

    // if (!sessionClient) {
    //   authModalOpen();
    //   return;
    // }

    const payload = {
      name: val?.name || sessionClient?.user?.userName,
      mobile: formatPhoneNumber(val?.mobile || sessionClient?.user?.phoneNumber),
      email: val?.email || sessionClient?.user?.email,
      InquiryFrom: 'contact detail',
      propertyId: 0,
      description: '',
      IsInterestedForSiteVisit: false,
      UsetType: sessionClient?.user?.userType || '1',
      ReasonForBuy: 'Self Use',
    };
    mutatePropertyInquiry(payload);
  };

  return (
    <div>
      <Container size="40rem" px={isMobile ? '14px' : isTablte ? '3rem' : '6rem'}>
        <Stack gap={24}>
          <HeadingSix fontWeight={500} color={black_color} textAlign="center">
            Contact {agentDetail?.userName} today for unparalleled expertise in the real estate market.
          </HeadingSix>
          <Card shadow="sm" padding="lg">
            <Stack gap={8}>
              <HeadingSix fontWeight={500}>Contact Agent</HeadingSix>
              <Group wrap="nowrap" className={style.agentContactCard} gap={10}>
                <div className={style.agent_img}>
                  <Image
                    component={NextImage}
                    src={agentDetail?.profileImage}
                    alt={agentDetail?.userName}
                    width={66}
                    height={80}
                    fallbackSrc={defaultUserImg}
                  />
                </div>
                <Stack gap={2}>
                  <Group gap={6}>
                    <RegularFont fontWeight={500}>{agentDetail?.userName}</RegularFont>
                    <Image component={NextImage} src={verifyIcon} alt="verify-agent" width={20} height={20} />
                  </Group>
                  <Badge color="#EBF8F1" size="lg" classNames={{ label: style.agent_BadgeLabel }}>
                    Real Estate Agent
                  </Badge>
                </Stack>
              </Group>
              <RegularFont fontWeight={500}>Please share your contact</RegularFont>

              <form>
                <Stack gap={10} mb={24}>
                  <Stack gap={4}>
                    <RegularFont color={grey_font_color}>Name</RegularFont>
                    <FormTextInput
                      placeholder="Enter your name..."
                      key={form.key('name')}
                      other={{ ...form.getInputProps('name') }}
                    />
                  </Stack>
                  <Stack gap={4}>
                    <RegularFont color={grey_font_color}>Phone Number</RegularFont>
                    <FormPhoneInput other={{ ...form.getInputProps('mobile') }} placeholder="Add phone number" />
                  </Stack>
                  <Stack gap={4}>
                    <RegularFont color={grey_font_color}>Email Id</RegularFont>
                    <FormTextInput
                      placeholder="Enter your email id..."
                      key={form.key('email')}
                      other={{ ...form.getInputProps('email') }}
                    />
                  </Stack>
                </Stack>
                <CustomePrimaryButton size="small" fullWidth={true} onClick={form.onSubmit(handleSubmitInquiry)}>
                  Send
                </CustomePrimaryButton>
              </form>
            </Stack>
          </Card>
        </Stack>
      </Container>

      <AuthModal opened={opened} close={authModalClose} />
    </div>
  );
}

export default ContactAgentForm;
