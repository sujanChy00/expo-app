import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { P } from '../ui/typography';
import { ChatImage } from './chat-image';
import { ChatItems } from './chat-items';
import { ChatText } from './chat-text';

import { IChatMessage } from '@/types/IChat';
import { formatChatDate } from '@/utils/format-chat-date';

interface Props {
  item: IChatMessage;
  thumbnails: string[];
}

export const ChatMessages = ({ item: message, thumbnails }: Props) => {
  const orderedItems = message.item;
  const shouldShowDelete = !message.admin && !message.user;
  const isUser = message.user;
  const isAdmin = message.admin;

  return (
    <View className={message.user || message.admin ? 'items-start' : 'items-end'}>
      <View className="gap-4">
        <ChatText
          isAdmin={isAdmin}
          isUser={isUser}
          messageId={message.id}
          shouldShowDelete={shouldShowDelete}
          message={message.text}
        />
        <ChatImage
          alt={message.text || 'image'}
          src={message.image}
          messageId={message.id}
          shouldShowDelete={shouldShowDelete}
          thumbnails={thumbnails}
        />
        <ChatItems
          orderedItems={orderedItems}
          messageId={message.id}
          shouldShowDelete={shouldShowDelete}
        />
      </View>
      <View className="pb-2">
        <P style={{ fontSize: 10 }}>{formatChatDate(message?.createdAt)}</P>
        {!message?.user && !!message?.seenAt && (
          <View className="flex-row items-center justify-end  gap-2">
            <P className="text-xs">seen</P>
            <Entypo color="green" name="check" />
          </View>
        )}
      </View>
    </View>
  );
};
