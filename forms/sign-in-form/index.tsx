import { Link } from 'expo-router';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { useSignInForm } from './use-sign-in-form';

import { PasswordInput } from '@/components/form-inputs/password-input';
import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { handleKeyPress } from '@/utils/handle-enter-key-press';

export const SignInForm = () => {
  const { handleSubmit, isLoading, form } = useSignInForm();
  const { getText } = useI18n();
  return (
    <Card className="w-[96%] max-w-[400px] gap-y-4">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <View className="gap-4">
            <TextInput
              autoComplete="email"
              onKeyPress={(e) => handleKeyPress(e, handleSubmit)}
              control={form.control}
              name="email"
              label={getText('email')}
              inputMode="email"
              keyboardType="email-address"
              placeholder="youremail@tetoteto.co.jp"
            />
            <PasswordInput
              onKeyPress={(e) => handleKeyPress(e, handleSubmit)}
              control={form.control}
              name="password"
              label={getText('password')}
              placeholder="Enter your password"
            />
          </View>
        </FormProvider>
        <View className="gap-y-4 pt-2">
          <Link
            className="web:hover:decoration-primary block web:hover:underline"
            href={{
              pathname: '/auth/forgot-password',
              params: {
                email: form.watch('email'),
              },
            }}
            asChild>
            <P className="text-right">{getText('forgot_password')}</P>
          </Link>
          <Button className="mt-2" onPress={handleSubmit} disabled={isLoading}>
            {isLoading ? <ActivityIndicator /> : <P className="text-white">Sign In</P>}
          </Button>
        </View>
      </CardContent>
    </Card>
  );
};
