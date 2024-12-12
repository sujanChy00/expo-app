import { Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Animated, { ZoomIn } from 'react-native-reanimated';

import { AppDraggable } from '../draggable/app-draggable';
import { Thumbnail } from '../thumbnail';
import { ThumbnailActions } from '../thumbnail-actions';
import { ThumbnailPicker } from '../thumbnail-picker';

import { FalllBackMesage } from '@/components/fall-back-message';
import { ImageModal } from '@/components/image-modal';
import { useThumbnail } from '@/hooks/use-thumbnail';

export const AppThumbnailManager = () => {
  const { images, editMode, onRefresh, refreshing, setImages, itemHeight } = useThumbnail();

  if (images.length == 0)
    return (
      <>
        <Stack.Screen
          options={{
            headerLargeTitle: true,
            headerTitle: 'Oops!',
          }}
        />
        <View className="flex-1 items-center justify-center gap-6 p-3">
          <FalllBackMesage message="No images found" />
          <ThumbnailPicker />
        </View>
      </>
    );

  if (refreshing)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator />
      </View>
    );

  return (
    <View className="flex-1 gap-6">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Thumbnail />
      <View className="flex-1">
        <DraggableFlatList
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  height: 20,
                }}
              />
            );
          }}
          className="p-3"
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={images}
          ItemSeparatorComponent={() => <View className="h-3" />}
          onDragEnd={({ data }) => setImages(data)}
          keyExtractor={(item) => item}
          renderItem={({ item, drag, isActive, getIndex }) => {
            if (editMode) {
              return (
                <AppDraggable
                  index={getIndex() as number}
                  drag={drag}
                  isActive={isActive}
                  item={item}
                />
              );
            }
            return (
              <Animated.View entering={ZoomIn}>
                <ImageModal
                  src={item}
                  thumnails={images}
                  resizeMode="cover"
                  style={{
                    height: itemHeight,
                    borderRadius: 8,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: '#3498db',
                    width: '100%',
                  }}
                />
              </Animated.View>
            );
          }}
        />
      </View>
      <ThumbnailActions />
    </View>
  );
};
