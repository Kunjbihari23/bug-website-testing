import { HeadingSix, RegularFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { ActionIcon, Box, Group, Radio, rem, Stack, Text } from '@mantine/core';
import React from 'react';
import style from './ProjectMainSection.module.css';
import {
  FormNumberInput,
  FormPhoneInput,
  FormRadio,
  FormTextInput,
} from '@/components/CustomComponents/CustomInputs/CustomInput';

const UserType = [];
const ProjectStepSix = ({ form }) => {
  return (
    <Box>
      <Stack gap={40}>
        <HeadingSix fontWeight={500}>Add contact details of your Project</HeadingSix>
        <Stack gap={16}>
          <Stack gap={4}>
            <RegularFont fontWeight={500}>User Name</RegularFont>
            <FormTextInput
              other={{ ...form.getInputProps('AppartmentSociety') }}
              placeholder="Enter User Name..."
              width={320}
            />
          </Stack>
          <Stack gap={4}>
            <RegularFont fontWeight={500}>User Number</RegularFont>

            <FormPhoneInput
              errorAbsolute
              onKeyDown={(e) => {
                form.setValues('PhoneNumber', e.target.value);
              }}
              other={{ ...form.getInputProps('PhoneNumber') }}
              placeholder="+91"
            />
          </Stack>
          <Stack gap={4}>
            <RegularFont fontWeight={500}>User Type</RegularFont>
            <Stack gap={8}>
              <Radio.Group {...form.getInputProps('userType')}>
                <Group>
                  <FormRadio value="1" label="User"></FormRadio>
                  <FormRadio value="2" label="Agent"></FormRadio>
                  <FormRadio value="3" label="Builder"></FormRadio>
                </Group>
              </Radio.Group>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectStepSix;
