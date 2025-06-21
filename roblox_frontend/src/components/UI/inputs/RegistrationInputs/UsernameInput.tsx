import { Controller, FieldErrors, Control } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormValues } from '../../../../types/common';

interface PairPasswordInputI {
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
}

const EmailInput: React.FC<PairPasswordInputI> = ({ errors, control }) => {
  return (
    <>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{
          required: 'Логин обязателен',
          pattern: {
            value: /^[a-zA-Z0-9_]{3,20}$/,
            message: 'Допустимы только латинские буквы, цифры и символ подчёркивания (_)',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            label="Логин"
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ''}
          />
        )}
      />
    </>
  );
};

export default EmailInput;
