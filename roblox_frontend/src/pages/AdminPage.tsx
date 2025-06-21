import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/AdminPage/sidebar/SideBar';
import classes from '../components/AdminPage/AdminPage.module.css';
import HeaderStatic from '../components/UI/Header/HeaderStatic';
import Footer from '../components/UI/Footer/Footer';
import { useFetching } from '../hooks/useFetching';
import { AdminService } from '../API/AdminService';
import { useNavigate } from 'react-router';
import PageLoader from '../components/UI/Loaders/PageLoader';
import { useActions } from '../hooks/useAction';
import { putItemInLocalStorage, getItemFromLocalStorage } from '../utils/LocalStorage';
import { Helmet } from 'react-helmet';

const AdminPage: React.FC = () => {
  const { setUser } = useActions();
  const navigate = useNavigate();
  const [isAdminChecked, setIsAdminChecked] = useState<boolean>(false);

  const [fetchAdmin, isLoading] = useFetching(async () => {
    try {
      await AdminService.checkAdmin();
      setIsAdminChecked(true);
    } catch (error) {
      let storageUser = getItemFromLocalStorage('store');
      storageUser.user.roles = 'user';
      putItemInLocalStorage('store', storageUser);
      setUser({ ...storageUser });
      navigate('/');
    }
  });

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <Helmet>
            <title>Roblox Market - Панель администратора</title>
            <meta name="description" content="Панель администратора Roblox Market - RM Shop"></meta>
          </Helmet>
          <HeaderStatic />
          <div className={classes.adminPanel}>
            <Sidebar />
            <div className={classes.content}>{isAdminChecked && <Outlet />}</div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default AdminPage;
