import React, { useState, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { DefaultTFuncReturn } from 'i18next';
import DefaultIcon from 'react-native-vector-icons/Feather';
import { theme } from '../../theme';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Style from './Accordion.style';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface Props {
  title: string | DefaultTFuncReturn;
  description: string;
  icon: boolean;
  iconType: 'default' | 'custom';
  iconSize: number;
  backgroundAnimation: boolean;
  defaultColor: string;
  animatedColor: string;
}

const Accordion = ({
  title = 'Title',
  description = 'Description',
  icon = true,
  iconType = 'default',
  iconSize = 18,
  backgroundAnimation = true,
  defaultColor = theme.colors.white,
  animatedColor = theme.colors.neutralBorder,
}: Partial<Props>): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  // Memo variables
  const _icon = useMemo(() => {
    if (icon) {
      const iconStyle = { transform: [{ rotate: open ? '45deg' : '0deg' }] };
      if (iconType === 'custom') {
        return (
          <Icon
            name="plus"
            size={iconSize}
            tint={theme.colors.primary}
            style={iconStyle}
          />
        );
      } else {
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <DefaultIcon
            name="plus"
            size={iconSize}
            color={theme.colors.primary}
            style={iconStyle}
          />
        );
      }
    } else {
      return null;
    }
  }, [icon, iconType, open, iconSize]);

  // Animated variables
  const accordionPressed = useSharedValue<number>(0);
  const descriptionHeight = useSharedValue<number>(0);

  // Animated worklets
  const onAccordionPressed = () => {
    'worklet';
    accordionPressed.value = withTiming(1, { duration: 250 });
  };

  const onAccordionReleased = (isOpen: boolean) => {
    'worklet';
    accordionPressed.value = withTiming(0, { duration: 250 });
    if (isOpen) {
      descriptionHeight.value = withTiming(0, { duration: 400 });
    } else {
      descriptionHeight.value = withTiming(1, { duration: 400 });
    }
  };

  // Animated style
  const containerAnimatedStyle = useAnimatedStyle(() => {
    if (!backgroundAnimation) {
      return { backgroundColor: 'transparent' };
    }
    const backgroundColor = interpolateColor(
      accordionPressed.value,
      [0, 1],
      [defaultColor, animatedColor]
    );
    return { backgroundColor };
  }, [backgroundAnimation, accordionPressed]);

  const descriptionAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      descriptionHeight.value,
      [0, 0.5, 1],
      [0, 0, 1],
      Extrapolate.CLAMP
    );
    const height = interpolate(
      descriptionHeight.value,
      [0, 0.5, 1],
      [0, 0, maxHeight],
      Extrapolate.CLAMP
    );
    return { opacity, height };
  });

  // Methods
  const _onPressIn = () => {
    runOnUI(onAccordionPressed)();
  };

  const _onPressOut = () => {
    runOnUI(onAccordionReleased)(open);
    setOpen((prevState) => !prevState);
  };

  // Render components
  const renderDescription = useMemo(() => {
    return (
      <Text type="p-sm" color={theme.colors.text}>
        {description}
      </Text>
    );
  }, [description]);

  return (
    <AnimatedPressable
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      style={[Style.container, containerAnimatedStyle]}
    >
      <View style={Style.header}>
        <Text type="h3" style={Style.title}>
          {title}
        </Text>
        <View style={Style.iconRight} pointerEvents="none">
          {icon ? _icon : null}
        </View>
      </View>
      <Animated.View style={descriptionAnimatedStyle}>
        {renderDescription}
      </Animated.View>
      <View
        style={Style.descriptionMeasure}
        onLayout={(e) => setMaxHeight(e.nativeEvent.layout.height + 10)}
        pointerEvents="none"
      >
        {renderDescription}
      </View>
    </AnimatedPressable>
  );
};

export default Accordion;
