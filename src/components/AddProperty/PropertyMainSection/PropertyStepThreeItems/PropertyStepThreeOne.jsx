import ItemPropertyButton from '@/components/CustomComponents/CustomButtons/ItemPropertyButton';
import {
  FormDatePicker,
  FormNumberInput,
  FormRadio,
  FormSelect,
} from '@/components/CustomComponents/CustomInputs/CustomInput';
import { ErrorText, RegularFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { useGetFacingData } from '@/state/addProperty/addProperty.hook';
import { areaUnit } from '@/util/commanUnits';
import { Group, Radio, Stack } from '@mantine/core';
import { useState } from 'react';

const tagsArray = [
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
  {
    label: '4',
    value: '4',
  },
];

const noOfBalconiesArray = [
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

const landorPlotObject = [
  {
    label: 'Survey Number',
    value: '0',
  },
  {
    label: 'Final Plot',
    value: '1',
  },
];

const areaDetailsRadioArray = [
  {
    label: 'Carpet Area',
    value: '1',
  },
  {
    label: 'Built-Up Area',
    value: '2',
  },
  {
    label: 'Super Built - Up Area',
    value: '3',
  },
];

const plotDetailsRadioArray = [
  {
    label: 'Carpet Area',
    value: '1',
  },
  {
    label: 'Built-Up Area',
    value: '2',
  },
  {
    label: 'Super Built - Up Area',
    value: '3',
  },
];

const propertyAgeArray = [
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
    label: '10-20 Years',
    value: '4',
  },
  {
    label: '20-30 Years',
    value: '5',
  },
  {
    label: '30+ Years',
    value: '6',
  },
];

const PropertyStepThreeOne = ({ form, formItemShow }) => {
  const { data: facingArray } = useGetFacingData();
  const [areaLabel, setAreaLabel] = useState('Carpet Area');
  const [plotAreaLabel, setPlotAreaLabel] = useState('Carpet Area');

  const handleChangeRoom = (e, value) => {
    e.preventDefault();
    form.setFieldValue('BedRooms', value);
  };
  const handleChangeWashroom = (e, value) => {
    e.preventDefault();
    form.setFieldValue('Washrooms', value);
  };
  const handleChangeBalconies = (e, value) => {
    e.preventDefault();
    form.setFieldValue('Balcony', value);
  };
  const handleChangeHall = (e, value) => {
    e.preventDefault();
    form.setFieldValue('Hall', value);
  };
  const handleChangeKitchen = (e, value) => {
    e.preventDefault();
    form.setFieldValue('Kitchen', value);
  };
  const handleChangeAvailability = (e, value) => {
    form.setFieldValue('Avaibility', value);
    if (value === '1') {
      form.setFieldValue('possession_Date', null);
    }
    if (value === '3') {
      form.setFieldValue('AgeofProperty', '1');
    }
  };
  const showPossessionDate = form.getValues().Avaibility !== '1';
  const showAgeOfProperty = form.getValues().Avaibility !== '2';

  const handleAreaDetailChange = (value) => {
    form.setFieldValue('Carpet', value);
    const selectedOption = areaDetailsRadioArray.find((option) => option.value === value);
    if (selectedOption) {
      setAreaLabel(selectedOption.label);
    }
  };
  const handlePlotDetailChange = (value) => {
    form.setFieldValue('Ba_PlotCarpet', value);
    const selectedOption = plotDetailsRadioArray.find((option) => option.value === value);
    if (selectedOption) {
      setPlotAreaLabel(selectedOption.label);
    }
  };

  return (
    <Stack gap={24}>
      {formItemShow?.isNoOfBedrooms ? (
        <Stack gap={8}>
          <RegularFont color="#51565A" fontWeight={400}>
            No. of Bedrooms
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Stack gap={0}>
            <Group>
              {tagsArray.map(({ label, value }, index) => {
                return (
                  <ItemPropertyButton
                    isActive={form?.getValues().BedRooms === value}
                    key={index}
                    onClick={(e) => handleChangeRoom(e, value)}
                  >
                    {label}
                  </ItemPropertyButton>
                );
              })}
            </Group>
            {form.errors.BedRooms && <ErrorText>{form.errors.BedRooms}</ErrorText>}
          </Stack>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isNoOfWashrooms ? (
        <Stack gap={8}>
          <RegularFont color="#51565A" fontWeight={400}>
            No. of Washhrooms
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Stack gap={0}>
            <Group>
              {tagsArray.map(({ label, value }, index) => {
                return (
                  <ItemPropertyButton
                    isActive={form?.getValues().Washrooms === value}
                    key={index}
                    onClick={(e) => handleChangeWashroom(e, value)}
                  >
                    {label}
                  </ItemPropertyButton>
                );
              })}
            </Group>
          </Stack>
          {form.errors.Washrooms && <ErrorText>{form.errors.Washrooms}</ErrorText>}
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isNoOfHall ? (
        <Stack gap={8}>
          <RegularFont color="#51565A" fontWeight={400}>
            No. of Hall
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Stack gap={0}>
            <Group>
              {tagsArray.map(({ label, value }, index) => {
                return (
                  <ItemPropertyButton
                    isActive={form?.getValues().Hall === value}
                    key={index}
                    onClick={(e) => handleChangeHall(e, value)}
                  >
                    {label}
                  </ItemPropertyButton>
                );
              })}
            </Group>
            {form.errors.Hall && <ErrorText>{form.errors.Hall}</ErrorText>}
          </Stack>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isNoOfKitchen ? (
        <Stack gap={8}>
          <RegularFont color="#51565A" fontWeight={400}>
            No. of Kitchen
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Stack gap={0}>
            <Group>
              {tagsArray.map(({ label, value }, index) => {
                return (
                  <ItemPropertyButton
                    isActive={form?.getValues().Kitchen === value}
                    key={index}
                    onClick={(e) => handleChangeKitchen(e, value)}
                  >
                    {label}
                  </ItemPropertyButton>
                );
              })}
            </Group>
            {form.errors.Kitchen && <ErrorText>{form.errors.Kitchen}</ErrorText>}
          </Stack>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isNoOfBalcony ? (
        <Stack gap={8}>
          <RegularFont color="#51565A" fontWeight={400}>
            No. of balconies
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Stack gap={0}>
            <Group>
              {noOfBalconiesArray.map(({ label, value }, index) => {
                return (
                  <ItemPropertyButton
                    isActive={form?.getValues().Balcony === value}
                    key={index}
                    onClick={(e) => handleChangeBalconies(e, value)}
                  >
                    {label}
                  </ItemPropertyButton>
                );
              })}
            </Group>
            {form.errors.Balcony && <ErrorText>{form.errors.Balcony}</ErrorText>}
          </Stack>
        </Stack>
      ) : (
        ''
      )}
      {formItemShow?.isPlotType ? (
        <>
          <Stack gap={8}>
            <RegularFont fontWeight={400}>
              Plot Type
              {/* <span style={{ color: 'red' }}>*</span> */}
            </RegularFont>
            <Radio.Group {...form.getInputProps('LandorPlot')}>
              <Group>
                {landorPlotObject &&
                  landorPlotObject?.map((item, index) => (
                    <FormRadio key={index} value={item?.value.toString()} label={item?.label} />
                  ))}
              </Group>
            </Radio.Group>
          </Stack>
          <Stack gap={8}>
            <RegularFont fontWeight={400}>
              Add details
              {/* <span style={{ color: 'red' }}>*</span> */}
            </RegularFont>
            <Stack gap={8}>
              <Group gap={8}>
                <FormNumberInput
                  label="Total Area"
                  placeholder="Total Area"
                  width="170"
                  thousandSeparator=","
                  other={{ ...form.getInputProps('FlatAreaUnit') }}
                />
                <FormSelect
                  data={areaUnit}
                  placeholder="sq.ft"
                  label="Unit"
                  width="105"
                  other={{ ...form.getInputProps('UnitofAreaId') }}
                />
              </Group>
              {form?.getValues().LandorPlot === '1' ? (
                <FormNumberInput
                  label="Suvery Number"
                  placeholder="Survery Number"
                  width={280}
                  other={{ ...form.getInputProps('SurveyNo') }}
                />
              ) : (
                <FormNumberInput
                  label="Super Build-up Percentage"
                  placeholder="Super Build-up Percentage"
                  width={280}
                  min={0}
                  clampBehavior="strict"
                  max={100}
                  suffix="%"
                  other={{ ...form.getInputProps('SuperBuildupPercentage') }}
                />
              )}
            </Stack>
          </Stack>
        </>
      ) : (
        ''
      )}
      {formItemShow?.isAreaDetails ? (
        <Stack gap={8}>
          <RegularFont fontWeight={400}>
            Add area detail
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Radio.Group {...form.getInputProps('Carpet')} onChange={handleAreaDetailChange}>
            <Group>
              {areaDetailsRadioArray &&
                areaDetailsRadioArray?.map((item, index) => (
                  <FormRadio key={index} value={item?.value.toString()} label={item?.label} />
                ))}
            </Group>
          </Radio.Group>

          <Stack gap={8}>
            <Group gap={8}>
              <FormNumberInput
                label={areaLabel}
                // {
                //   <span>
                //     Carpet Area <span style={{ color: 'red' }}>*</span>
                //   </span>
                // }
                placeholder={areaLabel}
                width="170"
                thousandSeparator=","
                other={{ ...form.getInputProps('FlatAreaUnit') }}
              />
              <FormSelect
                data={areaUnit}
                placeholder="sq.ft"
                label="Unit"
                // {
                //   <span>
                //     Unit <span style={{ color: 'red' }}>*</span>
                //   </span>
                // }
                width="105"
                other={{ ...form.getInputProps('UnitofAreaId') }}
              />
            </Group>
            <FormNumberInput
              label="Super Build-up Percentage"
              // {
              //   <span>
              //     Super Build-up Percentage <span style={{ color: 'red' }}>*</span>
              //   </span>
              // }
              placeholder="Super Build-up Percentage"
              width={280}
              min={0}
              clampBehavior="strict"
              max={100}
              suffix="%"
              other={{ ...form.getInputProps('SuperBuildupPercentage') }}
            />
          </Stack>
        </Stack>
      ) : (
        ''
      )}

      {formItemShow?.isPlotDeatils ? (
        <Stack gap={8}>
          <RegularFont fontWeight={400}>
            Add plot detail
            {/* <span style={{ color: 'red' }}>*</span> */}
          </RegularFont>
          <Radio.Group {...form.getInputProps('Ba_PlotCarpet')} onChange={handlePlotDetailChange}>
            <Group>
              {plotDetailsRadioArray &&
                plotDetailsRadioArray?.map((item, index) => (
                  <FormRadio key={index} value={item?.value.toString()} label={item?.label} />
                ))}
            </Group>
          </Radio.Group>
          <Group gap={8}>
            <FormNumberInput
              label={plotAreaLabel}
              placeholder={areaLabel}
              width="170"
              thousandSeparator=","
              other={{ ...form.getInputProps('Ba_PlotArea') }}
            />
            <FormSelect
              data={areaUnit}
              placeholder="sq.ft"
              label="Unit"
              width="105"
              other={{ ...form.getInputProps('Ba_PlotAreaUnit') }}
            />
          </Group>
          <FormNumberInput
            label="Super Build-up Percentage"
            // {
            //   <span>
            //     Super Build-up Percentage <span style={{ color: 'red' }}>*</span>
            //   </span>
            // }
            placeholder="Super Build-up Percentage"
            width={280}
            max={100}
            suffix="%"
            other={{ ...form.getInputProps('Ba_PlotSuperBuildupPercentage') }}
          />
        </Stack>
      ) : (
        ''
      )}
      <Stack gap={8}>
        {formItemShow?.isFloorDetails ? (
          <Stack gap={8}>
            <RegularFont color="#51565A" fontWeight={400}>
              Floor details
              {/* <span style={{ color: 'red' }}>*</span> */}
            </RegularFont>
            <Group gap={8}>
              <FormNumberInput
                label="Total Floor"
                // {
                //   <span>
                //     Total Floor <span style={{ color: 'red' }}>*</span>
                //   </span>
                // }
                placeholder="Total Floor"
                width="170"
                other={{ ...form.getInputProps('TotalFloor') }}
              />
              <FormSelect
                data={Array.from({ length: form.getValues().TotalFloor }, (_, index) => {
                  return { label: `${index + 1} Floor`, value: (index + 1).toString() };
                })}
                placeholder="Property on floor"
                label="Property on floor"
                // {
                //   <span>
                //     Property on floor <span style={{ color: 'red' }}>*</span>
                //   </span>
                // }
                other={{ ...form.getInputProps('PropertyFloor') }}
                searchable={false}
                width={170}
              />
            </Group>
          </Stack>
        ) : (
          ''
        )}

        {formItemShow?.isFacing ? (
          <FormSelect
            label={
              <span>
                Facing{' '}
                {/* {form.values.RentOrSell === '2' ? (
                  <span style={{ color: 'rgb(115, 115, 115)', fontStyle: 'italic', fontSize: '14px' }}>
                    {'(optional)'}
                  </span>
                ) : (
                  <span style={{ color: 'red' }}>*</span>
                )} */}
              </span>
            }
            data={facingArray}
            placeholder="Facing"
            other={{ ...form.getInputProps('facing') }}
            width={160}
          />
        ) : (
          ''
        )}
      </Stack>

      <Stack gap={8}>
        {formItemShow?.isAvaibilityStatus ? (
          <>
            <RegularFont fontWeight={400}>
              Availability status
              {/* <span style={{ color: 'red' }}>*</span> */}
            </RegularFont>
            <Stack gap={0}>
              <Group gap={8}>
                {availabilityStatus.map(({ label, value }, index) => {
                  return (
                    <ItemPropertyButton
                      isActive={form?.getValues().Avaibility === value}
                      key={index}
                      onClick={(e) => handleChangeAvailability(e, value)}
                    >
                      {label}
                    </ItemPropertyButton>
                  );
                })}
              </Group>
              {form.errors.Avaibility && <ErrorText>{form.errors.Avaibility}</ErrorText>}
            </Stack>
          </>
        ) : (
          ''
        )}
        <Group>
          {formItemShow?.isAgeOfProperty && showAgeOfProperty ? (
            <FormSelect
              label="Property age"
              // {
              //   <span>
              //     Property age <span style={{ color: 'red' }}>*</span>
              //   </span>
              // }
              placeholder="Property age"
              width={170}
              data={form.values.Avaibility === '3' ? [{ label: '0-1 Years', value: '1' }] : propertyAgeArray}
              value={form.values.AgeofProperty}
              other={{ ...form.getInputProps('AgeofProperty') }}
            />
          ) : (
            ''
          )}
          {formItemShow?.isPossessionDate && showPossessionDate ? (
            <FormDatePicker
              other={{ ...form.getInputProps('Possession_Date') }}
              placeholder="Possession date"
              label="Possession date"
              // {
              //   <span>
              //     Possession date <span style={{ color: 'red' }}>*</span>
              //   </span>
              // }
              width={200}
            />
          ) : null}
        </Group>
      </Stack>

      {/* <Stack gap={8}>
        <RegularFont color="#51565A" fontWeight={400}>
          Over looking
        </RegularFont>
        <Group gap={8}>
          {overLookingArray.map(({ label, value }, index) => {
            return (
              <ItemPropertyButton
                isActive={form?.getValues().overLooking === value}
                key={index}
                onClick={() => handleChangeOverLooking(value)}
              >
                {label}
              </ItemPropertyButton>
            );
          })}
        </Group>
      </Stack>
      <Stack gap={8}>
        <RegularFont color="#51565A" fontWeight={400}>
          Ownership
        </RegularFont>
        <Group gap={8}>
          {ownershipTypeArray.map(({ label, value }, index) => {
            return (
              <ItemPropertyButton
                isActive={form?.getValues().ownerShipType === value}
                key={index}
                onClick={() => handleChangeOwnerShipType(value)}
              >
                {label}
              </ItemPropertyButton>
            );
          })}
        </Group>
      </Stack> */}
    </Stack>
  );
};

export default PropertyStepThreeOne;
