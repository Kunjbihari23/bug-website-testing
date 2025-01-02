import { ActionIcon, rem } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

const CustomPrevArrow = (props) => {
  const {
    className,
    style,
    onClick,
    left,
    // currentSlide,
    slideCount,
    slidesToShow,
    height = '40px',
    width = '40px',
  } = props;

  // if (currentSlide === 0) return null;

  return (
    <ActionIcon
      size={42}
      variant="default"
      aria-label="Prev Arrow"
      radius="xl"
      style={{
        ...style,
        display: 'block',
        background: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: width,
        height: height,
        zIndex: 1,
        position: 'absolute',
        left: left,
        cursor: 'pointer',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      <IconChevronLeft style={{ width: rem(24), height: rem(24) }} />
    </ActionIcon>
  );
};
export default CustomPrevArrow;
