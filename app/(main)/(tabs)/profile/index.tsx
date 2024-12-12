import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { BackHandler, ScrollView } from 'react-native';

import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileLinks } from '@/components/profile/profile-links';
import { ShopTable } from '@/components/shop/shop-table';
import { isIOS, isweb } from '@/constants/data';

export type StackNavigation = NavigationProp<Record<['/'][number], undefined>>;

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (navigation && isIOS) {
          navigation.navigate('/');
          return true;
        }
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => backHandler.remove();
    }, [navigation])
  );
  return (
    <ScrollView
      className="flex-1 bg-background text-foreground"
      showsVerticalScrollIndicator={false}>
      <ProfileHeader />
      <ProfileLinks />
      {isweb && <ShopTable />}
    </ScrollView>
  );
};

export default ProfileScreen;
