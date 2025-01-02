import ItemPropertyButton from '@/components/CustomComponents/CustomButtons/ItemPropertyButton';
import { CustomFormChip } from '@/components/CustomComponents/CustomInputs/CustomInput';
import { FormSelect, FormTextArea } from '@/components/CustomComponents/CustomInputs/CustomInput';
import { RegularFont, SmallFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { useMultipleSubCategoryList } from '@/state/addProperty/addProperty.hook';
import { useAmenityListMaster, useSubCategoryAmenityList } from '@/state/amenityMaster/amenityMaster.hook';
import useAddProjectStore from '@/store/useAddProjectStore';
import { Chip, Group, Stack } from '@mantine/core';
import { Hammersmith_One } from 'next/font/google';
import React, { useEffect } from 'react';

const projectStatus = [
  {
    label: 'Non-Active',
    value: 'no',
  },
  {
    label: 'Active',
    value: 'yes',
  },
];

const ProjectStepThreeTwo = ({ form, startForm }) => {
  const propertySubCategoryID = startForm.getValues().PropertySubCategories;
  const AmenitiesIDs = form.getValues().Amenities;
  const { data: amenityList } = useSubCategoryAmenityList(propertySubCategoryID);
  //get subcategory for property category "Residential" id '2'
  const { data: subCategoryData } = useMultipleSubCategoryList(['2']);
  const setResidentialSubCategory = useAddProjectStore((state) => state.setResidentialSubCategory);

  useEffect(() => {
    setResidentialSubCategory(subCategoryData);
  }, [subCategoryData]);

  const isAmenitisShow =
    subCategoryData &&
    subCategoryData.some((subcategory) => propertySubCategoryID.includes(subcategory.propertySubCategoryID));

  const handleChangeAmenitites = (value) => {
    let amenityIdArr = [];
    if (AmenitiesIDs && AmenitiesIDs.includes(value)) {
      amenityIdArr = AmenitiesIDs.filter((data) => data !== value);
    } else {
      amenityIdArr = [...AmenitiesIDs, value];
    }
    form.setValues({ Amenities: amenityIdArr });
  };

  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <RegularFont fontWeight={500}>Project Status</RegularFont>
        <Group gap={8}>
          <FormSelect
            other={{ ...form.getInputProps('IsActive') }}
            width={320}
            placeholder="Select project status..."
            data={projectStatus}
          />
        </Group>
      </Stack>
      {/* amenities are only for residental property type category */}
      {isAmenitisShow ? (
        <Stack gap={8}>
          <RegularFont fontWeight={500}>Amenities</RegularFont>
          <Group>
            {amenityList &&
              amenityList.map((item, index) => {
                return (
                  <ItemPropertyButton
                    isActive={AmenitiesIDs && AmenitiesIDs.find((data, i) => data == item?.amenitiesID) ? true : false}
                    key={item?.amenitiesID}
                    onClick={() => handleChangeAmenitites(item?.amenitiesID)}
                  >
                    {item?.amenitiesName}
                  </ItemPropertyButton>
                );
              })}
          </Group>
        </Stack>
      ) : (
        ''
      )}{' '}
      <Stack gap={8}>
        <RegularFont fontWeight={500}>Project descriptions</RegularFont>
        <Group gap={8}>
          <FormTextArea
            placeholder="Write your project unique features"
            other={{ ...form.getInputProps('Description') }}
          />
        </Group>
      </Stack>
    </Stack>
  );
};

export default ProjectStepThreeTwo;
