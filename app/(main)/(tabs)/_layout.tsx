import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { MessagesSquare } from 'lucide-react-native';
import React from 'react';
import { Platform, View } from 'react-native';

import { useGetUnSeenCounts } from '@/api/chat-api';
import { UserAvatar } from '@/components/profile/user-avatar';
import { P } from '@/components/ui/typography';
import { screenHeaderShown } from '@/constants/data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUser } from '@/hooks/use-user';
import useI18n from '@/hooks/useI81n';

const TabsLayout = () => {
  const { user } = useUser();
  const { data: unseenCounts } = useGetUnSeenCounts();
  const { colorScheme } = useColorScheme();
  const { getText } = useI18n();
  return (
    <Tabs
      screenOptions={{
        headerShown: screenHeaderShown,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          display: Platform.OS === 'web' ? 'none' : 'flex',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: getText('home'),
          tabBarIcon: ({ color, size }) => <AntDesign name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(orders)"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
          headerShown: false,
          tabBarLabel: getText('orders'),
        }}
      />
      <Tabs.Screen
        name="(items)"
        options={{
          title: getText('items'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: getText('messages'),
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'relative' }}>
              <MessagesSquare size={size} color={color} />
              {!!unseenCounts?.unreadCount && (
                <View
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -5,
                    width: 20,
                    height: 20,
                    backgroundColor: 'green',
                    borderRadius: 9999,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                  }}>
                  <P
                    style={{
                      left: 6,
                      bottom: 0.5,
                      position: 'absolute',
                      color: 'white',
                    }}>
                    {unseenCounts?.unreadCount}
                  </P>
                </View>
              )}
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: getText('profile'),
          tabBarIcon: () => (
            <UserAvatar
              alt={user?.profileDetails.shopAssistantName || 'user'}
              fallBack={user?.profileDetails.shopAssistantName}
              src={user?.profileDetails.shopAssistantPhotoUrl}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
