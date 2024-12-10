import React from 'react';
import { View } from 'react-native';

import { Search } from '../icons/search-icon';
import { Input } from '../ui/input';

import useI18n from '@/hooks/useI81n';

interface Props {
  setText: (text: string) => void;
  className?: string;
}

/**
 *
 * @description A React component that provides a search input for messages.
 * This component includes an input field and a search icon.
 *
 * @component
 * @param {object} props - The properties object.
 * @param {function} props.setText - Callback function to handle text input changes.
 * @returns {JSX.Element} The rendered MessageSearchInput component.
 */
export const MessageSearchInput = ({ setText, className }: Props) => {
  const { getText } = useI18n();
  return (
    <View className={className}>
      <Input
        autoCapitalize="none"
        placeholder={getText('search')}
        className="pl-8"
        onChangeText={setText}
      />
      <Search className="absolute left-2 top-2 text-gray-700" />
    </View>
  );
};
