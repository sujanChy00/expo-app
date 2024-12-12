import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Keyboard, ScrollView, TouchableOpacity, View } from 'react-native';

import { AppBottomSheet } from '../app-bottom-sheet';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { P } from '../ui/typography';

import { useGetOrderById } from '@/api/order-api';
import { isweb } from '@/constants/data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ChatItem } from '@/types/IChat';
import { ITransactionByIdItems } from '@/types/ITransaction';
import { getAvatarName } from '@/utils/get-avatar-name';

type Props = {
  onItemSelect: ({ itemId, item }: { itemId: string; item: Partial<ChatItem> }) => void;
};

type ItemProps = Props & {
  orderedItems?: ITransactionByIdItems[];
  close: () => void;
};

/**
 * @description A React component that renders a modal displaying item options, including thumbnails, names, and prices.
 * It's triggered by a button and allows users to select an item by calling the provided `onItemSelect` callback.
 * The component handles the cases where no items are available or the modal is closed.
 * @typedef {Object} ITransactionByIdItems
 * @property {string} id - Unique identifier for the item.
 * @property {string} thumbnailImage - URL of the item's thumbnail image.
 * @property {string} name - Name of the item.
 * @property {number} price - Price of the item.
 *
 * @typedef {Object} Props
 * @property {function(itemId: string): void} onItemSelect - Callback function called when an item is selected, receiving the selected item's ID.
 * @property {function(open: boolean): void} setShowItemOptions - Callback function to control the visibility of the item options modal.
 * @property {boolean} showItemOptions - Boolean indicating whether the item options modal is currently visible.
 * @property {ITransactionByIdItems[]} [orderedItems] - Array of objects containing information about the ordered items, or null if no items are available.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered item options modal component, or null if `showItemOptions` is false.
 */

export const SelectItems = (props: Props) => {
  const [enabled, setEnabled] = useState(false);
  const { isDarkColorScheme } = useColorScheme();
  const params = useLocalSearchParams<{ orderId?: string }>();
  const { data, isPending } = useGetOrderById({
    id: Number(params.orderId),
    enabled,
  });

  const [opened, setOpened] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const open = () => {
    Keyboard.isVisible() && Keyboard.dismiss();
    bottomSheetRef?.current?.snapToIndex(0);
    setEnabled(true);
  };
  const close = () => bottomSheetRef?.current?.close();

  if (isweb)
    return (
      <Dialog
        open={opened}
        onOpenChange={(o) => {
          setOpened(o);

          if (o) setEnabled(true);
        }}>
        <DialogTrigger asChild>
          <Button
            className="native:h-10 native:w-10 rounded-full web:h-8 web:w-8"
            size="icon"
            variant="secondary">
            <ShoppingBag className="text-accent-foreground" size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Select Item</DialogTitle>
          </DialogHeader>
          <ScrollView className="h-[60vh]">
            <View className="gap-2 p-1">
              {data && (
                <Items {...props} orderedItems={data?.items} close={() => setOpened(false)} />
              )}
            </View>
          </ScrollView>
        </DialogContent>
      </Dialog>
    );

  return (
    <>
      <Button
        className="h-10 w-10 rounded-full base:h-8 base:w-8"
        size="icon"
        variant="secondary"
        onPress={open}>
        <ShoppingBag
          color={isDarkColorScheme ? '#bab6d2' : '#33313f'}
          className="text-accent-foreground"
          size={18}
        />
      </Button>
      <AppBottomSheet snapPoints={['40%', '60%', '80%']} index={-1} ref={bottomSheetRef}>
        <BottomSheetScrollView className="p-3" contentContainerClassName="gap-2 pb-8">
          {isPending && (
            <View className="h-20 items-center justify-center">
              <P>Loading Items...</P>
            </View>
          )}

          {!isPending && data && <Items {...props} orderedItems={data.items} close={close} />}
        </BottomSheetScrollView>
      </AppBottomSheet>
    </>
  );
};

const Items = ({ onItemSelect, close, orderedItems }: ItemProps) => {
  if (!orderedItems || orderedItems.length === 0)
    return (
      <View className="h-32 items-center justify-center">
        <P>No items found</P>
      </View>
    );
  return orderedItems?.map((item, index) => (
    <Card key={item.id + index}>
      <TouchableOpacity
        onPress={() => {
          onItemSelect({
            item: {
              itemId: item.id,
              itemPhotoUrl: item.thumbnailImage,
              itemName: item.name,
              itemPriceBeforeTax: item.price,
            },
            itemId: item.id,
          });
          close();
        }}
        key={item.id + index}
        className="flex-row items-center justify-start gap-2 rounded p-2">
        <Avatar
          style={{ height: 45, width: 45 }}
          alt={item.name}
          className="items-center justify-center bg-muted">
          {item.thumbnailImage ? (
            <AvatarImage source={{ uri: item.thumbnailImage }} />
          ) : (
            <P className="text-foreground">{getAvatarName(item.name)}</P>
          )}
        </Avatar>
        <View className="flex-1 items-start">
          <P className="font-semibold">{item.name}</P>
          <P style={{ fontSize: 13 }} className="text-sm font-semibold">
            ¥{item.totalPriceBeforeTax}
          </P>
          <P style={{ fontSize: 10 }} className="text-sm font-semibold text-destructive">
            ¥{item.price}
            (With Tax)
          </P>
        </View>
      </TouchableOpacity>
    </Card>
  ));
};
