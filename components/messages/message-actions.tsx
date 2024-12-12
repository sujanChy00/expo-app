import { useLocalSearchParams } from 'expo-router';
import { ChevronRight, Send } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FileUpload } from './file-upload';
import { SelectItems } from './select-items';

import { UseMessageInputsAnimation } from '@/hooks/use-message-inputs-animation';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { IMessageInput } from '@/types/IChat';
import { ITransactionById } from '@/types/ITransaction';
import { generateClassName } from '@/utils/get-styles';
import { handleKeyPress } from '@/utils/handle-enter-key-press';

type Props = {
  className?: string;
  sendMessage: (props: IMessageInput) => void;
  isPending?: boolean;
};

/**
 * @description A React component that renders a set of actions for users to interact with a message thread,
 * including sending text messages, attaching images, selecting items, and sending the message.
 * It conditionally displays elements based on the provided `order` prop and its properties.
 * @typedef {Object} ITransactionById
 * @property {boolean} canComment - Indicates whether the user can reply to this message.
 * @property {Object[]} items - Array of objects containing information about the order items (specific properties might vary depending on the implementation).
 *
 * @typedef {Object} Props
 * @property {number} orderId - ID of the order for which the message actions are displayed.
 * @property {ITransactionById} [order] - Data associated with the order, including information required for sending messages like `orderId` and `canComment`.
 * @property {string} [className] - Additional CSS class names to apply to the component.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered message actions component.
 */

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const MessageActions = ({ className, sendMessage, isPending }: Props) => {
  const params = useLocalSearchParams<{ orderId?: string; id: string }>();
  const { getText } = useI18n();
  const {
    buttonViewStyle,
    expandButtonStyle,
    expandItems,
    collapseItems,
    message,
    setMessage,
    isMessageEmpty,
    setIsExpanded,
  } = UseMessageInputsAnimation();

  const handleSendMessage = () => {
    sendMessage({ text: message, userId: Number(params.id) });
    setMessage('');
  };

  return (
    <View
      className={cn(
        'relative z-20 flex-row items-center justify-between gap-x-2 bg-background',
        generateClassName(
          'fixed bottom-0 left-0 w-full border-t border-t-border px-2 py-3 xs:static',
          'pt-2'
        ),
        className
      )}>
      <ATouchableOpacity style={expandButtonStyle}>
        <Button
          onPress={expandItems}
          className="h-10 w-10 rounded-full"
          size="icon"
          variant="outline">
          <ChevronRight className="text-accent-foreground" />
        </Button>
      </ATouchableOpacity>
      <Animated.View className="flex-row items-center gap-x-2" style={buttonViewStyle}>
        <FileUpload sendFile={(image) => sendMessage({ userId: Number(params.id), image })} />
        {!!params?.orderId && (
          <SelectItems
            onItemSelect={({ item, itemId }) =>
              sendMessage({ userId: Number(params.id), itemId, item })
            }
          />
        )}
      </Animated.View>
      <View className="flex-1 flex-row items-center gap-2">
        <Input
          className="flex-1 rounded-full pr-10 xs:pr-0"
          value={message}
          inputMode="text"
          multiline
          onFocus={() => {
            if (!isMessageEmpty) collapseItems();
          }}
          onBlur={() => {
            expandItems();
            setIsExpanded(false);
          }}
          onKeyPress={(e) => handleKeyPress(e, handleSendMessage)}
          onChangeText={(text) => {
            setMessage(text);
            if (text.replaceAll(' ', '').length > 0) {
              collapseItems();
            } else {
              expandItems();
            }
          }}
          placeholder={getText('enter_your_message')}
        />
        <Button
          disabled={isPending || isMessageEmpty}
          onPress={handleSendMessage}
          className="native:absolute native:top-1 native:right-1 z-20 rounded-full web:cursor-pointer web:bg-primary"
          size="icon">
          <Send size={20} color="#fff" />
        </Button>
      </View>
    </View>
  );
};
