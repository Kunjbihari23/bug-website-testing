import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { Accordion, Box, Group, Stack } from '@mantine/core';
import { IconChevronUp } from '@tabler/icons-react';
import style from './ProjectMainSection.module.css';
import ProjectStepThreeOne from './ProjectStepThreeItems/ProjectStepThreeOne';
import ProjectStepThreeTwo from './ProjectStepThreeItems/ProjectStepThreeTwo';

const ProjectStepThree = ({ form, startForm }) => {
  console.log('form data STEP 333------------', form.getValues());
  return (
    <Box>
      <Stack gap={32}>
        <HeadingSix fontWeight={500}>Add details of your Project</HeadingSix>
        <Stack gap={24}>
          <ProjectStepThreeOne form={form} />
          <ProjectStepThreeTwo form={form} startForm={startForm} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectStepThree;
