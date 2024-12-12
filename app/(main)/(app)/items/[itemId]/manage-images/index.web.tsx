import { useGetItemDetail } from "@/api/item-api";
import { FalllBackMesage } from "@/components/fall-back-message";
import { WebThumbnailManager } from "@/components/item/thumbnail/manager/web-thumbnail-manager";
import { ThumbnailProvider } from "@/components/item/thumbnail/thumbnail-provider";
import useI18n from "@/hooks/useI81n";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const MangeImagesWeb = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending } = useGetItemDetail(itemId as string);
  const { getText } = useI18n();

  if (isPending)
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );

  if (!data)
    return <FalllBackMesage message={getText("something_went_wrong")} />;
  return (
    <View className="flex-1 bg-background">
      <ThumbnailProvider data={data}>
        <WebThumbnailManager />
      </ThumbnailProvider>
    </View>
  );
};

export default MangeImagesWeb;
