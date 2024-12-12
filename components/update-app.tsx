import { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppBottomSheet } from './app-bottom-sheet';
import { AppLoader } from './app-loader';
import { Button } from './ui/button';
import { H4, P } from './ui/typography';

import { errorToast } from '@/lib/toast';

export const UpdateApp = () => {
  const [updatingApp, setUpdatingApp] = useState(false);
  const { isUpdatePending, isUpdateAvailable } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdateAvailable) {
      setUpdatingApp(true);
      Updates.fetchUpdateAsync()
        .catch(() => {
          errorToast('Something went wrong while updating the app');
        })
        .finally(() => {
          setUpdatingApp(false);
        });
    }
  }, [isUpdateAvailable]);

  if (updatingApp)
    return (
      <AppLoader
        visible
        style={{
          height: 100,
          width: 100,
        }}
        className="gap-4">
        <P>Updating...</P>
      </AppLoader>
    );

  if (isUpdatePending && !updatingApp)
    return (
      <AppBottomSheet snapPoints={['25%']} enablePanDownToClose={false}>
        <BottomSheetView
          className="flex-1 bg-background px-4"
          style={{
            paddingBottom: 10,
          }}>
          <View className="flex-1 gap-2 pt-6">
            <H4>We've just completed updating your app.</H4>
            <P
              style={{
                fontSize: 16,
              }}>
              Please restart the app to apply the changes.
            </P>
          </View>
          <Button onPress={() => Updates.reloadAsync()}>
            <P className="text-white">Reload</P>
          </Button>
        </BottomSheetView>
      </AppBottomSheet>
    );
};
