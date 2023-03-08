import React, { useMemo } from 'react';
import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';
import { theme } from '..';
import Style from './Text.style';

export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title-sm'
  | 'title-md'
  | 'title-lg'
  | 'title-bold'
  | 'p-sm'
  | 'p-md'
  | 'p-lg'
  | 'link-sm'
  | 'link-md'
  | 'link-lg';

interface Props extends TextProps {
  type: TextType;
  children?: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
  underlined?: boolean;
  rest?: string[];
}

const Text = ({
  type = 'p-md',
  children = null,
  style = null,
  color = theme.colors.primary,
  underlined = false,
  ...rest
}: React.PropsWithChildren<Partial<Props>>) => {
  const customStyle: StyleProp<TextStyle> = useMemo(() => {
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
      default:
        return Style.pMd;
    }
  }, [type]);

  const textDecorationLine:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined = useMemo(() => {
    if (underlined) {
      return 'underline';
    }
    return 'none';
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
