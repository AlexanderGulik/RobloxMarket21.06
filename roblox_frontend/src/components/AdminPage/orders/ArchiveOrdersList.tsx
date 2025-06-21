import React, { useState, useEffect } from 'react';
import {
  Box,
  CardContent,
  Typography,
  IconButton,
  Container,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Pagination,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import OrderDetails from './OrderDetails';
import ProductList from './OrderProductList';
import OrderPreview from './OrderPreview';
import { OrderStatus } from './OrderStatus';
import { useMessages } from '../../../hooks/useMessages';
import { AdminService } from '../../../API/AdminService';
import TableLoader from '../../UI/Loaders/TableLoder';
import { OrderAdminI } from '../../../types/common';
import axios, { AxiosError } from 'axios';
import { ErrorResponseI } from '../../../types/responseTypes';
import AlertComponent from '../../UI/Alert/AlertComponent';

const ArchiveOrdersList: React.FC = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [orders, setOrders] = useState<OrderAdminI[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [changePageLoading, setChangePageLoading] = useState<boolean>(false);
  const { messages, handleSetMessage, handleRemoveMessage } = useMessages();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeOrderTypeLoading, setChangeOrderTypeLoading] = useState<boolean>(false);

  const fetchArchiveOrders = async () => {
    try {
      setIsLoading(true);
      const response = await AdminService.getArchiveOrders();
      setOrders(response.data.orders);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении архивный заказов', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    try {
      setChangePageLoading(true);
      setCurrentPage(page);
      const response = await AdminService.getArchiveOrders(page);
      setOrders(response.data.orders);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при получении архивных заказов', 'error');
      }
    } finally {
      setChangePageLoading(false);
    }
  };

  const handleChangeOrderType = async (orderId: string) => {
    try {
      setChangeOrderTypeLoading(true);
      await AdminService.changeOrderTypeById(orderId, 'Входящий');
      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponseI>;
        handleSetMessage(axiosError.response?.data.message || 'Ошибка при изменении типа заказа', 'error');
      }
    } finally {
      setChangeOrderTypeLoading(false);
    }
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    fetchArchiveOrders();
  }, []);

  return (
    <Container
      sx={{
        px: isMobile ? 2 : 3,
        py: isMobile ? 2 : 4,
        minHeight: '100vh',
      }}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h2"
        gutterBottom
        sx={{
          mb: isMobile ? 2 : 3,
          color: '#2d3748',
          fontWeight: 600,
          textAlign: 'center',
          fontSize: isMobile ? '1.3rem' : '2rem',
        }}
      >
        Архивные заказы
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {isLoading || changePageLoading ? (
          <TableLoader />
        ) : orders.length === 0 ? (
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ color: '#2d3748', fontWeight: 600, textAlign: 'center' }}
          >
            Нет архивированных заказов
          </Typography>
        ) : (
          orders.map((order) => (
            <Paper
              key={order.order_id}
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                background: 'white',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: isMobile ? 'start' : 'center',
                  p: isMobile ? 2 : 3,
                  flexDirection: isMobile ? 'column' : 'row',
                  cursor: 'pointer',
                }}
                onClick={() => toggleExpand(order.order_id)}
              >
                <OrderPreview order={order} isMobile={isMobile} />

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ mt: 'auto' }}>
                      <OrderStatus status={order.status} />
                    </Box>
                  </Box>

                  <IconButton>{expandedOrder === order.order_id ? <ExpandLess /> : <ExpandMore />}</IconButton>
                </Box>
              </Box>

              {expandedOrder === order.order_id && (
                <CardContent
                  sx={{
                    borderTop: '1px solid #e2e8f0',
                    p: isMobile ? 2 : 3,
                  }}
                >
                  <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 2 }}>
                    <Tab label="Информация о заказе" />
                    <Tab label="Товары" />
                  </Tabs>

                  {selectedTab === 0 && (
                    <OrderDetails
                      changeOrderTypeLoading={changeOrderTypeLoading}
                      handleChangeOrderType={handleChangeOrderType}
                      order={order}
                      buttonText="Добавить во входящие"
                    />
                  )}
                  {selectedTab === 1 && <ProductList products={order.items} />}
                </CardContent>
              )}
            </Paper>
          ))
        )}
      </Box>
      <AlertComponent messages={messages} handleRemoveMessage={handleRemoveMessage} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          disabled={isLoading || changePageLoading}
          count={totalPages}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          sx={{
            '@media (max-width: 600px)': {
              '& .MuiPaginationItem-root': {
                fontSize: '0.75rem',
                minWidth: '27px',
                height: '27px',
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default ArchiveOrdersList;
