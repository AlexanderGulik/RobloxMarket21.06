import React from 'react';
import { TableRow, TableCell, IconButton, TextField, Button, Select, MenuItem, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ProductList.module.css';
import { ProductsI, CategoriesI } from '../../../types/common';
import { UrlEnums } from '../../../const/URLs/urls';

interface ProductRowProps {
  product: ProductsI;
  index: number;
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
  isMobile: boolean;
}

const ProductRow = ({
  product,
  index,
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
  isMobile,
}: ProductRowProps) => {
  return (
    <TableRow
      sx={{
        backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
      }}
    >
      <TableCell>
        {editingId === product.product_id ? (
          <TextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{
              minWidth: isMobile ? '200px' : '250px',
              '& .MuiInputBase-input': {
                fontSize: isMobile ? '0.85rem' : '1rem',
              },
            }}
          />
        ) : (
          product.name
        )}
      </TableCell>
      <TableCell>
        {editingId === product.product_id ? (
          <div className={styles.ImageChange}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                maxWidth: '100%',
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Предпросмотр"
                className={styles.Image}
                style={{
                  maxWidth: isMobile ? '80px' : '120px',
                  height: 'auto',
                }}
              />
            )}
          </div>
        ) : (
          <img
            className={styles.Image}
            src={`${UrlEnums.HOST}/uploads/${product.image}`}
            alt=""
            style={{
              maxWidth: isMobile ? '80px' : '120px',
              height: 'auto',
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {editingId === product.product_id ? (
          <TextField
            value={editedCost}
            onChange={(e) => setEditedCost(e.target.value)}
            type="number"
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{
              minWidth: isMobile ? '80px' : '120px',
              '& .MuiInputBase-input': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          />
        ) : (
          `${product.cost} ₽`
        )}
      </TableCell>
      <TableCell>
        {editingId === product.product_id ? (
          <TextField
            value={editedOldCost}
            onChange={(e) => setEditedOldCost(e.target.value)}
            type="number"
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{
              minWidth: isMobile ? '80px' : '120px',
              '& .MuiInputBase-input': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          />
        ) : (
          <span style={{ textDecoration: 'line-through', color: '#666' }}>{product.oldCost} ₽</span>
        )}
      </TableCell>
      <TableCell>
        {editingId === product.product_id ? (
          <Select
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{
              minWidth: isMobile ? '100px' : '150px',
              '& .MuiInputBase-input': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.category_id}
                value={category.name}
                sx={{
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          product.category
        )}
      </TableCell>
      <TableCell>
        {editingId === product.product_id ? (
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '4px' : '8px',
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleSave(product.product_id)}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                minWidth: isMobile ? '80px' : '100px',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
              }}
            >
              {ChangeIsLoading ? (
                <CircularProgress sx={{ color: 'white' }} size={isMobile ? '20px' : '25px'} />
              ) : (
                'сохранить'
              )}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                minWidth: isMobile ? '80px' : '100px',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
              }}
            >
              Отмена
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: '4px',
              flexWrap: 'nowrap',
            }}
          >
            <IconButton onClick={() => handleEdit(product)} size={isMobile ? 'small' : 'medium'}>
              <EditIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
            <IconButton onClick={() => handleDeleteProduct(product.product_id)} size={isMobile ? 'small' : 'medium'}>
              <DeleteIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
