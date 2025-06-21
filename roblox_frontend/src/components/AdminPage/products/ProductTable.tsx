import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import styles from './ProductList.module.css';
import { ProductsI, CategoriesI } from '../../../types/common';
import ProductRow from './ProductRow';

interface ProductTableProps {
  products: ProductsI[];
  editingId: number | null;
  editedName: string;
  editedCost: string;
  editedOldCost: string;
  editedCategory: string;
  imagePreview: string | null;
  categories: CategoriesI[];
  handleEdit: (product: ProductsI) => void;
  handleCancel: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (id: number) => void;
  setEditedName: (name: string) => void;
  setEditedCost: (cost: string) => void;
  setEditedOldCost: (oldCost: string) => void;
  setEditedCategory: (category: string) => void;
  ChangeIsLoading: boolean;
  handleDeleteProduct: (id: number) => void;
}

const ProductTable = ({
  products,
  editingId,
  editedName,
  editedCost,
  editedOldCost,
  editedCategory,
  imagePreview,
  categories,
  handleEdit,
  handleCancel,
  handleImageChange,
  handleSave,
  setEditedName,
  setEditedCost,
  setEditedOldCost,
  setEditedCategory,
  ChangeIsLoading,
  handleDeleteProduct,
}: ProductTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer
      component={Paper}
      className={styles.table}
      sx={{
        overflowX: 'auto',
        '& .MuiTableCell-root': {
          [theme.breakpoints.down('sm')]: {
            padding: '8px',
            fontSize: '0.875rem',
          },
        },
        '& .MuiTableCell-head': {
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          backgroundColor: 'black',
          color: 'white',
        },
        maxWidth: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        margin: '16px 0',
      }}
    >
      <Table size={isMobile ? 'small' : 'medium'}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: isMobile ? '120px' : '200px' }}>Название</TableCell>
            <TableCell sx={{ minWidth: isMobile ? '80px' : '120px' }}>Изображение</TableCell>
            <TableCell sx={{ minWidth: isMobile ? '80px' : '120px' }}>Цена</TableCell>
            <TableCell sx={{ minWidth: isMobile ? '100px' : '150px' }}>Старая цена</TableCell>
            <TableCell sx={{ minWidth: isMobile ? '80px' : '120px' }}>Категория</TableCell>
            <TableCell sx={{ minWidth: isMobile ? '80px' : '100px' }}>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      color: '#666',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      fontWeight: 500,
                    }}
                  >
                    Продукты не найдены
                  </div>
                  <div
                    style={{
                      color: '#999',
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      maxWidth: '400px',
                      textAlign: 'center',
                      padding: '0 16px',
                    }}
                  >
                    Добавьте новый продукт или измените параметры поиска
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <ProductRow
                key={product.product_id}
                product={product}
                index={index}
                editingId={editingId}
                editedName={editedName}
                editedCost={editedCost}
                editedOldCost={editedOldCost}
                editedCategory={editedCategory}
                imagePreview={imagePreview}
                categories={categories}
                handleEdit={handleEdit}
                handleCancel={handleCancel}
                handleImageChange={handleImageChange}
                handleSave={handleSave}
                setEditedName={setEditedName}
                setEditedCost={setEditedCost}
                setEditedOldCost={setEditedOldCost}
                setEditedCategory={setEditedCategory}
                ChangeIsLoading={ChangeIsLoading}
                handleDeleteProduct={handleDeleteProduct}
                isMobile={isMobile}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
