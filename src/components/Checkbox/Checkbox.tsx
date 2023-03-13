import React, { useMemo } from 'react';
import { ViewStyle, StyleProp, Pressable } from 'react-native';
import Animated, {
  interpolateColor,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { noop } from 'lodash';
import DefaultIcon from 'react-native-vector-icons/Feather';
import type { CheckboxProps as Props } from 'src/global';
import { theme } from '../../theme';
import Icon from '../Icon/Icon';
import Style from './Checkbox.style';

const Checkbox = ({
  active = false,
  activeColor = theme.colors.primary,
  defaultColor = theme.colors.neutral,
  defaultColorDark = theme.colors.neutralDark,
  disabledColor = theme.colors.neutralLight,
  icon = 'check',
  iconSize = 12,
  iconType = 'default',
  isDisabled = false,
  onPress = noop,
  size = 25,
  type = 'square',
}: Partial<Props>): JSX.Element => {
  // #region Memo variables
  const containerShape = useMemo(() => {
    const _size = { width: size, height: size };
    if (type === 'round') {
      return [Style.container, Style.containerRound, _size];
    } else {
      return [Style.container, Style.containerSquare, _size];
    }
  }, [type, size]);

  const container: StyleProp<ViewStyle> = useMemo(() => {
    if (isDisabled) {
      return [containerShape, { backgroundColor: disabledColor }];
    } else {
      if (active) {
        return [containerShape, { backgroundColor: activeColor }];
      } else {
        return [containerShape, { backgroundColor: defaultColor }];
      }
    }
  }, [
    isDisabled,
    containerShape,
    disabledColor,
    active,
    activeColor,
    defaultColor,
  ]);

  const tint = useMemo(() => {
    if (isDisabled) {
      return theme.colors.neutralTextDisabled;
    } else {
      return theme.colors.white;
    }
  }, [isDisabled]);

  const checkIcon = useMemo(() => {
    if (active) {
      if (iconType === 'default') {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <DefaultIcon
            name={icon}
            size={iconSize}
            color={tint}
            onPress={onPress}
          />
        );
      } else {
        return (
          <Icon name={icon} size={iconSize} tint={tint} onPress={onPress} />
        );
      }
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconType, active, icon, iconSize]);
  // #endregion

  // #region Animated variables
  const checkboxPressed = useSharedValue(0);

  const onCheckboxPressed = () => {
    'worklet';
    checkboxPressed.value = withTiming(1, { duration: 250 });
  };

  const onCheckboxReleased = () => {
    'worklet';
    checkboxPressed.value = withTiming(0, { duration: 250 });
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    let backgroundColor = interpolateColor(
      checkboxPressed.value,
      [0, 1],
      [defaultColor, defaultColorDark]
    );
    if (active) {
      backgroundColor = activeColor;
    }
    return { backgroundColor };
  });
  // #endregion

  // #region Methods
  const _onPressIn = () => {
    runOnUI(onCheckboxPressed)();
  };

  const _onPressOut = () => {
    runOnUI(onCheckboxReleased)();
  };
  // #endregion

  return (
    <Pressable
      onPress={onPress}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      pointerEvents={isDisabled ? 'none' : 'auto'}
    >
      <Animated.View
        style={[container, !isDisabled ? containerAnimatedStyle : null]}
      >
        {checkIcon}
      </Animated.View>
    </Pressable>
  );
};

export default Checkbox;
