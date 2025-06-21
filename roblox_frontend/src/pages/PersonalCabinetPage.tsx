import { useUser } from '../hooks/useUser';
import Profile from '../components/PersonalCabinetPage/Profile';
import HeaderStatic from '../components/UI/Header/HeaderStatic';
import Footer from '../components/UI/Footer/Footer';
import { useActions } from '../hooks/useAction';
import { AuthService } from '../API/AuthService';
import { UserStoreI } from '../types/common';
import { useEffect, useState } from 'react';
import { putItemInLocalStorage, getItemFromLocalStorage } from '../utils/LocalStorage';
import PageLoader from '../components/UI/Loaders/PageLoader';
import axios from 'axios';
import { AxiosError } from 'axios';
import { ErrorResponseI } from '../types/responseTypes';
import { useMessages } from '../hooks/useMessages';
import AlertComponent from '../components/UI/Alert/AlertComponent';
import { Helmet } from 'react-helmet';

export const PersonalCabinetPage = () => {
  const user = useUser();
  const { setUser } = useActions();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { messages, handleRemoveMessage, handleSetMessage } = useMessages();

  const handleGetUserInfoAndOrders = async () => {
    try {
      setIsUserLoading(true);
      const userInfoResponse = await AuthService.getUserInfo();
      if (userInfoResponse.status === 200) {
        const localItem = getItemFromLocalStorage('store');
        if (localItem) {
          let store: UserStoreI = localItem;
          store.user = { ...userInfoResponse.data.user };
          putItemInLocalStorage('store', store);
          setUser(store);
          setIsUserLoading(false);
        }
        setOrders(userInfoResponse.data.orders);
        setCurrentPage(userInfoResponse.data.pagination.currentPage);
        setTotalPages(userInfoResponse.data.pagination.totalPages);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        const localItem = getItemFromLocalStorage('store');
        if (localItem) {
          let store: UserStoreI = localItem;
          store.isAuthenticated = false;
          store.user = null;
          store.accessToken = null;
          putItemInLocalStorage('store', store);
          setUser(store);
          setIsUserLoading(false);
        }
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении параметров пользователя', 'error');
      }
    }
  };

  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const ordersResponse = await AuthService.getUserInfo(page);
      setOrders(ordersResponse.data.orders);
      setCurrentPage(ordersResponse.data.pagination.currentPage);
      setTotalPages(ordersResponse.data.pagination.totalPages);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении параметров заказов', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUserInfoAndOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Roblox Market - Личный кабинет</title>
        <meta name="description" content="Личный кабинет пользователя Roblox Market - RM"></meta>
      </Helmet>
      <HeaderStatic />
      <main>
        {isUserLoading ? (
          <PageLoader />
        ) : (
          <Profile
            handlePageChange={handlePageChange}
            user={user.user}
            orders={orders}
            isLoading={isLoading}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
        <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
      </main>
      <Footer />
    </>
  );
};
