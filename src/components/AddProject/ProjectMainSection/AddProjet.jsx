'use client';

import { Container, Grid, GridCol, LoadingOverlay } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import ProjectStepper from '../ProjectStepper/ProjectStepper';
import ProjectMainSection from './ProjectMainSection';
import NextPrevStep from '../NextPrevStep/NextPrevStep';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { useForm } from '@mantine/form';
import { useAddProperty, useGetUnableDisable } from '@/state/addProperty/addProperty.hook';
import { useSession } from 'next-auth/react';
import { useAmenityListMaster, useSubCategoryAmenityList } from '@/state/amenityMaster/amenityMaster.hook';
import { usePostAddProject } from '@/state/addProject/addProject.hook';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { primary_color } from '@/constant/FontColotConstant';

const AddProjet = () => {
  const router = useRouter();
  const { data: sessionClient } = useSession();

  useEffect(() => {
    toggle();
    if (sessionClient && sessionClient !== null && sessionClient !== undefined) {
      if (sessionClient.user && sessionClient.user.userType !== '3') {
        router.push(`/`);
        return;
      }
      router.push(`/`);
      return;
    } else {
      toggle();
    }
  }, [sessionClient]);

  const { activeStep, resetStep } = useAddPropertyStore();
  const [visible, { toggle }] = useDisclosure(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesUrlArray, setImagesUrlArray] = useState([]);
  const [videoArray, setVideoArray] = useState([]);
  const [videoUrlArray, setvideoUrlArray] = useState([]);
  const [browchureArray, setBrowchureArray] = useState([]);
  const [browchureUrlArray, setBrowchureUrlArray] = useState([]);

  const startForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      PropertyCategories: [],
      PropertySubCategories: [],
    },
    validate: (values) => {
      if (activeStep === 0) {
        return {
          PropertyCategories:
            values.PropertyCategories && values.PropertyCategories.length == 0 ? 'Property Type is required' : null,
          PropertySubCategories:
            values.PropertySubCategories && values.PropertySubCategories.length == 0
              ? 'Property SubType is required'
              : null,
        };
      }
    },
  });

  const mainForm = useForm({
    initialValues: {
      ProjectId: 0,
      ReraNumber: '',
      Title: '',
      CityID: '',
      LocalityID: '',
      LandMark: '',
      AppartmentSociety: '',
      NoOfTower: '',
      Latitude: '',
      Longitude: '',
      Avaibility: '',
      AgeOfProject: '',
      DateOfPossession: new Date(),
      Amenities: [],
      Description: '',
      IsActive: '',
      TaxPrice: false,
      IsSoldOut: false,
      UnitDetails: [],
      Negotiable: false,
      Carpet: '',
      UnitAreaId: '',
      PropertyType: '',
      PricePerUnit: '',
      Sitting: '',
      Security: '',
      CCTV: '',
      SCPark: '',
      CPark: '',
      ClubHouse: '',
      GASLine: '',
      StoreRoom: '',
      FireSafety: '',
      WaitingLounge: '',
      SwimmingPool: '',
      Gym: '',
      IndoorGames: '',
      CommonConference: '',
      PowerBackup: '',
      Wify: '',
      Cafeteria: '',
      SaunaBath: '',
      Spa: '',
      Fountaion: '',
      Golf: '',
      BanquetHall: '',
      PoolTable: '',
      SquashCourt: '',
      HighSpeedElevators: '',
      DateCreated: '',
      CreatedBy: '',
      Lift: '',
      keyHighlights1: '',
      keyHighlights2: '',
      keyHighlights3: '',
      keyHighlights4: '',
    },
    validate: (values) => {
      const error = {};
      if (activeStep === 0) {
        error.Title = values.Title.trim() === '' ? 'Title is required' : null;
        error.ReraNumber = values.ReraNumber === '' ? 'Rera Number is required' : null;
      } else if (activeStep === 1) {
        error.CityID = values.CityID.trim() === '' ? 'City ID is required' : null;
        error.LocalityID = values.LocalityID.trim() === '' ? 'Locality ID is required' : null;
      } else if (activeStep === 2) {
        error.Description = values?.Description.trim() === '' ? 'Description is required' : null;
        error.Avaibility = values?.Avaibility === '' ? 'Avaibility status is required' : null;
        error.AgeOfProject = values?.AgeOfProject === '' ? 'Project Age is required' : null;
      } else if (activeStep === 4) {
        if (imagesArray.length === 0) {
          error.FileAttach = 'Please upload image';
        }
        if (videoArray.length === 0) {
          error.VideoAttach = 'Please upload video';
        }
      }
      return error;
    },
  });

  const handelSuccessProject = () => {
    startForm.reset();
    mainForm.reset();
    resetStep();
    setImagesArray([]);
    setImagesUrlArray([]);
    setVideoArray([]);
    setvideoUrlArray([]);
    setBrowchureArray([]);
    setBrowchureUrlArray([]);
  };
  const { mutate } = usePostAddProject(handelSuccessProject);

  const handleImageUpload = (value) => {
    setImagesArray((prevImagesArray) => [...prevImagesArray, ...value]);
    const images = value.map((file) => URL.createObjectURL(file));
    setImagesUrlArray((prevImagesUrlArray) => [...prevImagesUrlArray, ...images]);
  };

  const handleVideoUpload = (value) => {
    setVideoArray((prevVideoArray) => [...prevVideoArray, ...value]);
    const videos = value.map((file) => URL.createObjectURL(file));
    setvideoUrlArray((prevVideoUrlArray) => [...prevVideoUrlArray, ...videos]);
  };

  const handleBrochureUpload = (value) => {
    setBrowchureArray((prevBrowchureArray) => [...prevBrowchureArray, ...value]);
    const browchure = value.map((file) => URL.createObjectURL(file));
    setBrowchureUrlArray((prevBrowchureUrlArray) => [...prevBrowchureUrlArray, ...browchure]);
  };

  const handleDeleteImage = (index) => {
    setImagesArray(imagesArray.filter((_, i) => i !== index));
    setImagesUrlArray(imagesUrlArray.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (index) => {
    setVideoArray(videoArray.filter((_, i) => i !== index));
    setvideoUrlArray(videoUrlArray.filter((_, i) => i !== index));
  };

  const handleDeleteBrowchuer = (index) => {
    setBrowchureArray(browchureArray.filter((_, i) => i !== index));
    setBrowchureUrlArray(browchureUrlArray.filter((_, i) => i !== index));
  };

  const isAmenitySelected = (value) => {
    const AmenityValues = mainForm.getValues().Amenities;
    if (AmenityValues && AmenityValues.includes(value)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    const startFormValues = startForm.getValues();
    const formValues = mainForm.getValues();
    const formData = new FormData();

    const selectedAmenityArr = formValues.Amenities;
    const formetedAmenity = selectedAmenityArr && selectedAmenityArr.map((data) => data).join(',');
    const formetedCategory = startFormValues.PropertyCategories.map((data) => data).join(',');
    const formetedSubCategory = startFormValues.PropertySubCategories.map((data) => data).join(',');

    formData.append('PropertyCategories', formetedCategory);
    formData.append('PropertySubCategories', formetedSubCategory);
    formData.append('ReraNumber', formValues.ReraNumber);
    formData.append('Title', formValues.Title);
    formData.append('CityID', formValues?.CityID);
    formData.append('LocalityID', formValues.LocalityID);
    formData.append('LandMark', formValues.LandMark);
    formData.append('AppartmentSociety', formValues.AppartmentSociety);
    formData.append('Avaibility', Number(formValues.Avaibility));
    formData.append('AgeOfProject', Number(formValues.AgeOfProject));
    formData.append('DateOfPossession', formValues.DateOfPossession ? formValues.DateOfPossession.toISOString() : null); // Convert date to ISO string
    formData.append('Amenities', selectedAmenityArr.length != 0 ? formetedAmenity : '');
    formData.append('Description', formValues.Description);
    formData.append('IsActive', formValues.IsActive === 'no' ? false : true);
    formData.append('IsSoldOut', formValues.IsSoldOut);
    formData.append('UnitDetails', formValues.UnitDetails.length > 0 ? JSON.stringify(formValues.UnitDetails) : '');
    formData.append('Negotiable', formValues.Negotiable);
    formData.append('CreatedBy', Number(sessionClient.user?.id));
    formData.append('DateCreated', new Date().toISOString());
    // id values are static according amenity mastes data
    formData.append('Security', isAmenitySelected(2) ? true : false);
    formData.append('CCTV', isAmenitySelected(3) ? true : false);
    formData.append('SCPark', isAmenitySelected(4) ? true : false);
    formData.append('CPark', isAmenitySelected(5) ? true : false);
    formData.append('ClubHouse', isAmenitySelected(6) ? true : false);
    formData.append('GASLine', isAmenitySelected(7) ? true : false);
    formData.append('StoreRoom', isAmenitySelected(8) ? true : false);
    formData.append('FireSafety', isAmenitySelected(9) ? true : false);
    formData.append('WaitingLounge', isAmenitySelected(10) ? true : false);
    formData.append('SwimmingPool', isAmenitySelected(11) ? true : false);
    formData.append('Gym', isAmenitySelected(12) ? true : false);
    formData.append('IndoorGames', isAmenitySelected(13) ? true : false);
    formData.append('CommonConference', isAmenitySelected(15) ? true : false);
    formData.append('PowerBackup', isAmenitySelected(2) ? true : false);
    formData.append('Wify', isAmenitySelected(16) ? true : false);
    formData.append('Cafeteria', isAmenitySelected(17) ? true : false);
    formData.append('SaunaBath', isAmenitySelected(18) ? true : false);
    formData.append('Spa', isAmenitySelected(19) ? true : false);
    formData.append('Fountaion', isAmenitySelected(20) ? true : false);
    formData.append('Golf', isAmenitySelected(21) ? true : false);
    formData.append('BanquetHall', isAmenitySelected(22) ? true : false);
    formData.append('Lift', isAmenitySelected(14) ? true : false);
    // these values are not managed by form side, here passed these default values
    formData.append('PoolTable', false); //default pass false
    formData.append('SquashCourt', false); //default pass false
    formData.append('HighSpeedElevators', false); //default pass false
    formData.append('Latitude', '0'); //default pass false
    formData.append('Longitude', '0'); //default pass false
    formData.append('Carpet', 1); //default pass 1
    formData.append('UnitAreaId', 1); //default pass 1
    formData.append('PricePerUnit', 0); //default pass 0
    formData.append('Sitting  ', 0); //default pass 0
    formData.append('TaxPrice', false); //default pass false
    formData.append('ProjectId', 0); //default pass false
    formData.append('PropertyType', 1); //default pass false
    formData.append('Keyhighlights');

    if (imagesArray.length > 0) {
      for (let i = 0; i < imagesArray.length; i++) {
        formData.append(`FileAttach[${i}]`, imagesArray[i]);
      }
    }
    if (videoArray.length > 0) {
      for (let i = 0; i < videoArray.length; i++) {
        formData.append(`VideoFile[${i}]`, videoArray[i]);
      }
    }
    if (browchureArray.length > 0) {
      for (let i = 0; i < browchureArray.length; i++) {
        formData.append(`Brochure`, browchureArray[i]);
      }
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + '----->' + pair[1]);
    }

    mutate(formData);
  };

  return (
    <Container size={'xl'}>
      <LoadingOverlay
        visible={visible}
        zIndex={100}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: '#14d1fa', type: 'bars' }}
      />
      <Grid justify="stretch" gutter={30} pt={30} mb={30}>
        <GridCol span={{ xs: 12, sm: 4, md: 3, xl: 3 }}>
          <ProjectStepper />
        </GridCol>
        <GridCol span={{ xs: 12, sm: 8, md: 9, xl: 9 }}>
          <ProjectMainSection
            activeStep={activeStep}
            mainForm={mainForm}
            startForm={startForm}
            imagesArray={imagesArray}
            imagesUrlArray={imagesUrlArray}
            videoArray={videoArray}
            videoUrlArray={videoUrlArray}
            handleImageUpload={handleImageUpload}
            handleVideoUpload={handleVideoUpload}
            handleDeleteImage={handleDeleteImage}
            handleDeleteVideo={handleDeleteVideo}
            browchureArray={browchureArray}
            browchureUrlArray={browchureUrlArray}
            handleBrochureUpload={handleBrochureUpload}
            handleDeleteBrowchuer={handleDeleteBrowchuer}
          />
        </GridCol>
        <NextPrevStep handleSubmit={handleSubmit} form={mainForm} startForm={startForm} />
      </Grid>
    </Container>
  );
};

export default AddProjet;
