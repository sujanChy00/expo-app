import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CoolBadge } from '../cool-badge';
import { DryBadge } from '../dry-badge';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { orderStatusColor, transformOrders } from '@/data/order/get-orders';
import { useWindow } from '@/hooks/use-window';
import { cn } from '@/lib/utils';
import { ITransactionContent } from '@/types/ITransaction';
import { truncateString } from '@/utils/tuncate-string';

/**
 * @description A React component that displays an individual order card, including information like order ID, status, user name, payment method, number of items, subtotal, and total price. Clicking the card navigates to the order details page. The card's appearance adapts to the screen width and displays status-specific colors and themes.
 * @example
 * ```jsx
 * <OrderCard
 *   order={{
 *     transaction_id: 12345,
 *     transaction_user_name: "John Doe",
 *     order_status: "placed",
 *     transaction_type: "dry",
 *     transaction_total_price: 2500,
 *     // ... other order details
 *   }}
 * />
 * ```
 *
 * @typedef {Object} ITransactionContent
 * @property {string} transaction_id - Unique identifier for the order.
 * @property {string} transaction_user_name - Username of the customer who placed the order.
 * @property {string} order_status - Current status of the order (e.g., "placed", "shipped").
 * @property {string} transaction_type - Type of order (e.g., "dry", "cold").
 * @property {number} transaction_total_price - Total price of the order.
 * // ... other properties related to order details (e.g., items, payment details)

 *
 * @param {Object} props - Component props.
 * @property {ITransactionContent} props.order - Data object containing information about the order.
 * @returns {JSX.Element} The rendered `OrderCard` component.

 *
 */
export const OrderCard = ({ order }: { order: ITransactionContent }) => {
  const router = useRouter();
  const { dataCardStyle, isXs } = useWindow();
  const { getText, totalItems, subTotal, transactionDate, orderProgress } = transformOrders(order);
  return (
    <TouchableOpacity
      style={dataCardStyle}
      onPress={() => router.push(`/orders/${order?.orderId}`)}>
      <Card className={cn('gap-y-2 p-2 shadow-none', isXs && 'web:flex-1')}>
        <CardHeader className="flex-row items-center justify-between p-1.5">
          <View className="flex-col justify-between gap-2">
            <P className="text-sm font-semibold uppercase" style={{ fontSize: 14 }}>
              {truncateString(order?.userName, 18)}
            </P>
            <P className="text-sm font-semibold">#{order?.orderId}</P>
          </View>
          <View className="flex-col items-end justify-between gap-2">
            <Card
              className="p-2"
              style={{
                backgroundColor: orderStatusColor[order?.orderProgress],
              }}>
              <P className="text-sm font-bold" style={{ color: 'white' }}>
                {orderProgress.toUpperCase()}
              </P>
            </Card>
            <P className="text-sm font-semibold">{transactionDate}</P>
          </View>
        </CardHeader>
        <Separator />
        <CardContent className="gap-y-2.5 p-1.5">
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('payment_method')}</P>
            <P className="text-sm font-semibold capitalize">
              {order.paymentMethod.replaceAll('_', ' ')}
            </P>
          </View>
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('transaction_type')}</P>
            {order?.transactionType === 'dry' ? (
              <DryBadge text={order?.transactionType} />
            ) : (
              <CoolBadge text={order?.transactionType} />
            )}
          </View>
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('total_items')}</P>
            <P className="text-sm font-semibold">{totalItems}</P>
          </View>
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('sub_total')}</P>
            <P className="text-sm font-semibold">¥{subTotal}</P>
          </View>
          <View className="flex-row items-center justify-between">
            <P className="text-sm font-semibold">{getText('total_price')}</P>
            <P className="text-sm font-semibold">¥{order?.totalPrice}</P>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
};
