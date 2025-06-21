import React, { SetStateAction, useEffect, useRef } from 'react';
import classes from './CartModal.module.css';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import CartInput from '../inputs/CartInput/CartInput.tsx';
import { useCart } from '../../../hooks/useCart.ts';
import { useActions } from '../../../hooks/useAction.ts';
import { UrlEnums } from '../../../const/URLs/urls.ts';
import { Link } from 'react-router';

interface CartModalI {
  setCartModal: React.Dispatch<SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalI> = ({ setCartModal }) => {
  const cart = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const { removeProductFromCart } = useActions();

  useEffect(() => {
    cart.total <= 0 ? setCartModal(false) : 0;
  }, [cart.total]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.div
        key={-1}
        className={classes.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setCartModal(false)}
      />
      <motion.div
        key={0}
        className={classes.CartModalContainer}
        ref={cartRef}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div>
          <div className={classes.CartTitleContainer}>
            <div className={classes.CartTitle}>
              <h2>Ваши товары к оплате:</h2>
            </div>
            <div
              className={classes.CloseButton}
              onClick={() => {
                setCartModal((prev) => !prev);
              }}
            >
              <CloseIcon sx={{ fontSize: '48px' }} />
            </div>
          </div>
          <div className={classes.HorizontalLine}></div>
          <div className={classes.CartList}>
            {cart.products.length ? (
              cart.products.map((item) => (
                <div className={classes.CartItem} key={item.product_id}>
                  <div className={classes.CartItemFlex}>
                    <div className={classes.CartItemImage}>
                      <img src={`${UrlEnums.HOST}/uploads/${item.image}`} alt="" />
                    </div>
                    <div className={classes.CartItemInfo}>
                      <div className={classes.CartItemTitle}>{item.name}</div>
                      <div className={classes.CartInput}>
                        <CartInput item={item} value={item.quantity} min={0} max={9999999} />
                      </div>
                      <div className={classes.CartItemCost}>{item.amount} p.</div>
                    </div>
                  </div>
                  <div onClick={() => removeProductFromCart(item)}>
                    <CancelIcon />
                  </div>
                </div>
              ))
            ) : (
              <div className={classes.CartEmpty}>Корзина пуста!</div>
            )}
          </div>
          <div className={classes.HorizontalLine}></div>
          <div className={classes.CartCost}>
            <span>Сумма: {cart.amount} р.</span>
          </div>
          <div className={classes.CartButton}>
            <Link to="/payment">
              <button>Оформить заказ</button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CartModal;
