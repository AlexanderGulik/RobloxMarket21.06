import { Controller, FieldErrors, Control } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormValuesLogin } from '../../../../types/common';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';

interface PairPasswordInputI {
  errors: FieldErrors<FormValuesLogin>;
  control: Control<FormValuesLogin, any>;
}

const PasswordInputLogin: React.FC<PairPasswordInputI> = ({ errors, control }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPasswordFirst = () => {
    setShowPassword((prev) => !prev);
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
            value: /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,35}$/,
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
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPasswordFirst} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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

export default PasswordInputLogin;
