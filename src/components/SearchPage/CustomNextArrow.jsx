import { ActionIcon, rem } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

const CustomNextArrow = (props) => {
  const {
    className,
    style,
    onClick,
    right,
    currentSlide,
    slideCount,
    slidesToShow,
    height = '40px',
    width = '40px',
  } = props;
  const isLastSlide = currentSlide === slideCount - slidesToShow;

  if (isLastSlide) return null;

  return (
    <ActionIcon
      size={42}
      variant="default"
      radius="xl"
      aria-label="Next Arrow"
      style={{
        ...style,
        display: 'block',
        background: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: width,
        height: height,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: right,
        cursor: 'pointer',
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <IconChevronRight style={{ width: rem(24), height: rem(24) }} />
    </ActionIcon>
  );
};

export default CustomNextArrow;
