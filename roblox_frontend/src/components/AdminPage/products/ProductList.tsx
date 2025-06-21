import styles from './ProductList.module.css';
import { Pagination } from '@mui/material';
import { CategoriesI } from '../../../types/common';
import { useState, useEffect } from 'react';
import { useFetching } from '../../../hooks/useFetching';
import { ShopService } from '../../../API/ShopService';
import TableLoader from '../../UI/Loaders/TableLoder';
import AlertComponent from '../../UI/Alert/AlertComponent';
import { useProductsAdmin } from '../../../hooks/useProductsAdmin';
import { useEditProducts } from '../../../hooks/useEditProducts';
import { useMessages } from '../../../hooks/useMessages';
import ProductTable from './ProductTable';
import { AdminService } from '../../../API/AdminService';

const ProductList = () => {
  const ITEMS_PER_PAGE = 25;
  const [categories, setCategories] = useState<CategoriesI[]>([]);
  const { handleSetMessage, messages, handleRemoveMessage } = useMessages();
  const {
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
  } = useProductsAdmin();
  const {
    editingId,
    editedName,
    editedCost,
    editedOldCost,
    editedCategory,
    imagePreview,
    ChangeIsLoading,
    setEditedName,
    setEditedCost,
    setEditedOldCost,
    setEditedCategory,
    handleEdit,
    handleCancel,
    handleImageChange,
    handleSave,
  } = useEditProducts(setProducts, handleSetMessage);

  const [fetchCategories] = useFetching(async () => {
    const response = await ShopService.getAllCategories();
    setCategories([...response.data]);
  });

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await AdminService.deleteProduct(id);
      if (response.status === 200) {
        setProducts(products.filter((product) => product.product_id !== id));
        handleSetMessage('Товар удален', 'success');
      } else {
        handleSetMessage(response.data.message || 'Ошибка при удалении товара', 'error');
      }
    } catch (error: any) {
      handleSetMessage(error.response?.data?.message || 'Ошибка при удалении товара', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
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
              setFilterState((prev) => ({
                ...prev,
                name: e.target.value,
              }));
              onSearch(ITEMS_PER_PAGE, {
                ...filterState,
                name: e.target.value,
              });
            } else {
              setFilterState((prev) => ({
                ...prev,
                name: undefined,
              }));
              onSearch(ITEMS_PER_PAGE, { ...filterState, name: undefined });
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
              setFilterState((prev) => ({
                ...prev,
                category: e.target.value,
              }));
              onFilter(ITEMS_PER_PAGE, {
                ...filterState,
                category: e.target.value,
              });
            } else {
              setFilterState((prev) => ({
                ...prev,
                category: undefined,
              }));
              onFilter(ITEMS_PER_PAGE, { ...filterState, category: undefined });
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
      {isLoading || pageChangeLoading ? (
        <TableLoader />
      ) : (
        <>
          <ProductTable
            products={products}
            categories={categories}
            editingId={editingId}
            editedName={editedName}
            editedCost={editedCost.toString()}
            editedOldCost={editedOldCost.toString()}
            editedCategory={editedCategory}
            imagePreview={imagePreview}
            setEditedName={setEditedName}
            setEditedCost={(cost) => setEditedCost(Number(cost))}
            setEditedOldCost={(oldCost) => setEditedOldCost(Number(oldCost))}
            setEditedCategory={setEditedCategory}
            handleImageChange={handleImageChange}
            handleDeleteProduct={handleDeleteProduct}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleEdit={handleEdit}
            ChangeIsLoading={ChangeIsLoading}
          />
          <Pagination
            count={totalPages}
            page={currentPage}
            siblingCount={1}
            disabled={pageChangeLoading}
            onChange={handlePageChange}
            sx={{
              mb: 2,
              mt: 2,
              display: 'flex',
              justifyContent: 'center',
              fontSize: '2px',
            }}
          />
          <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
        </>
      )}
    </>
  );
};

export default ProductList;
