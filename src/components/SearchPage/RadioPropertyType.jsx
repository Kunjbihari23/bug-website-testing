import React, { useEffect } from 'react';
import { Accordion, Radio, RadioGroup } from '@mantine/core';
import { RegularBigFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import style from './search.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { secondary_dark } from '@/constant/FontColotConstant';

function RadioPropertyType({ filterData, selectedValue, setSelectedValue, selectedChips, setSelectedChips }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const value = searchParams.get('PropertyCategoryID');
    if (value !== null) {
      const selectedOption = filterData.find((status) => status.value === value);
      if (selectedOption) {
        setSelectedValue(selectedOption);
      }
    } else {
      setSelectedValue(null);
    }
  }, [searchParams, setSelectedValue, selectedValue, filterData]);

  const handleFilterChange = (value) => {
    const selectedOption = filterData.find((status) => status.value === value);
    setSelectedValue(selectedOption);

    const updatedChips = {
      ...selectedChips,
      PropertyCategoryID: selectedOption ? selectedOption.value : null,
    };
    updatedChips.ProSubCatIds = [];
    setSelectedChips(updatedChips);

    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedOption) {
      newParams.set('PropertyCategoryID', selectedOption.value);
    } else {
      newParams.delete('PropertyCategoryID');
    }
    newParams.delete('ProSubCatIds');

    let updatedPathname = window.location.pathname;
    const pathSegments = updatedPathname.split('/');

    if (pathSegments.length > 4) {
      if (value === '1') {
        pathSegments[4] = 'commercial';
      } else if (value === '2') {
        pathSegments[4] = 'residential';
      } else if (value === '3') {
        pathSegments[4] = 'land';
      } else {
        pathSegments[4] = '';
      }
    }

    updatedPathname = pathSegments.join('/');

    router.push(`${updatedPathname}?${newParams.toString()}`);
  };

  return (
    <Accordion defaultValue="propertyType">
      <Accordion.Item value="propertyType">
        <Accordion.Control className={style.accordion_header}>
          <RegularBigFont>Property Type</RegularBigFont>
        </Accordion.Control>
        <Accordion.Panel>
          <RadioGroup
            value={selectedValue ? selectedValue.value : ''}
            onChange={handleFilterChange}
            name="propertyType"
          >
            {filterData &&
              filterData.map((status) => (
                <Radio
                  key={status.value}
                  value={status.value}
                  label={status.label}
                  size="sm"
                  m={5}
                  checked={selectedValue?.value === status.value}
                  color={secondary_dark}
                  styles={{
                    label: {
                      cursor: 'pointer',
                    },
                    radio: {
                      cursor: 'pointer',
                    },
                  }}
                />
              ))}
          </RadioGroup>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default RadioPropertyType;
