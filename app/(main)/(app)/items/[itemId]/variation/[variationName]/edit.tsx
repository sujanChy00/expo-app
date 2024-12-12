import { useGetItemDetail } from "@/api/item-api";
import { ItemVariationForm } from "@/forms/item-variation/item-variation-form";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const EditVariation = () => {
  const { itemId, variationName } = useLocalSearchParams<{
    itemId: string;
    variationName?: string;
  }>();
  const { data, isPending } = useGetItemDetail(itemId);

  const variation = data?.itemDetails.variations.find(
    (variation) =>
      variation.name.replaceAll(" ", "") === variationName?.replaceAll(" ", "")
  );

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-background md:p-6 p-3">
      <ItemVariationForm data={variation} />
    </View>
  );
};

export default EditVariation;
