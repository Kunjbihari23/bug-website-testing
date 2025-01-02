import React, { useEffect, useState } from 'react';
import { Group, MultiSelect, Stack, Chip } from '@mantine/core';
import { useLocalitylistApi } from '@/state/localityList/localityList.hook';
import { useRouter, useSearchParams } from 'next/navigation';
import style from './search.module.css';
import { secondary_dark } from '../../constant/FontColotConstant';
import { options } from './StaticFilterArray';
import { parseURLParameters } from './SearchUrl Generate';
import useCityItemStore from '@/store/useCityItemStore';

function SearchMediaComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = {
    Cityid: searchParams.get('city') ?? '',
    SearchString: '',
  };

  const { data: localityList, isLoader: localityLoader } = useLocalitylistApi(query);
  const { city: cityStore } = useCityItemStore();
  const [localArea, setLocalArea] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    RENTORSELL: searchParams.get('RENTORSELL') || '1',
    PropertyCategoryID: searchParams.get('PropertyCategoryID') || '2',
    project_property: searchParams.get('project_property') || '0',
  });

  const allQuery = {
    SearchString: searchParams.get('local')?.split(',') ?? [],
  };

  useEffect(() => {
    if (localityList) {
      const sortedLocalityNames = localityList.map((locality) => ({
        value: `${locality.id}`,
        label: locality.localityName,
      }));

      setLocalArea(sortedLocalityNames);
    }
  }, [localityList]);

  const handleLocalCityChange = (selectedValues) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    current.set('local', selectedValues.join(','));
    const search = decodeURIComponent(current.toString());

    const selectedLocalitiesData = selectedValues.map((value) => {
      const locality = localArea.find((item) => item.value === value);
      return locality;
    });

    const labels = selectedLocalitiesData.map((locality) => encodeURIComponent(locality.label)).join('-');

    const bashUrl = parseURLParameters(
      current.get('project_property'),
      current.get('RENTORSELL'),
      current.get('PropertyCategoryID'),
      cityStore?.label,
      labels
    );

    router.push(`${bashUrl}?${search}`);
  };

  const handleChipChange = (value, category) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));

    if (category === 'project_property' && value === '1') {
      setSelectedOptions((prev) => ({
        ...prev,
        RENTORSELL: '1',
        PropertyCategoryID: '2',
      }));
    }

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(category, value);

    if (category === 'project_property' && value === '1') {
      current.set('RENTORSELL', '1');
      current.set('PropertyCategoryID', '2');
    }

    const search = decodeURIComponent(current.toString());

    const selectedLocalitiesData = current
      .get('local')
      .split(',')
      .map((value) => {
        const locality = localArea.find((item) => item.value === value);
        return locality;
      });

    const labels = selectedLocalitiesData.map((locality) => encodeURIComponent(locality.label)).join('-');

    const bashUrl = parseURLParameters(
      current.get('project_property'),
      current.get('RENTORSELL'),
      current.get('PropertyCategoryID'),
      cityStore?.label,
      labels
    );

    router.push(`${bashUrl}?${search}`);
  };
  const hasValidSelection = Array.isArray(allQuery.SearchString) && allQuery.SearchString.some((item) => item !== '');

  const filteredOptions = options.filter((option) => {
    if (selectedOptions['project_property'] === '1') {
      return !['Land', 'Rent', 'PG'].includes(option.label);
    }
    if (selectedOptions['PropertyCategoryID'] === '3') {
      return option.label !== 'PG';
    }
    if (selectedOptions['RENTORSELL'] === '3') {
      return option.label !== 'Land';
    }
    return true;
  });

  return (
    <div className={style.mediaTopBar}>
      <MultiSelect
        placeholder="Search Localities"
        data={localArea}
        onChange={handleLocalCityChange}
        value={localityLoader ? [] : hasValidSelection ? allQuery.SearchString : []}
        defaultValue={allQuery.SearchString}
        searchable
        style={{ border: 'none' }}
        className={style.searchTag}
        classNames={{ input: style.headerSelectInput }}
      />

      <Stack align="center" justify="flex-start" p={20} gap="xs">
        <Group justify="center">
          {filteredOptions.map((option) => (
            <Chip
              key={option.value}
              value={option.value}
              checked={selectedOptions[option.category] === option.value}
              onChange={() => handleChipChange(option.value, option.category)}
              color={secondary_dark}
            >
              {option.label}
            </Chip>
          ))}
        </Group>
      </Stack>
    </div>
  );
}

export default SearchMediaComponent;
