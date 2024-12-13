import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { PasswordForm } from '@/forms/password-form';
import useI18n from '@/hooks/useI81n';
import AppBack from '@/components/app-back';

const UpdatePassword = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <Stack.Screen
        options={{
          title: getText('change_password'),
          headerBackVisible: false,
          headerLeft: () => {
            return <AppBack />;
          },
        }}
      />
      <PasswordForm />
    </View>
  );
};

export default UpdatePassword;
