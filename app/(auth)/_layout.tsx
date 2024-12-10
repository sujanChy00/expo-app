import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { StackScreen } from '@/components/layout/screen-stack';
import { useUser } from '@/hooks/use-user';
import { useNotAuthenticated } from '@/hooks/useAuth';
import { useLoading } from '@/providers/auth-provider';

const AuthLayout = () => {
  const { loading } = useLoading();
  const { user } = useUser();
  useNotAuthenticated();

  if (loading || (user && !user.profileDetails.shopAssistantPasswordExpired))
    return (
      <View className="bg-background flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return <StackScreen />;
};

export default AuthLayout;
