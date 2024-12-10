import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SelectInput } from '../form-inputs/select-input';

import { LanguageLists } from '@/constants/data';
import { useLanguage } from '@/providers/auth-provider';
import { ILanguageCode } from '@/types';

export const LanguageSelector = () => {
  const { setLanguage, language } = useLanguage();
  const form = useForm<{ lan: ILanguageCode }>({
    defaultValues: {
      lan: language || 'en_US',
    },
  });

  useEffect(() => {
    form.setValue('lan', language || 'en_US');
  }, [language]);

  return (
    <FormProvider {...form}>
      <SelectInput
        className="web:border-none web:bg-transparent web:focus:ring-0"
        control={form.control}
        name="lan"
        options={LanguageLists}
        placeholder="Select Language"
        onChange={(e) => setLanguage(e as ILanguageCode)}
      />
    </FormProvider>
  );
};
