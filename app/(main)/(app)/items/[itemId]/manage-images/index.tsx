import { useGetItemDetail } from "@/api/item-api";
import { FalllBackMesage } from "@/components/fall-back-message";
import { AppThumbnailManager } from "@/components/item/thumbnail/manager/app-thumbnail-manager";
import { ThumbnailProvider } from "@/components/item/thumbnail/thumbnail-provider";
import useI18n from "@/hooks/useI81n";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const ManageImages = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);
  const { getText } = useI18n();

  if (isPending)
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" />
        <Stack.Screen
          options={{
            title: getText("Loading"),
          }}
        />
      </View>
    );

  if (!data)
    return (
      <>
        <Stack.Screen
          options={{
            title: "Oops!",
          }}
        />
        <FalllBackMesage message={getText("something_went_wrong")} />
      </>
    );

  return (
    <View className="flex-1 bg-background ">
      <ThumbnailProvider data={data} refetch={refetch}>
        <AppThumbnailManager />
      </ThumbnailProvider>
    </View>
  );
};

export default ManageImages;
