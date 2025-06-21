import ProductItem from './ProductItem.tsx';
import classes from './Products.module.css';
import AnimatedItem from '../../UI/Animated/ACItem.tsx';
import { useEffect } from 'react';
import { ProductsLoader } from '../../UI/Loaders/ProductsLoader.tsx';
import { useProducts } from '../../../hooks/useProducts.ts';
import { Link } from 'react-router';
import { useActions } from '../../../hooks/useAction.ts';
import { useFetching } from '../../../hooks/useFetching.ts';
import { ShopService } from '../../../API/ShopService.ts';
import AlertComponent from '../../UI/Alert/AlertComponent.tsx';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../../../types/responseTypes.ts';
import { useMessages } from '../../../hooks/useMessages.ts';

const Products = () => {
  const products = useProducts();
  const { addProducts } = useActions();
  const { messages, handleRemoveMessage, handleSetMessage } = useMessages();

  const [fetchProducts, isLoading] = useFetching(async () => {
    try {
      const response = await ShopService.getProductsByParams(4);
      addProducts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении товаров', 'error');
      }
    }
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={classes.ProductsContainer}>
      {isLoading ? (
        <div className={classes.ProductsList}>
          <ProductsLoader />
        </div>
      ) : products.length ? (
        <div className={classes.ProductsList}>
          {products.map((item, index) =>
            index <= 3 ? (
              <AnimatedItem key={item.product_id}>
                <ProductItem product={item} handleSetMessage={handleSetMessage} />
              </AnimatedItem>
            ) : (
              ''
            )
          )}
        </div>
      ) : (
        <div className={classes.NoItems}>
          <h2>Ничего не найдено</h2>
        </div>
      )}
      <div className={classes.GetButton}>
        <Link to="/catalog">
          <button className={classes.UploadButton}>Больше товаров</button>
        </Link>
      </div>
      <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
    </div>
  );
};

export default Products;
