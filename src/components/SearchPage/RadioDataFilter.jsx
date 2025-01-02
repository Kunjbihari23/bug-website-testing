import React, { useEffect } from 'react';
import { Accordion, Radio, RadioGroup } from '@mantine/core';
import { RegularBigFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import style from './search.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { secondary_dark } from '@/constant/FontColotConstant';

function RadioDataFilter({ filterData, selectedValue, setSelectedValue, selectedChips, setSelectedChips }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const value = searchParams.get('FURNISHED');
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
      FURNISHED: selectedOption ? selectedOption.value : null,
    };
    setSelectedChips(updatedChips);

    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedOption) {
      newParams.set('FURNISHED', selectedOption.value);
    } else {
      newParams.delete('FURNISHED');
    }

    router.push(`${window.location.pathname}?${newParams.toString()}`);
  };

  return (
    <Accordion defaultValue="furnishing_status">
      <Accordion.Item value="furnishing_status">
        <Accordion.Control className={style.accordion_header}>
          <RegularBigFont>Furnishing Status</RegularBigFont>
        </Accordion.Control>
        <Accordion.Panel>
          <RadioGroup value={selectedValue?.value} onChange={handleFilterChange}>
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

export default RadioDataFilter;
