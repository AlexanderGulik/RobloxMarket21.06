import { useEffect, useState } from 'react';
import { ShopService } from '../../../API/ShopService';
import { useFetching } from '../../../hooks/useFetching';
import { CategoriesI } from '../../../types/common';
import { useEditCategory } from '../../../hooks/useEditCategory';
import { useMessages } from '../../../hooks/useMessages';
import AlertComponent from '../../UI/Alert/AlertComponent';
import TableLoader from '../../UI/Loaders/TableLoder';
import CategoryTable from './CategoryTable';
import { AdminService } from '../../../API/AdminService';

const CategoryList = () => {
  const [categories, setCategories] = useState<CategoriesI[]>([]);
  const { handleSetMessage, messages, handleRemoveMessage } = useMessages();
  const {
    editingId,
    editedName,
    imagePreview,
    ChangeIsLoading,
    setEditedName,
    handleEdit,
    handleCancel,
    handleImageChange,
    handleSave,
  } = useEditCategory(setCategories, handleSetMessage);

  const [fetchCategories, isLoading] = useFetching(async () => {
    const response = await ShopService.getAllCategories();
    setCategories([...response.data]);
  });

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await AdminService.deleteCategory(id);
      if (response.status === 200) {
        setCategories(categories.filter((category) => category.category_id !== id));
        handleSetMessage('Категория удалена', 'success');
      } else {
        handleSetMessage(response.data.message || 'Ошибка при удалении категории', 'error');
      }
    } catch (error: any) {
      handleSetMessage(error.response?.data?.message || 'Ошибка при удалении категории', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          <CategoryTable
            categories={categories}
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
          />
          <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
        </>
      )}
    </>
  );
};

export default CategoryList;
