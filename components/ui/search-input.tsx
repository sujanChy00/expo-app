import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, View, ViewProps } from 'react-native';

import { Search } from '../icons/search-icon';
import { Button } from './button';
import { Input } from './input';

import { isNative, isweb } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { ILanguageTexts } from '@/types/ILanguageTexts';

interface TableSearchProps {
  placeholder: ILanguageTexts;
  className?: string;
  style?: ViewProps['style'];
}

export const SearchInput = ({ className, style, placeholder }: TableSearchProps) => {
  const { getText } = useI18n();
  const router = useRouter();
  const [value, setValue] = useState('');
  const isEmpty = value?.replaceAll(' ', '').length === 0;
  const onSearch = () => {
    if (isEmpty) return;
    router.setParams({ query: value });
    Keyboard.dismiss();
  };
  return (
    <View style={style} className="relative">
      {isNative && <Search className="absolute left-2 top-2.5 z-10 text-muted-foreground" />}
      <Input
        onKeyPress={(e) => {
          const key = e.nativeEvent.key;
          if (key === 'Enter') {
            onSearch();
          }
        }}
        clearButtonMode="while-editing"
        className={cn('native:rounded-full native:pl-10 pr-8', className)}
        inputMode="search"
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (text.length === 0) {
            router.setParams({ query: undefined });
          }
        }}
        returnKeyType="search"
        placeholder={getText(placeholder)}
        enterKeyHint="search"
        onSubmitEditing={onSearch}
      />
      {isweb && (
        <Button
          onPress={onSearch}
          size="icon"
          className="native:rounded-full native:h-10 native:w-10 absolute right-1 top-1/2 z-10 -translate-y-1/2 bg-border web:h-8 web:w-8">
          <Search className="text-gray-600 dark:text-background" />
        </Button>
      )}
    </View>
  );
};
