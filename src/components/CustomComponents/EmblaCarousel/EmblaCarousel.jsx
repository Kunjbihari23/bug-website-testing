'use client';
import useEmblaCarousel from 'embla-carousel-react';

import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';

import './css/embla.css';
import Image from 'next/image';

const EmblaCarouselEasy = (props) => {
  const { slides = '', options = '', showNextPReButtions = 'false', children, showDots } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          {showNextPReButtions && (
            <>
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </>
          )}
        </div>

        <div className="embla__dots" style={{ display: showDots === false ? 'none' : 'flex' }}>
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

export default EmblaCarouselEasy;
