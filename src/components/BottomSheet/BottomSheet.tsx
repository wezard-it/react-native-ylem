import React, {
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { View, Platform } from 'react-native';
import {
  useSharedValue,
  withTiming,
  runOnUI,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import GorhomBottomSheet, {
  useBottomSheetSpringConfigs,
  BottomSheetView,
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

const DYNAMIC_POINTS = ['100%'];
const FIXED_POINTS = ['50%', '57%'];

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
    onIndexChanged = noop,
    props,
  }: Partial<BottomSheetProps>,
  ref: React.Ref<BottomSheetHandler> | undefined
) => {
  const isIOSDevice = Platform.OS === 'ios';
  const isAndroidDevice = Platform.OS === 'android';

  // Config variables
  const animationConfigs = useBottomSheetSpringConfigs(config);
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);

  // State variables
  const [contentVisible, setContentVisible] = useState(false);
  const [derivedOpacity, setDerivedOpacity] = useState(0);
  const [calculatedPoint, setCalculatedPoint] = useState(0);

  // Memo variables
  const initialSnapPoints = useMemo(() => {
    if (type === 'dynamic')
      return calculatedPoint > 0 ? [calculatedPoint] : DYNAMIC_POINTS;
    else return points || FIXED_POINTS;
  }, [points, type, calculatedPoint]);

  // Animated variables
  const opacity = useSharedValue(0);

  const onHandleOpacity = (value: number) => {
    if (derivedOpacity === 0) setDerivedOpacity(value);
  };

  // Animated reaction
  useAnimatedReaction(
    () => {
      return opacity.value;
    },
    (data) => {
      runOnJS(onHandleOpacity)(data);
    }
  );

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
    onIndexChanged(toIndex);
    if (toIndex === -1) {
      runOnUI(hideBottomSheet)();
      setContentVisible(false);
      onCloseBottomSheet();
    }
  };

  const _onChange = React.useCallback(
    (index: number) => {
      onIndexChanged(index);
      if (index === -1) onCloseBottomSheet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onCloseBottomSheet]
  );

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
    snapToIndex(index) {
      bottomSheetRef?.current?.snapToIndex(index);
    },
  }));

  // Render components
  const bottomSheetContent: JSX.Element | null = React.useMemo(() => {
    return (
      <>
        {isIOSDevice || (isAndroidDevice && contentVisible) ? (
          <View style={Style.wrapper}>
            {header || null}
            {children}
            {footer || null}
          </View>
        ) : null}
      </>
    );
  }, [children, contentVisible, footer, header, isAndroidDevice, isIOSDevice]);

  const renderBackdrop = useCallback(
    (backgroundProps: BottomSheetDefaultBackdropProps) => {
      if (backdropType === 'none') return null;
      return (
        <>
          {backdropType === 'default' ? (
            <BottomBackdrop
              props={{ opacity: overlayOpacity, ...backgroundProps }}
            />
          ) : (
            backdrop
          )}
        </>
      );
    },
    [backdropType, overlayOpacity, backdrop]
  );

  return (
    <GorhomBottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={initialSnapPoints}
      handleHeight={20}
      contentHeight={undefined}
      animationConfigs={animationConfigs}
      animateOnMount
      handleComponent={handleComponent}
      backgroundStyle={backgroundStyle}
      enableDynamicSizing={type === 'dynamic'}
      enablePanDownToClose
      keyboardBehavior={isIOSDevice ? keyboardBehavior : 'extend'}
      keyboardBlurBehavior={keyboardBlurBehavior}
      backdropComponent={renderBackdrop}
      onChange={_onChange}
      onAnimate={_onAnimate}
      {...props}
    >
      <BottomSheetView
        onLayout={(e) => setCalculatedPoint(e.nativeEvent.layout.height + 50)}
      >
        {bottomSheetContent}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default forwardRef(BottomSheet);
