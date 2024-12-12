import React from 'react';
import { ActivityIndicator } from 'react-native';

import { SuccessBadge } from '../success-badge';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { useUpdateShopDeliveryTime } from '@/actions/delivery-time-slot';
import useI18n from '@/hooks/useI81n';
import { IShopDeliveryTimes } from '@/types/IAvailableDeliveries';

type Props = { timeSlots: IShopDeliveryTimes; default?: boolean };

/**
 * @description A React component that renders a card displaying delivery time options for a shop.
 *
 * @typedef {Object} IShopDeliveryTimes
 * @property {string} shippingCompanyName - The name of the shipping company.
 * @property {ShopDeliveryTime[]} deliveryTimes - An array of delivery time objects.
 *
 * @typedef {Object} ShopDeliveryTime
 * @property {number} deliveryTimeId - The ID of the delivery time option.
 * @property {string} deliveryTimeName - The name of the delivery time option.
 *
 * @typedef {Object} Props
 * @property {IShopDeliveryTimes} timeSlots - The delivery time information for the shop.
 * @property {boolean} [default] - Whether this card represents the default delivery time slot.
 *
 * @returns {JSX.Element} The rendered delivery time card.
 */

export const DeliveryTimeCards = ({ timeSlots, default: defaultTimeSlot }: Props) => {
  const { mutateAsync, isPending } = useUpdateShopDeliveryTime();
  const { getText } = useI18n();
  return (
    <Card className={`justify-between ${defaultTimeSlot ? 'border-2 border-green-600' : ''}`}>
      <CardHeader className="flex-row items-center justify-between p-2">
        <CardTitle className="text-lg font-semibold">{timeSlots?.shippingCompanyName}</CardTitle>
        {defaultTimeSlot && (
          <SuccessBadge className="rounded-full">{getText('default').toUpperCase()}</SuccessBadge>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="flex-row flex-wrap gap-1.5 p-2">
        {timeSlots?.deliveryTimes.map((time) => (
          <Badge
            className="native:p-2 native:px-2.5 web:p-1 web:py-0"
            variant="outline"
            key={time.deliveryTimeId}>
            <P className="text-xs font-semibold">{time?.deliveryTimeName}</P>
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="justify-center p-2">
        {defaultTimeSlot ? (
          <P className="text-center font-semibold  text-green-600">{getText('selected')}</P>
        ) : (
          <Button
            onPress={async () =>
              await mutateAsync({
                shippingCompanyId: timeSlots.shippingCompanyId,
              })
            }
            className="w-full flex-row items-center gap-1">
            {isPending && <ActivityIndicator size="small" color="#fff" />}
            <P className="text-sm font-semibold text-white">{getText('select')}</P>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
