import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

import { LANGUAGE_KEY, useLanguage } from '@/providers/auth-provider';
import { ILanguageCode } from '@/types';

export const useLanguageLoader = () => {
  const { setLanguage, language } = useLanguage();

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY).then((lan) => {
      if (lan) {
        setLanguage(lan as ILanguageCode);
      } else {
        setLanguage('en_US');
      }
    });
  }, [language]);
};
