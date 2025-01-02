import {
  ActionIcon,
  Button,
  Divider,
  FileButton,
  Grid,
  Group,
  NativeSelect,
  Stack,
  Text,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { ExtraSmallFont, HeadingSix, RegularFont, SmallFont } from '../TypographyComponent/HeadingComponents';
import styles from './forms.module.css';
import { useForm } from '@mantine/form';
import CustomePrimaryButton from '../CustomButtons/CustomButtons';
import {
  grey_font_color,
  heading_font_color,
  info_blue_color,
  primary_color,
  primary_green,
  secondary_dark,
} from '@/constant/FontColotConstant';
import { FormCheckBox, FormNumberInput, FormRadio, FormTextInput } from '../CustomInputs/CustomInput';
import { IconPlus, IconTrash, IconUpload } from '@tabler/icons-react';
import useAddProjectStore from '@/store/useAddProjectStore';
import Image from 'next/image';

const unitSize = [
  { value: 1, label: '/Sq.ft' },
  { value: 2, label: '/Sq.yards' },
  { value: 3, label: '/Sq.m.' },
];

function AddUnitForm({ unitIndex, setUnitIndex, close, opened, startForm }) {
  const [file, setFile] = useState(null);
  const resetRef = useRef(null);
  const [areaSizeId, setAreaSizeId] = useState(1);
  const setUnitDetailsArr = useAddProjectStore((state) => state.setUnitDetailsArr);
  const { unitDetailArr, residentialSubCategory } = useAddProjectStore();
  const propertySubCategoryIDs = startForm.getValues().PropertySubCategories;

  // check if selected property sub categories include recidential sub categories (hide for recidential plot)
  const isFormFiledVisible =
    residentialSubCategory &&
    residentialSubCategory
      .filter((val) => val?.propertySubCategoryID !== 9)
      .some((subcategory) => propertySubCategoryIDs.includes(subcategory.propertySubCategoryID));

  const unitForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      Notes: '',
      Unit: '',
      UnitArea: '',
      UnitAreaId: 1,
      Number_Unit: '',
      Layout: '',
      Price: '',
      AreaDetail: '',
    },
    validate: {},
  });

  useEffect(() => {
    if (unitIndex !== '') {
      const findUnit = unitDetailArr.find((data, inx) => inx === unitIndex);
      unitForm.setValues({
        Notes: findUnit && findUnit?.Notes,
        Unit: findUnit && findUnit?.Unit,
        UnitArea: findUnit && findUnit?.UnitArea,
        UnitAreaId: findUnit && findUnit?.UnitAreaId,
        Number_Unit: findUnit && findUnit?.Number_Unit,
        Layout: findUnit && findUnit?.Layout,
        Price: findUnit && findUnit?.Price,
        AreaDetail: findUnit && findUnit?.UnitArea,
      });

      setFile(findUnit && findUnit?.Layout);
      setAreaSizeId(findUnit?.UnitAreaId);
    } else {
      setFile(null);
      setAreaSizeId('');
      if (resetRef && resetRef.current && resetRef.current.value !== null) {
        resetRef.current?.();
      }
      unitForm.reset();
    }
  }, [unitIndex]);

  const clearFile = () => {
    setFile(null);
    if (resetRef && resetRef.current && resetRef.current.value !== null) {
      resetRef.current?.();
    }
  };

  const handleSubmitUnitInfo = (val) => {
    const payload = {
      Notes: val?.Notes,
      Unit: val?.Unit,
      UnitArea: val?.UnitArea,
      UnitAreaId: areaSizeId,
      Number_Unit: val?.Number_Unit,
      Price: val?.Price,
      AreaDetail: val?.UnitArea,
      OldFileName: '',
    };
    if (file) {
      payload.Layout = file;
      payload.fileName = file.name;
    } else {
      payload.Layout = '';
      payload.fileName = '';
    }
    setTimeout(() => {
      if (unitIndex !== '') {
        unitDetailArr[unitIndex] = payload;
        setUnitDetailsArr([...unitDetailArr]);
      } else {
        setUnitDetailsArr([...unitDetailArr, payload]);
      }
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setFile(null);
    setAreaSizeId('');
    if (resetRef && resetRef.current && resetRef.current.value !== null) {
      resetRef.current?.();
    }
    unitForm.reset();
    close();
  };

  const select = (
    <NativeSelect
      data={unitSize}
      rightSectionWidth={28}
      onChange={(e) => setAreaSizeId(e.target.value)}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: rem(120),
          height: 51,
          marginRight: rem(-4),
        },
      }}
    />
  );

  return (
    <>
      <form onSubmit={unitForm.onSubmit(handleSubmitUnitInfo)} id="unit-form">
        <Stack gap={16}>
          <Group justify="space-between">
            <HeadingSix fontWeight={500}>Unit Details</HeadingSix>
          </Group>
          <Divider />
          {isFormFiledVisible ? (
            <Stack gap={8}>
              <RegularFont fontWeight={500}>Unit Type</RegularFont>
              <FormTextInput
                placeholder="Enter Unit Type"
                key={unitForm.key('Unit')}
                other={{ ...unitForm.getInputProps('Unit') }}
              />
            </Stack>
          ) : (
            ''
          )}

          <Stack gap={8}>
            <RegularFont fontWeight={500}>Unit Size</RegularFont>
            <FormNumberInput
              type="number"
              placeholder="Enter Unit Size"
              rightIcon={select}
              rightSectionWidth={120}
              key={unitForm.key('UnitArea')}
              other={{ ...unitForm.getInputProps('UnitArea') }}
            />
          </Stack>

          {isFormFiledVisible ? (
            <>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>Price</RegularFont>
                <FormNumberInput
                  placeholder="Enter Price"
                  thousandSeparator=","
                  key={unitForm.key('Price')}
                  other={{ ...unitForm.getInputProps('Price') }}
                />
              </Stack>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>No. of Units</RegularFont>
                <FormNumberInput
                  hideControls={true}
                  placeholder="Enter No. of Units"
                  key={unitForm.key('Number_Unit')}
                  other={{ ...unitForm.getInputProps('Number_Unit') }}
                />
              </Stack>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>Note</RegularFont>
                <Textarea
                  placeholder="Write Note Here..."
                  key={unitForm.key('Notes')}
                  {...unitForm.getInputProps('Notes')}
                />
              </Stack>
              <Stack gap={4}>
                <RegularFont fontWeight={500}>Layout Plan</RegularFont>
                <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
                  {(props) => (
                    <Button
                      {...props}
                      color={secondary_dark}
                      size="md"
                      variant="outline"
                      w={200}
                      leftSection={<IconUpload size={18} />}
                    >
                      <RegularFont fontWeight={500} color={secondary_dark}>
                        Upload image
                      </RegularFont>
                    </Button>
                  )}
                </FileButton>
              </Stack>
              {file && (
                <>
                  <Image src={URL.createObjectURL(file)} width={120} height={120} alt={file.name} />
                  <Group>
                    <SmallFont color={grey_font_color} fontWeight={500}>
                      Picked file:{' '}
                      <Text span inherit c={info_blue_color}>
                        {file.name}{' '}
                      </Text>
                    </SmallFont>
                    <ActionIcon variant="light" disabled={!file} color="red" onClick={clearFile}>
                      <IconTrash size={18} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </>
              )}
            </>
          ) : (
            ''
          )}

          <Group justify="flex-end" mt={20}>
            <Button variant="light" h={42} color={heading_font_color} onClick={handleClose}>
              <RegularFont fontWeight={500}>Close</RegularFont>
            </Button>
            <CustomePrimaryButton size="small" onClick={unitForm.onSubmit}>
              Submit
            </CustomePrimaryButton>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default AddUnitForm;
