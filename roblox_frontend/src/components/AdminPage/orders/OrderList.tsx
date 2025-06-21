import { Link, Outlet, useLocation } from 'react-router';
import classes from './OrderList.module.css';

const OrderList = () => {
  const location = useLocation();

  return (
    <div>
      <div className={classes.navigation}>
        <Link
          to="/adminpanel/orders/income"
          className={`${classes.navLink} ${location.pathname.includes('/income') ? classes.active : ''}`}
        >
          Входящие заказы
        </Link>
        <Link
          to="/adminpanel/orders/archive"
          className={`${classes.navLink} ${location.pathname.includes('/archive') ? classes.active : ''}`}
        >
          Архив заказов
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default OrderList;
