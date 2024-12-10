import { Info } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, View, useWindowDimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { P } from '../ui/typography';

import { useApproveAddressUpdate, useCancelAddressUpdate } from '@/actions/order';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

type Props = {
  orderId: number;
  isSellerRequest?: boolean;
};

/**
 * @description A React component to display an alert for approving or cancelling an address update request.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.orderId - The ID of the order for which the address update is requested.
 * @param {boolean} [props.isSellerRequest] - Indicates if the request is initiated by the seller.
 * @returns {JSX.Element} The rendered UpdateAddressAlert component.
 */
export const UpdateAddressAlert = ({ orderId, isSellerRequest }: Props) => {
  const { getText } = useI18n();
  const { width } = useWindowDimensions();
  const { mutateAsync, isPending } = useApproveAddressUpdate();
  const { mutateAsync: cancel, isPending: cancelling } = useCancelAddressUpdate();
  const approveAddressUpdate = async () => await mutateAsync(orderId);
  const cancelAddressUpdate = async () => await cancel(orderId);
  const messasge = isSellerRequest ? getText('alert_seller') : getText('alert_user');
  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <Alert
        icon={Info}
        variant="destructive"
        iconSize={28}
        className="xs:flex-row xs:justify-between xs:items-end xs:gap-2 gap-4">
        <View className="pl-2">
          <AlertTitle>{getText('address_update_request')}</AlertTitle>
          <AlertDescription>{messasge}</AlertDescription>
        </View>
        {isSellerRequest && (
          <Button
            disabled={isPending || cancelling}
            onPress={cancelAddressUpdate}
            variant="destructive"
            className={cn('flex-row items-center gap-1', width <= 576 && 'w-full')}>
            {cancelling && <ActivityIndicator size="small" color="#fff" />}
            <P className="font-semibold text-white">{getText('cancel')}</P>
          </Button>
        )}
        {!isSellerRequest && (
          <Button
            disabled={isPending || cancelling}
            onPress={approveAddressUpdate}
            className={cn('flex-row items-center gap-1', width <= 576 && 'w-full')}>
            {isPending && <ActivityIndicator size="small" color="#fff" />}
            <P className="font-semibold text-white">{getText('approve')}</P>
          </Button>
        )}
      </Alert>
    </Animated.View>
  );
};
