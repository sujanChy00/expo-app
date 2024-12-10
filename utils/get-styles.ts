import { Platform, View, ViewStyle } from 'react-native';
type Styles = React.ComponentProps<typeof View>['style'];

export const generateStyle = (wStyles: Styles, nStyles?: Styles): Styles | null => {
  if (Platform.OS === 'web') return wStyles;

  return nStyles ? nStyles : null;
};

export const generateClassName = (wClassName: string, nClassName?: string): string => {
  if (Platform.OS === 'web') return wClassName;
  return nClassName ? nClassName : '';
};

export const tabStyle = (arg1: string, arg2: string): ViewStyle | null => {
  if (arg1 !== arg2) return null;
  return {
    borderBottomWidth: 3,
    borderStyle: 'solid',
    borderBottomColor: '#14522d',
  };
};
