import CircularProgress from '@mui/material/CircularProgress';
import classes from './PageLoader.module.css';

const PageLoader = () => {
  return (
    <div className={classes.LoaderContainer}>
      <CircularProgress size="100px" />
    </div>
  );
};

export default PageLoader;
