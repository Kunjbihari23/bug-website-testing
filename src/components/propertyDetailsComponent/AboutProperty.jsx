import React, { useState, useMemo } from 'react';
import { Divider, Skeleton, Stack, UnstyledButton, Drawer } from '@mantine/core';
import { HeadingSix, RegularBigFont } from '../CustomComponents/TypographyComponent/HeadingComponents';
import { secondary_dark } from '@/constant/FontColotConstant';

const AboutProperty = ({ description = '', isPending }) => {
  const [readMore, setReadMore] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const { shortDescription, hasMoreContent } = useMemo(() => {
    if (!description) {
      return { shortDescription: '', hasMoreContent: false };
    }
    const words = description.split(/\s+/);
    if (words.length <= 100) {
      return { shortDescription: description, hasMoreContent: false };
    }
    return {
      shortDescription: words.slice(0, 50).join(' ') + '...',
      hasMoreContent: true,
    };
  }, [description]);

  const handleReadMore = () => {
    setReadMore(true);
    setDrawerOpened(true);
  };

  return (
    <>
      <Stack gap={8}>
        <HeadingSix fontWeight={500}>About Property</HeadingSix>
        {isPending ? (
          <Stack gap={8}>
            <Skeleton h={20} w={'100%'} />
            <Skeleton h={20} w={'100%'} />
            <Skeleton h={16} w={150} />
          </Stack>
        ) : (
          <>
            <RegularBigFont fontWeight={400} color={'#51565A'}>
              {shortDescription}
            </RegularBigFont>
            {hasMoreContent && (
              <UnstyledButton onClick={handleReadMore}>
                <RegularBigFont color={secondary_dark}>Read more about property</RegularBigFont>
              </UnstyledButton>
            )}
          </>
        )}
      </Stack>
      <Divider />

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={<RegularBigFont fontWeight={500}>Property Description</RegularBigFont>}
        padding="xl"
        size="md"
      >
        <RegularBigFont fontWeight={400} color={'#51565A'}>
          {description}
        </RegularBigFont>
      </Drawer>
    </>
  );
};

export default AboutProperty;
