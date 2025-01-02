import ItemPropertyButton from '@/components/CustomComponents/CustomButtons/ItemPropertyButton';
import { FormDatePicker, FormSelect, FormTextInput } from '@/components/CustomComponents/CustomInputs/CustomInput';
import { ErrorText, RegularFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { areaUnit } from '@/util/commanUnits';
import { Group, Stack } from '@mantine/core';
import { valid } from 'joi';

const availabilityStatus = [
  {
    label: 'Ready to Move',
    value: '1',
  },
  {
    label: 'Under construction',
    value: '2',
  },
  {
    label: 'New Launch',
    value: '3',
  },
];

const projectAgeArr = [
  {
    label: '0-1 Years',
    value: '1',
  },
  {
    label: '1-5 Years',
    value: '2',
  },
  {
    label: '5-10 Years',
    value: '3',
  },
  {
    label: '10+ Years',
    value: '4',
  },
];

const ProjectStepThreeOne = ({ form }) => {
  const handleChangeAvailability = (value) => {
    form.setValues({ Avaibility: value });
  };

  const handleProjectAgeClick = (value) => {
    form.setValues({ AgeOfProject: value });
  };

  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <RegularFont fontWeight={500}>Availability status</RegularFont>
        <Stack gap={4}>
          <Group gap={8}>
            {availabilityStatus.map(({ label, value }, index) => {
              return (
                <ItemPropertyButton
                  isActive={form?.getValues().Avaibility === value}
                  key={index}
                  onClick={() => handleChangeAvailability(value)}
                >
                  {label}
                </ItemPropertyButton>
              );
            })}
          </Group>
          {form.errors.Avaibility && <ErrorText>{form.errors.Avaibility}</ErrorText>}
        </Stack>
        {form?.getValues().Avaibility && form?.getValues().Avaibility == '1' ? (
          ''
        ) : (
          <Group mt={16}>
            <FormDatePicker
              placeholder="Possession date"
              width={300}
              other={{ ...form.getInputProps('DateOfPossession') }}
            />
          </Group>
        )}
      </Stack>
      <Stack gap={16}>
        <RegularFont fontWeight={500}>Age of Project</RegularFont>
        <Stack gap={4}>
          <Group>
            {projectAgeArr.map(({ label, value }, index) => {
              return (
                <ItemPropertyButton
                  isActive={form?.getValues().AgeOfProject === value}
                  key={index}
                  onClick={() => handleProjectAgeClick(value)}
                >
                  {label}
                </ItemPropertyButton>
              );
            })}
          </Group>
          {form.errors.AgeOfProject && <ErrorText>{form.errors.AgeOfProject}</ErrorText>}
        </Stack>
      </Stack>
      {/* <Stack gap={16}>
        <RegularFont color="#51565A" fontWeight={400}>
          Add area detail
        </RegularFont>
        <Group gap={8}>
          <FormTextInput
            label="Carpet Area"
            placeholder="Carpet Area"
            width="170"
            other={{ ...form.getInputProps('Carpet') }}
          />
          <FormSelect
            data={areaUnit}
            placeholder="sq.ft"
            label="Unit"
            width="105"
            other={{ ...form.getInputProps('UnitAreaId') }}
          />
        </Group>
      </Stack> */}
    </Stack>
  );
};

export default ProjectStepThreeOne;
