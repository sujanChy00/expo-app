import { ProfileForm } from "@/forms/profile/profile-form";
import useI18n from "@/hooks/useI81n";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const UpdateProfile = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background xs:p-6 p-3">
      <Stack.Screen
        options={{
          title: getText("update_profile"),
          headerBackTitle: "back",
          presentation: "modal",
        }}
      />
      <ProfileForm goBack />
    </View>
  );
};

export default UpdateProfile;
