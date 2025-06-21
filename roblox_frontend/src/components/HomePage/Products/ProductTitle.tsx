import { useCategories } from '../../../hooks/useCategories';
import classes from './ProductTitle.module.css';
import { ShopService } from '../../../API/ShopService';
import { useActions } from '../../../hooks/useAction';
import { useState } from 'react';

const ProductTitle = () => {
  const categories = useCategories();
  const { addProducts } = useActions();
  const [activeLink, setActiveLink] = useState(0);

  const productsByCategory = async (category: string, index: number) => {
    const response = await ShopService.getProductByCategory(4, category);
    addProducts(response.data);
    setActiveLink(index);
  };

  const productsByAll = async () => {
    const response = await ShopService.getProductsByParams(4);
    addProducts(response.data);
    setActiveLink(0);
  };

  return (
    <div>
      <h2 className={classes.ProductsTitle}>Каталог товаров</h2>
      {categories.length ? (
        <div className={classes.CategoryList}>
          <span
            className={activeLink === 0 ? `${classes.Active} ${classes.CategoryListItem}` : classes.CategoryListItem}
            onClick={() => {
              productsByAll();
            }}
          >
            Все
          </span>
          {categories.map((item, index) => (
            <span
              className={
                activeLink === index + 1 ? `${classes.Active} ${classes.CategoryListItem}` : classes.CategoryListItem
              }
              key={item.category_id}
              onClick={() => {
                productsByCategory(item.name, index + 1);
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProductTitle;
