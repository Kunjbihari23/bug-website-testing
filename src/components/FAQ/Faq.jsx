'use client';
import React, { useEffect, useState, useMemo } from 'react';
import style from './Faq.module.css';
import { Container, Accordion, Stack, Skeleton, Button } from '@mantine/core';
import {
  HeadingFive,
  HeadingSix,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { grey_font_color, heading_font_color, secondary_dark } from '../../constant/FontColotConstant';
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import { useGetFaqMasterList } from '@/state/faqMaster/faqMaster.hook';
import NodataFound from '../CustomComponents/NodataFound/NodataFound';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';

function Faq({ withQuestion, isSearchFaq = false, faqList }) {
  const [opened, setOpened] = useState(null);
  const [visibleItems, setVisibleItems] = useState(5);

  const queryParams = useMemo(
    () => ({
      PageNumber: 1,
      PageSize: 10,
      currentPage: 1,
      SearchFor: '',
      isactiveonly: true,
    }),
    []
  );

  const { data: faqData, isPending } = useGetFaqMasterList(queryParams);

  const filteredFaqList = useMemo(() => {
    if (!faqData || faqData.length === 0) return [];
    return faqData.list.filter((item) => {
      const isValid = item.faQ_Question && item.faQ_Answer && item.id !== null;
      if (!isValid) {
        console.warn('Skipping invalid FAQ item:', item);
      }
      return isValid;
    });
  }, [faqData]);

  const handleShowMore = () => {
    setVisibleItems((prevVisible) => prevVisible + 5);
  };

  return (
    <div className={style.faq_container} id="propertyId_FAQ">
      <Container mt={20} size={'sm'}>
        {withQuestion ? (
          <div className={style.faq_header} style={{ justifyContent: 'space-between' }}>
            <HeadingSix fontWeight={500}>Frequently Asked Questions</HeadingSix>
            {/* <Stack style={{ backgroundColor: 'white' }} px={16} py={8}>
              <RegularFont fontWeight={500} color={secondary_dark}>
                Have Any Questions? Ask Here.
              </RegularFont>
            </Stack> */}
          </div>
        ) : (
          <div className={style.faq_header} style={{ justifyContent: 'center' }}>
            <HeadingFive fontWeight={500}>Frequently Asked Questions</HeadingFive>
          </div>
        )}
        <div className={style.FAQ_Section}>
          <div className={style.faq_Accordion}>
            {isPending ? (
              Array(5)
                .fill()
                .map((_, i) => {
                  return <Skeleton h={58} key={i} mb={20} />;
                })
            ) : (
              <Accordion variant="separated" pb={10}>
                {!isSearchFaq && filteredFaqList.length !== 0 ? (
                  filteredFaqList.slice(0, visibleItems).map((item) => (
                    <Accordion.Item
                      key={item.id}
                      value={String(item.id)}
                      className={style.accordionItem}
                      onClick={() => setOpened(opened === item.id ? null : item.id)}
                    >
                      <Accordion.Control className={style.accordionControl}>
                        <RegularFont
                          className={style.faq_Accordion_keys}
                          color={opened === item.id ? heading_font_color : grey_font_color}
                          fontWeight={opened === item.id ? 500 : 400}
                        >
                          Q. {item.faQ_Question}
                        </RegularFont>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div
                          style={{
                            marginTop: '20px',
                            marginLeft: '20px',
                          }}
                          dangerouslySetInnerHTML={{
                            __html: item.faQ_Answer,
                          }}
                        />
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))
                ) : (
                  <NodataFound discription="Currently No Questions Available" />
                )}
              </Accordion>
            )}
            {filteredFaqList.length > visibleItems && (
              <Stack pt={20} pb={!withQuestion && 20}>
                <CustomePrimaryButton onClick={handleShowMore} size="extraSmall" btnWidth={'100%'}>
                  Show More
                </CustomePrimaryButton>
              </Stack>
            )}
          </div>
        </div>

        {withQuestion ? (
          <Stack pb={40} className={style.faq_container_footer}>
            <RegularFont color={grey_font_color} fontWeight={300}>
              Is this helpful? <IconThumbUp size={22} />
              Yes <IconThumbDown size={22} /> No
            </RegularFont>
          </Stack>
        ) : null}
      </Container>
    </div>
  );
}

export default Faq;
