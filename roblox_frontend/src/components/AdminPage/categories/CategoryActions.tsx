import { IconButton, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoriesI } from '../../../types/common';

interface CategoryActionsProps {
  category: CategoriesI;
  editingId: number | null;
  handleSave: (id: number) => void;
  handleCancel: () => void;
  handleEdit: (category: CategoriesI) => void;
  ChangeIsLoading: boolean;
  handleDeleteCategory: (id: number) => void;
}

const CategoryActions = ({
  category,
  editingId,
  handleSave,
  handleCancel,
  handleEdit,
  ChangeIsLoading,
  handleDeleteCategory,
}: CategoryActionsProps) => {
  return (
    <>
      {editingId === category.category_id ? (
        <>
          <Button variant="contained" color="success" onClick={() => handleSave(category.category_id)} sx={{ mt: 1 }}>
            {ChangeIsLoading ? <CircularProgress sx={{ color: 'white' }} size={'25px'} /> : 'сохранить'}
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancel} sx={{ ml: 1, mt: 1 }}>
            Отмена
          </Button>
        </>
      ) : (
        <>
          <IconButton onClick={() => handleEdit(category)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteCategory(category.category_id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </>
  );
};

export default CategoryActions;
