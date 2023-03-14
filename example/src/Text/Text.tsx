import React, { useMemo } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import {
  theme,
  Text as YlemText,
  TextProps,
  TextType,
} from '@wezard/react-native-ylem';
import Style from './Text.style';

type Modify<T, R> = Omit<T, keyof R> & R;

type TypeExtended = 'h5' | 'h6' | 'h7';
type Props = Modify<
  TextProps,
  { type: TextType | TypeExtended; fontFamily: string | undefined }
>;

const Text = ({
  type = 'p-md',
  children,
  style = null,
  color = theme.colors.primary,
  underlined = false,
  fontFamily = undefined,
  ...rest
}: Partial<Props>) => {
  const extendedStyle: StyleProp<TextStyle> = useMemo(() => {
    switch (type) {
      case 'h5':
        return Style.h5;
      case 'h6':
        return Style.h6;
      case 'h7':
        return Style.h7;
      default:
        return null;
    }
  }, [type]);

  return (
    <YlemText
      type={type as TextType}
      style={style}
      color={color}
      underlined={underlined}
      extendedStyle={extendedStyle}
      fontFamily={fontFamily}
      {...rest}
    >
      {children}
    </YlemText>
  );
};

export default Text;

// This component will allow us to extend the library Text component and if needed to override the style entirely
