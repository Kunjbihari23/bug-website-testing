'use client';
import React, { useRef, useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import styles from './StaticPages.module.css';
import { Image } from '@mantine/core';

const ImageSlider = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  if (!images.length) {
    return <div className={styles.noImages}>No images available</div>;
  }

  if (images.length > 0 && typeof images === 'string') {
    return (
      <div className={styles.singleImageContainer}>
        <Image src={images} alt={images[0].fileName} className={styles.singleImage} />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={styles.singleImageContainer}>
        <Image src={images[0].filePath} alt={images[0].fileName} className={styles.singleImage} />
      </div>
    );
  }

  const updateCarousel = (newIndex) => {
    setActiveIndex(newIndex);
    scrollToActiveSlide(newIndex);
  };

  const scrollToActiveSlide = (index) => {
    const carouselSlider = carouselRef.current;
    if (!carouselSlider) return;

    const activeSlide = carouselSlider.children[index];
    if (!activeSlide) return;

    const { offsetLeft, offsetWidth } = activeSlide;
    const { clientWidth } = carouselSlider;

    carouselSlider.scrollTo({
      left: offsetLeft - clientWidth / 2 + offsetWidth / 2,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className={`${styles.container} `}>
      <div className={styles.mainImageContainer}>
        <img src={images[activeIndex].filePath} alt={images[activeIndex].fileName} className={styles.mainImage} />

        {activeIndex > 0 && (
          <button
            onClick={() => updateCarousel(activeIndex - 1)}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous image"
          >
            <IconChevronLeft size={24} stroke={2} />
          </button>
        )}
        {activeIndex < images.length - 1 && (
          <button
            onClick={() => updateCarousel(activeIndex + 1)}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next image"
          >
            <IconChevronRight size={24} stroke={2} />
          </button>
        )}
      </div>

      {/* <div className={styles.thumbnailSection}>
        <div ref={carouselRef} className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <button
              key={image.fileId}
              onClick={() => updateCarousel(index)}
              className={`${styles.thumbnailButton} ${index === activeIndex ? styles.activeThumbnail : ''}`}
            >
              <img src={image.filePath} alt={image.fileName} className={styles.thumbnailImage} loading="lazy" />
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ImageSlider;
