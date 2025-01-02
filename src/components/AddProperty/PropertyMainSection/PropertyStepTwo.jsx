import { FormSelect, FormTextInput } from '@/components/CustomComponents/CustomInputs/CustomInput';
import { HeadingSix } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { useCitylistApi } from '@/state/cityList/cityList.hook';
import { useSubLocalityList } from '@/state/localityList/localityList.hook';
import { Box, Stack } from '@mantine/core';
import { useMemo, useState } from 'react';

const PropertyStepTwo = ({ form, formItemShow, isEdit = false }) => {
  const { data: cityData, isLoading: cityLoading } = useCitylistApi();
  const { data: localityData, isLoading: localityLoading } = useSubLocalityList(form.getValues().CityID);
  const [showErrMsg, setShowErrMsg] = useState(false);

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
      setShowErrMsg(false);
      return localityData.map((item) => ({
        label: item.localityName,
        value: item.id.toString(),
      }));
    } else {
      if (form.getInputProps('CityID').value) {
        setShowErrMsg(true);
      }
    }
    return [];
  }, [localityData]);

  return (
    <Box>
      <Stack gap={40}>
        <HeadingSix fontWeight={500}>{isEdit ? 'Edit' : 'Add'} basic details of your Property</HeadingSix>
        <Stack gap={16}>
          {!cityLoading ? (
            <FormSelect
              other={{ ...form.getInputProps('CityID', { type: 'select' }) }}
              width={300}
              label={
                <span>
                  City <span style={{ color: 'red' }}>*</span>
                </span>
              }
              placeholder="Enter City..."
              data={formatedCityData}
            />
          ) : (
            ''
          )}

          <FormSelect
            other={{ ...form.getInputProps('LocalityID') }}
            width={300}
            label={
              <>
                <span>
                  Locality <span style={{ color: 'red' }}>*</span>
                </span>
                {showErrMsg && <p style={{ color: '#fa5252', fontSize: 'small' }}>No localities. Try another city.</p>}
              </>
            }
            placeholder="Enter Locality..."
            data={formatedLocalityData}
          />
          {formItemShow?.isBuildingName ? (
            <FormTextInput
              other={{ ...form.getInputProps('address') }}
              label={
                <span>
                  Building Name <span style={{ color: 'red' }}>*</span>
                </span>
              }
              placeholder="Enter Building Name..."
              width={300}
            />
          ) : (
            ''
          )}
          {formItemShow?.isHouseNo ? (
            <FormTextInput
              label={
                <span>
                  House / Block No <span style={{ color: 'red' }}>*</span>
                </span>
              }
              placeholder="House / Block No..."
              width={300}
              other={{ ...form.getInputProps('HouseNo') }}
            />
          ) : (
            ''
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PropertyStepTwo;
