import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Badge } from '../ui/badge';
import { P } from '../ui/typography';
import { DeleteMessage } from './delete-message';

import { cn } from '@/lib/utils';

type Props = {
  message?: string;
  className?: string;
  isAdmin: boolean;
  messageId: number;
  shouldShowDelete: boolean;
  isUser: boolean;
};

/**
 * @description A React component that renders a chat message bubble with text content, styled differently for admin and user messages. It optionally displays an "admin" badge and a delete button.
 * @typedef {Object} Props
 * @property {string} [message] - The text content of the chat message. If not provided, the component doesn't render.
 * @property {string} [className] - Additional CSS class names to apply to the component.
 * @property {boolean} isAdmin - Whether the message was sent by an admin.
 * @property {number} messageId - The message ID associated with the text, potentially used for deletion or other interactions.
 * @property {boolean} shouldShowDelete - Whether the delete button should be displayed for the text.
 * @property {boolean} isUser - Whether the message was sent by the user.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered chat text component, or null if no message is provided.
 */

export const ChatText = ({
  message,
  className,
  isAdmin,
  messageId,
  shouldShowDelete,
  isUser,
}: Props) => {
  if (!message) return null;
  return (
    <Animated.View entering={FadeIn} className="flex-row items-center gap-2">
      <DeleteMessage showDelete={shouldShowDelete} messageId={messageId} />
      <View
        className={cn(
          'relative z-30 rounded-2xl p-1.5',
          isUser || isAdmin ? 'rounded-bl-none bg-emerald-600' : 'rounded-br-none bg-blue-500',
          className
        )}>
        <P
          numberOfLines={10}
          className="text-sm text-white"
          style={{ flex: 0.6, width: 'auto', maxWidth: 350 }}>
          {message}
        </P>
        {isAdmin && (
          <Badge variant="destructive" className="absolute -right-2 -top-3 z-10 rounded-md p-0.5">
            <P className="text-xs font-semibold text-white">Admin</P>
          </Badge>
        )}
      </View>
    </Animated.View>
  );
};
