import { Lock, Verified } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { Avatar } from '../ui/avatar';
import { Card, CardContent, CardHeader } from '../ui/card';
import { P } from '../ui/typography';

import { useWindow } from '@/hooks/use-window';
import { IShopUser } from '@/types/IShopUsers';
import { dateTimeFormatterWithouTLocale } from '@/utils/date';
import { getAvatarName } from '@/utils/get-avatar-name';

/**
 * @description A React component that renders a detailed card for a shop user, including their avatar, 
 * name (with initials if no image available), email, role (with "ADMIN" badge for admin users), and creation date.
 * @typedef {Object} IShopUser

 *
 * @param {Object} props - Component props.
 * @property {IShopUser} props.user - Object containing information about the shop user.
 * @returns {JSX.Element} The rendered `ShopUsersCard` component.
 */
export const ShopUsersCard = ({ user }: { user: IShopUser }) => {
  const { dataCardStyle } = useWindow();
  return (
    <Card className="overflow-hidden" style={dataCardStyle}>
      <CardHeader className="flex-row items-center justify-between p-2">
        <View className="flex-row items-center gap-2">
          <Avatar
            alt={user.sellerName}
            className="items-center justify-center border border-border">
            <P>{getAvatarName(user.sellerName)}</P>
          </Avatar>
          <View>
            <View className="flex-row items-start gap-1">
              <P className="font-semibold">{user.sellerName}</P>
              {user.sellerApproved && <Verified className="text-green-600" size={18} />}
            </View>
            <P>{user.sellerEmail}</P>
          </View>
        </View>
      </CardHeader>
      <CardContent
        style={{ backgroundColor: '#313091' }}
        className="flex-row  items-center justify-between bg-gray-100 p-2">
        {user.sellerRole == 'admin' ? (
          <View className="flex-row items-center gap-1">
            <Lock size={18} className="text-red-600" />
            <P className="text-sm font-semibold">ADMIN</P>
          </View>
        ) : (
          <P className="text-sm font-semibold">{user.sellerRole}</P>
        )}
        <P className="text-sm italic text-white">
          {dateTimeFormatterWithouTLocale(new Date(user.sellerCreated))}
        </P>
      </CardContent>
    </Card>
  );
};
