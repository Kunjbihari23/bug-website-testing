import {
  Avatar,
  Divider,
  Group,
  Notification,
  NumberInput,
  Radio,
  Stack,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { ExtraSmallFont, HeadingSix, RegularFont, SmallFont } from '../TypographyComponent/HeadingComponents';
import styles from './forms.module.css';
import { joiResolver, useForm } from '@mantine/form';
import CustomePrimaryButton from '../CustomButtons/CustomButtons';
import { grey_font_color, primary_green } from '@/constant/FontColotConstant';
import { FormCheckBox, FormPhoneInput, FormRadio, FormTextArea, FormTextInput } from '../CustomInputs/CustomInput';
import { usePropertyInquiryApi } from '@/state/property/property.hook';
import Joi from 'joi';
import Link from 'next/link';
import { formatPhoneNumber } from '@/util/commonFunction';
import { useSession } from 'next-auth/react';
import { useDisclosure } from '@mantine/hooks';
import AuthModal from '../AuthModal/AuthModal';

const schema = Joi.object({
  description: Joi.optional(),
  IsInterestedForSiteVisit: Joi.optional(),
  contacted_by_us: Joi.optional(),
  name: Joi.string().required().label('name').messages({
    'any.required': 'Please enter your name',
    'string.empty': 'Name is required',
  }),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .label('mobile')
    .messages({
      'any.required': 'Please enter your phone number',
      'string.empty': 'Please enter your phone number',
      'string.length': 'Phone number must be 10 digits',
      'string.pattern.base': 'Phone number must contain only digits',
    }),
  UsetType: Joi.string().valid('1', '2').required().label('User Type').messages({
    'any.required': 'Please select a user type',
    'string.empty': 'Please select a user type',
    'any.only': 'Invalid user type selected',
  }),
  ReasonForBuy: Joi.string().valid('Investment', 'Self Use').required().label('Reason to buy').messages({
    'any.required': 'Please select a reason to buy type',
    'string.empty': 'Please select a reason to buy type',
    'any.only': 'Invalid reason to buy type selected',
  }),
  tandc_and_policy: Joi.boolean().valid(true).required().label('Terms of Service').messages({
    'any.required': 'You must agree to the terms and conditions',
    'any.only': 'You must agree to the terms and conditions',
  }),
});

function PropertyInquiryForm({
  propertyId,
  ownerName = '',
  isModaleClose = () => {},
  propertyUser,
  handleInquirySuccess = () => {},
  Property_Project = 0,
}) {
  const { data: sessionClient } = useSession();
  const [opened, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);

  const inquiryForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: sessionClient && sessionClient?.user?.userName ? sessionClient?.user?.userName : '',
      mobile: sessionClient && sessionClient?.user?.phoneNumber ? sessionClient?.user?.phoneNumber : '',
      description: '',
      IsInterestedForSiteVisit: false,
      UsetType: '1',
      ReasonForBuy: 'Self Use',
      tandc_and_policy: false,
      contacted_by_us: false,
    },
    validate: joiResolver(schema),
  });

  useEffect(() => {
    if (sessionClient) {
      inquiryForm.setValues({
        name: sessionClient && sessionClient?.user?.userName ? sessionClient?.user?.userName : '',
        mobile: sessionClient && sessionClient?.user?.phoneNumber ? sessionClient?.user?.phoneNumber : '',
        UsetType:
          sessionClient && sessionClient?.user?.userType && sessionClient?.user?.userType !== 3
            ? sessionClient?.user?.userType
            : 1,
      });
    }
  }, [sessionClient]);

  const inquiryApiResp = () => {
    inquiryForm.reset();
    if (isModaleClose) {
      isModaleClose();
    }
    handleInquirySuccess();
  };

  const {
    mutate: mutatePropertyInquiry,
    isPending: isPendingInquiery,
    error: errorInquiery,
  } = usePropertyInquiryApi(inquiryApiResp);

  const handleSubmitInqiery = (val) => {
    const payload = {
      propertyId: propertyId,
      name: val?.name,
      mobile: formatPhoneNumber(val && val?.mobile),
      email: sessionClient && sessionClient?.user?.email,
      description: val?.description,
      IsInterestedForSiteVisit: val?.IsInterestedForSiteVisit,
      InquiryFrom: 'request a quote',
      UsetType: val?.UsetType,
      ReasonForBuy: val?.ReasonForBuy,
      Property_Project: Property_Project,
    };

    mutatePropertyInquiry(payload);
  };

  return (
    <>
      <form onSubmit={inquiryForm.onSubmit(handleSubmitInqiery)} id="property-inquiry-form" className="scroll-offset">
        {/* <div className={styles.send_enquiry_section}> */}
        <Stack gap={16}>
          <Group justify="space-between">
            <HeadingSix fontWeight={500}>Send enquiry to {propertyUser ? propertyUser : 'Owner'}</HeadingSix>
            {ownerName ? (
              <Tooltip label={`Owner : ${ownerName}`}>
                <Avatar key={'name'} name={ownerName} color="initials" radius="sm" />
              </Tooltip>
            ) : (
              ''
            )}
          </Group>
          <Divider />
          <Stack gap={8}>
            <RegularFont fontWeight={500}>Please shar your contact detail.</RegularFont>
            <Group>
              <SmallFont color={grey_font_color}>I am :</SmallFont>
              {/* //1	User,2	Agent,3	Builder */}
              <Radio.Group name="UsetType" key={inquiryForm.key('UsetType')} {...inquiryForm.getInputProps('UsetType')}>
                <Group>
                  <FormRadio value="1" label="Individual" />
                  <FormRadio value="2" label="Dealer" />
                </Group>
              </Radio.Group>
            </Group>
            <Group>
              <SmallFont color={grey_font_color}>Reason to buy</SmallFont>
              <Radio.Group
                name="ReasonForBuy"
                key={inquiryForm.key('ReasonForBuy')}
                {...inquiryForm.getInputProps('ReasonForBuy')}
              >
                <Group>
                  <FormRadio value="Investment" label="Investment" />
                  <FormRadio value="Self Use" label="Self Use" />
                </Group>
              </Radio.Group>
            </Group>

            <Stack gap={4}>
              <RegularFont fontWeight={500}>Name</RegularFont>
              <FormTextInput
                // errorAbsolute
                placeholder="Enter your name"
                key={inquiryForm.key('name')}
                other={{ ...inquiryForm.getInputProps('name') }}
              />
            </Stack>
            <Stack gap={4}>
              <RegularFont fontWeight={500}>Phone Number</RegularFont>
              <FormPhoneInput
                // errorAbsolute
                key={inquiryForm.key('mobile')}
                other={{ ...inquiryForm.getInputProps('mobile') }}
                placeholder="Add phone number"
              />
            </Stack>
            <Stack gap={4}>
              <RegularFont fontWeight={500}>Message</RegularFont>
              <FormTextArea
                // errorAbsolute
                placeholder="Write your message here..."
                key={inquiryForm.key('description')}
                other={{ ...inquiryForm.getInputProps('description') }}
              />
            </Stack>
          </Stack>
          <FormCheckBox
            errorAbsolute
            label="I agree to be contacted by Easyprops and other agent via Whatsapp, SMS, Phone, email etc"
            other={{ ...inquiryForm.getInputProps('contacted_by_us') }}
            key={inquiryForm.key('contacted_by_us')}
          />
          <FormCheckBox
            label="I am interested in Site Visits."
            errorAbsolute
            key={inquiryForm.key('IsInterestedForSiteVisit')}
            other={{ ...inquiryForm.getInputProps('IsInterestedForSiteVisit') }}
          />

          <FormCheckBox
            label={
              <p>
                By clicking below you agree to{' '}
                {
                  <Link href={'#'}>
                    <Text span inherit td={'underline'}>
                      Terms & Conditions
                    </Text>
                  </Link>
                }{' '}
                and{' '}
                {
                  <Link href={'#'}>
                    <Text span inherit td={'underline'}>
                      Privacy Policy
                    </Text>
                  </Link>
                }
              </p>
            }
            key={inquiryForm.key('tandc_and_policy')}
            other={{ ...inquiryForm.getInputProps('tandc_and_policy', { type: 'checkbox' }) }}
          />

          <CustomePrimaryButton
            fullWidth={'true'}
            onClick={() => {
              // if (sessionClient !== null && sessionClient !== undefined) {
              inquiryForm.onSubmit();
              // } else {
              //   authModalOpen();
              // }
            }}
          >
            {isPendingInquiery ? 'Loading...' : 'Send'}
          </CustomePrimaryButton>
        </Stack>
        {/* </div> */}
      </form>

      <AuthModal opened={opened} close={authModalClose} />
    </>
  );
}

export default PropertyInquiryForm;
