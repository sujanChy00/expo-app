import { createRef, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, ScrollView, View } from 'react-native';

const LONG_PRESS_TIME = 800;
const DOUBLE_CLICK_INTERVAL = 250;
const MAX_OVERFLOW = 100;
const MIN_SCALE = 0.6;
const MAX_SCALE = 10;
const DRAG_DISMISS_THRESHOLD = 150;

export const useAnimatedModal = (src?: string) => {
  const [imageSource, setImageSource] = useState<string | undefined>(src);
  const animatedRef = useRef<ScrollView>(null);
  const imageRef = createRef<View>();
  const imageOpacity = new Animated.Value(1);
  const [originModal, setOriginModal] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const _animatedScale = new Animated.Value(1);
  const _animatedPositionX = new Animated.Value(0);
  const _animatedPositionY = new Animated.Value(0);
  const _lastPositionX = useRef<number | null>(null);
  const _lastPositionY = useRef<number | null>(null);
  const _zoomLastDistance = useRef<number | null>(null);
  const _horizontalWholeCounter = useRef(0);
  const _verticalWholeCounter = useRef(0);
  const _isDoubleClick = useRef(false);
  const _isLongPress = useRef(false);
  const _centerDiffX = useRef(0);
  const _centerDiffY = useRef(0);
  const _singleClickTimeout = useRef<undefined | NodeJS.Timeout>(undefined);
  const _longPressTimeout = useRef<undefined | NodeJS.Timeout>(undefined);
  const _lastClickTime = useRef(0);
  const _doubleClickX = useRef(0);
  const _doubleClickY = useRef(0);
  const _scale = useRef(1);
  const _positionX = useRef(0);
  const _positionY = useRef(0);
  const _zoomCurrentDistance = useRef(0);
  const _animatedFrame = new Animated.Value(0);
  const _animatedOpacity = new Animated.Value(Dimensions.get('window').height);
  const _isAnimated = useRef(false);
  const _swipeDownOffset = useRef(0);
  const _horizontalWholeOuterCounter = useRef(0);

  const windowWidth: number = Dimensions.get('window').width;
  const windowHeight: number = Dimensions.get('window').height;

  useEffect(() => {
    setImageSource(src);
  }, [src]);

  const updateOriginModal = (): void => {
    imageRef.current?.measureInWindow((x, y, width, height) => {
      const newY = y;
      const newX = x;

      setOriginModal({
        width,
        height,
        x: newX,
        y: newY,
      });
    });
  };

  const handleOpen = (): void => {
    updateOriginModal();
    setTimeout(() => {
      setIsOpen(true);
    });

    imageOpacity.setValue(0);
  };

  const handleClose = (): void => {
    imageOpacity.setValue(1);

    setTimeout(() => {
      setIsOpen(false);
    });
  };

  const _panResponderReleaseResolve = (changedTouchesCount: number): void => {
    if (_scale.current < 1) {
      _scale.current = 1;
      Animated.timing(_animatedScale, {
        toValue: _scale.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (windowWidth * _scale.current <= windowWidth) {
      _positionX.current = 0;
      Animated.timing(_animatedPositionX, {
        toValue: _positionX.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (windowHeight * _scale.current < windowHeight) {
      _positionY.current = 0;
      Animated.timing(_animatedPositionY, {
        toValue: _positionY.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else if (
      _scale.current === 1 &&
      changedTouchesCount === 1 &&
      Math.abs(_positionY.current) > DRAG_DISMISS_THRESHOLD
    ) {
      handleClose();
      return;
    }

    if (windowHeight * _scale.current > windowHeight) {
      const verticalMax = (windowHeight * _scale.current - windowHeight) / 2 / _scale.current;
      if (_positionY.current < -verticalMax) {
        _positionY.current = -verticalMax;
      } else if (_positionY.current > verticalMax) {
        _positionY.current = verticalMax;
      }
      Animated.timing(_animatedPositionY, {
        toValue: _positionY.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (windowWidth * _scale.current > windowWidth) {
      const horizontalMax = (windowWidth * _scale.current - windowWidth) / 2 / _scale.current;
      if (_positionX.current < -horizontalMax) {
        _positionX.current = -horizontalMax;
      } else if (_positionX.current > horizontalMax) {
        _positionX.current = horizontalMax;
      }
      Animated.timing(_animatedPositionX, {
        toValue: _positionX.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    if (_scale.current === 1) {
      _positionX.current = 0;
      _positionY.current = 0;
      Animated.timing(_animatedPositionX, {
        toValue: _positionX.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(_animatedPositionY, {
        toValue: _positionY.current,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(_animatedOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();

    _horizontalWholeOuterCounter.current = 0;
    _swipeDownOffset.current = 0;
  };
  const _imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,

    onPanResponderGrant: (evt) => {
      if (_isAnimated.current) {
        return;
      }
      const windowWidth: number = Dimensions.get('window').width;
      const windowHeight: number = Dimensions.get('window').height;
      _lastPositionX.current = null;
      _lastPositionY.current = null;
      _zoomLastDistance.current = null;
      _horizontalWholeCounter.current = 0;
      _verticalWholeCounter.current = 0;
      _isDoubleClick.current = false;
      _isLongPress.current = false;

      if (_singleClickTimeout.current) {
        clearTimeout(_singleClickTimeout.current);
        _singleClickTimeout.current = undefined;
      }

      if (evt.nativeEvent.changedTouches.length > 1) {
        const centerX =
          (evt.nativeEvent.changedTouches[0].pageX + evt.nativeEvent.changedTouches[1].pageX) / 2;
        _centerDiffX.current = centerX - windowWidth / 2;

        const centerY =
          (evt.nativeEvent.changedTouches[0].pageY + evt.nativeEvent.changedTouches[1].pageY) / 2;
        _centerDiffY.current = centerY - windowHeight / 2;
      }
      if (_longPressTimeout.current) {
        clearTimeout(_longPressTimeout.current);
        _longPressTimeout.current = undefined;
      }
      _longPressTimeout.current = setTimeout(() => {
        _isLongPress.current = true;
      }, LONG_PRESS_TIME);

      if (evt.nativeEvent.changedTouches.length <= 1) {
        if (new Date().getTime() - _lastClickTime.current < (DOUBLE_CLICK_INTERVAL || 0)) {
          _lastClickTime.current = 0;

          clearTimeout(_longPressTimeout.current);
          _longPressTimeout.current = undefined;

          _doubleClickX.current = evt.nativeEvent.changedTouches[0].pageX;
          _doubleClickY.current = evt.nativeEvent.changedTouches[0].pageY;

          _isDoubleClick.current = true;

          if (_scale.current > 1 || _scale.current < 1) {
            _scale.current = 1;

            _positionX.current = 0;
            _positionY.current = 0;
          } else {
            const beforeScale = _scale.current;
            _scale.current = 2;

            const diffScale = _scale.current - beforeScale;
            _positionX.current =
              ((windowWidth / 2 - _doubleClickX.current) * diffScale) / _scale.current;

            _positionY.current =
              ((windowHeight / 2 - _doubleClickY.current) * diffScale) / _scale.current;
          }

          Animated.parallel([
            Animated.timing(_animatedScale, {
              toValue: _scale.current,
              duration: 100,
              useNativeDriver: false,
            }),
            Animated.timing(_animatedPositionX, {
              toValue: _positionX.current,
              duration: 100,
              useNativeDriver: false,
            }),
            Animated.timing(_animatedPositionY, {
              toValue: _positionY.current,
              duration: 100,
              useNativeDriver: false,
            }),
          ]).start();
        } else {
          _lastClickTime.current = new Date().getTime();
        }
      }
    },
    onPanResponderMove: (evt, gestureState) => {
      if (_isDoubleClick.current || _isAnimated.current) {
        return;
      }

      if (evt.nativeEvent.changedTouches.length <= 1) {
        let diffX = gestureState.dx - (_lastPositionX.current || 0);
        if (_lastPositionX === null) {
          diffX = 0;
        }
        let diffY = gestureState.dy - (_lastPositionY.current || 0);
        if (_lastPositionY === null) {
          diffY = 0;
        }

        const windowWidth: number = Dimensions.get('window').width;
        _lastPositionX.current = gestureState.dx;
        _lastPositionY.current = gestureState.dy;

        _horizontalWholeCounter.current += diffX;
        _verticalWholeCounter.current += diffY;

        if (
          (Math.abs(_horizontalWholeCounter.current) > 5 ||
            Math.abs(_verticalWholeCounter.current) > 5) &&
          _longPressTimeout.current
        ) {
          clearTimeout(_longPressTimeout.current);
          _longPressTimeout.current = undefined;
        }

        if (_swipeDownOffset.current === 0) {
          if (windowWidth * _scale.current > windowWidth) {
            if (_horizontalWholeOuterCounter.current > 0) {
              if (diffX < 0) {
                if (_horizontalWholeOuterCounter.current > Math.abs(diffX)) {
                  _horizontalWholeOuterCounter.current += diffX;
                  diffX = 0;
                } else {
                  diffX += _horizontalWholeOuterCounter.current;
                  _horizontalWholeOuterCounter.current = 0;
                }
              } else {
                _horizontalWholeOuterCounter.current += diffX;
              }
            } else if (_horizontalWholeOuterCounter.current < 0) {
              if (diffX > 0) {
                if (Math.abs(_horizontalWholeOuterCounter.current) > diffX) {
                  _horizontalWholeOuterCounter.current += diffX;
                  diffX = 0;
                } else {
                  diffX += _horizontalWholeOuterCounter.current;
                  _horizontalWholeOuterCounter.current = 0;
                }
              } else {
                _horizontalWholeOuterCounter.current += diffX;
              }
            }

            _positionX.current += diffX / _scale.current;

            const horizontalMax = (windowWidth * _scale.current - windowWidth) / 2 / _scale.current;
            if (_positionX.current < -horizontalMax) {
              _positionX.current = -horizontalMax;
              _horizontalWholeOuterCounter.current += -1 / 1e10;
            } else if (_positionX.current > horizontalMax) {
              _positionX.current = horizontalMax;
              _horizontalWholeOuterCounter.current += 1 / 1e10;
            }
            _animatedPositionX.setValue(_positionX.current);
          } else {
            _horizontalWholeOuterCounter.current += diffX;
          }

          if (_horizontalWholeOuterCounter.current > (MAX_OVERFLOW || 0)) {
            _horizontalWholeOuterCounter.current = MAX_OVERFLOW || 0;
          } else if (_horizontalWholeOuterCounter.current < -(MAX_OVERFLOW || 0)) {
            _horizontalWholeOuterCounter.current = -(MAX_OVERFLOW || 0);
          }
        }

        _positionY.current += diffY / _scale.current;
        _animatedPositionY.setValue(_positionY.current);
        if (_scale.current === 1) {
          _animatedOpacity.setValue(Math.abs(gestureState.dy));
        }
      } else {
        if (_longPressTimeout.current) {
          clearTimeout(_longPressTimeout.current);
          _longPressTimeout.current = undefined;
        }

        let minX: number;
        let maxX: number;
        if (
          evt.nativeEvent.changedTouches[0].locationX > evt.nativeEvent.changedTouches[1].locationX
        ) {
          minX = evt.nativeEvent.changedTouches[1].pageX;
          maxX = evt.nativeEvent.changedTouches[0].pageX;
        } else {
          minX = evt.nativeEvent.changedTouches[0].pageX;
          maxX = evt.nativeEvent.changedTouches[1].pageX;
        }

        let minY: number;
        let maxY: number;
        if (
          evt.nativeEvent.changedTouches[0].locationY > evt.nativeEvent.changedTouches[1].locationY
        ) {
          minY = evt.nativeEvent.changedTouches[1].pageY;
          maxY = evt.nativeEvent.changedTouches[0].pageY;
        } else {
          minY = evt.nativeEvent.changedTouches[0].pageY;
          maxY = evt.nativeEvent.changedTouches[1].pageY;
        }

        const widthDistance = maxX - minX;
        const heightDistance = maxY - minY;
        const diagonalDistance = Math.sqrt(
          widthDistance * widthDistance + heightDistance * heightDistance
        );
        _zoomCurrentDistance.current = Number(diagonalDistance.toFixed(1));

        if (_zoomLastDistance.current !== null) {
          const distanceDiff = (_zoomCurrentDistance.current - _zoomLastDistance.current) / 200;
          let zoom = _scale.current + distanceDiff;

          if (zoom < MIN_SCALE) {
            zoom = MIN_SCALE;
          }
          if (zoom > MAX_SCALE) {
            zoom = MAX_SCALE;
          }

          const beforeScale = _scale;

          _scale.current = zoom;
          _animatedScale.setValue(_scale.current);

          const diffScale = _scale.current - beforeScale.current;
          _positionX.current -= (_centerDiffX.current * diffScale) / _scale.current;
          _positionY.current -= (_centerDiffY.current * diffScale) / _scale.current;
          _animatedPositionX.setValue(_positionX.current);
          _animatedPositionY.setValue(_positionY.current);
        }
        _zoomLastDistance.current = _zoomCurrentDistance.current;
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (_longPressTimeout.current) {
        clearTimeout(_longPressTimeout.current);
        _longPressTimeout.current = undefined;
      }

      if (_isDoubleClick.current || _isLongPress.current || _isAnimated.current) {
        return;
      }

      _panResponderReleaseResolve(evt.nativeEvent.changedTouches.length);
    },
  });

  const animateConf = {
    transform: [
      {
        scale: _animatedScale,
      },
      {
        translateX: _animatedPositionX,
      },
      {
        translateY: _animatedPositionY,
      },
    ],
    left: _animatedFrame.interpolate({
      inputRange: [0, 1],
      outputRange: [originModal.x, 0],
    }),
    top: _animatedFrame.interpolate({
      inputRange: [0, 1],
      outputRange: [originModal.y, 0],
    }),
    width: _animatedFrame.interpolate({
      inputRange: [0, 1],
      outputRange: [originModal.width, windowWidth],
    }),
    height: _animatedFrame.interpolate({
      inputRange: [0, 1],
      outputRange: [originModal.height, windowHeight],
    }),
  };

  return {
    animateConf,
    isOpen,
    imageRef,
    handleClose,
    updateOriginModal,
    imageOpacity,
    handleOpen,
    _animatedOpacity,
    _animatedFrame,
    _isAnimated,
    _imagePanResponder,
    animatedRef,
    imageSource,
    setImageSource,
  };
};
