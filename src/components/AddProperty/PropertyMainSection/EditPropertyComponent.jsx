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
import { propertyDeatilApi } from '@/state/property/property.api';
import { usePropertyDeatilApi } from '@/state/property/property.hook';
import axios from 'axios';

const EditPropertyComponent = ({ propertyId }) => {
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

  const detailParam = {
    PropertyId: propertyId,
    Property_Project: 0,
  };
  const { data: propertyDetail, isPending } = usePropertyDeatilApi(detailParam);

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

  const [imagesArray, setImagesArray] = useState([]);
  const [imagesUrlArray, setImagesUrlArray] = useState([]);

  const [videoArray, setVideoArray] = useState([]);
  const [videoUrlArray, setvideoUrlArray] = useState([]);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState();
  const [accordionValue, setAccordionValue] = useState('room');

  const mainForm = useForm({
    initialValues: {
      IsSoldOrRentOut: false,
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
      coverImage: '',
      keyHighlights1: '',
      keyHighlights2: '',
      keyHighlights3: '',
      keyHighlights4: '',
    },
    validate: (values) => {
      const error = {};

      if (activeStep === 0) {
        error.RentOrSell = values.RentOrSell === '' ? 'Rent or Sell is required' : null;
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
        //   error.AreaUnit = values?.AreaUnit === '' ? 'Area Unit is required' : null;
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
        //   error.TotalFloor = values?.TotalFloor === '' ? 'Total Floor is required' : null;
        //   error.PropertyFloor = values?.PropertyFloor === '' ? 'Property Floor is required' : null;
        // }
        // if (formItemShow?.isFacing && values?.RentOrSell !== '2') {
        //   error.facing = values?.facing == null || values?.facing == '' ? 'Facing is required' : null;
        // }
        // if (formItemShow?.isAvaibilityStatus) {
        //   error.Avaibility = values?.Avaibility === '' ? 'Avaibility is required' : null;
        // }
        // if (formItemShow?.isAgeOfProperty) {
        //   error.AgeofProperty =
        //     values?.AgeofProperty === null || values?.AgeofProperty === '' ? 'Property Age is required' : null;
        // }
        // if (formItemShow?.isPossessionDate) {
        //   error.Possession_Date = values?.Possession_Date === '' ? 'Possession Date is required' : null;
        // }

        // if (formItemShow?.isFurnish) {
        //   error.Furnished = values?.Furnished === '' ? 'Furnished Status is required' : null;
        // }
        // if (formItemShow?.isReserveParking) {
        //   error.CarParking = values?.CarParking === '' ? 'Reserve Parking is required' : null;
        // }
        // if (activeStep === 2) {
        //   error.placenearby = values.placenearby.length === 0 ? 'Please select at least one place nearby' : null;
        // }//before require
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
      } else if (activeStep === 4) {
        // if (!coverImage && !coverImageUrl) {
        //   error.coverImageFile = 'Please upload Cover image';
        // }
        // if (imagesArray.length === 0) {
        //   error.FileAttach = 'Please upload image';
        // }
        // if (videoArray.length === 0) {
        //   error.VideoAttach = 'Please upload video';
        // } //before require
      }
      return error;
    },
  });

  const convertUrlToFile = async (url, fileType) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      return { file: blob, blobUrl };
    } catch (error) {
      console.error('Error converting URL to File:', error);
      return null;
    }
  };

  const handleImageConversion = async (imageUrls) => {
    const results = await Promise.all(
      imageUrls.map(async (item) => {
        if (item.fileId) {
          return item;
        } else if (item instanceof File) {
          const blobUrl = URL.createObjectURL(item);
          return { file: item, blobUrl };
        }

        return null;
      })
    );

    setImagesArray(results);
    setImagesUrlArray(results);
  };

  const handleCoverImageEdit = (value1, value2) => {
    setCoverImage(value1);
    setCoverImageUrl(value2);
  };

  const handleVideoConversion = async (videoUrls) => {
    // const results = await Promise.all(videoUrls.map((url) => convertUrlToFile(url, 'video')));
    // const validResults = results.filter((result) => result !== null);

    setVideoArray(videoUrls);
    setvideoUrlArray(videoUrls);
  };

  useEffect(() => {
    if (propertyDetail) {
      startForm.setValues({
        PropertyCategoryID: propertyDetail.propertyCategoryID,
        PropertySubCategoryID: propertyDetail.propertySubCategoryID,
      });
      const sortedNearPlace =
        propertyDetail &&
        propertyDetail?.placesNearByModelList &&
        propertyDetail?.placesNearByModelList.map((item) => ({
          value: String(item.id),
          label: String(item.place_Name),
        }));

      const highlightsArray = propertyDetail?.keyhighlights ? propertyDetail.keyhighlights.split(',') : [];
      mainForm.setValues({
        IsSoldOrRentOut: propertyDetail?.isSoldOrRentOut,
        RentOrSell: propertyDetail?.rentOrSell?.toString(),
        SubType: propertyDetail?.subType?.toString(),
        SubTypeNonAgri: propertyDetail?.subTypeNonAgri?.toString(),
        CityID: propertyDetail?.cityID?.toString(),
        LocalityID: propertyDetail?.localityID?.toString(),
        address: propertyDetail?.address?.toString(),
        HouseNo: propertyDetail?.houseNo?.toString(),
        Title: propertyDetail?.title,
        BedRooms: propertyDetail?.bedRooms?.toString(),
        Washrooms: propertyDetail?.washrooms?.toString(),
        Hall: propertyDetail?.hall?.toString(),
        Kitchen: propertyDetail?.kitchen?.toString(),
        Balcony: propertyDetail?.balcony?.toString(),
        LandorPlot: propertyDetail?.landorPlot === 0 ? 0 : propertyDetail?.landorPlot?.toString(),
        FlatAreaUnit: propertyDetail?.flatAreaUnit?.toString(),
        UnitofAreaId: propertyDetail?.unitofAreaId?.toString(),
        SurveyNo: propertyDetail?.surveyNo,
        SuperBuildupPercentage: propertyDetail?.superBuildupPercentage,
        Carpet: propertyDetail?.carpet?.toString(),
        Ba_PlotCarpet: propertyDetail?.ba_PlotCarpet?.toString(),
        Ba_PlotArea: propertyDetail?.ba_PlotArea,
        Ba_PlotAreaUnit: propertyDetail?.ba_PlotAreaUnit?.toString(),
        Ba_PlotSuperBuildupPercentage: propertyDetail?.ba_PlotSuperBuildupPercentage,
        TotalFloor: propertyDetail?.totalFloor,
        PropertyFloor: propertyDetail?.propertyFloor?.toString(),
        facing: propertyDetail?.facing,
        Avaibility: propertyDetail?.avaibility?.toString(),
        AgeofProperty: propertyDetail?.ageofProperty?.toString(),
        Possession_Date: propertyDetail?.possession_Date?.length > 0 ? new Date(propertyDetail?.possession_Date) : '',
        Pujaroom: propertyDetail?.pujaroom === true ? 1 : 0,
        StudyRoom: propertyDetail?.studyRoom === true ? 1 : 0,
        ServentRoom: propertyDetail?.serventRoom === true ? 1 : 0,
        StoreRoom: propertyDetail?.storeRoom === true ? 1 : 0,
        Furnished: propertyDetail?.furnished,
        Amenities: propertyDetail?.amenities?.split(',') ?? [],
        SecurityFireAlarm: propertyDetail?.securityFireAlarm == true ? 1 : 0,
        PowerBackup: propertyDetail?.powerBackup === true ? 1 : 0,
        CarParking: propertyDetail?.carParking?.toString(),
        placenearby: sortedNearPlace ? sortedNearPlace.map((item) => String(item.value)) : [],
        RateRentValue: propertyDetail?.rateRentValue,
        AllpriceIncluded: propertyDetail?.allpriceIncluded,
        IsNegotiable: propertyDetail?.isNegotiable,
        Maintenance: propertyDetail?.maintenance,
        Maintenance_MonthYear: propertyDetail?.maintenance_MonthYear,
        Expected_Rental: propertyDetail?.expected_Rental,
        Booking_Amount: propertyDetail?.booking_Amount,
        RentDepositAmount: propertyDetail?.rentDepositAmount,
        RentNoticePeriod: propertyDetail?.rentNoticePeriod,
        Description: propertyDetail?.description,
        keyHighlights1: highlightsArray[0] || '',
        keyHighlights2: highlightsArray[1] || '',
        keyHighlights3: highlightsArray[2] || '',
        keyHighlights4: highlightsArray[3] || '',
      });
      const imageUrls = propertyDetail.imgLst.filter((item) => item.videoImage === 1); //.map((item) => item.filePath);
      const videoUrls = propertyDetail.imgLst.filter((item) => item.videoImage === 2); //.map((item) => item.filePath);

      handleCoverImageEdit(propertyDetail?.coverImage, propertyDetail?.coverImagePath);
      // setCoverImagePreview(propertyDetail?.coverImage);
      handleImageConversion(imageUrls);
      handleVideoConversion(videoUrls);
    }
  }, [propertyDetail]);

  useEffect(() => {
    if (imagesUrlArray.length > 0) {
      mainForm.setFieldValue('FileAttach', imagesUrlArray);
    }
    if (videoUrlArray.length > 0) {
      mainForm.setFieldValue('VideoAttach', videoUrlArray);
    }
  }, [imagesUrlArray, videoUrlArray]);

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

  const { mutate, isPending: isPropertyPending } = useAddProperty(true);

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
    // if (mainForm.validate().hasErrors) {
    //   return;
    // }

    const validationResult = mainForm.validate();

    if (validationResult.hasErrors) {
      console.log('Form validation :', validationResult.errors);
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
    formData.append('IsSoldOrRentOut', formValues.IsSoldOrRentOut);
    formData.append('id', Number(propertyId));
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
    // formData.append('AddNewLocality', false);
    // formData.append('LandMark', '');
    // formData.append('ModifiedBy', 0);
    // formData.append('IsActive', false);

    const imgList = [];
    const fileAttach = [];
    if (imagesArray.length > 0) {
      for (let i = 0; i < imagesArray.length; i++) {
        const imageItem = imagesArray[i];

        if (imageItem.fileId && imageItem.filePath) {
          imgList.push(imageItem);

          formData.append(`imgLst[${i}].fileId`, imageItem.fileId);
          formData.append(`imgLst[${i}].fileName`, imageItem.fileName);
          formData.append(`imgLst[${i}].filePath`, imageItem.filePath);
          formData.append(`imgLst[${i}].videoImage`, imageItem.videoImage || 0);
        } else {
          fileAttach.push(imageItem);
        }
      }
    }

    if (fileAttach.length) {
      for (let i = 0; i < fileAttach.length; i++) {
        formData.append(`FileAttach`, fileAttach[i]);
      }
    }

    const newVideo = [];
    if (videoArray.length > 0) {
      for (let i = 0; i < videoArray.length; i++) {
        const videoItem = videoArray[i];

        if (videoItem.fileId && videoItem.filePath) {
          imgList.push(videoItem);

          formData.append(`imgLst[${imgList.length + i}].fileId`, videoItem.fileId);
          formData.append(`imgLst[${imgList.length + i}].fileName`, videoItem.fileName);
          formData.append(`imgLst[${imgList.length + i}].filePath`, videoItem.filePath);
          formData.append(`imgLst[${imgList.length + i}].videoImage`, 2);
        } else {
          newVideo.push(videoItem);
        }
      }
    }

    if (newVideo.length) {
      for (let i = 0; i < newVideo.length; i++) {
        formData.append(`VideoAttach`, newVideo[i]);
      }
    }
    if (coverImage) {
      if (coverImage instanceof File) {
        formData.append('CoverFormFile', coverImage);
      } else {
        formData.append('CoverImage', coverImage);
      }
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
          <PropertyStepper isEdit />
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
            imagesArray={imagesArray}
            imagesUrlArray={imagesUrlArray}
            videoArray={videoArray}
            videoUrlArray={videoUrlArray}
            coverImage={coverImage}
            coverImageUrl={coverImageUrl}
            handleCoverImageEdit={handleCoverImageEdit}
            handleCoverImageUpload={handleCoverImageUpload}
            handleDeleteCoverImage={handleDeleteCoverImage}
            handleImageUpload={handleImageUpload}
            handleVideoUpload={handleVideoUpload}
            handleDeleteImage={handleDeleteImage}
            handleDeleteVideo={handleDeleteVideo}
            handleToggle={handleToggle}
            formItemShow={formItemShow}
            propertyTypeChanged={propertyTypeChanged}
            accordionValue={accordionValue}
            handleAccordianChange={handleAccordianChange}
            isEdit
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
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

export default EditPropertyComponent;
