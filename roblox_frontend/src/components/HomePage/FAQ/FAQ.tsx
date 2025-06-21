import { useState } from 'react';
import styles from './FAQ.module.css'; // Импорт CSS Modules
import { faqData } from '../../../const/FAQConst.ts';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className={styles.faqContainer}>
      <h2>Помощь с вопросом</h2>
      <div key={0} className={styles.faqItem}>
        <div className={styles.HorizontalLine}></div>
        <div className={styles.questionContainer} onClick={() => handleItemClick(0)}>
          <span className={styles.question}>❓ Как приобрести товар</span>
          <div className={`${styles.StateSign} ${activeIndex === 0 ? styles.SignActive : ''}`}>+</div>
        </div>
        <div className={`${styles.answerContainer} ${activeIndex === 0 ? styles.active : ''}`}>
          <p className={styles.answer}>
            Для того, чтобы приобрести товар, вам нужно:
            <br />
            1) Выбрать товар и его количество
            <br />
            2) Нажать на корзину
            <br />
            3) Заполнить личные данные
            <br />
            4) Оплатить заказ.
          </p>
        </div>
      </div>
      {faqData.map((item, index) => (
        <div key={index + 1} className={styles.faqItem}>
          <div className={styles.HorizontalLine}></div>
          <div className={styles.questionContainer} onClick={() => handleItemClick(index + 1)}>
            <span className={styles.question}>{item.question}</span>
            <div className={`${styles.StateSign} ${activeIndex === index + 1 ? styles.SignActive : ''}`}>+</div>
          </div>
          <div className={`${styles.answerContainer} ${activeIndex === index + 1 ? styles.active : ''}`}>
            <p className={styles.answer}>{item.answer}</p>
          </div>
        </div>
      ))}
      <div className={styles.HorizontalLine}></div>
    </div>
  );
};

export default FAQ;
