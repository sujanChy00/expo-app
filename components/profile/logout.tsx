import { ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, View } from 'react-native';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { P } from '../ui/typography';

import { useLogoutMutation } from '@/actions/auth';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

/**
 * @description A React component that provides logout functionality.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} [props.children] - Optional children to render inside the component.
 * @param {string} [props.className] - Optional class name for additional styling.
 * @returns {JSX.Element} The rendered Logout component.
 */
export const Logout = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogTrigger>) => {
  const [opened, setOpened] = useState(false);
  const { mutateAsync } = useLogoutMutation();
  const logout = async () => await mutateAsync();
  const close = () => setOpened(false);
  const { getText } = useI18n();
  const title = getText('logout');
  const description = getText('logout_alert');

  if (Platform.OS == 'web') {
    return (
      <AlertDialog open={opened} onOpenChange={setOpened}>
        <AlertDialogTrigger
          className={cn('flex-row items-center justify-between', className)}
          {...props}>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent className="md:w-[25%]">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row flex-nowrap justify-end">
            <AlertDialogCancel>
              <P> {getText('cancel')}</P>
            </AlertDialogCancel>
            <Button onPress={logout}>
              <P>{title}</P>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Pressable
      onPress={() => {
        Alert.alert(
          title,
          description,
          [
            {
              text: getText('cancel'),
              style: 'cancel',
            },
            {
              text: title,
              onPress: () => logout(),
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
      }}>
      {children || (
        <View className="flex-row items-center justify-between">
          <P className="text-sm font-semibold">{title}</P>
          <ChevronRight className="text-foreground" />
        </View>
      )}
    </Pressable>
  );
};
