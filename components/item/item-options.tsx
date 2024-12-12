import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Trash } from 'lucide-react-native';
import { useRef } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';

import { AppBottomSheet } from '../app-bottom-sheet';
import { Camera } from '../icons/camera-icon';
import { ChevronRight } from '../icons/chevron-right';
import { Copy } from '../icons/copy-icon';
import { Edit } from '../icons/edit-icon';
import { MoreVertical } from '../icons/more-vertical-icon';
import { Shapes } from '../icons/shapes-icon';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';
import { DeleteItem } from './delete-item';

import { useDeleteItem } from '@/actions/item';
import { isweb } from '@/constants/data';
import useI18n from '@/hooks/useI81n';

/**
 * @fileoverview A React component that provides item-related options in a bottom sheet.
 *
 * @returns {JSX.Element} The rendered ItemOptions component.
 */
export const ItemOptions = () => {
  const { mutateAsync, isPending } = useDeleteItem();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const open = () => bottomSheetRef?.current?.expand();
  const close = () => bottomSheetRef?.current?.close();
  const { getText } = useI18n();

  return (
    <>
      <Pressable
        onPress={open}
        className="h-10 w-10 items-center justify-center rounded-full bg-input">
        <MoreVertical className="native:text-muted-foreground web:text-foreground" />
      </Pressable>
      <AppBottomSheet ref={bottomSheetRef} snapPoints={['55%']} index={-1}>
        <BottomSheetView className="flex-1 p-4">
          <TouchableOpacity
            className="py-4"
            onPress={() => {
              router.push(`/items/${itemId}/edit`);
              close();
            }}>
            <View className="flex-row items-center  justify-between">
              <View className="flex-row items-center justify-between gap-2">
                <Edit size={18} color="#313091" />
                <P className="font-semibold capitalize">{getText('edit').toLowerCase()}</P>
              </View>
              <ChevronRight className="text-secondary-foreground" />
            </View>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            className="py-4"
            onPress={() => {
              router.push(`/items/${itemId}/variation`);
              close();
            }}>
            <View className="flex-row items-center  justify-between">
              <View className="flex-row items-center justify-between gap-2">
                <Shapes size={18} color="#313091" />
                <P className="font-semibold capitalize">
                  {getText('item_variations').toLowerCase()}
                </P>
              </View>
              <ChevronRight className="text-secondary-foreground" />
            </View>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            className="py-4"
            onPress={() => {
              router.push(`/items/${itemId}/copy`);
              close();
            }}>
            <View className="flex-row items-center  justify-between">
              <View className="flex-row items-center justify-between gap-2">
                <Copy size={18} color="#313091" />
                <P className="font-semibold">{getText('copy')}</P>
              </View>
              <ChevronRight className="text-secondary-foreground" />
            </View>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            className="py-4"
            onPress={() => {
              router.push(`/items/${itemId}/manage-images`);
              close();
            }}>
            <View className="flex-row items-center  justify-between">
              <View className="flex-row items-center justify-between gap-2">
                <Camera size={18} color="#313091" />
                <P className="font-semibold">{getText('manage_images')}</P>
              </View>
              <ChevronRight className="text-secondary-foreground" />
            </View>
          </TouchableOpacity>
          <Separator />
          <DeleteItem itemId={itemId as string} close={close}>
            <TouchableOpacity className="py-4">
              <View className="flex-row items-center justify-between">
                <P className="font-semibold">{getText('delete')}</P>
                <Trash color="red" />
              </View>
            </TouchableOpacity>
          </DeleteItem>
        </BottomSheetView>
        {isweb && (
          <View className="px-4 pb-6">
            <Button onPress={close} variant="destructive">
              <P className="font-semibol text-white">{getText('close')}</P>
            </Button>
          </View>
        )}
      </AppBottomSheet>
    </>
  );
};
