import { UrlEnums } from '../../const/URLs/urls';
import classes from './Cart.module.css';
import { useCart } from '../../hooks/useCart';
import CartInput from '../UI/inputs/CartInput/CartInput';
import { useActions } from '../../hooks/useAction';
import CancelIcon from '@mui/icons-material/Cancel';

export const Cart = () => {
  const cart = useCart();
  const { removeProductFromCart } = useActions();

  return (
    <div className={classes.CartContainer}>
      <div className={classes.CartTitle}>
        {cart.products.length ? (
          <h2>Ваши товары к оплате:</h2>
        ) : (
          <h2>Корзина пуста. Добавьте в корзину хотя бы один товар.</h2>
        )}
      </div>
      <div className={classes.CartList}>
        {cart.products.map((item) => (
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
            <div className={classes.CloseButton} onClick={() => removeProductFromCart(item)}>
              <CancelIcon />
            </div>
          </div>
        ))}
      </div>
      <div className={classes.HorizontalLine}></div>
      <div className={classes.CartCost}>{cart.products.length ? <span>Сумма: {cart.amount} р.</span> : ''}</div>
    </div>
  );
};
