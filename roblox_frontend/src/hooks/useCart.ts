import { useSelector } from 'react-redux';
import { RootSliceI } from '../store/index.ts';

export const useCart = () => {
  const cart = useSelector((state: RootSliceI) => state.cartSlice.cart);
  return cart;
};
