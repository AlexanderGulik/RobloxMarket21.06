import classes from './CategoryItem.module.css';
import { UrlEnums } from '../../../const/URLs/urls';
interface CategoryItemI {
  name: string;
  image: string;
}

const CategoryItem: React.FC<CategoryItemI> = ({ name, image }) => {
  return (
    <div
      className={classes.CategoryItemContainer}
      style={{ backgroundImage: `url(${UrlEnums.HOST}/uploads/${image})` }}
    >
      <div className={`${classes.CategoryItemImage}`}>
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default CategoryItem;
