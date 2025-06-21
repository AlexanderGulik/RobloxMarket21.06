import ClassicButton from '../../UI/buttons/Classic/ClassicButton.tsx';
import ProductInput from '../../UI/inputs/ProductInput/ProductInput.tsx';
import classes from './ProductItem.module.css';
import { useState } from 'react';
import { ProductsI } from '../../../types/common.ts';
import React from 'react';
import { UrlEnums } from '../../../const/URLs/urls.ts';
import { useActions } from '../../../hooks/useAction.ts';
import { CartItemI } from '../../../types/common.ts';

interface ProductItemI {
  product: ProductsI;
  handleSetMessage: (messageText: string, messageType: 'error' | 'success') => void;
}

const ProductItem: React.FC<ProductItemI> = ({ handleSetMessage, product }) => {
  const { addProductsInCart } = useActions();
  const max: number = 9999999;
  const step: number = 1;
  const min: number = 1;
  const [value, setValue] = useState<number>(min);
  const imageUrl = `${UrlEnums.HOST}/uploads/${product.image}`;
  const [isAdding, setIsAdding] = useState(false);

  const handleProductSetMessage = () => {
    handleSetMessage(`${product.name} добавлено в корзину!`, 'success');

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleAddProductToCart = (product: ProductsI, quantity: number): void => {
    setIsAdding(true);
    const cartItem: CartItemI = {
      product_id: product.product_id,
      name: product.name,
      amount: product.cost * quantity,
      image: product.image,
      price: product.cost,
      quantity,
    };
    addProductsInCart(cartItem);
    handleProductSetMessage();
  };

  return (
    <div className={classes.CardContainer}>
      <div className={classes.ProductImage}>
        <img src={imageUrl} alt={product.name} />
      </div>
      <div className={classes.ProductBody}>
        <div className={classes.ProductDesc}>
          <span className={classes.ProductName}>{product.name}</span>
          <div className={classes.ProductCost}>
            {product.cost}р.
            <span className={classes.ProductCostOld}>{product.oldCost > 0 ? `${product.oldCost} р.` : ''}</span>
          </div>
        </div>
        <div className={classes.ProductButtons}>
          <ProductInput value={value} setValue={setValue} max={max} min={min} step={step} />
          <ClassicButton isAdding={isAdding} type={3} onClick={() => handleAddProductToCart(product, value)}>
            Купить
          </ClassicButton>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
