import { XIcon } from 'lucide-react-native';
import React from 'react';
import {
  Animated,
  Dimensions,
  ImageProps,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { AppImage } from './app-image';

import { useAnimatedModal } from '@/hooks/use-animated-modal';
import { cn } from '@/lib/utils';

interface Props extends Omit<ImageProps, 'source' | 'src'> {
  thumnails?: string[];
  src?: string;
}

export const ImageModal = (props: Props) => {
  const { src, resizeMode = 'contain', thumnails } = props;
  const {
    animateConf,
    isOpen,
    handleClose,
    imageRef,
    updateOriginModal,
    handleOpen,
    imageOpacity,
    _animatedFrame,
    _animatedOpacity,
    _isAnimated,
    _imagePanResponder,
    animatedRef,
    imageSource,
    setImageSource,
  } = useAnimatedModal(src);

  const windowHeight: number = Dimensions.get('window').height;
  const windowWidth: number = Dimensions.get('window').width;

  Dimensions.addEventListener('change', updateOriginModal);

  Animated.parallel([
    Animated.timing(_animatedOpacity, { toValue: 0, useNativeDriver: false }),
    Animated.spring(_animatedFrame, { toValue: 1, useNativeDriver: false }),
  ]).start(() => {
    _isAnimated.current = false;
  });

  return (
    <View ref={imageRef} onLayout={() => {}}>
      <Animated.View
        renderToHardwareTextureAndroid
        style={[{ opacity: imageOpacity }, props.style as ViewStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[{ alignSelf: 'baseline', height: '100%', width: '100%' }]}
          onPress={handleOpen}>
          <AppImage
            resizeMode={resizeMode}
            uri={src}
            style={{
              height: '100%',
              width: '100%',
            }}
            alt={props.alt || ''}
          />
        </TouchableOpacity>
      </Animated.View>
      <Modal
        hardwareAccelerated
        visible={isOpen}
        transparent
        statusBarTranslucent
        onRequestClose={handleClose}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}>
        <View
          style={{
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            flex: 1,
            backgroundColor: '#000',
          }}
          {..._imagePanResponder?.panHandlers}>
          <Animated.View
            renderToHardwareTextureAndroid
            style={[
              Styles.background,
              {
                opacity: _animatedOpacity.interpolate({
                  inputRange: [0, windowHeight],
                  outputRange: [1, 0],
                }),
              },
            ]}
          />
          <Animated.View
            style={[animateConf, { justifyContent: 'center', alignItems: 'center' }]}
            renderToHardwareTextureAndroid>
            <AppImage
              resizeMode="contain"
              style={[
                {
                  width: '90%',
                  height: '70%',
                },
              ]}
              uri={imageSource}
              alt={props.alt || ''}
            />
          </Animated.View>
          <TouchableOpacity className="pt-10" onPress={handleClose} style={Styles.close}>
            <XIcon color="#fff" />
          </TouchableOpacity>

          {thumnails && thumnails.length > 1 && (
            <View
              style={{
                position: 'absolute',
                bottom: 15,
                left: 0,
                zIndex: 100000000,
              }}>
              <ScrollView
                onLayout={(event) => {
                  if (animatedRef.current) {
                    const index = thumnails.findIndex((src) => src === imageSource);
                    const containerWidth = event.nativeEvent.layout.width - 30;
                    const toScroll = windowWidth - containerWidth;
                    animatedRef.current.scrollTo({
                      x: index * toScroll,
                      y: 0,
                      animated: true,
                    });
                  }
                }}
                horizontal
                ref={animatedRef}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName={cn(
                  'flex-row justify-center bg-transparent items-center gap-2 no-scrollbar',
                  {
                    'w-full': thumnails.length <= 4,
                    'overflow-x-scroll w-screen': Platform.OS == 'web',
                  }
                )}>
                {thumnails.map(
                  (src, index) =>
                    !!src && (
                      <Pressable
                        key={src + index}
                        className={src === imageSource ? 'opacity-100' : 'opacity-25'}
                        onPress={() => setImageSource(src)}>
                        <AppImage
                          alt={src}
                          uri={src}
                          resizeMode="cover"
                          className="rounded-lg"
                          style={{ height: 50, width: 50 }}
                        />
                      </Pressable>
                    )
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const Styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'transparent',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 15,
    zIndex: 100000000,
  },
});
