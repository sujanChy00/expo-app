import * as Clipboard from 'expo-clipboard';
import { Copy } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { OrderTrackingTable } from './order-tracking-table';

import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { successToast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { OrderTrackingResponse } from '@/types/ITransaction';
import { dateTimestampFormatter } from '@/utils/date';

interface Props {
  order: OrderTrackingResponse;
  className?: string;
  wrapperClassName?: string;
}

export const OrderTrackingDetails = ({ order, className, wrapperClassName }: Props) => {
  const { getText } = useI18n();
  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };
  return (
    <View className={cn('flex-1 gap-6', wrapperClassName)}>
      <View className="gap-y-4">
        {!!order?.trackingNumber && (
          <View className="flex-row items-center gap-x-6">
            <P className="text-lg font-semibold text-foreground">{getText('tracking_number')}:</P>
            <P className="text-foreground">{order.trackingNumber}</P>
            <Button
              size="icon"
              variant={copied ? 'default' : 'outline'}
              className="h-8 w-8"
              onPress={() => {
                copyToClipboard(order.trackingNumber);
                setCopied(true);
                successToast('tracking number copied!');

                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}>
              <Copy size={16} className={copied ? 'text-background' : 'text-foreground'} />
            </Button>
          </View>
        )}
        <View className="flex-row items-center gap-x-6">
          <P className="text-lg font-semibold text-foreground">{getText('status')}:</P>
          <P
            className={cn(
              'font-semibold',
              order?.deliveredAt
                ? 'text-green-800'
                : order?.lastUpdate
                  ? 'text-blue-600'
                  : 'text-destructive'
            )}>
            {order?.currentStatus}
          </P>
        </View>
        {!!order?.deliveredAt && (
          <View className="flex-row items-center gap-x-6">
            <P className="text-lg font-semibold text-foreground">{getText('delivered_at')}:</P>
            <P className="text-foreground">{dateTimestampFormatter(order.deliveredAt)}</P>
          </View>
        )}
        {!!order?.lastUpdate && (
          <View className="flex-row items-center gap-x-6">
            <P className="text-foreground">{getText('last_updated')}:</P>
            <P className="text-foreground">{order?.lastUpdate}</P>
          </View>
        )}
        {!!order?.updatedAt && (
          <View className="flex-row items-center gap-x-6">
            <P className="text-foreground">{getText('last_fetched')}:</P>
            <P className="text-foreground">{dateTimestampFormatter(order?.updatedAt)}</P>
          </View>
        )}
      </View>
      <OrderTrackingTable order={order} className={className} />
    </View>
  );
};
