import { Link } from 'expo-router';
import { Copy, Eye, Pencil } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Trash } from '../icons/trash-icon';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { P } from '../ui/typography';
import { DeleteItem } from './delete-item';
import { ItemStockManagementModal } from './item-stock-management-modal';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

interface Props {
  itemId: string;
  stock?: number;
  actions: ('copy' | 'edit' | 'view' | 'delete' | 'update-stock')[];
  className?: string;
}

export const ItemTableActions = ({ itemId, actions, stock, className }: Props) => {
  const { getText } = useI18n();
  const actionsList = {
    view: (
      <DropdownMenuItem key="view">
        <Link
          href={`/items/${itemId}`}
          className="flex w-full flex-row items-center justify-between">
          <P className="text-sm text-accent-foreground">{getText('view')}</P>
          <Eye size={18} className="text-accent-foreground" />
        </Link>
      </DropdownMenuItem>
    ),
    edit: (
      <DropdownMenuItem key="edit">
        <Link
          href={`/items/${itemId}/edit`}
          className="flex w-full flex-row items-center justify-between">
          <P className="text-sm text-accent-foreground">{getText('edit')}</P>
          <Pencil size={16} className="text-accent-foreground" />
        </Link>
      </DropdownMenuItem>
    ),
    copy: (
      <DropdownMenuItem key="copy">
        <Link
          href={`/items/${itemId}/copy`}
          className="flex w-full flex-row items-center justify-between">
          <P className="text-sm text-accent-foreground">{getText('copy')}</P>
          <Copy size={18} className="text-accent-foreground" />
        </Link>
      </DropdownMenuItem>
    ),
    delete: (
      <View key="delete">
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteItem itemId={itemId}>
            <Pressable className="group flex-row items-center justify-between rounded-sm px-2 py-1.5 hover:bg-accent focus:bg-accent active:bg-accent">
              <P className="text-sm text-destructive">{getText('delete')}</P>
              <Trash size={18} className="text-destructive" />
            </Pressable>
          </DeleteItem>
        </DropdownMenuItem>
      </View>
    ),
    'update-stock': (
      <DropdownMenuItem asChild className="cursor-pointer" key="update-stock">
        <ItemStockManagementModal itemId={itemId} stock={stock} />
      </DropdownMenuItem>
    ),
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="items-center justify-center rounded-full" size="icon" variant="ghost">
          <P>...</P>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('w-40', className)}>
        {actions.map((action) => actionsList[action])}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
