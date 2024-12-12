import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ReceiptText } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { P } from '../ui/typography';
import { OrderTrackingDetails } from './order-tracking-details';

import useI18n from '@/hooks/useI81n';
import { errorToast } from '@/lib/toast';
import { OrderTrackingResponse } from '@/types/ITransaction';
import { fetcher } from '@/utils/fetcher';
// import { OrderTrackingDetails } from "./order-tracking-details";

interface Props {
  initialData?: OrderTrackingResponse;
  children?: React.ReactNode;
}

export const OrderTrackingDetailsModal = ({ initialData, children }: Props) => {
  const { getText } = useI18n();
  const [data, setData] = useState<OrderTrackingResponse | undefined>(initialData);
  const [visible, setVisible] = useState(false);
  const { orderid } = useLocalSearchParams<{ orderid: string }>();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const getOrderTrackingDetails = () => {
    setIsLoading(true);
    queryClient.fetchQuery({
      queryKey: ['lazy-TrackingOrderDetails', orderid],
      queryFn: async () =>
        await fetcher<OrderTrackingResponse>({
          url: `/order/track/${orderid}`,
        })
          .then((res) => {
            setData(res);
            setVisible(true);
          })
          .catch((err) => {
            errorToast(err?.message || 'No Tracking details found');
          })
          .finally(() => setIsLoading(false)),
    });
  };

  const noData = !isLoading && !data;

  return (
    <>
      <Dialog open={visible} onOpenChange={setVisible}>
        <DialogTrigger asChild>
          <Button
            onPress={() => {
              if (initialData) return;
              getOrderTrackingDetails();
            }}
            disabled={isLoading}
            className="h-9 flex-row gap-1"
            variant="secondary">
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <ReceiptText size={16} className="text-accent-foreground" />
            )}
            <P className="text-accent-foreground">{children || getText('track_order')}</P>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full flex-1">
          <DialogHeader>
            <DialogTitle>{getText('tracking_details')}</DialogTitle>
            {!!data?.shippingCompany && (
              <DialogDescription>
                {getText('shipping_company')}: {data.shippingCompany}
              </DialogDescription>
            )}
          </DialogHeader>
          <View className="w-auto pt-6 md:w-[50vh]">
            {isLoading && (
              <View className="h-[40vh] items-center justify-center">
                <ActivityIndicator size="large" />
              </View>
            )}
            {noData && (
              <View className="h-[40vh] items-center justify-center">
                <P>No Tracking details found</P>
              </View>
            )}
            {!isLoading && data && <OrderTrackingDetails className="max-h-[40vh]" order={data} />}
          </View>
        </DialogContent>
      </Dialog>
    </>
  );
};
