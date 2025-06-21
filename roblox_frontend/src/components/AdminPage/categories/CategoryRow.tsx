import React from 'react';
import { TableRow, TableCell, IconButton, TextField, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './CategoryList.module.css';
import { CategoriesI } from '../../../types/common';
import { UrlEnums } from '../../../const/URLs/urls';

interface CategoryRowProps {
  category: CategoriesI;
  index: number;
  editingId: number | null;
  editedName: string;
  imagePreview: string | null;
  setEditedName: (name: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteCategory: (id: number) => void;
  handleSave: (id: number) => void;
  handleCancel: () => void;
  handleEdit: (category: CategoriesI) => void;
  ChangeIsLoading: boolean;
  isMobile: boolean;
}

const CategoryRow = ({
  category,
  index,
  editingId,
  editedName,
  imagePreview,
  setEditedName,
  handleImageChange,
  handleDeleteCategory,
  handleSave,
  handleCancel,
  handleEdit,
  ChangeIsLoading,
  isMobile,
}: CategoryRowProps) => {
  return (
    <TableRow
      sx={{
        backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
      }}
    >
      <TableCell>
        {editingId === category.category_id ? (
          <TextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            size={isMobile ? 'small' : 'medium'}
            sx={{
              minWidth: isMobile ? '120px' : '250px',
              '& .MuiInputBase-input': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          />
        ) : (
          category.name
        )}
      </TableCell>
      <TableCell>
        {editingId === category.category_id ? (
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
            src={`${UrlEnums.HOST}/uploads/${category.image}`}
            alt=""
            style={{
              maxWidth: isMobile ? '80px' : '120px',
              height: isMobile ? '40px' : '60px',
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {editingId === category.category_id ? (
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
              onClick={() => handleSave(category.category_id)}
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
            <IconButton onClick={() => handleEdit(category)} size={isMobile ? 'small' : 'medium'}>
              <EditIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
            <IconButton onClick={() => handleDeleteCategory(category.category_id)} size={isMobile ? 'small' : 'medium'}>
              <DeleteIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CategoryRow;
