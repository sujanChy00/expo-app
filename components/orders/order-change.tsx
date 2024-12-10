import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button, ButtonProps } from '../ui/button';
import { P } from '../ui/typography';

import { useChangeOrderStatus } from '@/actions/order';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IOrderProgress } from '@/types/ITransaction';

export const OrderChange = ({
  orderId,
  progress,
  ...props
}: {
  orderId: string;
  progress: IOrderProgress;
} & ButtonProps) => {
  const { mutateAsync, isPending } = useChangeOrderStatus();
  const { getText } = useI18n();
  const [opened, setOpened] = useState(false);

  const description =
    progress == 'ORDER_PLACED'
      ? getText('order_change_acknowledged_desc')
      : getText('order_change_acknowledged_request');

  return (
    <AlertDialog open={opened} onOpenChange={setOpened}>
      <AlertDialogTrigger asChild>
        <Button {...props} className={cn('flex-row items-center gap-1', props.className)}>
          {progress == 'ORDER_PLACED' ? (
            <P className="text-sm">🤔</P>
          ) : (
            // <FontAwesome6
            //   name="face-rolling-eyes"
            //   size={17}
            //   color={"#15803d"}
            // />
            <Entypo name="help" size={15} color="#15803d" />
          )}
          <P className="text-primary">
            {progress == 'ORDER_PLACED' ? getText('acknowledge') : getText('request_change')}
          </P>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-lg md:w-[25%]">
        <AlertDialogTitle>{getText('confirm_your_action')}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter className="flex-row flex-nowrap items-center justify-end">
          <AlertDialogCancel className="flex-row items-center gap-1">
            <P>{getText('cancel')}</P>
          </AlertDialogCancel>
          <Button
            className="flex-row items-center gap-1"
            onPress={() => {
              mutateAsync({
                orderId: Number(orderId),
                changeTo: progress == 'ORDER_PLACED' ? 'SELLER_ACKNOWLEDGED' : 'PENDING_CHANGE',
              }).finally(() => setOpened(false));
            }}>
            {isPending && <ActivityIndicator size="small" color="#fff" />}
            <P className="text-white">{getText('confirm')}</P>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
