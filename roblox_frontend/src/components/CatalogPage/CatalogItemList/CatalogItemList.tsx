import ProductItem from '../../HomePage/Products/ProductItem.tsx';
import classes from '../../HomePage/Products/Products.module.css';
import AnimatedItem from '../../UI/Animated/ACItem.tsx';
import { SetStateAction, useEffect, useState } from 'react';
import { ProductsLoader } from '../../UI/Loaders/ProductsLoader.tsx';
import { useProducts } from '../../../hooks/useProducts.ts';
import { Pagination } from '@mui/material';
import { useActions } from '../../../hooks/useAction.ts';
import { useFetching } from '../../../hooks/useFetching.ts';
import { ShopService } from '../../../API/ShopService.ts';
import styles from './CatalogIteList.module.css';
import AlertComponent from '../../UI/Alert/AlertComponent.tsx';
import { useSearchParams } from 'react-router';
import { filterStateI } from '../../../types/common';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../../../types/responseTypes.ts';
import { MessageI } from '../../../types/common';

interface CatalogIteListI {
  totalPages: number;
  setTotalPages: React.Dispatch<SetStateAction<number>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  currentPage: number;
  setFilterState: React.Dispatch<React.SetStateAction<filterStateI>>;
  filterState: filterStateI;
  onSearchLoading: boolean;
  onFilterLoading: boolean;
  messages: MessageI[];
  handleRemoveMessage: (id: number) => void;
  handleSetMessage: (messageText: string, messageType: 'error' | 'success') => void;
}

const CatalogItemList: React.FC<CatalogIteListI> = ({
  messages,
  handleRemoveMessage,
  handleSetMessage,
  onSearchLoading,
  onFilterLoading,
  filterState,
  currentPage,
  setCurrentPage,
  setTotalPages,
  totalPages,
}) => {
  const [searchParams] = useSearchParams();
  const products = useProducts();
  const { addProducts } = useActions();
  const [pageChangeLoading, setPageChangeLoading] = useState<boolean>(false);
  const category = searchParams.get('category');

  const [fetchProducts, isLoading] = useFetching(async () => {
    try {
      const response = await ShopService.getProductsByParams(12, null, currentPage);
      addProducts(response.data);
      setTotalPages(Math.ceil(parseInt(response.headers['x-total-count']) / 12));
      setCurrentPage(1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении товаров', 'error');
      }
    }
  });

  const [fetchProductsByCategory, isLoadingByCategory] = useFetching(async () => {
    try {
      const response = await ShopService.getProductByCategory(12, category, currentPage);
      addProducts(response.data);
      setTotalPages(Math.ceil(parseInt(response.headers['x-total-count']) / 12));
      setCurrentPage(1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении товаров', 'error');
      }
    }
  });

  useEffect(() => {
    if (category) {
      fetchProductsByCategory();
    } else {
      fetchProducts();
    }
  }, []);

  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    try {
      setPageChangeLoading(true);
      if (category === null) {
        const response = await ShopService.getProductsByParams(12, filterState, page);
        addProducts(response.data);
      } else {
        const response = await ShopService.getProductsByParams(12, { ...filterState, category: category }, page);
        addProducts(response.data);
      }
      setCurrentPage(page);
      window.scrollTo(0, 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении товаров', 'error');
      }
    } finally {
      setPageChangeLoading(false);
    }
  };

  return (
    <div className={`${classes.ProductsContainer} ${styles.CatalogItemsContainer}`}>
      {isLoading || isLoadingByCategory || onFilterLoading || onSearchLoading || pageChangeLoading ? (
        <div className={classes.ProductsList}>
          <ProductsLoader />
        </div>
      ) : products.length ? (
        <div className={classes.ProductsList}>
          {products.map((item) => (
            <AnimatedItem key={item.product_id}>
              <ProductItem product={item} handleSetMessage={handleSetMessage} />
            </AnimatedItem>
          ))}
        </div>
      ) : (
        <div className={styles.NoItems}>
          <h2>Ничего не найдено</h2>
          <p>Попробуйте изменить параметры фильтра</p>
        </div>
      )}
      <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
      {products.length ? (
        <div className={styles.PaginationContainer}>
          <Pagination
            disabled={isLoading}
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            sx={{
              '@media (max-width: 600px)': {
                '& .MuiPaginationItem-root': {
                  fontSize: '0.75rem',
                  minWidth: '27px',
                  height: '27px',
                },
              },
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CatalogItemList;
