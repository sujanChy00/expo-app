import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Image } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useThumbnail } from '@/hooks/use-thumbnail';

export const WebDragable = ({
  id,
  img,
  isDragging,
}: {
  id: number;
  img: string;
  isDragging: boolean;
}) => {
  const { editMode } = useThumbnail();
  const { listeners, setNodeRef, attributes, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {!isDragging && editMode && (
        <Animated.View
          entering={FadeIn.delay(100)}
          exiting={FadeOut}
          className="absolute left-0 top-0 z-10 h-full w-full items-center justify-center bg-background/40"
        />
      )}
      <Image source={{ uri: img }} alt="image" className="h-44 w-full rounded-lg" />
    </div>
  );
};
