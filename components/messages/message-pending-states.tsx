import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { P } from '../ui/typography';
import { ChatImage } from './chat-image';
import { ChatItems } from './chat-items';
import { ChatText } from './chat-text';

import { ChatItem, IMessageInput } from '@/types/IChat';

type Props = {
  variables?: IMessageInput;
};

export const MessagePendingStates = ({ variables }: Props) => {
  return (
    <View className="flex-row justify-end">
      <View>
        <View className="items-end gap-y-2">
          <SendingMessage message={variables?.text} />
          <SendingImage src={variables?.image as File} />
          <SendingItems item={variables?.item} />
        </View>
        <P className="text-xs text-gray-600">sending...</P>
      </View>
    </View>
  );
};

const SendingMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <View className="animate-pulse items-end gap-y-0.5 opacity-60">
      <ChatText
        isUser={false}
        isAdmin={false}
        message={message}
        messageId={1}
        shouldShowDelete={false}
        className="rounded-br-none "
      />
    </View>
  );
};

const SendingImage = ({ src }: { src?: File | string }) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (typeof src !== 'string') {
      const fileReader = new FileReader();
      fileReader.onload = () => setImage(fileReader.result as string);
      src && fileReader.readAsDataURL(src);
    } else {
      setImage(src);
    }
  }, [src]);
  if (!src) return null;
  return (
    <View className="animate-pulse items-end opacity-60">
      <ChatImage alt="message image" messageId={1} shouldShowDelete={false} src={image} />
    </View>
  );
};

const SendingItems = ({ item }: { item?: Partial<ChatItem> }) => {
  return (
    <View className="animate-pulse items-end gap-y-0.5 opacity-60">
      <ChatItems messageId={1} orderedItems={item} shouldShowDelete={false} />
    </View>
  );
};
