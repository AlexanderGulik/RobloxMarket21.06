import axios from 'axios';
import { UrlEnums } from '../const/URLs/urls';
import { filterStateI, ProductsI, CategoriesI } from '../types/common';

export class ShopService {
  static async getAllCategories() {
    const response = await axios.get<CategoriesI[]>(`${UrlEnums.HOST}/categories`);
    return response;
  }

  static async getProductsByParams(limit: number = 4, filterState: filterStateI | null = null, page: number = 1) {
    const nameParam = filterState?.name !== undefined ? `&name=${filterState?.name}` : '';
    const minCostParam = filterState?.minCost !== undefined ? `&minCost=${filterState?.minCost}` : '';
    const maxCostParam = filterState?.maxCost !== undefined ? `&maxCost=${filterState?.maxCost}` : '';
    const categoryParam = filterState?.category !== undefined ? `&category=${filterState?.category}` : '';
    const filterParam = filterState?.filter !== undefined ? `&sort=${filterState.filter}` : '';

    const limitParam = `limit=${limit}`;
    const pageParam = `&page=${page}`;

    const response = await axios.get<ProductsI[]>(
      `${UrlEnums.HOST}/products?${limitParam}${nameParam}${minCostParam}${maxCostParam}${categoryParam}${filterParam}${pageParam}`
    );
    return response;
  }

  static async getProductByCategory(limit: number = 4, category: string | null, page: number = 1) {
    const categoryParam = category !== undefined ? `&category=${category}` : '';
    const pageParam = `&page=${page}`;

    const limitParam = `limit=${limit}`;
    const response = await axios.get<ProductsI[]>(
      `${UrlEnums.HOST}/products?${limitParam}${categoryParam}${pageParam}`
    );
    return response;
  }
}
