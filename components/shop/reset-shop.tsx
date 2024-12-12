import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';

import { RadioGroupInput } from '../form-inputs/radio-group-input';
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
import { Button, ButtonProps } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Text } from '../ui/text';
import { P } from '../ui/typography';

import { useResetShop } from '@/actions/shop';
import { useGetAllShippingCompany } from '@/api/shipping-fee-api';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

/**
 * @description A React component that renders a confirmation dialog for resetting a shipping company. It displays a list of shipping companies to choose from and prompts confirmation before performing the reset operation.
 *
 * @returns {JSX.Element} The rendered `ResetShop` component.
 */
export const ResetShop = ({ className, children, ...props }: ButtonProps) => {
  const { getText } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useResetShop();
  const form = useForm({
    defaultValues: {
      companyId: '',
    },
  });
  const { data: shippingCompanies, isPending: loadingShippingCompanies } =
    useGetAllShippingCompany();

  const companyId = form.watch('companyId');

  const loadingState = (
    <View className="grid grid-cols-2 items-center gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="h-4 w-full" key={index} />
      ))}
    </View>
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild className={className}>
        <Button
          variant="destructive"
          {...props}
          className={cn('flex-row items-center gap-2', className)}>
          {children || (
            <>
              <Feather name="refresh-ccw" size={20} color="#fff" />
              <Text className="uppercase text-white">{getText('reset')}</Text>
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] md:w-[35%]">
        <AlertDialogHeader>
          <AlertDialogTitle>{getText('reset_company_title')}</AlertDialogTitle>
          <AlertDialogDescription>{getText('reset_company_description')}</AlertDialogDescription>
        </AlertDialogHeader>
        {loadingShippingCompanies && loadingState}
        {shippingCompanies && (
          <RadioGroupInput
            control={form.control}
            name="companyId"
            options={shippingCompanies.map((company) => ({
              label: company.name,
              value: String(company.id),
            }))}
          />
        )}
        <AlertDialogFooter className="flex-row justify-end">
          <AlertDialogCancel>
            <P>{getText('cancel')}</P>
          </AlertDialogCancel>
          <Button
            disabled={isPending || !companyId}
            onPress={() => mutateAsync(Number(companyId)).then(() => setIsOpen(false))}
            variant="destructive"
            className="flex-row items-center gap-1">
            {isPending && <ActivityIndicator color="#fff" size="small" />}
            <P className="text-background">{getText('reset')}</P>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
