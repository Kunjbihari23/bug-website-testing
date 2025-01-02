'use client';

import { Container, Grid, GridCol, LoadingOverlay } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import PropertyStepper from '../PropertyStepper/PropertyStepper';
import PropertyMainSection from './PropertyMainSection';
import NextPrevStep from '../NextPrevStep/NextPrevStep';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { useForm } from '@mantine/form';
import {
  useAddProperty,
  useGetUnableDisable,
  useGetUnableDisableAmenities,
} from '@/state/addProperty/addProperty.hook';
import { useSession } from 'next-auth/react';

const AddPropertyComponent = () => {
  const { activeStep } = useAddPropertyStore();

  // const amenities = {
  //   security: { value: '2', label: 'Security' },
  //   cctv: { value: '3', label: 'CCTV' },
  //   seniorCitizenPark: { value: '4', label: 'Senior Citizen Park' },
  //   childrenPark: { value: '5', label: 'Children Park' },
  //   clubHouse: { value: '6', label: 'Club House' },
  //   gasLine: { value: '7', label: 'GAS Line' },
  //   storeRoom: { value: '8', label: 'Store Room' },
  //   fireSafety: { value: '9', label: 'Fire Safety' },
  //   swimmingPool: { value: '11', label: 'Swimming Pool' },
  //   gym: { value: '12', label: 'Gym' },
  //   indoorGames: { value: '13', label: 'Indoor Games' },
  //   lift: { value: '14', label: 'Lift' },
  //   fountain: { value: '20', label: 'Fountain' },
  //   maintenanceStaff: { value: '23', label: 'Maintenance Staff' },
  //   gardenView: { value: '24', label: 'Garden View' },
  // };

  const startForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      PropertyCategoryID: '',
      PropertySubCategoryID: '',
    },
    validate: (values) => {
      if (activeStep === 0) {
        return {
          PropertyCategoryID: values.PropertyCategoryID === '' ? 'Property Type is required' : null,
          PropertySubCategoryID: values.PropertySubCategoryID === '' ? 'Property SubType is required' : null,
        };
      }
    },
  });

  const { data: unableData, isPending: unablePending } = useGetUnableDisable(
    startForm.getValues().PropertyCategoryID,
    startForm.getValues().PropertySubCategoryID
  );

  const { data: amenitiesData } = useGetUnableDisableAmenities(startForm.getValues().PropertySubCategoryID);

  const amenities =
    amenitiesData &&
    amenitiesData.map((item) => ({
      value: `${item.amenitiesID}`,
      label: `${item.amenitiesName}`,
    }));

  const formItemShow = unableData && unableData[0] ? unableData[0] : {};

  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesUrlArray, setImagesUrlArray] = useState([]);

  const [videoArray, setVideoArray] = useState([]);
  const [videoUrlArray, setvideoUrlArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accordionValue, setAccordionValue] = useState('room');

  const mainForm = useForm({
    initialValues: {
      RentOrSell: '',
      SubType: '',
      SubTypeNonAgri: '',
      CityID: '',
      LocalityID: '',
      address: '',
      HouseNo: '',
      Title: '',
      BedRooms: '',
      Washrooms: '',
      Hall: '',
      Kitchen: '',
      Balcony: '',
      LandorPlot: '0',
      FlatAreaUnit: '',
      SurveyNo: '',
      SuperBuildupPercentage: '',
      Carpet: '',
      UnitofAreaId: '',
      Ba_PlotCarpet: '',
      Ba_PlotArea: '',
      Ba_PlotAreaUnit: '',
      Ba_PlotSuperBuildupPercentage: '',
      TotalFloor: '',
      PropertyFloor: '',
      facing: '',
      Avaibility: '',
      AgeofProperty: '',
      Possession_Date: new Date(),
      Pujaroom: 0,
      StudyRoom: 0,
      ServentRoom: 0,
      StoreRoom: 0,
      Furnished: '',
      Amenities: [],
      placenearby: '',
      keyHighlights1: '',
      keyHighlights2: '',
      keyHighlights3: '',
      keyHighlights4: '',
      SecurityFireAlarm: 0,
      PowerBackup: 0,
      CarParking: '',
      RateRentValue: '',
      AllpriceIncluded: false,
      IsNegotiable: '',
      Maintenance: '',
      Maintenance_MonthYear: '',
      Expected_Rental: '',
      Booking_Amount: '',
      RentDepositAmount: '',
      RentNoticePeriod: '',
      Description: '',
      FileAttach: '',
      VideoFile: '',
    },
    validate: (values) => {
      const error = {};

      if (activeStep === 0) {
        // error.RentOrSell = values.RentOrSell === '' ? 'Rent or Sell is required' : null;
        if (formItemShow?.isAgriType) {
          error.SubType = values.SubType === '' ? 'Subtype Agri is required' : null;
        }
        if (formItemShow?.isSubTypeAgri) {
          error.SubTypeNonAgri = values.SubTypeNonAgri === '' ? 'Subtype Non-Agri is required' : null;
        }
      } else if (activeStep === 1) {
        error.CityID = values.CityID.trim() === '' ? 'City ID is required' : null;
        error.LocalityID = values.LocalityID.trim() === '' ? 'Locality ID is required' : null;
        if (formItemShow?.isBuildingName)
          error.address = values.address.trim() === '' ? 'Building Name is required' : null;
        if (formItemShow?.isHouseNo) error.HouseNo = values.HouseNo.trim() === '' ? 'House No is required' : null;
      } else if (activeStep === 2) {
        error.Title = values.Title.trim() === '' ? 'Title is required' : null;
        error.keyHighlights1 = values.keyHighlights1.trim() === '' ? 'keyHighlights1 is required' : null;
        error.keyHighlights2 = values.keyHighlights2.trim() === '' ? 'keyHighlights2 is required' : null;
        error.keyHighlights3 = values.keyHighlights3.trim() === '' ? 'keyHighlights3 is required' : null;
        error.keyHighlights4 = values.keyHighlights4.trim() === '' ? 'keyHighlights4 is required' : null;
        // if (formItemShow?.isNoOfBedrooms) {
        //   error.BedRooms = values.BedRooms.trim() === '' ? 'No of Bedrooms is required' : null;
        // }
        // if (formItemShow?.isNoOfWashrooms) {
        //   error.Washrooms = values.Washrooms.trim() === '' ? 'No of Washrooms is required' : null;
        // }
        // if (formItemShow?.isNoOfHall) {
        //   error.Hall = values.Hall.trim() === '' ? 'No of Hall is required' : null;
        // }
        // if (formItemShow?.isNoOfKitchen) {
        //   error.Kitchen = values.Kitchen.trim() === '' ? 'No of Kitchen is required' : null;
        // }
        // if (formItemShow?.isNoOfBalcony) {
        //   error.Balcony = values.Balcony.trim() === '' ? 'No of Balcony is required' : null;
        // }

        // if (formItemShow?.isPlotType) {
        //   error.LandorPlot = values?.LandorPlot === '' ? 'Plot type is required' : null;
        //   error.FlatAreaUnit = values?.FlatAreaUnit === '' ? 'Flat Area Unit is required' : null;
        //   error.UnitofAreaId = values?.UnitofAreaId === '' ? 'Area Unit is required' : null;
        //   if (values?.LandorPlot === '1') {
        //     error.SurveyNo = values?.SurveyNo === '' ? 'Survey No is required' : null;
        //   } else {
        //     error.SuperBuildupPercentage === '' ? 'Super Buildup Percentage is required' : null;
        //   }
        // }

        // if (formItemShow?.isAreaDetails) {
        //   error.Carpet = values?.Carpet === '' ? 'Carpet area is required' : null;
        //   error.FlatAreaUnit = values?.FlatAreaUnit === '' ? 'Flat area is required' : null;
        //   error.UnitofAreaId = values?.UnitofAreaId === '' ? 'Unit of Area is required' : null;
        //   error.SuperBuildupPercentage =
        //     values?.SuperBuildupPercentage === '' ? 'Super Buildup percentage is required' : null;
        // }
        // if (formItemShow?.isPlotDeatils) {
        //   error.Ba_PlotCarpet = values?.Ba_PlotCarpet === '' ? 'Plot Carpet area is required' : null;
        //   error.Ba_PlotArea = values?.Ba_PlotArea === '' ? 'Plot Area is required' : null;
        //   error.Ba_PlotAreaUnit = values?.Ba_PlotAreaUnit === '' ? 'Plot area is required' : null;
        //   error.Ba_PlotSuperBuildupPercentage =
        //     values?.Ba_PlotSuperBuildupPercentage === '' ? 'Plot Super Buildup percentage is required' : null;
        // }
        // if (formItemShow?.isFloorDetails) {
        //   error.TotalFloor =
        //     values?.TotalFloor === ''
        //       ? 'Total Floor is required'
        //       : values?.TotalFloor < 0
        //         ? 'Total Floor must be a positive value'
        //         : null;
        //   error.PropertyFloor = values?.PropertyFloor === '' ? 'Property Floor is required' : null;
        // }
        // if (formItemShow?.isFacing && values?.RentOrSell !== '2') {
        //   error.facing = values?.facing === '' ? 'Facing is required' : null;
        // }
        // if (formItemShow?.isAvaibilityStatus) {
        //   error.Avaibility = values?.Avaibility === '' ? 'Avaibility is required' : null;
        // }

        // if (formItemShow?.isAgeOfProperty) {
        //   error.AgeofProperty =
        //     values?.AgeofProperty === null || values?.AgeofProperty === '' ? 'Property Age is required' : null;
        // }
        // if (formItemShow?.isFurnish) {
        //   error.Furnished = values?.Furnished === '' ? 'Furnished Status is required' : null;
        // }

        // if (formItemShow?.isReserveParking) {
        //   error.CarParking = values?.CarParking === '' ? 'Reserve Parking is required' : null;
        // }
      } else if (activeStep === 3) {
        error.RateRentValue = values?.RateRentValue === '' ? 'Price Details is required' : null;
        // if (formItemShow?.isMaintance && values?.RentOrSell !== '2') {
        //   error.Maintenance = values?.Maintenance === '' ? 'Maintenance is required' : null;
        //   error.Maintenance_MonthYear =
        //     values?.Maintenance_MonthYear === '' ? 'Maintenance Month Year is required' : null;
        // }
        // if (formItemShow?.isExpectedRental && values?.RentOrSell !== '2') {
        //   error.Expected_Rental = values?.Expected_Rental === '' ? 'Expected Rental is required' : null;
        // }
        // if (formItemShow?.isBookingAmount && values?.RentOrSell !== '2') {
        //   error.Booking_Amount = values?.Booking_Amount === '' ? 'Booking Amount is required' : null;
        // }
        // if (formItemShow?.isAmountOfDeposit) {
        //   error.RentDepositAmount = values?.RentDepositAmount === '' ? 'Rent Deposit Amount is required' : null;
        // }
        // if (formItemShow?.isNoticePeriod) {
        //   error.RentNoticePeriod = values?.RentNoticePeriod === '' ? 'Rent Notice Period is required' : null;
        // }
        error.Description = values?.Description.trim() === '' ? 'Description is required' : null;
      }
      // else if (activeStep === 4) {
      //   if (!coverImage && !coverImageUrl) {
      //     error.coverImageFile = 'Please upload Cover image';
      //   }
      //   if (imagesArray.length < 2) {
      //     error.FileAttach = 'Please upload at least 2 images';
      //   }
      //   if (imagesArray.length > 9) {
      //     error.FileAttach = 'Please upload at 10 images Only';
      //   }
      // }
      console.log('Error :', error);
      return error;
    },
  });

  useEffect(() => {
    if (imagesUrlArray.length > 0) {
      mainForm.setFieldValue('FileAttach', imagesUrlArray);
    }
    if (videoUrlArray.length > 0) {
      mainForm.setFieldValue('VideoAttach', videoUrlArray);
    }
  }, [imagesUrlArray, videoUrlArray]);

  const handleImageUpload = (value) => {
    setImagesArray((prevImagesArray) => [...prevImagesArray, ...value]);
    const images = value.map((file) => URL.createObjectURL(file));
    setImagesUrlArray((prevImagesUrlArray) => [...prevImagesUrlArray, ...images]);
  };
  const handleCoverImageUpload = (value) => {
    if (value && value.length > 0) {
      const file = value[0];
      setCoverImage(file);
      setCoverImageUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteCoverImage = () => {
    setCoverImage(null);
    setCoverImageUrl('');
  };

  const handleVideoUpload = (value) => {
    setVideoArray((prevVideoArray) => [...prevVideoArray, ...value]);
    const videos = value.map((file) => URL.createObjectURL(file));
    setvideoUrlArray((prevVideoUrlArray) => [...prevVideoUrlArray, ...videos]);
  };

  const handleDeleteImage = (index) => {
    setImagesArray(imagesArray.filter((_, i) => i !== index));
    setImagesUrlArray(imagesUrlArray.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = (index) => {
    setVideoArray(videoArray.filter((_, i) => i !== index));
    setvideoUrlArray(videoUrlArray.filter((_, i) => i !== index));
  };

  const handleToggle = (value) => {
    const updatedValues = mainForm.getValues().Amenities.includes(value)
      ? mainForm.getValues().Amenities.filter((item) => item !== value)
      : [...mainForm.getValues().Amenities, value];

    mainForm.setFieldValue('Amenities', updatedValues);
  };

  const { data: sessionClient } = useSession();

  const { mutate, isPending: isPropertyPending } = useAddProperty();

  const propertyTypeChanged = (isMainTypeChanged) => {
    if (isMainTypeChanged) {
      startForm.setFieldValue('PropertySubCategoryID', '');
    }
    mainForm.reset();
  };

  const scrollToError = () => {
    setTimeout(() => {
      const errorKeys = Object.keys(mainForm.errors);
      const errorSelectors = [
        '.mantine-TextInput-error',
        '.mantine-NumberInput-error',
        '.custom-error-form',
        '.mantine-RadioGroup-error',
        '.mantine-Select-error',
      ];
      if (
        Object.keys(mainForm.errors).length === 2 &&
        errorKeys.includes('CarParking') &&
        errorKeys.includes('Furnished')
      ) {
        setAccordionValue('amenities');
      }
      const errorElements = errorSelectors.map((selector) => document.querySelector(selector)).filter(Boolean);

      if (errorElements.length > 0) {
        const firstErrorElement = errorElements.reduce((first, current) => {
          return first.getBoundingClientRect().top < current.getBoundingClientRect().top ? first : current;
        });

        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSubmit = (skipValidation = false) => {
    if (mainForm.validate().hasErrors) {
      return;
    }

    const startFormValues = startForm.getValues();

    const formValues = mainForm.getValues();

    const keyHighlightsArray = [
      formValues.keyHighlights1,
      formValues.keyHighlights2,
      formValues.keyHighlights3,
      formValues.keyHighlights4,
    ].join(',');

    const formData = new FormData();

    formData.append('id', 0);
    formData.append('PropertyTypeId', 1);
    formData.append('PropertyCategoryID', Number(startFormValues.PropertyCategoryID));
    formData.append('PropertySubCategoryID', Number(startFormValues.PropertySubCategoryID));
    formData.append('RentOrSell', Number(formValues.RentOrSell));
    {
      formItemShow?.isAgriType ? formData.append('SubType', Number(formValues.SubType)) : formData.append('SubType', 0);
    }
    formData.append('SubTypeAgri', 0);
    {
      formItemShow?.isSubTypeAgri
        ? formData.append('SubTypeNonAgri', Number(formValues.SubTypeNonAgri))
        : formData.append('SubTypeNonAgri', 0);
    }
    formData.append('CityID', formValues.CityID);
    formData.append('LocalityID', formValues.LocalityID);
    {
      formItemShow?.isBuildingName ? formData.append('address', formValues.address) : formData.append('address', '');
    }
    {
      formItemShow?.isHouseNo ? formData.append('HouseNo', formValues.HouseNo) : formData.append('HouseNo', '');
    }

    formData.append('Title', formValues.Title);
    {
      formItemShow?.isNoOfBedrooms
        ? formData.append('BedRooms', Number(formValues.BedRooms))
        : formData.append('BedRooms', 0);
    }
    {
      formItemShow?.isNoOfWashrooms
        ? formData.append('Washrooms', Number(formValues.Washrooms))
        : formData.append('Washrooms', 0);
    }
    {
      formItemShow?.isNoOfHall ? formData.append('Hall', Number(formValues.Hall)) : formData.append('Hall', 0);
    }
    {
      formItemShow?.isNoOfKitchen
        ? formData.append('Kitchen', Number(formValues.Kitchen))
        : formData.append('Kitchen', 0);
    }
    {
      formItemShow?.isNoOfBalcony
        ? formData.append('Balcony', Number(formValues.Balcony))
        : formData.append('Balcony', 0);
    }
    if (formItemShow?.isPlotType) {
      formData.append('LandorPlot', Number(formValues.LandorPlot));
      formData.append('SurveyNo', Number(formValues.SurveyNo));
      formData.append('SuperBuildupPercentage', Number(formValues.SuperBuildupPercentage));
    } else {
      formData.append('LandorPlot', 0);
      formData.append('SurveyNo', 0);
      formData.append('SuperBuildupPercentage', 0);
    }

    if (formItemShow?.isPlotType || formItemShow?.isAreaDetails) {
      formData.append('UnitofAreaId', Number(formValues.UnitofAreaId));
    } else {
      formData.append('UnitofAreaId', 0);
    }

    if (formItemShow?.isAreaDetails) {
      formData.append('Carpet', Number(formValues.Carpet));
      formData.append('SuperBuildupPercentage', Number(formValues.SuperBuildupPercentage));
    } else {
      formData.append('Carpet', 0);
      formData.append('SuperBuildupPercentage', 0);
    }

    if (formItemShow?.isPlotType || formItemShow?.isAreaDetails) {
      formData.append('FlatAreaUnit', Number(formValues.FlatAreaUnit));
    } else {
      formData.append('FlatAreaUnit', 0);
    }

    if (formItemShow?.isPlotDeatils) {
      formData.append('Ba_PlotCarpet', Number(formValues.Ba_PlotAreaUnit));
      formData.append('Ba_PlotArea', Number(formValues.Ba_PlotArea));
      formData.append('Ba_PlotAreaUnit', Number(formValues.Ba_PlotCarpet));
      formData.append('Ba_PlotSuperBuildupPercentage', Number(formValues.Ba_PlotSuperBuildupPercentage));
    } else {
      formData.append('Ba_PlotCarpet', 0);
      formData.append('Ba_PlotArea', 0);
      formData.append('Ba_PlotAreaUnit', 0);
      formData.append('Ba_PlotSuperBuildupPercentage', 0);
    }

    if (formItemShow?.isFloorDetails) {
      formData.append('TotalFloor', Number(formValues.TotalFloor));
      formData.append('PropertyFloor', Number(formValues.PropertyFloor));
    } else {
      formData.append('TotalFloor', 0);
      formData.append('PropertyFloor', 0);
    }
    if (formItemShow?.isFacing) {
      formData.append('facing', formValues.facing);
    } else {
      formData.append('facing', '');
    }

    formData.append('Avaibility', formItemShow?.isAvaibilityStatus ? Number(formValues.Avaibility) : 0);
    formData.append('AgeofProperty', formItemShow?.isAgeOfProperty ? Number(formValues.AgeofProperty) : 0);
    if (Number(formValues.Avaibility) !== 1) {
      formData.append('Possession_Date', formValues.Possession_Date.toISOString());
    }

    if (formItemShow?.isOtherRoom) {
      formData.append('Pujaroom', Number(formValues.Pujaroom) === 1 ? true : false);
      formData.append('StudyRoom', Number(formValues.StudyRoom) === 1 ? true : false);
      formData.append('ServentRoom', Number(formValues.ServentRoom) === 1 ? true : false);
      formData.append('StoreRoom', Number(formValues.StoreRoom) === 1 ? true : false);
    } else {
      formData.append('Pujaroom', false);
      formData.append('StudyRoom', false);
      formData.append('ServentRoom', false);
      formData.append('StoreRoom', false);
    }

    formData.append('Furnished', formItemShow?.isFurnish ? Number(formValues.Furnished) : 0);

    formData.append('Amenities', formItemShow?.isAmenities ? formValues.Amenities.toString() : '');

    if (formItemShow?.isSafety) {
      formData.append('SecurityFireAlarm', Number(formValues.SecurityFireAlarm) === 1 ? true : false);
      formData.append('PowerBackup', Number(formValues.PowerBackup) === 1 ? true : false);
    } else {
      formData.append('SecurityFireAlarm', false);
      formData.append('PowerBackup', false);
    }

    formData.append('CarParking', formItemShow?.isReserveParking ? Number(formValues.CarParking) : 0);
    formData.append('placenearby', Array.isArray(formValues.placenearby) ? formValues.placenearby.join(',') : null);

    formData.append('RateRentValue', Number(formValues.RateRentValue));
    formData.append('AllpriceIncluded', Number(formValues.AllpriceIncluded));
    formData.append('IsNegotiable', Number(formValues.IsNegotiable) === 1 ? true : false);
    formData.append('Maintenance', formItemShow?.isMaintance ? Number(formValues.Maintenance) : 0);
    formData.append('Maintenance_MonthYear', formItemShow?.isMaintance ? formValues.Maintenance_MonthYear : '');
    formData.append('Expected_Rental', formItemShow?.isExpectedRental ? Number(formValues.Expected_Rental) : 0);
    formData.append('Booking_Amount', formValues.RentOrSell !== '2' ? Number(formValues.Booking_Amount) : 0);
    formData.append('RentDepositAmount', formValues.RentOrSell === '2' ? Number(formValues.RentDepositAmount) : 0);
    formData.append('RentNoticePeriod', formValues.RentOrSell === '2' ? Number(formValues.RentNoticePeriod) : 0);

    formData.append('Description', formItemShow?.isDescription ? formValues.Description : '');
    formData.append('CreatedBy', Number(sessionClient.user?.id));
    if (formValues.RentOrSell === '1') {
      formData.append('Launch_Date', new Date().toISOString());
    }
    formData.append('Keyhighlights', keyHighlightsArray);

    // formData.append('IsVerify', 0);
    // formData.append('Views', false);
    // formData.append('Sitting  ', '');
    // formData.append('Cabin', false);
    // formData.append('Pantry', false);
    // formData.append('Reception', false);
    // formData.append('Latitude', '0');
    // formData.append('Longitude', '0');
    // formData.append('PricePeracres', 0);
    // formData.append('IsSoldOrRentOut', false);
    // formData.append('AddNewLocality', false);
    // formData.append('LandMark', '');
    // formData.append('ModifiedBy', 0);
    // formData.append('IsActive', false);
    // formData.append('IsFeatured', false);

    if (imagesArray.length > 0) {
      for (let i = 0; i < imagesArray.length; i++) {
        formData.append(`FileAttach`, imagesArray[i]);
      }
    }
    if (videoArray.length > 0) {
      for (let i = 0; i < videoArray.length; i++) {
        formData.append(`VideoFile`, videoArray[i]);
      }
    }

    if (coverImage) {
      formData.append('CoverFormFile', coverImage);
    }
    if (activeStep == 4 && imagesArray.length === 0) {
      setIsModalOpen(true);
    }
    if ((activeStep == 4 && imagesArray.length != 0 && !isModalOpen) || skipValidation == true) {
      mutate(formData);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAccordianChange = (value) => {
    setAccordionValue(value);
  };

  return (
    <Container size={'xl'}>
      <Grid justify="stretch" gutter={30} pt={30}>
        <GridCol span={{ xs: 12, sm: 4, md: 3, xl: 3 }}>
          <PropertyStepper />
        </GridCol>
        <GridCol
          span={{ xs: 12, sm: 8, md: 9, xl: 9 }}
          style={{
            position: 'relative',
          }}
        >
          <LoadingOverlay
            visible={isPropertyPending}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'pink', type: 'bars' }}
          />
          <PropertyMainSection
            amenities={amenities}
            activeStep={activeStep}
            mainForm={mainForm}
            startForm={startForm}
            coverImage={coverImage}
            coverImageUrl={coverImageUrl}
            handleCoverImageUpload={handleCoverImageUpload}
            handleDeleteCoverImage={handleDeleteCoverImage}
            imagesArray={imagesArray}
            imagesUrlArray={imagesUrlArray}
            videoArray={videoArray}
            videoUrlArray={videoUrlArray}
            handleImageUpload={handleImageUpload}
            handleVideoUpload={handleVideoUpload}
            handleDeleteImage={handleDeleteImage}
            handleDeleteVideo={handleDeleteVideo}
            handleToggle={handleToggle}
            formItemShow={formItemShow}
            propertyTypeChanged={propertyTypeChanged}
            accordionValue={accordionValue}
            handleAccordianChange={handleAccordianChange}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleSubmit={handleSubmit}
          />
        </GridCol>
        <NextPrevStep
          isLoading={isPropertyPending}
          scrollToError={scrollToError}
          handleSubmit={handleSubmit}
          form={mainForm}
          startForm={startForm}
        />
      </Grid>
    </Container>
  );
};

export default AddPropertyComponent;
