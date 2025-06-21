import { useSelector } from 'react-redux';
import { RootSliceI } from '../store/index.ts';

export const useUser = () => {
  const user = useSelector((state: RootSliceI) => state.userSlice.store);

  return user;
};
