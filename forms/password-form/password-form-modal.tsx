import React from 'react';

import { PasswordForm } from '.';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import useI18n from '@/hooks/useI81n';

/**
 * @description A React component that renders a modal for changing the user's password. It triggers the modal on a button click and displays the `PasswordForm` component for password input and confirmation.
 *
 * @returns {JSX.Element} The rendered `PasswordFormModal` component.
 */
export const PasswordFormModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const { getText } = useI18n();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="h-9 rounded-lg text-sm">
          <Text className="font-semibold">{getText('change_password')}</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] md:w-[25%]">
        <AlertDialogHeader>
          <AlertDialogTitle>{getText('change_password')}</AlertDialogTitle>
        </AlertDialogHeader>
        <PasswordForm onClose={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
