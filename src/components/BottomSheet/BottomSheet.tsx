import React, {
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { View, Platform } from 'react-native';
import { useSharedValue, withTiming, runOnUI } from 'react-native-reanimated';
import AnimatedBottomSheet, {
  useBottomSheetSpringConfigs,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { noop } from 'lodash';
import type { BottomSheetProps, BottomSheetHandler } from '../../index';
import BottomBackdrop from '../BottomBackdrop/BottomBackdrop';
import Style from './BottomSheet.style';

export const BOTTOM_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

const DYNAMIC_POINTS = ['CONTENT_HEIGHT'];
const FIXED_POINTS = ['50%', '75%'];

const BottomSheet = (
  {
    type = 'dynamic',
    points = undefined,
    config = BOTTOM_CONFIG,
    duration = 250,
    children = null,
    header = null,
    footer = null,
    overlayOpacity = 0.4,
    backdropType = 'default',
    backdrop = null,
    handleComponent,
    backgroundStyle,
    keyboardBehavior = 'fillParent',
    keyboardBlurBehavior = 'restore',
    onCloseBottomSheet = noop,
    props,
  }: Partial<BottomSheetProps>,
  ref: React.Ref<BottomSheetHandler> | undefined
) => {
  const isIOSDevice = Platform.OS === 'ios';
  const isAndroidDevice = Platform.OS === 'android';

  // Config variables
  const animationConfigs = useBottomSheetSpringConfigs(config);
  const bottomSheetRef = useRef<AnimatedBottomSheet>(null);
  const initialSnapPoints = useMemo(() => {
    if (type === 'fixed') {
      return points || FIXED_POINTS;
    } else {
      return DYNAMIC_POINTS;
    }
  }, [points, type]);

  // State variables
  const [contentVisible, setContentVisible] = useState(false);

  // Animated variables
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const snapPoints = useMemo(() => {
    if (type === 'fixed') {
      return initialSnapPoints;
    } else {
      return animatedSnapPoints;
    }
  }, [animatedSnapPoints, initialSnapPoints, type]);

  const handleHeight = useMemo(() => {
    if (type === 'fixed') {
      return 20;
    } else {
      return animatedHandleHeight;
    }
  }, [animatedHandleHeight, type]);

  const contentHeight = useMemo(() => {
    if (type === 'fixed') {
      return undefined;
    } else {
      return animatedContentHeight;
    }
  }, [animatedContentHeight, type]);

  // Animated variables
  const opacity = useSharedValue(0);

  // Animated worklets

  const showBottomSheet = () => {
    'worklet';
    opacity.value = withTiming(1, { duration });
  };

  const hideBottomSheet = () => {
    'worklet';
    opacity.value = withTiming(0, { duration });
  };

  // Methods

  const _onAnimate = (_: number, toIndex: number) => {
    if (toIndex === -1) {
      runOnUI(hideBottomSheet)();
      setContentVisible(false);
      onCloseBottomSheet();
    }
  };

  useImperativeHandle(ref, () => ({
    openBottomSheet() {
      runOnUI(showBottomSheet)();
      setContentVisible(true);
      bottomSheetRef?.current?.snapToIndex(0);
    },
    closeBottomSheet() {
      runOnUI(hideBottomSheet)();
      setContentVisible(false);
      bottomSheetRef?.current?.forceClose();
    },
  }));

  // Render components

  let bottomSheetContent: JSX.Element | null = null;
  if (isIOSDevice || (isAndroidDevice && contentVisible)) {
    bottomSheetContent = (
      <View style={Style.wrapper} onLayout={handleContentLayout}>
        {header || null}
        {children}
        {footer || null}
      </View>
    );
  }

  const renderBackdrop = useCallback(
    (backgroundProps: BottomSheetDefaultBackdropProps) => {
      if (backdropType === 'none') {
        return null;
      }
      return (
        <>
          {isIOSDevice || opacity?.value > 0 ? (
            <>
              {backdropType === 'default' ? (
                <BottomBackdrop
                  props={{ opacity: overlayOpacity, ...backgroundProps }}
                />
              ) : (
                backdrop
              )}
            </>
          ) : null}
        </>
      );
    },
    [isIOSDevice, opacity?.value, backdropType, overlayOpacity, backdrop]
  );

  return (
    <AnimatedBottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      handleHeight={handleHeight}
      contentHeight={contentHeight}
      animateOnMount
      animationConfigs={animationConfigs}
      enablePanDownToClose
      enableContentPanningGesture={false}
      handleComponent={handleComponent}
      backgroundStyle={backgroundStyle}
      keyboardBehavior={keyboardBehavior}
      keyboardBlurBehavior={keyboardBlurBehavior}
      backdropComponent={renderBackdrop}
      onAnimate={_onAnimate}
      {...props}
    >
      {bottomSheetContent}
    </AnimatedBottomSheet>
  );
};

export default forwardRef(BottomSheet);
