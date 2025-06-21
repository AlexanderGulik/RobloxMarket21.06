import HeaderComponent from '../components/UI/Header/HeaderComponent.tsx';
import Footer from '../components/UI/Footer/Footer.tsx';
import TermOfUseComponent from '../components/TermOfUse/TermoOfUseComponent.tsx';
import { Helmet } from 'react-helmet';

const TermOfUse = () => {
  return (
    <>
      <Helmet>
        <title>Roblox Market - Пользовательское соглашение</title>
        <meta name="description" content="Пользовательское соглашение для Roblox Market - RM"></meta>
      </Helmet>
      <HeaderComponent />
      <main>
        <TermOfUseComponent />
      </main>
      <Footer />
    </>
  );
};

export default TermOfUse;
