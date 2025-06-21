import classes from './Header.module.css';
import BurgerMenu from '../Menu/BurgerMenu';
import { NavLink, Link } from 'react-router';
import logo from '../../../assets/images/photo.png';
import { useUser } from '../../../hooks/useUser';
import UserMenu from '../Menu/UserMenu';

const HeaderStatic = () => {
  const user = useUser();

  return (
    <header className={classes.HeaderContainerStatic}>
      <div className={classes.LogoContainer}>
        <div className={classes.HeaderImg}>
          <Link to="/">
            <img className={classes.HeaderImg} src={logo} alt="TTD" />
          </Link>
        </div>
      </div>

      <nav className={classes.Nav}>
        <ul className={classes.NavFlex}>
          <NavLink to="/" end>
            <li className={classes.NavItem}>Главная</li>
          </NavLink>
          <NavLink to="/catalog" end>
            <li className={classes.NavItem}>Каталог товаров</li>
          </NavLink>
          <li className={classes.NavItem}>
            <a href="https://youtu.be/uXbkn0tiG8c?si=RXJU4W-M1Bvstqii" target="blank">
              Туториал по покупке
            </a>
          </li>
        </ul>
      </nav>

      <div className={classes.ButtonsContainer}>
        <div className={classes.Menu}>
          <BurgerMenu />
        </div>
        <div className={classes.HeaderButtons}>
          <button className={classes.BlueColor}>
            <a href="https://t.me/toiletmarket0" target="blank">
              Связатья с нами
            </a>
          </button>
          {user.isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link to="/login">
              <button>Вход</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderStatic;
