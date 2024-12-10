import languageData from '@/constants/Language';
import { useLanguage } from '@/providers/auth-provider';
import { ILanguageTexts } from '@/types/ILanguageTexts';

interface getTextParams {
  key: ILanguageTexts;
  defaultText?: string;
}

const useI18n = () => {
  const { language: lan } = useLanguage();

  function getText(key: getTextParams['key'], defaultText: getTextParams['defaultText'] = '') {
    if (languageData) {
      if (lan) {
        if (languageData[lan] && languageData[lan][key]) {
          return languageData[lan][key] || defaultText;
        }
      } else {
        if (languageData['en_US'] && languageData['en_US'][key]) {
          return languageData['en_US'][key] || defaultText;
        }
      }
    }
    return defaultText;
  }

  return { getText };
};
export default useI18n;
