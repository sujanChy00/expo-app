import { useGlobalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Avatar } from '../ui/avatar';
import { P } from '../ui/typography';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IChat } from '@/types/IChat';
import { formatChatDate } from '@/utils/format-chat-date';
import { getAvatarName } from '@/utils/get-avatar-name';
import { generateClassName } from '@/utils/get-styles';
import { truncateString } from '@/utils/tuncate-string';

type Props = {
  message: IChat;
};

/**
 * @description A React component that renders a chat card displaying sender avatar,
 * message snippet, sender name, timestamp, and highlighting the selected message.
 * Clicking the card navigates to the corresponding order chat, unless `setOrderId`
 * is provided, in which case it calls the function with the message's order ID.
 * @typedef {Object} IChat
 * @property {number} orderId - The order ID associated with the chat message.
 * @property {string} message - The content of the chat message.
 * @property {string} username - The username of the sender.
 * @property {string} sentBy - The sender of the chat message ("user", "shop", or "admin").
 * @property {boolean} seen - Whether the message has been seen by the recipient.
 * @property {string} createdAt - The timestamp of the chat message creation.
 *
 * @typedef {Object} Props
 * @property {number} [orderId] - The currently selected order ID (used for highlighting the corresponding message).
 * @property {IChat} message - The chat message data.
 * @property {(orderId: number) => void} [setOrderId] (optional) - A function to set the selected order ID (if provided, clicking the card triggers this function instead of navigation).
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered chat card component.
 */
export const ChatCard = ({ message }: Props) => {
  const { id: orderId } = useGlobalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getText } = useI18n();
  return (
    <TouchableOpacity
      onPress={() => {
        // isweb
        //   ? router.push(`/chat/${message.user.id}`)
        //   : router.push(`/messages/${message.user.id}`);
        router.push(`/messages/${message.user.id}`);
      }}
      className={cn(
        'xs:w-auto w-full flex-row items-end justify-between gap-3 p-2 web:hover:bg-gray-200/50 web:dark:hover:bg-zinc-950',
        'xs:w-auto web:xs:rounded-none w-full flex-row items-end justify-between gap-3 p-2 web:rounded-md web:hover:bg-gray-200/50 web:sm:rounded-md web:dark:hover:bg-zinc-950',
        orderId == String(message.user.id) && 'web:bg-gray-200/50 web:dark:bg-zinc-950'
      )}>
      <View className="flex-row items-center gap-3">
        <Avatar
          alt={message.sender}
          className={cn(
            'border-border items-center justify-center border',
            generateClassName('h-10 w-10', 'h-12 w-12')
          )}>
          <P>{getAvatarName(message.user.name)}</P>
        </Avatar>
        <View className={generateClassName('xs:hidden flex sm:flex', 'gap-1')}>
          <P
            className={cn(
              'base:font-normal font-medium capitalize',
              generateClassName('text-sm', 'text-base'),
              !message.seenAt && message.sender == 'user' ? 'font-semibold' : 'font-normal '
            )}>
            {truncateString(message.user.name, 20)}
          </P>
          <P
            className={cn(
              'text-xs',
              !message.seenAt && message.sender == 'user'
                ? 'font-semibold'
                : 'font-normal text-gray-700'
            )}>
            {message.sender === 'shop'
              ? getText('you') + ':'
              : message.sender === 'admin' && 'Admin: '}
            {truncateString(message.message, 20)}
          </P>
        </View>
      </View>
      <View className="items-end">
        {!message.seenAt && message.sender == 'user' && (
          <View className="h-4 w-4 rounded-full bg-blue-700" />
        )}
        <P
          className={generateClassName(
            'hidden',
            'right-4 flex text-xs font-semibold italic text-gray-600'
          )}>
          {formatChatDate(message.createdAt)}
        </P>
      </View>
    </TouchableOpacity>
  );
};
