import React, { useMemo } from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import type { CustomTextProps as Props, TextDecorationLine } from 'src/global';
import { theme } from '../../theme';
import Style from './Text.style';

const Text = ({
  type = 'p-md',
  children,
  style = null,
  color = theme.colors.primary,
  underlined = false,
  extendedStyle = null,
  fontFamily = 'Avenir',
  ...rest
}: React.PropsWithChildren<Partial<Props>>) => {
  const customStyle: StyleProp<TextStyle> = useMemo(() => {
    if (extendedStyle) {
      return [extendedStyle, { fontFamily }];
    } else {
      switch (type) {
        case 'h1':
          return [Style.h1, { fontFamily }];
        case 'h2':
          return [Style.h2, { fontFamily }];
        case 'h3':
          return [Style.h3, { fontFamily }];
        case 'h4':
          return [Style.h4, { fontFamily }];
        case 'title-sm':
          return [Style.titleSm, { fontFamily }];
        case 'title-md':
          return [Style.titleMd, { fontFamily }];
        case 'title-lg':
          return [Style.titleLg, { fontFamily }];
        case 'title-bold':
          return [Style.titleBold, { fontFamily }];
        case 'p-sm':
          return [Style.pSm, { fontFamily }];
        case 'p-md':
          return [Style.pMd, { fontFamily }];
        case 'p-lg':
          return [Style.pLg, { fontFamily }];
        case 'link-sm':
          return [Style.linkSm, { fontFamily }];
        case 'link-md':
          return [Style.linkMd, { fontFamily }];
        case 'link-lg':
          return [Style.linkLg, { fontFamily }];
      }
    }
  }, [type, extendedStyle, fontFamily]);

  const textDecorationLine: TextDecorationLine = useMemo(() => {
    return underlined ? 'underline' : 'none';
  }, [underlined]);

  return (
    <RNText
      style={[customStyle, style, { color, textDecorationLine }]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;
