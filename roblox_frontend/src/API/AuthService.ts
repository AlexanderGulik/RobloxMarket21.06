import axios, { AxiosError } from 'axios';
import httpClient from './httpClient';
import { UrlEnums } from '../const/URLs/urls';
import { LoginDataI, RegistrationDataI } from '../types/common';

interface ServerErrorI {
  message: string;
}

export class AuthService {
  static async userLogin(formData: LoginDataI) {
    try {
      const response = await axios.post(`${UrlEnums.HOST}/auth/login`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ServerErrorI>;

      if (axiosError.response) {
        return {
          error: true,
          status: axiosError.response.status,
          message: axiosError.response.data.message || 'Произошла ошибка при входе',
        };
      } else {
        return {
          error: true,
          message: 'Неизвестная ошибка, повторите позже.',
        };
      }
    }
  }

  static async userRegistration(formData: RegistrationDataI) {
    try {
      const response = await axios.post(`${UrlEnums.HOST}/auth/register`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ServerErrorI>;

      if (axiosError.response) {
        return {
          error: true,
          status: axiosError.response.status,
          message: axiosError.response.data.message || 'Произошла ошибка при регистрации',
        };
      } else {
        return {
          error: true,
          message: 'Неизвестная ошибка, повторите позже.',
        };
      }
    }
  }

  static async getUserInfo(page: number = 1, limit: number = 10) {
    const response = await httpClient.get(`/user/profile?page=${page}&limit=${limit}`);
    return response;
  }

  static async userLogout() {
    const response = await httpClient.post(`/auth/logout`, {});
    return response;
  }
}
