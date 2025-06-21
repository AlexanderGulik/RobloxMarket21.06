import classes from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { Button, Container, Box, Typography } from '@mui/material';
import { AuthService } from '../../../API/AuthService';
import { LoginDataI, UserStoreI } from '../../../types/common';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useActions } from '../../../hooks/useAction';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { putItemInLocalStorage } from '../../../utils/LocalStorage';
import EmailInputLogin from '../../UI/inputs/LoginInputs/EmailInputLogin';
import PasswordInputLogin from '../../UI/inputs/LoginInputs/PassworadInputLogin';
import { Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../../../types/responseTypes';

interface LoginForm {}

type FormValuesLogin = {
  email: string;
  password: string;
};

export const LoginForm: React.FC<LoginForm> = () => {
  const navigate = useNavigate();
  const { setUser } = useActions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesLogin>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData: LoginDataI) => {
    try {
      setError('');
      setIsLoading(true);
      const response = await AuthService.userLogin(formData);
      if (!response?.error) {
        const store: UserStoreI = {
          accessToken: response.accessToken,
          isAuthenticated: true,
          user: null,
        };
        putItemInLocalStorage('store', store);
        const userInfoResponse = await AuthService.getUserInfo();
        store.user = { ...userInfoResponse.data.user };
        putItemInLocalStorage('store', store);
        setUser(store);
        if (userInfoResponse.data.user.roles === 'admin') {
          navigate('/adminpanel');
        } else {
          navigate('/profile');
        }
      } else {
        setError(response.message || 'Ошибка при авторизации');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        setError(axiosError.response?.data.message || 'Ошибка при авторизации');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <div className={classes.SectionContainer}>
            <Container maxWidth="sm">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: '15px',
                  padding: '30px',
                  boxShadow: 3,
                }}
              >
                <Typography component="h1" variant="h5">
                  Вход в аккаунт
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ mt: 3, width: '100%' }}>
                  <EmailInputLogin errors={errors} control={control} />
                  <PasswordInputLogin errors={errors} control={control} />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: 'orange',
                      fontWeight: 700,
                      p: '15px',
                    }}
                  >
                    {isLoading ? <CircularProgress sx={{ color: 'white' }} size={'25px'} /> : <span>Войти</span>}
                  </Button>
                  <div className={classes.Error}>{error}</div>
                  <div className={classes.RegLink}>
                    Ещё нет аккаунта? <Link to="/registration">Регистрация</Link>
                  </div>
                </Box>
              </Box>
            </Container>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};
