import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import HomePage from '../../pages/HomePage.tsx';
import TermOfUse from '../../pages/TermOfUse.tsx';
import PrivacyPolicy from '../../pages/PrivacyPolicy.tsx';
import CatalogPage from '../../pages/CatalogPage.tsx';
import { LoginPage } from '../../pages/LoginPage.tsx';
import { PersonalCabinetPage } from '../../pages/PersonalCabinetPage.tsx';
import { useUser } from '../../hooks/useUser.ts';
import { useActions } from '../../hooks/useAction.ts';
import { RegistrationPage } from '../../pages/RegistrationPage.tsx';
import { PaymentPage } from '../../pages/PaymentPage.tsx';
import AdminPage from '../../pages/AdminPage.tsx';
import CategoryList from '../AdminPage/categories/CategoryList.tsx';
import ProductList from '../AdminPage/products/ProductList.tsx';
import OrderList from '../AdminPage/orders/OrderList.tsx';
import IncomeOrdersList from '../AdminPage/orders/IncomeOrdersList.tsx';
import ArchiveOrdersList from '../AdminPage/orders/ArchiveOrdersList.tsx';
import AddEditCategory from '../AdminPage/AddEditCategory.tsx';
import AddEditProduct from '../AdminPage/AddEditProducts.tsx';

const AppRouter = () => {
  const user = useUser();
  const { userInit } = useActions();

  useEffect(() => {
    const store = localStorage.getItem('store');
    if (store) {
      try {
        const parsed = JSON.parse(store);
        userInit(parsed);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      {user.isAuthenticated ? (
        user.user?.roles === 'admin' ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termofuse" element={<TermOfUse />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/profile" element={<PersonalCabinetPage />} />
            <Route path="/adminpanel/*" element={<AdminPage />}>
              <Route path="categories" element={<CategoryList />} />
              <Route path="products" element={<ProductList />} />
              <Route path="orders" element={<OrderList />}>
                <Route path="income" element={<IncomeOrdersList />} />
                <Route path="archive" element={<ArchiveOrdersList />} />
                <Route index element={<IncomeOrdersList />} />
              </Route>
              <Route path="add-category" element={<AddEditCategory />} />
              <Route path="add-product" element={<AddEditProduct />} />
            </Route>
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termofuse" element={<TermOfUse />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/profile" element={<PersonalCabinetPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termofuse" element={<TermOfUse />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
