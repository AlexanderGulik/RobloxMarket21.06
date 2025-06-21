import Footer from '../components/UI/Footer/Footer';
import HeaderStatic from '../components/UI/Header/HeaderStatic';
import PaymentPageForm from '../components/PaymentPage/PaymentPageForm';
import classes from '../components/PaymentPage/PaymentPage.module.css';
import { Cart } from '../components/PaymentPage/Cart';
import { Helmet } from 'react-helmet';

export const PaymentPage = () => {
  return (
    <>
      <Helmet>
        <title>Roblox Market - Оформление заказа</title>
        <meta name="description" content="Оформление заказа в Roblox Market - RM"></meta>
      </Helmet>
      <HeaderStatic />
      <main className={classes.container}>
        <div className={classes.flexContainer}>
          <PaymentPageForm />
          <Cart />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentPage;
