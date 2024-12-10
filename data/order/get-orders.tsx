import useI18n from '@/hooks/useI81n';
import { IOrderProgress, ITransactionById, ITransactionContent } from '@/types/ITransaction';
import { dateTimestampFormatter } from '@/utils/date';

export function transformOrders(order: ITransactionContent) {
  const { getText } = useI18n();

  const getPaymentMethod: Record<string, string> = {
    'Cash On Delivery': getText('cash_on_delivery'),
    'Credit Card': getText('credit_card'),
    'Pay pay': getText('pay_pay'),
    'Convenience Store': getText('convenience_store'),
    'Bank Transfer': 'Bank Transfer',
  };

  const statusTextMapping: Record<IOrderProgress, string> = {
    WAITING_FOR_PAYMENT: getText('wait_payment'),
    ORDER_PLACED: getText('order_placed'),
    PENDING_CHANGE: getText('pending_change'),
    SHIPPED: getText('shipped'),
    CANCELLED_BY_ADMIN: getText('admin_cancelled'),
    CANCELLED_BY_CUSTOMER: getText('cancelled'),
    COMPLETED: getText('completed'),
    PAYMENT_FAILED: getText('payment_failed'),
    SELLER_ACKNOWLEDGED: getText('seller_acknowledged'),
  };

  const paymentMethod = getPaymentMethod[order.paymentMethod];
  const orderProgress = statusTextMapping[order.orderProgress];
  const transactionDate = dateTimestampFormatter(order.orderDateTimestamp);

  return {
    paymentMethod,
    transactionDate,
    getText,
    orderProgress,
    totalItems: order?.itemCount,
    subTotal: order.itemsTotalPrice,
  };
}

export const orderStatusColor: Record<IOrderProgress, string> = {
  WAITING_FOR_PAYMENT: '#eab308',
  COMPLETED: '#22c55e',
  CANCELLED_BY_ADMIN: '#ef4444',
  CANCELLED_BY_CUSTOMER: '#ef4444',
  PAYMENT_FAILED: '#ef4444',
  PENDING_CHANGE: '#f97316',
  ORDER_PLACED: '#0ea5e9',
  SELLER_ACKNOWLEDGED: '#22c55e',
  SHIPPED: '#84cc16',
};

export const orderFilterOptions = [
  {
    label: 'Processed',
    value: 'processed',
  },
  {
    label: 'Wait Payment',
    value: 'wait_payment',
  },
  {
    label: 'Wait Shipping',
    value: 'wait_shipping',
  },
  {
    label: 'Wait Review',
    value: 'wait_review',
  },
  {
    label: 'Done',
    value: 'done',
  },
  {
    label: 'Admin Cancel',
    value: 'admin_cancelled',
  },
  {
    label: 'Cancel',
    value: 'cancelled',
  },
];

export const transformOrderDetails = (order: ITransactionById) => {
  const canApproveAddressUpdate = order?.updateAddressRequest;
  const trackingDetailsAvailable = !!order?.trackingNumber || !!order?.trackingUrl;

  const canShipOrder =
    order?.orderProgress !== 'COMPLETED' &&
    order?.orderProgress !== 'CANCELLED_BY_ADMIN' &&
    order?.orderProgress !== 'CANCELLED_BY_CUSTOMER' &&
    (order?.orderProgress === 'SELLER_ACKNOWLEDGED' || trackingDetailsAvailable);

  const canUpdateAddress =
    order?.orderStatus == 'WAIT_PAYMENT' ||
    order?.orderStatus == 'WAIT_SHIPPING' ||
    order?.orderStatus == 'NOT_CONFIRMED';
  const isOrderChanged =
    order?.orderProgress == 'ORDER_PLACED' || order?.orderProgress == 'SELLER_ACKNOWLEDGED';

  const showUserReviews =
    order?.orderProgress == 'SHIPPED' ||
    order?.orderProgress == 'COMPLETED' ||
    trackingDetailsAvailable;

  return {
    canApproveAddressUpdate,
    canShipOrder,
    canUpdateAddress,
    isOrderChanged,
    showUserReviews,
    trackingDetailsAvailable,
  } as const;
};
