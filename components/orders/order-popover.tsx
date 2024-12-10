import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { ChevronRight, Home, MessageCircle, MoreVertical } from 'lucide-react-native';
import { useRef } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';

import { AppBottomSheet } from '../app-bottom-sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';
import { Invoice } from './invoice';

import { isweb } from '@/constants/data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import useI18n from '@/hooks/useI81n';
import { IOrderStatus } from '@/types/ITransaction';

interface Props {
  canUpdateAddress: boolean;
  orderId: number;
  userId: number;
  canComment?: boolean;
  orderStatus?: IOrderStatus;
}

/**
 *
 * @description A React component that renders a popover menu for order actions like updating address,
 * messaging user, and viewing invoice. Uses BottomSheet for the popover functionality.
 *
 * @component
 * @param {boolean} canUpdateAddress - Indicates whether the address can be updated.
 * @param {number} orderId - The ID of the order associated with the popover.
 * @param {boolean} [canComment] - Indicates whether the user can comment or message.
 * @returns {JSX.Element} The rendered OrderPopOver component.
 */
export const OrderPopOver = ({
  canUpdateAddress,
  orderId,
  orderStatus,
  canComment,
  userId,
}: Props) => {
  const { isDarkColorScheme } = useColorScheme();
  const ref = useRef<BottomSheet>(null);
  const open = () => ref?.current?.expand();
  const close = () => ref?.current?.close();
  const router = useRouter();
  const { getText } = useI18n();

  return (
    <>
      <Pressable onPress={open}>
        <MoreVertical color={isDarkColorScheme ? '#fff' : '#000'} />
      </Pressable>
      <AppBottomSheet ref={ref} snapPoints={['35%']} index={-1}>
        <BottomSheetView className="flex-1 p-4 pb-5">
          <View className="flex-1">
            {canUpdateAddress && (
              <>
                <TouchableOpacity
                  className="py-4"
                  onPress={() => {
                    router.push(`/orders/${orderId}/update-address`);
                    close();
                  }}>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <Home size={18} color="#313091" />
                      <P className="font-semibold">{getText('update_address')}</P>
                    </View>
                    <ChevronRight className="text-foreground" />
                  </View>
                </TouchableOpacity>
                <Separator />
              </>
            )}
            <TouchableOpacity
              className="py-4"
              onPress={() => {
                isweb
                  ? router.push(`/chat/${userId}?orderId=${orderId}`)
                  : router.push(`/messages/${userId}?orderId=${orderId}`);
                close();
              }}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <MessageCircle size={18} color="#313091" />
                  <P className="font-semibold">
                    {canComment ? getText('message_user') : getText('view_messages')}
                  </P>
                </View>
                <ChevronRight className="text-foreground" />
              </View>
            </TouchableOpacity>
            {orderStatus != 'WAIT_PAYMENT' && (
              <>
                <Separator />
                <Invoice orderId={orderId} close={close} />
              </>
            )}
          </View>
          {isweb && (
            <View>
              <Button onPress={close} variant="destructive">
                <P className="font-semibold text-white">{getText('close')}</P>
              </Button>
            </View>
          )}
        </BottomSheetView>
      </AppBottomSheet>
    </>
  );
};
