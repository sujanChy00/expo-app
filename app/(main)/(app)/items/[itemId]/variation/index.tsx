import { useGetItemDetail } from "@/api/item-api";
import { FalllBackMesage } from "@/components/fall-back-message";
import { ItemVariationCard } from "@/components/item-variation/item-variation-card";
import { RefreshingIcon } from "@/components/refreshing-icon";
import { useWindow } from "@/hooks/use-window";
import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl, View } from "react-native";

const ItemVariation = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isXs } = useWindow();
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);

  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);
  return (
    <View className="flex-1 bg-background md:p-6 p-3">
      <RefreshingIcon refreshing={refreshing} />
      <Stack.Screen
        options={{
          title: "Variations",
          headerBackTitle: "back",
        }}
      />
      <FlashList
        ListEmptyComponent={() => {
          if (isPending)
            return (
              <View className="flex-wrap flex-row gap-4 items-center justify-center"></View>
            );

          return (
            <FalllBackMesage
              message="No variations found"
              className="web:h-screen"
            />
          );
        }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().finally(() => setRefreshing(false));
        }}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        data={data?.itemDetails.variations}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          key: numberOfColumns,
        })}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch().finally(() => {
                setRefreshing(false);
              });
            }}
          />
        }
        keyExtractor={(item, index) => item.weight + index + item.price}
        renderItem={({ item }) => (
          <ItemVariationCard itemId={itemId!} variation={item} />
        )}
        className={"flex bg-background"}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default ItemVariation;
