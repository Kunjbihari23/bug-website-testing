'use client';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { Stack, Stepper } from '@mantine/core';
import React from 'react';
import style from './ProjectStepper.module.css';
import ProjectScore from '../ProjectScore/ProjectScore';
import Link from 'next/link';
import { HeadingSix, SmallFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { IconChevronLeft } from '@tabler/icons-react';

const ProjectStepper = () => {
  const { activeStep } = useAddPropertyStore();
  return (
    <Stack gap={30}>
      <Stack gap={30} className={style.stepperWrapper}>
        <Link href={'/'}>
          <SmallFont color="#51565A" extraClass={style.textCenter}>
            <IconChevronLeft size={16} /> Back to Home
          </SmallFont>
        </Link>
        <Stack gap={26} ml={38}>
          <HeadingSix>Add your Project</HeadingSix>
          <Stepper orientation="vertical" classNames={style} size={32} active={activeStep} pt={24}>
            <Stepper.Step label="Basic Details" />
            <Stepper.Step label="Locations Details" />
            <Stepper.Step label="Project Details" />
            <Stepper.Step label="Pricing Details" />
            {/* <Stepper.Step label="Contact Details" /> */}
            <Stepper.Step label="Photos/Video" />
          </Stepper>
        </Stack>
      </Stack>
      <ProjectScore />
    </Stack>
  );
};

export default ProjectStepper;
