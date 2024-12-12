import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View } from 'react-native';

import { useSendMessage } from '@/actions/chat';
import { useGetUserMessagesById } from '@/api/chat-api';
import { ChatArea } from '@/components/messages/chat-area';
import { MessageActions } from '@/components/messages/message-actions';
import { P } from '@/components/ui/typography';
import { isIOS, screenHeaderShown } from '@/constants/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppBack from '@/components/app-back';

const MessagesDetailsPage = () => {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const { bottom } = useSafeAreaInsets();
  const { mutateAsync: sendMessage, isPending: isSending, variables } = useSendMessage();
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetUserMessagesById(Number(id));

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isPending)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
        <Stack.Screen
          options={{
            headerShown: screenHeaderShown,
            title: 'Loading...',
            headerBackTitle: 'back',
          }}
        />
      </View>
    );

  const messages = data?.pages?.flatMap((item) => item?.content) || [];
  const user = data?.pages[0]?.user;
  const canReply = data?.pages[0]?.canReply;

  return (
    <View className="flex-1 bg-background" style={{ paddingBottom: bottom }}>
      <Stack.Screen
        options={{
          title: user?.name,
          headerBackVisible: false,
          headerLeft: () => {
            return <AppBack />;
          },
        }}
      />
      <KeyboardAvoidingView
        className="flex-1 bg-background p-3"
        keyboardVerticalOffset={isIOS ? 80 : 0}
        behavior={isIOS ? 'padding' : 'height'}>
        <View className="flex-1 pb-5">
          <ChatArea
            isFetchingNextPage={isFetchingNextPage}
            messages={messages}
            onLoadMore={loadMore}
            isSending={isSending}
            variables={variables}
          />
        </View>
        {canReply ? (
          <MessageActions sendMessage={sendMessage} isPending={isSending} />
        ) : (
          <P className="text-center">You can't reply to this user</P>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessagesDetailsPage;
