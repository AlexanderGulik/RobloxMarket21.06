import { useActions } from '../../../hooks/useAction';
import { useCategories } from '../../../hooks/useCategories';
import { useFetching } from '../../../hooks/useFetching';
import styles from './FilterCatalog.module.css';
import { ShopService } from '../../../API/ShopService';
import { useEffect } from 'react';
import { filterStateI } from '../../../types/common';
import { sortState } from '../../../const/FilterConst';
import { useSearchParams } from 'react-router';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../../../types/responseTypes';
import { useMessages } from '../../../hooks/useMessages';
import AlertComponent from '../../UI/Alert/AlertComponent';

interface ProductFilterPropsI {
  onSearch: (limit: number | undefined, searchTerm: filterStateI) => void;
  onFilter: (limit: number | undefined, searchTerm: filterStateI) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setFilterState: React.Dispatch<React.SetStateAction<filterStateI>>;
  filterState: filterStateI;
}

const FilterCatalog: React.FC<ProductFilterPropsI> = ({
  filterState,
  setFilterState,
  onSearch,
  onFilter,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const categories = useCategories();
  const { addCategories } = useActions();
  const { messages, handleRemoveMessage, handleSetMessage } = useMessages();
  const [fetchCategories] = useFetching(async () => {
    try {
      const response = await ShopService.getAllCategories();
      addCategories(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(
          axiosError.response?.data.message || 'Ошибка при получении категорий',
          'error'
        );
      }
    }
  });

  const removeSearchParams = () => {
    setSearchParams({}, { replace: true });
  };

  useEffect(() => {
    fetchCategories();
    if (category) {
      setFilterState({ ...filterState, category: category });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="search" className={styles.label}>
          Поиск:
        </label>
        <input
          type="text"
          id="search"
          className={styles.input}
          onChange={(e) => {
            if (e.target.value !== '') {
              setFilterState((prev) => {
                return {
                  name: e.target.value,
                  minCost: prev.minCost,
                  maxCost: prev.maxCost,
                  category: prev.category,
                  filter: prev.filter,
                };
              });
              onSearch(12, { ...filterState, name: e.target.value });
            } else {
              setFilterState((prev) => {
                return {
                  name: undefined,
                  minCost: prev.minCost,
                  maxCost: prev.maxCost,
                  category: prev.category,
                  filter: prev.filter,
                };
              });
              onSearch(12, { ...filterState, name: undefined });
            }
          }}
          placeholder="Название..."
        />
      </div>

      <div>
        <label htmlFor="category" className={styles.label}>
          Категории:
        </label>
        <select
          value={filterState.category || ''}
          id="category"
          className={styles.select}
          onChange={(e) => {
            if (e.target.value !== '') {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: prev.minCost,
                  maxCost: prev.maxCost,
                  category: e.target.value,
                  filter: prev.filter,
                };
              });
              onFilter(12, { ...filterState, category: e.target.value });
              removeSearchParams();
            } else {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: prev.minCost,
                  maxCost: prev.maxCost,
                  category: e.target.value,
                  filter: prev.filter,
                };
              });
              onFilter(12, { ...filterState, category: undefined });
              removeSearchParams();
            }
          }}
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="minPrice" className={styles.label}>
          Мин. Цена:
        </label>
        <input
          type="number"
          id="minPrice"
          min={0}
          className={styles.input}
          placeholder="Мин."
          onChange={(e) => {
            if (e.target.value !== '') {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: parseInt(e.target.value),
                  maxCost: prev.maxCost,
                  category: prev.category,
                  filter: prev.filter,
                };
              });
              onSearch(12, {
                ...filterState,
                minCost: parseInt(e.target.value),
              });
            } else {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: undefined,
                  maxCost: prev.maxCost,
                  category: prev.category,
                  filter: prev.filter,
                };
              });
              onSearch(12, { ...filterState, minCost: undefined });
            }
          }}
        />
      </div>

      <div>
        <label htmlFor="maxPrice" className={styles.label}>
          Макс. Цена:
        </label>
        <input
          type="number"
          id="maxPrice"
          min={0}
          className={styles.input}
          placeholder="Макс."
          onChange={(e) => {
            if (e.target.value !== '') {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: prev.minCost,
                  maxCost: parseInt(e.target.value),
                  category: prev.category,
                  filter: prev.filter,
                };
              });
              onSearch(12, {
                ...filterState,
                maxCost: parseInt(e.target.value),
              });
            } else {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: prev.minCost,
                  maxCost: undefined,
                  category: prev.category,
                  filter: prev.filter,
                };
              });
              onSearch(12, { ...filterState, maxCost: undefined });
            }
          }}
        />
      </div>
      <div>
        <label htmlFor="category" className={styles.label}>
          Фильтр:
        </label>
        <select
          id="category"
          className={styles.select}
          onChange={(e) => {
            if (e.target.value !== '') {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: prev.minCost,
                  maxCost: prev.maxCost,
                  category: prev.category,
                  filter: e.target.value,
                };
              });
              onFilter(12, { ...filterState, filter: e.target.value });
            } else {
              setFilterState((prev) => {
                return {
                  name: prev.name,
                  minCost: prev.minCost,
                  maxCost: prev.maxCost,
                  category: prev.category,
                  filter: undefined,
                };
              });
              onFilter(12, { ...filterState, filter: undefined });
            }
          }}
        >
          <option value="">Порядок: По умолчанию</option>
          {sortState.map((sortItem, index) => (
            <option key={index} value={sortItem.value}>
              {sortItem.name}
            </option>
          ))}
        </select>
      </div>
      <AlertComponent
        messages={messages}
        handleRemoveMessage={handleRemoveMessage}
      />
    </div>
  );
};

export default FilterCatalog;
