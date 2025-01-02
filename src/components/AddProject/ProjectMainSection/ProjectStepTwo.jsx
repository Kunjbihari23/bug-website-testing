import { FormNumberInput, FormSelect, FormTextInput } from '@/components/CustomComponents/CustomInputs/CustomInput';
import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { useMultipleSubCategoryList } from '@/state/addProperty/addProperty.hook';
import { useCitylistApi } from '@/state/cityList/cityList.hook';
import { useSubLocalityList } from '@/state/localityList/localityList.hook';
import { Box, NumberInput, Stack } from '@mantine/core';
import React, { useEffect, useMemo } from 'react';

const ProjectStepTwo = ({ form, startForm }) => {
  const propertyCategoryIDs = startForm.getValues().PropertyCategories;
  const propertySubCategoryIDs = startForm.getValues().PropertySubCategories;

  const { data: cityData, isLoading: cityLoading } = useCitylistApi();
  const { data: localityData, isLoading: localityLoading } = useSubLocalityList(form.getValues().CityID);

  console.log('startForm.getValues()------', startForm.getValues());

  const formatedCityData = useMemo(() => {
    if (cityData && cityData.list.length > 0) {
      return cityData.list.map((item) => ({
        label: item.cityName,
        value: item.cityId.toString(),
      }));
    }
    return [];
  }, [cityData]);

  const formatedLocalityData = useMemo(() => {
    if (localityData && localityData.length > 0) {
      return localityData.map((item) => ({
        label: item.localityName,
        value: item.id.toString(),
      }));
    }
    return [];
  }, [localityData]);

  useEffect(() => {
    if (localityData && form && form.getValues().LocalityID) {
      const selectedLocality = localityData.find((item) => item.id.toString() == form.getValues().LocalityID);
      form.setValues({ LandMark: selectedLocality.localityName });
    }
  }, [form.getValues().LocalityID]);

  return (
    <Box>
      <Stack gap={40}>
        <HeadingSix fontWeight={500}>Add location details of your Project</HeadingSix>
        <Stack gap={16}>
          {!cityLoading ? (
            <FormSelect
              other={{ ...form.getInputProps('CityID') }}
              width={320}
              label="City"
              placeholder="Select City"
              data={formatedCityData}
            />
          ) : (
            ''
          )}
          <FormSelect
            other={{ ...form.getInputProps('LocalityID') }}
            width={320}
            label="Locality"
            placeholder="Select Locality"
            data={formatedLocalityData}
          />
          <FormTextInput
            other={{ ...form.getInputProps('AppartmentSociety') }}
            label="Building / Appartment / Society Name"
            placeholder="Enter Building Name..."
            width={320}
          />
          {!propertyCategoryIDs.includes(2) ||
          (propertyCategoryIDs.length == 1 &&
            propertyCategoryIDs[0] === 2 &&
            propertySubCategoryIDs.length == 1 &&
            propertySubCategoryIDs[0] === 9) ? (
            ''
          ) : (
            <Stack gap={4}>
              <RegularFont fontWeight={500}>Number of Tower</RegularFont>
              <FormNumberInput
                placeholder={'No of towers'}
                hideControls={true}
                clampBehavior="strict"
                min={0}
                width={320}
                key={form.key('NoOfTower')}
                other={{ ...form.getInputProps('NoOfTower') }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectStepTwo;
