import React from 'react';
import { View } from 'react-native';

import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';
import { OrderDataLayout } from './order-data-layout';

import useI18n from '@/hooks/useI81n';
import { ITransactionById } from '@/types/ITransaction';

/**
 * @description A React component that displays user information associated with an order, including tracking information (URL and number if available), postal code, city, prefecture, estimated delivery time, and address. It allows copying the tracking number to the clipboard and opening the tracking URL if present.
 * @typedef {Object} ITransactionById
 * @property {string} [trackingUrl] - URL for tracking the order (optional).
 * @property {string} [trackingNumber] - Tracking number for the order (optional).
 * @property {string} userDetail.postalCode - Postal code of the user's address.
 * @property {string} userDetail.city - City of the user's address.
 * @property {string} userDetail.prefecture - Prefecture of the user's address.
 * @property {string} deliveryTime - Estimated delivery time for the order.
 * @property {string} userDetail.address1 - First line of the user's address.
 * @property {string} userDetail.address2 - Second line of the user's address (optional).
 * // ... other properties related to order details (e.g., status, payment details)

 *
 * @param {Object} props - Component props.
 * @property {ITransactionById} props.order - Data object containing information about the order and the user.
 * @returns {JSX.Element} The rendered `UserInfo` component.
 */

export const PaymentInfo = ({ order }: { order: ITransactionById }) => {
  const { getText } = useI18n();
  return (
    <Card className="w-full  p-2 shadow-none sm:w-auto sm:flex-1">
      <CardContent className="gap-y-5 divide-y divide-border p-1">
        <View className="gap-2">
          <View className="items-end gap-2">
            <P className="text-sm font-semibold">
              {getText('total_weight')}:{order.totalWeight}
            </P>
            {order.taxInfo.map((tax, index) => (
              <P className="text-sm font-semibold" key={tax.taxPercentage + index}>
                {getText('total_for')} {tax.taxPercentage}% {getText('tax')}: ¥{tax.itemTotal}
              </P>
            ))}
          </View>
          <Separator />
          <OrderDataLayout title="sub_total" caption={` ¥${order.beforeTaxItemTotal}`} />
          {order.taxInfo.map((tax, index) => (
            <View className="flex-row items-center justify-between" key={tax.taxPercentage + index}>
              <P className="font-semibold">
                {getText('tax')} {tax.taxPercentage}% ({tax.itemCount} {getText('items')})
              </P>
              <P className="text-sm font-semibold">+ ¥{tax.totalTax}</P>
            </View>
          ))}
          <OrderDataLayout title="shipping_fees">
            <View className="flex-row justify-between gap-x-2">
              {order.originalShippingPrice > order.shippingPrice && (
                <P className="font-semibold  line-through">¥{order.originalShippingPrice}</P>
              )}
              <P className="text-sm font-semibold">+ ¥{order.shippingPrice}</P>
            </View>
          </OrderDataLayout>
          {!!order.discountAmount && (
            <OrderDataLayout title="discount" caption={` - ¥${order.discountAmount}`} />
          )}
          {!!order.extraPrice && (
            <OrderDataLayout title="extra_fee" caption={`+ ¥${order.extraPrice}`} />
          )}
          {!!order.redeemedPoints && (
            <OrderDataLayout title="redeemed_points" caption={`- ¥${order.redeemedPoints}`} />
          )}
          <Separator />
          <OrderDataLayout title="total" caption={`¥${order.totalPrice}`} />
        </View>
      </CardContent>
    </Card>
  );
};
