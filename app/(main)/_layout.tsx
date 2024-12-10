import { Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { StackScreen } from '@/components/layout/screen-stack';
import { useUser } from '@/hooks/use-user';
import { useAuthenticated } from '@/hooks/useAuth';
import { useLoading } from '@/providers/auth-provider';

const MainLayout = () => {
  const { loading } = useLoading();
  const { user } = useUser();
  useAuthenticated();

  if (loading || !user)
    return (
      <View className="bg-background flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <StackScreen>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </StackScreen>
  );
};

export default MainLayout;
