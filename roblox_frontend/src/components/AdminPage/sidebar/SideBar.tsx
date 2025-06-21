import { useState } from 'react';
import { Link } from 'react-router';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import {
  Menu as MenuIcon,
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon,
  AddBox as AddBoxIcon,
} from '@mui/icons-material';
import styles from './Sidebar.module.css';
import { Inventory } from '@mui/icons-material';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.sidebarHeader}>
        <IconButton onClick={toggleSidebar} className={styles.menuButton}>
          <MenuIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem component={Link} to="/adminpanel/categories" className={styles.navItem}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Категории" />}
        </ListItem>
        <ListItem component={Link} to="/adminpanel/products" className={styles.navItem}>
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Продукты" />}
        </ListItem>
        <ListItem component={Link} to="/adminpanel/orders" className={styles.navItem}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Заказы" />}
        </ListItem>
        <ListItem component={Link} to="/adminpanel/add-category" className={styles.navItem}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Добавить категорию" />}
        </ListItem>
        <ListItem component={Link} to="/adminpanel/add-product" className={styles.navItem}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Добавить продукт" />}
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
