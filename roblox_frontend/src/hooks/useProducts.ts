import { useSelector } from 'react-redux';
import { RootSliceI } from '../store/index.ts';

export const useProducts = () => {
  const products = useSelector((state: RootSliceI) => state.productsSlice.products);
  return products;
};
