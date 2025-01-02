'use client';
import '@mantine/carousel/styles.css';
import { Anchor, Card, Container, em, Group, Tabs, UnstyledButton } from '@mantine/core';
import CustomNextArrow from '@/components/SearchPage/CustomNextArrow';
import CustomPrevArrow from '@/components/SearchPage/CustomPrevArrow';
import { useEffect, useRef, useState } from 'react';
import { RegularFont } from '../TypographyComponent/HeadingComponents';
import { grey_font_color, primary_color } from '@/constant/FontColotConstant';
import style from './CarouselMantine.module.css';
import { useMediaQuery } from '@mantine/hooks';

export function CarouselMantine() {
  const [activeTab, setActiveTab] = useState('propertyId_Overview');
  const tabsRef = useRef([]);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const isMobile = useMediaQuery(`(max-width: ${em(567)})`);

  const slideArr = [
    { link: 'propertyId_Overview', label: 'Overview' },
    // { link: 'propertyId_Owner_Detail', label: 'Owner Detail' },
    { link: 'propertyId_Highlights', label: 'Highlights of Property' },
    { link: 'propertyId_Amenities', label: 'Amenities' },
    { link: 'propertyId_Featured_Dealers', label: 'Featured Dealers' },
    { link: 'propertyId_Recommendations', label: 'Recommendations' },
    // { link: 'propertyId_Review', label: 'Review' },
    { link: 'propertyId_Similar_projects', label: 'Similar projects' },
    { link: 'propertyId_FAQ', label: 'FAQ' },
    { link: 'propertyId_News_Articles', label: 'News/Articles' },
    { link: 'propertyId_Popular_Area', label: 'Area suggetions' },
  ];

  const handleScroll = () => {
    const header = document.getElementById('linkItem-Container');
    let heightToHidden = 250;
    if (header) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll > heightToHidden) {
        header.classList.add(style.sticky_Item_Container);
      } else {
        header.classList.remove(style.sticky_Item_Container);
      }
    }

    if (!isScrollingRef.current) {
      const sectionDivs = document.querySelectorAll('[id^="propertyId_"]');
      let visibleSection = null;

      sectionDivs.forEach((div) => {
        const rect = div.getBoundingClientRect();
        if (rect.top <= 200) {
          visibleSection = div.id;
        }
      });
      if (visibleSection && visibleSection !== activeTab) {
        setActiveTab(visibleSection);
      }
    }
  };

  const scrollToSection = (sectionId) => {
    isScrollingRef.current = true;
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - 200,
        behavior: 'smooth',
      });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  const scrollTabIntoView = (tabElement) => {
    if (!tabElement || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const tabRect = tabElement.getBoundingClientRect();
    if (tabRect.left < containerRect.left) {
      containerRef.current.scrollLeft -= containerRect.left - tabRect.left;
    } else if (tabRect.right > containerRect.right) {
      containerRef.current.scrollLeft += tabRect.right - containerRect.right;
    }
  };

  // const handleNext = () => {
  //   const currentIndex = slideArr.findIndex((tab) => tab?.link === activeTab);
  //   const nextIndex = (currentIndex + 1) % slideArr.length;
  //   setActiveTab(slideArr[nextIndex].link);
  //   scrollToSection(slideArr[nextIndex].link);
  // };

  const handlePrev = () => {
    const currentIndex = slideArr.findIndex((tab) => tab?.link === activeTab);
    const prevIndex = (currentIndex - 1 + slideArr.length) % slideArr.length;
    setActiveTab(slideArr[prevIndex].link);
    scrollToSection(slideArr[prevIndex].link);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const currentIndex = slideArr.findIndex((tab) => tab?.link === activeTab);
    if (tabsRef.current[currentIndex]) {
      scrollTabIntoView(tabsRef.current[currentIndex]);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  return (
    <div className={style.sectionLinks_Container} id="linkItem-Container">
      <Container size="xl">
        <Group wrap="nowrap" gap={24} classNames={{ root: style.pageLing_TabGroup_root }}>
          <CustomPrevArrow left={'-8px'} onClick={handlePrev} />
          <div className={style.tabContainer} ref={containerRef}>
            <Tabs
              value={activeTab}
              color={primary_color}
              onChange={(e) => {
                setActiveTab(e);
                scrollToSection(e);
              }}
              classNames={{ root: style.pageLink_root, tab: style.pageLink_tabButton, list: style.pageLink_tabList }}
            >
              <Tabs.List>
                {slideArr.map((data, i) => {
                  return (
                    <Tabs.Tab
                      value={data?.link}
                      key={data?.link}
                      tabKey={data?.link}
                      ref={(el) => (tabsRef.current[i] = el)}
                    >
                      <RegularFont color={grey_font_color}>{data.label}</RegularFont>
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>
            </Tabs>{' '}
          </div>
          <CustomNextArrow
            right={isMobile ? '0px' : '-8px'}
            //  onClick={handleNext}
          />
        </Group>
      </Container>
    </div>
  );
}
