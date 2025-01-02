import React from 'react';
import { Title, Text } from '@mantine/core';
import style from './typography.module.css';

const HeadingOne = ({ children, color = '#091E42', textAlign = 'start', fontWeight = 400, lineClamp = null }) => {
  return (
    <Title
      order={1}
      c={color}
      classNames={{ root: style.headingOne }}
      ta={textAlign}
      fontWeight={fontWeight}
      lineClamp={lineClamp}
    >
      {children}
    </Title>
  );
};

const HeadingTwo = ({ children, color = '#091E42', textAlign = 'start', fontWeight = 400, lineClamp = null }) => {
  return (
    <Title
      order={2}
      c={color}
      classNames={{ root: style.headingTwo }}
      ta={textAlign}
      fw={fontWeight}
      lineClamp={lineClamp}
    >
      {children}
    </Title>
  );
};

const HeadingThree = ({ children, color = '#091E42', textAlign = 'start', fontWeight = 400, lineClamp = null }) => {
  return (
    <Title
      order={3}
      c={color}
      classNames={{ root: style.headingThree }}
      ta={textAlign}
      fw={fontWeight}
      lineClamp={lineClamp}
    >
      {children}
    </Title>
  );
};

const HeadingFour = ({ children, color = '#091E42', textAlign = 'start', fontWeight = 400, lineClamp = null }) => {
  return (
    <Title
      order={4}
      c={color}
      classNames={{ root: style.headingFour }}
      ta={textAlign}
      fw={fontWeight}
      lineClamp={lineClamp}
    >
      {children}
    </Title>
  );
};

const HeadingFive = ({ children, color = '#091E42', textAlign = 'start', fontWeight = 400, lineClamp = null }) => {
  return (
    <Title
      order={5}
      c={color}
      classNames={{ root: style.headingFive }}
      ta={textAlign}
      fw={fontWeight}
      lineClamp={lineClamp}
    >
      {children}
    </Title>
  );
};

const HeadingSix = ({ children, color = '#091E42', textAlign = 'start', fontWeight = 400, lineClamp = null }) => {
  return (
    <Title
      order={6}
      c={color}
      classNames={{ root: style.headingSix }}
      ta={textAlign}
      fw={fontWeight}
      lineClamp={lineClamp}
    >
      {children}
    </Title>
  );
};

const RegularBigFont = ({ children, color = '#091E42', fontWeight = 400, textAlign = 'start', lineClamp = null }) => {
  return (
    <Text
      fw={fontWeight}
      lts={-0.5}
      c={color}
      ta={textAlign}
      classNames={{ root: style.regularBigFont }}
      lineClamp={lineClamp}
    >
      {children}
    </Text>
  );
};

const RegularFont = ({ children, color = '#091E42', fontWeight = 400, textAlign = 'start', lineClamp = null }) => {
  return (
    <Text
      fw={fontWeight}
      lts={-0.5}
      c={color}
      classNames={{ root: style.regularFont }}
      ta={textAlign}
      lineClamp={lineClamp}
    >
      {children}
    </Text>
  );
};

const SmallFont = ({
  children,
  color = '#091E42',
  fontWeight = 400,
  textAlign = 'start',
  extraClass = '',
  lineClamp = null,
  fs = '',
}) => {
  return (
    <Text
      fw={fontWeight}
      lts={0}
      c={color}
      classNames={{ root: `${style.smallFont} ${extraClass}` }}
      ta={textAlign}
      lineClamp={lineClamp}
      fs={fs}
    >
      {children}
    </Text>
  );
};

const CaptionFont = ({ children, color = '#091E42', fontWeight = 700, textAlign = 'start', lineClamp = null }) => {
  return (
    <Text
      fw={fontWeight}
      lts={1}
      c={color}
      classNames={{ root: style.captionFont }}
      ta={textAlign}
      lineClamp={lineClamp}
    >
      {children}
    </Text>
  );
};

const ExtraSmallFont = ({ children, color = '#091E42', fontWeight = 300, textAlign = 'start', lineClamp = null }) => {
  return (
    <Text
      fw={fontWeight}
      lts={-0.5}
      c={color}
      classNames={{ root: style.extraSmallFont }}
      ta={textAlign}
      lineClamp={lineClamp}
    >
      {children}
    </Text>
  );
};

const ErrorText = ({ children }) => {
  return (
    <Text size="xs" c="red" mt={5} className="custom-error-form">
      {children}
    </Text>
  );
};

export {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  HeadingFive,
  HeadingSix,
  RegularBigFont,
  RegularFont,
  SmallFont,
  CaptionFont,
  ExtraSmallFont,
  ErrorText,
};
