import React from 'react';
import { Image } from 'react-native';

import { Avatar } from '../ui/avatar';
import { P } from '../ui/typography';

import { cn } from '@/lib/utils';
import { getAvatarName } from '@/utils/get-avatar-name';

type Props = {
  className?: string;
  src?: string;
  fallBack?: string;
  alt: string;
};

/**
 * @typedef {Object} Props
 * @property {string} alt - Alternative text for the avatar image, used for accessibility.
 * @property {string} className - Additional CSS classes to apply to the avatar element.
 * @property {string} fallBack - Text to display as fallback if no image source is provided.
 * @property {string} src - URL of the image source to display in the avatar.

 * @description A React component that renders a user avatar using an `Avatar` component and handles different scenarios:
 *   - If `src` is provided, displays an image using `Image` with the given source and styles.
 *   - If `src` is not provided and `fallBack` is available, displays the fallback text.
 *   - If neither `src` nor `fallBack` is provided, no content is rendered.
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered `UserAvatar` component or `null` if neither image nor fallback is available.
 */

export const UserAvatar = ({ alt, className, fallBack, src }: Props) => {
  return (
    <Avatar alt={alt} className={cn('items-center justify-center border border-border', className)}>
      {src ? (
        <Image alt={alt} source={{ uri: src }} style={{ height: '100%', width: '100%' }} />
      ) : (
        <P>{getAvatarName(fallBack)}</P>
      )}
    </Avatar>
  );
};
