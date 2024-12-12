import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useUpdateShopLegalInfo } from '@/actions/shop';
import { useGetShopDetails } from '@/api/shop-api';
import { PenSquare } from '@/components/icons/pen-square';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/ui/editor';
import { Text } from '@/components/ui/text';
import { H3 } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';

const ShopLegalInfo = () => {
  const { getText } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending: isLoadingShopInfo } = useGetShopDetails(id);
  const { mutateAsync: updateShopInfo, isPending } = useUpdateShopLegalInfo();
  const [editorValue, setEditorValue] = React.useState<string>(data?.shopInfo || '');
  const router = useRouter();

  const onUpdate = async () => {
    await updateShopInfo({ body: editorValue, shopId: Number(id) });
  };

  if (isLoadingShopInfo)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <View className="hidden flex-row items-center gap-2 pb-5 xs:flex">
        <H3>{getText('edit_shop_legal_info')}</H3>
        <PenSquare className="text-blue-600" />
      </View>
      <View className="mdEditor w-full">
        <RichTextEditor value={editorValue} onChange={setEditorValue} />
      </View>
      <View className="flex-row items-center justify-end gap-2 pt-8">
        <Button disabled={isPending} onPress={() => router.back()} variant="outline">
          <Text className="font-semibold">{getText('cancel')}</Text>
        </Button>
        <Button
          onPress={onUpdate}
          disabled={isPending || editorValue.replaceAll(' ', '').length === 0}
          className="flex-row items-center gap-1">
          {isPending && <ActivityIndicator size="small" />}
          <Text className="font-semibold">{getText('save')}</Text>
        </Button>
      </View>
    </View>
  );
};

export default ShopLegalInfo;
