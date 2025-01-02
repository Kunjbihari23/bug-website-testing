'use client';

import useAddPropertyStore from '@/store/useAddPropertyStore';
import { Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import style from './ProjectMainSection.module.css';
import ProjectStepOne from './ProjectStepOne';
import ProjectStepTwo from './ProjectStepTwo';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectStepThree from './ProjectStepThree';
import ProjectStepFour from './ProjectStepFour';
import ProjectStepFive from './ProjectStepFive';
import { useState } from 'react';
import ProjectStepSix from './ProjectStepSix';

const fadeInOutVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ProjectMainSection = ({
  activeStep,
  mainForm,
  startForm,
  handleImageUpload,
  handleVideoUpload,
  handleDeleteImage,
  handleDeleteVideo,
  imagesArray,
  imagesUrlArray,
  videoArray,
  videoUrlArray,
  browchureArray,
  browchureUrlArray,
  handleBrochureUpload,
  handleDeleteBrowchuer,
}) => {
  const getActiveStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <ProjectStepOne key={'step1'} form={mainForm} startForm={startForm} />;
      case 1:
        return <ProjectStepTwo key={'step2'} form={mainForm} startForm={startForm} />;
      case 2:
        return <ProjectStepThree key={'step3'} form={mainForm} startForm={startForm} />;
      case 3:
        return (
          <ProjectStepFour
            key={'step4'}
            form={mainForm}
            FlatAreaUnit={mainForm.getValues().FlatAreaUnit}
            Carpet={mainForm.getValues().Carpet}
            startForm={startForm}
          />
        );
      case 4:
        return (
          <ProjectStepFive
            key={'step5'}
            startForm={startForm}
            form={mainForm}
            imagesArray={imagesArray}
            videoArray={videoArray}
            handleVideoUpload={handleVideoUpload}
            imagesUrlArray={imagesUrlArray}
            videoUrlArray={videoUrlArray}
            handleImageUpload={handleImageUpload}
            handleDeleteImage={handleDeleteImage}
            handleDeleteVideo={handleDeleteVideo}
            browchureArray={browchureArray}
            browchureUrlArray={browchureUrlArray}
            handleBrochureUpload={handleBrochureUpload}
            handleDeleteBrowchuer={handleDeleteBrowchuer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box className={style.stepWrapper}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          variants={fadeInOutVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.1 }}
        >
          {getActiveStepComponent()}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default ProjectMainSection;
