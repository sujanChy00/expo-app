import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Platform, Pressable, View } from 'react-native';

import { ChevronRight } from '../icons/chevron-right';
import { Clock } from '../icons/clock';
import { Info } from '../icons/info-icon';
import { KeyRound } from '../icons/key-round';
import { LogOut as LogoutIcon } from '../icons/logout-icon';
import { ShieldCheck } from '../icons/shield-check';
import { Truck } from '../icons/truck';
import { UserRound } from '../icons/user-round';
import { LanguageSheet } from '../language-sheet';
import { ShopList } from '../shop/shop-list';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';
import { Logout } from './logout';

import { isweb } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

/**
 * @description A React component that renders a list of clickable links within a card for navigating to various profile-related settings and actions on the mobile view. It includes options for managing shipping fees, campaigns, delivery times, password, profile details, language settings, terms & conditions, privacy policy, and logout.
 *
 * @returns {JSX.Element} The rendered `ProfileLinks` component.
 */
export const ProfileLinks = () => {
  const router = useRouter();
  const { getText } = useI18n();
  return (
    <View className="flex gap-y-3 pt-5 web:md:hidden" style={{ paddingBottom: 20 }}>
      <ShopList />
      <Card className="gap-y-2 p-3 shadow-none">
        <Pressable
          onPress={() => router.push('/(main)/(app)/shipping-fee')}
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-blue-600">
              <Truck className="text-white" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('shipping_fees')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <Pressable
          className="flex-row items-center justify-between"
          onPress={() => router.push('/shipping-campaign')}>
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-teal-600">
              <MaterialIcons name="campaign" color="#fff" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('shipping_campaign')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <Pressable
          className="flex-row items-center justify-between"
          onPress={() => router.push('/delivery-times')}>
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-orange-600">
              <Clock color="#fff" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('delivery_time_slots')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <Pressable
          className="flex-row items-center justify-between"
          onPress={() => router.push('/shop-users')}>
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-sky-600">
              <FontAwesome name="users" color="#fff" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('shop_users')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <Pressable
          onPress={() => router.push('/profile/update-password')}
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-rose-600">
              <KeyRound color="#fff" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('change_password')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <Pressable
          onPress={() => router.push('/profile/update-profile')}
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-violet-600">
              <UserRound color="#fff" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('update_profile')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <LanguageSheet />
        <Separator />
        <Pressable
          onPress={() =>
            isweb
              ? Linking.openURL('https://about.tetoteto.co.jp/terms-and-conditions/')
              : router.push('/term-conditions')
          }
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-yellow-600">
              <Info color="#fff" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('terms_condition')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <Pressable
          onPress={() =>
            Platform.OS === 'web'
              ? Linking.openURL('https://about.tetoteto.co.jp/privacy-policy/')
              : router.push('/privacy-policy')
          }
          className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <IconWrapper className="bg-zinc-600">
              <ShieldCheck color="#fff" size={18} />
            </IconWrapper>
            <P className="text-sm font-semibold">{getText('privacy_policy')}</P>
          </View>
          <ChevronRight className="text-muted-foreground" size={18} />
        </Pressable>
        <Separator />
        <Logout>
          <View className="flex-1 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <IconWrapper className="bg-destructive">
                <LogoutIcon color="#fff" size={18} />
              </IconWrapper>
              <P className="text-sm font-semibold">{getText('logout')}</P>
            </View>
            <ChevronRight className="text-muted-foreground" size={18} />
          </View>
        </Logout>
      </Card>
    </View>
  );
};

const IconWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <View className={cn('h-8 w-8 items-center justify-center rounded-lg', className)}>
      {children}
    </View>
  );
};
