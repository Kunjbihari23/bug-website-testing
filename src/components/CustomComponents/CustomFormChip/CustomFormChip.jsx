import React, { useEffect, useState } from 'react';
import style from './customChip.module.css';
import { Chip, Group } from '@mantine/core';

export const CustomFormChip = ({
  dataArr = [],
  variant = 'filled',
  onClick = () => {},
  onChange = () => {},
  size = 'md',
  other = {},
}) => {
  return (
    <Chip.Group multiple={true} value={value} onChange={onChange} {...other}>
      <Group>
        {dataArr &&
          dataArr.map((val, index) => {
            return (
              <Chip
                key={`${val.value}_${index}`}
                value={val.value}
                size={size}
                variant={variant}
                classNames={{
                  root: style.chipRoot,
                  selected: style.chipSelected,
                  iconWrapper: style.chipIconWrapper,
                  label: style.chipLabel,
                }}
              >
                {val.label}
              </Chip>
            );
          })}
      </Group>
    </Chip.Group>
  );
};
