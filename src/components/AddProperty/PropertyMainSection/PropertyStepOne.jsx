import ItemPropertyButton from '@/components/CustomComponents/CustomButtons/ItemPropertyButton';
import { FormCheckBox, FormRadio } from '@/components/CustomComponents/CustomInputs/CustomInput';
import {
  ErrorText,
  HeadingSix,
  RegularBigFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { usePropertyCategoryList, useSubPropertyCategoryList } from '@/state/addProperty/addProperty.hook';
import { Box, Group, Radio, Stack } from '@mantine/core';

const PropertyStepOne = ({ form, startForm, formItemShow, propertyTypeChanged = () => {}, isEdit = false }) => {
  const baseTagsArray = [
    {
      label: 'Sell',
      value: 1,
    },
    {
      label: 'Rent / Lease',
      value: 2,
    },
  ];

  // Conditionally add the last element based on formItem.isPg
  const tagsArray = formItemShow.isPg ? [...baseTagsArray, { label: 'PG / Co-living', value: 3 }] : baseTagsArray;

  const agriTypeArray = [
    {
      label: 'Non Agriculture',
      value: 1,
    },
    {
      label: 'Agriculture',
      value: 2,
    },
  ];

  const agriSubTypeArray = [
    {
      label: 'Navi sarat',
      value: 1,
    },
    {
      label: 'Juni sarat',
      value: 2,
    },
    {
      label: 'Navi sarat/Juni sarat',
      value: 3,
    },
  ];

  const { data: categoryData } = usePropertyCategoryList();
  const { data: subCategoryData } = useSubPropertyCategoryList(startForm.getValues().PropertyCategoryID);

  const handleClick = (value) => {
    propertyTypeChanged(true);
    startForm.setValues({ PropertyCategoryID: value });
  };

  const handleClickType = (value) => {
    propertyTypeChanged(false);
    startForm.setValues({ PropertySubCategoryID: value });
  };

  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>{isEdit ? 'Edit' : 'Add'} basic details of your Property</HeadingSix>
        <Stack gap={24}>
          {isEdit ? (
            <>
              <RegularBigFont fontWeight={400}>Status</RegularBigFont>
              <FormCheckBox
                label="Sold Out/ Rent Out"
                other={{ ...form.getInputProps('IsSoldOrRentOut', { type: 'checkbox' }) }}
              />
            </>
          ) : (
            <></>
          )}
          <RegularBigFont fontWeight={400}>
            Property Type <span style={{ color: 'red' }}>*</span>
          </RegularBigFont>
          <Stack gap={0}>
            <Group>
              {categoryData &&
                categoryData?.map(({ propertyCategoryName: label, propertyCategoryID: value }, index) => {
                  return (
                    <ItemPropertyButton
                      isActive={startForm?.getValues().PropertyCategoryID === value}
                      key={index}
                      onClick={() => handleClick(value)}
                    >
                      {label}
                    </ItemPropertyButton>
                  );
                })}
            </Group>
            {startForm.errors.PropertyCategoryID && <ErrorText>{startForm.errors.PropertyCategoryID}</ErrorText>}
          </Stack>
        </Stack>
        {startForm.getValues().PropertyCategoryID !== '' ? (
          <Stack gap={8}>
            <RegularBigFont fontWeight={400}>
              Property Sub Category <span style={{ color: 'red' }}>*</span>
            </RegularBigFont>
            <Stack gap={0}>
              <Group mt={8}>
                {subCategoryData &&
                  subCategoryData.map(({ propertySubCategoryName: label, propertySubCategoryID: value }, index) => {
                    return (
                      <ItemPropertyButton
                        isActive={startForm?.getValues().PropertySubCategoryID === value}
                        key={index}
                        onClick={() => handleClickType(value)}
                      >
                        {label}
                      </ItemPropertyButton>
                    );
                  })}
              </Group>
              {startForm.errors.PropertySubCategoryID && (
                <ErrorText>{startForm.errors.PropertySubCategoryID}</ErrorText>
              )}
            </Stack>
          </Stack>
        ) : (
          ''
        )}
        {startForm.getValues().PropertySubCategoryID !== '' ? (
          <Stack gap={8}>
            <RegularBigFont fontWeight={400}>
              Property For <span style={{ color: 'red' }}>*</span>
            </RegularBigFont>
            <Radio.Group {...form.getInputProps('RentOrSell')}>
              <Group>
                {tagsArray &&
                  tagsArray?.map((item, index) => (
                    <FormRadio key={index} value={item?.value.toString()} label={item?.label} />
                  ))}
              </Group>
            </Radio.Group>
          </Stack>
        ) : (
          ''
        )}
        {/* {startForm.getValues().PropertySubCategoryID !== '' ? ( */}
        {formItemShow?.isAgriType ? (
          <Stack gap={8}>
            <RegularBigFont fontWeight={400}>
              Agri Type <span style={{ color: 'red' }}>*</span>
            </RegularBigFont>
            <Radio.Group {...form.getInputProps('SubType')}>
              <Group>
                {agriTypeArray &&
                  agriTypeArray?.map((item, index) => (
                    <FormRadio key={index} value={item?.value.toString()} label={item?.label} />
                  ))}
              </Group>
            </Radio.Group>
          </Stack>
        ) : (
          ''
        )}
        {/* ) : (
          ''
        )} */}

        {/* {startForm.getValues().PropertySubCategoryID !== '' ? ( */}
        {formItemShow?.isSubTypeAgri ? (
          <Stack gap={8}>
            <RegularBigFont fontWeight={400}>
              Sub Agri Type <span style={{ color: 'red' }}>*</span>
            </RegularBigFont>
            <Radio.Group {...form.getInputProps('SubTypeNonAgri')}>
              <Group>
                {agriSubTypeArray &&
                  agriSubTypeArray?.map((item, index) => (
                    <FormRadio key={index} value={item?.value.toString()} label={item?.label} />
                  ))}
              </Group>
            </Radio.Group>
          </Stack>
        ) : (
          ''
        )}
        {/* ) : (
          ''
        )} */}
      </Stack>
    </Box>
  );
};

export default PropertyStepOne;
