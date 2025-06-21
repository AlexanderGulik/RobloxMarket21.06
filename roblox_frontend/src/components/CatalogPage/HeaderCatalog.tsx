import ClassicButton from '../UI/buttons/Classic/ClassicButton';
import classes from './HeaderCatalog.module.css';
import { Link } from 'react-router';

const HeaderCatalog = () => {
  return (
    <div>
      <div className={classes.PageHeader}>
        <div className={classes.PageTitle}>
          <p>Roblox Market - RM Shop</p>
          <h1>Каталог товаров</h1>
          <div className={classes.Button}>
            <Link to="/">
              <ClassicButton type={2}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</ClassicButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCatalog;
