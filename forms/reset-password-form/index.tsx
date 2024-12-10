import { Link } from 'expo-router';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { useResetPasswordForm } from './use-reset-password-form';

import { PasswordInput } from '@/components/form-inputs/password-input';
import { ArrowLeft } from '@/components/icons/arrow-left';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { P } from '@/components/ui/typography';
import { handleKeyPress } from '@/utils/handle-enter-key-press';

const ResetPasswordForm = () => {
  const { form, isLoading, updatePassword } = useResetPasswordForm();
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="w-fit">
        <Link href="/auth/signin" asChild>
          <View className="flex-row items-center gap-x-1">
            <ArrowLeft size={20} />
            <P>Back to sign in</P>
          </View>
        </Link>
      </CardHeader>
      <CardContent className="py-4">
        <FormProvider {...form}>
          <View className="gap-y-4">
            <PasswordInput
              onKeyPress={(e) => handleKeyPress(e, updatePassword)}
              control={form.control}
              name="newPassword"
              placeholder="New Password"
            />
            <PasswordInput
              onKeyPress={(e) => handleKeyPress(e, updatePassword)}
              control={form.control}
              name="confirmNewPassword"
              placeholder="Confirm Password"
            />
          </View>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <Button className="w-full flex-row gap-1" onPress={updatePassword} disabled={isLoading}>
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
          <P>Update Password</P>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
