import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { Accordion, Box, Group, Stack } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import style from './PropertyMainSection.module.css';
import PropertyStepThreeOne from './PropertyStepThreeItems/PropertyStepThreeOne';
import PropertyStepThreeTwo from './PropertyStepThreeItems/PropertyStepThreeTwo';
import { FormTextInput } from '@/components/CustomComponents/CustomInputs/CustomInput';

const PropertyStepThree = ({
  form,
  handleToggle,
  amenities,
  formItemShow,
  accordionValue = 'room',
  handleAccordianChange = () => {},
  isEdit = false,
}) => {
  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>{isEdit ? 'Edit' : 'Add'} basic details of your Property</HeadingSix>
        <FormTextInput
          other={{ ...form.getInputProps('Title') }}
          label={
            <span>
              Property Title <span style={{ color: 'red' }}>*</span>
            </span>
          }
          placeholder="Enter title..."
          width={300}
        />
        <Stack gap={24}>
          <Accordion
            classNames={{
              item: style.stepThreeAccordion,
            }}
            defaultValue="room"
            value={accordionValue}
            chevronSize={24}
            onChange={handleAccordianChange}
            chevron={<IconChevronDown size={24} />}
          >
            <Accordion.Item key={'room'} value={'room'}>
              <Accordion.Control>
                <RegularBigFont>1. Add Room Details</RegularBigFont>
              </Accordion.Control>
              <Accordion.Panel>
                <PropertyStepThreeOne form={form} formItemShow={formItemShow} />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key={'amenities'} value={'amenities'}>
              <Accordion.Control>
                <Group gap={8}>
                  <RegularBigFont>2. Add Amenities</RegularBigFont>{' '}
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <PropertyStepThreeTwo
                  form={form}
                  amenities={amenities}
                  handleToggle={handleToggle}
                  formItemShow={formItemShow}
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PropertyStepThree;
