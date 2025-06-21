import CircularProgress from '@mui/material/CircularProgress';
import classes from './PageLoader.module.css';

const TableLoader = () => {
  return (
    <div className={classes.LoaderContainer}>
      <CircularProgress size="50px" />
    </div>
  );
};

export default TableLoader;
