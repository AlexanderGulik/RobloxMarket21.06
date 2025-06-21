import CategoryItem from './CategoryItem.tsx';
import classes from './Category.module.css';
import AnimatedItem from '../../UI/Animated/ACItem.tsx';
import { useEffect } from 'react';
import { CategoryLoader } from '../../UI/Loaders/CategoryLoader.tsx';
import { useCategories } from '../../../hooks/useCategories.ts';
import { useActions } from '../../../hooks/useAction.ts';
import { useFetching } from '../../../hooks/useFetching.ts';
import { ShopService } from '../../../API/ShopService.ts';
import { Link } from 'react-router';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../../../types/responseTypes.ts';
import { useMessages } from '../../../hooks/useMessages.ts';
import AlertComponent from '../../UI/Alert/AlertComponent.tsx';

const Category = () => {
  const categories = useCategories();
  const { addCategories } = useActions();
  const { messages, handleRemoveMessage, handleSetMessage } = useMessages();
  const [fetchCategories, isLoading] = useFetching(async () => {
    try {
      const response = await ShopService.getAllCategories();
      addCategories(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении категорий', 'error');
      }
    }
  });
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className={classes.CategoryListContainer}>
        <h2 className={classes.CategoryTitle}>Категории</h2>
        {isLoading ? (
          <div className={classes.CategoryGrid}>
            <CategoryLoader />
          </div>
        ) : categories.length ? (
          <div className={classes.CategoryGrid}>
            {categories.map((item) => (
              <AnimatedItem key={item.category_id}>
                <Link to={`/catalog?category=${item.name}`}>
                  <CategoryItem name={item.name} image={item.image} />
                </Link>
              </AnimatedItem>
            ))}
          </div>
        ) : (
          <div className={classes.NoItems}>
            <h2>Нет категорий</h2>
          </div>
        )}
      </div>
      <div className={classes.HorizontalLine}></div>
      <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
    </div>
  );
};

export default Category;
