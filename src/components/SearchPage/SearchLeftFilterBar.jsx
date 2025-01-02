'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import style from './search.module.css';
import { Accordion, Chip, Switch, Button, RangeSlider, Group, Select, Stack, Checkbox } from '@mantine/core';
import { IconCheck, IconInfoCircle, IconCurrencyRupee } from '@tabler/icons-react';
import { RegularBigFont, SmallFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import { lightgrey_font_color, secondary_dark } from '../../constant/FontColotConstant';
import RadioDataFilter from './RadioDataFilter';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePropertyType } from '@/state/SubCategorySearch/propertyType.hook';
import { useSubPropertyTypeFilter } from '@/state/SubCategorySearch/subPropertyType.hook';
import { formatCurrency } from '@/util/commonFunction';
import {
  constructionStatus,
  furnishingStatus,
  postedBy,
  balconies,
  bhk_type,
  bad_roomes,
  ageOfProperty,
} from './StaticFilterArray';
import AppliedFilters from './AppliedFilter';
import RadioPropertyType from './RadioPropertyType';

function SearchLeftFilterBar({ onFilter }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [propertiesType, setPropertiesType] = useState([]);
  const [subTypesOfProperties, setSubTypesOfProperties] = useState([]);
  const [verifiedPropertiesEnabled, setVerifiedPropertiesEnabled] = useState(false);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100000000);
  const [updatedMin, setUpdatedMin] = useState(0);
  const [updatedMax, setUpdatedMax] = useState(100000000);
  const [selectedFurnishing, setSelectedFurnishing] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [catID, setCatID] = useState(null);
  const [openItems, setOpenItems] = useState([]);

  const { data: listPropertyType, isLoading: loadingPropertyType } = usePropertyType([]);

  const [isProperty, setIsProperty] = useState(true);
  useEffect(() => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      const projectProperty = params.get('project_property');
      setIsProperty(projectProperty !== '1');
    }
  }, [searchParams]);

  const {
    data: listSubPropType,
    isLoading: loadingSubPropertyType,
    refetch,
  } = useSubPropertyTypeFilter({ CatID: catID });

  const updateCatID = useCallback((newCatID) => {
    setCatID(newCatID);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newCatID = params.get('PropertyCategoryID');
    if (newCatID !== catID) {
      updateCatID(newCatID);
    }
  }, [searchParams, catID, updateCatID]);

  useEffect(() => {
    if (catID !== null) {
      refetch();
    }
  }, [catID, refetch]);

  const generateBudgetData = (start, end, increment) => {
    const budgetData = [
      { value: '0', label: 'Min Budget' },
      ...Array.from({ length: Math.floor((end - start) / increment) + 1 }, (_, i) => {
        const value = start + i * increment;
        return value === 0
          ? null
          : {
              value: value.toString(),
              label: formatCurrency(value),
            };
      }).filter(Boolean),
    ];
    return budgetData;
  };

  const handleBudgetChange = (value, type) => {
    const newParams = new URLSearchParams(searchParams.toString());
    let newMin = type === 'min' ? parseInt(value) : updatedMin;
    let newMax = type === 'max' ? parseInt(value) : updatedMax;

    if (newMax - newMin < 500000) {
      type === 'min' ? (newMax = newMin + 500000) : (newMin = newMax - 500000);
    }

    newParams.set('minVal', newMin.toString());
    newParams.set('maxVal', newMax.toString());
    router.push(`${window.location.pathname}?${newParams.toString()}`);
    setUpdatedMin(newMin);
    setUpdatedMax(newMax);
  };

  useEffect(() => {
    if (!loadingPropertyType && listPropertyType) {
      const propertyCategoryNames = listPropertyType?.data.map((category) => ({
        label: category.propertyCategoryName,
        value: category.propertyCategoryID.toString(),
      }));

      setPropertiesType(propertyCategoryNames);
    }

    if (!loadingSubPropertyType && listSubPropType) {
      const propertySubCategoryNames = listSubPropType.data.map((category) => ({
        label: category.propertySubCategoryName,
        value: category.propertySubCategoryID.toString(),
      }));

      setSubTypesOfProperties(propertySubCategoryNames);
    }
  }, [listPropertyType, loadingPropertyType, listSubPropType, loadingSubPropertyType]);

  useEffect(() => {
    const initialOpenItems = Object.keys(categories).map((category) => category);
    setOpenItems(initialOpenItems);
  }, []);

  const handleAccordionChange = (value) => {
    setOpenItems(value);
  };

  const categories = {
    BHK: bhk_type,
    AVAIBILITY: constructionStatus,
    PostedBy: postedBy,
    BALCONIES: balconies,
    AGEOFPROP: ageOfProperty,
    BADROOM: bad_roomes,
    ProSubCatIds: subTypesOfProperties,
  };

  const categoryLabels = {
    BHK: 'BHK Type',
    AVAIBILITY: 'Availability',
    PostedBy: 'Posted By',
    BALCONIES: 'Balconies',
    AGEOFPROP: 'Age Of Property',
    BADROOM: 'Bedrooms',
    ProSubCatIds: 'Property Subcategory ',
  };

  const [selectedChips, setSelectedChips] = useState({
    BHK: [],
    AVAIBILITY: [],
    PostedBy: [],
    BALCONIES: [],
    BADROOM: [],
    ProSubCatIds: [],
    SFA: 0,
    PowerBackup: 0,
    rera: null,
    FURNISHED: null,
  });

  useEffect(() => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      const min = params.get('minVal');
      const max = params.get('maxVal');

      if (min !== null) {
        setUpdatedMin(parseInt(min));
      }
      if (max !== null) {
        setUpdatedMax(parseInt(max));
      }
    }
  }, [searchParams]);

  const handleRangeSliderChange = ([minVal, maxVal]) => {
    setUpdatedMin(minVal);
    setUpdatedMax(maxVal);
    const newParams = new URLSearchParams(searchParams.toString());
    minVal !== undefined ? newParams.set('minVal', minVal) : newParams.delete('minVal');
    maxVal !== undefined ? newParams.set('maxVal', maxVal) : newParams.delete('maxVal');
    router.push(`${window.location.pathname}?${newParams.toString()}`);
  };

  const VerifiedPropertiesItem = () => {
    const handleSwitchChange = (event) => {
      const isEnabled = event.currentTarget.checked;
      setVerifiedPropertiesEnabled(isEnabled);

      const newParams = new URLSearchParams(searchParams.toString());
      if (isEnabled) {
        newParams.set('verified', '1');
      } else {
        newParams.delete('verified');
      }
      router.push(`${window.location.pathname}?${newParams.toString()}`);
    };

    useEffect(() => {
      const verifiedParam = searchParams.get('verified');
      if (verifiedParam === '1') {
        setVerifiedPropertiesEnabled(true);
      } else {
        setVerifiedPropertiesEnabled(false);
      }
    }, [searchParams]);

    return (
      <div className={style.verified_properties_item}>
        <Stack>
          <RegularBigFont>Verified {isProperty ? 'Properties' : 'Projects'}</RegularBigFont>
          <div>
            <div className={style.verified_properties_subtitle}>
              <Button
                variant="light"
                leftSection={<IconCheck size={20} />}
                rightSection={<IconInfoCircle size={20} />}
                className={style.verified_prop_btn}
                size={'sm'}
              >
                Verified
              </Button>
              <SmallFont color={lightgrey_font_color}>By EasyProps</SmallFont>
              <Switch
                checked={verifiedPropertiesEnabled}
                onChange={handleSwitchChange}
                styles={{
                  track: {
                    cursor: 'pointer',
                  },
                  thumb: {
                    cursor: 'pointer',
                  },
                }}
              />
            </div>
          </div>
        </Stack>
      </div>
    );
  };

  const BudgetItem = () => (
    <Accordion defaultValue="budget">
      <Accordion.Item value="budget">
        <Accordion.Control className={style.accordion_header}>
          <RegularBigFont>Budget</RegularBigFont>
        </Accordion.Control>
        <Accordion.Panel>
          <RangeSlider
            min={minVal}
            max={maxVal}
            size="sm"
            step={500000}
            value={[updatedMin ?? minVal, updatedMax ?? maxVal]}
            color={secondary_dark}
            style={{ marginTop: 20, marginBottom: 30 }}
            label={(value) => formatCurrency(value)}
            labelAlwaysOn
            onChangeEnd={(value) => {
              handleRangeSliderChange(value);
            }}
          />
          <Group grow>
            <Select
              value={updatedMin.toString()}
              onChange={(value) => handleBudgetChange(value, 'min')}
              data={generateBudgetData(0, maxVal, 500000)}
              placeholder="Min Budget"
              icon={<IconCurrencyRupee size={14} />}
            />
            <Select
              value={updatedMax.toString()}
              onChange={(value) => handleBudgetChange(value, 'max')}
              data={generateBudgetData(updatedMin, updatedMax, 500000)}
              placeholder="Max Budget"
              icon={<IconCurrencyRupee size={14} />}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );

  const handleChipClick = (category, chip) => {
    const isChipSelected = selectedChips[category]?.find((item) => item.value === chip.value);

    const updatedList = {
      ...selectedChips,
      [category]: isChipSelected
        ? selectedChips[category].filter((item) => item.value !== chip.value)
        : [...(selectedChips[category] || []), chip],
    };

    setSelectedChips(updatedList);

    const newParams = new URLSearchParams(searchParams.toString());
    if (updatedList[category].length > 0) {
      newParams.set(category, updatedList[category].map((item) => item.value).join(','));
    } else {
      newParams.delete(category);
    }

    if (
      category === 'ProSubCatIds' &&
      !updatedList.ProSubCatIds.some((subType) => subTypesOfProperties.find((item) => item.value === subType.value))
    ) {
      newParams.delete('ProSubCatIds');
    }
    router.push(`${window.location.pathname}?${newParams.toString()}`);
  };

  const handleCheckboxChange = (event, key) => {
    const checked = event.currentTarget.checked;
    const updatedList = {
      ...selectedChips,
      [key]: checked ? 1 : 0,
    };

    setSelectedChips(updatedList);

    const newParams = new URLSearchParams(searchParams.toString());
    if (checked) {
      newParams.set(key, '1');
    } else {
      newParams.delete(key);
    }
    router.push(`${window.location.pathname}?${newParams.toString()}`);
  };

  const Properties = Object.keys(categories).map((category) => ({
    value: category,
    description: (
      <>
        {Array.isArray(categories[category]) &&
          categories[category].map((item) => {
            const isSelected = selectedChips[category]?.find((selectedItem) => selectedItem.value === item.value);

            return (
              <Chip
                key={item.value}
                icon={<IconCheck style={{ width: 16, height: 16 }} />}
                color={isSelected ? secondary_dark : 'gray'}
                variant="filled"
                checked={Boolean(isSelected)}
                onClick={() => handleChipClick(category, item)}
                style={{ margin: '5px' }}
              >
                {item.label}
              </Chip>
            );
          })}
      </>
    ),
  }));

  useEffect(() => {
    const initialChips = {
      verified: searchParams.get('verified') === '1' ? 1 : 0,
      BHK: [],
      AVAIBILITY: [],
      PostedBy: [],
      BALCONIES: [],
      BADROOM: [],
      ProSubCatIds: [],
      SFA: searchParams.get('SFA') === '1' ? 1 : 0,
      PowerBackup: searchParams.get('PowerBackup') === '1' ? 1 : 0,
      rera: searchParams.get('rera') === '1' ? 1 : 0,
      minVal: searchParams.get('minVal') || '',
      maxVal: searchParams.get('maxVal') || '',
      FURNISHED: searchParams.get('FURNISHED') || null,
    };

    Object.keys(categories).forEach((category) => {
      const paramValues = searchParams.get(category);

      if (paramValues) {
        initialChips[category] = paramValues.split(',').map((value) => {
          const foundItem = categories[category].find((item) => item.value === value);
          return foundItem ? foundItem : { label: value, value };
        });
      }
    });

    setSelectedChips(initialChips);
  }, [searchParams]);

  // const handleRemoveFilter = (category, value) => {
  //   let updatedChips;

  //   if (category === 'FURNISHED') {
  //     updatedChips = {
  //       ...selectedChips,
  //       FURNISHED: null,
  //     };
  //   } else if (category === 'minVal' || category === 'maxVal') {
  //     updatedChips = {
  //       ...selectedChips,
  //       minVal: category === 'minVal' ? null : selectedChips.minVal,
  //       maxVal: category === 'maxVal' ? null : selectedChips.maxVal,
  //     };
  //   } else if (Array.isArray(selectedChips[category])) {
  //     updatedChips = {
  //       ...selectedChips,
  //       [category]: selectedChips[category].filter((chip) => chip.value !== value),
  //     };
  //   } else {
  //     updatedChips = {
  //       ...selectedChips,
  //       [category]: 0,
  //     };
  //   }

  //   setSelectedChips(updatedChips);
  //   const newParams = new URLSearchParams(searchParams.toString());

  //   if (category === 'FURNISHED') {
  //     newParams.delete('FURNISHED');
  //   } else if (category === 'minVal' || category === 'maxVal') {
  //     newParams.delete('minVal');
  //     newParams.delete('maxVal');
  //   } else if (Array.isArray(updatedChips[category])) {
  //     if (updatedChips[category].length > 0) {
  //       newParams.set(category, updatedChips[category].map((chip) => chip.value).join(','));
  //     } else {
  //       newParams.delete(category);
  //     }
  //   } else {
  //     if (updatedChips[category] === 0) {
  //       newParams.delete(category);
  //     } else {
  //       newParams.set(category, '1');
  //     }
  //   }

  //   router.push(`${window.location.pathname}?${newParams.toString()}`);
  // };

  const items = [
    <VerifiedPropertiesItem key="verified" />,
    <BudgetItem key="budget" />,

    isProperty && (
      <Suspense key="Furnishing Status verified">
        <RadioDataFilter
          key="furnishing"
          label="Furnishing Status"
          filterData={furnishingStatus}
          selectedValue={selectedFurnishing}
          setSelectedValue={setSelectedFurnishing}
          selectedChips={selectedChips}
          setSelectedChips={setSelectedChips}
          onFilter={onFilter}
        />
      </Suspense>
    ),
    <Suspense key="Property Type">
      <RadioPropertyType
        key="propertyType"
        label="Property Type"
        filterData={propertiesType}
        selectedValue={selectedPropertyType}
        setSelectedValue={setSelectedPropertyType}
        selectedChips={selectedChips}
        setSelectedChips={setSelectedChips}
        onFilter={onFilter}
      />
    </Suspense>,
    isProperty && (
      <Accordion key="amenities" defaultValue="checkboxes">
        <Accordion.Item key="checkboxes" value="checkboxes">
          <Accordion.Control className={style.accordion_header}>
            <RegularBigFont size={'md'}>Amenities</RegularBigFont>
          </Accordion.Control>
          <Accordion.Panel>
            <Checkbox
              m={5}
              label="Security Fire Alarm"
              checked={selectedChips.SFA === 1}
              variant="outline"
              onChange={(event) => handleCheckboxChange(event, 'SFA')}
              color={secondary_dark}
              styles={{
                label: {
                  cursor: 'pointer',
                },
                input: {
                  cursor: 'pointer',
                },
              }}
            />
            <Checkbox
              m={5}
              label="Power Backup"
              checked={selectedChips.PowerBackup === 1}
              variant="outline"
              onChange={(event) => handleCheckboxChange(event, 'PowerBackup')}
              color={secondary_dark}
              styles={{
                label: {
                  cursor: 'pointer',
                },
                input: {
                  cursor: 'pointer',
                },
              }}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    ),
    ...Properties.filter((item) => item.value !== 'Verified Properties').map((item) => (
      <Accordion.Item key={item.value} value={item.value}>
        <Accordion.Control className={style.accordion_header}>
          <RegularBigFont size={'md'}>{categoryLabels[item.value]}</RegularBigFont>
        </Accordion.Control>
        <Accordion.Panel>
          <div className={style.applied_filters}>{item.description}</div>
        </Accordion.Panel>
      </Accordion.Item>
    )),
    <Accordion defaultValue="rera" key="rera">
      <Accordion.Item value="rera">
        <Accordion.Control className={style.accordion_header}>
          <RegularBigFont size={'md'}>RERA Approved</RegularBigFont>
        </Accordion.Control>
        <Accordion.Panel>
          <Checkbox
            variant="outline"
            m={5}
            label="RERA Approved"
            checked={selectedChips.rera === 1}
            color={secondary_dark}
            onChange={(event) => handleCheckboxChange(event, 'rera')}
            styles={{
              label: {
                cursor: 'pointer',
              },
              input: {
                cursor: 'pointer',
              },
            }}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>,
  ];

  const filteredItems = isProperty
    ? items
    : items.filter(
        (item) =>
          item.key !== 'Furnishing Status verified' &&
          item.key !== 'BHK' &&
          item.key !== 'PostedBy' &&
          item.key !== 'BALCONIES' &&
          item.key !== 'BADROOM' &&
          item.key !== 'SFA' &&
          item.key !== 'PowerBackup'
      );

  return (
    <div className={style.Search_outer_div}>
      {/* <AppliedFilters selectedChips={selectedChips} categories={categories} /> */}

      {/* <Stack mt={10} mb={20}>
        <RegularBigFont>Applied Filters</RegularBigFont>
        <AppliedFilters selectedChips={selectedChips} onRemoveFilter={handleRemoveFilter} />
      </Stack> */}
      <Accordion value={openItems} onChange={handleAccordionChange}>
        {filteredItems}
      </Accordion>
    </div>
  );
}
export default SearchLeftFilterBar;
