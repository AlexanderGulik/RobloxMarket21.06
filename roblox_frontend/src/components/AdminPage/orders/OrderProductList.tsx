import React from 'react';
import { Box, Typography } from '@mui/material';
import { UrlEnums } from '../../../const/URLs/urls';
import { OrderItemAdminI } from '../../../types/common';

interface OrderProductListProps {
  products: OrderItemAdminI[];
}

const ProductList: React.FC<OrderProductListProps> = ({ products }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      {products.map((product) => (
        <Box
          key={product.product_id}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            p: 2,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
            }}
          >
            <img
              src={`${UrlEnums.HOST}/uploads/${product.product_image}`}
              alt={product.product_name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#4a5568' }}>
              <strong>Название:</strong> {product.product_name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4a5568' }}>
              <strong>Цена:</strong> {product.price} ₽
            </Typography>
            <Typography variant="body2" sx={{ color: '#4a5568' }}>
              <strong>Кол-во:</strong> {product.quantity}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
