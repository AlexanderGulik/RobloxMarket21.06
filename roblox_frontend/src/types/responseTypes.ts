import { UserI } from './common';

export interface ErrorResponseI {
  message: string;
}

export interface PaymentInitResponseI {
  success: boolean;
  PaymentURL: string;
  orderId: string;
}

export interface UserResponseDataI extends UserI {
  userId: number;
}

export interface UserLoginI {
  message: string;
  accessToken: string;
  user: UserResponseDataI;
}
