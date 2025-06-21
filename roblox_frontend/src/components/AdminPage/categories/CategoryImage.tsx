import styles from './CategoryList.module.css';
import { CategoriesI } from '../../../types/common';
import { UrlEnums } from '../../../const/URLs/urls';

interface CategoryImageProps {
  category: CategoriesI;
  editingId: number | null;
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategoryImage = ({ category, editingId, imagePreview, handleImageChange }: CategoryImageProps) => {
  return (
    <>
      {editingId === category.category_id ? (
        <div className={styles.ImageChange}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Предпросмотр" className={styles.Image} />}
        </div>
      ) : (
        <img className={styles.Image} src={`${UrlEnums.HOST}/uploads/${category.image}`} alt={category.image} />
      )}
    </>
  );
};

export default CategoryImage;
