import { Truck } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, View } from 'react-native';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Text } from '../ui/text';

import { ShipOrderForm } from '@/forms/order/ship-order-form';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { ITransactionById } from '@/types/ITransaction';

/**
 * @description A React component that renders a modal dialog for updating the tracking information of an order. It displays a button labeled "Update Tracking Info" which, when clicked, opens the dialog with a form for entering tracking details.
 *
 * @param {Object} props - Component props.
 * @property {ITransactionById} props.order - Data object containing information about the order to be updated.
 * @returns {JSX.Element} The rendered `UpdateTrackingInfo` component.
 */

export const UpdateTrackingInfo = ({
  order,
  className,
}: {
  order: ITransactionById;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getText } = useI18n();

  const btnText =
    order.orderProgress == 'SHIPPED' ? getText('update_tracking_info') : getText('ship_order');

  return (
    <>
      <Button className={cn('h-9 flex-row gap-1', className)} onPress={() => setIsOpen(true)}>
        <Truck size={17} color="white" />
        <Text className="text-white">{btnText}</Text>
      </Button>
      <Modal visible={isOpen} statusBarTranslucent transparent animationType="fade">
        <KeyboardAvoidingView
          className="w-full flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className="flex-1 items-center justify-center bg-black/80">
            <Card className="w-[90%] bg-background p-4 web:shadow-lg sm:w-[70%] md:w-[30%]">
              <ShipOrderForm data={order} close={() => setIsOpen(false)} />
            </Card>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};
