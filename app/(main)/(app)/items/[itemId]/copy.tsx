import { useGetItemDetail } from "@/api/item-api";
import { ItemFormProvider } from "@/forms/item/item-form-provider";
import { ItemFormTab } from "@/forms/item/item-form-tab";
import useI18n from "@/hooks/useI81n";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const CopyItem = () => {
  const params = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending } = useGetItemDetail(params.itemId!);
  const { getText } = useI18n();
  if (isPending)
    return (
      <View className="flex-1 items-center justify-center bg-background text-foreground">
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <ItemFormProvider data={data} copy>
      <View className="flex-1 bg-background md:p-6 p-3">
        <Stack.Screen
          options={{ title: getText("copy"), headerBackTitle: "back" }}
        />
        <ItemFormTab />
      </View>
    </ItemFormProvider>
  );
};

export default CopyItem;
