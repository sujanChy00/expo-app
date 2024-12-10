import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { useForgotPasswordForm } from './use-forgot-password-form';

import { BackButton } from '@/components/back-button';
import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import useI18n from '@/hooks/useI81n';
import { handleKeyPress } from '@/utils/handle-enter-key-press';

export function ForgotPasswordForm() {
  const { form, handleSubmit, isLoading } = useForgotPasswordForm();
  const { getText } = useI18n();
  return (
    <Card className="w-[96%] max-w-[400px]">
      <CardHeader className="flex-row items-center justify-between gap-x-2 pb-4">
        <BackButton />
        <CardTitle className="text-base font-medium">{getText('forgot_password')}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <View className="gap-y-4">
            <TextInput
              onKeyPress={(e) => handleKeyPress(e, handleSubmit)}
              autoFocus
              control={form.control}
              label="Email"
              name="reset_email"
              placeholder="youremail@tetoteto.co.jp"
              inputMode="email"
            />
            <Button
              style={{ backgroundColor: '#14532d' }}
              onPress={handleSubmit}
              disabled={isLoading}>
              <Text className="text-white">{isLoading ? 'Sending...' : getText('send_link')}</Text>
            </Button>
          </View>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
