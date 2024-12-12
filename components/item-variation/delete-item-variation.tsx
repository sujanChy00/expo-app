import { Trash } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { P } from '../ui/typography';

import { useDeleteItemVariation } from '@/actions/item';
import { cn } from '@/lib/utils';

type Props = {
  variationName: string;
  itemId: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * @description A React component that renders a confirmation dialog for deleting an item variation.
 *
 * @example
 * ```jsx
 * <DeleteItemVariation itemId="123" variationName="Small" />
 * @typedef {Object} Props
 * @property {string} itemId - The ID of the item to which the variation belongs.
 * @property {string} variationName - The name of the variation to be deleted.
 *
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered item variation deletion confirmation dialog.
 *
 *
 * ```
 */
export const DeleteItemVariation = ({ itemId, variationName, className, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useDeleteItemVariation();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="icon"
              className={cn('h-7 w-7 rounded-lg', className)}
              variant="destructive">
              {children ? children : <Trash className="text-background" size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <P>delete variation?</P>
          </TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] sm:w-[35%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Please confirm your action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this variation?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row flex-nowrap justify-end">
          <Button disabled={isPending} variant="outline" onPress={() => setIsOpen(false)}>
            <P>CANCEL</P>
          </Button>
          <Button
            disabled={isPending}
            variant="destructive"
            className="flex-row items-center gap-1"
            onPress={() => mutateAsync({ itemId, variationName }).then(() => setIsOpen(false))}>
            {isPending && <ActivityIndicator size="small" color="#fff" />}
            <P className="text-white">DELETE</P>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
