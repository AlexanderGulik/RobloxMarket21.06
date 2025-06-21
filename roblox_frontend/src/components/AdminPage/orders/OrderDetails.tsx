import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { OrderAdminI } from '../../../types/common';

interface OrderDetailsPropsI {
  order: OrderAdminI;
  buttonText: string;
  handleChangeOrderType: (orderId: string) => void;
  changeOrderTypeLoading: boolean;
}

const OrderDetails: React.FC<OrderDetailsPropsI> = ({
  order,
  buttonText,
  handleChangeOrderType,
  changeOrderTypeLoading,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Никнейм пользователя:</strong> {order.username || 'Не авторизован'}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Почта пользователя:</strong> {order.email || 'Не авторизован'}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Сумма: </strong> {order.amount} р.
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>ID Заказа:</strong> {order.order_id}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>ID Платежа:</strong> {order.payment_id}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Имя в Roblox:</strong> {order.roblox_name}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Telegram:</strong> {order.telegram_name}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Телефон:</strong> {order.phone_number}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Создан:</strong> {order.created_at}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Обновлен:</strong> {order.updated_at}
      </Typography>
      <Typography variant="body2" sx={{ color: '#4a5568' }}>
        <strong>Тип заказа:</strong> {order.order_type}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleChangeOrderType(order.order_id);
        }}
        sx={{ alignSelf: 'start', mt: 2 }}
      >
        {changeOrderTypeLoading ? <CircularProgress sx={{ color: 'white' }} size={'25px'} /> : buttonText}
      </Button>
    </Box>
  );
};

export default OrderDetails;
