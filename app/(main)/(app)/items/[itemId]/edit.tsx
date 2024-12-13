import { useGetItemDetail } from '@/api/item-api';
import { ItemFormProvider } from '@/forms/item/item-form-provider';
import { ItemFormTab } from '@/forms/item/item-form-tab';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

const EditItem = () => {
  const params = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending } = useGetItemDetail(params.itemId);

  if (isPending)
    return (
      <View className="flex-1 items-center justify-center bg-background text-foreground">
        <ActivityIndicator size={'large'} />
        <Stack.Screen options={{ title: 'Edit Item', headerBackTitle: 'back' }} />
      </View>
    );

  return (
    <ItemFormProvider data={data}>
      <View className="flex-1 bg-background p-3 md:p-6">
        <Stack.Screen
          options={{
            title: data?.itemDescription[0].itemName,
            headerBackTitle: 'back',
          }}
        />
        <ItemFormTab editMode />
      </View>
    </ItemFormProvider>
  );
};

export default EditItem;
