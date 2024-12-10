import { useRouter } from 'expo-router';
import { Image, Pressable } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

// import { AppImage } from '../app-image';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { P } from '../ui/typography';
import { DeleteMessage } from './delete-message';

import { cn } from '@/lib/utils';
import { ChatItem } from '@/types/IChat';
import { ITransactionByIdItems } from '@/types/ITransaction';

type IchatItemProps = {
  orderedItems?: Partial<ChatItem>;
  messageId: number;
  shouldShowDelete: boolean;
  className?: string;
};

/**
 * @description A React component that renders information about items included in a chat message,
 * displaying their thumbnail, name, price, and optionally a delete button.
 * @typedef {Object} ITransactionByIdItems
 * @property {string} thumbnailImage - URL of the item's thumbnail image.
 * @property {string} name - Name of the item.
 * @property {number} price - Price of the item.
 *
 * @typedef {Object} Props
 * @property {ITransactionByIdItems | null} orderedItems - Data for the ordered items associated with the message, or null if not available.
 * @property {number} messageId - The message ID associated with the items, potentially used for deletion or other interactions.
 * @property {boolean} shouldShowDelete - Whether the delete button should be displayed for the items.
 * @property {string} [className] - Additional CSS class names to apply to the component.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered chat items component, or null if no ordered items data is provided.
 */
export const ChatItems = ({
  orderedItems,
  messageId,
  shouldShowDelete,
  className,
}: IchatItemProps) => {
  const router = useRouter();
  if (!orderedItems) return null;

  return (
    <Animated.View entering={FadeIn} className={cn('flex-row items-center gap-2', className)}>
      <DeleteMessage messageId={messageId} showDelete={shouldShowDelete} />
      <Pressable onPress={() => router.push(`/items/${orderedItems.itemId}`)}>
        <Card className="relative items-center gap-y-1 p-1 shadow-none">
          <Image
            style={{ height: 50, width: 50, borderRadius: 10 }}
            source={{
              uri: orderedItems.itemPhotoUrl,
            }}
            alt={orderedItems?.itemName || 'item name'}
          />
          <Badge variant="destructive" className="absolute -top-1 right-0 z-10 rounded-md p-0.5">
            <P className="text-xs font-semibold" style={{ color: 'white' }}>
              ¥ {orderedItems.itemPriceBeforeTax}
            </P>
          </Badge>
          <P className="w-24 text-center text-xs font-semibold">
            {!!orderedItems?.itemName && orderedItems?.itemName.toUpperCase()}
          </P>
        </Card>
      </Pressable>
    </Animated.View>
  );
};
