import { useLocation } from 'react-router';
import { useEffect, useState, useLayoutEffect } from 'react';
import Cart from './components/UI/buttons/Cart/Cart.tsx';
import CartModal from './components/UI/Modal/CartModal.tsx';
import { AnimatePresence } from 'framer-motion';
import { useActions } from './hooks/useAction.ts';
import AppRouter from './components/Router/AppRouter.tsx';

function App() {
  const { pathname } = useLocation();
  const [cartModal, setCartModal] = useState(false);
  const { initProductCart } = useActions();

  useEffect(() => {
    setCartModal(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      try {
        const parsed = JSON.parse(cart);
        initProductCart(parsed);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      <Cart setCartModal={setCartModal} />
      <AnimatePresence>{cartModal && <CartModal setCartModal={setCartModal} />}</AnimatePresence>
      <AppRouter />
    </>
  );
}

export default App;
