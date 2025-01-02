import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Flex, Group, Menu, NumberFormatter, NumberInput, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import {
  IconLogout,
  IconDashboard,
  IconUserCircle,
  IconBuildingEstate,
  IconHomeStar,
  IconProgressBolt,
  IconBusinessplan,
  IconPercentage,
  IconCalculator,
  IconDots,
  IconRefresh,
} from '@tabler/icons-react';
import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
} from '../CustomComponents/TypographyComponent/HeadingComponents';
import { grey_font_color, secondary_dark } from '@/constant/FontColotConstant';
import style from './Dashboard.module.css';
import { signOut } from 'next-auth/react';
import { useForm } from '@mantine/form';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';

export default function Sidemenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [emiLoading, setEmiLoading] = useState(false);
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { icon: IconDashboard, label: 'Dashboard', path: '/UserDashboard' },
    { icon: IconUserCircle, label: 'Profile', path: '/UserDashboard/UserProfile' },
    { icon: IconBuildingEstate, label: 'My Property', path: '/Client/UserProperty' },
    { icon: IconBuildingEstate, label: 'Property Inquiries', path: '/Client/Inquiry' },
    { icon: IconHomeStar, label: 'Favorite Properties', path: '/Client/UserFavoriteProperty' },
    { icon: IconProgressBolt, label: 'Booster Properties', path: '/Client/BoosterPropertyList' },
    // { icon: IconBusinessplan, label: 'SUBSCRIPTION PLAN', path: '/UserDashboard/SubscriptionPlan' },
    { icon: IconLogout, label: 'Logout', action: 'logout' },
  ];

  useEffect(() => {
    const currentPath = pathname || '';
    const matchingItems = menuItems.filter((item) => currentPath.startsWith(item.path));
    const bestMatch = matchingItems.sort((a, b) => b.path.length - a.path.length)[0];
    if (bestMatch) {
      setActiveItem(bestMatch.label);
    } else {
      setActiveItem('');
    }
  }, [pathname]);

  const handleMenuItemClick = async (item) => {
    setActiveItem(item.label);

    if (item.action === 'logout') {
      await signOut();
      router.push('/');
      window.location.reload();
    } else {
      router.prefetch(item.path);
      router.push(item.path);
    }
  };

  const emiForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      loanAmount: null,
      interestRate: null,
      yearsToRepay: null,
    },
    validate: {
      loanAmount: (value) => (value == null ? 'Amount is Required!' : null),
      interestRate: (value) => (value == null ? 'Interest is Required!' : null),
      yearsToRepay: (value) => (value == null ? 'Years is required!' : null),
    },
  });

  const calculateEmi = (val) => {
    setEmiLoading(true);
    const P = parseFloat(val?.loanAmount);
    const r = parseFloat(val?.interestRate) / 12 / 100;
    const n = parseInt(val?.yearsToRepay) * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setEmi(emi.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setShowResult(true);
    setTimeout(() => {
      setEmiLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className={style.mainContainerSection}>
        <Stack align="center" p={10} h={70} justify="center" className={style.detail_title}>
          <RegularBigFont fontWeight={500} color={secondary_dark}>
            Details
          </RegularBigFont>
        </Stack>

        <Menu orientation="vertical" style={{ marginTop: '10px' }}>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.label}
              className={`${style.menuItem} ${activeItem === item.label ? style.active : ''}`}
              onClick={() => handleMenuItemClick(item)}
            >
              <div>
                <item.icon size={20} /> <span>{item.label}</span>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </div>

      <div className={style.emi_calculator}>
        <Stack gap={30} className={style.emiCalculatorSection}>
          <form onSubmit={emiForm.onSubmit(calculateEmi)}>
            <Stack align="center">
              <HeadingSix fontWeight={500} color={secondary_dark}>
                EMI Calculator
              </HeadingSix>
            </Stack>
            <Stack gap={24}>
              <Group justify="space-between">
                {!emiLoading && showResult && (
                  <Tooltip withArrow label="Reset Calculator" position="top-end">
                    <UnstyledButton
                      onClick={() => {
                        setEmiLoading(true);
                        setTimeout(() => {
                          emiForm.reset();
                          setEmi(null);
                          setTotalPayment(null);
                          setTotalInterest(null);
                          setShowResult(false);
                          setEmiLoading(false);
                        }, 1000);
                      }}
                    >
                      <IconRefresh />
                    </UnstyledButton>
                  </Tooltip>
                )}
              </Group>
              <Stack gap={16}>
                <Stack gap={1}>
                  <SmallFont fontWeight={400} color="black">
                    Loan Amount
                  </SmallFont>
                  <NumberInput
                    mt={'10px'}
                    placeholder="Loan Amount"
                    hideControls
                    leftSection={'₹'}
                    clampBehavior="strict"
                    min={0.01}
                    key={emiForm.key('loanAmount')}
                    {...emiForm.getInputProps('loanAmount')}
                  />
                </Stack>
                <Stack gap={4}>
                  <SmallFont fontWeight={400} color="black">
                    Interest Rate
                  </SmallFont>
                  <NumberInput
                    mt={'10px'}
                    placeholder="Interest"
                    hideControls
                    clampBehavior="strict"
                    min={0}
                    max={100}
                    leftSection={<IconPercentage size={16} />}
                    key={emiForm.key('interestRate')}
                    {...emiForm.getInputProps('interestRate')}
                  />
                </Stack>
                <Stack gap={4}>
                  <SmallFont fontWeight={400} color="black">
                    Years to Repay
                  </SmallFont>
                  <NumberInput
                    mt={'10px'}
                    placeholder="Years to repay"
                    hideControls
                    clampBehavior="strict"
                    min={0}
                    max={100}
                    key={emiForm.key('yearsToRepay')}
                    {...emiForm.getInputProps('yearsToRepay')}
                  />
                </Stack>
                <CustomePrimaryButton
                  icon={!emiLoading && <IconCalculator />}
                  fullWidth={'true'}
                  onClick={emiForm.onSubmit}
                >
                  {emiLoading ? <IconDots /> : 'Calculate'}
                </CustomePrimaryButton>
              </Stack>
            </Stack>
          </form>

          {!emiLoading && showResult && (
            <Stack gap={24}>
              <HeadingSix fontWeight={500}>Result</HeadingSix>
              <Stack gap={8}>
                <Flex gap="sm" justify="flex-start" align="center" direction="row">
                  <RegularFont fontWeight={500} color={grey_font_color}>
                    Monthly Payment :
                  </RegularFont>
                  <NumberFormatter prefix="₹ " thousandSeparator value={emi} />
                </Flex>
                <Flex gap="sm" justify="flex-start" align="center" direction="row">
                  <RegularFont fontWeight={500} color={grey_font_color}>
                    Total Payment :
                  </RegularFont>
                  <NumberFormatter prefix="₹ " thousandSeparator value={totalPayment} />
                </Flex>
                <Flex gap="sm" justify="flex-start" align="center" direction="row">
                  <RegularFont fontWeight={500} color={grey_font_color}>
                    Total Interest :
                  </RegularFont>
                  <NumberFormatter prefix="₹ " thousandSeparator value={totalInterest} />
                </Flex>
              </Stack>
            </Stack>
          )}
        </Stack>
      </div>
    </>
  );
}
