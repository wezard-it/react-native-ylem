import React, {
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { Platform } from 'react-native';

import {
  useBottomSheetSpringConfigs,
  useBottomSheetDynamicSnapPoints,
  BottomSheetModal as GorhomBottomSheetModal,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { noop } from 'lodash';
import type { BottomSheetProps, BottomSheetHandler } from '../../index';
import BottomBackdrop from '../BottomBackdrop/BottomBackdrop';

export const BOTTOM_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

const DYNAMIC_POINTS = ['CONTENT_HEIGHT'];
const FIXED_POINTS = ['50%', '75%'];

const BottomSheetModal = (
  {
    type = 'dynamic',
    points = undefined,
    config = BOTTOM_CONFIG,
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

  // Config variables
  const animationConfigs = useBottomSheetSpringConfigs(config);
  const bottomSheetRef = useRef<GorhomBottomSheetModal>(null);
  const initialSnapPoints = useMemo(() => {
    if (type === 'fixed') {
      return points || FIXED_POINTS;
    } else {
      return DYNAMIC_POINTS;
    }
  }, [points, type]);

  // Animated variables
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

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

  // Methods

  const _onChange = React.useCallback(
    (index: number) => {
      if (index === -1) onCloseBottomSheet();
    },
    [onCloseBottomSheet]
  );

  useImperativeHandle(ref, () => ({
    openBottomSheet() {
      bottomSheetRef?.current?.present();
    },
    closeBottomSheet() {
      bottomSheetRef?.current?.close();
    },
  }));

  // Render components

  const renderBackdrop = useCallback(
    (backgroundProps: BottomSheetDefaultBackdropProps) => {
      if (backdropType === 'none') {
        return null;
      }
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
    <GorhomBottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleHeight={handleHeight}
      contentHeight={contentHeight}
      animationConfigs={animationConfigs}
      handleComponent={handleComponent}
      backgroundStyle={backgroundStyle}
      keyboardBehavior={isIOSDevice ? keyboardBehavior : 'extend'}
      keyboardBlurBehavior={keyboardBlurBehavior}
      backdropComponent={renderBackdrop}
      onChange={_onChange}
      {...props}
    >
      <>
        {header || null}
        {children}
        {footer || null}
      </>
    </GorhomBottomSheetModal>
  );
};

export default forwardRef(BottomSheetModal);
