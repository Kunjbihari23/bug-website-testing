'use client';
import { useContactInquiry } from '@/state/Campaign/contactSanctum/contact.hook';
import { Button, Card, Checkbox, Grid, Input, Select, Stack, Textarea } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HeadingOne } from '../../CustomComponents/TypographyComponent/HeadingComponents';
import style from './sanctum.module.css';
import { notifications } from '@mantine/notifications';


const interestedOptions = ['4BHK TYPE-A', '4BHK TYPE-B', '4BHK TYPE-C'];

function ContactSection() {
  const [countries, setCountries] = useState([]);
  const [selectedCode, setSelectedCode] = useState('+91');
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const formattedCountries = data
          .map((country) => ({
            value: country.idd?.root + (country.idd?.suffixes?.[0] || ''),
            label: `${country.flag} ${country.idd?.root}${country.idd?.suffixes?.[0] || ''}`,
          }))
          .filter((item) => item.value); 
        const uniqueCountries = Array.from(new Map(formattedCountries.map((item) => [item.value, item])).values());

        setCountries(uniqueCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName:'',
    Email: '',
    MobileNo: '',
    IntrestedIn: '',
    TermAndCondition:'',
  
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const [errors, setErrors] = useState({
    FirstName: '',
    LastName:'',
    Email: '',
    MobileNo: '',
    IntrestedIn: '',
    TermAndCondition: '',
  });

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.FirstName.trim()) newErrors.FirstName = 'First Name is required';
    if (!formData.Email.trim() || !emailRegex.test(formData.Email)) newErrors.Email = 'Enter a valid email address';
    if (!formData.MobileNo.trim() || !mobileRegex.test(formData.MobileNo))  newErrors.MobileNo = 'Enter 10 digit mobile number';
    if (!formData.IntrestedIn) newErrors.IntrestedIn = 'Please select Intrested In';
    if (!checkboxChecked) newErrors.TermAndCondition = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    if (field === "MobileNo") {
      if (value.length > 10) return; 
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };
  const validateMobileNo = () => {
    if (formData.MobileNo.length !== 10) {
      message.error("Mobile number must be exactly 10 digits!");
      return false;
    }
    return true;
  };
  const { mutate: postContactData } = useContactInquiry((data) => {
    if (data?.statusCode === 200) {
      notifications.show({
        message: data?.message,
        color: 'green',
      });
    } else if (data?.error) {
      notifications.show({
        message: data?.message,
        color: 'red',
      });
    }
  });
  const handleSubmit = () => {
    if (validate() && validateMobileNo()) {
      let payload={
        FirstName:formData?.FirstName,
        LastName:formData?.LastName,    
        EnquiryEmail:formData?.Email,
        MobileNo:`${selectedCode}${formData?.MobileNo}` ,   
        IntrestedIn:formData?.IntrestedIn  ,  
        Comments:formData?.Comments , 
        TermAndCondition:formData?.TermAndCondition,
        CampaignURL: window.location.href,
        }
        console.log(payload);
        postContactData(payload)
    }
  };
  const handleSelectChange = (value) => {
    setSelectedCode(value);
  };
  return (
    <div>
      <div id="contact-section" className={style.contact_section}>
        <Card shadow="sm" withBorder className={style.contact_card}>
          <HeadingOne fontWeight={700}>GET IN TOUCH</HeadingOne>
          <Stack>
            <Grid justify="center" align="center">
              <Grid.Col span={{ xs: 12, sm: 4 }}>
                <Input
                  placeholder="First Name*"
                  value={formData.FirstName}
                  onChange={(e) => handleChange('FirstName', e.target.value)}
                />
                {errors.FirstName && (
                  <p className={style.errorMsg} size="sm">
                    {errors.FirstName}
                  </p>
                )}
              </Grid.Col>
              <Grid.Col span={{ xs: 12, sm: 4 }}>
                <Input placeholder="Last Name" value={formData.LastName}   onChange={(e) => handleChange('LastName', e.target.value)}/>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, sm: 4 }}>
                <Input
                  placeholder="Email*"
                  value={formData.Email}
                  onChange={(e) => handleChange('Email', e.target.value)}
                />
                {errors.Email && (
                  <p className={style.errorMsg} size="sm">
                    {errors.Email}
                  </p>
                )}
              </Grid.Col>
              <Grid.Col span={{ xs: 12, sm: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Select
                    data={countries}
                    value={selectedCode}
                    onChange={handleSelectChange}
                    placeholder="Code"
                    className={style.selectFlag}
                    disabled='true'
                  />
                  <Input
                    type='number'
                    placeholder="Mobile Number*"
                    value={formData.MobileNo}
                    onChange={(e) => handleChange('MobileNo', e.target.value)}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                      handleChange('MobileNo', e.target.value); // Update formData after filtering
                    }}
                    style={{ flex: 1 }}
                  />
                </div>
                {errors.MobileNo && (
                  <p className={style.errorMsg} size="sm">
                    {errors.MobileNo}
                  </p>
                )}
              </Grid.Col>
              <Grid.Col span={{ xs: 12, sm: 6 }}>
                <Select
                  placeholder="Select Interested In"
                  data={interestedOptions}
                  value={formData.IntrestedIn}
                  onChange={(value) => handleChange('IntrestedIn', value || '')}
                />
                {errors.IntrestedIn && (
                  <p className={style.errorMsg} size="sm">
                    {errors.IntrestedIn}
                  </p>
                )}
              </Grid.Col>
              <Grid.Col span={{ xs: 12, sm: 12 }}>
                <Textarea placeholder="Comments" autosize minRows={4} value={formData.Comments}
                    onChange={(e) => handleChange('Comments', e.target.value)}/>
              </Grid.Col>
              <Grid.Col span={{ xs: 12, sm: 12 }}>
                <Checkbox
                  checked={checkboxChecked}
                  value={formData.TermAndCondition}
                    onChange={(e) => {handleChange('TermAndCondition', e.target.checked)
                      setCheckboxChecked(e.target.checked)
                    }}
                  label={
                    <>
                      I agree with Shivalik’s <Link href="/">terms and conditions</Link>.
                    </>
                  }
                />
                {errors.TermAndCondition && (
                  <p className={style.checkerrorMsg} size="sm">
                    {errors.TermAndCondition}
                  </p>
                )}
              </Grid.Col>
              <Grid.Col span={{ xs: 12, sm: 12 }}>
                <Button variant="filled" onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>
      </div>
    </div>
  );
}

export default ContactSection;
