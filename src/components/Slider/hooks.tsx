/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Animated, I18nManager } from 'react-native';
import { clamp } from './helpers';
import FollowerContainer from './LabelContainer';
import styles from './Slider.style';

/**
 * low and high state variables are fallbacks for props (props are not required).
 * This hook ensures that current low and high are not out of [min, max] range.
 * It returns an object which contains:
 * - ref containing correct low, high, min, max and step to work with.
 * - setLow and setHigh setters
 * @param lowProp
 * @param highProp
 * @param min
 * @param max
 * @param step
 * @returns {{inPropsRef: React.React.MutableRefObject<{high: (*|number), low: (*|number)}>, setLow: (function(number): undefined), setHigh: (function(number): undefined)}}
 */
export const useLowHigh = (
  lowProp: number | undefined,
  highProp: number | undefined,
  min: number,
  max: number,
  step: number
) => {
  const validLowProp = lowProp === undefined ? min : clamp(lowProp, min, max);
  const validHighProp =
    highProp === undefined ? max : clamp(highProp, min, max);
  const inPropsRef = React.useRef({
    low: validLowProp,
    high: validHighProp,
    step,
    // These 2 fields will be overwritten below.
    min: validLowProp,
    max: validHighProp,
  });
  const { low: lowState, high: highState } = inPropsRef.current;
  const inPropsRefPrev = { lowPrev: lowState, highPrev: highState };

  // Props have higher priority.
  // If no props are passed, use internal state variables.
  const low = clamp(lowProp === undefined ? lowState : lowProp, min, max);
  const high = clamp(highProp === undefined ? highState : highProp, min, max);

  // Always update values of refs so pan responder will have updated values
  Object.assign(inPropsRef.current, { low, high, min, max });

  const setLow = (value: number) => (inPropsRef.current.low = value);
  const setHigh = (value: number) => (inPropsRef.current.high = value);
  return { inPropsRef, inPropsRefPrev, setLow, setHigh };
};

/**
 * Sets the current value of widthRef and calls the callback with new width parameter.
 * @param widthRef
 * @param callback
 * @returns {function({nativeEvent: *}): void}
 */
export const useWidthLayout = (
  widthRef: React.MutableRefObject<number>,
  callback?: (width: number) => void
) =>
  React.useCallback(
    ({ nativeEvent }: any) => {
      const {
        layout: { width },
      } = nativeEvent;
      const { current: w } = widthRef;
      if (w !== width) {
        widthRef.current = width;
        if (callback) {
          callback(width);
        }
      }
    },
    [callback, widthRef]
  );

/**
 * This hook creates a component which follows the thumb.
 * Content renderer is passed to FollowerContainer which re-renders only it's content with setValue method.
 * This allows to re-render only follower, instead of the whole slider with all children (thumb, rail, etc.).
 * Returned update function should be called every time follower should be updated.
 * @param containerWidthRef
 * @param gestureStateRef
 * @param renderContent
 * @param isPressed
 * @param allowOverflow
 * @returns {[JSX.Element, function(*, *=): void]|*[]}
 */
export const useThumbFollower = (
  containerWidthRef: React.MutableRefObject<number>,
  gestureStateRef: React.MutableRefObject<{
    lastValue: number;
    lastPosition: number;
  }>,
  renderContent: undefined | ((value: number) => React.ReactNode),
  isPressed: boolean,
  allowOverflow: boolean
) => {
  const xRef = React.useRef(new Animated.Value(0));
  const widthRef = React.useRef(0);
  const contentContainerRef = React.useRef<FollowerContainer | null>(null);

  const { current: x } = xRef;

  const update = React.useCallback(
    (thumbPositionInView: any, value: any) => {
      const { current: width } = widthRef;
      const { current: containerWidth } = containerWidthRef;
      const position = thumbPositionInView - width / 2;
      xRef.current.setValue(
        allowOverflow ? position : clamp(position, 0, containerWidth - width)
      );
      contentContainerRef.current?.setValue(value);
    },
    [widthRef, containerWidthRef, allowOverflow]
  );

  const handleLayout = useWidthLayout(widthRef, () => {
    update(
      gestureStateRef.current.lastPosition,
      gestureStateRef.current.lastValue
    );
  });

  if (!renderContent) {
    return [];
  }

  const transform = { transform: [{ translateX: x }] };
  const opacity = { opacity: isPressed ? 1 : 0 };
  const follower = (
    <Animated.View style={[transform, opacity]}>
      <FollowerContainer
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onLayout={handleLayout}
        ref={contentContainerRef}
        renderContent={renderContent}
      />
    </Animated.View>
  );
  return [follower, update];
};

interface InProps {
  low: number;
  high: number;
  min: number;
  max: number;
  step: number;
}

export const useSelectedRail = (
  inPropsRef: React.MutableRefObject<InProps>,
  containerWidthRef: React.MutableRefObject<number>,
  thumbWidth: number,
  disableRange: boolean
) => {
  const { current: left } = React.useRef(new Animated.Value(0));
  const { current: right } = React.useRef(new Animated.Value(0));
  const update = React.useCallback(() => {
    const { low, high, min, max } = inPropsRef.current;
    const { current: containerWidth } = containerWidthRef;
    const fullScale = (max - min) / (containerWidth - thumbWidth);
    const leftValue = (low - min) / fullScale;
    const rightValue = (max - high) / fullScale;
    left.setValue(disableRange ? 0 : leftValue);
    right.setValue(
      disableRange ? containerWidth - thumbWidth - leftValue : rightValue
    );
  }, [inPropsRef, containerWidthRef, disableRange, thumbWidth, left, right]);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const styles: object = React.useMemo(
    () => ({
      position: 'absolute',
      left: I18nManager.isRTL ? right : left,
      right: I18nManager.isRTL ? left : right,
    }),
    [left, right]
  );
  return [styles, update];
};

/**
 * @param floating
 * @returns {{onLayout: ((function({nativeEvent: *}): void)|undefined), style: [*, {top}]}}
 */
export const useLabelContainerProps = (floating: boolean) => {
  const [labelContainerHeight, setLabelContainerHeight] = React.useState(0);
  const onLayout = React.useCallback(({ nativeEvent }: any) => {
    const {
      layout: { height },
    } = nativeEvent;
    setLabelContainerHeight(height);
  }, []);

  const top = floating ? -labelContainerHeight : 0;
  const style = [
    floating ? styles.labelFloatingContainer : styles.labelFixedContainer,
    { top },
  ];
  return { style, onLayout };
};
