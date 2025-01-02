import { RegularFont, SmallFont } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { Slider, Stack } from '@mantine/core';
import style from './ProjectScore.module.css';
import React from 'react';
import useAddPropertyStore from '@/store/useAddPropertyStore';

const ProjectScore = () => {
  const { activeStep, totalStep } = useAddPropertyStore();
  let valueSlider = activeStep * 20;
  return (
    <Stack gap={0} className={style.progressWrapper}>
      <RegularFont fontWeight={500}>Project Score</RegularFont>
      <SmallFont color="#51565A">Increase your project score for better visibility.</SmallFont>
      <Slider
        color="#1CA345"
        classNames={{
          trackContainer: style.tracker,
          thumb: style.thumb,
          label: style.labelValue,
        }}
        defaultValue={0}
        value={valueSlider}
        labelAlwaysOn
        label={(value) => {
          return `${value}%`;
        }}
        mt={26}
      />
    </Stack>
  );
};

export default ProjectScore;
