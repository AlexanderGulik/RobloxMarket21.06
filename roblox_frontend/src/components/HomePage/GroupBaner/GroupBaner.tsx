import clasess from './GroupBaner.module.css';
import banerImg from '../../../assets/images/banerTest.png';

const GroupBaner = () => {
  return (
    <div className={clasess.BannerContainer}>
      <div className={clasess.BannerFlex}>
        <div className={clasess.BannerItem}>
          <h2>ПРИСОЕДИНЯЙТЕСЬ В НАШУ БЕСЕДУ!</h2>
          <p>Присоединяйтесь, чтобы иметь возможность выиграть крутые призы и найти новых друзей</p>
          <button>
            <a href="https://t.me/toiletmarketrutrade" target="blank">
              Перейти
            </a>
          </button>
        </div>
        <div className={`${clasess.BannerItem} ${clasess.FlexItem2}`}>
          <img src={banerImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GroupBaner;
