import { ActivityIndicator, Pressable } from 'react-native';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { P } from '../ui/typography';

import { useDeleteMessage } from '@/actions/chat';

type Props = {
  messageId: number;
  showDelete: boolean;
};

/**
 * @description A React component that renders a delete button for a chat message, conditionally displayed based on platform and visibility state. Clicking the button opens a confirmation popover before performing the deletion using `useDeleteMessage`.
 * @typedef {Object} Props
 * @property {number} messageId - ID of the message to be deleted.
 * @property {boolean} showDelete - Whether the delete button should be displayed.
 *
 *
 * @param {Props} props - Component props.
 * @returns {JSX.Element} The rendered delete button component, or null if platform is not web or showDelete is false.
 */
export const DeleteMessage = ({ messageId, showDelete }: Props) => {
  const { mutateAsync, isPending } = useDeleteMessage();
  if (!showDelete) return null;
  const deleteMessage = async () => await mutateAsync(messageId);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" className="h-8 w-8 rounded-full" variant="ghost">
          <P>...</P>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-2">
        <Pressable
          disabled={isPending}
          onPress={deleteMessage}
          className="h-8 flex-row items-center justify-center gap-1">
          {isPending && <ActivityIndicator size="small" />}
          <P className="font-semibold">Delete</P>
        </Pressable>
      </PopoverContent>
    </Popover>
  );
};
