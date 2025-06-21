import { useState } from 'react';
import styles from './BurgerMenu.module.css';
import { Link } from 'react-router';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.burgerMenu}>
      <button className={`${styles.burgerButton} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </button>

      <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.menuList}>
          <Link to="/">
            <li className={styles.menuItem}>Главная</li>
          </Link>
          <Link to="/catalog">
            <li className={styles.menuItem}>Каталог товаров</li>
          </Link>
          <a href="https://youtu.be/uXbkn0tiG8c?si=RXJU4W-M1Bvstqii" target="blank">
            <li className={styles.menuItem}>Туториал по покупке</li>
          </a>
          <a href="https://t.me/toiletmarketrutrade" target="blank">
            <li className={styles.menuItem}>Новостной канал</li>
          </a>
          <a href="https://t.me/toiletmarket0" target="blank">
            <li className={styles.menuItem}>Связаться с нами</li>
          </a>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;
