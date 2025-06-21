import React from 'react';
import { Box, Typography } from '@mui/material';
import { OrderAdminI } from '../../../types/common';
interface OrderPreviewProps {
  order: OrderAdminI;
  isMobile: boolean;
}

const OrderPreview: React.FC<OrderPreviewProps> = ({ order, isMobile }) => {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: '#2d3748',
          fontSize: isMobile ? '0.875rem' : '1rem',
        }}
      >
        {order.created_at}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: '#2d3748',
          fontSize: isMobile ? '0.875rem' : '1rem',
        }}
      >
        Roblox:{' '}
        <span
          style={{
            color: '#313131',
            fontWeight: 400,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {order.roblox_name}
        </span>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: '#2d3748',
          fontSize: isMobile ? '0.875rem' : '1rem',
        }}
      >
        Телефон:{' '}
        <span
          style={{
            color: '#313131',
            fontWeight: 400,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {order.phone_number}
        </span>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: '#2d3748',
          fontSize: isMobile ? '0.875rem' : '1rem',
        }}
      >
        Телеграм:{' '}
        <span
          style={{
            color: '#313131',
            fontWeight: 400,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {order.telegram_name}
        </span>
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: '#2d3748',
          fontSize: isMobile ? '0.875rem' : '1rem',
        }}
      >
        Сумма:{' '}
        <span
          style={{
            color: '#313131',
            fontWeight: 400,
            fontFamily: 'Arial, sans-serif',
          }}
        >
          {order.amount}
        </span>
      </Typography>
    </Box>
  );
};

export default OrderPreview;
