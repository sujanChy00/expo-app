import React from 'react';
import { View } from 'react-native';

import { StackScreen } from '@/components/layout/screen-stack';
import { ThemeToggle } from '@/components/theme-toggler';
import useI18n from '@/hooks/useI81n';

const ProfileLayout = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <StackScreen
        options={{
          headerTitle: getText('profile'),
          headerRight: () => <ThemeToggle />,
        }}
      />
    </View>
  );
};

export default ProfileLayout;
