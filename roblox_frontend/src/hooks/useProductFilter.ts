import { useState, useCallback } from 'react';
import { ShopService } from '../API/ShopService';
import { CommonService } from '../utils/CommonService';
import { useActions } from '../hooks/useAction';
import { filterStateI } from '../types/common';
import { filterScheme } from '../const/common';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../types/responseTypes';
import { useMessages } from './useMessages';

const useProductFilter = (initialFilterState: filterStateI = filterScheme) => {
  const [filterState, setFilterState] = useState<filterStateI>(initialFilterState);
  const { addProducts } = useActions();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onFilterLoading, setOnFilterLoading] = useState<boolean>(false);
  const [onSearchLoading, setOnSearchLoading] = useState<boolean>(false);
  const { messages, handleRemoveMessage, handleSetMessage } = useMessages();
  const onFilter = useCallback(async (limit: number = 12, filterState: filterStateI) => {
    try {
      setOnFilterLoading(true);
      const response = await ShopService.getProductsByParams(limit, filterState);
      addProducts(response.data);
      setTotalPages(Math.ceil(parseInt(response.headers['x-total-count']) / limit));
      setCurrentPage(1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении товаров', 'error');
      }
    } finally {
      setOnFilterLoading(false);
    }
  }, []);

  const onSearch = useCallback(
    CommonService.debounce(async (limit: number = 12, filterState: filterStateI) => {
      try {
        setOnSearchLoading(true);
        const response = await ShopService.getProductsByParams(limit, filterState);
        addProducts(response.data);
        setTotalPages(Math.ceil(parseInt(response.headers['x-total-count']) / limit));
        setCurrentPage(1);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponseI>;
          handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении товаров', 'error');
        }
      } finally {
        setOnSearchLoading(false);
      }
    }, 500),
    []
  );

  return {
    filterState,
    totalPages,
    currentPage,
    onFilterLoading,
    onSearchLoading,
    messages,
    handleRemoveMessage,
    handleSetMessage,
    setFilterState,
    setCurrentPage,
    setTotalPages,
    onFilter,
    onSearch,
  };
};

export default useProductFilter;
