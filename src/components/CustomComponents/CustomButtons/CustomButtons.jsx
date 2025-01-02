'use client';
import { Button } from '@mantine/core';
import style from './button.module.css';
import { useMemo } from 'react';

const CustomePrimaryButton = ({
  children,
  size = 'medium',
  variant = 'primary',
  onClick = () => {},
  onClickCapture = () => {},
  isLoading = false,
  component = 'button',
  type = '',
  href = '#',
  btnWidth = false,
  disabled = false,
  icon = null,
  fullWidth = false,
}) => {
  const getBtnSize = useMemo(() => {
    switch (size) {
      case 'extraSmall':
        return style.extraSmallPrimaryBtn;
      case 'small':
        return style.smallPrimaryBtn;
      case 'medium':
        return style.mediumPrimaryBtn;
      case 'large':
        return style.largePrimaryBtn;
      default:
        return style.mediumPrimaryBtn;
    }
  }, [size]);

  const getBtnLabelClass = useMemo(() => {
    switch (size) {
      case 'extraSmall':
        return style.extraSmallBtnLabel;
      case 'small':
        return style.smallBtnLabel;
      case 'medium':
        return style.mediumBtnLabel;
      case 'large':
        return style.largeBtnLabel;
      default:
        return style.mediumBtnLabel;
    }
  }, [size]);

  const getBtnVariant = useMemo(() => {
    switch (variant) {
      case 'light':
        return style.lightBtn;
      case 'outline':
        return style.outlineBtn;
      default:
        return style.primaryBtn;
    }
  }, [variant]);

  return (
    <Button
      style={btnWidth ? { width: btnWidth } : {}}
      leftSection={icon}
      component={component}
      href={href}
      variant="primary"
      loading={isLoading}
      fullWidth={fullWidth}
      classNames={{
        root: `${getBtnVariant} ${getBtnSize}`,
        inner: style.primaryBtnInner,
        label: `${getBtnLabelClass}`,
        section: `${size == 'extraSmall' ? style.smallBtnIconSection : style.btnIconSection}
        `,
      }}
      onClickCapture={onClickCapture}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomePrimaryButton;
