import React, { useState } from 'react';
import styles from './Slider.module.css';
import { SliderConst } from '../../../const/SliderConst.ts';

const testimonials = SliderConst;

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div>
      <h2 className={styles.SliderTitle}>Отзывы</h2>
      <div className={styles.Flex}>
        <button className={styles.prevButton} onClick={prevSlide}>
          &lt;
        </button>
        <div className={styles.slider}>
          <div
            className={styles.slidesContainer}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.slide}>
                <img src={testimonial.avatar} alt={testimonial.nickname} className={styles.avatar} />
                <p className={styles.review}>{testimonial.review}</p>
                <p className={styles.nickname}>{testimonial.nickname}</p>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.nextButton} onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slider;
