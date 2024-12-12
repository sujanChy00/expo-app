import React from 'react';
import { Image } from 'react-native';

type Props = Omit<React.ComponentProps<typeof Image>, 'source' | 'alt' | 'src'> & {
  uri?: string | null;
  alt: string;
};

export const AppImage = ({ uri, ...props }: Props) => {
  return <Image source={uri ? { uri } : require('@/assets/images/logo.png')} {...props} />;
};
