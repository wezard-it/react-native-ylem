import React, { useMemo } from 'react';
import { StyleProp, ViewStyle, Pressable } from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { noop } from 'lodash';
import type { CardProps as Props } from '../../index';
import { theme } from '../../theme';
import Style from './Card.style';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Card = ({
  children,
  style = null,
  backgroundColor = theme.colors.gray2,
  radius = theme.radius.m,
  isDisabled = false,
  disabledColor = theme.colors.gray3,
  animation = 'none',
  bounciness = 0.98,
  shadow = 'none',
  shadowStyle = null,
  onPressIn = noop,
  onPress = noop,
  onPressOut = noop,
  onLayout = noop,
  ...rest
}: Partial<Props>): JSX.Element => {
  // #region Memo variables
  const container: StyleProp<ViewStyle> = useMemo(() => {
    let customStyle = Style.container;
    if (isDisabled) {
      return { backgroundColor: disabledColor, borderRadius: radius };
    }
    if (style) {
      customStyle = [customStyle, style];
    }
    if (backgroundColor) {
      customStyle = [customStyle, { backgroundColor }];
    }
    if (radius) {
      customStyle = [customStyle, { borderRadius: radius }];
    }
    return customStyle;
  }, [backgroundColor, disabledColor, isDisabled, radius, style]);

  const containerShadow = useMemo(() => {
    if (shadowStyle) {
      return shadowStyle;
    } else {
      switch (shadow) {
        case 'light':
          return [Style.shadowLight, { borderRadius: radius }];
        case 'medium':
          return [Style.shadowMedium, { borderRadius: radius }];
        case 'dark':
          return [Style.shadowDark, { borderRadius: radius }];
        case 'none':
        default:
          return null;
      }
    }
  }, [radius, shadow, shadowStyle]);
  // #endregion

  // #region Animated
  const cardScale = useSharedValue(1);

  const onLowerScale = (toValue: number) => {
    'worklet';
    cardScale.value = withTiming(toValue || 0.98, { duration: 150 });
  };

  const onRestoreScale = () => {
    'worklet';
    cardScale.value = withTiming(1, { duration: 150 });
  };

  const cardAnimatedStyle = useAnimatedStyle(() => {
    if (animation === 'bounce') {
      return {
        transform: [{ scale: cardScale.value }],
      };
    } else {
      return {};
    }
  }, [animation]);
  // #endregion

  // #region Methods
  const _onPressIn = () => {
    onPressIn();
    if (animation === 'bounce') {
      runOnUI(onLowerScale)(bounciness);
    }
  };

  const _onPressOut = () => {
    onPressOut();
    if (animation === 'bounce') {
      runOnUI(onRestoreScale)();
    }
  };
  // #endregion

  return (
    <AnimatedPressable
      style={[container, containerShadow, cardAnimatedStyle]}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      onPress={onPress}
      onLayout={onLayout}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
};

export default Card;
