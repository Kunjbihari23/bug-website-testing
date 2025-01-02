'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import style from './search.module.css';
import {
  Container,
  Group,
  Breadcrumbs,
  Anchor,
  rem,
  SimpleGrid,
  Menu,
  UnstyledButton,
  Button,
  Stack,
  Loader,
  em,
} from '@mantine/core';
import { IconChevronRight, IconChevronLeft, IconChevronDown, IconChevronUp, IconCheck } from '@tabler/icons-react';
import filterIcon from '../../../public/img/Search/sort.png';
import {
  ExtraSmallFont,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import Image from 'next/image';
import SearchPropertyCard from './SearchPropertyCard';
import MovePropertySuggestion from './MovePropertySuggestion';
import PopularAreaSuggestion from './PopularAreaSuggestion';
import Interesting_Reads from './Interesting_Reads';
import { Pagination } from '@mantine/core';
import {
  grey_font_color,
  heading_font_color,
  info_blue_color,
  light_bg1_color,
  secondary_dark,
} from '../../constant/FontColotConstant';
import TrustedAgents from '../CustomComponents/CommonSlider/TrustedAgents';
import buildingImg from '../../../public/img/Search/building.svg';
import cx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';
import { options } from '../SearchPage/StaticFilterArray';

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function SearchContentSection({
  searchData,
  isLoader: searchLoader,
  localityList,
  onPaginationChange,
  searchParams,
  user,
  onSortChange,
  isUserLoggedIn,
  params,
  newSearchParams,
}) {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [localityNames, setLocalityNames] = useState();

  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const isBigScreen = useMediaQuery(`(max-width: ${em(1500)})`);
  const isTablte = useMediaQuery(`(max-width: ${em(992)})`);

  const router = useRouter();
  const [paginationParams, setPaginationParams] = useState({
    PageNumber: 1,
    PageSize: 10,
    currentPage: 1,
  });
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
      checkScroll();
    }
  };
  const checkScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => currentRef.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const propertyLabel = options.find(
    (option) => option.category === 'PropertyCategoryID' && option.value === searchParams.PropertyCategoryID
  )?.label;

  const rentOrSellLabel = options.find(
    (option) => option.category === 'RENTORSELL' && option.value === searchParams.RENTORSELL
  )?.label;

  const propertyorprojectLabel = options.find(
    (option) => option.category === 'project_property' && option.value === searchParams.project_property
  )?.label;

  const getLocalParam = useCallback(() => {
    return searchParams.local?.split(',') || [];
  }, [searchParams]);

  useEffect(() => {
    const firstIds = getLocalParam();
    const data = localityList?.filter((item) => firstIds.includes(item.id.toString())).map((item) => item.localityName);
    data?.map((x) => {
      if (x === 'Aslali') {
        setLocalityNames(params?.area);
      } else {
        setLocalityNames(data?.join(', '));
      }
    });
  }, [localityList, getLocalParam]);

  const BreadcrumbItem = [
    { title: 'Home', href: '/' },
    { title: toTitleCase(params.city) === 'Ahmedabad' ? 'Mahemdavad' : toTitleCase(params.city), href: '#' },
    {
      title: params?.area
        ? `${toTitleCase(params.propertyType)} For ${toTitleCase(params.rentOrSell)} In ${toTitleCase(decodeURIComponent(params?.area))} Near ${toTitleCase(params?.city)}`
        : `${toTitleCase(params.propertyType)} For ${toTitleCase(params.rentOrSell)} In ${toTitleCase(params.city) === 'Ahmedabad' ? 'Mahemdavad' : toTitleCase(params.city)}`,
      href: '#',
    },
  ];

  const scrollItem = [
    {
      from: 'AVAIBILITY',
      label: 'New Launch',
      value: '3',
    },
    {
      from: 'PostedBy',
      label: 'Owner',
      value: '1',
    },
    {
      from: 'AVAIBILITY',
      label: 'Under Construction',
      value: '2',
    },
  ];

  const header = {
    title: 'Ready to move Property',
    subTitle: 'Where you can start living',
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const initialSelectedItems = scrollItem
      .filter((item) => params.get(item.from) === item.value)
      .map((item) => item.value);
    setSelectedItems(initialSelectedItems);
  }, [searchParams]);

  const handleSelect = (item) => {
    const { from, value } = item;
    const params = new URLSearchParams(searchParams);

    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((val) => val !== value));
      params.delete(from);
    } else {
      setSelectedItems([...selectedItems, value]);
      if (from) {
        params.set(from, value);
      }
    }
    router.push(`?${params.toString()}`);
  };

  const handlePaginationChange = (newPage) => {
    const updatedParams = {
      ...paginationParams,
      PageNumber: newPage,
      currentPage: newPage,
    };
    setPaginationParams(updatedParams);
    onPaginationChange(updatedParams);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isProperty = searchData?.list?.propertySearchModel?.length > 0;
  const propertyCity = {
    value: searchParams?.city || '',
    label: searchParams?.LANDMARK || '',
  };

  const finalSearchData = isProperty
    ? searchData?.list?.propertySearchModel
    : searchData?.list?.filterNewProjectViewModel;
  const BuggyObjact = {
    projectId: 201618,
    title: 'Nisi quaerat illum ',
    propertyType: 1,
    landMark: 'ADALAJ',
    city: 'Ahmedabad',
    appartmentSociety: 'Owen Allen',
    filePath: 'https://demo.easyprops.com/images/Photos/projectGallery-288214-24-02-202420241108184754670.jpg',
    description: 'Quae ipsum qui amet',
    priceStartingFrom: 1500,
    projectContactName: 'Denial Dang',
    projectContactEmail: '',
    projectContactNumber: '+1 (791) 326-4623',
    projectSEOURL: 'nisi-quaerat-illum-for-buy-in-doloremque omnis in -0',
    projectUserType: 1,
    projectType: ' Commercial, Residential',
    noOfTower: 694,
    dateOfPossession: null,
    totalCount: 11,
    amenities: 'Power Backup, Fire Safety, Cafeteria, Maintenance Staff',
    userTypeName: 'User',
    faqlist: [],
    favCount: 0,
  };

  const handleSortType = (type) => {
    // setSortType(type);
    onSortChange(type, sortOrder);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    // onSortChange(sortType, order);
  };

  return (
    <>
      <Container size={!isMobile && 'xl'} p={isMobile && 0}>
        <div className={style.search_breadcrumbs}>
          <Breadcrumbs separator=">" separatorMargin="sm" className={style.breadcrumbs_item}>
            {BreadcrumbItem.map((item, index) => (
              <Anchor href={item.href} key={index}>
                <ExtraSmallFont color={grey_font_color} m={0} fontWeight={300}>
                  {item.title}
                </ExtraSmallFont>
              </Anchor>
            ))}
          </Breadcrumbs>
        </div>
        <div className={style.title_section}>
          <HeadingSix fontWeight={500}>
            {searchData?.totalCounts > 0
              ? `Discover ${searchData?.totalCounts ?? ''} ${propertyLabel ?? ''} ${propertyorprojectLabel ?? ''} available for ${rentOrSellLabel ?? ''} in ${localityNames ?? ''}${searchParams?.LANDMARK ? ` near ${searchParams.LANDMARK}` : ''}. Page ${searchData?.currentPage ?? 0} of ${searchData?.totalPages ?? 0}.`
              : `No ${propertyLabel ?? ''} ${propertyorprojectLabel ?? 'property'} found for ${rentOrSellLabel ?? ''} in ${localityNames ?? ''}${searchParams?.LANDMARK ? ` near ${searchParams.LANDMARK}` : ''}.`}
          </HeadingSix>
        </div>
        <div>
          <div className={style.scroll_container}>
            <div className={style.scroll_container_outerDiv}>
              {showLeftButton && (
                <div className={style.scrollBtn}>
                  <IconChevronLeft onClick={() => scroll(-300)} stroke={1} className={style.svgImage_} />
                </div>
              )}

              <div className={style.scroll_container_scroller} ref={scrollContainerRef}>
                {scrollItem &&
                  scrollItem.map((item, index) => (
                    <Button
                      key={index}
                      className={`${selectedItems.includes(item.value) ? style.selectedScroll_item : style.scroll_item}`}
                      onClick={() => handleSelect(item)}
                    >
                      {item.label}
                    </Button>
                  ))}
              </div>
              {showRightButton && (
                <div className={style.scrollBtn}>
                  <IconChevronRight onClick={() => scroll(300)} stroke={1} className={style.svgImage_} />
                </div>
              )}
            </div>
            <div className={style.scroll_container_filter}>
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(style.user, {
                      [style.userActive]: userMenuOpened,
                    })}
                  >
                    <Group gap={7}>
                      <div onClick={() => setUserMenuOpened((o) => !o)} className={style.scroll_filter}>
                        <Image src={filterIcon} alt="filter" width={25} height={25} m={10} />
                        <RegularFont color={heading_font_color}>Filters</RegularFont>
                        {userMenuOpened ? (
                          <IconChevronUp style={{ width: rem(35), height: rem(25) }} stroke={1} />
                        ) : (
                          <IconChevronDown style={{ width: rem(35), height: rem(25) }} stroke={1} />
                        )}
                      </div>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Sort By</Menu.Label>

                  <Menu.Item
                    onClick={() => handleSortType('price')}
                    rightSection={sortType === 'price' ? <IconCheck size={16} /> : null}
                  >
                    Price (Low to High)
                  </Menu.Item>

                  <Menu.Item
                    onClick={() => handleSortType('date')}
                    rightSection={sortType === 'date' ? <IconCheck size={16} /> : null}
                  >
                    Date (Newest First)
                  </Menu.Item>

                  <Menu.Label>Order By</Menu.Label>

                  <Menu.Item
                    onClick={() => handleSortOrder('A')}
                    rightSection={sortOrder === 'A' ? <IconCheck size={16} /> : null}
                  >
                    Ascending
                  </Menu.Item>

                  <Menu.Item
                    onClick={() => handleSortOrder('D')}
                    rightSection={sortOrder === 'D' ? <IconCheck size={16} /> : null}
                  >
                    Descending
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>

        {searchLoader ? (
          <Stack h={300} align="center" justify="center" gap="md">
            <Loader variant="bars"></Loader>
          </Stack>
        ) : (
          <SimpleGrid spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]} style={{ paddingTop: '15px' }}>
            {finalSearchData && finalSearchData.length !== 0 ? (
              finalSearchData.map((prop, index) => (
                <SearchPropertyCard
                  key={index}
                  property={prop}
                  isProperty={isProperty}
                  searchParams={searchParams}
                  user={user}
                  isUserLoggedIn={isUserLoggedIn}
                />
              ))
            ) : (
              <SearchPropertyCard
                key={'1'}
                property={BuggyObjact}
                isProperty={isProperty}
                searchParams={searchParams}
                user={user}
                isUserLoggedIn={isUserLoggedIn}
              />
              // <Stack align="center" justify="center" gap="md">
              //   <Image src={buildingImg} width={150} height={150} alt="no-properties-match" />
              //   <RegularBigFont fontWeight={500} color={info_blue_color}>
              //     Sorry, no properties match your search...
              //   </RegularBigFont>
              // </Stack>
            )}
          </SimpleGrid>
        )}

        <Stack pt={20}>
          <MovePropertySuggestion
            slidesToShow={4.5}
            header={header}
            searchParams={searchParams}
            propertyCity={propertyCity}
          />
        </Stack>

        <PopularAreaSuggestion
          slidesToShow={3}
          searchParams={searchParams}
          newSearchParams={newSearchParams}
          propertyCity={propertyCity}
        />

        <Interesting_Reads
          bgColor={light_bg1_color}
          slidesToShow={2.5}
          searchParams={searchParams}
          newSearchParams={newSearchParams}
        />

        <div style={{ backgroundColor: '#EBF8F1', borderRadius: '10px', margin: '25px 0px' }}>
          <TrustedAgents
            searchParams={searchParams}
            slidesToShow={isBigScreen ? (isTablte ? 1 : 1.5) : 2.5}
            propertyCity={propertyCity}
          />
        </div>

        <Pagination
          m={10}
          size={isTablte ? 'md' : 'lg'}
          value={paginationParams.currentPage}
          onChange={handlePaginationChange}
          total={searchData?.totalPages}
          color={secondary_dark}
        />
      </Container>
    </>
  );
}
export default SearchContentSection;
