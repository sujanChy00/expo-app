import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Check, ChevronRight, Earth } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppBottomSheet } from './app-bottom-sheet';
import { Button } from './ui/button';
import { Text } from './ui/text';
import { P } from './ui/typography';

import { LanguageLists } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import { successToast } from '@/lib/toast';
import { useLanguage } from '@/providers/auth-provider';
import { ILanguageCode } from '@/types';

export const LanguageSheet = () => {
  const ref = useRef<BottomSheet>(null);
  const { setLanguage, language: lan } = useLanguage();
  const [language, setLan] = useState<ILanguageCode | null>(lan);
  const open = () => ref?.current?.snapToIndex(0);
  const close = () => ref?.current?.close();
  const { getText } = useI18n();
  return (
    <>
      <Pressable onPress={open} className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <Earth color="#fff" size={18} />
          </View>
          <P className="text-sm font-semibold">{getText('change_langauge')}</P>
        </View>
        <ChevronRight className="text-muted-foreground" size={18} />
      </Pressable>
      <AppBottomSheet ref={ref} index={-1} snapPoints={['35%']}>
        <BottomSheetView className="flex-1 justify-between bg-background p-4">
          <View>
            {LanguageLists.map((lan) => (
              <Pressable
                key={lan.value}
                className="flex-row items-center justify-between rounded-md py-2"
                onPress={() => setLan(lan.value as ILanguageCode)}>
                <P>{lan.label}</P>
                {lan.value == language && <Check color="green" />}
              </Pressable>
            ))}
          </View>
          <View className="flex-row items-center justify-between gap-2 pb-8">
            <Button className="flex-1" onPress={close} variant="outline">
              <Text>{getText('close')}</Text>
            </Button>
            <Button
              onPress={() => {
                setLanguage(language);
                successToast('Language changed successfully');

                close();
              }}
              className="flex-1">
              <Text>{getText('save')}</Text>
            </Button>
          </View>
        </BottomSheetView>
      </AppBottomSheet>
    </>
  );
};
