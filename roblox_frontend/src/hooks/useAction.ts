import { useDispatch } from 'react-redux';
import { actions as categoriesAction } from '../store/categories/categories.slice.ts';
import { actions as productsAction } from '../store/products/products.slice.ts';
import { actions as cartAction } from '../store/cart/cart.slice.ts';
import { actions as userAction } from '../store/user/user.slice.ts';
import { bindActionCreators } from 'redux';
import { useMemo } from 'react';
import { actions as messagesAction } from '../store/messages/messages.slice.ts';
const rooActions = {
  ...categoriesAction,
  ...productsAction,
  ...cartAction,
  ...userAction,
  ...messagesAction,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rooActions, dispatch), [dispatch]);
};
