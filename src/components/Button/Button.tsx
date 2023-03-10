import React, { useMemo, useState } from 'react';
import { View, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  runOnUI,
  useAnimatedStyle,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import type { DefaultTFuncReturn } from 'i18next';
import { noop } from 'lodash';
import { theme } from '../../theme';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';
import Style from './Button.style';

export interface Props {
  title: string | DefaultTFuncReturn;
  type: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  backgroundColor: string | null;
  width: string;
  outlined: boolean;
  outlineColor: string | null;
  soft: boolean;
  text: boolean;
  hasIcon: boolean;
  icon?: string;
  isLoading: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
}

const TRANSPARENT = 'rgba(255, 255, 255, 0)';

const Button = ({
  title = 'Placeholder',
  type = 'primary',
  size = 'md',
  width = 'auto',
  backgroundColor = null,
  outlined = false,
  outlineColor = null,
  soft = false,
  text = false,
  hasIcon = false,
  icon = 'home',
  isLoading = false,
  isDisabled = false,
  onPress = noop,
}: Partial<Props>): JSX.Element => {
  const buttonStyle: StyleProp<ViewStyle> = useMemo(() => {
    let style: StyleProp<ViewStyle> = Style.button;
    if (isDisabled) {
      if (outlined) {
        return [Style.button, Style.disabledOutlined];
      } else if (text) {
        return [Style.button, Style.disabledOutlined];
      }
    }
    if (outlined && type === 'primary') {
      style = [
        style,
        Style.outlined,
        { borderColor: outlineColor || theme.colors.primary },
      ];
    }
    if (outlined && type === 'secondary') {
      style = [style, Style.outlined, { borderColor: theme.colors.accent }];
    }
    if (outlined && isDisabled) {
      style = [
        style,
        Style.outlined,
        { borderColor: theme.colors.neutralLight },
      ];
    }
    if (soft && isDisabled) {
      style = [style, Style.disabled];
    }
    if (width) {
      style = [style, { width }];
    }
    return style;
  }, [type, isDisabled, outlined, soft, text, width, outlineColor]);

  const buttonSize: StyleProp<ViewStyle> = useMemo(() => {
    switch (size) {
      case 'sm':
        return Style.buttonSm;
      case 'md':
      case 'lg':
        return Style.buttonLg;
      default:
        return Style.buttonMd;
    }
  }, [size]);

  const titleSize: StyleProp<TextStyle> = useMemo(() => {
    switch (size) {
      case 'sm':
        return Style.titleSm;
      case 'md':
      case 'lg':
        return Style.titleLg;
      default:
        return Style.titleMd;
    }
  }, [size]);

  const titleContainer: StyleProp<ViewStyle> = useMemo(() => {
    if (hasIcon) {
      return [Style.titleContainer, Style.titleContainerIcon];
    }
    return Style.titleContainer;
  }, [hasIcon]);

  const titleColor: StyleProp<TextStyle> = useMemo(() => {
    let style: StyleProp<TextStyle> = Style.title;
    if (isDisabled) {
      style = Style.titleDisabled;
    }
    if (hasIcon) {
      style = [style, Style.titleContainerIcon];
    }
    return style;
  }, [isDisabled, hasIcon]);

  const spinnerColor = useMemo(() => {
    let color = 'default';
    if (isDisabled) {
      return 'disabled';
    }
    if (type === 'primary') {
      color = 'secondary';
    }
    if (type === 'secondary') {
      color = 'default';
    }
    if (text && type === 'primary') {
      color = 'primary';
    }
    if (text && type === 'secondary') {
      color = 'secondary';
    }
    if (isLoading && type === 'primary' && !text) {
      color = 'secondary';
    }
    if (isLoading && type === 'secondary' && !text) {
      color = 'default';
    }
    return color;
  }, [isDisabled, type, text, isLoading]);

  // Interpolation variables
  const buttonColorInterpolation = useMemo(() => {
    let interpolation = [theme.colors.white, theme.colors.white];
    if (type === 'primary') {
      interpolation = [theme.colors.primary, theme.colors.primary];
    }
    if (type === 'secondary') {
      interpolation = [theme.colors.accent, theme.colors.accent];
    }
    if (outlined && type === 'primary') {
      interpolation = [TRANSPARENT, outlineColor || theme.colors.primary];
    }
    if (outlined && type === 'secondary') {
      interpolation = [TRANSPARENT, theme.colors.primary];
    }
    if (soft && type === 'primary') {
      interpolation = [theme.colors.gray1, theme.colors.gray];
    }
    if (soft && type === 'secondary') {
      interpolation = [theme.colors.accent1, theme.colors.accent];
    }
    if (text && type === 'primary') {
      interpolation = [TRANSPARENT, theme.colors.primary];
    }
    if (text && type === 'secondary') {
      interpolation = [TRANSPARENT, theme.colors.accent1];
    }
    if (isLoading && !text && type === 'primary') {
      interpolation = [theme.colors.primary, theme.colors.primary];
    } else if (isLoading && text && type === 'primary') {
      interpolation = [theme.colors.primary, theme.colors.primary];
    }
    if (isLoading && !text && type === 'secondary') {
      interpolation = [theme.colors.accent, theme.colors.accent];
    } else if (isLoading && text && type === 'secondary') {
      interpolation = [theme.colors.accent1, theme.colors.accent1];
    }
    return interpolation;
  }, [type, outlined, soft, text, isLoading, outlineColor]);

  const titleColorInterpolation = useMemo(() => {
    let interpolation = [theme.colors.white, theme.colors.white];
    if (type === 'primary') {
      interpolation = [theme.colors.white, theme.colors.white];
    }
    if (type === 'secondary') {
      interpolation = [theme.colors.white, theme.colors.white];
    }
    if (outlined && type === 'primary') {
      if (!outlineColor) {
        interpolation = [theme.colors.primary, theme.colors.white];
      } else {
        interpolation = [theme.colors.white, theme.colors.primary];
      }
    }
    if (outlined && type === 'secondary') {
      interpolation = [theme.colors.accent, theme.colors.white];
    }
    if (soft && type === 'primary') {
      interpolation = [theme.colors.primary, theme.colors.white];
    }
    if (soft && type === 'secondary') {
      interpolation = [theme.colors.accent, theme.colors.white];
    }
    if (text && type === 'primary') {
      interpolation = [theme.colors.primary, theme.colors.primary];
    }
    if (text && type === 'secondary') {
      interpolation = [theme.colors.accent, theme.colors.accent];
    }
    if (isLoading && !text && type === 'primary') {
      interpolation = [theme.colors.white, theme.colors.white];
    }
    if (isLoading && !text && type === 'secondary') {
      interpolation = [theme.colors.white, theme.colors.white];
    }
    if (isDisabled) {
      interpolation = [
        theme.colors.neutralTextDisabled,
        theme.colors.neutralTextDisabled,
      ];
    }
    return interpolation;
  }, [type, outlined, soft, text, isLoading, isDisabled, outlineColor]);

  // State variable
  const [derivedIconColor, setDerivedIconColor] = useState('');

  // Animated variables
  const buttonPressed = useSharedValue(0);

  // Animated worklets
  const onButtonPressed = () => {
    'worklet';
    buttonPressed.value = withTiming(1, { duration: 250 });
  };

  const onButtonReleased = () => {
    'worklet';
    buttonPressed.value = withTiming(0, { duration: 250 });
  };

  // Animated style
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    let borderWidth = 0;
    let _backgroundColor = theme.colors.neutralLight;
    if (buttonPressed.value > 0.5 && outlined) {
      borderWidth = 0;
    } else if (buttonPressed.value <= 0.5 && outlined) {
      borderWidth = 1;
    }

    if (!isDisabled) {
      _backgroundColor = interpolateColor(
        buttonPressed.value,
        [0, 1],
        buttonColorInterpolation
      );
    }
    if ((text || outlined) && isDisabled) {
      _backgroundColor = interpolateColor(
        buttonPressed.value,
        [0, 1],
        [TRANSPARENT, TRANSPARENT]
      );
    }

    const bg = backgroundColor || _backgroundColor;
    return { backgroundColor: bg, borderWidth };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    if (buttonPressed.value < 0.5 && hasIcon) {
      runOnJS(setDerivedIconColor)(titleColorInterpolation[0]!);
    } else if (buttonPressed.value >= 0.5 && hasIcon) {
      runOnJS(setDerivedIconColor)(titleColorInterpolation[1]!);
    }
    const color = interpolateColor(
      buttonPressed.value,
      [0, 1],
      titleColorInterpolation
    );
    return { color };
  });

  // Methods

  const _onPressIn = () => {
    runOnUI(onButtonPressed)();
  };

  const _onPressOut = () => {
    runOnUI(onButtonReleased)();
  };

  return (
    <Pressable
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      onPress={onPress}
      pointerEvents={isDisabled || isLoading ? 'none' : 'auto'}
    >
      <Animated.View style={[buttonStyle, buttonSize, buttonAnimatedStyle]}>
        <View>
          {isLoading ? (
            <View style={Style.buttonContent}>
              <Spinner color={spinnerColor} />
            </View>
          ) : (
            <View style={Style.buttonContent}>
              <View style={titleContainer}>
                <Animated.Text
                  style={[titleSize, titleColor, titleAnimatedStyle]}
                >
                  {title}
                </Animated.Text>
              </View>
              {hasIcon ? (
                <View style={Style.iconContainer}>
                  <Icon name={icon} tint={derivedIconColor} size={20} />
                </View>
              ) : null}
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default Button;
