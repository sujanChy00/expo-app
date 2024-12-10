import { FlashList } from '@shopify/flash-list';
import React, { useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ChatMessages } from '../chat-messages';
import { MessagePendingStates } from '../message-pending-states';

import { MessagesSquare } from '@/components/icons/message-square-icon';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { IChatMessage, IMessageInput } from '@/types/IChat';

export type ChatAreaProps = {
  messages: IChatMessage[];
  className?: string;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  footerComponent?: React.ReactNode;
  isSending?: boolean;
  variables?: IMessageInput;
  hasNextPage?: boolean;
};

export const ChatArea = ({
  messages,
  className,
  isFetchingNextPage,
  onLoadMore,
  footerComponent,
  isSending,
  variables,
}: ChatAreaProps) => {
  const { getText } = useI18n();
  const ref = useRef<FlashList<IChatMessage>>(null);
  const thumbnails =
    messages
      ?.map((c) => !!c.image && c.image)
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0) || [];

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  };

  // useEffect(() => {
  //   scrollToTop();
  // }, [variables]);

  // useEffect(() => {
  //   scrollToTop();
  // }, []);

  return (
    <FlashList
      ref={ref}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      data={messages}
      showsVerticalScrollIndicator={false}
      className={className}
      renderItem={({ item }) => <ChatMessages item={item} thumbnails={thumbnails} />}
      keyExtractor={({ id }) => id.toString()}
      inverted
      estimatedItemSize={100}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={() => (
        <View className="flex-1 items-center justify-center gap-2 bg-background">
          <MessagesSquare className="text-foreground" size={40} />
          <P>{getText('send_message')}</P>
        </View>
      )}
      onEndReached={onLoadMore}
      ListHeaderComponent={() => {
        if (isSending) return <MessagePendingStates variables={variables} />;
      }}
      ListFooterComponent={() => {
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
