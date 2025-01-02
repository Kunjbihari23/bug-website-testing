import React from 'react';
import style from './button.module.css';
import { UnstyledButton } from '@mantine/core';
const ItemPropertyButton = (props) => {
  return (
    <UnstyledButton
      {...props}
      classNames={{
        root: `${style.itemProperty} ${props?.isActive ? style.active : ''}`,
      }}
    >
      {props.children ?? ''}
    </UnstyledButton>
  );
};

export default ItemPropertyButton;
