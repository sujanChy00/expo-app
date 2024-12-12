import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable } from 'react-native';
import { z } from 'zod';

import { TextInput } from '../form-inputs/text-input';
import { RefreshCcw } from '../icons/refreshCcw';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { P } from '../ui/typography';

import { useUpdateItemStock } from '@/actions/item';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { handleKeyPress } from '@/utils/handle-enter-key-press';

interface Props {
  itemId: string;
  stock?: number;
  children?: React.ReactNode;
  className?: string;
}

const Schema = z.object({
  stock: z.number(),
});

export const ItemStockManagementModal = ({ itemId, stock, className, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useUpdateItemStock();
  const { getText } = useI18n();
  const form = useForm<z.infer<typeof Schema>>({
    defaultValues: {
      stock,
    },
    resolver: zodResolver(Schema),
  });

  const onUpdate = form.handleSubmit((data) => {
    mutateAsync({ itemId, stock: data.stock }).finally(() => setIsOpen(false));
  });

  useEffect(() => {
    form.setValue('stock', stock || 0);
  }, [stock]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild className="cursor-pointer">
        {children ? (
          children
        ) : (
          <Pressable
            className={cn('flex cursor-pointer flex-row items-center justify-between', className)}>
            <P className="text-sm text-accent-foreground">{getText('update_stock')}</P>
            <RefreshCcw size={18} className="text-accent-foreground" />
          </Pressable>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] md:w-[35%]">
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">{getText('update_stock')}</AlertDialogTitle>
          <AlertDialogDescription>{getText('stock_update_desc')}</AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...form}>
          <TextInput
            autoFocus
            onKeyPress={(e) => handleKeyPress(e, onUpdate)}
            control={form.control}
            name="stock"
            inputMode="numeric"
            placeholder={getText('enter_item_stock')}
            keyboardType="numeric"
            label={getText('stock')}
          />
        </FormProvider>
        <AlertDialogFooter className="flex-row flex-nowrap justify-end">
          <AlertDialogCancel>
            <P className="uppercase">{getText('cancel')}</P>
          </AlertDialogCancel>
          <Button onPress={onUpdate} disabled={isPending} className="flex-row items-center gap-1">
            {isPending && <ActivityIndicator size="small" color="#fff" />}
            <P className="uppercase text-white">{getText('update')}</P>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
