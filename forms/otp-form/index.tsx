import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { useOtpForm } from './use-otp-form';

import { BackButton } from '@/components/back-button';
import { PinInput } from '@/components/form-inputs/pin-input';
import { TextInput } from '@/components/form-inputs/text-input';
import { Info } from '@/components/icons/info-icon';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export const OtpForm = ({ className }: { className?: string }) => {
  const { form, isPending, verifyCode } = useOtpForm();
  return (
    <View className={cn('w-[90%] max-w-[400px] gap-4', className)}>
      <Alert icon={Info} variant="destructive">
        <AlertTitle className="text-destructive">Please check your email</AlertTitle>
      </Alert>
      <Card className="p-2">
        <BackButton />
        <CardContent className="py-4">
          <FormProvider {...form}>
            <View className="gap-y-4">
              <TextInput
                inputMode="email"
                control={form.control}
                name="email"
                label="Email"
                placeholder="youremail@tetoteto.co.jp"
              />
              <PinInput control={form.control} name="reset_code" label="OTP" />
            </View>
          </FormProvider>
        </CardContent>
        <CardFooter>
          <Button
            style={{ backgroundColor: '#14532d' }}
            onPress={verifyCode}
            className="w-full"
            disabled={isPending}>
            <Text className="text-white">{isPending ? 'please wait...' : 'SUBMIT'}</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
};
