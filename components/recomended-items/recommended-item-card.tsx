import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

import { AppImage } from '../app-image';
import { Avatar } from '../ui/avatar';
import { Card } from '../ui/card';
import { P } from '../ui/typography';
import { ToggleRecommendedItem } from './toggle-recommended-item';

import useI18n from '@/hooks/useI81n';
import { RecommendedItems } from '@/types/Ihome';
import { getAvatarName } from '@/utils/get-avatar-name';

/**
 * @description A React component to display a recommended item card.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {RecommendedItems} props.item - The recommended item object.
 * @returns {JSX.Element} The rendered RecommendedItemCard component.
 */
export const RecommendedItemCard = ({ item }: { item: RecommendedItems }) => {
  const router = useRouter();
  const { getText } = useI18n();

  return (
    <Card className="flex-1 flex-row items-end justify-between p-2">
      <TouchableOpacity
        onPress={() => router.push(`/items/${item.itemId}`)}
        className="flex flex-1 flex-row items-center gap-2">
        <Avatar
          alt={item.itemName || ''}
          className="items-center justify-center bg-muted"
          style={{ height: 50, width: 50, borderRadius: 5 }}>
          {item.itemPhotoUrl ? (
            <AppImage
              style={{ height: '100%', width: '100%' }}
              uri={item.itemPhotoUrl}
              alt={item.itemName || ''}
            />
          ) : (
            <P>{getAvatarName(item.itemName)}</P>
          )}
        </Avatar>
        <View className="flex-1">
          {!!item.itemName && (
            <P className="text-sm font-semibold" style={{ fontSize: 13 }}>
              {item.itemName.toUpperCase()}
            </P>
          )}
          <View>
            <P className="text-sm font-semibold">¥{item.beforeTaxPrice}</P>
            <P className="text-sm font-semibold" style={{ fontSize: 10 }}>
              ¥{item.itemPrice}
              {getText('with_tax')}
            </P>
          </View>
        </View>
      </TouchableOpacity>
      <ToggleRecommendedItem itemId={item.itemId as string} recommended />
    </Card>
  );
};
