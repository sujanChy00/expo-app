import { Stack } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { SignInForm } from '@/forms/sign-in-form';
import { useExitApp } from '@/hooks/useExitApp';

const SignInScreen = () => {
  useExitApp();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        className="bg-background">
        <SignInForm />
      </KeyboardAvoidingView>
    </>
  );
};

export default SignInScreen;
