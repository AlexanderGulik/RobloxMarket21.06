import { createSlice } from '@reduxjs/toolkit';
import { ProductsI } from '../../types/common';

export interface ProductSliceI {
  products: ProductsI[];
}
const defaultState: ProductSliceI = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState: defaultState,
  reducers: {
    addProducts: (state, { payload: products }: { payload: ProductsI[] }) => {
      state.products = [...products];
    },
  },
});

export const { actions, reducer } = productsSlice;
