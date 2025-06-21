import httpClient from './httpClient';
import { UrlEnums } from '../const/URLs/urls';
import { OrderResponseAdminI } from '../types/common';

export class AdminService {
  static async saveProductChanges(product: FormData) {
    const response = await httpClient.put(`${UrlEnums.HOST}/admin/modify-product`, product);
    return response;
  }

  static async saveCategoryChanges(category: FormData) {
    const response = await httpClient.put(`${UrlEnums.HOST}/admin/modify-category`, category);
    return response;
  }

  static async createCategory(category: FormData) {
    const response = await httpClient.post(`${UrlEnums.HOST}/admin/create-category`, category);
    return response;
  }
  static async createProduct(product: FormData) {
    const response = await httpClient.post(`${UrlEnums.HOST}/admin/create-product`, product);
    return response;
  }

  static async deleteCategory(id: number) {
    const response = await httpClient.delete(`${UrlEnums.HOST}/admin/delete-category/?id=${id}`);
    return response;
  }

  static async deleteProduct(id: number) {
    const response = await httpClient.delete(`${UrlEnums.HOST}/admin/delete-product/?id=${id}`);
    return response;
  }

  static async getIncomeOrders(page: number = 1, limit: number = 25) {
    const response = await httpClient.get<OrderResponseAdminI>(
      `${UrlEnums.HOST}/admin/income-orders?page=${page}&limit=${limit}`
    );
    return response;
  }

  static async getArchiveOrders(page: number = 1, limit: number = 25) {
    const response = await httpClient.get<OrderResponseAdminI>(
      `${UrlEnums.HOST}/admin/archive-orders?page=${page}&limit=${limit}`
    );
    return response;
  }

  static async changeOrderTypeById(orderId: string, orderType: string) {
    const response = await httpClient.put(`${UrlEnums.HOST}/admin/change-order-type`, { orderId, orderType });
    return response;
  }

  static async checkAdmin() {
    const response = await httpClient.get(`${UrlEnums.HOST}/admin/check`);
    return response;
  }
}
