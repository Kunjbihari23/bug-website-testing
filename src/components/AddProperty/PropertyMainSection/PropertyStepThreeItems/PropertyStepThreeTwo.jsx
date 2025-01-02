import ItemPropertyButton from '@/components/CustomComponents/CustomButtons/ItemPropertyButton';
import { FormMultiSelect, FormTextInput } from '@/components/CustomComponents/CustomInputs/CustomInput';
import { ErrorText, RegularFont, SmallFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { usePlaceNearBy } from '@/state/addProperty/addProperty.hook';
import { Group, MultiSelect, Stack } from '@mantine/core';
import { Hammersmith_One } from 'next/font/google';
import React from 'react';
import style from './PropertStepThree.module.css';

const PropertyStepThreeTwo = ({ form, handleToggle, amenities, formItemShow }) => {
  const otherFurnishingArray = [
    {
      label: 'Furnished',
      value: 1,
    },
    {
      label: 'Semi-Furnished',
      value: 2,
    },
    {
      label: 'Un-Furnished',
      value: 3,
    },
  ];

  const carParkingArray = [
    {
      label: '0',
      value: '0',
    },
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
  ];

  const { data: placeNeardata } = usePlaceNearBy(0);

  const sortedNearPlace =
    placeNeardata &&
    placeNeardata.map((item) => ({
      value: `${item.id}`,
      label: `${item.place_Name}`,
    }));

  const handleChangeFurnished = (value) => {
    form.setFieldValue('Furnished', value);
  };

  const handleChangeSecurity = (value) => {
    if (value === 0) {
      form.setFieldValue('SecurityFireAlarm', 1);
    } else {
      form.setFieldValue('SecurityFireAlarm', 0);
    }
  };

  const handleChangePuja = (value) => {
    if (value === 0) {
      form.setFieldValue('Pujaroom', 1);
    } else {
      form.setFieldValue('Pujaroom', 0);
    }
  };

  const handleChangePowerBackup = (value) => {
    if (value === 0) {
      form.setFieldValue('PowerBackup', 1);
    } else {
      form.setFieldValue('PowerBackup', 0);
    }
  };

  const handleChangeStudyRoom = (value) => {
    if (value === 0) {
      form.setFieldValue('StudyRoom', 1);
    } else {
      form.setFieldValue('StudyRoom', 0);
    }
  };

  const handleChangeServentRoom = (value) => {
    if (value === 0) {
      form.setFieldValue('ServentRoom', 1);
    } else {
      form.setFieldValue('ServentRoom', 0);
    }
  };

  const handleChangeStoreRoom = (value) => {
    if (value === 0) {
      form.setFieldValue('StoreRoom', 1);
    } else {
      form.setFieldValue('StoreRoom', 0);
    }
  };

  const handleChangeCarParking = (value) => {
    form.setFieldValue('CarParking', value);
  };

  const handleNearPlace = (val) => {
    // const stringValues = val.map((item) => String(item));
    form.setFieldValue('placenearby', val);
  };
  return (
    <Stack gap={24}>
      {formItemShow?.isOtherRoom ? (
        <Stack gap={8}>
          <Group gap={4}>
            <RegularFont color="#51565A" fontWeight={400}>
              No. of rooms
            </RegularFont>
            {/* <SmallFont color="#737373" fs="italic">
              {'(optional)'}
            </SmallFont> */}
          </Group>
          <Group>
            <ItemPropertyButton
              isActive={form?.getValues().Pujaroom === 1}
              onClick={() => handleChangePuja(form?.getValues().Pujaroom)}
            >
              Pooja Room
            </ItemPropertyButton>
            <ItemPropertyButton
              isActive={form?.getValues().StudyRoom === 1}
              onClick={() => handleChangeStudyRoom(form?.getValues().StudyRoom)}
            >
              Study Room
            </ItemPropertyButton>
            <ItemPropertyButton
              isActive={form?.getValues().ServentRoom === 1}
              onClick={() => handleChangeServentRoom(form?.getValues().ServentRoom)}
            >
              Servent Room
            </ItemPropertyButton>
            <ItemPropertyButton
              isActive={form?.getValues().StoreRoom === 1}
              onClick={() => handleChangeStoreRoom(form?.getValues().StoreRoom)}
            >
              Store Room
            </ItemPropertyButton>
          </Group>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isFurnish ? (
        <Stack gap={8}>
          <Group gap={4}>
            <RegularFont color="#51565A" fontWeight={400}>
              Furnishing
              {/* <span style={{ color: 'red' }}>*</span> */}
            </RegularFont>
          </Group>
          <Stack gap={0}>
            <Group>
              {otherFurnishingArray.map(({ label, value }, index) => {
                return (
                  <ItemPropertyButton
                    isActive={form?.getValues().Furnished === value}
                    key={index}
                    onClick={() => handleChangeFurnished(value)}
                  >
                    {label}
                  </ItemPropertyButton>
                );
              })}
            </Group>
            {form.errors.Furnished && <ErrorText>{form.errors.Furnished}</ErrorText>}
          </Stack>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isAmenities && amenities && amenities.length !== 0 ? (
        <Stack gap={8}>
          <Group gap={4}>
            <RegularFont color="#51565A" fontWeight={400}>
              Amenities
            </RegularFont>{' '}
            {/* <SmallFont color="#737373" fs="italic">
              {'(optional)'}
            </SmallFont> */}
          </Group>

          <Group>
            {Object.keys(amenities).map((key) => {
              return (
                <ItemPropertyButton
                  isActive={form.getValues().Amenities.includes(amenities[key].value)}
                  key={amenities[key].value}
                  onClick={() => handleToggle(amenities[key].value)}
                >
                  {amenities[key].label}
                </ItemPropertyButton>
              );
            })}
          </Group>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isSafety ? (
        <Stack gap={8}>
          <Group gap={4}>
            <RegularFont color="#51565A" fontWeight={400}>
              Safety and Security
            </RegularFont>
            {/* <SmallFont color="#737373" fs="italic">
              {'(optional)'}
            </SmallFont> */}
          </Group>
          <Group>
            <ItemPropertyButton
              isActive={form?.getValues().SecurityFireAlarm === 1}
              onClick={() => handleChangeSecurity(form?.getValues().SecurityFireAlarm)}
            >
              Security / Fire Alarm
            </ItemPropertyButton>
            <ItemPropertyButton
              isActive={form?.getValues().PowerBackup === 1}
              onClick={() => handleChangePowerBackup(form?.getValues().PowerBackup)}
            >
              Power Backup
            </ItemPropertyButton>
          </Group>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isReserveParking ? (
        <Stack gap={8}>
          <RegularFont color="#51565A" fontWeight={400}>
            Reserve Parking
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Stack g ap={0}>
            <Group>
              {carParkingArray.map(({ label, value }, index) => {
                return (
                  <ItemPropertyButton
                    isActive={form?.getValues().CarParking === value}
                    key={index}
                    onClick={() => handleChangeCarParking(value)}
                  >
                    {label}
                  </ItemPropertyButton>
                );
              })}
            </Group>
            {form.errors.CarParking && <ErrorText>{form.errors.CarParking}</ErrorText>}
          </Stack>
        </Stack>
      ) : (
        ''
      )}
      <Stack gap={8}>
        <Group gap={8} align="center">
          <div>
            <FormTextInput
              required
              placeholder={`Enter highlight`}
              label={
                <span>
                  keyHighlights 1 <span style={{ color: 'red' }}>*</span>
                </span>
              }
              width={300}
              other={{ ...form.getInputProps(`keyHighlights1`) }}
            />
          </div>
          <div>
            <FormTextInput
              required
              placeholder={`Enter highlight`}
              label={
                <span>
                  keyHighlights 2 <span style={{ color: 'red' }}>*</span>
                </span>
              }
              width={300}
              other={{ ...form.getInputProps(`keyHighlights2`) }}
            />
          </div>
        </Group>
        <Group gap={8} align="center">
          <div>
            <FormTextInput
              required
              placeholder={`Enter highlight`}
              label={
                <span>
                  keyHighlights 3 <span style={{ color: 'red' }}>*</span>
                </span>
              }
              width={300}
              other={{ ...form.getInputProps(`keyHighlights3`) }}
            />
          </div>
          <div>
            <FormTextInput
              required
              placeholder={`Enter highlight`}
              label={
                <span>
                  keyHighlights 4 <span style={{ color: 'red' }}>*</span>
                </span>
              }
              width={300}
              other={{ ...form.getInputProps(`keyHighlights4`) }}
            />
          </div>
        </Group>
      </Stack>

      <Stack gap={8}>
        <Group gap={4}>
          <RegularFont color="#51565A" fontWeight={400}>
            Select Famous Place Near Your Property
          </RegularFont>
          {/* <SmallFont color="#737373" fs="italic">
            {'(optional)'}
          </SmallFont> */}
        </Group>
        <Stack gap={0}>
          <FormMultiSelect
            placeholder="Select Famous Place Near Your Property.."
            data={sortedNearPlace || []}
            onChange={handleNearPlace}
            className={style.MultiSelectInput}
            value={form.values.placenearby || []}
            filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
            {...form.getInputProps('placenearby')}
          />
          {form.errors.placenearby && <ErrorText>{form.errors.placenearby}</ErrorText>}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PropertyStepThreeTwo;
