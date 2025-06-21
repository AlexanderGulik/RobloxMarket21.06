import { createSlice } from '@reduxjs/toolkit';
import { CartItemI } from '../../types/common';

export interface CartSliceI {
  cart: CartI;
}

export interface CartI {
  products: CartItemI[];
  amount: number;
  total: number;
  isVisible: boolean;
}

export const defaultState: CartSliceI = {
  cart: {
    products: [],
    amount: 0,
    total: 0,
    isVisible: false,
  },
};

function isCart(cart: unknown): cart is CartI {
  return (
    typeof cart === 'object' &&
    cart !== null &&
    'products' in cart &&
    'amount' in cart &&
    'total' in cart &&
    'isVisible' in cart
  );
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: defaultState,
  reducers: {
    initProductCart: (state, { payload: init }: { payload: CartSliceI }) => {
      if (isCart(init)) {
        if (init.total > 0) {
          const cart = JSON.stringify(init);
          state.cart = JSON.parse(cart);
        }
      }
    },
    addProductsInCart: (state, { payload: product }: { payload: CartItemI }) => {
      const isExist = state.cart.products.findIndex((prod) => prod.product_id === product.product_id);
      if (isExist >= 0) {
        state.cart.products[isExist].amount = parseFloat(
          (state.cart.products[isExist].amount + product.amount).toFixed(2)
        );
        state.cart.products[isExist].quantity = state.cart.products[isExist].quantity + product.quantity;
      } else {
        state.cart.products = [...state.cart.products, product];
      }
      state.cart.amount = parseFloat((state.cart.amount + product.amount).toFixed(2));
      state.cart.total = state.cart.total + product.quantity;
      const localStorageCart = JSON.stringify(state.cart);
      localStorage.setItem('cart', localStorageCart);
    },
    changeQuantity: (state, { payload: product }: { payload: CartItemI }) => {
      const item = state.cart.products.findIndex((prod) => prod.product_id === product.product_id);
      if (item >= 0) {
        state.cart.total = state.cart.total + (product.quantity - state.cart.products[item].quantity);
        state.cart.amount = parseFloat(
          (state.cart.amount + (product.amount - state.cart.products[item].amount)).toFixed(2)
        );
        state.cart.products[item].quantity = product.quantity;
        state.cart.products[item].amount = parseFloat(product.amount.toFixed(2));
        const localStorageCart = JSON.stringify(state.cart);
        localStorage.setItem('cart', localStorageCart);
      }
    },
    removeProductFromCart: (state, { payload: product }: { payload: CartItemI }) => {
      state.cart.products = state.cart.products.filter((prod) => prod.product_id !== product.product_id);
      state.cart.total = state.cart.total - product.quantity;
      state.cart.amount = parseFloat((state.cart.amount - product.amount).toFixed(2));
      const localStorageCart = JSON.stringify(state.cart);
      localStorage.setItem('cart', localStorageCart);
    },
    toggleCart: (state, { payload: isVisible }) => {
      state.cart.isVisible = isVisible;
    },
  },
});

export const { actions, reducer } = cartSlice;
