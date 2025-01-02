import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import {
  FormCheckBox,
  FormCheckBoxWithCheckInput,
  FormSelect,
  FormTextArea,
  FormTextInput,
} from '@/components/CustomComponents/CustomInputs/CustomInput';
import AddUnitForm from '@/components/CustomComponents/FormContainer/AddUnitForm';
import HeaderLessModal from '@/components/CustomComponents/HeaderLessModal/HeaderLessModal';
import { HeadingSix, RegularFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import {
  grey_font_color,
  heading_font_color,
  info_blue_color,
  secondary_dark,
  white_color,
} from '@/constant/FontColotConstant';
import useAddProjectStore from '@/store/useAddProjectStore';
import { Box, Button, Card, Divider, Group, Stack, Table, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import style from './ProjectMainSection.module.css';
import { formatCurrency } from '@/util/commonFunction';

const unitSize = [
  { value: 1, label: '/Sq.ft' },
  { value: 2, label: '/Sq.yards' },
  { value: 3, label: '/Sq.m.' },
];

const ProjectStepFour = ({ form, startForm }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { unitDetailArr } = useAddProjectStore();
  const setUnitDetailsArr = useAddProjectStore((state) => state.setUnitDetailsArr);
  const [unitIndex, setUnitIndex] = useState('');

  useEffect(() => {
    form.setValues({ UnitDetails: unitDetailArr });
  }, [unitDetailArr]);

  const handleDeleteUnit = (val) => {
    const filterArr = unitDetailArr.filter((item, inx) => inx !== val);
    setUnitDetailsArr(filterArr);
  };

  const handleChangePriceInclude = (event) => {
    if (event.target.checked) {
      form.setValues({ TaxPrice: false });
    }
  };

  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>Add pricing details of your Project</HeadingSix>
        <Stack gap={16}>
          <Group gap={40}>
            <RegularFont color="#51565A" fontWeight={400}>
              Add Unit detail
            </RegularFont>
            <Button
              color={secondary_dark}
              size="sm"
              variant="light"
              leftSection={<IconPlus size={18} />}
              onClick={() => {
                open();
                setUnitIndex('');
              }}
            >
              <RegularFont color={secondary_dark} fontWeight={500}>
                Add
              </RegularFont>
            </Button>
          </Group>

          {unitDetailArr && unitDetailArr.length !== 0 ? (
            <>
              <Table striped highlightOnHover withTableBorder verticalSpacing="md" my={20}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Unit Type</Table.Th>
                    <Table.Th>Unit Size</Table.Th>
                    <Table.Th>No. of Unit</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {unitDetailArr.map((val, index) => {
                    const areaSize = unitSize.find((data) => data.value == val?.UnitAreaId);
                    return (
                      <Table.Tr key={`unit_detail_${index}`}>
                        <Table.Td>{val?.Unit ? val?.Unit : '-'}</Table.Td>
                        <Table.Td>{areaSize?.label ? `${val?.UnitArea}${areaSize?.label}` : '-'}</Table.Td>
                        <Table.Td>{val?.Number_Unit ? val?.Number_Unit : '-'}</Table.Td>
                        <Table.Td>{val?.Price ? formatCurrency(val?.Price) : '-'}</Table.Td>
                        <Table.Td>
                          <Group>
                            <UnstyledButton
                              onClick={() => {
                                setUnitIndex(index);
                                open();
                              }}
                            >
                              <IconEdit size={18} />
                            </UnstyledButton>
                            <UnstyledButton
                              onClick={() => {
                                handleDeleteUnit(index);
                              }}
                            >
                              <IconTrash size={18} />
                            </UnstyledButton>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </>
          ) : (
            ''
          )}

          <Group gap={8}>
            <FormCheckBoxWithCheckInput
              onChange={handleChangePriceInclude}
              checked={!form.getValues().TaxPrice}
              label="All inclusive price"
            />
            <FormCheckBox
              label="Price negotiable"
              other={{ ...form.getInputProps('IsNegotiable', { type: 'checkbox' }) }}
            />
            <FormCheckBoxWithCheckInput
              label="Tax and govt. charges excluded"
              checked={form.getValues().TaxPrice}
              other={{ ...form.getInputProps('TaxPrice') }}
            />
          </Group>
        </Stack>
      </Stack>
      <HeaderLessModal opened={opened} close={close} centered={false} size="md">
        <AddUnitForm
          close={close}
          unitIndex={unitIndex}
          setUnitIndex={setUnitIndex}
          opened={opened}
          startForm={startForm}
        />
      </HeaderLessModal>
    </Box>
  );
};

export default ProjectStepFour;
