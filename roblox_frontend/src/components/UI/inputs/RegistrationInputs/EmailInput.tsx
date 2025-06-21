import { Controller, FieldErrors, Control } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormValues } from '../../../../types/common';

interface PairPasswordInputI {
  errors: FieldErrors<FormValues>;
  control: Control<FormValues, any>;
}

const EmailInput: React.FC<PairPasswordInputI> = ({ errors, control }) => {
  return (
    <>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: 'Email обязателен',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/i,
            message: 'Некорректный email',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
        )}
      />
    </>
  );
};

export default EmailInput;
