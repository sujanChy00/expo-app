import React from 'react';
import { View } from 'react-native';

import { Avatar } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { P } from '../ui/typography';

import { ITransactionById } from '@/types/ITransaction';
import { getAvatarName } from '@/utils/get-avatar-name';

type Props = {
  userName?: string;
  userId?: number;
  isPending: boolean;
};
/**
 * @description A React component that renders the header section for chat details.
 * It displays a loading placeholder while the order data is pending and user details
 * and a "View Order" button once available.
 * @typedef {Object} ITransactionById
 * @property {Object} userDetail - User details associated with the order.
 * @property {string} userDetail.name - User name.
 *
 * @typedef {Object} Props
 * @property {number} orderId - The order ID.
 * @property {ITransactionById} [order] - The order data, if available.
 * @property {boolean} isPending - Whether the order data is still pending.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered chat details header component.
 */
export const ChatDetailsHeader = ({ userId, userName, isPending }: Props) => {
  return (
    <View className="xs:flex xs:px-3 hidden h-[10vh] flex-row flex-wrap items-center justify-between gap-2 border-b border-b-border bg-background">
      {isPending ? (
        <View className="flex-row items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-2 w-28" />
        </View>
      ) : (
        <View className="flex-row items-center gap-2">
          <Avatar
            alt={userName || 'user name'}
            className="items-center justify-center border border-border">
            <P>{getAvatarName(userName)}</P>
          </Avatar>
          <P>{userName}</P>
        </View>
      )}
      {/* <Link
        asChild
        disabled={isPending}
        href={`/(main)/(app)/order/${userId}`}
        className="web:hover:underline"
      >
        <View className="flex flex-row gap-1 items-center">
          <P className="text-sm font-medium text-muted-foreground">
            View Order
          </P>
          <ArrowRight size={18} className="text-muted-foreground" />
        </View>
      </Link> */}
    </View>
  );
};
