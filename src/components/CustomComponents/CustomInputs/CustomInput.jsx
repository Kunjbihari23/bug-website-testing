'use client';

import {
  Box,
  Checkbox,
  Chip,
  Group,
  InputBase,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  Switch,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconCalendar, IconCheck, IconChevronDown, IconX } from '@tabler/icons-react';
import style from './CustomInput.module.css';
import { SmallFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { heading_font_color } from '@/constant/FontColotConstant';
import { IMaskInput } from 'react-imask';
import { DatePickerInput } from '@mantine/dates';

const FormTextInput = ({
  label = '',
  placeholder = 'Place Holder',
  readOnly = false,
  disabled = false,
  width = '100%',
  onChange = () => {},
  onChangeCapture = () => {},
  rightIcon = '',
  size = 'sm',
  errorAbsolute = false,
  other = {},
}) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      onChangeCapture={onChangeCapture}
      w={width}
      size={size}
      classNames={{
        label: style.textInputlabel,
        input: style.textInput,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      rightSection={rightIcon}
      {...other}
    />
  );
};

const FormTextInputWithValue = ({
  label = '',
  placeholder = 'Place Holder',
  readOnly = false,
  disabled = false,
  width = '100%',
  rightIcon = '',
  size = 'sm',
  errorAbsolute = false,
  value = '',
  key = '',
  thousandSeparator = '',
  other = {},
}) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      w={width}
      size={size}
      value={value}
      key={key}
      classNames={{
        label: style.textInputlabel,
        input: style.textInput,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      rightSection={rightIcon}
      thousandsGroupStyle="lakh"
      thousandSeparator={thousandSeparator}
      {...other}
    />
  );
};

const FormTextArea = ({
  label = '',
  placeholder = 'Place Holder',
  readOnly = false,
  disabled = false,
  width = '100%',
  errorAbsolute = false,
  other = {},
  key = '',
}) => {
  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      w={width}
      minRows={5}
      key={key}
      autosize
      classNames={{
        label: style.textInputlabel,
        input: style.textInput,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      {...other}
    />
  );
};

const FormNumberInput = ({
  label = '',
  placeholder = 'Place Holder',
  readOnly = false,
  disabled = false,
  width = '100%',
  onChange = () => {},
  onChangeCapture = () => {},
  rightIcon = '',
  size = 'sm',
  errorAbsolute = false,
  other = {},
  thousandSeparator = '',
  suffix = '',
  max = undefined,
  hideControls = true,
  clampBehavior = 'none',
  rightSectionWidth = 0,
  min = undefined,
}) => {
  return (
    <NumberInput
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      onChangeCapture={onChangeCapture}
      w={width}
      suffix={suffix}
      size={size}
      classNames={{
        label: style.textInputlabel,
        input: style.textInput,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      hideControls={hideControls}
      max={max}
      min={min}
      rightSection={rightIcon}
      thousandsGroupStyle="lakh"
      clampBehavior={clampBehavior}
      thousandSeparator={thousandSeparator}
      {...other}
      rightSectionWidth={rightSectionWidth}
    />
  );
};

const FormSelect = ({
  label = '',
  placeholder = 'Select',
  width = '100%',
  readOnly = false,
  disabled = false,
  data = [],
  errorAbsolute = false,
  other = {},
  searchable = true,
  key = '',
  defaultValue = null,
  value = null,
}) => {
  return (
    <Select
      classNames={{
        label: style.textInputlabel,
        input: style.textInput,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      value={value}
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      w={width}
      searchable={searchable}
      data={data}
      {...other}
      key={key}
      defaultValue={defaultValue}
      rightSection={<IconChevronDown size={14} color="#51565A" />}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    />
  );
};

const FormMultiSelect = ({
  label = '',
  placeholder = 'Select',
  width = '100%',
  readOnly = false,
  disabled = false,
  data = [],
  errorAbsolute = false,
  searchable = true,
  value = [],
  onChange = () => {},
  key = '',
  other = {},
}) => {
  return (
    <MultiSelect
      classNames={{
        label: style.textInputlabel,
        input: style.textInput,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      w={width}
      searchable={searchable}
      data={data}
      value={value || []}
      onChange={onChange}
      key={key}
      rightSection={<IconChevronDown size={14} color="#51565A" />}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      {...other}
    />
  );
};

const FormRadio = ({ label = 'Radio', onChange = () => {}, readOnly = false, disabled = false, value = '' }) => {
  return (
    <Radio variant="outline" value={value} onChange={(e) => onChange(e.target.value)} label={label} color="#1E1E82" />
  );
};

const FormCheckBox = ({
  label = 'Checkbox',
  readOnly = false,
  disabled = false,
  other = {},
  checked = false,
  key = '',
}) => {
  return <Checkbox label={label} color="#1E1E82" {...other} key={key} />;
};

const FormCheckBoxWithCheckInput = ({
  label = 'Checkbox',
  onChange = () => {},
  onChangeCapture = () => {},
  readOnly = false,
  disabled = false,
  other = {},
  checked = false,
  key = '',
}) => {
  return (
    <Checkbox
      label={label}
      onChange={onChange}
      onChangeCapture={onChangeCapture}
      checked={checked}
      color="#1E1E82"
      {...other}
      key={key}
    />
  );
};

const FormSwitch = ({ readOnly = false, disabled = false }) => {
  return (
    <Switch
      readOnly={readOnly}
      disabled={disabled}
      color="#1CA345"
      classNames={{
        thumb: style.switchThumb,
      }}
    />
  );
};

const VerifyStatus = ({ verified = false }) => {
  return verified ? (
    <Box className={style.verifyBox} bg={'#1CA34526'} w={'max-content'}>
      <Group gap={6}>
        <IconCheck size={12} color="#1CA345" /> <SmallFont color="#1CA345">Verified</SmallFont>
      </Group>
    </Box>
  ) : (
    <Box className={style.verifyBox} bg={'#DB2B2B1F'} w={'max-content'}>
      <Group gap={6}>
        <IconX size={12} color="#DB2B2B" /> <SmallFont color="#DB2B2B">Denied</SmallFont>
      </Group>
    </Box>
  );
};

const FormPhoneInput = ({
  label = '',
  placeholder = 'Enter phone number',
  readOnly = false,
  disabled = false,
  width = '100%',
  rightIcon = '',
  size = 'sm',
  other = {},
  errorAbsolute = false,
  key = '',
  onKeyDown = () => {},
}) => {
  return (
    <InputBase
      key={key}
      component={IMaskInput}
      mask="0000000000"
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      w={width}
      size={size}
      classNames={{
        label: style.textInputlabel,
        input: style.textInput,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      rightSection={rightIcon}
      {...other}
      onKeyDown={onKeyDown}
    />
  );
};
const FormDatePicker = ({
  label = '',
  placeholder = 'Place Holder',
  readOnly = false,
  disabled = false,
  width = '100%',
  size = 'sm',
  other = {},
  errorAbsolute = false,
  key = '',
}) => {
  return (
    <DatePickerInput
      classNames={{
        label: style.textInputlabel,
        input: `${style.textInput} ${style.textDateInput}`,
        wrapper: style.inputWrapper,
        error: errorAbsolute ? 'errorAbsolute' : '',
      }}
      label={label}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      w={width}
      size={size}
      {...other}
      leftSection={<IconCalendar style={{ width: 18, height: 18 }} stroke={1.5} />}
    />
  );
};

const CustomFormChip = ({
  label = '',
  variant = 'filled',
  onClick = () => {},
  onChange = () => {},
  size = 'md',
  value = '',
  disabled = false,
}) => {
  return (
    <Chip
      value={value}
      size={size}
      variant={variant}
      onChange={onChange}
      disabled={disabled}
      classNames={{
        root: style.chipRoot,
        selected: style.chipSelected,
        iconWrapper: style.chipIconWrapper,
        label: style.chipLabel,
      }}
    >
      {label}
    </Chip>
    // <Chip.Group multiple onChange={onChange} {...other}>
    //   <Group>
    //     {dataArr &&
    //       dataArr.map((val, index) => {
    //         return (
    //           <Chip
    //             key={`${val.value}_${index}`}
    //             value={val.value}
    //             size={size}
    //             variant={variant}
    //             classNames={{
    //               root: style.chipRoot,
    //               selected: style.chipSelected,
    //               iconWrapper: style.chipIconWrapper,
    //               label: style.chipLabel,
    //             }}
    //           >
    //             {val.label}
    //           </Chip>
    //         );
    //       })}
    //   </Group>
    // </Chip.Group>
  );
};

export {
  FormCheckBox,
  FormRadio,
  FormSelect,
  FormTextArea,
  FormTextInput,
  FormSwitch,
  VerifyStatus,
  FormPhoneInput,
  FormDatePicker,
  FormTextInputWithValue,
  FormCheckBoxWithCheckInput,
  FormNumberInput,
  CustomFormChip,
  FormMultiSelect,
};
