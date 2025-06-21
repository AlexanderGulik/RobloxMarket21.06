import { Skeleton } from '@mui/material';

export const CategoryLoader = () => {
  return (
    <>
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'100%'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'100%'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'100%'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'100%'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'100%'} />
      <Skeleton sx={{ bgcolor: 'grey.300' }} variant="rectangular" height={'100%'} />
    </>
  );
};
