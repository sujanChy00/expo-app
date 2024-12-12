import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { WebDragable } from '../draggable/web-draggable';
import { Thumbnail } from '../thumbnail';
import { ThumbnailActions } from '../thumbnail-actions';
import { ThumbnailOptions } from '../thumbnail-options';
import { ThumbnailPicker } from '../thumbnail-picker';

import { FalllBackMesage } from '@/components/fall-back-message';
import { ImageModal } from '@/components/image-modal';
import { useThumbnail } from '@/hooks/use-thumbnail';

export const WebThumbnailManager = () => {
  const { setImages, editMode, webImages, images, setWebImages } = useThumbnail();
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    const draggedItemId = Number(active.id);
    const droppedItemId = Number(over.id);

    const draggedItem = webImages.find((item) => item.id === draggedItemId);
    const droppedItem = webImages.find((item) => item.id === droppedItemId);

    if (!draggedItem || !droppedItem) return;

    const updatedItems = arrayMove(
      webImages,
      webImages.indexOf(draggedItem),
      webImages.indexOf(droppedItem)
    );

    const updatedImages = updatedItems.map((item) => item.img);

    setIsDragging(false);
    setWebImages(updatedItems);
    setImages(updatedImages);
  };

  if (images.length === 0)
    return (
      <FalllBackMesage message="No images found">
        <ThumbnailPicker className="mt-2" />
      </FalllBackMesage>
    );

  return (
    <View className="flex-1 bg-background">
      <Thumbnail resizeMode="contain" className="bg-zinc-900" />
      <View className="p-3 pt-8 xs:p-6">
        <ThumbnailActions />
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 items-center justify-center gap-4 space-y-4 sm:grid-cols-3">
            {!editMode &&
              webImages.map((img) => (
                <ImageModal
                  key={img.id}
                  src={img.img}
                  alt="image"
                  resizeMode="cover"
                  style={{
                    height: 176,
                    width: '100%',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}
                />
              ))}
            {editMode && (
              <SortableContext strategy={horizontalListSortingStrategy} items={webImages}>
                {webImages.map((img, index) => (
                  <div className="relative h-44 rounded-lg" key={img.id}>
                    {!isDragging && editMode && (
                      <Animated.View
                        entering={FadeIn}
                        exiting={FadeOut}
                        className="absolute bottom-0 left-0 z-50 w-full bg-background/80">
                        <ThumbnailOptions index={index} item={img.img} />
                      </Animated.View>
                    )}
                    <WebDragable isDragging={isDragging} id={img.id} key={img.id} img={img.img} />
                  </div>
                ))}
              </SortableContext>
            )}
          </div>
        </DndContext>
      </View>
    </View>
  );
};
