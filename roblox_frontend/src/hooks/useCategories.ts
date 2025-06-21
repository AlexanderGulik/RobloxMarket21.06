import { useSelector } from 'react-redux';
import { RootSliceI } from '../store/index.ts';

export const useCategories = () => {
  const categories = useSelector((state: RootSliceI) => state.categoriesSlice.categories);

  return categories;
};
