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
import styles from './CategoryList.module.css';
import { CategoriesI } from '../../../types/common';
import CategoryRow from './CategoryRow';

interface CategoryTableProps {
  categories: CategoriesI[];
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
}

const CategoryTable = ({
  categories,
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
}: CategoryTableProps) => {
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
        },
        maxWidth: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        margin: '16px 0',
      }}
    >
      <Table size={isMobile ? 'small' : 'medium'}>
        <TableHead sx={{ backgroundColor: 'black' }}>
          <TableRow>
            <TableCell
              sx={{
                color: 'white',
                minWidth: isMobile ? '120px' : '200px',
              }}
            >
              Название
            </TableCell>
            <TableCell
              sx={{
                color: 'white',
                minWidth: isMobile ? '100px' : '150px',
              }}
            >
              Изображение
            </TableCell>
            <TableCell
              sx={{
                color: 'white',
                minWidth: isMobile ? '80px' : '100px',
              }}
            >
              Действия
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
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
                    Категории не найдены
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
                    Добавьте новую категорию, чтобы начать работу
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category, index) => (
              <CategoryRow
                key={category.category_id}
                category={category}
                index={index}
                editingId={editingId}
                editedName={editedName}
                imagePreview={imagePreview}
                setEditedName={setEditedName}
                handleImageChange={handleImageChange}
                handleDeleteCategory={handleDeleteCategory}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleEdit={handleEdit}
                ChangeIsLoading={ChangeIsLoading}
                isMobile={isMobile}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
