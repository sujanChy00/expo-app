import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'lucide-react-native';
import React, { useRef } from 'react';
import { Keyboard } from 'react-native';

import { AppBottomSheet } from '../app-bottom-sheet';
import { Button } from '../ui/button';
import { P } from '../ui/typography';

import { isweb } from '@/constants/data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import useI18n from '@/hooks/useI81n';

type Props = {
  sendFile: (file: File | string) => void;
};

/**
 * @description A React component that renders a button to select an image for uploading.
 * It uses `ImagePicker` on native platforms and a hidden file input with a label on the web platform.
 * When a file is selected, it calls the provided `sendFile` function to handle the upload process.
 * @typedef {Object} Props
 * @property {function(File | string): void} sendFile - Function to handle sending the selected file.
 *  - On native platforms, it receives a `File` object representing the selected file.
 *  - On web platforms, it receives a string representing the path to the selected file.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered file upload button component.
 */

export const FileUpload = ({ sendFile }: Props) => {
  const ref = useRef<BottomSheet>(null);
  const { isDarkColorScheme } = useColorScheme();
  const { getText } = useI18n();
  const openSheet = () => {
    Keyboard.isVisible() && Keyboard.dismiss();
    if (ref.current) {
      ref.current.expand();
    }
  };
  const closeSheet = () => {
    if (ref.current) {
      ref.current.close();
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      const uri = result.assets[0]?.uri;
      closeSheet();
      sendFile(uri);
    }
  };
  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    closeSheet();
    sendFile(uri);
  };

  if (isweb)
    return (
      <Button
        className="native:h-10 native:w-10 rounded-full web:h-8 web:w-8"
        size="icon"
        variant="secondary">
        <label htmlFor="file" className="flex cursor-pointer items-center justify-center">
          <Image className="text-accent-foreground" size={18} />
        </label>
        <input
          onChange={(e) => {
            if (e.target.files) {
              const image = e.target.files[0];
              if (image) {
                sendFile(image);
              }
            }
          }}
          type="file"
          className="hidden"
          id="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </Button>
    );
  return (
    <>
      <Button
        onPress={openSheet}
        className="base:h-8 base:w-8 h-10 w-10 rounded-full"
        size="icon"
        variant="secondary">
        <Image
          size={20}
          className="text-accent-foreground"
          color={isDarkColorScheme ? '#bab6d2' : '#33313f'}
        />
      </Button>
      <AppBottomSheet ref={ref} snapPoints={['20%']} index={-1}>
        <BottomSheetView className="items-stretch justify-center gap-3 p-3">
          <Button onPress={takePicture} variant="secondary">
            <P className="font-sm font-semibold">{getText('open_camera')}</P>
          </Button>
          <Button variant="secondary" onPress={pickImage}>
            <P className="font-sm font-semibold">{getText('choose_from_gallery')}</P>
          </Button>
        </BottomSheetView>
      </AppBottomSheet>
    </>
  );
};
