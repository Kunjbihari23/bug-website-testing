'use client';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { Container, Group, Stack } from '@mantine/core';
import style from './NextPrevStep.module.css';
import React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { RegularFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { grey_font_color } from '@/constant/FontColotConstant';

const NextPrevStep = ({ handleSubmit, form, startForm }) => {
  const { activeStep, totalStep, nextStep, prevStep } = useAddPropertyStore();
  const [parent] = useAutoAnimate();
  const isBreakpoint = useMediaQuery('(max-width: 360px)');

  const handleNextStep = () => {
    if (startForm.validate().hasErrors) {
      return;
    }

    if (form.validate().hasErrors) {
      return;
    }

    nextStep();
  };

  return (
    <Container size={'xl'} w={'100%'} pb={30}>
      <Group justify="space-between" className={style.stepButtonSection}>
        <Stack gap={0}>
          <RegularFont fontWeight={500} color="#091E42">
            Need help ?
          </RegularFont>
          <RegularFont color={grey_font_color}>
            Call :{' '}
            <Link className="link-underlines" href={'#'}>
              92653 20742
            </Link>{' '}
            or Chat with us :{' '}
            <Link className="link-underlines" href={'#'}>
              92653 20742
            </Link>
          </RegularFont>
        </Stack>
        <Group gap={25} justify="end" miw={isBreakpoint ? '100%' : 360} ref={parent}>
          <span>
            {activeStep + 1}/{totalStep}
          </span>
          {activeStep !== 0 ? (
            <CustomePrimaryButton size="medium" onClick={prevStep}>
              Prev - Step {activeStep}
            </CustomePrimaryButton>
          ) : (
            ''
          )}{' '}
          {activeStep == 4 ? (
            <CustomePrimaryButton size="medium" onClick={handleSubmit}>
              Add Project
            </CustomePrimaryButton>
          ) : (
            <CustomePrimaryButton size="medium" onClick={handleNextStep}>
              Next - Step {activeStep + 2}
            </CustomePrimaryButton>
          )}
        </Group>
      </Group>
    </Container>
  );
};

export default NextPrevStep;
