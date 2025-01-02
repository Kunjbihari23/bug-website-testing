'use client';

import { Box } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import style from './PropertyMainSection.module.css';
import PropertyStepFive from './PropertyStepFive';
import PropertyStepFour from './PropertyStepFour';
import PropertyStepOne from './PropertyStepOne';
import PropertyStepThree from './PropertyStepThree';
import PropertyStepTwo from './PropertyStepTwo';

const fadeInOutVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const PropertyMainSection = ({
  amenities,
  activeStep,
  mainForm,
  startForm,
  handleImageUpload,
  handleVideoUpload,
  handleDeleteImage,
  handleDeleteVideo,
  coverImage,
  coverImageUrl,
  handleCoverImageUpload,
  handleDeleteCoverImage,
  handleToggle,
  imagesArray,
  imagesUrlArray,
  videoArray,
  videoUrlArray,
  formItemShow,
  propertyTypeChanged = () => {},
  accordionValue,
  handleAccordianChange,
  handleCoverImageEdit,
  isEdit = false,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}) => {
  const getActiveStepComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PropertyStepOne
            key={'step1'}
            form={mainForm}
            startForm={startForm}
            formItemShow={formItemShow}
            propertyTypeChanged={propertyTypeChanged}
            isEdit={isEdit}
          />
        );
      case 1:
        return <PropertyStepTwo key={'step2'} form={mainForm} formItemShow={formItemShow} isEdit={isEdit} />;
      case 2:
        return (
          <PropertyStepThree
            key={'step3'}
            amenities={amenities}
            form={mainForm}
            handleToggle={handleToggle}
            formItemShow={formItemShow}
            accordionValue={accordionValue}
            handleAccordianChange={handleAccordianChange}
            isEdit={isEdit}
          />
        );
      case 3:
        return (
          <PropertyStepFour
            key={'step4'}
            form={mainForm}
            FlatAreaUnit={mainForm.getValues().FlatAreaUnit}
            UnitofAreaId={mainForm.getValues().UnitofAreaId}
            formItemShow={formItemShow}
            isEdit={isEdit}
          />
        );
      case 4:
        return (
          <PropertyStepFive
            key={'step5'}
            imagesArray={imagesArray}
            form={mainForm}
            videoArray={videoArray}
            handleVideoUpload={handleVideoUpload}
            handleCoverImageUpload={handleCoverImageUpload}
            handleDeleteCoverImage={handleDeleteCoverImage}
            coverImage={coverImage}
            coverImageUrl={coverImageUrl}
            imagesUrlArray={imagesUrlArray}
            videoUrlArray={videoUrlArray}
            handleImageUpload={handleImageUpload}
            handleDeleteImage={handleDeleteImage}
            handleDeleteVideo={handleDeleteVideo}
            handleCoverImageEdit={handleCoverImageEdit}
            isEdit={isEdit}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleSubmit={handleSubmit}
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

export default PropertyMainSection;
