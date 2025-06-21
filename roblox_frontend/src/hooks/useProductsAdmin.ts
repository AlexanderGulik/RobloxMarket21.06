import { useState, useEffect, useCallback } from 'react';
import { ShopService } from '../API/ShopService';
import { CommonService } from '../utils/CommonService';
import { filterScheme } from '../const/common';
import { filterStateI, ProductsI } from '../types/common';

export const useProductsAdmin = () => {
  const ITEMS_PER_PAGE = 25;
  const [products, setProducts] = useState<ProductsI[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageChangeLoading, setPageChangeLoading] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<filterStateI>(filterScheme);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ShopService.getProductsByParams(ITEMS_PER_PAGE);
      setProducts(response.data);
      setTotalPages(Math.ceil(parseInt(response.headers['x-total-count']) / ITEMS_PER_PAGE));
      setCurrentPage(1);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSearch = useCallback(
    CommonService.debounce(async (limit: number = 12, filterState: filterStateI) => {
      try {
        setPageChangeLoading(true);
        const response = await ShopService.getProductsByParams(limit, filterState);
        setProducts(response.data);
        setTotalPages(Math.ceil(parseInt(response.headers['x-total-count']) / limit));
        setCurrentPage(1);
      } catch (e) {
        console.log(e);
      } finally {
        setPageChangeLoading(false);
      }
    }, 500),
    []
  );

  const onFilter = useCallback(async (limit: number = 12, filterState: filterStateI) => {
    try {
      setPageChangeLoading(true);
      const response = await ShopService.getProductsByParams(limit, filterState);
      setProducts(response.data);
      setTotalPages(Math.ceil(parseInt(response.headers['x-total-count']) / limit));
      setCurrentPage(1);
    } catch (e) {
      console.log(e);
    } finally {
      setPageChangeLoading(false);
    }
  }, []);

  const handlePageChange = async ({}: React.ChangeEvent<unknown>, page: number) => {
    try {
      setPageChangeLoading(true);
      const response = await ShopService.getProductsByParams(ITEMS_PER_PAGE, filterState, page);
      setProducts(response.data);
      setCurrentPage(page);
      window.scrollTo(0, 0);
    } finally {
      setPageChangeLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    currentPage,
    totalPages,
    pageChangeLoading,
    filterState,
    isLoading,
    setFilterState,
    setProducts,
    onSearch,
    onFilter,
    handlePageChange,
  };
};
