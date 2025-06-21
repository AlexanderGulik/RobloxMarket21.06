import { UserI } from '../../types/common';
import classes from './Profile.module.css';
import { Pagination } from '@mui/material';

interface ProfileProps {
  user: UserI | null;
  orders: any;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, orders, isLoading, totalPages, currentPage, handlePageChange }) => {
  const setStatus = (status: string) => {
    if (status === 'NEW')
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={classes.greyDot} />
          Ожидает оплаты
        </span>
      );
    if (status === 'CONFIRMED')
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={classes.greenDot} />
          Оплачен
        </span>
      );
    if (status === 'AUTHORIZED')
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={classes.greyDot} />
          Ожидает подтверждения
        </span>
      );
    if (status === 'REJECTED')
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={classes.redDot} />
          Отклонен
        </span>
      );
    if (status === 'AUTH_FAIL')
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={classes.redDot} />
          Ошибка оплаты
        </span>
      );
    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className={classes.greyDot} />
        {status}
      </span>
    );
  };

  return (
    <div className={classes.ProfileSection}>
      <div className={classes.profileContainer}>
        <div className={classes.userInfo}>
          <h2>Личный кабинет</h2>
          <div className={classes.infoItem}>
            <strong>Имя пользователя:</strong> <span className={classes.infoItemText}>{user?.username}</span>
          </div>
          <div className={classes.infoItem}>
            <strong>Почта:</strong> <span className={classes.infoItemText}>{user?.email}</span>
          </div>
        </div>

        <div className={classes.ordersSection}>
          <h3>История покупок</h3>
          {orders.length > 0 ? (
            <ul className={classes.ordersList}>
              {orders.map((order: any) => (
                <li key={order.order_id} className={classes.orderItem}>
                  <div className={classes.orderHeader}>
                    <span>Заказ №{order.order_id}</span>
                    <span>{order.created_at}</span>
                  </div>
                  <div className={classes.orderDetails}>
                    <strong>Товары:</strong>
                    <ul className={classes.orderItemsList}>
                      {order.items.map((item: any, index: number) => (
                        <li key={index}>
                          <span>{item.product_name} | </span>
                          <span>{item.quantity} шт. | </span>
                          <span>{item.amount} р.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={classes.orderTotal}>
                    <span className={classes.orderTotalAmount}>
                      <strong>Итого:</strong> {order.amount} р.
                    </span>
                    <span className={classes.orderTotalStatus}>{setStatus(order.status)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={classes.OrdersError}>Вы еще не совершали покупок.</p>
          )}
        </div>
      </div>
      <Pagination
        disabled={isLoading}
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
    </div>
  );
};

export default Profile;
