import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styles from './AddEditProducts.module.css';
import { AdminService } from '../../API/AdminService';
import { useMessages } from '../../hooks/useMessages';
import { useImageUpload } from '../../hooks/useImageUpload';
import AlertComponent from '../UI/Alert/AlertComponent';
import { CategoriesI } from '../../types/common';
import { ShopService } from '../../API/ShopService';

const AddEditProduct = () => {
  const [name, setName] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoriesI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { messages, handleRemoveMessage, handleSetMessage } = useMessages();
  const { image, imagePreview, handleImageChange, resetImage } = useImageUpload(handleSetMessage);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ShopService.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        handleSetMessage('Ошибка при загрузке категорий', 'error');
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      handleSetMessage('Пожалуйста, введите название продукта', 'error');
      return;
    }
    if (!image) {
      handleSetMessage('Пожалуйста, выберите изображение', 'error');
      return;
    }
    if (!category) {
      handleSetMessage('Пожалуйста, выберите категорию', 'error');
      return;
    }
    if (!newPrice || parseFloat(newPrice) <= 0) {
      handleSetMessage('Пожалуйста, введите корректную цену', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('cost', newPrice);
      formData.append('oldCost', oldPrice || newPrice);
      formData.append('category', category);

      await AdminService.createProduct(formData);
      handleSetMessage('Продукт успешно добавлен', 'success');
      setName('');
      resetImage();
      setOldPrice('');
      setNewPrice('');
      setCategory('');
    } catch (error: any) {
      handleSetMessage(error.response?.data?.message || 'Ошибка при добавлении продукта', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ px: isMobile ? 2 : 3 }}>
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 2 : isTablet ? 3 : 4,
            mt: isMobile ? 2 : 4,
            borderRadius: 2,
            overflow: 'hidden',
            background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
            width: '100%',
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h2"
            gutterBottom
            sx={{
              mb: isMobile ? 2 : 3,
              color: '#2c3e50',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: isMobile ? '1.3rem' : isTablet ? '2rem' : '2.25rem',
            }}
          >
            Добавление нового продукта
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? 2 : 3,
              '& .MuiTextField-root, & .MuiFormControl-root': {
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                },
              },
            }}
          >
            <TextField
              label="Название продукта"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size={isMobile ? 'small' : 'medium'}
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#2c3e50',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  '&.Mui-focused': {
                    color: '#3498db',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  padding: isMobile ? '10px 14px' : '16px 14px',
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? 1.5 : 2,
                mt: isMobile ? 1 : 2,
              }}
            >
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="product-image"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="product-image">
                <IconButton
                  color="primary"
                  component="span"
                  sx={{
                    border: '2px dashed #3498db',
                    borderRadius: 2,
                    p: isMobile ? 2 : 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#2980b9',
                      backgroundColor: 'rgba(52, 152, 219, 0.04)',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <AddPhotoAlternateIcon
                    sx={{
                      fontSize: isMobile ? 36 : 48,
                      color: '#3498db',
                    }}
                  />
                </IconButton>
              </label>
              {imagePreview && (
                <Box
                  sx={{
                    mt: isMobile ? 1 : 2,
                    p: 1,
                    borderRadius: 1,
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Предпросмотр"
                    className={styles.Image}
                    style={{
                      maxWidth: isMobile ? '150px' : '200px',
                      maxHeight: isMobile ? '150px' : '200px',
                      borderRadius: '4px',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}
            </Box>

            <TextField
              label="Новая цена"
              variant="outlined"
              fullWidth
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
              size={isMobile ? 'small' : 'medium'}
              inputProps={{ min: 0, step: 0.01 }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#2c3e50',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  '&.Mui-focused': {
                    color: '#3498db',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  padding: isMobile ? '10px 14px' : '16px 14px',
                },
              }}
            />

            <TextField
              label="Старая цена"
              variant="outlined"
              fullWidth
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              size={isMobile ? 'small' : 'medium'}
              inputProps={{ min: 0, step: 0.01 }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#2c3e50',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  '&.Mui-focused': {
                    color: '#3498db',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  padding: isMobile ? '10px 14px' : '16px 14px',
                },
              }}
            />

            <FormControl fullWidth required size={isMobile ? 'small' : 'medium'}>
              <InputLabel
                sx={{
                  color: '#2c3e50',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                }}
              >
                Категория
              </InputLabel>
              <Select
                value={category}
                label="Категория"
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3498db',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2980b9',
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.category_id}
                    value={cat.name}
                    sx={{
                      fontSize: isMobile ? '0.875rem' : '1rem',
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading}
              sx={{
                mt: isMobile ? 2 : 3,
                py: isMobile ? 1 : 1.5,
                fontSize: isMobile ? '0.65rem' : '1rem',
                background: 'linear-gradient(45deg, #3498db 30%, #2980b9 90%)',
                boxShadow: '0 3px 5px 2px rgba(52, 152, 219, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2980b9 30%, #3498db 90%)',
                  boxShadow: '0 4px 8px 2px rgba(52, 152, 219, .4)',
                },
                '&:disabled': {
                  background: '#bdc3c7',
                },
              }}
            >
              {isLoading ? <CircularProgress size={isMobile ? 20 : 24} color="inherit" /> : 'Добавить продукт'}
            </Button>
          </Box>
        </Paper>
      </Container>
      <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
    </>
  );
};

export default AddEditProduct;
