'use client';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { Stack, Stepper } from '@mantine/core';
import React from 'react';
import style from './PropertyStepper.module.css';
import PropertyScore from '../PropertyScore/PropertyScore';
import Link from 'next/link';
import { HeadingSix, SmallFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { IconChevronLeft } from '@tabler/icons-react';

const PropertyStepper = ({ isEdit = false }) => {
  const { activeStep } = useAddPropertyStore();
  return (
    <Stack gap={30}>
      <Stack gap={30} className={style.stepperWrapper}>
        {isEdit ? (
          <Link href={'/my-property'}>
            <SmallFont color="#51565A" extraClass={style.textCenter}>
              <IconChevronLeft size={16} /> Back to List
            </SmallFont>
          </Link>
        ) : (
          <Link href={'/'}>
            <SmallFont color="#51565A" extraClass={style.textCenter}>
              <IconChevronLeft size={16} /> Back to Home
            </SmallFont>
          </Link>
        )}
        <Stack gap={26} ml={38}>
          <HeadingSix>{isEdit ? 'Edit' : 'Add'} your Property</HeadingSix>
          <Stepper orientation="vertical" classNames={style} size={32} active={activeStep} pt={24}>
            <Stepper.Step label="Basic Details" />
            <Stepper.Step label="Locations Details" />
            <Stepper.Step label="Property Details" />
            <Stepper.Step label="Pricing Details" />
            <Stepper.Step label="Photos/Video" />
          </Stepper>
        </Stack>
      </Stack>
      <PropertyScore />
    </Stack>
  );
};

export default PropertyStepper;
