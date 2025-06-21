import HeaderComponent from '../components/UI/Header/HeaderComponent';
import Footer from '../components/UI/Footer/Footer';
import PrivacyComponent from '../components/PrivacyPolicy/PrivacyContent/PrivacyComponent';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Roblox Market - Политика конфиденциальности</title>
        <meta name="description" content="Политика конфиденциальности для Roblox Market - RM"></meta>
      </Helmet>
      <HeaderComponent />
      <main>
        <PrivacyComponent />
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
