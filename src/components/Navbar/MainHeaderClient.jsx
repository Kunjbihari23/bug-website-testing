'use client';
import { grey_font_color, heading_font_color, primary_color, white_color } from '@/constant/FontColotConstant';
import { useLocalitylistApi } from '@/state/localityList/localityList.hook';
import useCityItemStore from '@/store/useCityItemStore';
import {
  Box,
  Burger,
  Button,
  CloseButton,
  Collapse,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  Menu,
  MultiSelect,
  Popover,
  ScrollArea,
  Select,
  Stack,
  Text,
  UnstyledButton,
  em,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconBell,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconLogout,
  IconMail,
  IconPhone,
  IconSearch,
  IconSettings,
  IconXboxX,
} from '@tabler/icons-react';
import cx from 'clsx';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import logoImg from '../../../public/img/text-logo.png';
import Thumbnail from '../../../public/img/Thumbnail.png';
import LoginForm from '../AuthComponents/LoginForm';
import SignUp from '../AuthComponents/SignUp';
import HeaderLessModal from '../CustomComponents/HeaderLessModal/HeaderLessModal';
import BellSvg from '../SVG/BellSvg';
import DownArrowSvg from '../SVG/DownArrowSvg';
import Search from '../SVG/SearchSvg';
import UserSvg from '../SVG/UserSvg';
import style from './navbar.module.css';
import { useCitylistApi } from '@/state/cityList/cityList.hook';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import SearchLeftFilterBar from '../SearchPage/SearchLeftFilterBar';
import SearchMediaComponent from '../SearchPage/SearchMediaComponent';
import { HeadingFive, RegularFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import { menuOptions } from '../SearchPage/StaticFilterArray';
import contactUsIcon from '../../../public/img/icon/call-chat-2.svg';
import freeIcon from '../../../public/img/free.png';
import { parseURLParameters } from '../SearchPage/SearchUrl Generate';

const updateUrlWithParams = ({ router, searchParams, localArea, selectedCity, parseURLParameters, updates = {} }) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      current.set(key, value);
    }
  });

  const localityIds = current.get('local')?.split(',').filter(Boolean) || [];

  const localityLabels = localityIds
    .map((id) => {
      const locality = localArea?.find((item) => item.value === id);
      return locality?.label || '';
    })
    .filter((label) => label !== '');

  const bashUrl = parseURLParameters(
    current.get('project_property'),
    current.get('RENTORSELL'),
    current.get('PropertyCategoryID'),
    selectedCity?.label,
    localityLabels
  );

  const search = current.toString();
  router.push(`${bashUrl}?${search}`);
};

function MainHeaderClient({ search, isUserLoggedIn = false, user = {}, isBlue = false }) {
  const { data: cityList } = useCitylistApi();
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const isDesktop = useMediaQuery(`(max-width: ${em(992)})`);
  const isMediumScreen = useMediaQuery(`(max-width: ${em(1200)})`);
  const theme = useMantineTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [active, setActive] = useState('home');
  const [opened, { open, close }] = useDisclosure(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [localArea, setLocalArea] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginOpenned, { open: loginOpen, close: loginClose }] = useDisclosure(false);
  const [signUpOpenned, { open: signUpOpen, close: signUpClose }] = useDisclosure(false);
  const [searchOpened, { open: openSearch, close: closeSearch }] = useDisclosure(false);
  const [selectedOptions, setSelectedOptions] = useState({
    rentorsell: menuOptions.RentOrSell[0],
    category: null,
    other: null,
  });
  const navlinks = [
    {
      navText: 'Home',
      key: 'home',
      navLink: '/',
    },
    {
      navText: 'Blogs',
      key: 'blogs',
      navLink: '/Blog',
    },
  ];

  const allQuery = useMemo(
    () => ({
      Cityid: searchParams.get('city') ?? '',
      SearchString: searchParams.get('local')?.split(',') ?? [],
      RENTORSELL: searchParams.get('RENTORSELL') ?? '',
      PropertyCategoryID: searchParams.get('PropertyCategoryID') ?? '',
      project_property: searchParams.get('project_property') ?? '',
    }),
    [searchParams]
  );

  const { city: cityStored, change: onChangeStoreCity } = useCityItemStore();

  const handleAddPropertyClick = async () => {
    if (isUserLoggedIn) {
      await router.push('/add-property');
    } else {
      loginOpen();
    }
  };

  useEffect(() => {
    setSelectedCity(cityStored);
  }, [cityStored]);

  useEffect(() => {
    const path = window.location.pathname;
    const activeLink = navlinks.find((link) => path.startsWith(link.navLink) && link.navLink !== '/');
    if (activeLink) {
      setActive(activeLink.key);
    } else if (path === '/') {
      setActive('home');
    }
  }, []);

  const isUserLogedIn = (val) => {
    setIsLogedIn(val);
  };

  useEffect(() => {
    if (cityList) {
      const formattedCities = cityList.list.map((city) => {
        return { value: city.cityId.toString(), label: city.cityName };
      });
      setCities(formattedCities);

      const CookiesData = Cookies.get('selected_city');
      const defaultCity = CookiesData ? JSON.parse(CookiesData) : null;

      if (defaultCity) {
        setSelectedCity(defaultCity);
        onChangeStoreCity(defaultCity);
      } else {
        const cityId = searchParams.get('city');
        if (cityId) {
          const selectedCity = formattedCities.find((city) => city.value === cityId);
          if (selectedCity) {
            setSelectedCity(selectedCity);
            onChangeStoreCity(selectedCity);
          }
        }
      }
    }
  }, [cityList, searchParams]);

  const handleCityChange = (option) => {
    Cookies.set('selected_city', JSON.stringify(option));
    setSelectedCity(option);
    onChangeStoreCity(option);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('city', option.value);
    searchParams.set('LANDMARK', option.label);
    const newQueryString = searchParams.toString();
    router.push(`?${newQueryString}`);
  };

  const query = useMemo(
    () => ({
      Cityid: searchParams.get('city') ?? cityStored?.value ?? '',
      SearchString: '',
    }),
    [searchParams]
  );

  const { data: localityList, isLoading: localityLoader } = useLocalitylistApi(query);

  useEffect(() => {
    if (localityList) {
      const sortedLocalityNames = localityList.map((locality) => ({
        value: `${locality.id}`,
        label: `${locality.localityName}`,
      }));

      setLocalArea(sortedLocalityNames);
    }
  }, [localityList, searchParams]);

  const handleLocalCityChange = (selectedIds) => {
    updateUrlWithParams({
      router,
      searchParams,
      localArea,
      selectedCity,
      parseURLParameters,
      updates: {
        RENTORSELL: searchParams.get('RENTORSELL') || '1',
        PropertyCategoryID: searchParams.get('PropertyCategoryID') || '2',
        project_property: searchParams.get('project_property') || '0',
        local: selectedIds.join(','),
      },
    });
  };

  const handleClose = () => {
    loginClose();
    signUpClose();
  };

  useEffect(() => {
    const rentOrSell = searchParams.get('RENTORSELL');
    const category = searchParams.get('PropertyCategoryID');
    const projectProperty = searchParams.get('project_property');

    setSelectedOptions({
      rentorsell: menuOptions.RentOrSell.find((option) => option.value === rentOrSell) || menuOptions.RentOrSell[0],
      category: menuOptions.Category.find((option) => option.value === category) || null,
      other: menuOptions.Other.find((option) => option.value === projectProperty) || null,
    });
  }, [searchParams]);

  const handleOptionClick = (category, option) => {
    const searchParams = new URLSearchParams(window.location.search);
    let newSelectedOptions = {};

    if (category === 'other' && option.value === '1') {
      newSelectedOptions = {
        rentorsell: menuOptions.RentOrSell.find((item) => item.value === '1'),
        category: menuOptions.Category.find((item) => item.value === '2'),
        other: option,
      };

      searchParams.set('RENTORSELL', '1');
      searchParams.set('PropertyCategoryID', '2');
      searchParams.set('project_property', '1');
    } else {
      newSelectedOptions = { ...selectedOptions, [category]: option };

      if (category === 'rentorsell') {
        searchParams.set('RENTORSELL', option.value);
      } else if (category === 'category') {
        searchParams.set('PropertyCategoryID', option.value);
        searchParams.delete('ProSubCatIds');
      } else if (category === 'other') {
        searchParams.set('project_property', option.value);
      }
    }

    setSelectedOptions(newSelectedOptions);

    const newQueryString = searchParams.toString();
    const localityIds = searchParams.get('local')?.split(',').filter(Boolean) || [];

    const selectedLocalityLabels = localityIds
      .map((localityId) => {
        const locality = localArea?.find((item) => item.value === localityId);
        return locality?.label || '';
      })
      .filter((label) => label !== '');

    const bashURl = parseURLParameters(
      category === 'other' ? option.value : searchParams.get('project_property'),
      category === 'rentorsell' ? option.value : searchParams.get('RENTORSELL'),
      category === 'PropertyCategoryID' ? option.value : searchParams.get('PropertyCategoryID'),
      searchParams.get('LANDMARK') ?? cityStored?.label,
      selectedLocalityLabels
    );

    router.push(`${bashURl}?${newQueryString}`);
    setIsDropdownOpen(false);
  };

  const hasValidSelection = Array.isArray(allQuery.SearchString) && allQuery.SearchString.some((item) => item !== '');

  return (
    <>
      <Box pb={90}>
        <header className={style.header} style={{ backgroundColor: search !== true || isBlue ? 'white' : '#1E1E82' }}>
          <Container size="xl" p={0}>
            <Group
              gap={24}
              justify={isDesktop ? 'space-between' : 'flex-start'}
              align="center"
              h="100%"
              className={style.groupData}
            >
              <Group align="center">
                <Link href="/" className={style.main_logolink}>
                  <Image
                    src={search === true ? Thumbnail : logoImg}
                    alt="logo"
                    width={isMobile ? 100 : 155}
                    height={isMobile ? 24 : 24}
                  />
                </Link>

                {search && !isDesktop ? (
                  ''
                ) : (
                  <Select
                    w={isMediumScreen ? (isMobile ? 105 : 140) : 162}
                    size={isMediumScreen ? 'sm' : 'md'}
                    checkIconPosition="right"
                    placeholder="Select city"
                    data={cities ?? []}
                    value={selectedCity ? selectedCity.value : ''}
                    onChange={(value, option) => {
                      handleCityChange(option);
                    }}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    classNames={{
                      input: style.headerCitySelect_input,
                    }}
                    allowDeselect={false}
                    comboboxProps={{ width: 210 }}
                  />
                )}
              </Group>

              <Group
                style={{ display: isDesktop ? 'none' : 'flex-end' }}
                gap={16}
                classNames={{
                  root: cx(style.user, {
                    [style.searchHeaderNav_Group]: search,
                  }),
                }}
                justify={'flex-end'}
              >
                {search === true ? (
                  <Flex
                    className={style.searchBox}
                    color="white"
                    bg="white"
                    h="46px"
                    align="center"
                    justify="space-between"
                    px="sm"
                    visibleFrom="md"
                  >
                    <Flex align="center" gap={12} w={'100%'}>
                      <Menu
                        width={200}
                        shadow="md"
                        position="bottom"
                        radius="md"
                        opened={isDropdownOpen}
                        onChange={setIsDropdownOpen}
                      >
                        <Menu.Target>
                          <a
                            href="#"
                            className={style.link}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDropdownOpen(!isDropdownOpen);
                            }}
                          >
                            <Text component="span" mr={5}>
                              {selectedOptions.rentorsell.label}
                            </Text>
                            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                          </a>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>Rent or Sell</Menu.Label>
                          {menuOptions.RentOrSell.map((item) => (
                            <Menu.Item
                              key={item.label}
                              onClick={() => handleOptionClick('rentorsell', item)}
                              disabled={
                                (selectedOptions.other?.label === 'Project' &&
                                  (item.label === 'Rent' || item.label === 'PG')) ||
                                (selectedOptions.category?.label === 'Land' && item.label === 'PG')
                              }
                              rightSection={
                                selectedOptions.rentorsell.label === item.label ? (
                                  <IconCheck style={{ width: rem(16), height: rem(16) }} />
                                ) : null
                              }
                            >
                              {item.label}
                            </Menu.Item>
                          ))}

                          <Menu.Divider />

                          <Menu.Label>Category</Menu.Label>
                          {menuOptions.Category.map((item) => (
                            <Menu.Item
                              key={item.label}
                              onClick={() => handleOptionClick('category', item)}
                              disabled={
                                (selectedOptions.other?.label === 'Project' && item.label === 'Land') ||
                                (selectedOptions.rentorsell?.label === 'PG' && item.label === 'Land') ||
                                (item.label === 'Land' && selectedOptions.rentorsell?.label === 'PG')
                              }
                              rightSection={
                                selectedOptions.category?.label === item.label ? (
                                  <IconCheck style={{ width: rem(16), height: rem(16) }} />
                                ) : null
                              }
                            >
                              {item.label}
                            </Menu.Item>
                          ))}

                          <Menu.Divider />

                          <Menu.Label>Other</Menu.Label>
                          {menuOptions.Other.map((item) => (
                            <Menu.Item
                              key={item.label}
                              onClick={() => handleOptionClick('other', item)}
                              rightSection={
                                selectedOptions.other?.label === item.label ? (
                                  <IconCheck style={{ width: rem(16), height: rem(16) }} />
                                ) : null
                              }
                            >
                              {item.label}
                            </Menu.Item>
                          ))}
                        </Menu.Dropdown>
                      </Menu>

                      <MultiSelect
                        data={localArea}
                        onChange={handleLocalCityChange}
                        value={localityLoader ? [] : hasValidSelection ? allQuery.SearchString : []}
                        searchable
                        style={{ border: 'none' }}
                        className={style.searchTag}
                        classNames={{ input: style.headerSelectInput }}
                        placeholder="Enter Locality"
                      />
                    </Flex>

                    <Search />
                  </Flex>
                ) : (
                  <>
                    <Group h="100%" gap={isMediumScreen ? 16 : 32} visibleFrom="md">
                      {navlinks &&
                        navlinks.map((nav, index) => (
                          <Link
                            href={nav?.navLink}
                            key={nav?.key || index}
                            className={style.link}
                            data-active={active === `${nav?.key}` || undefined}
                            onClick={(event) => {
                              setActive(nav?.key);
                              router.push(nav.navLink);
                            }}
                          >
                            {nav?.navText}
                          </Link>
                        ))}
                    </Group>
                    <Group>
                      <Menu
                        shadow="md"
                        width={300}
                        trigger="hover"
                        openDelay={100}
                        closeDelay={400}
                        transitionProps={{ transition: 'rotate-right', duration: 150 }}
                      >
                        <Menu.Target>
                          <div className={style.headerContactModal}>
                            <Image src={contactUsIcon} alt="contact-us" width={30} height={30} />
                          </div>
                        </Menu.Target>

                        {/* <Menu.Dropdown>
                          <Menu.Label>CONTACT US</Menu.Label>
                          <Menu.Item leftSection={<IconMail style={{ width: rem(20), height: rem(20) }} />}>
                            <Stack p={5}>
                              <Link href="mailto:enquiry@easyprops.com">
                                <RegularFont fontWeight={500}> enquiry@easyprops.com</RegularFont>
                              </Link>
                            </Stack>
                          </Menu.Item>
                          <Menu.Item leftSection={<IconPhone style={{ width: rem(20), height: rem(20) }} />}>
                            <Stack p={5}>
                              <Link href="tel:+919265320742">
                                <RegularFont fontWeight={500}> +91 92653 20742</RegularFont>
                              </Link>
                            </Stack>
                          </Menu.Item>
                        </Menu.Dropdown> */}
                      </Menu>
                    </Group>
                  </>
                )}

                <Button
                  leftSection={<Image src={freeIcon} width={25} height={25} alt="freeIcon"></Image>}
                  className={search ? style.addPropertyBtnFreeSearch : style.addPropertyBtnFree}
                  onClick={handleAddPropertyClick}
                >
                  Add Property
                </Button>

                {!isUserLoggedIn ? (
                  <Popover
                    opened={loginOpenned || signUpOpenned}
                    width={350}
                    position="bottom"
                    shadow="lg"
                    offset={{ mainAxis: 20, crossAxis: 0 }}
                  >
                    <Popover.Target>
                      <Button
                        variant="primary"
                        classNames={{
                          root: style.addPropertyBtn,
                          inner: style.headerAddPropertInner,
                          section: style.headerAddPropertSection,
                        }}
                        visibleFrom="md"
                        onClickCapture={() => {
                          signUpClose();
                          loginOpen();
                          setIsLogedIn(true);
                        }}
                      >
                        <Text span fw={600}>
                          Login
                        </Text>
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <CloseButton
                        onClick={handleClose}
                        pos={'absolute'}
                        right={0}
                        top={0}
                        icon={<IconXboxX size={18} stroke={1.5} />}
                      />
                      {isLogedIn ? (
                        <LoginForm isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
                      ) : (
                        <SignUp isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
                      )}
                    </Popover.Dropdown>
                  </Popover>
                ) : (
                  ''
                )}

                {!isUserLoggedIn ? (
                  <Button
                    variant="primary"
                    classNames={{
                      root: style.signupBtn,
                      section: style.headerAddPropertSection,
                    }}
                    visibleFrom="md"
                    onClickCapture={() => {
                      loginClose();
                      signUpOpen();
                      setIsLogedIn(false);
                    }}
                  >
                    <Text span fw={500}>
                      Sign up
                    </Text>
                  </Button>
                ) : (
                  ''
                )}

                {isUserLoggedIn ? (
                  <UnstyledButton display="flex" visibleFrom="xs" aria-label="notification">
                    <BellSvg search={search} />
                  </UnstyledButton>
                ) : (
                  ''
                )}

                {isUserLoggedIn ? (
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
                        aria-label="user"
                      >
                        <Group gap={7} visibleFrom="xs">
                          <UserSvg search={search} />
                          <DownArrowSvg search={search} />
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        component={Link}
                        href="/UserDashboard"
                        leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                      >
                        Dashboard
                      </Menu.Item>

                      <Menu.Item
                        leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        onClick={async () => {
                          await signOut();
                          router.push('/');
                          window.location.reload();
                        }}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  ''
                )}
              </Group>
              {isDesktop && (
                <Group>
                  {search && isDesktop && (
                    <Stack opened={searchOpened} onClick={openSearch}>
                      <IconSearch color={white_color} width={20} />
                    </Stack>
                  )}

                  <Burger
                    opened={drawerOpened}
                    onClick={toggleDrawer}
                    hiddenFrom="md"
                    size="sm"
                    color={search ? white_color : heading_font_color}
                  />
                </Group>
              )}
            </Group>
          </Container>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          position="right"
          padding="md"
          title={<HeadingFive fontWeight={500}>Menu</HeadingFive>}
          hiddenFrom="md"
          zIndex={1000000}
        >
          <Divider mb="sm" />
          <ScrollArea h={`calc(100vh - ${rem(80)})`}>
            <Link
              href={'/'}
              key={'home'}
              className={style.link}
              data-active={active === 'home' || undefined}
              onClick={() => {
                setActive('home');
                closeDrawer();
              }}
            >
              Home
            </Link>
            <Link
              href={'/Blog'}
              key={'blogs'}
              className={style.link}
              data-active={active === 'blogs' || undefined}
              onClick={() => {
                setActive('blogs');
                closeDrawer();
              }}
            >
              Blogs
            </Link>

            {!isUserLoggedIn ? (
              <Popover
                opened={loginOpenned || signUpOpenned}
                width={350}
                position="bottom"
                shadow="lg"
                offset={{ mainAxis: 20, crossAxis: 0 }}
              >
                <Popover.Target>
                  <Button
                    variant="primary"
                    classNames={{
                      root: style.addPropertyBtn,
                      inner: style.headerAddPropertInner,
                      section: style.headerAddPropertSection,
                    }}
                    visibleFrom="md"
                    onClickCapture={() => {
                      signUpClose();
                      loginOpen();
                      setIsLogedIn(true);
                    }}
                  >
                    <Text span fw={600}>
                      Login
                    </Text>
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <CloseButton
                    onClick={handleClose}
                    pos={'absolute'}
                    right={0}
                    top={0}
                    icon={<IconXboxX size={18} stroke={1.5} />}
                  />
                  {isLogedIn ? (
                    <LoginForm isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
                  ) : (
                    <SignUp isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
                  )}
                </Popover.Dropdown>
              </Popover>
            ) : (
              ''
            )}

            {!isUserLoggedIn ? (
              <Button
                variant="primary"
                classNames={{
                  root: style.signupBtn,
                  section: style.headerAddPropertSection,
                }}
                visibleFrom="md"
                onClickCapture={() => {
                  loginClose();
                  signUpOpen();
                  setIsLogedIn(false);
                }}
              >
                <Text span fw={500}>
                  Sign up
                </Text>
              </Button>
            ) : (
              ''
            )}

            {isUserLoggedIn ? (
              <UnstyledButton
                className={style.link}
                onClick={() => {
                  setActive('');
                  toggleLinks();
                }}
                w={'100%'}
              >
                <Flex align={'center'} justify={'space-between'} w={'100%'}>
                  <Box component="span" mr={5}>
                    Profile
                  </Box>
                  {linksOpened ? (
                    <IconChevronUp style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
                  ) : (
                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
                  )}
                </Flex>
              </UnstyledButton>
            ) : (
              ''
            )}
            <Collapse in={linksOpened}>
              <Stack gap={8}>
                <UnstyledButton className={style.link} px={14}>
                  <Group wrap="nowrap" align="flex-start" component={Link} href="/UserDashboard">
                    <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    <Text size="sm" fw={500}>
                      Dashboard
                    </Text>
                  </Group>
                </UnstyledButton>
                <UnstyledButton className={style.link} px={14}>
                  <Group wrap="nowrap" align="flex-start" component={Link} href="#">
                    <IconBell style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    <Text size="sm" fw={500}>
                      Notification
                    </Text>
                  </Group>
                </UnstyledButton>
              </Stack>
            </Collapse>

            <Divider my="sm" />

            <Stack>
              {isUserLoggedIn ? (
                <>
                  <Button
                    variant="primary"
                    fullWidth
                    leftSection={<Image src={freeIcon} alt="freeIcon" height={25} width={25}></Image>}
                    classNames={{
                      root: style.addPropertyBtn,
                      inner: style.headerAddPropertInner,
                      section: style.headerAddPropertSection,
                    }}
                    component={Link}
                    href={'/add-property'}
                  >
                    <Text span fw={500}>
                      Add Property
                    </Text>
                  </Button>

                  <Button
                    color="red"
                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    onClick={async () => {
                      await signOut();
                      router.push('/');
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Group>
                  <Button
                    variant="primary"
                    w={100}
                    classNames={{
                      root: style.addPropertyBtn,
                      inner: style.headerAddPropertInner,
                      section: style.headerAddPropertSection,
                    }}
                    onClickCapture={() => {
                      // open();
                      closeDrawer();
                      // setIsLogedIn(true);
                    }}
                  >
                    <Text span fw={600}>
                      Login
                    </Text>
                  </Button>
                  <Button
                    variant="primary"
                    classNames={{
                      root: style.signupBtn,
                      section: style.headerAddPropertSection,
                    }}
                    onClickCapture={() => {
                      open();
                      closeDrawer();
                      setIsLogedIn(false);
                    }}
                  >
                    <Text span fw={500}>
                      Sign up
                    </Text>
                  </Button>
                </Group>
              )}
            </Stack>
          </ScrollArea>
        </Drawer>
      </Box>

      <HeaderLessModal opened={opened} close={close}>
        {isLogedIn ? (
          <LoginForm isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
        ) : (
          <SignUp isUserLogedIn={isUserLogedIn} isLogedIn={isLogedIn} />
        )}
      </HeaderLessModal>

      <Drawer opened={searchOpened} onClose={closeSearch} title={<HeadingFive fontWeight={500}>Filters</HeadingFive>}>
        <SearchMediaComponent />

        <div className={style.DrawerLeftBar}>
          <SearchLeftFilterBar />
        </div>
      </Drawer>
    </>
  );
}

export default MainHeaderClient;
