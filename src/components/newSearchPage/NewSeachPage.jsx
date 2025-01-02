'use client';
import { getCookieClient } from '@/instance/getCookiesClient';
import { useCitylistApi } from '@/state/cityList/cityList.hook';

import { useSearchListApi } from '@/state/Search/search.hook';
import { Container, em, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Faq from '../FAQ/Faq';
import Footer from '../Footer/Footer';
import MainHeaderClient from '../Navbar/MainHeaderClient';
import style from '../SearchPage/search.module.css';

import SearchLeftFilterBar from '../SearchPage/SearchLeftFilterBar';
import SearchContentSection from '../SearchPage/SearchContentSection';
import { useLocalitylistApi } from '@/state/localityList/localityList.hook';

function NewSearchPage({ isUserLoggedIn, user, newParams, newSearchParams }) {
  const searchParams = useSearchParams();
  const isTablte = useMediaQuery(`(max-width: ${em(992)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(567)})`);
  const router = useRouter();
  const [faqList, setFaqList] = useState();
  const [searchCity, setSearchCity] = useState();
  const [textSearch, setTextSearch] = useState();
  const getCity = getCookieClient('selected_city');
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [paginationParams, setPaginationParams] = useState({
    PageNumber: 1,
    PageSize: 10,
    currentPage: 1,
  });
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const cityInfo = useMemo(() => {
    return getCity ? JSON.parse(getCity) : {};
  }, [getCity]);

  const { data: cityList } = useCitylistApi();

  //   useLayoutEffect(() => {
  //     const city = searchParams.get('city');
  //     const LANDMARK = searchParams.get('LANDMARK');

  //     if (!city || !LANDMARK) {
  //       router.push('/');
  //     }
  //   }, [searchParams, router]);

  const query = useMemo(
    () => ({
      Cityid: searchParams.get('city') ?? cityInfo?.value,
      SearchString: '',
    }),
    [searchParams, cityInfo]
  );

  const { data: localityList } = useLocalitylistApi(query);
  const { data: sessionClient } = useSession();

  useEffect(() => {
    if (localityList) {
      let localCity = searchParams.get('local');
      const localCityIds = localCity && localCity.split(',').map((id) => parseInt(id, 10));
      const filteredLocalities = localityList && localityList.filter((locality) => localCityIds?.includes(locality.id));
      const text = filteredLocalities?.map((locality) => locality?.localityName).join(',');
      setTextSearch(text ?? '');
    }
  }, [localityList, searchParams]);

  useEffect(() => {
    let localData = localStorage.getItem('LocationInfo');
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData.lat && parsedData.lon) {
        setPosition({ latitude: parsedData.lat, longitude: parsedData.lon });
      }
    }
  }, []);

  useEffect(() => {
    const matchedCity = cityList?.list.find((item) => item.cityId == searchParams.get('city'));
    setSearchCity(matchedCity);
  }, [cityList, searchParams]);

  const createPayload = useCallback(() => {
    return {
      project_property: parseInt(searchParams.get('project_property')) ?? 0,
      PropertyCategoryID: parseInt(searchParams.get('PropertyCategoryID')) ?? 0,
      BADROOM: searchParams.get('BADROOM') ?? null,
      BALCONIES: searchParams.get('BALCONIES') ?? null,
      AVAIBILITY: searchParams.get('AVAIBILITY') ?? null,
      FURNISHED: searchParams.get('FURNISHED') ?? null,
      AGEOFPROP: searchParams.get('AGEOFPROP') ?? null,
      SECURITYFIREALARM: searchParams.get('SFA') === '1' ? 1 : 0,
      POWERBACKUP: searchParams.get('PowerBackup') === '1' ? 1 : 0,
      RENTORSELL: searchParams.get('RENTORSELL') ?? '1',
      LANDMARK: searchParams.get('LANDMARK'),
      txtSearch: textSearch || '',
      PROPERTYSUBCATEGORYIDS: searchParams.get('ProSubCatIds') ?? null,
      PostedBy: searchParams.get('PostedBy') ?? null,
      BHKtype: searchParams.get('BHK') ?? null,
      isreraapproved: searchParams.get('rera') === '1' ? 1 : null,
      verify: searchParams.get('verified') === '1' ? 1 : null,
      MinValue: searchParams.get('minVal') ?? '',
      MaxValue: searchParams.get('maxVal') ?? '',
      PageNumber: paginationParams.PageNumber,
      PageSize: paginationParams.PageSize,
      currentPage: paginationParams.currentPage,
      SUBTYPEAGRI: null,
      LAT: position?.latitude ? position?.latitude.toString() : null,
      LOG: position?.longitude ? position?.longitude.toString() : null,
      Loginuserid: sessionClient?.user?.id ?? 0,
      AmenitiyIDs: null,
      PossessionIn: '',
      City: searchParams.get('LANDMARK') ?? '',
      propertyType: null,
      IsNewProject: null,
      SortDirection: sortDirection ?? null,
      SortBy: sortBy ?? null,
    };
  }, [searchParams, textSearch, paginationParams, position, sessionClient, sortDirection, sortBy]);

  const { data: searchData, isLoading: isLoader, refetch } = useSearchListApi(createPayload());
  useEffect(() => {
    if (newSearchParams && Object.keys(newSearchParams).length > 0) {
      const queryString = new URLSearchParams(newSearchParams).toString();
      router.replace(`${window.location.pathname}?${queryString}`, { shallow: true });
    }
  }, []);
  useEffect(() => {
    refetch();
  }, [searchParams, textSearch, paginationParams, position, sessionClient, refetch]);

  useEffect(() => {
    const faqs = searchData?.faQ_Master?.map((item) => item);
    setFaqList(faqs);
  }, [searchData]);

  const handlePaginationChange = (newParams) => {
    setPaginationParams(newParams);
  };

  const handleSortChange = (type, order) => {
    setSortBy(type);
    setSortDirection(order);
  };

  return (
    <>
      <MainHeaderClient isUserLoggedIn={isUserLoggedIn} user={user} search={true} cityList={cityList} />
      <div className={style.mainContainer_section}>
        <Container fluid>
          <Grid mx={{ md: 0, lg: 30, xl: 60 }} mt={20}>
            {!isTablte && (
              <Grid.Col span={{ base: 12, lg: 3 }}>
                <SearchLeftFilterBar searchParams={Object.fromEntries(searchParams.entries())} />
              </Grid.Col>
            )}

            <Grid.Col span={{ base: 12, lg: 9 }}>
              <SearchContentSection
                searchData={searchData}
                isLoader={isLoader}
                localityList={localityList}
                onPaginationChange={handlePaginationChange}
                searchParams={Object.fromEntries(searchParams.entries())}
                user={user}
                params={newParams}
                onSortChange={handleSortChange}
                isUserLoggedIn={isUserLoggedIn}
                newSearchParams={newSearchParams}
              />
            </Grid.Col>
          </Grid>

          <Faq faqList={faqList} />
          {/* <div className={style.salePropertyWrapper}>
            <SaleProperty
              margin={isMobile ? '0px' : '20px'}
              right={isMobile ? '-20px' : '-55px'}
              left={isMobile ? '-20px' : '-55px'}
            />
          </div> */}
        </Container>
      </div>

      <Footer />
    </>
  );
}

export default NewSearchPage;
