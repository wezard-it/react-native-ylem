import React from 'react';
import { View, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  runOnUI,
  useAnimatedStyle,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { noop } from 'lodash';
import DefaultIcon from 'react-native-vector-icons/Feather';
import type { ButtonProps as Props } from '../../index';
import { theme } from '../../theme';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';
import Style from './Button.style';

const TRANSPARENT = 'rgba(255, 255, 255, 0)';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  type = 'primary',
  variant = 'container',
  size = 'md',
  width = 'auto',
  height = undefined,
  title = 'Placeholder',
  titleStyle = null,
  icon = 'sun',
  iconType = 'default',
  iconSize = 20,
  hasIcon = false,
  iconPosition = 'right',
  iconColor = undefined,
  iconStyle = {},
  isLoading = false,
  spinnerColor = theme.colors.white,
  isDisabled = false,
  disabledColor = theme.colors.neutralLight,
  hasShadow = false,
  shadowType = undefined,
  shadowStyle = null,
  animation = 'bounce',
  bounciness = 0.98,
  interpolationSet = [TRANSPARENT, TRANSPARENT],
  containerStyle = null,
  style = null,
  fillSpace = false,
  children,
  custom = undefined,
  onPress = noop,
}: Partial<Props>): JSX.Element => {
  const [defaultWidth, setDefaultWidth] = React.useState(0);
  const [derivedIconColor, setDerivedIconColor] = React.useState('');

  // #region Container
  const _containerStyle: StyleProp<ViewStyle> = React.useMemo(() => {
    if (fillSpace) {
      return [containerStyle, { flex: 1 }];
    }
    return containerStyle;
  }, [containerStyle, fillSpace]);
  // #endregion

  // #region Button
  const buttonShadow = React.useMemo(() => {
    if (hasShadow) {
      if (shadowStyle) {
        return shadowStyle;
      } else {
        switch (shadowType) {
          case 'light':
            return Style.shadowLight;
          case 'medium':
            return Style.shadowMedium;
          case 'dark':
            return Style.shadowDark;
          case 'custom':
            return custom?.shadow || Style.shadowLight;
          default:
            return null;
        }
      }
    } else {
      return null;
    }
  }, [hasShadow, shadowStyle, shadowType, custom]);

  const buttonStyle: StyleProp<ViewStyle> = React.useMemo(() => {
    let innerStyle: StyleProp<ViewStyle> = Style.button;
    if (isDisabled) {
      if (type === 'custom') {
        return [
          Style.button,
          { backgroundColor: custom?.disabled || disabledColor },
        ];
      } else {
        switch (variant) {
          case 'outlined':
          case 'text':
            return [Style.button, Style.disabledOutlined];
          default:
            return [Style.button, { backgroundColor: disabledColor }];
        }
      }
    } else {
      if (type === 'primary') {
        switch (variant) {
          case 'container':
            innerStyle = [
              innerStyle,
              { backgroundColor: theme.colors.primary },
            ];
            break;
          case 'outlined':
            innerStyle = [
              innerStyle,
              { borderWidth: 1, borderColor: theme.colors.primary },
            ];
            break;
          case 'soft':
            innerStyle = [
              innerStyle,
              { backgroundColor: theme.colors.primary1 },
            ];
            break;
          case 'text':
            return innerStyle;
          default:
            return innerStyle;
        }
      } else if (type === 'secondary') {
        switch (variant) {
          case 'container':
            innerStyle = [
              innerStyle,
              { backgroundColor: theme.colors.secondary },
            ];
            break;
          case 'outlined':
            innerStyle = [
              innerStyle,
              { borderWidth: 1, borderColor: theme.colors.secondary },
            ];
            break;
          case 'soft':
            innerStyle = [
              innerStyle,
              { backgroundColor: theme.colors.secondary1 },
            ];
            break;
          case 'text':
            return innerStyle;
          default:
            return innerStyle;
        }
      } else if (type === 'custom') {
        switch (variant) {
          case 'container':
            innerStyle = [
              innerStyle,
              { backgroundColor: custom?.background || theme.colors.primary },
            ];
            break;
          case 'outlined':
            innerStyle = [
              innerStyle,
              {
                borderWidth: 1,
                borderColor: custom?.border || theme.colors.primary,
              },
            ];
            break;
          case 'soft':
            innerStyle = [
              innerStyle,
              { backgroundColor: custom?.soft || theme.colors.primary1 },
            ];
            break;
          case 'text':
            return innerStyle;
          default:
            return innerStyle;
        }
      } else {
        return innerStyle;
      }
    }
    return [innerStyle, { width: fillSpace ? '100%' : width }];
  }, [isDisabled, variant, type, custom, width, fillSpace, disabledColor]);

  const buttonSize: StyleProp<ViewStyle> = React.useMemo(() => {
    switch (size) {
      case 'sm':
        return Style.buttonSm;
      case 'md':
        return Style.buttonMd;
      case 'lg':
        return Style.buttonLg;
      case 'custom':
        return height ? { height } : Style.buttonMd;
      default:
        return null;
    }
  }, [size, height]);

  const buttonLoadingStyle: StyleProp<ViewStyle> = React.useMemo(() => {
    if (isLoading) {
      return { minWidth: defaultWidth };
    } else {
      return { minWidth: 0 };
    }
  }, [isLoading, defaultWidth]);

  const buttonInterpolation = React.useMemo(() => {
    if (isDisabled) {
      return custom?.interpolation?.disabled || interpolationSet;
    } else {
      if (type === 'primary') {
        switch (variant) {
          case 'container':
            return [theme.colors.primary, theme.colors.primaryDark];
          case 'outlined':
            return [theme.colors.white, theme.colors.primary1];
          case 'soft':
            return [theme.colors.primary1, theme.colors.primary];
          case 'text':
            return [TRANSPARENT, theme.colors.primary1];
          default:
            return interpolationSet;
        }
      } else if (type === 'secondary') {
        switch (variant) {
          case 'container':
            return [theme.colors.secondary, theme.colors.secondaryDark];
          case 'outlined':
            return [theme.colors.white, theme.colors.secondary1];
          case 'soft':
            return [theme.colors.secondary1, theme.colors.secondary];
          case 'text':
            return [TRANSPARENT, theme.colors.secondary1];
          default:
            return interpolationSet;
        }
      } else if (type === 'custom') {
        switch (variant) {
          case 'container':
            return (
              custom?.interpolation?.container || [
                theme.colors.primary,
                theme.colors.primary,
              ]
            );
          case 'outlined':
            return (
              custom?.interpolation?.outlined || [
                theme.colors.white,
                theme.colors.primary1,
              ]
            );
          case 'soft':
            return (
              custom?.interpolation?.soft || [
                theme.colors.primary1,
                theme.colors.primary,
              ]
            );
          case 'text':
            return (
              custom?.interpolation?.text || [
                TRANSPARENT,
                theme.colors.primary1,
              ]
            );
          default:
            return interpolationSet;
        }
      } else {
        return interpolationSet;
      }
    }
  }, [interpolationSet, type, variant, isDisabled, custom]);

  // #endregion

  // #region Title
  const titleContainer: StyleProp<ViewStyle> = React.useMemo(() => {
    if (hasIcon) {
      return [Style.titleContainer, Style.titleContainerIcon];
    }
    return Style.titleContainer;
  }, [hasIcon]);

  const titleSize: StyleProp<TextStyle> = React.useMemo(() => {
    switch (size) {
      case 'sm':
        return Style.titleSm;
      case 'md':
        return Style.titleMd;
      case 'lg':
        return Style.titleLg;
      case 'custom':
        return titleStyle || Style.titleMd;
      default:
        return null;
    }
  }, [size, titleStyle]);

  const _titleColor: StyleProp<TextStyle> = React.useMemo(() => {
    if (isDisabled) {
      return {
        color:
          type === 'custom'
            ? custom?.title?.disabled
            : theme.colors.neutralDark,
      };
    } else {
      if (type === 'primary') {
        switch (variant) {
          case 'container':
            return { color: theme.colors.white };
          case 'outlined':
            return { color: theme.colors.primary };
          case 'soft':
            return { color: theme.colors.primary };
          case 'text':
            return { color: theme.colors.primary };
          default:
            return { color: theme.colors.white };
        }
      } else if (type === 'secondary') {
        switch (variant) {
          case 'container':
            return { color: theme.colors.white };
          case 'outlined':
            return { color: theme.colors.secondary };
          case 'soft':
            return { color: theme.colors.secondary };
          case 'text':
            return { color: theme.colors.secondary };
          default:
            return { color: theme.colors.secondary };
        }
      } else if (type === 'custom') {
        switch (variant) {
          case 'container':
            return { color: custom?.title?.container || theme.colors.white };
          case 'outlined':
            return { color: custom?.title?.outlined || theme.colors.primary };
          case 'soft':
            return { color: custom?.title?.soft || theme.colors.primary };
          case 'text':
            return { color: custom?.title?.text || theme.colors.primary };
          default:
            return { color: theme.colors.white };
        }
      } else {
        return { color: theme.colors.white };
      }
    }
  }, [type, variant, custom, isDisabled]);

  const titleInterpolation = React.useMemo(() => {
    if (isDisabled) {
      return (
        custom?.interpolationColor?.disabled || [
          theme.colors.white,
          theme.colors.white,
        ]
      );
    } else {
      if (type === 'primary' || type === 'secondary') {
        switch (variant) {
          case 'container':
            return [theme.colors.white, theme.colors.white];
          default:
            return [_titleColor.color as string, theme.colors.white];
        }
      } else if (type === 'custom') {
        switch (variant) {
          case 'container':
            return (
              custom?.interpolationColor?.container || [
                theme.colors.white,
                theme.colors.white,
              ]
            );
          case 'outlined':
            return (
              custom?.interpolationColor?.outlined || [
                _titleColor.color as string,
                theme.colors.white,
              ]
            );
          case 'soft':
            return (
              custom?.interpolationColor?.soft || [
                _titleColor.color as string,
                theme.colors.white,
              ]
            );
          case 'text':
            return (
              custom?.interpolationColor?.text || [
                _titleColor.color as string,
                theme.colors.white,
              ]
            );
          default:
            return [_titleColor.color as string, theme.colors.white];
        }
      } else {
        return [theme.colors.white, theme.colors.white];
      }
    }
  }, [type, variant, isDisabled, custom, _titleColor]);

  // #endregion

  // #region Spinner
  const loadingColor = React.useMemo(() => {
    if (isDisabled) {
      if (type === 'custom') {
        return custom?.spinner?.disabled || theme.colors.neutralDark;
      }
      return theme.colors.neutralDark;
    } else {
      switch (type) {
        case 'primary':
          return spinnerColor || theme.colors.white;
        case 'secondary':
          return spinnerColor || theme.colors.white;
        case 'custom':
          return custom?.spinner?.active || theme.colors.white;
        default:
          return spinnerColor;
      }
    }
  }, [isDisabled, type, spinnerColor, custom]);
  // #endregion

  // #region Animated
  const buttonPressed = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  const onLowerScale = (toValue: number) => {
    'worklet';
    buttonScale.value = withTiming(toValue || 0.98, { duration: 150 });
  };

  const onRestoreScale = () => {
    'worklet';
    buttonScale.value = withTiming(1, { duration: 150 });
  };

  const onButtonPressed = () => {
    'worklet';
    buttonPressed.value = withTiming(1, { duration: 250 });
  };

  const onButtonReleased = () => {
    'worklet';
    buttonPressed.value = withTiming(0, { duration: 250 });
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    if (animation === 'interpolation') {
      const backgroundColor = interpolateColor(
        buttonPressed.value,
        [0, 1],
        buttonInterpolation
      );
      return { backgroundColor };
    } else if (animation === 'bounce') {
      return {
        transform: [{ scale: animation === 'bounce' ? buttonScale.value : 1 }],
      };
    } else {
      return {};
    }
  }, [animation, buttonInterpolation]);

  const titleAnimatedStyle = useAnimatedStyle(() => {
    if (buttonPressed.value < 0.5 && hasIcon) {
      runOnJS(setDerivedIconColor)(titleInterpolation[0]!);
    } else if (buttonPressed.value >= 0.5 && hasIcon) {
      runOnJS(setDerivedIconColor)(titleInterpolation[1]!);
    }
    if (animation === 'interpolation') {
      const color = interpolateColor(
        buttonPressed.value,
        [0, 1],
        titleInterpolation!
      );
      return { color };
    } else {
      return {};
    }
  });
  // #endregion

  // #region Methods
  const _onPressIn = () => {
    switch (animation) {
      case 'bounce':
        runOnUI(onLowerScale)(bounciness);
        break;
      case 'interpolation':
        runOnUI(onButtonPressed)();
        break;
      default:
    }
  };

  const _onPressOut = () => {
    switch (animation) {
      case 'bounce':
        runOnUI(onRestoreScale)();
        break;
      case 'interpolation':
        runOnUI(onButtonReleased)();
        break;
      default:
    }
  };
  // #endregion

  // #region Render components
  const renderIcon = React.useMemo(() => {
    let color = iconColor;
    if (color === undefined) color = derivedIconColor;
    if (color === null) color = null;

    return (
      <View style={Style.iconContainer}>
        {iconType === 'default' ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <DefaultIcon name={icon} size={iconSize} color={color} />
        ) : (
          <Icon
            pointerEvents="none"
            name={icon}
            tint={color}
            size={iconSize}
            style={iconStyle}
          />
        )}
      </View>
    );
  }, [icon, iconType, iconSize, iconColor, derivedIconColor, iconStyle]);
  // #endregion

  return (
    <View style={_containerStyle}>
      <AnimatedPressable
        onPressIn={_onPressIn}
        onPressOut={_onPressOut}
        onPress={onPress}
        pointerEvents={isDisabled || isLoading ? 'none' : 'auto'}
        onLayout={(e) => setDefaultWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            buttonShadow,
            buttonStyle,
            buttonSize,
            buttonLoadingStyle,
            buttonAnimatedStyle,
            style,
          ]}
        >
          {children || (
            <View>
              {isLoading ? (
                <View style={Style.buttonContent}>
                  <Spinner color={loadingColor} />
                </View>
              ) : (
                <View style={Style.buttonContent}>
                  {hasIcon && iconPosition === 'left' ? renderIcon : null}
                  <View style={titleContainer}>
                    <Animated.Text
                      style={[titleSize, _titleColor, titleAnimatedStyle]}
                    >
                      {title}
                    </Animated.Text>
                  </View>
                  {hasIcon && iconPosition === 'right' ? renderIcon : null}
                </View>
              )}
            </View>
          )}
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

export default Button;
