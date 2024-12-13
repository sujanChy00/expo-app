import { useState } from 'react';

import { Trash } from '../icons/trash-icon';
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

interface Props {
  children?: React.ReactNode;
  close?: () => void;
  itemId: string;
}

/**
 * @description A React component that renders a confirmation dialog for deleting an item.
 * 
 * * @example
 * ```jsx
 * <DeleteItem itemId="123" />
 * @typedef {Object} DeleteItemProps
 * @property {string} itemId - The ID of the item to be deleted.
 *
 * @param {DeleteItemProps} props - The component props.
 * @returns {JSX.Element} The rendered delete item component.
 *
 
 * ```
 */
export const DeleteItem = ({ itemId, children, close }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { mutateAsync, isPending } = useDeleteItem();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button size="icon" className="h-7 w-7 rounded-lg" variant="destructive">
            <Trash color="white" size={16} />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] sm:w-[35%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Please confirm your action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this item?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row flex-nowrap justify-end">
          {/* TODO: Fix Here */}
          {/* <AlertDialogCancel disabled={isPending}>
            <P>CANCEL</P>
          </AlertDialogCancel> */}
          {/* <Button
            disabled={isPending}
            variant="destructive"
            className="flex-row items-center gap-1"
            onPress={() =>
              mutateAsync(itemId).then(() => {
                setIsOpen(false);
                close?.();
              })
            }>
            {isPending && <ActivityIndicator size="small" color="#fff" />}
            <P className="text-white">DELETE</P>
          </Button> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
