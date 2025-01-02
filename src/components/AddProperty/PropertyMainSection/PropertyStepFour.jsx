import {
  FormCheckBox,
  FormCheckBoxWithCheckInput,
  FormNumberInput,
  FormRadio,
  FormSelect,
  FormTextArea,
  FormTextInputWithValue,
} from '@/components/CustomComponents/CustomInputs/CustomInput';
import { HeadingSix, RegularFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { areaUnit } from '@/util/commanUnits';
import { Box, Group, Radio, Stack } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import style from './PropertyMainSection.module.css';

const PropertyStepFour = ({ form, FlatAreaUnit, UnitofAreaId = 1, formItemShow, isEdit }) => {
  let formUnitPlaceholder = UnitofAreaId - 1 ?? 0;

  const [pricePerUnit, setPricePerUnit] = useState('');

  const handlePricePerUnitChange = useCallback(
    (event) => {
      let value = event?.target?.value ?? event;
      let pricePerUnit = value / FlatAreaUnit;
      if (pricePerUnit) {
        setPricePerUnit(pricePerUnit.toFixed(2));
      } else {
        setPricePerUnit(0);
      }
    },
    [FlatAreaUnit]
  );

  useEffect(() => {
    handlePricePerUnitChange(form.getValues().RateRentValue);
  }, [form, handlePricePerUnitChange]);

  const handlePriceIncludeChange = (value) => {
    form.setFieldValue('AllpriceIncluded', value === 'true');
  };

  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>{isEdit ? 'Edit' : 'Add'} pricing details of your Property</HeadingSix>
        <Stack gap={16}>
          <Stack gap={8}>
            <Group gap={8}>
              <FormNumberInput
                label={
                  <span>
                    {form?.getValues().RentOrSell === '2' ? 'Rent' : 'Price'} details{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                placeholder={`Expected ${form?.getValues().RentOrSell === '2' ? 'Rent' : 'Price'}`}
                thousandSeparator=","
                width={190}
                other={{ ...form.getInputProps('RateRentValue') }}
              />
              {form && form.values.FlatAreaUnit != 0 && form.getValues().FlatAreaUnit !== '' && (
                <FormTextInputWithValue
                  label={
                    <span className={style.textInputlabel}>
                      {form?.getValues().RentOrSell === '2' ? 'Rent' : 'Price'} by Area
                    </span>
                  }
                  value={pricePerUnit}
                  placeholder={`Price per ${areaUnit[Number(formUnitPlaceholder)]?.label ?? 'Sq.ft'}`}
                  width={140}
                  thousandSeparator=","
                  readOnly
                />
              )}
            </Group>
          </Stack>
          <Group gap={8}>
            {/* change it to radio */}
            <Radio.Group onChange={handlePriceIncludeChange} value={form.values.AllpriceIncluded ? 'true' : 'false'}>
              <Group>
                <FormRadio value="true" label="All inclusive price" />
                <FormRadio value="false" label="Tax and govt. charges excluded" />
              </Group>
            </Radio.Group>

            <FormCheckBox
              label="Price negotiable"
              other={{ ...form.getInputProps('IsNegotiable', { type: 'checkbox' }) }}
            />
          </Group>
          <Stack gap={8}>
            <RegularFont color="#51565A" fontWeight={400}>
              Additional {form?.getValues().RentOrSell === '2' ? 'Rent' : 'Price'} details
            </RegularFont>
            {form?.getValues().RentOrSell === '2' ? (
              <>
                <RegularFont color="#51565A" fontWeight={400}>
                  Amount of Deposit{' '}
                  {/* {form.values.RentOrSell === '2' ? (
                    <span style={{ color: 'rgb(115, 115, 115)', fontStyle: 'italic', fontSize: '14px' }}>
                      {'(optional)'}
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>*</span>
                  )} */}
                </RegularFont>
                <FormNumberInput
                  placeholder="Amount of Deposit"
                  thousandSeparator=","
                  width={190}
                  other={{ ...form.getInputProps('RentDepositAmount') }}
                />
              </>
            ) : (
              ''
            )}
            {formItemShow?.isMaintance && form?.getValues().RentOrSell != '1' ? (
              <>
                <RegularFont color="#51565A" fontWeight={400}>
                  Maintenance{' '}
                  {/* {form.values.RentOrSell === '2' ? (
                    <span style={{ color: 'rgb(115, 115, 115)', fontStyle: 'italic', fontSize: '14px' }}>
                      {'(optional)'}
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>*</span>
                  )} */}
                </RegularFont>
                <Group gap={8}>
                  <FormNumberInput
                    thousandSeparator=","
                    placeholder="Maintenance"
                    width={190}
                    other={{ ...form.getInputProps('Maintenance') }}
                  />
                  <FormSelect
                    width={130}
                    data={['Month', 'Year']}
                    other={{ ...form.getInputProps('Maintenance_MonthYear') }}
                  />
                </Group>
              </>
            ) : (
              ''
            )}
            {/* {formItemShow?.isExpectedRental && form.values.RentOrSell !== '2' ? (
              <>
                <RegularFont color="#51565A" fontWeight={400}>
                  Expected rental
                </RegularFont>
                <FormNumberInput
                  placeholder="Expected rental"
                  thousandSeparator=","
                  width={190}
                  other={{ ...form.getInputProps('Expected_Rental') }}
                />
              </>
            ) : (
              ''
            )} */}
            {form.values.RentOrSell !== '2' && form?.getValues().RentOrSell != '1' && (
              <>
                <RegularFont color="#51565A" fontWeight={400}>
                  Booking amount
                  {/* <span style={{ color: 'red' }}>*</span> */}
                </RegularFont>
                <FormNumberInput
                  placeholder="Booking amount"
                  thousandSeparator=","
                  width={190}
                  other={{ ...form.getInputProps('Booking_Amount') }}
                />
              </>
            )}

            {form?.getValues().RentOrSell === '2' ? (
              <>
                <RegularFont color="#51565A" fontWeight={400}>
                  Notice Period
                </RegularFont>
                <FormNumberInput
                  placeholder="Notice Period"
                  width={190}
                  other={{ ...form.getInputProps('RentNoticePeriod') }}
                />
              </>
            ) : (
              ''
            )}
          </Stack>
          {formItemShow?.isDescription ? (
            <Stack gap={8}>
              <RegularFont color="#51565A" fontWeight={400}>
                Property descriptions <span style={{ color: 'red' }}>*</span>
              </RegularFont>
              <Group gap={8}>
                <FormTextArea
                  placeholder="Write your property unique features"
                  other={{ ...form.getInputProps('Description') }}
                />
              </Group>
            </Stack>
          ) : (
            ''
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PropertyStepFour;
