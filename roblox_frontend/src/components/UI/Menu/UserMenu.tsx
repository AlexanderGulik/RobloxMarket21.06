import { useState } from 'react';
import styles from './UserMenu.module.css';
import { Link } from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUser } from '../../../hooks/useUser';
import { useActions } from '../../../hooks/useAction';
import { AuthService } from '../../../API/AuthService';
import { UserStoreI } from '../../../types/common';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user: UserStoreI = useUser();
  const { setUser } = useActions();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handeLogout = async () => {
    const response = await AuthService.userLogout();
    if (response.status === 200) {
      const newUserState = {
        accessToken: null,
        isAuthenticated: false,
        user: null,
      };
      setUser(newUserState);
      localStorage.setItem('store', JSON.stringify(newUserState));
    }
  };

  return (
    <div className={styles.burgerMenu}>
      <div className={styles.UserMenuButton} onClick={toggleMenu}>
        <AccountCircleIcon
          sx={{
            color: 'white',
            fontSize: '38px',
            marginLeft: '20px',
          }}
        />
      </div>

      <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.menuList}>
          <Link to="/profile">
            <li className={styles.menuItem}>Личный кабинет</li>
          </Link>
          {user.user?.roles === 'admin' && (
            <Link to="/adminpanel">
              <li className={styles.menuItem}>Админ панель</li>
            </Link>
          )}
          <li
            className={` ${styles.menuItemRed} ${styles.menuItem}`}
            onClick={() => {
              handeLogout();
            }}
          >
            Выход
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserMenu;
