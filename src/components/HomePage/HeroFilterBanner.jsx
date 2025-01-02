'use client';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import {
  HeadingOne,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { white_color } from '@/constant/FontColotConstant';
import { gspIcon, startIcon } from '@/constant/ImageConstant';
import { useGetNewPopularLocality, useLocalitylistApi } from '@/state/localityList/localityList.hook';
import {
  ActionIcon,
  Alert,
  Button,
  Container,
  Divider,
  em,
  Group,
  Loader,
  Modal,
  MultiSelect,
  rem,
  Select,
  Stack,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconInfoCircle, IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import style from './home.module.css';
import { useCitylistApi } from '@/state/cityList/cityList.hook';
import Cookies from 'js-cookie';
import { getCookieClient } from '@/instance/getCookiesClient';
import useCityItemStore from '@/store/useCityItemStore';
import { setCookie } from 'cookies-next';
import HomeFilterLink from './HomeFilterLink';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';

function HeroFilterBanner({ searchParams, appCity }) {
  const [active, setActive] = useState('1');
  const [active2, setActive2] = useState('2');
  const [active3, setActive3] = useState('0');
  const { city: storeCity, change: changeCity } = useCityItemStore();
  const { data: cityList } = useCitylistApi();

  const router = useRouter();

  useEffect(() => {
    const rentOrSell = searchParams.RENTORSELL || '1';
    const propertyCategory = searchParams.PropertyCategoryID || '2';
    const projectProperty = searchParams.project_property || '1';

    setActive(rentOrSell);
    setActive2(propertyCategory);
    setActive3(projectProperty);
  }, [searchParams]);

  const isTablte = useMediaQuery(`(max-width: ${em(767)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ value: appCity?.value ?? null, label: appCity?.label ?? null });
  const [localArea, setLocalArea] = useState([]);
  const [alertOpened, { open: alertOpenModal, close: alertCloseModal }] = useDisclosure(false);
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  let storedCity = getCookieClient('selected_city');
  const [browserCity, setBrowserCity] = useState();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const genrateQuery = (active, active2, active3) => {
    return `?RENTORSELL=${active}&PropertyCategoryID=${active2}&project_property=${active3}`;
  };

  // const getLocation = async () => {
  //   navigator.geolocation.getCurrentPosition(async (position) => {
  //     const lat = position?.coords?.latitude;
  //     const lon = position?.coords?.longitude;
  //     const response = await fetch(
  //       `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  //     );
  //     const data = await response.json();
  //     setBrowserCity(data.city);
  //   });
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  useEffect(() => {
    if (storeCity !== selectedCity) {
      setSelectedCity(storeCity);
    }
  }, [storeCity, selectedCity]);

  useEffect(() => {
    if (appCity) {
      const formattedCities = cityList?.list.map((city) => ({
        value: `${city.cityId}`,
        label: `${city.cityName}`,
      }));
      setCities(formattedCities);

      let defaultCity;

      if (browserCity !== undefined) {
        defaultCity = formattedCities && formattedCities?.find((city) => city.label === browserCity);
      } else {
        defaultCity =
          formattedCities && formattedCities?.find((city) => city.label === (appCity?.label ?? 'Ahmedabad'));
      }

      if (!storedCity) {
        if (defaultCity) {
          Cookies.set('selected_city', JSON.stringify(defaultCity));
          setCookie('selected_city', JSON.stringify(defaultCity));
          setSelectedCity(defaultCity);
          changeCity(defaultCity);
        } else {
          Cookies.set('selected_city', JSON.stringify({ value: '153', label: 'Ahmedabad' }));
          setCookie('selected_city', JSON.stringify({ value: '153', label: 'Ahmedabad' }));
          setSelectedCity({ value: '153', label: 'Ahmedabad' });
        }
      } else {
        try {
          const parsedStoredCity = storedCity ? JSON.parse(storedCity) : {};
          setSelectedCity(parsedStoredCity);
          changeCity(parsedStoredCity);
        } catch (error) {
          if (defaultCity) {
            Cookies.set('selected_city', JSON.stringify(defaultCity));
            setCookie('selected_city', JSON.stringify(defaultCity));
            setSelectedCity(defaultCity);
            changeCity(defaultCity);
          }
        }
      }
    }
  }, [cityList, changeCity, storedCity, browserCity]);

  const query = useMemo(
    () => ({
      Cityid: selectedCity?.value ?? appCity?.value,
      SearchString: '',
    }),
    [selectedCity?.value]
  );

  const changeSelectedCity = async (val, option) => {
    Cookies.set('selected_city', JSON.stringify(option));
    changeCity(option);
    setSelectedCity(option);
    query.Cityid = option.value;
    await refetch();
    setLocalArea([]);
    setSelectedLocalities([]);
  };

  const { data: localityList, isLoading, refetch } = useLocalitylistApi(query);

  const pay = useMemo(
    () => ({
      Cityid: selectedCity?.value ?? appCity?.value,
    }),
    [selectedCity?.value]
  );

  const {
    data: newPopularLocality,
    isLoading: getNewPopularLocalityLoader,
    refetch: GetNewPopularLocalityRefecth,
  } = useGetNewPopularLocality(pay?.Cityid);

  useEffect(() => {
    if (localityList) {
      const sortedLocalityNames = localityList.map((locality) => ({
        value: `${locality.id}`,
        label: `${locality.localityName}`,
      }));

      setLocalArea(sortedLocalityNames);
    } else {
      setLocalArea([]);
    }
  }, [localityList, selectedCity]);

  const handleLocalCityChange = (selectedValues) => {
    const selectedLocalities = localArea.filter((locality) => selectedValues.includes(locality.value));
    setSelectedLocalities(selectedLocalities);
  };
  useEffect(() => {
    if (selectedCity) {
      refetch();
      GetNewPopularLocalityRefecth();
    }
  }, [selectedCity]);

  const handleSearch = () => {
    setIsBtnLoading(true);
    let areaSearch = `${selectedLocalities.map((locality) => locality.label).join('-')}`;

    if (areaSearch === 'Aslali') {
      areaSearch = 'Asharva';
    }

    const url = parseURLParameters(active3, active, active2, selectedCity?.label, areaSearch);
    router.push(
      `${url}${genrateQuery(active, active2, active3)}&local=${selectedLocalities.map((locality) => locality.value)}&city=${selectedCity.value}&LANDMARK=${selectedCity.label}`
    );
  };

  const handlePopularLocalityClick = (locality) => {
    const matchingLocality = localArea.find((item) => item.label.toLowerCase() === locality.localityName.toLowerCase());
    if (matchingLocality) {
      const isAlreadySelected = selectedLocalities.some((selected) => selected.value === matchingLocality.value);

      if (!isAlreadySelected) {
        setSelectedLocalities((prev) => [...prev, matchingLocality]);
      }
    }
  };

  const optionsFilter = ({ options, search }) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    filtered.sort((a, b) => a.label.localeCompare(b.label));
    return filtered;
  };

  return (
    <div className={style.main_heroBanner}>
      <Container size="md">
        <div className={style.banner_content}>
          <HeadingOne color={white_color} textAlign={'center'}>
            Making Property Deals Easy and Fast!
          </HeadingOne>

          <RegularBigFont fontWeight={400} color={white_color} textAlign={'center'}>
            Choose from over 6,000 listings for buying, selling, or renting properties in your area!.
          </RegularBigFont>
        </div>
        <div className={style.banner_property_search}>
          <Stack gap={22}>
            <HomeFilterLink
              active={active}
              active2={active2}
              active3={active3}
              setActive={setActive}
              setActive2={setActive2}
              setActive3={setActive3}
              searchParams={searchParams}
            />

            <Group gap={8} wrap={isTablte ? 'wrap' : 'nowrap'} justify={isTablte ? 'center' : 'flex-start'}>
              {!isTablte && (
                <Select
                  size={isMobile ? 'sm' : 'md'}
                  w={'15%'}
                  miw={160}
                  placeholder="Select City"
                  data={cities ?? []}
                  value={selectedCity ? selectedCity.value : ''}
                  onChange={(value, option) => changeSelectedCity(value, option)}
                  searchable
                  checkIconPosition="left"
                  nothingFoundMessage="Nothing found..."
                  IconSearch="none"
                  variant="unstyled"
                  allowDeselect={false}
                  comboboxProps={{ width: 210 }}
                />
              )}
              <Divider orientation="vertical" visibleFrom="sm" />
              <Group
                gap={8}
                w={isTablte ? '100%' : '80%'}
                wrap={isTablte ? 'wap' : 'nowrap'}
                className={style.searchSectionInHero}
              >
                <MultiSelect
                  className={style.search}
                  data={localArea ?? []}
                  onChange={handleLocalCityChange}
                  value={selectedLocalities.map((locality) => locality.value)}
                  loading={isLoading.toString()}
                  placeholder="Search localities"
                  filter={optionsFilter}
                  searchable
                  size={isMobile ? 'sm' : 'md'}
                  w="80%"
                  variant="unstyled"
                  leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                  nothingFoundMessage="No localities found"
                />

                <ActionIcon size={isMobile ? 'lg' : 'xl'} variant="light" aria-label="location" radius="xl">
                  <Image src={gspIcon} alt="star-new" width={24} height={24} />
                </ActionIcon>
                <CustomePrimaryButton
                  size={isMobile ? 'extraSmall' : 'small'}
                  btnWidth={90}
                  onClick={() => {
                    if (selectedCity && selectedLocalities.length > 0) {
                      handleSearch();
                    } else {
                      alertOpenModal();
                    }
                  }}
                >
                  {isBtnLoading ? <Loader size={'sm'} /> : 'Search'}
                </CustomePrimaryButton>
              </Group>
            </Group>
          </Stack>
        </div>

        <div className={style.location_filter}>
          <Group gap={10} wrap="nowrap" classNames={{ root: style.populatLocality_groupRoot }}>
            <Group gap={6} wrap="nowrap" miw={isMobile ? '100%' : 180} justify={isMobile ? 'center' : 'flex-start'}>
              <Image src={startIcon} alt="star-new" width={25} height={25} />
              <RegularFont fontWeight={500} color={white_color}>
                Popular Localities
              </RegularFont>
            </Group>
            <Group gap={6} justify={isMobile ? 'center' : 'flex-start'}>
              {getNewPopularLocalityLoader ? (
                <Loader size={'xs'} />
              ) : newPopularLocality && newPopularLocality.length > 0 && localArea.length > 0 ? (
                newPopularLocality.slice(0, 5).map((data, index) => (
                  <Button
                    radius="xl"
                    className={style.link}
                    classNames={{
                      root: style.popular_location_btn,
                    }}
                    size={isMobile ? 'xs' : 'md'}
                    key={index}
                    onClick={() => handlePopularLocalityClick(data)}
                  >
                    {data?.localityName}
                  </Button>
                ))
              ) : (
                <Stack p={5}>
                  <RegularFont fontWeight={500} color={white_color}>
                    No localities found
                  </RegularFont>
                </Stack>
              )}
            </Group>
          </Group>
        </div>
      </Container>

      {/* <Modal opened={alertOpened} onClose={alertCloseModal} withCloseButton={false}>
        <Alert variant="light" color="blue" title="Please select locality for search" icon={<IconInfoCircle />} />
      </Modal> */}
    </div>
  );
}

export default HeroFilterBanner;
