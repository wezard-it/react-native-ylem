import React from 'react';
import { Platform, View } from 'react-native';
import {
  useBottomSheetSpringConfigs,
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { noop } from 'lodash';
import type { BottomSheetProps, BottomSheetHandler } from '../../index';
import BottomBackdrop from '../BottomBackdrop/BottomBackdrop';
import Style from './BottomSheetModal.style';

export const BOTTOM_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

const DYNAMIC_POINTS = ['100%'];
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
    onIndexChanged = noop,
    props,
  }: Partial<BottomSheetProps>,
  ref: React.Ref<BottomSheetHandler> | undefined
) => {
  const isIOSDevice = Platform.OS === 'ios';

  // Config variables
  const animationConfigs = useBottomSheetSpringConfigs(config);
  const bottomSheetRef = React.useRef<GorhomBottomSheetModal>(null);

  // State variables
  const [calculatedPoint, setCalculatedPoint] = React.useState(0);

  const initialSnapPoints = React.useMemo(() => {
    if (type === 'dynamic')
      return calculatedPoint > 0 ? [calculatedPoint] : DYNAMIC_POINTS;
    else return points || FIXED_POINTS;
  }, [points, type, calculatedPoint]);

  // Methods
  const _onChange = React.useCallback(
    (index: number) => {
      onIndexChanged(index);
      if (index === -1) onCloseBottomSheet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onCloseBottomSheet]
  );

  React.useImperativeHandle(ref, () => ({
    openBottomSheet() {
      bottomSheetRef?.current?.present();
    },
    closeBottomSheet() {
      bottomSheetRef?.current?.close();
    },
    snapToIndex(index) {
      bottomSheetRef?.current?.snapToIndex(index);
    },
  }));

  // Render components
  const bottomSheetContent: JSX.Element | null = React.useMemo(() => {
    return (
      <View style={Style.wrapper}>
        {header || null}
        {children}
        {footer || null}
      </View>
    );
  }, [children, footer, header]);

  const renderBackdrop = React.useCallback(
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
      {...props}
    >
      <BottomSheetView
        onLayout={(e) => setCalculatedPoint(e.nativeEvent.layout.height + 50)}
      >
        {bottomSheetContent}
      </BottomSheetView>
    </GorhomBottomSheetModal>
  );
};

export default React.forwardRef(BottomSheetModal);
