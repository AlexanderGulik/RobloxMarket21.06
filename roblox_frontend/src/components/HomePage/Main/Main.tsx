import classes from './Main.module.css';
import ClassicButton from '../../UI/buttons/Classic/ClassicButton';
import { Link } from 'react-router';

const Main = () => {
  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div className={classes.PreviewSection}>
      <div className={classes.PreviewText}>
        <h1>Добро пожаловать в Roblox Market!</h1>
        <p>Лучший магазин по Roblox</p>
        <div className={classes.Buttons}>
          <Link to="/catalog">
            <ClassicButton type={1}>КУПИТЬ СЕЙЧАС</ClassicButton>
          </Link>
          <ClassicButton type={2} onClick={scrollToFAQ}>
            КАК КУПИТЬ?
          </ClassicButton>
        </div>
      </div>
    </div>
  );
};

export default Main;
