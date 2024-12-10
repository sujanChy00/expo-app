import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { ForwardedRef, useMemo } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

type Props = Omit<React.ComponentPropsWithoutRef<typeof BottomSheet>, 'children'> & {
  children: React.ReactNode;
};

export const AppBottomSheet = React.forwardRef<React.ElementRef<typeof BottomSheet>, Props>(
  (props, ref) => {
    const { isDarkColorScheme } = useColorScheme();
    const snappoints = useMemo(() => props.snapPoints, []);

    return (
      <Portal>
        <BottomSheet
          backdropComponent={(backdropProps) => (
            <BottomSheetBackdrop
              {...backdropProps}
              disappearsOnIndex={-1}
              enableTouchThrough
              opacity={0.8}
            />
          )}
          ref={ref as ForwardedRef<BottomSheet>}
          enablePanDownToClose
          snapPoints={snappoints}
          {...props}
          index={props.index || -1}
          backgroundStyle={{
            backgroundColor: isDarkColorScheme ? 'black' : 'white',
          }}
          handleIndicatorStyle={{
            backgroundColor: isDarkColorScheme ? 'white' : 'black',
          }}
          handleStyle={{
            backgroundColor: isDarkColorScheme ? 'black' : 'white',
            borderTopEndRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          {props.children}
        </BottomSheet>
      </Portal>
    );
  }
);
