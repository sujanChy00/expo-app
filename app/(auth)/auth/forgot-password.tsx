import { Stack } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const ForgotPassword = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Forgot Password',
          headerBackTitle: 'back',
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        className="bg-background">
        {/* <ForgotPasswordForm /> */}
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPassword;
