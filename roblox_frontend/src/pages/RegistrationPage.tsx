import HeaderStatic from '../components/UI/Header/HeaderStatic';
import { RegistrationForm } from '../components/RegistrationPage/RegistrationForm';
import Footer from '../components/UI/Footer/Footer';
import { Helmet } from 'react-helmet';
export const RegistrationPage = () => {
  return (
    <>
      <Helmet>
        <title>Roblox Market - Регистрация аккаунта</title>
        <meta name="description" content="Регистрация аккаунта в Roblox Market - RM"></meta>
      </Helmet>
      <HeaderStatic />
      <main>
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
};
