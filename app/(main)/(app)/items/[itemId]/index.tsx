import { useGetItemDetail } from "@/api/item-api";
import { FalllBackMesage } from "@/components/fall-back-message";
import { ChevronLeft } from "@/components/icons/chevron-left";
import { Copy } from "@/components/icons/copy-icon";
import { Pencil } from "@/components/icons/pencil-icon";
import { Trash } from "@/components/icons/trash-icon";
import { ItemVariationTable } from "@/components/item-variation/item-variation-table";
import { DeleteItem } from "@/components/item/delete-item";
import { ItemDetailsTabList } from "@/components/item/item-details-tab-list";
import { ItemImages } from "@/components/item/item-images";
import { ItemOptions } from "@/components/item/item-options";
import { ItemOtherDetails } from "@/components/item/item-other-details";
import { ItemPriceDetails } from "@/components/item/item-price-details";
import { ItemTabContentByLan } from "@/components/item/item-tab-content-by-lan";
import { ParallaxScrollView } from "@/components/parallax-scroll-view";
import {
  AnimatedTab,
  AnimatedTabContentWrapper,
} from "@/components/ui/animated-tab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";
import { isNative, isweb } from "@/constants/data";
import { transFormItemDetails } from "@/data/item/get-items-details";
import useI18n from "@/hooks/useI81n";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ItemDetails = () => {
  const { top } = useSafeAreaInsets();
  const { back } = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { getText } = useI18n();
  const { data, isPending, refetch } = useGetItemDetail(itemId as string);
  const { itemDescription, itemDetails, itemVariations } =
    transFormItemDetails(data);

  useRefreshOnFocus(refetch);

  if (isPending || refreshing) {
    return (
      <View className="flex-1 items-center bg-background text-foreground justify-center">
        <ActivityIndicator size="large" />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
      </View>
    );
  }

  if (!data)
    return (
      <>
        <FalllBackMesage message="Item not found" />
        <Stack.Screen
          options={{
            title: "Oops!",
            headerBackTitle: "back",
          }}
        />
      </>
    );
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {isNative && (
        <View
          className="flex-row items-center justify-between absolute left-0 w-full p-3 z-20"
          style={{
            top: 0,
            paddingTop: top,
          }}
        >
          <Button
            style={{
              shadowColor: "rgba(0,0,0,0.5)",
              elevation: 5,
              shadowOffset: {
                height: 0,
                width: 0,
              },
              shadowRadius: 20,
            }}
            onPress={back}
            variant={"secondary"}
            size={"icon"}
            className="rounded-full"
          >
            <ChevronLeft className="text-secondary-foreground" />
          </Button>
          <ItemOptions />
        </View>
      )}
      <View className="flex-1 bg-background">
        <ParallaxScrollView
          imageHeight={300}
          uri={data.itemImages.images}
          backGroundImageClassName="web:hidden"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch().finally(() => setRefreshing(false));
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          className="bg-background flex-1 text-foreground"
        >
          {isweb && (
            <View className="flex-row xs:p-6 p-3 items-center justify-between gap-3 md:flex hidden">
              <H3>{getText("item_information")}</H3>
              <View className="flex-row items-center gap-3">
                <Link asChild href={`/items/${itemId}/copy`}>
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    className="rounded-lg flex-row items-center gap-1.5"
                  >
                    <Copy size={17} className="text-primary" />
                    <P className="uppercase text-primary">{getText("copy")}</P>
                  </Button>
                </Link>
                <Link asChild href={`/items/${itemId}/edit`}>
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    className="rounded-lg flex-row items-center gap-1.5"
                  >
                    <Pencil size={17} className="text-primary" />
                    <P className="uppercase text-primary">{getText("edit")}</P>
                  </Button>
                </Link>
                <DeleteItem itemId={itemId} close={back}>
                  <Button
                    variant={"destructive"}
                    size={"sm"}
                    className="rounded-lg flex-row items-center gap-1.5"
                  >
                    <Trash size={17} color={"#fff"} />
                    <P className="uppercase text-white">{getText("delete")}</P>
                  </Button>
                </DeleteItem>
              </View>
            </View>
          )}
          <View className="web:md:flex-row web:md:items-start gap-5 bg-background pb-8">
            {isweb && <ItemImages itemId={itemId as string} data={data} />}
            <View className="xs:gap-y-6 gap-y-4 sm:w-auto w-full sm:flex-1">
              <AnimatedTab numberOfTabs={4}>
                <ItemDetailsTabList />
                <AnimatedTabContentWrapper>
                  {itemDescription?.map((item) => (
                    <ItemTabContentByLan item={item} key={item.language}>
                      <Card className="shadow-none grid md:grid-cols-2 web:md:gap-x-3 web:md:divide-x divide-border">
                        <ItemPriceDetails data={itemDetails} />
                        <ItemOtherDetails data={data} />
                      </Card>
                    </ItemTabContentByLan>
                  ))}
                </AnimatedTabContentWrapper>
              </AnimatedTab>
            </View>
          </View>
          {isweb && <ItemVariationTable variations={itemVariations} />}
        </ParallaxScrollView>
      </View>
    </>
  );
};

export default ItemDetails;
