/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';
import type { SliderProps } from 'src/types';
import { clamp, getValueForPosition, isLowCloser } from './helpers';
import {
  useThumbFollower,
  useLowHigh,
  useWidthLayout,
  useLabelContainerProps,
  useSelectedRail,
} from './hooks';
import Style from './Slider.style';

const trueFunc = () => true;
const falseFunc = () => false;

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  currentMin,
  currentMax,
  minRange = 0,
  step,
  low: lowProp,
  high: highProp,
  floatingLabel = false,
  allowLabelOverflow = false,
  disableRange = false,
  disabled = false,
  stickyLowThumb = undefined,
  stickyHighThumb = undefined,
  onValueChanged,
  onSliderTouchStart,
  onSliderTouchEnd,
  renderThumb,
  renderLabel,
  renderNotch,
  renderRail,
  renderRailSelected,
  ...restProps
}) => {
  const { inPropsRef, inPropsRefPrev, setLow, setHigh } = useLowHigh(
    currentMin ?? lowProp,
    disableRange ? max : currentMax ?? highProp,
    min,
    max,
    step
  );
  const lowThumbXRef = React.useRef(new Animated.Value(0));
  const highThumbXRef = React.useRef(new Animated.Value(0));
  const pointerX = React.useRef(new Animated.Value(0)).current;
  const { current: lowThumbX } = lowThumbXRef;
  const { current: highThumbX } = highThumbXRef;

  const gestureStateRef = React.useRef({
    isLow: true,
    lastValue: 0,
    lastPosition: 0,
  });
  const [isPressed, setPressed] = React.useState(false);

  const containerWidthRef = React.useRef(0);
  const [thumbWidth, setThumbWidth] = React.useState(0);

  const [selectedRailStyle, updateSelectedRail] = useSelectedRail(
    inPropsRef,
    containerWidthRef,
    thumbWidth,
    disableRange
  );

  const updateThumbs = React.useCallback(() => {
    const { current: containerWidth } = containerWidthRef;
    if (!thumbWidth || !containerWidth) {
      return;
    }
    const { low, high } = inPropsRef.current;
    if (!disableRange) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { current: highThumbX } = highThumbXRef;
      const highPosition =
        ((high - min) / (max - min)) * (containerWidth - thumbWidth);
      highThumbX.setValue(highPosition);
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { current: lowThumbX } = lowThumbXRef;
    const lowPosition =
      ((low - min) / (max - min)) * (containerWidth - thumbWidth);
    lowThumbX.setValue(lowPosition);
    if (typeof updateSelectedRail === 'function') {
      updateSelectedRail();
    }
    onValueChanged?.(low, high, false);
  }, [
    disableRange,
    inPropsRef,
    max,
    min,
    onValueChanged,
    thumbWidth,
    updateSelectedRail,
  ]);

  React.useEffect(() => {
    const { lowPrev, highPrev } = inPropsRefPrev;
    if (
      (lowProp !== undefined && lowProp !== lowPrev) ||
      (highProp !== undefined && highProp !== highPrev)
    ) {
      updateThumbs();
    }
  }, [
    highProp,
    inPropsRefPrev.lowPrev,
    inPropsRefPrev.highPrev,
    lowProp,
    inPropsRefPrev,
    updateThumbs,
  ]);

  React.useEffect(() => {
    updateThumbs();
  }, [updateThumbs]);

  const handleContainerLayout = useWidthLayout(containerWidthRef, updateThumbs);
  const handleThumbLayout = React.useCallback(
    ({ nativeEvent }: any) => {
      const {
        layout: { width },
      } = nativeEvent;
      if (thumbWidth !== width) {
        setThumbWidth(width);
      }
    },
    [thumbWidth]
  );

  const lowStyles = React.useMemo(
    () => ({ transform: [{ translateX: lowThumbX }] }),
    [lowThumbX]
  );

  const highStyles = React.useMemo(
    () =>
      disableRange
        ? null
        : [
            Style.highThumbContainer,
            { transform: [{ translateX: highThumbX }] },
          ],
    [disableRange, highThumbX]
  );

  const railContainerStyles = React.useMemo(
    () => [Style.railsContainer, { marginHorizontal: thumbWidth / 2 }],
    [thumbWidth]
  );

  const [labelView, labelUpdate] = useThumbFollower(
    containerWidthRef,
    gestureStateRef,
    renderLabel,
    stickyLowThumb || isPressed,
    allowLabelOverflow,
    stickyLowThumb
  );
  const [notchView, notchUpdate] = useThumbFollower(
    containerWidthRef,
    gestureStateRef,
    renderNotch,
    stickyHighThumb || isPressed,
    allowLabelOverflow,
    stickyHighThumb
  );
  const lowThumb = renderThumb('low');
  const highThumb = renderThumb('high');

  const labelContainerProps = useLabelContainerProps(floatingLabel);

  const { panHandlers } = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: falseFunc,
        onMoveShouldSetPanResponderCapture: falseFunc,
        onPanResponderTerminationRequest: falseFunc,
        onPanResponderTerminate: trueFunc,
        onShouldBlockNativeResponder: trueFunc,

        onMoveShouldSetPanResponder: (
          _: GestureResponderEvent,
          gestureState: PanResponderGestureState
        ) => Math.abs(gestureState.dx) > 2 * Math.abs(gestureState.dy),

        onPanResponderGrant: ({ nativeEvent }, gestureState) => {
          if (disabled) {
            return;
          }
          const { numberActiveTouches } = gestureState;
          if (numberActiveTouches > 1) {
            return;
          }
          setPressed(true);
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { current: lowThumbX } = lowThumbXRef;
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { current: highThumbX } = highThumbXRef;
          const { locationX: downX, pageX } = nativeEvent;
          const containerX = pageX - downX;

          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { low, high, min, max } = inPropsRef.current;
          onSliderTouchStart?.(low, high);
          const containerWidth = containerWidthRef.current;

          const lowPosition =
            thumbWidth / 2 +
            ((low - min) / (max - min)) * (containerWidth - thumbWidth);
          const highPosition =
            thumbWidth / 2 +
            ((high - min) / (max - min)) * (containerWidth - thumbWidth);

          const isLow =
            disableRange || isLowCloser(downX, lowPosition, highPosition);
          gestureStateRef.current.isLow = isLow;

          const handlePositionChange = (positionInView: number) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { low, high, min, max, step } = inPropsRef.current;
            const minValue = isLow ? min : low + minRange;
            const maxValue = isLow ? high - minRange : max;
            const value = clamp(
              getValueForPosition(
                positionInView,
                containerWidth,
                thumbWidth,
                min,
                max,
                step
              ),
              minValue,
              maxValue
            );
            if (gestureStateRef.current.lastValue === value) {
              return;
            }
            const availableSpace = containerWidth - thumbWidth;
            const absolutePosition =
              ((value - min) / (max - min)) * availableSpace;
            gestureStateRef.current.lastValue = value;
            gestureStateRef.current.lastPosition =
              absolutePosition + thumbWidth / 2;
            (isLow ? lowThumbX : highThumbX).setValue(absolutePosition);
            onValueChanged?.(isLow ? value : low, isLow ? high : value, true);
            (isLow ? setLow : setHigh)(value);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (typeof labelUpdate === 'function') {
              labelUpdate(gestureStateRef.current.lastPosition, value);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (typeof notchUpdate === 'function') {
              notchUpdate(gestureStateRef.current.lastPosition, value);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            updateSelectedRail();
          };
          handlePositionChange(downX);
          pointerX.removeAllListeners();
          pointerX.addListener(({ value: pointerPosition }) => {
            const positionInView = pointerPosition - containerX;
            handlePositionChange(positionInView);
          });
        },

        onPanResponderMove: disabled
          ? undefined
          : Animated.event([null, { moveX: pointerX }], {
              useNativeDriver: false,
            }),

        onPanResponderRelease: () => {
          setPressed(false);
          const { low, high } = inPropsRef.current;
          onSliderTouchEnd?.(low, high);
        },
      }),
    [
      disabled,
      pointerX,
      inPropsRef,
      onSliderTouchStart,
      thumbWidth,
      disableRange,
      minRange,
      onValueChanged,
      setLow,
      setHigh,
      labelUpdate,
      notchUpdate,
      updateSelectedRail,
      onSliderTouchEnd,
    ]
  );

  return (
    <View {...restProps}>
      <View {...(labelContainerProps as any)}>
        {labelView}
        {notchView}
      </View>
      <View onLayout={handleContainerLayout} style={Style.controlsContainer}>
        <View style={railContainerStyles}>
          {renderRail()}
          <Animated.View style={selectedRailStyle as any}>
            {renderRailSelected()}
          </Animated.View>
        </View>
        <Animated.View style={lowStyles} onLayout={handleThumbLayout}>
          {lowThumb}
        </Animated.View>
        {!disableRange && (
          <Animated.View style={highStyles}>{highThumb}</Animated.View>
        )}
        <View
          {...panHandlers}
          style={Style.touchableArea}
          collapsable={false}
        />
      </View>
    </View>
  );
};

export default React.memo(Slider);
