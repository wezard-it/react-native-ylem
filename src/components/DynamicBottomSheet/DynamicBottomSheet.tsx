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
// import BottomBackdrop from 'components/atomics/atoms/BottomBackdrop/BottomBackdrop';
import { noop } from 'lodash';
import type { BottomSheetProps, IBottomSheetHandler } from 'src/global';
import Style from './DynamicBottomSheet.style';

export const bottomConfig = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

export const animationTiming = 250;

const DynamicBottomSheet = (
  {
    children = null,
    hasHeader = true,
    header = null,
    overlayOpacity = 0.4,
    onCloseBottomSheet = noop,
  }: Partial<BottomSheetProps>,
  ref: React.Ref<IBottomSheetHandler> | undefined
) => {
  const isIOSDevice = Platform.OS === 'ios';
  const isAndroidDevice = Platform.OS === 'android';

  const bottomSheetRef = useRef<AnimatedBottomSheet>(null);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  // State variables
  const [contentVisible, setContentVisible] = useState(false);

  // Animated variables
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const opacity = useSharedValue(0);
  const animationConfigs = useBottomSheetSpringConfigs(bottomConfig);

  // Animated worklets

  const showBottomSheet = () => {
    'worklet';
    opacity.value = withTiming(1, { duration: animationTiming });
  };

  const hideBottomSheet = () => {
    'worklet';
    opacity.value = withTiming(0, { duration: animationTiming });
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
        {hasHeader ? header : null}
        {children}
      </View>
    );
  }

  // const renderBackdrop = useCallback(
  //   (props: BottomSheetDefaultBackdropProps) => {
  //     return (
  //       <>
  //         {isIOSDevice || opacity?.value > 0 ? (
  //           <BottomBackdrop props={{ opacity: overlayOpacity, ...props }} />
  //         ) : null}
  //       </>
  //     );
  //   },
  //   [opacity.value, overlayOpacity, isIOSDevice]
  // );

  // const handleComponent = () => <View style={Style.handle} />;

  return (
    <AnimatedBottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      animateOnMount
      animationConfigs={animationConfigs}
      enablePanDownToClose
      enableContentPanningGesture={false}
      // handleComponent={handleComponent}
      backgroundStyle={Style.background}
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      // backdropComponent={renderBackdrop}
      onAnimate={_onAnimate}
    >
      {bottomSheetContent}
    </AnimatedBottomSheet>
  );
};

export default forwardRef(DynamicBottomSheet);
