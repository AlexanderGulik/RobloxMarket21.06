import { CartI } from '../store/cart/cart.slice';

export interface CategoriesI {
  category_id: number;
  name: string;
  image: string;
}

export interface ProductsI {
  product_id: number;
  name: string;
  cost: number;
  oldCost: number;
  image: string;
  category: string;
}

export interface CartItemI {
  product_id: number;
  name: string;
  amount: number;
  image: string;
  price: number;
  quantity: number;
}

export interface filterStateI {
  name: undefined | string;
  minCost: undefined | number;
  maxCost: undefined | number;
  category: undefined | string;
  filter: undefined | string;
}

export interface LoginDataI {
  email: string;
  password: string;
}

export interface RegistrationDataI {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserI {
  username: string;
  email: string;
  roles: string;
}

export interface UserStoreI {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: UserI | null;
}

export interface UserSliceI {
  store: {
    accessToken: string | null;
    isAuthenticated: boolean;
    user: UserI | null;
  };
}

export interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormValuesLogin {
  email: string;
  password: string;
}

export interface FormDataI {
  telegram: string;
  roblox: string;
  phone: string;
}

export interface MessageI {
  id: number;
  type: 'error' | 'success';
  text: string;
}

export interface OrderItemAdminI {
  price: number;
  quantity: number;
  product_id: number;
  product_name: string;
  product_image: string;
}

export interface OrderAdminI {
  order_id: string;
  telegram_name: string;
  roblox_name: string;
  phone_number: string;
  amount: string;
  status: string;
  created_at: string;
  payment_id: string;
  order_type: string;
  updated_at: string;
  username: string | null;
  email: string | null;
  items: OrderItemAdminI[];
}

export interface OrderResponseAdminI {
  orders: OrderAdminI[];
  total: string;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface PaymentInitI {
  cart: CartI;
  user: UserI;
  formData: FormDataI;
}
