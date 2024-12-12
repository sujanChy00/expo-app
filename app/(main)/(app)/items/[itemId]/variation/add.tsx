import { ItemVariationForm } from "@/forms/item-variation/item-variation-form";
import React from "react";
import { View } from "react-native";

const AddVariation = () => {
  return (
    <View className="flex-1 bg-background md:p-6 p-3">
      <ItemVariationForm />
    </View>
  );
};

export default AddVariation;
