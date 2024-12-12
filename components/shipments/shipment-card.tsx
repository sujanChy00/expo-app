import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { OrderTrackingTable } from '../orders/order-tracking-table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { OrderTrackingResponse } from '@/types/ITransaction';
import { dateTimestampFormatter } from '@/utils/date';

export const ShipmentCard = ({ data }: { data: OrderTrackingResponse }) => {
  const router = useRouter();
  const { getText } = useI18n();
  const { dataCardStyle, isXs } = useWindow();
  return (
    <View style={dataCardStyle}>
      <Card className={cn('gap-y-2 p-2 shadow-none', isXs && 'web:flex-1')}>
        <TouchableOpacity onPress={() => router.push(`/orders/${data?.orderId}`)}>
          <>
            <CardHeader className="p-2">
              <View className="flex-row items-center gap-2">
                <P className="font-semibold">Order ID</P>
                <P className="font-semibold">#{data?.orderId}</P>
              </View>
              <View className="flex-row items-center gap-1">
                <P
                  className={cn(
                    'text-base font-semibold',
                    data?.deliveredAt
                      ? 'text-green-800'
                      : data?.lastUpdate
                        ? 'text-blue-600'
                        : 'text-destructive'
                  )}>
                  {getText('status')}: {data.currentStatus}
                </P>
                {!!data?.deliveredAt && (
                  <P className="pl-1 text-base">({dateTimestampFormatter(data.deliveredAt)})</P>
                )}
              </View>
            </CardHeader>
            <Separator />
            <CardContent className="gap-y-1.5 p-2">
              {!!data?.userFullName && (
                <View className="flex-row items-center gap-2">
                  <P>{getText('name')}:</P>
                  <P>{data.userFullName}</P>
                </View>
              )}
              {!!data?.lastUpdate && (
                <View className="flex-row items-center gap-2">
                  <P>{getText('last_updated')}:</P>
                  <P>{data.lastUpdate}</P>
                </View>
              )}
              {!!data?.updatedAt && (
                <View className="flex-row items-center gap-2">
                  <P>{getText('last_fetched')}:</P>
                  <P>{dateTimestampFormatter(data.updatedAt)}</P>
                </View>
              )}
            </CardContent>
          </>
        </TouchableOpacity>
        {data?.details && data.details.length > 0 && (
          <CardFooter className="flex-col items-stretch p-2">
            <Accordion type="single" collapsible>
              <AccordionItem
                value="tracking_details"
                className="border-none border-transparent border-b-transparent py-2">
                <AccordionTrigger className="py-1">
                  <P className="text-accent-foreground">View Detail</P>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  {!!data?.shippingCompany && (
                    <View className="pt-3">
                      <P>
                        {getText('shipping_company')}: {data.shippingCompany}
                      </P>
                    </View>
                  )}
                  <View className="pt-2">
                    <OrderTrackingTable order={data} />
                  </View>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        )}
      </Card>
    </View>
  );
};
