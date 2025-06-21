import { useState } from 'react';

interface UseImageUploadReturn {
  image: File | null;
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetImage: () => void;
}

export const useImageUpload = (
  handleSetMessage: (messageText: string, messageType: 'error' | 'success') => void
): UseImageUploadReturn => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        setImage(file);
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

  const resetImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return {
    image,
    imagePreview,
    handleImageChange,
    resetImage,
  };
};
