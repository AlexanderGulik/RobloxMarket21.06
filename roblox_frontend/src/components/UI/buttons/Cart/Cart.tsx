import { IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import classes from './Cart.module.css';
import { useEffect } from 'react';
import { grey, red } from '@mui/material/colors';
import { useCart } from '../../../../hooks/useCart.ts';
import { useActions } from '../../../../hooks/useAction.ts';

interface CartI {
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartI> = ({ setCartModal }) => {
  const cart = useCart();
  const { toggleCart } = useActions();
  useEffect(() => {
    cart.total <= 0 ? toggleCart(false) : toggleCart(true);
  }, [cart.total]);

  return (
    <div className={cart.isVisible ? `${classes.Cart} ${classes.open}` : `${classes.Cart} ${classes.disable}`}>
      <IconButton aria-label="cart">
        <Badge
          badgeContent={cart.total}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: red[700],
              color: 'white',
              padding: '5px',
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <ShoppingCart sx={{ fontSize: '60px', color: grey[900] }} onClick={() => setCartModal((prev) => !prev)} />
        </Badge>
      </IconButton>
    </div>
  );
};

export default Cart;
