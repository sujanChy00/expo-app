import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { ShopSelector } from '../home/shop-selector';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';
import { ChatCard } from './chat-card';
import { ChatCardSkeleton } from './chat-card-skeleton';

import { useGetMessages } from '@/api/chat-api';
import { isNative } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { generateClassName } from '@/utils/get-styles';

type Props = {
  messagesSize?: number;
  className?: string;
  filterText?: string;
};

/**
 * @description A React component that displays a list of chat messages, providing features for fetching, filtering, searching, and pagination.
 * It integrates with navigation and offers loading states and empty states for user feedback.
 * @typedef {Object} IMessageData
 * @property {number} orderId - Unique identifier of the order associated with the message.
 * @property {string} createdAt - Timestamp indicating when the message was created.
 * @property {string} username - Username of the message sender.
 * // ... other properties related to message content
 *
 * @typedef {Object} Props
 * @property {(orderId: number | null) => void} [setOrderId] - Callback function to set the selected order ID for a specific message thread.
 * @property {number} [orderId] - ID of the currently selected order for which to display messages.
 * @property {number} [messagesSize] - Optional maximum number of messages to display.
 * @property {string} [className] - Additional CSS class names to apply to the component.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered `MessagesList` component.
 */

export const MessagesList = ({ messagesSize, className, filterText }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, hasNextPage, fetchNextPage, refetch, isFetchingNextPage, isPending } =
    useGetMessages({ size: 20 });
  const messages = data ? data.pages.flatMap((chat) => chat.content) : [];
  const { getText } = useI18n();
  if (isPending || refreshing) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Loading...',
            headerBackTitle: 'back',
          }}
        />
        <ChatCardSkeleton />
      </>
    );
  }
  if (!messages || messages.length === 0)
    return (
      <View
        className={cn(
          'flex-1 bg-background p-3',
          generateClassName('items-center justify-center', 'justify-between pb-5'),
          className
        )}>
        <Stack.Screen
          options={{
            title: 'Messages',
          }}
        />
        <View />
        <View className="gap-y-1">
          <P className="text-center text-sm">{getText('no_message_availabe_for_this_shop')}</P>
          <P className="text-center font-semibold">{getText('try_changing_shop')}</P>
        </View>
        {isNative && (
          <ShopSelector
            className="border-border bg-transparent shadow-none"
            style={{ backgroundColor: 'transparent' }}
          />
        )}
      </View>
    );

  const filteredChats = filterText
    ? messages.filter((c) => c.user.name.toLowerCase().includes(filterText.toLowerCase()))
    : messages;

  return (
    <FlashList
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
      }}
      ItemSeparatorComponent={() => <Separator className="flex sm:hidden" />}
      estimatedItemSize={100}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={({ id, createdAt }) => id + createdAt}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      data={messagesSize ? filteredChats.slice(0, messagesSize) : filteredChats}
      ListEmptyComponent={() => <FalllBackMesage message="No messages found !" />}
      renderItem={({ item: message }) => <ChatCard message={message} />}
      ListFooterComponent={() => {
        if (isFetchingNextPage) {
          return (
            <View className="items-center justify-center bg-background py-3">
              <ActivityIndicator />
            </View>
          );
        }
      }}
      ListFooterComponentStyle={{ paddingBottom: 15 }}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
};
