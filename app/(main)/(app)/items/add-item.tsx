import { ItemFormProvider } from "@/forms/item/item-form-provider";
import { ItemFormTab } from "@/forms/item/item-form-tab";
import useI18n from "@/hooks/useI81n";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const AddItem = () => {
  const { getText } = useI18n();
  return (
    <>
      <Stack.Screen
        options={{
          title: getText("add_item"),
          headerBackTitle: "back",
        }}
      />
      <ItemFormProvider>
        <View className="flex-1 bg-background md:p-6 p-3">
          <ItemFormTab />
        </View>
      </ItemFormProvider>
    </>
  );
};

export default AddItem;
