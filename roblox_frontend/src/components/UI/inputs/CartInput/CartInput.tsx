import { useEffect, useState } from 'react';
import classes from './CartInput.module.css';
import { CartItemI } from '../../../../types/common';
import { useActions } from '../../../../hooks/useAction';

interface CompactInputI {
  item: CartItemI;
  value: number;
  min: number;
  max: number;
}

const CartInput: React.FC<CompactInputI> = ({ item, value, min, max }) => {
  const [inputValue, setInputValue] = useState<number>(value);
  const { removeProductFromCart, changeQuantity } = useActions();
  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
    if ((min === undefined || newValue >= min) && (max === undefined || newValue <= max) && newValue !== '') {
      setInputValue(newValue);
    } else {
      setInputValue(1);
    }
  };
  const handleIncrement = () => {
    setInputValue((prev) => (prev + 1 > max ? prev : prev + 1));
  };

  const handleDecrement = () => {
    setInputValue((prev) => (prev - 1 < min ? prev : prev - 1));
  };

  useEffect(() => {
    if (inputValue !== 0) {
      const modifyedProduct: CartItemI = { ...item };
      modifyedProduct.quantity = inputValue;
      modifyedProduct.amount = modifyedProduct.price * inputValue;
      changeQuantity(modifyedProduct);
    } else {
      removeProductFromCart(item);
    }
  }, [inputValue]);

  return (
    <div className={classes.CompactInput}>
      <button className={classes.InputButton} onClick={handleDecrement}>
        -
      </button>
      <input
        type="text"
        className={classes.InputField}
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: `${inputValue.toString().length + 1}ch` }}
      />
      <button className={classes.InputButton} onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default CartInput;
