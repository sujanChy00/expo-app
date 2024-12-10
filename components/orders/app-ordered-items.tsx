import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { Avatar, AvatarImage } from '../ui/avatar';
import { CardHeader } from '../ui/card';
import { P } from '../ui/typography';

import { ITransactionByIdItems } from '@/types/ITransaction';
import { getAvatarName } from '@/utils/get-avatar-name';

const imageExtensions = ['png', 'jpg', 'jpeg'];

/**
 *
 * @description A React component that represents an ordered item card with details such as
 * name, thumbnail image or avatar, weight, quantity, and price. It provides
 * an interface for viewing detailed information of the item on press.
 *
 * @component
 * @param {object} props - The properties object.
 * @param {ITransactionByIdItems} props.items - The transaction item details.
 * @returns {JSX.Element} The rendered AppOrderedItems component.
 */
export const AppOrderedItems = ({
  items,
  className,
}: {
  items: ITransactionByIdItems;
  className?: string;
}) => {
  const router = useRouter();
  const isValidImage =
    !!items.thumbnailImage &&
    imageExtensions.includes(items.thumbnailImage.split('.').pop() as string);
  return (
    <TouchableOpacity onPress={() => router.push(`/items/${items.id}`)} className={className}>
      <View className="flex-1 p-1">
        <CardHeader className="flex-row items-center gap-x-2 p-1.5">
          <Avatar
            alt={items.name}
            className="items-center justify-center bg-muted"
            style={{ height: 50, width: 50, borderRadius: 5 }}>
            {isValidImage && <AvatarImage source={{ uri: items.thumbnailImage }} />}
            {!isValidImage && <P className="text-white">{getAvatarName(items.name)}</P>}
          </Avatar>
          <View className="flex-1">
            <P className="font-semibold uppercase">{items?.name}</P>
            <P style={{ fontSize: 12 }} className="text-sm">
              {items.weight}
            </P>
          </View>
          <View className="flex-row gap-x-2">
            <P className="font-medium" style={{ fontSize: 16, color: 'red' }}>
              x{items.quantity}
            </P>
            <P className="font-semibold">¥{items.price}</P>
          </View>
        </CardHeader>
      </View>
    </TouchableOpacity>
  );
};
