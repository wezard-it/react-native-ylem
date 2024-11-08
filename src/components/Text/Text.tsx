import React, { useMemo } from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import type { TextDecorationLine, TextProps as Props } from '../../index';
import { theme } from '../../theme';
import Style from './Text.style';

const Text = ({
  type = 'p-md',
  children,
  style = null,
  color = theme.colors.primary,
  underlined = false,
  textDecoration = null,
  extendedStyle = null,
  fontFamily = 'Avenir',
  ...rest
}: React.PropsWithChildren<Partial<Props>>) => {
  const customStyle: StyleProp<TextStyle> = useMemo(() => {
    if (extendedStyle) {
      return extendedStyle;
    } else {
      switch (type) {
        case 'h1':
          return Style.h1;
        case 'h2':
          return Style.h2;
        case 'h3':
          return Style.h3;
        case 'h4':
          return Style.h4;
        case 'title-sm':
          return Style.titleSm;
        case 'title-md':
          return Style.titleMd;
        case 'title-lg':
          return Style.titleLg;
        case 'title-bold':
          return Style.titleBold;
        case 'p-sm':
          return Style.pSm;
        case 'p-md':
          return Style.pMd;
        case 'p-lg':
          return Style.pLg;
        case 'link-sm':
          return Style.linkSm;
        case 'link-md':
          return Style.linkMd;
        case 'link-lg':
          return Style.linkLg;
      }
    }
  }, [type, extendedStyle]);

  const textDecorationLine: TextDecorationLine = useMemo(() => {
    if (textDecoration) return textDecoration;
    return underlined ? 'underline' : 'none';
  }, [underlined, textDecoration]);

  return (
    <RNText
      style={[customStyle, style, { color, textDecorationLine, fontFamily }]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;
