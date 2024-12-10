import React, { useState } from 'react';

import { ProfileForm } from './profile-form';

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
 * @description A React component that renders a modal for updating a user's profile information. It triggers the modal on a button click and displays the `ProfileForm` component for user data input.
 *
 * @returns {JSX.Element} The rendered `ProfileFormModal` component.
 */
export const ProfileFormModal = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const { getText } = useI18n();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-9 rounded-lg">
          <Text className="font-semibold">{getText('update_profile')}</Text>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] md:w-[25%]">
        <AlertDialogHeader>
          <AlertDialogTitle>{getText('update_profile')}</AlertDialogTitle>
        </AlertDialogHeader>
        <ProfileForm className="pb-0 pt-0" onClose={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
