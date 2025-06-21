import HeaderComponent from '../components/UI/Header/HeaderComponent.tsx';
import Category from '../components/HomePage/Category/Category.tsx';
import Main from '../components/HomePage/Main/Main.tsx';
import RuningString from '../components/UI/string/RuningString.tsx';
import Slider from '../components/HomePage/Slider/Slider.tsx';
import Products from '../components/HomePage/Products/Products.tsx';
import FAQ from '../components/HomePage/FAQ/FAQ.tsx';
import GroupBaner from '../components/HomePage/GroupBaner/GroupBaner.tsx';
import Footer from '../components/UI/Footer/Footer.tsx';
import AnimatedItem from '../components/UI/Animated/ACItem.tsx';
import ProductsTitle from '../components/HomePage/Products/ProductTitle.tsx';
import { Helmet } from 'react-helmet';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Roblox Market - RM Shop</title>
      </Helmet>
      <HeaderComponent />
      <main>
        <Main />
        <RuningString color="#00ec47" text="Roblox Market" />
        <Category />
        <ProductsTitle />
        <Products />
        <RuningString color="#F2944B" text="Roblox Market" />
        <FAQ />
        <AnimatedItem>
          <GroupBaner />
        </AnimatedItem>
        <Slider />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
