import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { P } from '@/components/ui/typography';

export default function Modal() {
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <P>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis cupiditate deleniti
        voluptates modi dolor aliquam nobis, quo architecto ut pariatur odio corporis dolores, quos
        eum iure neque quae consequuntur beatae.
      </P>
    </>
  );
}
