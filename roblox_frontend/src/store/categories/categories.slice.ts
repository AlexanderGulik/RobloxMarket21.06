import { createSlice } from '@reduxjs/toolkit';
import { CategoriesI } from '../../types/common';

export interface CategoriesSliceI {
  categories: CategoriesI[];
}

const defaultState: CategoriesSliceI = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: defaultState,
  reducers: {
    addCategories: (state, { payload: categories }: { payload: CategoriesI[] }) => {
      state.categories = [...categories];
    },
  },
});

export const { actions, reducer } = categoriesSlice;
