import styles from './ProductInput.module.css';

interface NumberInputProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
  step: number;
  onChange?: (value: number | null) => void;
}

const ProductInput: React.FC<NumberInputProps> = ({ value, setValue, min, max, step, onChange }) => {
  const handleIncrement = () => {
    if (value + step <= max) {
      const newValue = value + step;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (typeof value === 'number' && value - step >= min) {
      const newValue = value - step;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? '' : parseInt(event.target.value, 10);

    if (newValue === '') {
      setValue(min);
      onChange?.(null);
      return;
    }

    if (typeof newValue === 'number' && !isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
      onChange?.(newValue);
    } else {
      event.target.value = String(value);
    }
  };

  return (
    <div className={styles.numberInput}>
      <button className={styles.numberInputButton} onClick={handleDecrement}>
        <span>-</span>
      </button>
      <input
        type="number"
        className={styles.numberInputField}
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <button className={styles.numberInputButton} onClick={handleIncrement}>
        <span>+</span>
      </button>
    </div>
  );
};

export default ProductInput;
