import ItemPropertyButton from '@/components/CustomComponents/CustomButtons/ItemPropertyButton';
import { CustomFormChip, FormNumberInput, FormSwitch } from '@/components/CustomComponents/CustomInputs/CustomInput';
import { FormRadio, FormTextInput } from '@/components/CustomComponents/CustomInputs/CustomInput';
import {
  ErrorText,
  HeadingSix,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import {
  useMultipleSubCategoryList,
  usePropertyCategoryList,
  useSubPropertyCategoryList,
} from '@/state/addProperty/addProperty.hook';
import { Box, Chip, Group, Radio, Skeleton, Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const ProjectStepOne = ({ form, startForm, formItemShow }) => {
  const propertyCategoryID = startForm.getValues().PropertyCategories;
  const propertySubCategoryID = startForm.getValues().PropertySubCategories;
  const { data: categoryData, isPending: categoryPending } = usePropertyCategoryList();
  const { data: subCategoryData, isPending: subCategoryPending } = useMultipleSubCategoryList(propertyCategoryID);

  const handleType = (value) => {
    let typeArr = [];
    if (propertyCategoryID && propertyCategoryID.includes(value)) {
      typeArr = propertyCategoryID.filter((data) => data !== value);
    } else {
      typeArr = [...propertyCategoryID, value];
    }
    startForm.setValues({ PropertyCategories: typeArr });
  };

  const handleSubCategory = (value) => {
    let subCategoryArr = [];
    if (propertySubCategoryID && propertySubCategoryID.includes(value)) {
      subCategoryArr = propertySubCategoryID.filter((data) => data !== value);
    } else {
      subCategoryArr = [...propertySubCategoryID, value];
    }

    startForm.setValues({ PropertySubCategories: subCategoryArr });
  };

  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>Add basic details of your Project</HeadingSix>

        {form.getValues().ProjectId !== 0 ? (
          <Group gap={24}>
            <RegularBigFont fontWeight={400}>Property Sell Status</RegularBigFont>
            <FormSwitch onChange={(event) => form.setValues({ IsSoldOut: event.currentTarget.checked })} />
          </Group>
        ) : (
          ''
        )}

        <Stack gap={24}>
          <RegularBigFont fontWeight={400}>Project Type</RegularBigFont>
          <Stack gap={4}>
            <Group>
              {categoryData &&
                categoryData.map((item, index) => {
                  return (
                    <ItemPropertyButton
                      isActive={
                        propertyCategoryID && propertyCategoryID.find((data, i) => data == item?.propertyCategoryID)
                          ? true
                          : false
                      }
                      key={item?.propertyCategoryID}
                      onClick={() => handleType(item?.propertyCategoryID)}
                    >
                      {item?.propertyCategoryName}
                    </ItemPropertyButton>
                  );
                })}
            </Group>
            {startForm.errors.PropertyCategories && <ErrorText>{startForm.errors.PropertyCategories}</ErrorText>}
          </Stack>
        </Stack>
        {propertyCategoryID && propertyCategoryID.length !== 0 ? (
          <Stack gap={8}>
            <RegularBigFont fontWeight={400}>Project Sub Category</RegularBigFont>
            {subCategoryPending ? (
              <>
                <Group>
                  <Skeleton w={100} h={30} />
                  <Skeleton w={100} h={30} />
                  <Skeleton w={100} h={30} />
                  <Skeleton w={100} h={30} />
                </Group>{' '}
              </>
            ) : (
              <Stack gap={4}>
                <Group>
                  {subCategoryData &&
                    subCategoryData.map((item, index) => {
                      return (
                        <ItemPropertyButton
                          isActive={
                            propertySubCategoryID &&
                            propertySubCategoryID.find((data, i) => data == item?.propertySubCategoryID)
                              ? true
                              : false
                          }
                          key={item?.propertySubCategoryID}
                          onClick={() => handleSubCategory(item?.propertySubCategoryID)}
                        >
                          {item?.propertySubCategoryName}
                        </ItemPropertyButton>
                      );
                    })}
                </Group>
                {startForm.errors.PropertySubCategories && (
                  <ErrorText>{startForm.errors.PropertySubCategories}</ErrorText>
                )}
              </Stack>
            )}
          </Stack>
        ) : (
          ''
        )}
        <Stack gap={8}>
          <RegularBigFont fontWeight={400}>Project Tilte</RegularBigFont>
          <FormTextInput placeholder="Add project title" other={{ ...form.getInputProps('Title') }} />
        </Stack>
        <Stack gap={8}>
          <RegularBigFont fontWeight={400}>Rera Number</RegularBigFont>
          <FormNumberInput
            hideControls={true}
            placeholder="Add rera registration number"
            other={{ ...form.getInputProps('ReraNumber') }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectStepOne;
