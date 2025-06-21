import { Skeleton } from '@mui/material';

export const ProductsLoader = () => {
  return (
    <>
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'250px'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'250px'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'250px'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'250px'} />
    </>
  );
};
