import { useEffect, useRef, useState } from 'react';
import classes from './ACItem.module.css';

interface AnimatedI {
  children: React.ReactNode;
}

const ACItem: React.FC<AnimatedI> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className={`${classes.AnimatedElement} ${isVisible ? `${classes.Animate}` : ''}`}>
      {children}
    </div>
  );
};

export default ACItem;
