import { useState } from 'react';
import { Controller, UseFormWatch, FieldErrors, Control } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { FormValues } from '../../../../types/common';

interface PairPasswordInputI {
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
}

const PairPasswordInput: React.FC<PairPasswordInputI> = ({ watch, errors, control }) => {
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = useState(false);
  const handleClickShowPasswordFirst = () => {
    setShowPasswordFirst((prev) => !prev);
  };
  const handleClickShowPasswordSecond = () => {
    setShowPasswordSecond((prev) => !prev);
  };
  return (
    <>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: 'Пароль обязателен',
          pattern: {
            value: /^[a-zA-Z0-9!@#$%^&*()_+{}-]{6,35}$/,
            message:
              'Пароль должен быть от 6 до 35 символов. Могут использоваться только латинские буквы, цифры и символы: !@#$%^&*()_+{}-',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            label="Пароль"
            type={showPasswordFirst ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPasswordFirst} edge="end">
                    {showPasswordFirst ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: 'Повторите пароль',
          validate: (value) => value === watch('password') || 'Пароли не совпадают',
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            label="Повторите пароль"
            type={showPasswordSecond ? 'text' : 'password'}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordSecond}
                    edge="end"
                  >
                    {showPasswordSecond ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default PairPasswordInput;
