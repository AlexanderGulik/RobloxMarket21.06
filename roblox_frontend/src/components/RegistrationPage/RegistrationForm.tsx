import classes from './Registration.module.css';
import { useForm } from 'react-hook-form';
import { Button, Container, Box, Typography } from '@mui/material';
import { AuthService } from '../../API/AuthService';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { putItemInLocalStorage } from '../../utils/LocalStorage';
import PairPasswordInput from '../UI/inputs/RegistrationInputs/PairPasswordInput';
import { FormValues, UserStoreI } from '../../types/common';
import EmailInput from '../UI/inputs/RegistrationInputs/EmailInput';
import UsernameInput from '../UI/inputs/RegistrationInputs/UsernameInput';
import { Grid } from '@mui/material';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useActions();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleRegistration = async (formData: FormValues) => {
    try {
      setError('');
      setIsLoading(true);
      if (formData.password !== formData.confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      const response = await AuthService.userRegistration(formData);
      if (!response.error) {
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
        navigate('/profile');
      } else {
        setError(response.error ? response.message : 'Ошибка регистрации');
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
                  Регистрация аккаунта
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handleRegistration)} sx={{ mt: 3, width: '100%' }}>
                  <UsernameInput errors={errors} control={control} />
                  <EmailInput errors={errors} control={control} />
                  <PairPasswordInput watch={watch} errors={errors} control={control} />
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
                    {isLoading ? (
                      <CircularProgress sx={{ color: 'white' }} size={'25px'} />
                    ) : (
                      <span>Зарегистрироваться</span>
                    )}
                  </Button>
                  <div className={classes.Error}>{error}</div>
                  <div className={classes.Agreement}>
                    Я согласен c <Link to="/privacypolicy">политикой конфиденциальности</Link> и{' '}
                    <Link to="/termofuse">пользовательским соглашением</Link>
                  </div>

                  <div className={classes.RegLink}>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
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
