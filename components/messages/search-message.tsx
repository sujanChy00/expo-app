import { Stack } from 'expo-router';
import { Search } from 'lucide-react-native';
import React from 'react';
import { Platform, View } from 'react-native';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { screenHeaderShown } from '@/constants/data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import useI18n from '@/hooks/useI81n';

/**
 *
 * @description A React component that provides a search input for messages.
 * The component renders differently based on the platform:
 * - On web platform, it renders an input field with a search button.
 * - On native platforms (iOS, Android), it integrates with the Stack.Screen component
 *   from Expo Router to provide a header with search functionality.
 *
 * @component
 * @param {object} props - The properties object.
 * @param {function} props.setText - Callback function to handle text input changes.
 * @returns {JSX.Element} The rendered SearchMessage component.
 */
export const SearchMessage = ({
  setText,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const { getText } = useI18n();
  if (Platform.OS == 'web')
    return (
      <View className="xs:hidden relative flex-row items-center p-2">
        <Input
          onChangeText={setText}
          placeholder={getText('search_messages')}
          className="h-12 flex-1"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-1/2 -translate-y-1/2">
          <Search />
        </Button>
      </View>
    );
  return (
    <Stack.Screen
      options={{
        headerTitle: getText('messages'),
        headerShown: screenHeaderShown,
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: isDarkColorScheme ? '#000' : '#fff',
        },
        headerTitleStyle: {
          color: isDarkColorScheme ? '#fff' : '#000',
        },
        headerBlurEffect: isDarkColorScheme ? 'dark' : 'regular',
        headerSearchBarOptions: {
          placeholder: getText('search_messages'),
          autoCapitalize: 'none',
          onSearchButtonPress: (e) => setText(e.nativeEvent.text),
          onCancelButtonPress: () => setText(''),
          onChangeText: () => setText(''),
          headerIconColor: isDarkColorScheme ? '#fff' : '#000',
          textColor: isDarkColorScheme ? '#fff' : '#000',
          hintTextColor: isDarkColorScheme ? '#fff' : '#000',
        },
      }}
    />
  );
};
