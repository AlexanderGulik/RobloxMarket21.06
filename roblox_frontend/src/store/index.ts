import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducer as categoriesSlice } from './categories/categories.slice';
import { reducer as productsSlice } from './products/products.slice';
import { reducer as cartSlice } from './cart/cart.slice';
import { reducer as userSlice } from './user/user.slice';
import { reducer as messagesSlice } from './messages/messages.slice';
import { CategoriesSliceI } from './categories/categories.slice';
import { ProductSliceI } from './products/products.slice';
import { CartSliceI } from './cart/cart.slice';
import { UserSliceI } from '../types/common';
import { MessagesSliceI } from './messages/messages.slice';

export interface RootSliceI {
  categoriesSlice: CategoriesSliceI;
  productsSlice: ProductSliceI;
  cartSlice: CartSliceI;
  userSlice: UserSliceI;
  messagesSlice: MessagesSliceI;
}

const rootReducer = combineReducers({
  categoriesSlice,
  productsSlice,
  cartSlice,
  userSlice,
  messagesSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
