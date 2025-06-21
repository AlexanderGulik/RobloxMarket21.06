import HeaderStatic from '../components/UI/Header/HeaderStatic';
import { LoginForm } from '../components/LoginPage/LoginForm/LoginForm';
import Footer from '../components/UI/Footer/Footer';
import { Helmet } from 'react-helmet';

export const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Roblox Market - Вход в личный кабинет</title>
        <meta name="description" content="Вход в личный кабинет Roblox Market - RM"></meta>
      </Helmet>
      <HeaderStatic />
      <main>
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};
