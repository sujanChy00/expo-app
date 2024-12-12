import { useRouter } from 'expo-router';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { useProfileForm } from './use-profile-form';

import { TextInput } from '@/components/form-inputs/text-input';
// import { ProfileImagePicker } from '@/components/profile/profile-image-picker';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { handleKeyPress } from '@/utils/handle-enter-key-press';
import { ProfileImagePicker } from '@/components/profile/profile-image-picker';

type Props = {
  goBack?: boolean;
  onClose?: () => void;
  className?: string;
};

/**
 * @description A React component that renders a form for users to update their profile information. It uses the `useProfileForm` hook for form logic, data management, and image upload handling.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered `ProfileForm` component.
 */
export const ProfileForm = ({ onClose, goBack, className }: Props) => {
  const router = useRouter();
  const { form, user, onSubmit, isPending, handleImageUpload, isProfileImagePending } =
    useProfileForm(onClose);
  const { getText } = useI18n();
  return (
    <View className={cn('native:pb-5 flex-1 bg-background pb-16 pt-20 web:pb-0', className)}>
      <View className="flex sm:hidden" />
      <View>
        <ProfileImagePicker
          onUpload={handleImageUpload}
          isLoading={isProfileImagePending}
          alt={user?.profileDetails.shopAssistantName || 'profile'}
          image={user?.profileDetails.shopAssistantPhotoUrl}
        />
        <FormProvider {...form}>
          <View className="gap-y-4 pb-4 pt-20">
            <TextInput
              label={getText('name')}
              name="name"
              control={form.control}
              onKeyPress={(e) => handleKeyPress(e, onSubmit)}
              placeholder="Enter name"
            />
          </View>
        </FormProvider>
      </View>
      <View className="flex-row justify-end gap-2">
        <Button
          disabled={isPending || isProfileImagePending}
          variant="outline"
          onPress={() => {
            if (goBack) router.back();
            else onClose?.();
          }}>
          <Text className="font-semibold">{getText('cancel')}</Text>
        </Button>
        <Button disabled={isPending || isProfileImagePending} onPress={onSubmit}>
          <Text className="font-semibold">{isPending ? 'UPDATING...' : getText('update')}</Text>
        </Button>
      </View>
    </View>
  );
};
