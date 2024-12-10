import React from 'react';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { useUpdatePasswordForm } from './use-update-password-form';

import { BackButton } from '@/components/back-button';
import { PasswordInput } from '@/components/form-inputs/password-input';
import { TextInput } from '@/components/form-inputs/text-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { P } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

export const UpdatePasswordForm = ({ className }: { className?: string }) => {
  const { form, isPending, updatePassword } = useUpdatePasswordForm();
  return (
    <Card className={cn('w-[90%] max-w-[400px]', className)}>
      <CardHeader className="flex-row items-center justify-between gap-x-2 pb-4">
        <BackButton />
        <CardTitle className="text-base font-medium">Update Password</CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <FormProvider {...form}>
          <View className="gap-y-4">
            <TextInput
              readOnly
              inputMode="email"
              control={form.control}
              name="email"
              placeholder="youremail@tetoteto.co.jp"
            />
            <PasswordInput control={form.control} name="newPassword" placeholder="Your Password" />
            <PasswordInput
              control={form.control}
              name="confirmNewPassword"
              placeholder="Confirm Your Password"
            />
          </View>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <Button onPress={updatePassword} className="w-full flex-row gap-1" disabled={isPending}>
          {isPending && <ActivityIndicator size="small" color="#fff" />}
          <P>UPDATE</P>
        </Button>
      </CardFooter>
    </Card>
  );
};
