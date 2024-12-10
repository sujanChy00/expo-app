import { NativeSyntheticEvent, Platform, TextInputKeyPressEventData } from 'react-native';

export const handleKeyPress = (
  e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  onSubmit: () => void
) => {
  if (!onSubmit) return;
  if (e.nativeEvent.key === 'Enter' && Platform.OS === 'web') {
    onSubmit();
  }
};
