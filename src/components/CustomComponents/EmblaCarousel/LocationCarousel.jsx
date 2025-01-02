'use client';
import useEmblaCarousel from 'embla-carousel-react';

import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import './css/location.css';
import { Flex } from '@mantine/core';
import { RegularFont, SmallFont } from '../TypographyComponent/HeadingComponents';

const LocationCarousel = ({ slides = '', options = '', showNextPReButtions = 'false', showDots }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          {slides?.map((val, index) => (
            <div className="embla__Location_slide" key={index}>
              <Flex
                justify="center"
                align="center"
                px="md"
                py="sm"
                style={{ border: '1px solid #DCDDDE', borderRadius: '4px' }}
                className="placeDiv"
              >
                {val?.svg}
                <p>{val?.text}</p>
                <span>{val?.distance}</span>
              </Flex>
            </div>
          ))}
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">{showNextPReButtions && <></>}</div>

        <div className="embla__dots" style={{ display: showDots === 'false' ? 'none' : 'none' }}>
          {showDots && (
            <>
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationCarousel;
