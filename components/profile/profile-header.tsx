import React from 'react';
import { Platform, View } from 'react-native';

import { Avatar, AvatarImage } from '../ui/avatar';
import { Card } from '../ui/card';
import { P } from '../ui/typography';

import { PasswordFormModal } from '@/forms/password-form/password-form-modal';
import { ProfileFormModal } from '@/forms/profile/profile-form-modal';
import { useUser } from '@/hooks/use-user';
import { getAvatarName } from '@/utils/get-avatar-name';

/**
 * @description A React component that displays a user's profile header, including their photo (if available), name, email, phone number, and potentially links to profile and password edit modals (implemented with separate components).
 *
 * @returns {JSX.Element} The rendered `ProfileHeader` component.
 */
export const ProfileHeader = () => {
  const { user } = useUser();
  return (
    <Card className="items-center justify-between border-transparent bg-background p-4 shadow-none web:md:flex-row web:md:items-end web:md:border-border web:md:bg-background">
      <View className="items-center gap-2 md:flex-row">
        <Avatar
          className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-border p-2"
          alt={user?.profileDetails.shopAssistantName || 'user'}>
          {user?.profileDetails.shopAssistantPhotoUrl ? (
            <AvatarImage source={{ uri: user?.profileDetails.shopAssistantPhotoUrl }} />
          ) : (
            <P className="text-4xl text-gray-600">
              {getAvatarName(user?.profileDetails.shopAssistantName)}
            </P>
          )}
        </Avatar>
        <View className="items-center md:items-start">
          <P className="text-lg font-medium capitalize">{user?.profileDetails.shopAssistantName}</P>
          <P className="text-sm">{user?.profileDetails.shopAssistantEmail}</P>
          <P className="text-sm">{user?.profileDetails.shopAssistantPhoneNumber}</P>
        </View>
      </View>
      {Platform.OS == 'web' && (
        <View className="hidden flex-row gap-x-2 md:flex">
          <ProfileFormModal />
          <PasswordFormModal />
        </View>
      )}
    </Card>
  );
};
