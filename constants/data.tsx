import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { ILanguageTexts } from '@/types/ILanguageTexts';

export const SASTO_SULAV_NEPAL = 2586825067;
export const SASTO_SULAV_iNDIA = 2863768825;
export const TOKEN_KEY = 'abcde';
export const LanguageLists = [
  {
    label: 'English',
    value: 'en_US',
  },
  {
    label: 'Nepali',
    value: 'ne_NP',
  },
  {
    label: 'Vietnamese',
    value: 'vi_VN',
  },
  {
    label: 'Japanese',
    value: 'ja_JP',
  },
];

export const sidebarLinks = [
  {
    label: 'Home',
    href: '/',
    Icon: <AntDesign size={16} name="home" />,
  },
  {
    label: 'Items',
    href: '/item',
    Icon: <Ionicons size={16} name="gift-outline" />,
  },
  {
    label: 'Orders',
    href: '/order',
    Icon: <Ionicons size={16} name="cart-outline" />,
  },
  {
    label: 'Shipping Fee',
    href: '/shipping-fee',
    Icon: <MaterialCommunityIcons size={16} name="truck-outline" />,
  },
  {
    label: 'Shop Users',
    href: '/shop-users',
    Icon: <Feather size={16} name="users" />,
  },
  {
    label: 'Delivery Time',
    href: '/delivery-times',
    Icon: <MaterialCommunityIcons size={16} name="timer-outline" />,
  },
  {
    label: 'Profile',
    href: '/profile',
    Icon: <AntDesign size={16} name="user" />,
  },
];
export const orderSortOptions: { label: ILanguageTexts; value: string }[] = [
  { label: 'all', value: 'all' },
  { label: 'pending_change', value: 'PENDING_CHANGE' },
  { label: 'wait_payment', value: 'WAITING_FOR_PAYMENT' },
  { label: 'order_placed', value: 'ORDER_PLACED' },
  { label: 'shipped', value: 'SHIPPED' },
  { label: 'cancelled', value: 'CANCELLED' },
  { label: 'processing', value: 'PROCESSING' },
  { label: 'completed', value: 'COMPLETED' },
];

export const itemTypeOptions = [
  {
    label: 'Dry',
    value: 'dry',
  },

  {
    label: 'Frozen',
    value: 'frozen',
  },

  {
    label: 'Cool',
    value: 'cool',
  },
];

export const discountTypes = [
  {
    value: 'shippingCampaignDiscountPercentage',
    label: 'Percentage',
  },
  {
    value: 'flatShippingCharge',
    label: 'Flat Amount',
  },
  {
    value: 'flatShippingDiscount',
    label: 'Flat Discount',
  },
];

export const itemTypes = [
  {
    label: 'All',
    value: 'ASHA_ALL',
  },
  {
    label: 'Dry',
    value: 'ASHA_DRY',
  },

  {
    label: 'Frozen',
    value: 'ASHA_FROZEN',
  },

  {
    label: 'Cool',
    value: 'ASHA_COOL',
  },
];

export const primary = '#829ff8';
export const secondary = '#4b4955';

export const screenHeaderShown = Platform.OS !== 'web';

export const isNative = Platform.OS !== 'web';
export const isweb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
