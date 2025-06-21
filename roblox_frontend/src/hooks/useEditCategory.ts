import { useState } from 'react';
import { AdminService } from '../API/AdminService';
import { CategoriesI } from '../types/common';
import { UrlEnums } from '../const/URLs/urls';

export const useEditCategory = (
  setCategories: React.Dispatch<React.SetStateAction<CategoriesI[]>>,
  handleSetMessage: (messageText: string, messageType: 'error' | 'success') => void
) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedImageFile, setEditedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ChangeIsLoading, setChangeIsLoading] = useState<boolean>(false);

  const handleEdit = (category: CategoriesI) => {
    setEditingId(category.category_id);
    setEditedName(category.name);
    setImagePreview(`${UrlEnums.HOST}/uploads/${category.image}`);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedName('');
    setEditedImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        handleSetMessage('Пожалуйста, загрузите изображение в формате JPG/JPEG, PNG, GIF или WEBP', 'error');
        e.target.value = '';
        return;
      }

      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP'];
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some((ext) => fileName.toLowerCase().endsWith(ext.toLowerCase()));
      if (!hasValidExtension) {
        handleSetMessage('Неверный формат файла. Допустимые форматы: JPG/JPEG, PNG, GIF, WEBP', 'error');
        e.target.value = '';
        return;
      }

      const maxSize = 8 * 1024 * 1024;
      if (file.size > maxSize) {
        handleSetMessage('Размер файла не должен превышать 8MB', 'error');
        e.target.value = '';
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        setEditedImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        handleSetMessage('Выбранный файл не является изображением', 'error');
        e.target.value = '';
      };

      img.src = objectUrl;
    }
  };

  const handleSave = async (categoryId: number) => {
    try {
      setChangeIsLoading(true);
      const formData = new FormData();
      formData.append('id', categoryId.toString());
      formData.append('name', editedName);
      if (editedImageFile) {
        formData.append('image', editedImageFile);
      }

      const response = await AdminService.saveCategoryChanges(formData);

      if (response.status === 200) {
        setCategories((prevCategory) =>
          prevCategory.map((category) =>
            category.category_id === categoryId ? { ...category, ...response.data } : category
          )
        );
        handleSetMessage(response.data.message, 'success');
      } else {
        handleSetMessage(response.data.message, 'error');
      }
    } catch (error: any) {
      console.error('Ошибка при сохранении изменений:', error);

      handleSetMessage(error.response?.data?.message || 'Произошла ошибка при сохранении изменений', 'error');
    } finally {
      setEditingId(null);
      setEditedName('');
      setEditedImageFile(null);
      setImagePreview(null);
      setChangeIsLoading(false);
    }
  };

  return {
    editingId,
    editedName,
    imagePreview,
    ChangeIsLoading,
    setEditedName,
    setEditedImageFile,
    setImagePreview,
    handleEdit,
    handleCancel,
    handleImageChange,
    handleSave,
  };
};
