import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PhoneIcon from '@mui/icons-material/Phone';
import { countryCodes } from '../../const/common';
import { useCart } from '../../hooks/useCart';
import classes from './PaymentPage.module.css';
import { PaymentService } from '../../API/PaymentService';
import { useUser } from '../../hooks/useUser';
import { FormDataI } from '../../types/common';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../../types/responseTypes';
import { useMessages } from '../../hooks/useMessages';
import AlertComponent from '../UI/Alert/AlertComponent';
import { putItemInLocalStorage } from '../../utils/LocalStorage';

const PaymentPageForm = () => {
  const [telegram, setTelegram] = useState('');
  const [roblox, setRoblox] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+7');
  const [telegramError, setTelegramError] = useState('');
  const [robloxError, setRobloxError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const cart = useCart();
  const user = useUser().user;
  const { messages, handleRemoveMessage, handleSetMessage } = useMessages(3500);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isCartEmpty = cart.products.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isCartEmpty) return;

    if (telegram.length < 6) {
      setTelegramError('Слишком короткое значение');
      return;
    } else {
      setTelegramError('');
    }

    if (roblox.length < 3) {
      setRobloxError('Слишком короткое значение');
      return;
    } else {
      setRobloxError('');
    }

    if (phone.length < 15) {
      setPhoneError('Слишком короткое значение');
      return;
    } else {
      setPhoneError('');
    }

    const formData: FormDataI = {
      telegram,
      roblox,
      phone: countryCode + phone,
    };
    try {
      const response = await PaymentService.paymentInit(cart, user, formData);
      response.data.PaymentURL ? (window.location.href = response.data.PaymentURL) : '';
      let cartNull = {
        products: [],
        amount: 0,
        total: 0,
        isVisible: false,
      };
      putItemInLocalStorage('cart', cartNull);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при оплате', 'error');
      }
    }
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setTelegramError('');

    value = value.replace(/@/g, '');

    if (value) {
      value = '@' + value;
    }

    value = value.replace(/[^@a-zA-Z0-9_']/g, '');

    if (value.length > 33) {
      value = value.slice(0, 33);
    }

    setTelegram(value);
  };

  const handleRobloxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setRobloxError('');

    value = value.replace(/[^a-zA-Z0-9_']/g, '');

    if (value.length > 20) {
      value = value.slice(0, 20);
    }

    setRoblox(value);
  };

  const handleCountryCodeChange = (event: SelectChangeEvent<string>) => {
    setCountryCode(event.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    value = value.slice(0, 10);

    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = `(${value.slice(0, 3)}`;

      if (value.length > 3) {
        formattedValue += `) ${value.slice(3, 6)}`;
      }

      if (value.length > 6) {
        formattedValue += `-${value.slice(6, 8)}`;
      }

      if (value.length > 8) {
        formattedValue += `-${value.slice(8)}`;
      }
    }

    setPhone(formattedValue);
  };

  return (
    <Container className={classes.Container}>
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: '#1a1a1a',
            mb: 3,
          }}
        >
          Оформление заказа
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            opacity: isCartEmpty ? 0.5 : 1,
            pointerEvents: isCartEmpty ? 'none' : 'auto',
          }}
        >
          <TextField
            fullWidth
            label="Telegram"
            value={telegram}
            onChange={handleTelegramChange}
            required
            disabled={isCartEmpty}
            placeholder="@username"
            error={!!telegramError}
            helperText={telegramError}
            InputProps={{
              startAdornment: <TelegramIcon sx={{ mr: 1, color: '#229ED9' }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: telegramError ? '#d32f2f' : '#229ED9',
                },
                '&.Mui-focused fieldset': {
                  borderColor: telegramError ? '#d32f2f' : '#229ED9',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: telegramError ? '#d32f2f' : '#229ED9',
              },
            }}
          />

          <TextField
            fullWidth
            label="Roblox никнейм"
            value={roblox}
            onChange={handleRobloxChange}
            required
            disabled={isCartEmpty}
            error={!!robloxError}
            helperText={robloxError}
            placeholder="Вводите без единой ошибки"
            InputProps={{
              startAdornment: <SportsEsportsIcon sx={{ mr: 1, color: '#FF0000' }} />,
            }}
            inputProps={{
              maxLength: 20,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: robloxError ? '#d32f2f' : '#FF0000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: robloxError ? '#d32f2f' : '#FF0000',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: robloxError ? '#d32f2f' : '#FF0000',
              },
            }}
          />

          <TextField
            fullWidth
            label="Номер телефона"
            value={phone}
            onChange={handlePhoneChange}
            required
            disabled={isCartEmpty}
            placeholder="(XXX)-XXX-XX-XX"
            error={!!phoneError}
            helperText={phoneError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: '#00C853', mr: 1 }} />
                  <Select
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                    size={isMobile ? 'small' : 'medium'}
                    variant="standard"
                    renderValue={(value) => value}
                    sx={{
                      '&:before, &:after': {
                        display: 'none',
                      },
                      '& .MuiSelect-select': {
                        paddingRight: '24px !important',
                        paddingLeft: '8px',
                        fontWeight: 500,
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                          width: 'fit-content',
                        },
                      },
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                      },
                      transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                      },
                    }}
                  >
                    {countryCodes.map((country, index) => (
                      <MenuItem
                        key={index}
                        value={country.code}
                        sx={{
                          fontSize: isMobile ? '0.875rem' : '1rem',
                        }}
                      >
                        {`${country.code} ${country.country}`}
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 15,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: phoneError ? '#d32f2f' : '#00C853',
                },
                '&.Mui-focused fieldset': {
                  borderColor: phoneError ? '#d32f2f' : '#00C853',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: phoneError ? '#d32f2f' : '#00C853',
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={isCartEmpty}
            sx={{
              mt: 2,
              bgcolor: '#000000',
              color: '#ffffff',
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: isCartEmpty ? '#000000' : '#333333',
              },
              '&:active': {
                bgcolor: '#000000',
              },
            }}
          >
            Оформить заказ
          </Button>
          <p
            style={{
              color: '#d32f2f',
              fontSize: '0.8rem',
              textAlign: 'right',
            }}
          >
            минимальная сумма заказа 50 р.
          </p>
        </Box>
      </Paper>
      <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
    </Container>
  );
};

export default PaymentPageForm;
