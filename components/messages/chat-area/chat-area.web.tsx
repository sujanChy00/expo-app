import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ChatMessages } from '../chat-messages';
import { MessagePendingStates } from '../message-pending-states';
import { ChatAreaProps } from './chat-area';

import { IChatMessage } from '@/types/IChat';

export const ChatArea = ({
  isFetchingNextPage,
  messages,
  onLoadMore,
  className,
  footerComponent,
  isSending,
  variables,
  hasNextPage,
}: ChatAreaProps) => {
  const ref = useRef<FlashList<IChatMessage>>(null);
  const thumbnails =
    messages
      ?.map((c) => !!c.image && c.image)
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0) || [];

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollToEnd({
        animated: true,
      });
    }
  };
  useEffect(() => {
    scrollToTop();
  }, [variables]);

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <FlashList
      ref={ref}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      data={messages.toReversed()}
      onScroll={(e) => {
        const offsetTop = e.nativeEvent.contentOffset.y;
        if (offsetTop <= 10) {
          onLoadMore();
          if (hasNextPage) {
            ref.current?.scrollToOffset({
              offset: 10,
              animated: false,
            });
          }
        }
      }}
      showsVerticalScrollIndicator={false}
      className={className}
      renderItem={({ item }) => <ChatMessages item={item} thumbnails={thumbnails} />}
      keyExtractor={({ id }) => id.toString()}
      estimatedItemSize={100}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() => {
        return (
          <View className="pb-20 xs:pb-0">
            {isSending && <MessagePendingStates variables={variables} />}
          </View>
        );
      }}
      ListHeaderComponent={() => {
        return (
          <View>
            {isFetchingNextPage && (
              <View className="self-center py-5">
                <ActivityIndicator size="small" />
              </View>
            )}

            {footerComponent}
          </View>
        );
      }}
    />
  );
};
