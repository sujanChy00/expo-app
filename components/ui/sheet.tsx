import { useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';
import { createContext, useContext, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, TextProps, View, ViewProps } from 'react-native';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import { X } from '../icons/close-icon';
import { Button, ButtonProps } from './button';
import { H4, P } from './typography';
import { NAV_THEME } from '@/constants/colors';

interface SheetContextInterface {
  open: boolean;
  setOpened: (open: boolean) => void;
}

interface SheetProps extends ViewProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextInterface | null>(null);

const Sheet = ({ open, onOpenChange, ...props }: SheetProps) => {
  const [internalOpen, setInternalOpen] = useState(!!open);

  useEffect(() => {
    if (typeof open === 'boolean') {
      setInternalOpen(open);
    }
  }, [open]);

  const setOpened = (value: boolean) => {
    if (onOpenChange) onOpenChange(value);
    setInternalOpen(value);
  };

  return (
    <SheetContext.Provider value={{ open: internalOpen, setOpened }}>
      <View {...props} />
    </SheetContext.Provider>
  );
};

const SheetTrigger = (props: ButtonProps) => {
  const { setOpened } = useSheet();

  return (
    <Button
      {...props}
      variant={props.variant || 'outline'}
      size={props.size || 'icon'}
      onPress={() => {
        setOpened(true);
      }}
    />
  );
};

const SheetContent = ({ children, ...props }: ViewProps) => {
  const { open, setOpened } = useSheet();
  const { colorScheme } = useColorScheme();

  if (!open) return null;

  return (
    <Modal visible={open} statusBarTranslucent transparent={true} animationType="none">
      <View className="h-full w-full">
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          className="bg-black/50 web:cursor-default"
          onPress={() => setOpened(false)}
        />
        <View {...props} className={cn('relative h-full w-96')}>
          <Animated.View
            entering={SlideInLeft}
            exiting={SlideOutLeft}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: NAV_THEME[colorScheme].background,
              padding: 24,
              flexDirection: 'column',
            }}>
            <Button
              className="absolute right-2 top-2 bg-transparent hover:bg-transparent"
              size={'icon'}
              onPress={() => setOpened(false)}>
              <X className="text-secondary-foreground" />
            </Button>
            {children}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const SheetHeader = (props: ViewProps) => (
  <View {...props} className={cn('w-[90%] gap-1 pb-6', props.className)} />
);

const SheetTitle = (props: TextProps) => <H4 {...props} />;

const SheetDescription = (props: TextProps) => (
  <P {...props} className={cn('text-sm text-secondary-foreground', props.className)} />
);

const SheetFooter = (props: ViewProps) => (
  <View
    {...props}
    className={cn('mt-auto flex-row items-center justify-end gap-4 pt-6', props.className)}
  />
);

const SheetCancel = (props: ButtonProps) => {
  const { setOpened } = useSheet();

  return (
    <Button {...props} variant={props.variant || 'outline'} onPress={() => setOpened(false)} />
  );
};

const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a Sheet component');
  }
  return context;
};

export {
  Sheet,
  SheetCancel,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
