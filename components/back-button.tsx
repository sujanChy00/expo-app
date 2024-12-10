import { useRouter } from 'expo-router';
import React from 'react';

import { Button, ButtonProps } from './ui/button';

import { ArrowLeft } from '@/components/icons/arrow-left';
import { cn } from '@/lib/utils';

type BackButtonProps = Omit<ButtonProps, 'onPress'>;
export const BackButton = ({ children, className, ...props }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      onPress={() => router.back()}
      size="icon"
      className={cn('rounded-full', className)}
      variant="ghost"
      {...props}>
      {children ? children : <ArrowLeft size={20} className="text-foreground" />}
    </Button>
  );
};
