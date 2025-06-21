import classes from './OrderList.module.css';

interface OrderStatusPropsI {
  status: string;
}

export const OrderStatus: React.FC<OrderStatusPropsI> = ({ status }) => {
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
