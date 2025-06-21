import axios from 'axios';
import { UrlEnums } from '../const/URLs/urls';
import { FormDataI, UserI } from '../types/common';
import { CartI } from '../store/cart/cart.slice';
import { PaymentInitResponseI } from '../types/responseTypes';

export class PaymentService {
  static async paymentInit(cart: CartI, user: UserI | null, formData: FormDataI) {
    const response = await axios.post<PaymentInitResponseI>(`${UrlEnums.HOST}/payment/init`, { cart, user, formData });
    return response;
  }
}
