import {
  Gift,
  Home,
  LucideIcon,
  Megaphone,
  ReceiptText,
  ShoppingCart,
  Timer,
  TruckIcon,
  User2,
  Users,
} from 'lucide-react-native';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  {
    label: 'home',
    href: '/',
    icon: Home,
  },
  {
    label: 'items',
    href: '/items',
    icon: Gift,
  },
  {
    label: 'orders',
    href: '/order',
    icon: ShoppingCart,
  },
  {
    label: 'shipments',
    href: '/shipments',
    icon: TruckIcon,
  },
  {
    label: 'shipping_fees',
    href: '/shipping-fee',
    icon: ReceiptText,
  },
  {
    label: 'shipping_campaigns',
    href: '/shipping-campaign',
    icon: Megaphone,
  },
  {
    label: 'shop_users',
    href: '/shop-users',
    icon: Users,
  },
  {
    label: 'delivery_time',
    href: '/delivery-times',
    icon: Timer,
  },
  {
    label: 'profile',
    href: '/profile',
    icon: User2,
  },
];
