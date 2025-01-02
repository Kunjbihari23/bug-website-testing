'use client';

import { Divider, em, Group, Menu, SimpleGrid, Center, Box, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import cx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './home.module.css';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';

function HomeFilterLink({ searchParams }) {
  const [active, setActive] = useState(searchParams.RENTORSELL ?? '1');
  const [active2, setActive2] = useState(searchParams.PropertyCategoryID ?? '2');
  const [active3, setActive3] = useState(Number(searchParams.project_property) || 1);
  const [activeMenu, setActiveMenu] = useState('buy');
  const [buyLabel, setBuyLabel] = useState(() => {
    if (searchParams.RENTORSELL === '2') return 'Rent';
    if (searchParams.RENTORSELL === '3') return 'PG';
    return 'Buy';
  });
  const [allPropertyLabel, setAllPropertyLabel] = useState(() => {
    if (searchParams.project_property == 1) return 'New Project';
    return 'All Property';
  });

  const isDesktop = useMediaQuery(`(min-width: ${em(992)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const router = useRouter();

  const isOptionDisabled = (option) => {
    if (active3 === 1) {
      const disabledValues = {
        RENTORSELL: ['2', '3'],
        PROPERTYSUBCATEGORYIDS: ['3'],
      };
      const disabledForOption = disabledValues[option.mainValue] || [];
      return disabledForOption.includes(option.value);
    }

    // if (active === '3' && option.mainValue === 'PROPERTYSUBCATEGORYIDS' && option.value === '3') {
    //   return true;
    // }

    // if (active2 === '3' && option.mainValue === 'RENTORSELL' && option.value === '3') {
    //   return true;
    // }

    return false;
  };

  useEffect(() => {
    if (active3 === 1) {
      const newActive = '1';
      let newActive2 = active2;

      if (active2 === '3') {
        newActive2 = '2';
      }

      if (active !== newActive || active2 !== newActive2) {
        setActive(newActive);
        setActive2(newActive2);
        setBuyLabel('Buy');
        router.push(`/?RENTORSELL=${newActive}&PropertyCategoryID=${newActive2}&project_property=1`);
      }
    }

    if (active === '3' && active2 === '3') {
      // setActive2('2');
      router.push(`/?RENTORSELL=${active}&PropertyCategoryID=2&project_property=${active3}`);
    }
    if (active2 === '3' && active === '3') {
      // setActive('1');
      // setBuyLabel('Buy');
      router.push(`/?RENTORSELL=1&PropertyCategoryID=${active2}&project_property=${active3}`);
    }
  }, [active3, active, active2]);

  const handlePropertyTypeChange = (value) => {
    setActive3(Number(value));
    setAllPropertyLabel(value === '1' ? 'New Project' : 'All Property');

    if (value === '1') {
      setActive('1');
      if (active2 === '3') {
        setActive2('2');
      }
      setBuyLabel('Buy');
    }
  };

  const handleOptionClick = (option) => {
    if (isOptionDisabled(option)) return;

    const { mainValue, value, label } = option;

    switch (mainValue) {
      case 'RENTORSELL':
        setActive(value);
        setBuyLabel(label);
        router.push(`/?RENTORSELL=${value}&PropertyCategoryID=${active2}&project_property=${active3}`);
        break;
      case 'PROPERTYSUBCATEGORYIDS':
        setActive2(value);
        router.push(`/?RENTORSELL=${active}&PropertyCategoryID=${value}&project_property=${active3}`);
        break;
      case 'project_property':
        handlePropertyTypeChange(value);
        router.push(`/?RENTORSELL=${active}&PropertyCategoryID=${active2}&project_property=${value}`);
        break;
    }

    setActiveMenu(null);
  };

  const options = {
    RentOrSell: [
      { label: 'Buy', value: '1', mainValue: 'RENTORSELL' },
      { label: 'Rent', value: '2', mainValue: 'RENTORSELL' },
      { label: 'PG', value: '3', mainValue: 'RENTORSELL' },
    ],
    Category: [
      { label: 'Commercial', value: '1', mainValue: 'PROPERTYSUBCATEGORYIDS' },
      { label: 'Residential', value: '2', mainValue: 'PROPERTYSUBCATEGORYIDS' },
      { label: 'Land', value: '3', mainValue: 'PROPERTYSUBCATEGORYIDS' },
    ],
  };

  const allPropertyOptions = [
    { value: '0', label: 'All Property', mainValue: 'project_property' },
    { value: '1', label: 'New Project', mainValue: 'project_property' },
  ];

  const handleDesktopClick = (type, value) => {
    if (type === 'RENTORSELL') {
      setActive(value);
      router.push(`/?RENTORSELL=${value}&PropertyCategoryID=${active2}&project_property=${active3}`);
    } else if (type === 'PROPERTYSUBCATEGORYIDS') {
      setActive2(value);
      router.push(`/?RENTORSELL=${active}&PropertyCategoryID=${value}&project_property=${active3}`);
    } else if (type === 'project_property') {
      handlePropertyTypeChange(value);
      router.push(`/?RENTORSELL=${active}&PropertyCategoryID=${active2}&project_property=${value}`);
    }
  };

  return (
    <>
      {isDesktop ? (
        <Group gap={6} justify="space-between" align="center" className={`${style.btn_group} ${style.property_type}`}>
          <UnstyledButton
            className={cx(style.link, {
              [style.active]: active === '1',
              [style.disabled]: isOptionDisabled({ mainValue: 'RENTORSELL', value: '1' }),
            })}
            onClick={(event) => {
              event.preventDefault();
              if (!isOptionDisabled({ mainValue: 'RENTORSELL', value: '1' })) {
                handleDesktopClick('RENTORSELL', '1');
              }
            }}
          >
            Buy
          </UnstyledButton>
          <UnstyledButton
            className={cx(style.link, {
              [style.active]: active === '2',
              [style.disabled]: isOptionDisabled({ mainValue: 'RENTORSELL', value: '2' }),
            })}
            onClick={(event) => {
              event.preventDefault();
              if (!isOptionDisabled({ mainValue: 'RENTORSELL', value: '2' })) {
                handleDesktopClick('RENTORSELL', '2');
              }
            }}
          >
            Rent
          </UnstyledButton>
          <UnstyledButton
            className={cx(style.link, {
              [style.active]: active === '3',
              // [style.disabled]: isOptionDisabled({ mainValue: 'RENTORSELL', value: '3' }),
            })}
            onClick={(event) => {
              event.preventDefault();
              // if (!isOptionDisabled({ mainValue: 'RENTORSELL', value: '3' })) {
              handleDesktopClick('RENTORSELL', '3');
              // }
            }}
          >
            PG
          </UnstyledButton>
          <Divider size="xs" orientation="vertical" />
          {options.Category.map((item) => (
            <UnstyledButton
              key={item.value}
              className={cx(style.link, {
                [style.active]: active2 === item.value,
                [style.disabled]: isOptionDisabled({ mainValue: 'PROPERTYSUBCATEGORYIDS', value: item.value }),
              })}
              onClick={(event) => {
                event.preventDefault();
                if (!isOptionDisabled({ mainValue: 'PROPERTYSUBCATEGORYIDS', value: item.value })) {
                  handleDesktopClick('PROPERTYSUBCATEGORYIDS', item.value);
                }
              }}
            >
              {item.label}
            </UnstyledButton>
          ))}
          <Divider size="xs" orientation="vertical" />
          {allPropertyOptions.map((item) => (
            <UnstyledButton
              key={item.value}
              className={cx(style.link, {
                [style.active]: active3 === Number(item.value),
              })}
              onClick={(event) => {
                event.preventDefault();
                handleDesktopClick('project_property', item.value);
              }}
            >
              {item.label}
            </UnstyledButton>
          ))}
        </Group>
      ) : (
        <Group gap={6} justify="space-between" align="center" className={`${style.btn_group} ${style.property_type}`}>
          <Menu width={isMobile ? 150 : 200} shadow="md" position="bottom" radius="md">
            <Menu.Target>
              <a
                href="#"
                className={style.link}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(activeMenu === 'buy' ? null : 'buy');
                }}
              >
                <Center inline>
                  <Box component="span" mr={5}>
                    {buyLabel}
                  </Box>
                  <IconChevronDown style={{ width: '16px', height: '16px' }} />
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>
              <SimpleGrid spacing={0}>
                <div style={{ fontWeight: 'bold', margin: '8px 0' }}>Rent or Sell</div>
                {options.RentOrSell.map((item) => (
                  <Menu.Item
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      handleOptionClick(item);
                    }}
                    disabled={isOptionDisabled(item)}
                    rightSection={active === item.value ? <IconCheck size={16} color="black" /> : null}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
                <Divider />
                <div style={{ fontWeight: 'bold', margin: '8px 0' }}>Category</div>
                {options.Category.map((item) => (
                  <Menu.Item
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      handleOptionClick(item);
                    }}
                    disabled={isOptionDisabled(item)}
                    rightSection={active2 === item.value ? <IconCheck size={16} color="black" /> : null}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </SimpleGrid>
            </Menu.Dropdown>
          </Menu>

          <Menu width={200} shadow="md" position="bottom" radius="md">
            <Menu.Target>
              <a
                href="#"
                className={style.link}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu(activeMenu === 'allProperty' ? null : 'allProperty');
                }}
              >
                <Center inline>
                  <Box component="span" mr={5}>
                    {allPropertyLabel}
                  </Box>
                  <IconChevronDown style={{ width: '16px', height: '16px' }} />
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>
              <SimpleGrid spacing={0}>
                {allPropertyOptions.map((item) => (
                  <Menu.Item
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      handleOptionClick(item);
                    }}
                    rightSection={active3 == item.value ? <IconCheck size={16} color="black" /> : null}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </SimpleGrid>
            </Menu.Dropdown>
          </Menu>
        </Group>
      )}
    </>
  );
}

export default HomeFilterLink;
