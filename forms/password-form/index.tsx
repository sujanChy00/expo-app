import { useRouter } from 'expo-router';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { usePasswordForm } from './use-password-form';

import { PasswordInput } from '@/components/form-inputs/password-input';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { handleKeyPress } from '@/utils/handle-enter-key-press';

type Props = {
  goBack?: boolean;
  onClose?: () => void;
};

/**
 * @description A React component that renders a form for users to change their password. It uses the `usePasswordForm` hook for form logic and data management.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered `PasswordForm` component.
 */
export const PasswordForm = ({ onClose, goBack = true }: Props) => {
  const router = useRouter();
  const { form, onSubmit, isPending } = usePasswordForm(onClose, goBack);
  const { getText } = useI18n();
  return (
    <View>
      <View className="flex sm:hidden" />
      <FormProvider {...form}>
        <View className="gap-y-3 py-2">
          <PasswordInput
            onKeyPress={(e) => handleKeyPress(e, onSubmit)}
            control={form.control}
            label={getText('old_password')}
            name="oldPassword"
            placeholder="Enter your old password"
          />
          <PasswordInput
            onKeyPress={(e) => handleKeyPress(e, onSubmit)}
            control={form.control}
            label={getText('new_password')}
            name="newPassword"
            placeholder="Enter your new password"
          />
        </View>
      </FormProvider>
      <View className="flex-row items-center justify-end gap-2 pt-4">
        <Button
          disabled={isPending}
          variant="outline"
          onPress={() => {
            if (onClose) {
              onClose();
              return;
            }
            if (goBack) router.back();
          }}>
          <P className="font-semibold">{getText('cancel')}</P>
        </Button>
        <Button disabled={isPending} onPress={onSubmit} className="flex-row gap-1">
          {isPending && <ActivityIndicator size="small" color="white" />}
          <P className="font-semibold text-white">{getText('update')}</P>
        </Button>
      </View>
    </View>
  );
};
