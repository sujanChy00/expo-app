import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useSendMessage } from '@/actions/chat';
import { useGetUserMessagesById } from '@/api/chat-api';
import { ChatArea } from '@/components/messages/chat-area';
import { ChatDetailsHeader } from '@/components/messages/chat-details-header';
import { MessageActions } from '@/components/messages/message-actions';
import { P } from '@/components/ui/typography';

const ChatDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isPending } =
    useGetUserMessagesById(Number(id));
  const { mutateAsync: sendMessage, isPending: isSending, variables } = useSendMessage();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isPending)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );

  const messages = data ? data.pages.flatMap((chat) => chat.content) : [];
  const user = data?.pages[0]?.user;
  const canReply = data?.pages[0]?.canReply;

  return (
    <View className="flex-1 bg-background">
      <ChatDetailsHeader isPending={isPending} userId={Number(id)} userName={user?.name} />
      <View className="flex-1 p-3 md:p-6">
        <ChatArea
          messages={messages}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={loadMore}
          isSending={isSending}
          variables={variables}
          hasNextPage={hasNextPage}
        />
      </View>
      {canReply ? (
        <MessageActions sendMessage={sendMessage} isPending={isSending} />
      ) : (
        <View className="items-center p-2">
          <P>You can't reply to this user</P>
        </View>
      )}
    </View>
  );
};

export default ChatDetails;
